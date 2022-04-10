import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import './CartScreen.css';
import { Divider } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  const [val, setVal] = useState(false);

  return (
    <div className='row top'>
      <div className='col-2'>
        <img
          className='my-3 w-full'
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
          alt='cart_banner'
        />

        {/* <p className='font-bold'>Hello, {userInfo?.email}</p>
        <h1 className='px-3 font-black border-b border-black'>
          Your Shopping Cart
        </h1> */}

        {error && <MessageBox variant='error'>{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Your shopping cart is empty. <Link to='/'>Go Shopping</Link>
          </MessageBox>
        ) : (
          <div className='cart_container bg-gray-100 px-5 py-5'>
            <div className='left_cart'>
              <h1 className='font-medium'>Shopping Cart</h1>
              <p className='text-lg text-[#007185] mx-1 my-auto'>
                Select all items
              </p>
              <span className='text-lg text-[#565959] block text-right pr-1'>
                Price
              </span>

              <Divider />

              {cartItems.map((item, index) => {
                return (
                  <>
                    {/* topper */}
                    <div className='item_container' key={index}>
                      <img src={item.image} alt={item.name}></img>

                      <div className='item_details'>
                        <h3 className='font-medium'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </h3>

                        <h3>{item.description}</h3>

                        <p className='text-red-800 font-medium'>
                          Usually dispatched in 7 days.
                        </p>

                        {item.price > 100 ? (
                          <>
                            <p className='text-gray-500 font-bold'>
                              Eligible for FREE Shipping
                            </p>
                            <img
                              src='https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png'
                              alt='fulfilled'
                            />
                          </>
                        ) : (
                          ''
                        )}

                        {/* botton one */}
                        <div className='add_remove_select'>
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>

                          <p
                            onClick={() => removeFromCartHandler(item.product)}
                            style={{ cursor: 'pointer' }}
                          >
                            Delete
                          </p>

                          <span>|</span>

                          <p
                            className='forremovemedia'
                            style={{ cursor: 'pointer' }}
                          >
                            Save Or Later
                          </p>

                          <span>|</span>

                          <p
                            className='forremovemedia'
                            style={{ cursor: 'pointer' }}
                          >
                            See More like this
                          </p>
                        </div>
                      </div>
                      <h3 className='font-bold'>${item.price}</h3>
                    </div>

                    <Divider />
                  </>
                );
              })}

              <div className='sub_item'>
                <h3>
                  Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items):
                  <strong style={{ fontWeight: '700', color: '#111' }}>
                    {' '}
                    ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </strong>
                </h3>
              </div>
            </div>

            {/* <Right iteam={cartdata} /> */}
          </div>
        )}
      </div>
      <div className='col-1'>
        {/* <div className='card card-body'> */}
        <div className='bg-gray-200 border-2 border-gray-300 m-3 p-5'>
          <img
            style={{ width: '100%', objectFit: 'cover' }}
            // src='https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png'
            src='https://www.pngitem.com/pimgs/m/19-197604_guaranteed-safe-checkout-badge-png-download-guaranteed-safe.png'
            alt='rightimg'
          />

          <p className='text-base px-1 py-1 -mb-5'>
            Your order is eligible for FREE Delivery. <br />
            <span style={{ color: '#565959' }}>
              Select this option at checkout. Details
            </span>
          </p>

          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                <strong>
                  {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </strong>
              </h2>
            </li>
            <li>
              <input type='checkbox' /> This order contains a gift
            </li>
            <li>
              <button
                type='button'
                onClick={checkoutHandler}
                className='primary block button'
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
        <div className='emi_block'>
          <div className='emi' onClick={() => setVal(!val)}>
            Emi available
            {val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
          <span className={val ? 'show' : 'hide'}>
            Your order qualifies for EMI with valid credit cards (not available
            on purchase of Gold, Jewelry, Gift cards and Amazon pay balance top
            up).<a href=''> Learn more</a>
          </span>
        </div>
      </div>
    </div>
  );
}
