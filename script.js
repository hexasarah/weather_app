const form = document.getElementsByClassName('search-form')[0];
const cityInput = document.getElementsByClassName('input')[0];
const results = document.getElementsByClassName('results')[0];
const five_day = document.getElementsByClassName('five-day')[0];

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const cityName = cityInput.value;
  const apiKey = '3604dbff26ff89fbdd6d60955b3ddb57'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;


  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const city = data.name;
      const date = new Date(data.dt * 1000);
      const weatherIcon = data.weather[0].icon;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      results.innerHTML = `
        <p>City: ${city}</p>
        <p>Date: ${date.toLocaleDateString()}</p>
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature}*F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} mph</p>
        `;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      results.innerHTML = 'Error fetching weather data. Please try again later.';
    });

    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        five_day.innerHTML = '';

        const forecastData = data.list.slice(0, 5);

          forecastData.forEach(item => {
          const date = new Date(item.dt * 1000);
          const weatherIcon = item.weather[0].icon;
          const temperature = item.main.temp;
          const humidity = item.main.humidity;
          const windSpeed = item.wind.speed;

          const forecastCard = document.createElement('div');
          forecastCard.classList.add('forecast-card');
          forecastCard.innerHTML = `
          <p>Date: ${date.toLocaleDateString()}</p>
          <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
          <p>Temperature: ${temperature}°F</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} mph</p>
          `;

          five_day.appendChild(forecastCard);
        });
      })

      .catch(error => {
        console.error('Error fetching 5-day forecast data:', error);
        five_day.innerHTML = 'Error fetching 5-day forecast data. Please try again later.';
      });
});