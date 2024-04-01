import boto3

# Initialize a Boto3 DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Reference to the 'PatientInformation' table
table = dynamodb.Table('PatientInformation')

# Define the item you want to insert
item = {
    'PatientID': 'P123456',
    'DateCreated':'2023-01-01',
    'PersonalDetails': {
        'Name': 'Jane Doe',
        'DateOfBirth': '1985-07-28',
        'Gender': 'Female',
        'ContactInformation': {
            'Email': 'jane.doe@example.com',
            'Phone': '123-456-7890'
        }
    },
    'HealthRecords': [
        {
            'Type': 'Diagnosis',
            'Description': 'Allergic Rhinitis',
            'Date': '2021-03-15'
        },
        {
            'Type': 'Treatment',
            'Description': 'Antihistamines',
            'Date': '2021-03-16'
        }
    ],
    'VisitHistories': [
        {
            'Date': '2021-03-15',
            'Purpose': 'Allergy symptoms',
            'Notes': 'Prescribed antihistamines'
        }
    ],
    'TreatmentPlans': {
        '2021': {
            'Medication': ['Cetirizine'],
            'FollowUp': '2021-04-15'
        }
    }
}
# Insert the item
response = table.put_item(Item=item)

print(f"Item with PatientID {item['PatientID']} inserted successfully. Response: {response}")
