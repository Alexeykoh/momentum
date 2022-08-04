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

window.addEventListener('load', unparseWeather)
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
//
function unparseWeather(){
	const city = document.querySelector('.city')
	let fetchURL =  `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${props.lang}&appid=16403b147f210f2b15b5954139260c3f&units=${props.units}`;
	//
	fetch (fetchURL)
		.then (resp => {
			return resp.json ();
		})
		// .then (data => jsonData = data)
		.then (data => {
			weatherIcon.classList.add(`owf-${data.weather[0].id}`);

			temperature.textContent = `${Math.round(data.main.temp)}°C`;
			weatherDescription.textContent = data.weather[0].description;
			wind.textContent =`Скорость ветра: ${data.wind.speed}`;
			humidity.textContent = `Влажность: ${data.main.humidity}`;
		})
}

