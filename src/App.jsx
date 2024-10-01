
import { useState } from "react";
import { getWeatherData } from './api/WeatherApi';
import InputField from './components/InputField';
import WeatherDisplay from './components/WeatherDisplay';

const App = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const weatherData = await getWeatherData(location);
      if (weatherData) {
        setData([weatherData]);
        console.log([weatherData]);
      }
      setLocation("");
    }
  };

  return (
    <div className='w-full h-full relative'>
      <InputField location={location} setLocation={setLocation} searchLocation={searchLocation} />
      <WeatherDisplay data={data} />
    </div>
  );
};

export default App;
