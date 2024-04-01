import sys
import os

# Add the 'src' directory to the PYTHONPATH
# sys.path[0] gives the directory where the script being run is located. 
# The following command adds the parent directory ('medi-nexus-backend/src') to the path.
sys.path.insert(0, os.path.abspath(os.path.join(sys.path[0], '..', '..', 'src')))

from Lambdas.Patient.patient_lambda import lambda_handler
from moto import mock_aws
import boto3  # Assuming patient_lamda.py has lambda_handler
import unittest
import json

@mock_aws
class TestLambdaFunctions(unittest.TestCase):

    def setUp(self):
        """
        Set up DynamoDB for testing
        """
        current_dir = os.path.dirname(__file__)
        json_path = os.path.join(current_dir, '..', '..', 'src', 'Json', 'sample_patient_data.json')
        json_path = os.path.normpath(json_path)  # Normalize the path to the correct format
        # Mock DynamoDB
        with open(json_path,'r') as file:
            self.data = json.load(file)
        self.dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        # Create DynamoDB table for testing
        self.table = self.dynamodb.create_table(
            TableName='PatientInformation',
            KeySchema=[
                {'AttributeName': 'PatientID', 'KeyType': 'HASH'},
                {'AttributeName': 'DateCreated', 'KeyType': 'RANGE'}
            ],
            AttributeDefinitions=[
                {'AttributeName': 'PatientID', 'AttributeType': 'S'},
                {'AttributeName': 'DateCreated', 'AttributeType': 'S'}
            ],
            ProvisionedThroughput={'ReadCapacityUnits': 1, 'WriteCapacityUnits': 1}
        )

    def test_create_patient_item(self):
        """
        Test create_item function
        """
        event = {
        'httpMethod': 'POST',
        'body': json.dumps(self.data)  # Convert your data to a JSON string if it isn't already
        }
        context = None  # Context is not used in the function, so it can be None
        response = lambda_handler(event)
        self.assertEqual(response['statusCode'], 200)
        # Add more assertions as necessary

    def test_read_patient_items(self):
        """
        Test read_items function
        """
        # You might need to insert an item into the table first to test read functionality
        event = {
            'httpMethod':'GET',
            'PatientID': 'PTest123',
        }
        context = None
        response = lambda_handler(event)
        self.assertEqual(response['statusCode'], 200)
        # Add more assertions as necessary

    def test_update_patient_item(self):
        """
        Test update_item function
        """
        # Ensure there's an item to update
        event = {
            'httpMethod':'PUT',
            'PatientID': 'PTest123',
            'UpdateData': {
                'PersonalDetails':{
                    'Name': 'UpdateTest',
                }
            }
        }
        context = None
        response = lambda_handler(event)
        self.assertEqual(response['statusCode'], 200)
        # Add more assertions based on expected outcome

    def test_delete_patient_item(self):
        """
        Test delete_item function
        """
        # Ensure there's an item to delete
        event = {
            'httpMethod':'DELETE',
            'PatientID': 'PTest123',
        }
        context = None
        response = lambda_handler(event)
        self.assertEqual(response['statusCode'], 200)
        # Additional assertions as necessary

if __name__ == '__main__':
    unittest.main()
