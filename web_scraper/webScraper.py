import requests
import json
import datetime
import time
import csv
import os  # Import the os module to work with file paths
from dateutil.relativedelta import relativedelta



# Define the retry function
def make_api_request_with_retries(url, params, max_retries=3, retry_delay=30):
    for retry in range(max_retries):
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: {response.status_code}")
            if retry < max_retries - 1:
                print(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
    return None


# Your API key, query, and base URL
api_key = 'yWqeiAInJyGzkQdlJcDSUHycrS7GkTAF'
query = 'Apple AND Spatial Computing'
base_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'

# Initialize a dictionary to store the results
hits_by_month = {}

# Define the date range for the year 2022
start_date = datetime.date(2023, 1, 1)
end_date = datetime.date.today()   #datetime.date(2021, 12, 31)  # Set end_date to the current date

# Iterate through each month for the past year
while start_date <= end_date:
    # Format the start_date to match the API's date format
    formatted_start_date = start_date.strftime('%Y%m%d')

    # Calculate the end_date for the current month
    next_month = start_date + relativedelta(months=1)
    formatted_end_date = (next_month - datetime.timedelta(days=1)).strftime('%Y%m%d')

    # Define the parameters for the API request
    params = {
       'q': query,
       'begin_date': formatted_start_date,
       'end_date': formatted_end_date,
       'api-key': api_key,
    }

    # Make the request to the API with retries
    data = make_api_request_with_retries(base_url, params)

    if data:
        hits_count = data['response']['meta']['hits']
        hits_by_month[start_date.strftime('%Y-%m')] = hits_count
        # Rest of your code...
    else:
        print("Could Not get it")

    # Move to the next month
    start_date = next_month


# Print the results
for month, hits in hits_by_month.items():
    print(f"Month: {month}, Hits: {hits}")



#Save the output//////////////////////////////////////////

 # Specify the folder and CSV file name
output_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'data_output'))


# Create the output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

csv_file_name = os.path.join(output_folder, 'apple_spatialcomputer_hits_by_month_2023.csv')

# Open the CSV file in write mode
with open(csv_file_name, mode='w', newline='') as csv_file:
    # Define the CSV writer
    csv_writer = csv.writer(csv_file)

    # Write the header row
    csv_writer.writerow(['Month', 'Hits'])

    # Write the data rows with padded spaces
    for month, hits in hits_by_month.items():
        csv_writer.writerow([month, hits])

# Print a message to confirm that the data has been saved
print(f"Data has been saved to {csv_file_name}")  