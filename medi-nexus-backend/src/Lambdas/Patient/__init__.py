import sys
from pathlib import Path

# Add the directory containing your module to the Python path
sys.path.append(str(Path(__file__).resolve().parents[2]))

from Lambdas.Patient.patient_lambda import lambda_handler
