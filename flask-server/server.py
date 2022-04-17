# import flask from import Flask
from flask import Flask
import pymongo
from pymongo import MongoClient
import numpy as np
import pandas as pd
from flask import jsonify
from flask_cors import CORS

# app instance
app = Flask(__name__)

CORS(app)

# products API route
@app.route("/products")
def products():

    client = MongoClient('localhost', 27017)

    db = client['complex']

    information = db.recommend

    data = pd.DataFrame(list(information.find()))

    Data = data[["userId","productId","ratings"]]

    popular_products = pd.DataFrame(Data.groupby('productId')['ratings'].count())
    most_popular = popular_products.sort_values('ratings', ascending=False)
    products = []
    for product in most_popular.index:
    
        products.append(product)
   
    return jsonify(results = products)
 


# main function
if __name__ == "__main__":  
    app.run(debug=True) # debug mode in development mode