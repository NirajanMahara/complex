import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PasswordScreen(props) {
  const [errors, setErrors] = useState({});

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (confirmPassword != '' && password != confirmPassword) {
        alert('Password and Confirm Password does not match');
        return;
      }

      let url = 'http://localhost:5000/api/users/forgot-password';
      let options = {
        method: 'POST',
        url: url,
        data: {
          email: props.email,
          otp: otp,
          password: password,
          confirmPassword: confirmPassword,
        },
      };
      let response = await axios(options);
      if (response.data.statusText === 'otp-failed') {
        alert('Invalid OTP');
        return;
      }
      if (response.data.statusText === 'otp-expired') {
        alert('OTP expired');
        return;
      }
      if (response.data.statusText === 'success') {
        alert('Password reset successfully');
        return;
      } else {
        alert('Something went wrong');
      }
    } catch (e) {
      alert('Something went wrong');
      alert(e);
    }
  };

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Reset Password</h1>
        </div>
        <div>
          <label htmlFor='otp'>OTP</label>
          <input
            type='text'
            id='otp'
            placeholder='Enter OTP'
            required
            autoComplete='off'
            onChange={(e) => setOtp(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            placeholder='Enter password'
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            id='confirmPassword'
            type='password'
            placeholder='Enter confirm password'
            autoComplete='off'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <label />
          <button className='primary' type='submit'>
            Reset Password
          </button>
        </div>
        <div>
          <label />
          <div>
            <Link to={'/signin'}>Back to signin</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
