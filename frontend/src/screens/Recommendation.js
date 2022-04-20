import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Product from '../components/Product';

function Recommendation() {
  const [info, setData] = useState([]);

  const getProducts = async (productsId) => {
    try {
      console.log(productsId);
      let products = await Axios({
        method: 'post',
        url: 'http://localhost:8000/api/products/recommendation',
        headers: {
          contentType: 'application/json',
        },
        data: productsId,
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5000/recommend')
      .then((res) => res.json())
      .then(async (info) => {
        let item = {
          ids: info.results,
        };
        let products = await getProducts(item);
        if (!products) {
          return;
        }
        products = products.data.results;
        console.log(products);
        setData(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {info ? (
        <div>
          {info.map((product, i) => (
            <Product product={product} key={i} />
          ))}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default Recommendation;
