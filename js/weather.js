// let jsonData   = [];
//
// setLocalStorage('city','Minsk')
//
const city = document.querySelector('.city')
city.addEventListener('change',function (){
	setLocalStorage('city',city.value)
	unparseWeather()
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
	if (weatherData.cod !== '404'){
		if(weatherIcon.classList[2]!==undefined){
			weatherIcon.classList.remove(weatherIcon.classList[2])
		}
		weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);

		temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
		weatherDescription.textContent = weatherData.weather[0].description;
		wind.textContent =`Скорость ветра: ${weatherData.wind.speed}`;
		humidity.textContent = `Влажность: ${weatherData.main.humidity}`;
	} else {
		alert('jopa')
		city.value = 'Minsk'
		setLocalStorage('city',city.value)
		unparseWeather()
	}
}
