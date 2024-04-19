import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import smLogo from "../img/icon.svg";
import OAuth from '../components/OAuth';

export default function Register() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/server/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      // Redirect to the login page with success flag in the URL
      navigate("/login?success=true");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/4">
        <Link to="/" className="text-blue-500 mr-4 bg-black ">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </Link>
        <div className="flex flex-col items-center">
          <img src={smLogo} alt="small logo" className="w-1/2" />
          <h2 className="text-2xl font-bold mb-4">Register</h2>
        </div>
        <form onSubmit={registerUser}>
          <div className="mb-4 relative">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 pl-10"
              placeholder="Username"
              required
            />
            <FaUser className="absolute top-3 left-3 text-gray-500" />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 pl-10"
              placeholder="Email"
              required
            />
            <FaEnvelope className="absolute top-3 left-3 text-gray-500" />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 pl-10"
              placeholder="Password"
              required
            />
            <FaLock className="absolute top-3 left-3 text-gray-500" />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
          <div  className="mb-4">
          <OAuth/>
        </div>
        </form>

        <div className="mb-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>

        <div>{error && <p className="text-red-700 mt-5">Registration failed!</p>}</div>
      </div>
    </div>
  );
}
