import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(sys.path[0],'..','..','src')))
from Lambdas.treatment_and_diagnostics_lambda.treatment_and_diagnostics_lambda import lambda_handler
from moto import mock_aws
import boto3
import unittest
import threading
import json
from queue import Queue

@mock_aws
class TestLambdaFunctions(unittest.TestCase):
    def setUp(self):
        #Load sample JSON
        current_dir = os.path.dirname(__file__)
        json_path = os.path.join(current_dir, '..', '..', 'src', 'Json', 'sample_treatmentanddiagnostics_data.json')
        json_path = os.path.normpath(json_path)  # Normalize the path to the correct format

        with open(json_path,'r') as file:
            self.data = json.load(file)
        """
        dynamo db setup
        """
        #Mock Dynamo db
        self.dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        self.table = self.dynamodb.create_table(
            TableName='TreatmentandDiagnostics',
            KeySchema=[
                {'AttributeName':'TreatmentandDiagnosticsID','KeyType':'HASH'},
                {'AttributeName':'DateCreated','KeyType':'RANGE'}
            ],
            AttributeDefinitions=[
                {'AttributeName':'TreatmentandDiagnosticsID','AttributeType':'S'},
                {'AttributeName':'DateCreated','AttributeType':'S'}],
            ProvisionedThroughput={'ReadCapacityUnits': 1, 'WriteCapacityUnits': 1}
        )

    def test_1_create_treatmentandDiagnostics_item(self):
            """
            Test Create Treatment and Diagnostics Lambda Function
            """
            event = {
            'httpMethod': 'POST',
            'body': json.dumps(self.data)  # Convert your data to a JSON string if it isn't already
            }
            context = None  # Context is not used in the function, so it can be None
            response = lambda_handler(event,context)
            self.assertEqual(response['statusCode'], 200)
            # Add more assertions as necessary
    def test_2_read_treatmentandDiagnostics_items(self):
        """
        Test Read Treatment and Diagnostics Lambda Function
        """
        # You might need to insert an item into the table first to test read functionality
        event = {
            'httpMethod':'GET',
            'queryStringParameters': {'TreatmentandDiagnosticsID': 'TD1234'}
        }
        context = None
        response = lambda_handler(event,context)
        self.assertEqual(response['statusCode'], 200)
        # Add more assertions as necessary
    def test_3_update_treatmentandDiagnostics_item(self):
        """
        Test Update Treatment and Diagnostics Lambda Function
        """
        # Ensure there's an item to update
        event = {
            'httpMethod':'PUT',
            'queryStringParameters': {'TreatmentandDiagnosticsID': 'TD1234'},
            'body':json.dumps({
            'UpdateData': {
                'TreatmentInfo':{
                    'TreatmentName': 'Update',
                }
            }
            })
        }
        context = None
        response = lambda_handler(event,context)
        self.assertEqual(response['statusCode'], second=200)
        # Add more assertions based on expected outcome
    def test_4_delete_treatmentandDiagnostics_item(self):
        """
        Test Delete Treatment and Diagnostics Lambda Function

        """
        # Ensure there's an item to delete
        event = {
            'httpMethod':'DELETE',
            'queryStringParameters': {'TreatmentandDiagnosticsID': 'TD1234'}
        }
        context = None
        response = lambda_handler(event,context)
        self.assertEqual(response['statusCode'], 200)

    def test_5_concurrent_invocations(self):
            def invoke_lambda(event, queue):
                response = lambda_handler(event, None)
                queue.put(response)

            # Create a queue to collect responses
            response_queue = Queue()

            # Create an event for the Lambda function
            event = {
                'httpMethod': 'GET',
                'queryStringParameters': {'TreatmentandDiagnosticsID': 'TD1234'}
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

if __name__ == '__main__':
    unittest.main()