let slidesCounter   = getRandomNum(20)
const nextSlideBtn  = document.querySelector ('.slide-next')
const prevSlideBtn  = document.querySelector ('.slide-prev')
const settings__btn = document.querySelector ('.settings__btn')
const download__ico = document.querySelector ('.download__ico')
const slide__prev   = document.querySelector ('.slide-prev')
const slide__next   = document.querySelector ('.slide-next')
let maxSliders      = 20;
let defaultColors   = {
	bgColor:   'rgba(15, 15, 15, 0.6)',
	textColor: 'white'
}

nextSlideBtn.addEventListener ('click', function () {
	//
	if (!isCompleteLoadIMG ()) {
		console.log ('click')
		slidesCounter++
		if (slidesCounter === maxSliders) {
			slidesCounter = 0
		}
		toLoadImageAnimation ()
		setBg ()
	}
})
//
prevSlideBtn.addEventListener ('click', function () {
	if (!isCompleteLoadIMG ()) {
		slidesCounter--
		if (slidesCounter < 0) {
			slidesCounter = props.maxSlides
		}
		toLoadImageAnimation ()
		setBg ()
	}
})

setBg ()

function setBg (err) {
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
	if (err){
		toDATA.number_ ++
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
			.then (res => res.json ())

			.then (data => {
				console.log (data)
				src = data.urls.regular
				adapterBG (src)
			})
		//
	}
	// Flickr_API
	if (properties.slider.Flickr_API) {
		let extras   = 'url_h',
		    tags     = `${tagList}`, //
		    api_key  = 'a3ce305b786cb95b4e45914adc19d186',
		    fetchURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&extras=${extras}&format=json&nojsoncallback=1`
		//
		await fetch (fetchURL)
			.then (res => res.json ())
			.then (data => {
				console.log (data.status)
				maxSliders = data.photos.photo.length
				src        = data.photos.photo[importData.number_ * 1].url_h
				// changeColors (defaultColors.bgColor, true)
				adapterBG (src)
			})
		//
	}
}

// restart bg
document.querySelector('.download__ico').addEventListener('click',()=>{
	const label_GitHub = document.getElementById('label-GitHub')
	label_GitHub.checked = true
	changeApiInProps(label_GitHub)
	setBg ()
})

function toLoadImageAnimation () {
	//
	download__ico.classList.add ('active')
	slide__prev.classList.add ('onload')
	slide__next.classList.add ('onload')
	//
	console.log ('start download')
}

function isCompleteLoadIMG () {
	const download__ico = document.querySelector ('.download__ico')
	return download__ico.classList.contains ('active')
}

function completeLoadImageAnimation () {
	if (isCompleteLoadIMG ()) {
		setTimeout (() => {
			console.log ('download complete')
			download__ico.classList.remove ('active')
			slide__prev.classList.remove ('onload')
			slide__next.classList.remove ('onload')
		}, 1500)
	}
}

function imageReceived () {
	//
	const body    = document.querySelector ('body')
	let canvas    = document.createElement ("canvas");
	let context   = canvas.getContext ("2d");
	//
	canvas.width  = this.width;
	canvas.height = this.height;
	context.drawImage (this, 0, 0);
	//
	let images                 = new Image ()
	images.src                 = canvas.toDataURL ("image/png")
	//
	setTimeout (() => {
		body.style.backgroundImage = `url(${images.src})`;
	}, 500)
	
	//
	setTimeout (() => {
		let color = getAverageRGB (images)
		////console.log (color)
		changeColors (color, false)
	}, 10)
	//
	completeLoadImageAnimation ()
}

function adapterBG (src, callback, outputFormat) {
	const body      = document.querySelector ('body')
	let img         = new Image ();
	img.src         = src;
	img.crossOrigin = 'Anonymous';
	img.addEventListener ("load", imageReceived, false);
	img.onerror = () => {
		fetchErr ()
		setBg(true)
	}
}

function adaptColor (color) {
	let match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec (color);
	return (match[1] & 255)
		+ (match[2] & 255)
		+ (match[3] & 255)
		< 3 * 256 / 2;
}

function changeColors (color, hex) {
	//////console.log (color)
	let bgColor;
	let bgText;
	if (hex) {
		bgColor = `rgb(${hexToRgb (color.replace (/#/ig, ''))},0.15)`;
		bgText  = `rgb(${hexToRgb (color.replace (/#/ig, ''))})`;
	} else {
		bgColor = `rgb(${color.r}, ${color.g}, ${color.b},0.15)`;
		bgText  = `rgb(${color.r}, ${color.g}, ${color.b})`;
	}
	//
	properties.dgColor   = bgColor;
	properties.textColor = bgText;
	localStorage.setItem ('properties', JSON.stringify (properties));
	//
	document.querySelector ('.quotes').style.background           = bgColor
	document.querySelector ('.ToDo__nav').style.background        = bgColor
	document.querySelector ('.player').style.background           = bgColor
	document.querySelector ('.rss__wrapper').style.background     = bgColor
	document.querySelector ('.settings__btn').style.background    = bgColor
	document.querySelector ('.weather').style.background          = bgColor
	document.querySelector ('.settings__window').style.background = bgColor
	document.querySelector ('.download__ico').style.background    = bgColor
	//
	// document.querySelector ('.quotes').style.color      = textColor
}

function fetchErr (api, code) {
	console.log (api, code)
	const warning = document.querySelector ('#warning__tag')
	let errText;
	switch (code) {
		case 403:
			errText = `отказано в доступе ${api}, код: ${code}`
			break;
		default:
			errText = `не удалось загрузить изображение`
			break;
	}
	if (code.length <= 3) {
		warning.innerHTML = errText
		warning.classList.add ('active')
		setTimeout (function () {
			warning.classList.remove ('active')
		}, 5000)
	}
}



