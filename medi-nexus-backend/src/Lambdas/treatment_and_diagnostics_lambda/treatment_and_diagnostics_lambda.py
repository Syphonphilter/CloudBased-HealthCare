#Lambda CRUD for HealthCare Provider in Medi Nexus Application
import base64
import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TreatmentandDiagnostics')
#
def lambda_handler(event, context):
    # Get the ID from the path parameters
    httpMethod = event['httpMethod']

    if httpMethod == 'POST':
        return createTreatmentandDiagnostics(event)
    elif httpMethod == 'GET':
        return getTreatmentandDiagnostics(event)
    elif httpMethod == 'PUT':
        return updateTreatmentandDiagnostics(event)
    elif httpMethod == 'DELETE':
        return deleteTreatmentandDiagnostics(event)
    else :
        return {
            'statusCode': 400,
            'body': 'Invalid HTTP Method'
        }
def createTreatmentandDiagnostics(event):
    try:
        # Get the request body
        body = json.loads(event['body'])
        treatmentandDiagnosticsInfo = body['treatmentandDiagnosticsInfo']
        # Create a new item in the table
        response = table.put_item(Item=treatmentandDiagnosticsInfo)
        response_body={
            'message':'Treatment and Diagnostics Successfully Created',
            'response':response
        }
        # Return a success message
        return {
            'statusCode': 200,
            'body': json.dumps(response_body)
        }
    except Exception as e:
        # Return an error message
        return {
            'statusCode': 500,
            'body': json.dumps('Error: {}'.format(str(e)))
        }
def getTreatmentandDiagnostics(event):
    try:
        # Get the ID from the path parameters
        TreatmentandDiagnosticsID = event['queryStringParameters']['TreatmentandDiagnosticsID']

        # Get the item from the table
        response = table.query(
        KeyConditionExpression = boto3.dynamodb.conditions.Key('TreatmentandDiagnosticsID').eq(TreatmentandDiagnosticsID) 
        )
        # check if items were found
        items = response.get('Items',[])
        if items:
            return {
                'statusCode': 200,
                'body': json.dumps(items)
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('No Treatment and Diagnostics found')
            }

    except Exception as e:
        # Return an error message
        return {
            'statusCode': 500,
            'body': json.dumps('Error: {}'.format(str(e)))
        }
def updateTreatmentandDiagnostics(event):
    try:
        # Get the ID from the path parameters
        TreatmentandDiagnosticsID = event['queryStringParameters']['TreatmentandDiagnosticsID']

        # Get the request body
        request_body = event['body']
        if request_body:
            body_data = json.loads(request_body)
            # Now body_data is a Python dictionary
            update_data = body_data.get('UpdateData', {})  # Safely get UpdateData or default to {}
        else:
            update_data = {}

        # Update the item in the table
        response = table.query(
            KeyConditionExpression = boto3.dynamodb.conditions.Key('TreatmentandDiagnosticsID').
            eq(TreatmentandDiagnosticsID),
            ScanIndexForward=False,
            Limit=1
        )
        items = response.get('Items',[])
        if not items:
            return {
                'statusCode': 404,
                'body': json.dumps('No Treatment and Diagnostics found')
            }
        date_created= items[0]['DateCreated']

        update_expression = 'set '+ ', '.join([f"{key} = :{key}"
                                            for key in update_data.keys()])

        expression_attribute_values = {f":{key}": value
                                    for key, value in update_data.items()}
        update_response = table.update_item(
            Key={
                'TreatmentandDiagnosticsID':TreatmentandDiagnosticsID,
                'DateCreated':date_created
            },
            UpdateExpression = update_expression,
            ExpressionAttributeValues = expression_attribute_values,
            ReturnValues = "UPDATED_NEW"
        )
        return {
            'statusCode': 200,
            'body': json.dumps(update_response)
        }
    except Exception as e:
        # Return an error message
        return {
            'statusCode': 500,
            'body': json.dumps('Error: {}'.format(str(e)))
        }

def deleteTreatmentandDiagnostics(event):
    try:
        # Get the ID from the path parameters
        TreatmentandDiagnosticsID = event['queryStringParameters']['TreatmentandDiagnosticsID']

        # Get the item from the table
        response = table.query(
        KeyConditionExpression = boto3.dynamodb.conditions.Key('TreatmentandDiagnosticsID')
        .eq(TreatmentandDiagnosticsID),
        ScanIndexForward=False, # sorts in decending order based on the sort key 
        Limit=1
        )
        # check if items were found
        items = response.get('Items', [])
        if items:
            date_created = items[0]['DateCreated']
            # Delete the item from the table
            response = table.delete_item(
                Key={
                    'TreatmentandDiagnosticsID': TreatmentandDiagnosticsID,
                    'DateCreated': date_created
                }
            )
            return {
                'statusCode': 200,
                'body': json.dumps('Treatment and Diagnostics Successfully Deleted')
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('No Treatment and Diagnostics found')
            }

    except Exception as e:
        # Return an error message
        return {
            'statusCode': 500,
            'body': json.dumps('Error: {}'.format(str(e)))
        }