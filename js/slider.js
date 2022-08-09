let slidesCounter  = getRandomNum (20)
const nextSlideBtn = document.querySelector ('.slide-next')
const prevSlideBtn = document.querySelector ('.slide-prev')
let maxSliders     = 20;



nextSlideBtn.addEventListener ('click', function () {
	//
	slidesCounter++
	if (slidesCounter === maxSliders) {
		slidesCounter = 0
	}
	setBg ()
})
//
prevSlideBtn.addEventListener ('click', function () {
	slidesCounter--
	if (slidesCounter < 0) {
		slidesCounter = props.maxSlides
	}
	setBg ()
})

setBg ()

function setBg () {
	//
	let number = slidesCounter;
	if (slidesCounter < 10) {
		number = '0' + number
	} else {
		number = slidesCounter
	}
	if (number === '00') {
		number = '01'
	}
	//
	let toDATA = {
		number_: number,
		greet_:  greet,
	}
	//
	connectAPI (toDATA)
	//

}
function connectAPI (data) {
	let importData = data;
	const body     = document.querySelector ('body')
	const img      = new Image ();
	//
	let tagList    = greet;
	if (properties.tags.length > 0) {
		tagList = properties.tags[getRandomNum(properties.tags.length)]
	}
	//
	console.log (tagList)
	//
	// GitHub API
	if (properties.slider.GitHub) {
		maxSliders = 20
		console.log ('GitHub')
		img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${data.greet_}/${data.number_}.jpg`
	}
	//
	// Unsplash_API
	if (properties.slider.Unsplash_API) {
		console.log ('Unsplash_API')
		let orientation = 'landscape',
		    query       = `${tagList}`,
		    client_id   = 'NPMe2vW-WJ_bpBgPsh4Os0PoDGKPlKI9dcg-V793pp0',
		    fetchURL    = `https://api.unsplash.com/photos/random?${orientation}=landscape&query=${query}&client_id=${client_id}`
		//
		fetch (fetchURL)
			.then (res => res.json ())
			.then (data => {
				// console.log (data)
				img.src = data.urls.regular
			});
	}
	// Flickr_API
	if (properties.slider.Flickr_API) {
		console.log ('Flickr_API')
		let extras   = 'url_h',
		    tags     = `${tagList}`, //
		    api_key  = 'a3ce305b786cb95b4e45914adc19d186',
		    fetchURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&extras=${extras}&format=json&nojsoncallback=1`
		//
		fetch (fetchURL)
			.then (res => res.json ())
			.then (data => {
				maxSliders = data.photos.photo.length
				// console.log (importData.number_*1)
				img.src    = data.photos.photo[importData.number_ * 1].url_h
			});
	}
	//
	// set background
	img.onload = () => {
		// body.style.animation = 'thanosRevers 1s'
		body.style.transition = 'background-image 1s ease-in-out'
		body.style.backgroundImage = `url(${img.src})`;
	};
}
