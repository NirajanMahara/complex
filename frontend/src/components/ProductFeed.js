import React from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import Product from './Product';

function ProductFeed() {
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  return (
    <>
      <h2>Featured Products</h2>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='error'>{error}</MessageBox>
      ) : (
        <>
          {/* MessageBox */}
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}

          {/* First Row */}
          <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto'>
            {products.slice(0, 4).map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}

            {/* Banner */}
            <img
              className='md:col-span-full w-full'
              src='https://links.papareact.com/dyz'
              alt=''
            />

            {/* Second Row */}
            <div className='md:col-span-2'>
              {products.slice(4, 5).map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>

            {/* Third / Final Row */}
            {products.slice(5, products.length).map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ProductFeed;
