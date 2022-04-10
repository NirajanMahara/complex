import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Rating from './Rating';
import Currency from 'react-currency-formatter';

export default function Product(props) {
  const { product } = props;

  const [hasPrime] = useState(Math.random() < 0.5);

  const [qty, setQty] = useState(0);

  const [redirect, setRedirect] = useState(false);

  const addToCartHandler = () => {
    setQty(qty + 1);
    setRedirect(true);
    // console.log(redirect);
  };
  if (redirect) {
    // console.log('redirect');
    return <Redirect to={`/cart/${product._id}?qty=${qty}`} />;
  }

  return (
    <div
      key={product._id}
      className='relative flex flex-col m-5 bg-white z-30 p-10'
    >
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
        {product.category}
      </p>

      <Link to={`/product/${product._id}`}>
        <img className='product_image' src={product.image} alt={product.name} />
      </Link>

      <Link to={`/product/${product._id}`}>
        <h2 className='my-3'>{product.name}</h2>
      </Link>

      <Rating rating={product.rating} numReviews={product.numReviews}></Rating>

      <p className='text-xs my-2 line-clamp-2'>{product.description}</p>

      <div className='row'>
        <div className='mb-5'>
          <Currency quantity={product.price} currency='USD' />
        </div>

        <div>
          <Link to={`/seller/${product.seller._id}`}>
            {product.seller.seller.name}
          </Link>
        </div>
      </div>

      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-12' src='https://links.papareact.com/fdw' alt='' />
          <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
        </div>
      )}

      {product.countInStock > 0 ? (
        <button onClick={addToCartHandler} className='mt-auto button'>
          Add to Basket
        </button>
      ) : (
        <button className='mt-auto button opacity-50 cursor-not-allowed'>
          Unavailable
        </button>
      )}
    </div>
  );
}
