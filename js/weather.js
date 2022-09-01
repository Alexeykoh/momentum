const city = document.querySelector('.city')
city.addEventListener('change',function (){
	if (city.value === ''){
		weatherError()
	} else {
		setLocalStorage('city',city.value)
		unparseWeather()
	}
})
if (localStorage.getItem('city') !== city.value){
	city.value = getLocalStorage('city')
}
if (city.value === ''){
	city.value = 'Minsk'
	setLocalStorage('city',city.value)
}
window.addEventListener('load', unparseWeather)
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
//
let weatherData = [];
function unparseWeather(){
	const city = document.querySelector('.city')
	let lang = 'RU'
	if(properties.language.RU){lang = 'RU'}else{lang = 'EN'}
	let fetchURL =  `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=16403b147f210f2b15b5954139260c3f&units=metric`;
	//
	fetch (fetchURL)
		.then (resp => {
			return resp.json ();
		})
		.then ((data) => weatherData = data)
		.then((data) => {
			renderWeather()
		})
}

function renderWeather (){
	const weatherErrorDIV = document.querySelector('.weather-error')
	if (weatherData.cod !== '404'){
		if(weatherIcon.classList[2]!==undefined){
			weatherIcon.classList.remove(weatherIcon.classList[2])
		}
		weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);

		//
		let windLang = localization.weather.wind[searchResult (properties.language)],
			humidityLang = localization.weather.humidity[searchResult (properties.language)],
			speedLang = localization.weather.speed[searchResult (properties.language)];
		//
		weatherDescription.textContent = weatherData.weather[0].description;
		temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
		wind.textContent =`${windLang}: ${Math.round(weatherData.wind.speed)}, ${speedLang}`;
		humidity.textContent = `${humidityLang}: ${Math.round(weatherData.main.humidity)}%`;
		weatherErrorDIV.innerHTML = ''
	} else {
		weatherError()
	}
}
function weatherError (){
	const weatherErrorDIV = document.querySelector('.weather-error')
	weatherDescription.textContent = '';
	temperature.textContent = '';
	wind.textContent = ''
	humidity.textContent = ''
	weatherErrorDIV.textContent = localization.weather.error[searchResult(properties.language)]
}
