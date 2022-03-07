import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);

  return (
    <div className='home'>
      <div className='home__banner'>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
        >
          <div>
            <img
              loading='lazy'
              src='https://res.cloudinary.com/nmahara/image/upload/v1645005426/0504-AMZN-GNBC-GatewayHero-1500x600_v5._CB669739807__y1ippl.jpg'
              alt=''
            />
          </div>

          <div>
            <img
              loading='lazy'
              src='https://res.cloudinary.com/nmahara/image/upload/v1645005426/UGRR_S1_GWBleedingHero_ENG_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB669781769__oyldui.jpg'
              alt=''
            />
          </div>

          <div>
            <img
              loading='lazy'
              src='https://res.cloudinary.com/nmahara/image/upload/v1645005426/UK-EN_030821_SpringSitewide_ACQ_GW_Hero_D_1500x600_CV69._CB656397523__k6qxxf.jpg'
              alt=''
            />
          </div>
        </Carousel>
      </div>

      <div className='home__top-seller'>
        <h2>Top Sellers</h2>

        {loadingSellers ? (
          <LoadingBox></LoadingBox>
        ) : errorSellers ? (
          <MessageBox variant='error'>{errorSellers}</MessageBox>
        ) : (
          <>
            {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
            <Carousel
              autoPlay
              infiniteLoop
              showStatus
              showIndicators
              showThumbs={false}
            >
              {sellers.map((seller) => (
                <div key={seller._id}>
                  <Link to={`/seller/${seller._id}`}>
                    <img src={seller.seller.logo} alt={seller.seller.name} />
                    <p className='legend'>{seller.seller.name}</p>
                  </Link>
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>

      <h2>Featured Products</h2>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='error'>{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className='row center'>
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
