import PropTypes from 'prop-types';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

const getWeatherIcon = (description) => {
  const lowerDescription = description.toLowerCase();

  switch (true) {
    case lowerDescription.includes('clear'):
      return <WiDaySunny size={64} />;
    case lowerDescription.includes('cloud'):
      return <WiCloud size={64} />;
    case lowerDescription.includes('rain'):
      return <WiRain size={64} />;
    case lowerDescription.includes('snow'):
      return <WiSnow size={64} />;
    case lowerDescription.includes('thunderstorm'):
      return <WiThunderstorm size={64} />;
    case lowerDescription.includes('mist') || lowerDescription.includes('fog'):
      return <WiFog size={64} />;
    default:
      return <WiCloud size={64} />;
  }
};

const WeatherDisplay = ({ data }) => {
  const placeholderData = [
    {
      weather: [{ description: '' }],
      main: {
        humidity: 0,
      },
      wind: {
        speed: 0,
      },
      name: 'No city selected',
    },
  ];

  const weatherData = data && data.length > 0 ? data : placeholderData;

  return (
    <div className="container mx-auto max-w-sm p-6 bg-gradient-to-b from-indigo-500 from-10% via-sky-500 rounded-xl text-black shadow-lg">
      {weatherData.map((item) => (
        <div key={crypto.randomUUID ? crypto.randomUUID() : Math.random()} className="text-center">
          <div className="text-2xl mb-6 capitalize">
            {item.weather[0].description}
          </div>


          <div className="flex justify-center mb-4">
            {getWeatherIcon(item.weather[0].description)}
          </div>


          <div className="text-6xl font-bold mb-2">
            {(item.main.temp - 273.15).toFixed(1)}°C
          </div>

          <div className="text-2xl mb-6">
            {item.name}
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-2">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/humidity.png"
                alt="Humidity Icon"
                className="h-6"
              />
              <p>{item.main.humidity}% Humidity</p>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/wind.png"
                alt="Wind Icon"
                className="h-6"
              />
              <p>{item.wind.speed} km/h Wind Speed</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

WeatherDisplay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
      })
    ),
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }),
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }),
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default WeatherDisplay;
