const form = document.getElementsByClassName('search-form')[0];
const cityInput = document.getElementsByClassName('input')[0];
const results = document.getElementsByClassName('results')[0];

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const cityName = cityInput.value;
  const apiKey = '3604dbff26ff89fbdd6d60955b3ddb57'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const city = data.name;

      results.innerHTML = `<p>Weather in ${city}: ${weatherDescription}, Temperature: ${temperature}*F</p>`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      results.innerHTML = 'Error fetching weather data. Please try again later.';
    });
});