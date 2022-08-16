let slidesCounter  = getRandomNum (20)
const nextSlideBtn = document.querySelector ('.slide-next')
const prevSlideBtn = document.querySelector ('.slide-prev')
let maxSliders     = 20;
let defaultColors  = {
	bgColor:   'rgba(15, 15, 15, 0.6)',
	textColor: 'white'
}

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

async function connectAPI (data) {
	let importData = data;
	const body     = document.querySelector ('body')
	//
	let tagList    = greet;
	let src;
	if (properties.tags.length > 0) {
		tagList = properties.tags[getRandomNum (properties.tags.length)]
	}
	//
	// GitHub API
	if (properties.slider.GitHub) {
		maxSliders = 20
		let source = `https://raw.githubusercontent.com/Alexeykoh/stage1-tasks/assets/images/${data.greet_}/${data.number_}.jpg`
		src        = source
		//
		adapterBG (src)
	}
	//
	// Unsplash_API
	if (properties.slider.Unsplash_API) {
		let orientation = 'landscape',
		    query       = `${tagList}`,
		    client_id   = 'NPMe2vW-WJ_bpBgPsh4Os0PoDGKPlKI9dcg-V793pp0',
		    fetchURL    = `https://api.unsplash.com/photos/random?${orientation}=landscape&query=${query}&client_id=${client_id}`
		//

		await fetch (fetchURL)
			.catch (res => {
				if (res.status !== 200) {
					fetchErr ('Unsplash API / code: ', res.status)
				}
			})
			.then (res => res.json ())
			.then (data => {
				src = data.urls.regular
				adapterBG (src)
			});


	}
	// Flickr_API
	if (properties.slider.Flickr_API) {
		let extras   = 'url_h',
		    tags     = `${tagList}`, //
		    api_key  = 'a3ce305b786cb95b4e45914adc19d186',
		    fetchURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&extras=${extras}&format=json&nojsoncallback=1`
		//
		await fetch (fetchURL)
			.catch (res => {
				if (res.status !== 200) {
					fetchErr ('Flickr API / code: ', res.status)
				}
			})
			.then (res => res.json ())
			.then (data => {
				maxSliders = data.photos.photo.length
				src        = data.photos.photo[importData.number_ * 1].url_h
				// changeColors (defaultColors.bgColor, true)
				adapterBG (src)
			});

	}
	//
	// set background
	let toData = [src]
	// adapterBG (src)

}

function imageReceived () {
	const body                 = document.querySelector ('body')
	let canvas = document.createElement("canvas");
	let context = canvas.getContext("2d");

	canvas.width = this.width;
	canvas.height = this.height;
	context.drawImage(this, 0, 0);

	// try {localStorage.setItem("saved-image-example", canvas.toDataURL("image/png"));}
	// catch(err) {console.log("Error: " + err);}

	let images = new Image()
	images.src = canvas.toDataURL("image/png")
	body.style.backgroundImage = `url(${images.src})`;
	//
	setTimeout(()=>{
		let color = getAverageRGB (images)
		console.log (color)
		changeColors (color, false)
	},10)



}

function adapterBG (src, callback, outputFormat) {
	const body      = document.querySelector ('body')
	let img         = new Image ();
	img.src         = src;
	img.crossOrigin = 'Anonymous';
	img.addEventListener ("load", imageReceived, false);
}

function adaptColor (color) {
	let match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec (color);
	return (match[1] & 255)
		+ (match[2] & 255)
		+ (match[3] & 255)
		< 3 * 256 / 2;
}

function changeColors (color, hex) {
	//console.log (color)
	let bgColor;
	if (hex) {
		bgColor = `rgb(${hexToRgb (color.replace (/#/ig, ''))},0.15)`
	} else {
		bgColor = `rgb(${color.r}, ${color.g}, ${color.b},0.15)`
	}
	document.querySelector ('.quotes').style.background        = bgColor
	document.querySelector ('.ToDo__nav').style.background     = bgColor
	document.querySelector ('.player').style.background        = bgColor
	document.querySelector ('.rss__wrapper').style.background  = bgColor
	document.querySelector ('.settings__btn').style.background = bgColor
	document.querySelector ('.weather').style.background = bgColor
	//
	// document.querySelector ('.quotes').style.color      = textColor
}

function fetchErr (api, code) {
	const warning = document.querySelector ('#warning__tag')
	let errText;
	switch (code) {
		case 403:
			errText = `отказано в доступе к ${api}`
			break;
		default:
			errText = `error ${code}`
			break;
	}
	warning.innerHTML = errText
	warning.classList.add ('active')
	setTimeout (function () {
		warning.classList.remove ('active')
	}, 5000)
}



