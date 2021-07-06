from flask import Flask
import requests

app = Flask(__name__)

@app.route("/")
def hello_world():
    res = requests.get("https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29&q=jones")
    return f"<p>{res.text}</p>"
