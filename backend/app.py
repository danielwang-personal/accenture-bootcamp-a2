from flask import Flask
import requests
import pandas as pd

import urllib

csv_url = "https://data.nsw.gov.au/data/dataset/aefcde60-3b0c-4bc0-9af1-6fe652944ec2/resource/21304414-1ff1-4243-a5d2-f52778048b29/download/confirmed_cases_table1_location.csv"
data = pd.read_csv(urllib.request.urlopen(csv_url))

app = Flask(__name__)

@app.route("/")
def hello_world():
    return f"<p>{str(data)}</p>"
