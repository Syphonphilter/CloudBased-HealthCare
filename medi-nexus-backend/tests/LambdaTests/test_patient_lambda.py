import sys
import os
# Add the 'src' directory to the PYTHONPATH
# sys.path[0] gives the directory where the script being run is located. 
# The following command adds the parent directory ('medi-nexus-backend/src') to the path.
sys.path.insert(0, os.path.abspath(os.path.join(sys.path[0], '..', '..', 'src')))
from Lambdas.patient_lambda.patient_lambda import lambda_handler
from moto import mock_aws
import boto3  # Assuming patient_lamda.py has lambda_handler
import unittest
import threading
import json
from queue import Queue
@mock_aws
class TestLambdaFunctions(unittest.TestCase):

    def setUp(self):
        #LOAD SAMPLE JSON
        current_dir = os.path.dirname(__file__)
        json_path = os.path.join(current_dir, '..', '..', 'src', 'Json', 'sample_patient_data.json')
        json_path = os.path.normpath(json_path)  # Normalize the path to the correct format
        # Mock DynamoDB
        with open(json_path,'r') as file:
            self.data = json.load(file)
        """
        Set up DynamoDB for testing
        """
        self.dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        self.s3= boto3.client('s3', region_name='us-east-1')
        patient_image_bucket= 'patient_image_bucket'
        patient_documents_bucket= 'patient_documents_bucket'
        self.s3.create_bucket(Bucket=patient_image_bucket)
        self.s3.create_bucket(Bucket=patient_documents_bucket)
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
            ProvisionedThroughput={'ReadCapacityUnits': 3, 'WriteCapacityUnits': 3}
        )
    def test_1_create_patient_item(self):
        """
        Test Create Patient Lambda Function
        """
        event = {
        'httpMethod': 'POST',
        'body': json.dumps(self.data)  # Convert your data to a JSON string if it isn't already
        }
        context = None  # Context is not used in the function, so it can be None
        response = lambda_handler(event,context)
        self.assertEqual(response['statusCode'], 200)
        # Add more assertions as necessary
    def test_2_read_patient_items(self):
        """
        Test Read Patient Lambda Function
        """
        # You might need to insert an item into the table first to test read functionality
        event = {
            'httpMethod':'GET',
            'queryStringParameters': {'PatientID': 'P121212'}

        }
        context = None
        response = lambda_handler(event,context)
        self.assertEqual(response['statusCode'], 200)
        # Add more assertions as necessary
    def test_3_update_patient_item(self):
        """
        Test Update Patient Lambda Function
        """
        # Ensure there's an item to update
        event = {
            'httpMethod':'PUT',
            'queryStringParameters': {'PatientID': 'P121212'},
            # convert  body dictionary to json string
            'body':json.dumps({
            'UpdateData': {
                'PersonalDetails':{
                    'Name': 'UpdateTest',
                }
            }
            })
        }
        context = None
        response = lambda_handler(event,context)
        self.assertEqual(response['statusCode'], 200)
        # Add more assertions based on expected outcome
        
    def test_4_concurrent_invocations(self):
        def invoke_lambda(event, queue):
            response = lambda_handler(event, None)
            queue.put(response)

        # Create a queue to collect responses
        response_queue = Queue()

        # Create an event for the Lambda function
        event = {
            'httpMethod': 'GET',
            'queryStringParameters': {'PatientID': 'P121212'}
        }

        # List to keep track of threads
        threads = []

        # Launch threads to simulate concurrent invocations
        for _ in range(10):
            thread = threading.Thread(target=invoke_lambda, args=(event, response_queue))
            thread.start()
            threads.append(thread)

        # Wait for all threads to complete
        for thread in threads:
            thread.join()

        # Check all responses
        while not response_queue.empty():
            response = response_queue.get()
            self.assertEqual(response['statusCode'], 200)
            
    def test_5_delete_patient_item(self):
        """
        Test Delete Patient Lambda Function
        """
        # Ensure there's an item to delete
        event = {
            'httpMethod':'DELETE',
            'queryStringParameters': {'PatientID': 'P121212'}
        }
        context = None
        response = lambda_handler(event,context)
        self.assertEqual(response['statusCode'], 200)
        # Additional assertions as necessary

if __name__ == '__main__':
    unittest.main()
