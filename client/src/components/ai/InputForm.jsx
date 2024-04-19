// InputForm.jsx
import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl'; // Import mapbox-gl library
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS

mapboxgl.accessToken = 'pk.eyJ1IjoiYWppdGVzaC1raXR0dSIsImEiOiJjbHNtb3p6ZW8wcWswMmxyMGJuZjU1N2kyIn0.GxjbL0VzOH2-MebPnhN08A';

const InputForm = ({ onSubmit }) => {
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [people, setPeople] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Fetch data from Mapbox API based on user input
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapboxgl.accessToken}`)
      .then(response => response.json())
      .then(data => {
        if (data.features) {
          // Extract city names from the Mapbox API response
          const cityNames = data.features.map(feature => feature.place_name);
          setSuggestions(cityNames);
        }
      })
      .catch(error => console.error('Error fetching suggestions:', error));
  };

  const handleSuggestionClick = (cityName) => {
    // Fetch coordinates for the selected city
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${mapboxgl.accessToken}`)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const coordinates = data.features[0].center;
          setDestination(cityName);
        }
      })
      .catch(error => console.error('Error fetching coordinates:', error));
    
    setInputValue(cityName);
    setSuggestions([]); // Clear suggestions
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Reset error state
    setError('');
  
    // Validate inputs
    if (days < 1) {
      setError('Minimum number of days is 1');
      return;
    }
  
    if (budget < 2000) {
      setError('Minimum budget is $2000');
      return;
    }
  
    if (people < 1 || people > 10) {
      setError('Number of people must be between 1 and 10');
      return;
    }
  
    // If all inputs are valid, submit the form
    onSubmit({ days, budget, people, destination });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className="title text-black text-xl font-bold items-center">LetsGo AI</h1>
      <form onSubmit={handleSubmit} className="w-50vw mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="days">
            Number of days:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="days"
            type="number"
            min="1"
            max="10"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="budget">
            Budget:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="budget"
            type="number"
            min="2000"
            value={budget}
            placeholder='$'
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="people">
            Number of people:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="people"
            type="number"
            min="1"
            max="10"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="destination">
            Dream destination:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Dream Destination"
            value={inputValue}
            onChange={handleInputChange}
          />
          {/* Suggestions dropdown */}
          {inputValue && (
            <ul className="absolute w-100 bg-white shadow-md mt-1 py-1">
              {[...suggestions].map((cityName, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-3 py-1 hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(cityName)}
                >
                  {cityName}
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Plan My Trip
        </button>
      </form>
    </div>
  );
};

export default InputForm;
