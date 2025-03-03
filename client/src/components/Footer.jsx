import React from 'react';
import icon from '../img/icon.svg';
import ajitesh from '../img/ajiteshProfile.png';
import sailesh from '../img/saileshProfile.png';
import aravind from '../img/aravindProfile.jpg';
const developers = [
  {
    name: "Ajitesh Gowlikar",
    role: "Frontend Developer",
    contact: "+91 9949213184",
    photo: ajitesh
  },
  {
    name: "Thammali Sailesh",
    role: "Backend Developer",
    contact: "+91 7075778689",
    photo: sailesh
  },
  
  {
    name: "Anumalla Aravind",
    role: "Backend Developer",
    contact: "+91 8247534862",
    photo: aravind
  },
  // Add more developers as needed
];

const Footer = () => {
  return ( 
    <div className="bg-[#faf1ed]">
      <div className="container mx-auto px-4 py-6 lg:flex justify-between lg:w-1/1">
        <div className="text-gray-800 lg:w-3/5">
          <div className="flex space-x-3 items-center">
            <img src={icon} alt="" className="h-10 w-10" style={{ width: "3.5rem" }} />
            <div>
              <p className="text-xs">
                © 2024 LetsGo All rights reserved by MLRIT Major Project Team CSE 06.
              </p>
              <div className="flex flex-wrap">
                {["Terms of Use", "Privacy and Cookies Statement", "Cookie consent", "Site Map", "How the site works"].map((item, i) => (
                  <a key={i} href="#" className="text-[0.8em] md:text-sm font-bold underline mr-2">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="text-[0.7em] md:text-xs w-full space-y-3">
            <p>
              This is the version of our website addressed to speakers of English in the World.
              </p>
            <p>
              LetsGo makes no guarantees for availability of prices advertised on our sites and applications. Listed prices may require a stay of a particular length or have blackout dates, qualifications, or other applicable restrictions. LestsGo is not responsible for any content on external web sites that are not owned or operated by LetsGo. Indicative hotel prices displayed on our “Explore” pages are estimates extrapolated from historic pricing data.
            </p>
            <p>
              LetsGo is not a booking agent or tour operator. When you book with one of our partners, please be sure to check their site for a full disclosure of all applicable fees.
            </p>
          </div>
        </div>

        <div className="text-dark lg:w-1/5 mt-4 lg:mt-0">
          <p className="font-bold mb-2">Team Members:</p>
          <div className="flex flex-wrap justify-center items-center">
            {developers.map((developer, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <img src={developer.photo} alt={developer.name} className="h-10 w-10 rounded-full" />
                <div>
                  <p className="font-bold">{developer.name}</p>
                  <p className="text-sm">{developer.role}</p>
                  <p className="text-sm">Contact: {developer.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  }

export default Footer;
