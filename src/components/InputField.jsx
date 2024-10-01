import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const getCityData = async (cityName) => {
  const API_KEY = import.meta.env.REACT_APP_NINJA_API_KEY;
  const url = `https://api.api-ninjas.com/v1/city?name=${cityName}`;

  try {
    const { data } = await axios.get(url, {
      headers: { 'X-Api-Key': API_KEY },
    });
    return data;
  } catch (error) {
    console.error('Error fetching the city data', error);
    return [];
  }
};

const InputField = ({ location, setLocation, searchLocation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState('');

  const debounce = (func, delay) => {
    let debounceTimer;
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const fetchCities = async (query) => {
    if (query.length < 3) {
      setActiveSuggestion('');
      return;
    }

    const data = await getCityData(query);
    setSuggestions(data.map(({ name, country }) => `${name}, ${country}`));
  };

  const debouncedFetchCities = debounce(fetchCities, 300);

  useEffect(() => {
    setActiveSuggestion(suggestions[0] || '');
  }, [suggestions]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setLocation(query);
    debouncedFetchCities(query);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab' && activeSuggestion) {
      event.preventDefault();
      setLocation(activeSuggestion);
      setSuggestions([]);
    }
  };

  return (
    <div className="text-center p-4">
      <div className="relative">
        <input
          type="text"
          className="py-3 px-6 w-[700px] text-lg rounded-full border border-gray-800 text-gray-600 placeholder:text-gray-400 focus:outline-none bg-white shadow-md"
          placeholder="Enter Location"
          value={location}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onKeyDownCapture={searchLocation}
        />

        {suggestions.length > 0 && (
          <ul
            className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[700px] bg-white border border-gray-300 shadow-lg rounded-md z-10"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => {
                  setLocation(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

InputField.propTypes = {
  location: PropTypes.string,
  setLocation: PropTypes.func.isRequired,
  searchLocation: PropTypes.func,
};

export default InputField;
