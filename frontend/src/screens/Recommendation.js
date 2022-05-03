import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';

function Recommendation() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

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

  const recommend = (productId) => {
    fetch('http://127.0.0.1:5000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: productId }),
    })
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
  };

  useEffect(() => {
    let productId;
    fetch(`http://localhost:8000/api/users/${userInfo._id}`)
      .then((res) => res.json())
      .then((info) => {
        productId = info.recommend;
        console.log(productId, '-------------------');
        recommend(productId);
      })
      .catch((err) => console.log(err));
    console.log(productId);
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
