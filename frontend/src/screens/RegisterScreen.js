import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function RegisterScreen(props) {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('name is required')
      .min(
        2,
        'name must be at least 2 characters and must not exceed 20 characters'
      )
      .max(
        20,
        'name must be at least 2 characters and must not exceed 20 characters'
      ),
    email: Yup.string().required('email is required').email('email is invalid'),
    password: Yup.string()
      .required('password is required')
      .min(8, 'password must be at least 8 characters')
      .max(25, 'password must not exceed 25 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: Yup.string()
      .required('confirm password is required')
      .oneOf([Yup.ref('password'), null], 'confirm password does not match'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    if (password !== confirmPassword) {
      alert('Password and confirm password does not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="error">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => {
              setName(e.target.value);
              formik.handleChange(e);
            }}
            value={formik.values.name}
          ></input>
          <div className="error">
            {formik.errors.name ? formik.errors.name : null}
          </div>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
              formik.handleChange(e);
            }}
            value={formik.values.email}
          ></input>
          <div className="error">
            {formik.errors.email ? formik.errors.email : null}
          </div>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              formik.handleChange(e);
            }}
            value={formik.values.password}
          ></input>
          <div className="error">
            {formik.errors.password ? formik.errors.password : null}
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              formik.handleChange(e);
            }}
            value={formik.values.confirmPassword}
          ></input>
          <div className="error">
            {formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : null}
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
