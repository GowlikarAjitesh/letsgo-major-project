import { useState, useRef, useEffect } from "react";
import logo from "../img/logo.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { signOut} from '../redux/user/userSlice';


const Navbar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogout = async() => {
    // Implement logout functionality here
      try {
        await fetch('/server/auth/signout');
        dispatch(signOut())
      } catch (error) {
        console.log(error);
      }
  };
  useEffect(() => {
    const closeDropdownOnOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeDropdownOnOutsideClick);
    };
  }, []);
  return (
    <nav className="relative z-50 transition duration-700 bg-white w-full h-auto">
      {" "}
      {/* Adjusted height */}
      <div className="container mx-auto w-full flex justify-between items-center py-3">
        <Link to={"/"}>
          <img
            src={logo}
            alt="LetsGo"
            className="w-[180px] sm:w-[200px] md:w-[250px]"
            style={{ width: "10rem" }}
          />
        </Link>
        <ul className="hidden md:flex space-x-1">
          <Link to={"/hotels"}>
            <li className="rounded-full hover:bg-gray-200 py-2 px-3 cursor-pointer">
              <p className="flex font-medium items-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                  <path d="M20.587 12.139V4.144H3.424v7.986A3.805 3.805 0 002 15.097v4.755h1.906v-1.905h16.188v1.91H22v-4.76a3.804 3.804 0 00-1.413-2.958zm-1.906-6.09V8.83a5.048 5.048 0 00-2.865-.876c-1.565 0-2.952.69-3.816 1.749-.864-1.059-2.252-1.749-3.818-1.749-1.07 0-2.056.324-2.851.866V6.049h13.35zm-.258 5.248c-.077-.005-.155-.012-.234-.012h-4.971c.438-.838 1.437-1.426 2.598-1.426 1.168 0 2.173.593 2.607 1.438zm-7.643-.012H5.812c-.081 0-.159.007-.238.012.434-.844 1.438-1.438 2.606-1.438 1.163 0 2.163.588 2.6 1.426zM3.906 16.04v-.943c0-1.051.855-1.905 1.906-1.905h12.376c1.051 0 1.905.854 1.905 1.905v.943H3.906z"></path>
                </svg>
                Hotels
              </p>
            </li>
          </Link>

          <Link to={"/restaurants"}>
            <li className="rounded-full hover:bg-gray-200 py-2 px-3 cursor-pointer">
              <p className="flex font-medium items-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                  <path d="M18.753 21.459l-5.502-5.504-2.85 2.851-1.663-1.662-4.315 4.315-1.343-1.344 4.316-4.316-4.004-4.003A4.718 4.718 0 012 8.438c0-1.269.494-2.461 1.392-3.358l.834-.835 7.362 7.362.866-.866c-1.099-1.719-.777-3.972.912-5.661l2.538-2.538 1.343 1.344-2.538 2.537c-.785.787-1.254 1.903-.852 2.916l4.423-4.422 1.343 1.344-4.429 4.428c.31.13.64.188.977.164.646-.043 1.299-.364 1.838-.904a630.937 630.937 0 002.642-2.653L22 8.631s-1.241 1.255-2.647 2.66c-.865.865-1.951 1.383-3.057 1.456a4.027 4.027 0 01-2.501-.66l-.864.862 7.166 7.166-1.344 1.344zM4.291 6.995A2.835 2.835 0 003.9 8.438c0 .762.296 1.478.835 2.015l5.666 5.667 1.506-1.507-7.616-7.618z"></path>
                </svg>
                Restaurants
              </p>
            </li>
          </Link>

          <Link to={"/attractions"}>
            <li className="rounded-full hover:bg-gray-200 py-2 px-3 cursor-pointer">
              <p className="flex font-medium items-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                  <circle cx="12" cy="8.5" r="1"></circle>
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="15.5" r="1"></circle>
                  <path d="M20 6.5V8c-1.5.7-2.5 2.3-2.5 4 0 1.8 1 3.3 2.5 4v1.5H4V16c1.5-.7 2.5-2.3 2.5-4 0-1.8-1-3.3-2.5-4V6.5h16m2-2H2v5c1.4 0 2.5 1.1 2.5 2.5S3.4 14.5 2 14.5v5h20v-5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5v-5z"></path>
                </svg>
                Attractions
              </p>
            </li>
          </Link>

          <Link to={"/map"}>
            <li className="rounded-full bg-black text-white py-2 px-3 cursor-pointer">
              <p className="flex font-medium items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                    clipRule="evenodd"
                  />
                </svg>
                Map View
              </p>
            </li>
          </Link>

          {currentUser ? (
            <li className="relative"  ref={dropdownRef}>
              <button
                onClick={handleDropdownToggle}
                className="rounded-full bg-white text-black py-2 px-3 cursor-pointer flex items-center"
              >
                {currentUser ? (
                  <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="w-7 h-7 rounded-full object-cover mr-2 cursor-pointer"
                  />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                    <path d="M10 17v-3H3v-4h7V7l5 5-5 5m0-15h9a2 2 0 012 2v16a2 2 0 01-2 2h-9a2 2 0 01-2-2v-2h2v2h9V4h-9v2H8V4a2 2 0 012-2z" />
                  </svg>
                )}
                <p className="flex font-medium items-center">
                  {currentUser ? currentUser.username : "Login"}
                </p>
              </button>
              {showDropdown && (
                <ul className="absolute top-full right-0 bg-white border rounded-md shadow-lg mt-2 py-1">
                  <Link to={"/profile"}>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      Profile
                    </li>
                  </Link>
                  <li
                    className="px-4 py-2 cursor-pointer text-red-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <Link to={"/login"}>
              <li className="rounded-full  text-black py-2 px-3 cursor-pointer flex">
              <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                    <path d="M10 17v-3H3v-4h7V7l5 5-5 5m0-15h9a2 2 0 012 2v16a2 2 0 01-2 2h-9a2 2 0 01-2-2v-2h2v2h9V4h-9v2H8V4a2 2 0 012-2z" />
                  </svg>
                <p className="flex font-medium items-center">
                  {currentUser ? currentUser.username : "Login"}
                </p>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
