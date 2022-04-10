import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import Banner from '../components/Banner';
import TopSeller from '../components/TopSeller';
import ProductFeed from '../components/ProductFeed';
import Footer from '../components/Footer/Footer';

export default function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);

  return (
    <div className='home max-w-screen-2xl mx-auto'>
      <Banner />

      <TopSeller />

      <ProductFeed />

      <Footer />
    </div>
  );
}
