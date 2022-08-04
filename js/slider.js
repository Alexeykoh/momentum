let slidesCounter  = getRandomNum (props.maxSlides)
const nextSlideBtn = document.querySelector ('.slide-next')
const prevSlideBtn = document.querySelector ('.slide-prev')

nextSlideBtn.addEventListener ('click', function (slide) {
	slidesCounter++
	if (slidesCounter === props.maxSlides) {
		slidesCounter = 0
	}
	setBg ()
})
//
prevSlideBtn.addEventListener ('click', function (slide) {
	slidesCounter--
	if (slidesCounter < 0) {
		slidesCounter = props.maxSlides
	}
	setBg ()
})

setBg ()
function setBg () {
	const body = document.querySelector ('body')
	const img  = new Image ();
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
	img.src    = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greet}/${number}.jpg`
	img.onload = () => {
		body.style.backgroundImage = `url(${img.src})`;
	};
}
