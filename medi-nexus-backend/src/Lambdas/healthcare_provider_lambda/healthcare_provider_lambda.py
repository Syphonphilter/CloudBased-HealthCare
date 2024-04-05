#Lambda CRUD for HealthCare Provider in Medi Nexus Application
import base64
import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('HealthCareProvider')

def lambda_handler(event, context):
    # Get the ID from the path parameters
    httpMethod = event['httpMethod']
    if httpMethod == 'POST':
        return createHealthCareProvider(event)
    elif httpMethod == 'GET':
        return getHealthCareProvider(event)
    elif httpMethod == 'PUT':
        return updateHealthCareProvider(event)
    elif httpMethod == 'DELETE':
        return deleteHealthCareProvider(event)
    else :
        return {
            'statusCode': 400,
            'body': 'Invalid HTTP Method'
        }
def createHealthCareProvider(event):
    try:
        # Get the request body
        body = json.loads(event['body'])
        provider_info = body['providerInfo'] 
        # Create a new item in the table
        response = table.put_item(Item=provider_info)
        response_body={
            'message':'Health Care provider Successfully Created',
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
def getHealthCareProvider(event):
    try:
        # Get the ID from the path parameters
        providerID = event['queryStringParameters']['providerID']

        # Get the item from the table
        response = table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key('providerID').eq(providerID)
        )

        # check if items were found
        items = response.get('Items', [])
        if items:
            return {
                'statusCode': 200,
                'body': json.dumps(items)
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('No health care provider found')
            }
    except Exception as e:
        # Return an error message
        return {
            'statusCode': 500,
            'body': json.dumps('Error: {}'.format(str(e)))
        }
def updateHealthCareProvider(event):
    try:
        # Get the ID from the path parameters
        providerID = event['queryStringParameters']['providerID']
        # Get the request body
        request_body = event['body']
        if request_body:
            body_data = json.loads(request_body)
            # Now body_data is a Python dictionary
            update_data = body_data.get('UpdateData', {})
        else:
            update_data={}# Safely get UpdateData or default to {}

        # Update the item in the table
        response = table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key('providerID')
            .eq(providerID),
            ScanIndexForward=False,
            Limit=1
        )
        items = response.get('Items',[])
        if not items:
            return {
                'statusCode': 404,
                'body': json.dumps('No health care provider found')
            }
        date_created= items[0]['DateCreated']

        update_expression = 'set '+ ', '.join([f"{key} = :{key}"
                                            for key in update_data.keys()])

        expression_attribute_values = {f":{key}": value
                                    for key, value in update_data.items()}
        update_response = table.update_item(
            Key={
                'providerID': providerID,
                'DateCreated': date_created
            },
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="UPDATED_NEW"
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

def deleteHealthCareProvider(event):
    try:
        # Get the ID from the path parameters
        providerID = event['queryStringParameters']['providerID']

        # Get the item from the table
        response = table.query(
        KeyConditionExpression = boto3.dynamodb.conditions.Key('providerID')
        .eq(providerID),
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
                    'providerID': providerID,
                    'DateCreated': date_created
                }
            )
            return {
                'statusCode': 200,
                'body': json.dumps('Health Care Provider Successfully Deleted')
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('No health care provider found')
            }

    except Exception as e:
        # Return an error message
        return {
            'statusCode': 500,
            'body': json.dumps('Error: {}'.format(str(e)))
        }