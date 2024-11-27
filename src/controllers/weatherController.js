const fs = require('fs');
const path = require('path');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Level 1: Get City Weather Data by Name
// async function getWeatherDataByName(cityName) {
  
// }
async function getWeatherDataByName(cityName) {
  return new Promise((resolve, reject) => {
    // Reading the data from data.json
    fs.readFile(path.join(__dirname, '../data/data.json'), 'utf-8', (err, data) => {
      if (err) {
        reject({ status: 'error', message: 'Failed to read data file', error: err.message });
      } else {
        try {
          // Parsing the data to JSON
          const citiesData = JSON.parse(data);

          // Finding the city data by name
          const cityWeather = citiesData.find(city => city.city.toLowerCase() === cityName.toLowerCase());

          if (cityWeather) {
            // If city is found, return weather data
            resolve({
              status: 'success',
              message: 'Weather data retrieved',
              data: {
                city: cityWeather.city,
                temperature: cityWeather.weather.temperature,
                humidity: cityWeather.weather.humidity,
                windSpeed: cityWeather.weather.windSpeed,
                conditions: cityWeather.weather.conditions
              }
            });
          } else {
            // If city is not found
            reject({
              status: 'error',
              message: 'Failed to retrieve weather data',
              error: 'City not found'
            });
          }
        } catch (parseError) {
          reject({
            status: 'error',
            message: 'Failed to parse weather data',
            error: parseError.message
          });
        }
      }
    });
  });
}

module.exports = {
  getWeatherDataByName
};
