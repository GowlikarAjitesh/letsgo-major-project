import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import smLogo from "../img/icon.svg";
import OAuth from '../components/OAuth';

export default function Login() {
  const {loading, error} = useSelector((state) => state.user);
  const text = "Don\'t have an account?";
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [successDisplayed, setSuccessDisplayed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    if (successDisplayed) {
      const timer = setTimeout(() => {
        setSuccessDisplayed(false);
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('success');
        window.history.replaceState({}, '', newUrl);
      }, 5000); // 5000 milliseconds = 5 seconds
      return () => clearTimeout(timer);
    }
  }, [successDisplayed]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('success')) {
      setSuccessDisplayed(true);
    }
  }, [location.search]);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/server/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // setLoading(false);
      if (data.success === false) {
        // setError(true);
        dispatch(signInFailure(data));
        return;
      }
      
      dispatch(signInSuccess(data));
      setSuccessDisplayed(true);
      navigate('/');
    } catch (error) {
      // setLoading(false);
      // setError(true);
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
      <div className="bg-white p-8 rounded-lg shadow-md w-1/4 h-auto">
          <Link to="/" className="text-blue-500 mr-4 bg-black ">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </Link>
        <div className="flex items-center mb-4">
          <div className='flex flex-col items-center'>
            <img src={smLogo} alt="small logo" className='w-1/2'/>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
          </div>
        </div>
        {successDisplayed && ( // Display success message only if successDisplayed is true
          <div className="text-green-700 mb-4">User registered successfully!</div>
        )}
        <form onSubmit={loginUser}>
          <div className="mb-4 relative">
            <label htmlFor="email" className="sr-only">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 pl-10" placeholder="Email" required />
            <FaEnvelope className="absolute top-3 left-3 text-gray-500" />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 pl-10" placeholder="Password" required />
            <FaLock className="absolute top-3 left-3 text-gray-500" />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-300">{loading ? 'Loading...' : 'Login'}</button>
          </div>
          <div  className="mb-4">
          <OAuth/>
        </div>
        </form>
        
        <div  className="mb-4">
          <p><Link to='/forgot-password' className="text-blue-500 ">Forgot password ?</Link></p>
          <p>{text} <Link to='/register' className="text-blue-500 ">Register</Link></p>
        </div>


        <div>
        <p className='text-red-700 mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
        </div>
      </div>
    </div>
  );
}
