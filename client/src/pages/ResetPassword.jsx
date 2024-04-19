import React, { useState, useEffect } from 'react';
import { FaLock, FaCheck } from 'react-icons/fa'; // Import FaCheck icon
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice.js';
import smLogo from "../img/icon.svg";
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { id, token } = useParams();
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false); // State to track if password is updated

  useEffect(() => {
    // Run once when component mounts to get params
    setFormData({ id, token });
  }, [id, token]);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/server/auth/reset-password/${id}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setIsPasswordUpdated(true);
      try {
        await fetch('/server/auth/logout');
        dispatch(signOut())
      } catch (error) {
        console.log(error);
      }
      
      navigate('/login'); // Set isPasswordUpdated to true after password is updated successfully
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
      <div className="bg-white p-8 rounded-lg shadow-md w-1/4 h-auto">
        <div className="flex items-center mb-4">
          <div className='flex flex-col items-center'>
            <img src={smLogo} alt="small logo" className='w-1/2'/>
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="password" className="sr-only">New Password</label>
            <input type="password" id="password" name="password" value={formData.password || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 pl-10" placeholder="New Password" required />
            <FaLock className="absolute top-3 left-3 text-gray-500" />
          </div>
          <div className="mb-4">
            {/* Disable the button and display "Password Updated" with a tick mark icon */}
            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-300" disabled={isPasswordUpdated}>
              {loading ? 'Loading...' : (isPasswordUpdated ? <span className="flex items-center justify-center">Password Updated <FaCheck className="ml-1" /></span> : 'Update Password')}
            </button>
          </div>
        </form>
        <div>
          <p className='text-red-700 mt-5'>
            {error ? error.message || 'Something went wrong!' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
