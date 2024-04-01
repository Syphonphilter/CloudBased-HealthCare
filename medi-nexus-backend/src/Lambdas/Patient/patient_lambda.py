
import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PatientInformation')

def lambda_handler(event):
    http_method = event['httpMethod']

    if http_method == 'POST':
        # Handle create operation
        return create_item(event)
    elif http_method == 'GET':
        # Handle read operation
        return read_items(event)
    elif http_method == 'PUT':
        # Handle update operation
        return update_item(event)
    elif http_method == 'DELETE':
        # Handle delete operation
        return delete_item(event)
    else:
        return {
            'statusCode': 405,
            'body': json.dumps('Method Not Allowed')
        }

def create_item(event):
    try:
        # Parse the incoming event body assuming it contains patient information in JSON format
        patient_info = json.loads(event['body']) 
        # Insert the patient information into the DynamoDB table
        response = table.put_item(Item=patient_info)
        #remaining_time = context.get_remaining_time_in_millis()
        response_body = {
        'message': 'Patient information inserted successfully',
        'response':response,
        #'remaining_time': remaining_time
        }
        return {
            'statusCode': 200,
            'body': json.dumps(response_body)
        }
    except Exception as e:
        # If an error occurs, return a 500 status code along with the error message
        return {
            'statusCode': 500,
            'body': json.dumps('Error: {}'.format(str(e)))
        }

def read_items(event):
    try:
        # Extract PatientID from the event object; no need for DateCreated for this query
        patient_id = event['PatientID']

        # Perform a query to fetch all items for the given PatientID
        response = table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key('PatientID').eq(patient_id)
        )
        #remaining_time = context.get_remaining_time_in_millis()

        # Check if any items were found
        items = response.get('Items', [])
        if items:
            # Assuming you want to return all records for a patient
            return {
                'statusCode': 200,
                'exectuo'
                'body': json.dumps(items)
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('No patient information found for the given ID')
            }

    except Exception as e:
        # If an error occurs, return a 500 status code along with the error message
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
def update_item(event):
    try:
        patient_id = event['PatientID']
        # Additional data to update the record with
        update_data = event['UpdateData']

        # Step 1: Query to find the latest record for the given PatientID
        response = table.query(
            KeyConditionExpression = boto3.dynamodb.conditions.Key('PatientID').eq(patient_id),
            ScanIndexForward=False, # This ensures the results are returned in descending order by DateCreated
            Limit=1
        )

        items = response.get('Items', [])
        if not items:
            return {
                'statusCode': 404,
                'body': json.dumps('No patient information found for the given ID')
            }

        # Extract DateCreated from the latest record
        date_created = items[0]['DateCreated']

        # Step 2: Update the record using PatientID and the retrieved DateCreated
        # Construct the update expression and expression attribute values based on the update data dictionary
        # Example: set key1 = :key1, key2 = :key2, ...
        update_expression = 'set ' + ', '.join([f"{key} = :{key}" for key in update_data.keys()])

        # would be set , key= :key, value= :value 
        # Construct the expression attribute values dictionary based on the update data dictionary
        # Example: {f":{key}": value for key, value in update_data.items()}
        # would be {f":key": value, f":value": value}
        expression_attribute_values = {f":{key}": value for key, value in update_data.items()}

        update_response = table.update_item(
            Key={
                'PatientID': patient_id,
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
        # If an error occurs, return a 500 status code along with the error message
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }

def delete_item(event):
    try:
        patient_id = event['PatientID']

        # Step 1: Query to find the latest record for the given PatientID
        response = table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key('PatientID').eq(patient_id),
            ScanIndexForward=False,  # This ensures the results are returned in descending order by DateCreated
            Limit=1  # Assuming you want to delete the most recent record
        )

        items = response.get('Items', [])
        if not items:
            return {
                'statusCode': 404,
                'body': json.dumps('No patient information found for the given ID')
            }

        # Extract DateCreated from the latest record
        date_created = items[0]['DateCreated']

        # Step 2: Delete the record using PatientID and the retrieved DateCreated
        delete_response = table.delete_item(
            Key={
                'PatientID': patient_id,
                'DateCreated': date_created
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps('Patient record deleted successfully')
        }

    except Exception as e:
        # If an error occurs, return a 500 status code along with the error message
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }