#Lambda CRUD for Patients in Medi Nexus Application
import base64
import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PatientInformation')
s3 = boto3.client('s3')
def lambda_handler(event,context):
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
        body = json.loads(event['body'])
        patient_info = body['patientInfo']  # Regular patient information
        # Assuming 'photoBase64' and 'documentBase64' contain the base64-encoded file contents
        photo_content = base64.b64decode(patient_info['PatientPhoto'])
        document_content = base64.b64decode(patient_info['PatientDocuments'])

        patient_image_bucket = 'patient-photo-bucket'
        patient_documents_bucket = 'patient-documents-bucket'

        photo_key = f"patients/{patient_info['PatientID']}/photo.png"
        document_key = f"patients/{patient_info['PatientID']}/document.pdf"

        # Upload to S3
        upload_file_to_s3(patient_image_bucket, photo_content, photo_key,'image/png')
        upload_file_to_s3(patient_documents_bucket, document_content, document_key,'application/pdf')
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
        patient_id = event['queryStringParameters']['PatientID']

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
        patient_id = event['queryStringParameters']['PatientID']
        # Additional data to update the record with
        request_body = event['body']
        if request_body:
            body_data = json.loads(request_body)
            # Now body_data is a Python dictionary
            update_data = body_data.get('UpdateData', {})  # Safely get UpdateData or default to {}
        else:
            update_data = {}


        # Step 1: Query to find the latest record for the given PatientID
        response = table.query(
            KeyConditionExpression = boto3.dynamodb.conditions.Key('PatientID').
            eq(patient_id),
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
        update_expression = 'set ' + ', '.join([f"{key} = :{key}"
                                                for key in update_data.keys()])

        # would be set , key= :key, value= :value 
        # Construct the expression attribute values dictionary based on the update data dictionary
        # Example: {f":{key}": value for key, value in update_data.items()}
        # would be {f":key": value, f":value": value}
        expression_attribute_values = {f":{key}": value 
                                       for key, value in update_data.items()}

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
        patient_id = event['queryStringParameters']['PatientID']

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

#functions
def image_to_base64(image_path: str) -> str:
    with open(image_path, 'rb') as image_file:
        # Read the file
        encoded_string = base64.b64encode(image_file.read())
        # Convert the bytes to a string
        return encoded_string.decode('utf-8')

def base64_to_pdf(base64_string: str)->bytes:
    # Decode the Base64 string, converting it back to bytes
    pdf_bytes = base64.b64decode(base64_string)
def base64_to_image(base64_string: str)->bytes:
    # Decode the Base64 string, converting it back to bytes
    image_bytes = base64.b64decode(base64_string)

def upload_file_to_s3(bucket, content, key, contentType):
    try:
        response = s3.put_object(Bucket=bucket, Key=key, Body=content,ContentType=contentType)
        # Handle response if necessary
    except Exception as e:
        print(f"Error uploading to S3: {e}")