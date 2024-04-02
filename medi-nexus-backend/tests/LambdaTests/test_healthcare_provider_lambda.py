import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(sys.path[0],'..','..','src')))
from Lambdas.healthcare_provider_lambda.healthcare_provider_lambda import lambda_handler
from moto import mock_aws
import boto3
import unittest
import json

@mock_aws
class TestLambdaFunctions(unittest.TestCase):
    def setUp(self):
        #Load sample JSON
        current_dir = os.path.dirname(__file__)
        json_path = os.path.join(current_dir, '..', '..', 'src', 'Json', 'sample_healthcare_provider_data.json')
        json_path = os.path.normpath(json_path)  # Normalize the path to the correct format
        
        with open(json_path,'r') as file:
            self.data = json.load(file)
        """
        dynamo db setup
        """
        #Mock Dynamo db
        self.dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        self.table = self.dynamodb.create_table(
            TableName='HealthCareProvider',
            KeySchema=[
                {'AttributeName':'providerID','KeyType':'HASH'},
                {'AttributeName':'DateCreated','KeyType':'RANGE'}
            ],
            AttributeDefinitions=[
                {'AttributeName':'providerID','AttributeType':'S'},
                {'AttributeName':'DateCreated','AttributeType':'S'}],
            ProvisionedThroughput={'ReadCapacityUnits': 1, 'WriteCapacityUnits': 1}
        )

    def test_1_create_provider_item(self):
            """
            Test create_item function
            """
            event = {
            'httpMethod': 'POST',
            'body': json.dumps(self.data)  # Convert your data to a JSON string if it isn't already
            }
            context = None  # Context is not used in the function, so it can be None
            response = lambda_handler(event,context)
            self.assertEqual(response['statusCode'], 200)
            # Add more assertions as necessary
    def test_2_read_provider_items(self):
        """
        Test read_items function
        """
        # You might need to insert an item into the table first to test read functionality
        event = {
            'httpMethod':'GET',
            'providerID': 'DISHA1234',
        }
        context = None
        response = lambda_handler(event,context)
        self.assertEqual(response['statusCode'], 200)
        # Add more assertions as necessary
    def test_3_update_provider_item(self):
        """
        Test update_item function
        """
        # Ensure there's an item to update
        event = {
            'httpMethod':'PUT',
            'providerID': 'DISHA1234',
            'UpdateData': {
                'ProviderInformation':{
                    'Name': 'Update',
                }
            }
        }
        context = None
        response = lambda_handler(event,context)
        self.assertEqual(response['statusCode'], second=200)
        # Add more assertions based on expected outcome
    def test_4_delete_provider_item(self):
        """
        Test delete_item function
        """
        # Ensure there's an item to delete
        event = {
            'httpMethod':'DELETE',
            'providerID': 'DISHA1234',
        }
        context = None
        response = lambda_handler(event,context)
        self.assertEqual(response['statusCode'], 200)

if __name__ == '__main__':
    unittest.main()