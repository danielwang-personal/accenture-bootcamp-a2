import datetime
import urllib
import pandas as pd
from integration_service import to_geojson
from retrieval_service import retrieve_df
from flask import Flask
from flask_cors import CORS, cross_origin



curr_date = datetime.date.today()
csv_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwXSqlP56q78lZKxc092o6UuIyi7VqOIQj6RM4QmlVPgtJZfbgzv0a3X7wQQkhNu8MFolhVwMy4VnF/pub?gid=0&single=true&output=csv"
data = pd.read_csv(urllib.request.urlopen(csv_url))
data = data[data['postcode'] < 9000]

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello_world():
    return f"<pre>{str(data)}</pre>"

@app.route("/all")
def retrieve_all():
    out_df = retrieve_df(data)
    return to_geojson(out_df)

@app.route("/getPopularity")
def calculate_popularity(supermarket: str):
    pass
