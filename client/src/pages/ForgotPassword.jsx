import React, { useState, useEffect } from "react";
import { FaEnvelope, FaCheck } from "react-icons/fa"; // Import FaCheck icon
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import smLogo from "../img/icon.svg";

export default function ForgotPassword() {
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isSent, setIsSent] = useState(false); // State to track if link is sent
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/server/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setIsSent(true); // Set isSent to true after email is sent successfully
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/4 h-auto">
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
        <div className="flex items-center mb-4">
          <div className="flex flex-col items-center">
            <img src={smLogo} alt="small logo" className="w-1/2" />
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          </div>
        </div>
        <form onSubmit={forgotPassword}>
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
          <div className="mb-4">
            {/* Disable the button and display "Email Sent" with a tick mark icon */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-300"
              disabled={isSent}
            >
              {loading ? (
                "Loading..."
              ) : isSent ? (
                <span className="flex items-center justify-center">
                  Email Sent <FaCheck className="ml-1" />
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>
        <div>
          <p className="text-red-700 mt-5">
            {error ? error.message || "Something went wrong!" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
