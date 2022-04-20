# import flask from import Flask
from flask import Flask
import pymongo
from pymongo import MongoClient
import numpy as np
import pandas as pd
from flask import jsonify
from flask_cors import CORS

from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

# app instance
app = Flask(__name__)

CORS(app)

client = MongoClient('localhost', 27017)

db = client['complex']

information = db.recommend

data = pd.DataFrame(list(information.find()))

rating_data = data[["user_id","productId","ratings"]]
rating_data["user_id"] = rating_data["user_id"].astype(int)

pivoted_data=rating_data.pivot_table(index='productId',columns='user_id',values='ratings').fillna(0)
features= csr_matrix(pivoted_data.values)
model = NearestNeighbors(metric='euclidean',algorithm='brute')
model.fit(features)

@app.route('/recommend', methods=["POST", "GET"])
def index():
    # users = request.form.get("user_id")
    user_id = int(2)
    distances,indices = model.kneighbors(pivoted_data.iloc[user_id,:].values.reshape(1,-1),n_neighbors=2)
    recommended_items = set()
    for i in range(0,len(distances.flatten())):
        if i == 0:
            print('Recommendations for {0}:\n'.format(pivoted_data.index[user_id]))
        else:
            print('{0}: {1}, with distance of {2}:'.format(i, pivoted_data.index[indices.flatten()[i]],distances.flatten()[i]))
            recommended_items.add(pivoted_data.index[indices.flatten()[i]])
    items = tuple(recommended_items)
    products = []
    for product in items:
        products.append(product)
    recommended = '{}'.format(items)
    return jsonify(results = products)

    # popular_products = pd.DataFrame(Data.groupby('productId')['ratings'].count())
    # most_popular = popular_products.sort_values('ratings', ascending=False)
    # products = []
    # for product in most_popular.index:
    #     products.append(product)
    # return jsonify(results = products)

# main function
if __name__ == "__main__":
    app.run(debug=True) # debug mode in development mode