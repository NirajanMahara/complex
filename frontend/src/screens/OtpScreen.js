import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PasswordScreen from './PasswordScreen';

export default function OtpScreen(props) {
  const emailRef = useRef();
  const [otpForm, showForm] = useState(true);

  const sendOtp = async () => {
    try {
      let url = 'http://localhost:8000/api/users/send-email';
      let options = {
        method: 'POST',
        url: url,
        data: { email: emailRef.current.value },
      };
      let response = await axios(options);
      console.log(response);
      let record = response.data;
      if (record.statusText === 'success') {
        alert(record.message);
        showForm(false);
      } else {
        alert(record.message);
      }
    } catch (e) {
      // alert('Something went wrong');
      alert(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {otpForm ? (
        <form className='form' onSubmit={submitHandler}>
          <div>
            <h1>Reset Password</h1>
          </div>
          <div>
            <label htmlFor='email'>Email address</label>
            <input
              type='email'
              id='email'
              placeholder='Enter email'
              required
              autoComplete='off'
              ref={emailRef}
            ></input>
          </div>

          <div>
            <label />
            <button className='primary' type='submit' onClick={sendOtp}>
              Send OTP
            </button>
          </div>
          <div>
            <label />
            <div>
              <Link to={'/signin'}>Back to signin</Link>
            </div>
          </div>
        </form>
      ) : (
        <PasswordScreen email={emailRef.current.value} />
      )}
    </div>
  );
}
