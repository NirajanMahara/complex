# import flask from import Flask
from flask import Flask
from flask import request
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


product_ratingCount = (rating_data.groupby(by =['productId'])['ratings'].count().reset_index().rename(columns = {'ratings':'totalRatingCount'})[['productId', 'totalRatingCount']])
rating_with_totalRatingCount = pd.merge(rating_data, product_ratingCount[['productId','totalRatingCount']], on = 'productId')

popularity_threshold = 1
rating_popular_product = rating_with_totalRatingCount.query('totalRatingCount >= @popularity_threshold')

product_features_df = rating_popular_product.pivot_table(index = 'productId', columns = 'user_id', values = 'ratings').fillna(0)


product_rating_pivot_matrix = csr_matrix(product_features_df.values)


model_knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
model_knn.fit(product_rating_pivot_matrix)







@app.route('/recommend', methods=["POST", "GET"])
def index():
    # users = request.form.get("user_id")
    data =  request.get_json()
    item = data["product"]
    productRecommend=item
    distances, indices = model_knn.kneighbors(product_features_df.loc[productRecommend,:].values.reshape(1,-1), n_neighbors = 5)
    ind = indices.flatten()
    dist = distances.flatten()
    recommended_product =[]
    for i in range(0,len(distances.flatten())):
        if i == 0:
            print(f'recommendations for {productRecommend}:\n')
        
        else:
            print(f' {i}: {product_features_df.index[ind[i]]}, {dist[i]}')
            recommended_product.append(product_features_df.index[ind[i]])
    return jsonify(results = recommended_product)

    # popular_products = pd.DataFrame(Data.groupby('productId')['ratings'].count())
    # most_popular = popular_products.sort_values('ratings', ascending=False)
    # products = []
    # for product in most_popular.index:
    #     products.append(product)
    # return jsonify(results = products)

# main function
if __name__ == "__main__":
    app.run(debug=True) # debug mode in development mode