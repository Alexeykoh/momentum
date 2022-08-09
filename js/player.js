const progress__bar            = document.getElementById ('track-progress');
progress__bar.style.background = 'linear-gradient(to right, #FFC75F 0%, #FFC75F 0%, black 0%, black 100%)'
progress__bar.addEventListener ('oninput', colorBar)

const vol__bar            = document.getElementById ('track-volume');
vol__bar.style.background = 'linear-gradient(to right, #FFC75F 0%, #FFC75F 80%, black 80%, black 100%)'
vol__bar.addEventListener ('input', colorBar)

function colorBar () {
	const value           = this.value;
	this.style.background = `linear-gradient(to right, #FFC75F 0%, #FFC75F ${value * 100}%, black ${value * 100}%, black 100%)`
}



const playImg = document.querySelector ('.play')
const track    = new Audio ();
const playList = [
	{
		title:    'Aqua Caelestis',
		src:      './assets/sounds/AquaCaelestis.mp3',
		duration: ''
	},
	{
		title:    'River Flows In You',
		src:      './assets/sounds/River Flows In You.mp3',
		duration: ''
	},
	{
		title:    'Ennio Morricone',
		src:      './assets/sounds/Ennio Morricone.mp3',
		duration: ''
	},
	{
		title:    'Summer Wind',
		src:      './assets/sounds/Summer Wind.mp3',
		duration: ''
	}
]
let trackProps = {
	onAir:       false,
	muted:       false,
	volume:      0.8,
	prevVolume:  0.8,
	src:         playList[0].src,
	position:    0,
	currentTime: 0,
	maxTime:     0,
}

document.querySelector('.track-name').innerHTML = playList[trackProps.position].title
renderPlaylist ()
function renderPlaylist () {
	playList.forEach ((a, index) => {
		const classPlaylist = document.querySelector ('.play-list')
		//
		const track__item   = document.createElement ("li")
		track__item.classList.add ('track-item')
		track__item.classList.add (`playerBtn`)
		track__item.setAttribute ('id', index);
		classPlaylist.appendChild (track__item);
		//
		const playTrackItem = document.createElement ("img");
		playTrackItem.classList.add (`track-btn`)
		playTrackItem.classList.add (`play__img`)
		playTrackItem.classList.add ('active')
		playTrackItem.setAttribute ('id', `playTrackItem__id-${index}`);
		playTrackItem.setAttribute ('alt', "track-btn");
		playTrackItem.setAttribute ('src', "./assets/svg/player/play.svg");
		track__item.appendChild (playTrackItem);
		//
		const stopTrackItem = document.createElement ("img");
		stopTrackItem.classList.add ('track-btn')
		stopTrackItem.classList.add ('stop__img')
		stopTrackItem.setAttribute ('id', `stopTrackItem__id-${index}`);
		stopTrackItem.setAttribute ('alt', "track-btn");
		stopTrackItem.setAttribute ('src', "./assets/svg/player/pause.svg");
		track__item.appendChild (stopTrackItem);
		//
		const track__item__name = document.createElement ("div");
		track__item__name.classList.add (a.title.replace (/ /ig, '_'))
		track__item__name.classList.add ('track-item__name')

		track__item__name.innerHTML = a.title;
		track__item.appendChild (track__item__name);
		//
	})
}

// === // === // === // === // === //
// set track volume by volume fader
function changeVolume (volume) {
	trackProps.volume = trackProps.prevVolume = volume.value

	changeVolumeImage (volume.value)
}

// === // === // === // === // === //
// change icon of volume button
function changeVolumeImage (volume) {
	//
	track.volume     = volume
	trackProps.muted = false
	if (volume * 1 <= 1) {
		const allTrackVolumeImage = document.querySelectorAll ('.track__volume')
		allTrackVolumeImage.forEach (function (image) {
			image.id === 'volume_3-3' ? image.classList.add ('active') : image.classList.remove ('active')
		})
	}
	if (volume * 1 <= 0.50) {
		const allTrackVolumeImage = document.querySelectorAll ('.track__volume')
		allTrackVolumeImage.forEach (function (image) {
			image.id === 'volume_2-3' ? image.classList.add ('active') : image.classList.remove ('active')
		})
	}
	if (volume * 1 <= 0.25) {
		const allTrackVolumeImage = document.querySelectorAll ('.track__volume')
		allTrackVolumeImage.forEach (function (image) {
			image.id === 'volume_1-3' ? image.classList.add ('active') : image.classList.remove ('active')
		})
	}
	if (volume * 1 === 0) {
		const allTrackVolumeImage = document.querySelectorAll ('.track__volume')
		allTrackVolumeImage.forEach (function (image) {
			image.id === 'volume-mute' ? image.classList.add ('active') : image.classList.remove ('active')
		})
		trackProps.muted = true
	}
}

// === // === // === // === // === //
// set track volume by volume button
const track__volume = document.querySelectorAll ('.track__volume')
track__volume.forEach (function (item) {
	item.addEventListener ('click', function () {
		if (!trackProps.muted) {
			trackProps.muted  = true
			trackProps.volume = 0
			vol__bar.value    = 0;
		} else {
			trackProps.muted  = false
			trackProps.volume = trackProps.prevVolume
			vol__bar.value    = trackProps.prevVolume
		}
		changeVolumeImage (vol__bar.value * 1)
		vol__bar.style.background = `linear-gradient(to right, #FFC75F 0%, #FFC75F ${trackProps.volume * 100}%, black ${trackProps.volume * 100}%, black 100%)`
	})
})

// === // === // === // === // === //
// init current track
function currentTrack () {
	trackProps.src         = playList[trackProps.position].src
	//
	const tracksInPlaylist = document.querySelectorAll ('.track-item')
	tracksInPlaylist.forEach (function (item) {
		item.classList.remove ('active')
	})
	document.getElementById (trackProps.position).classList.add ('active')
	document.querySelector('.track-name').innerHTML = playList[trackProps.position].title
	//
	document.querySelectorAll('.play__img').forEach((item)=>{
		if (item.id === `playTrackItem__id-${trackProps.position}`){
			item.classList.remove('active')
		} else {
			item.classList.add('active')
		}
	})
	document.querySelectorAll('.stop__img').forEach((item)=>{
		if (item.id === `stopTrackItem__id-${trackProps.position}`){
			item.classList.add('active')
		} else {
			item.classList.remove('active')
		}
	})

}

// === // === // === // === // === //
// select track in playlist
const tracksInPlaylist = document.querySelectorAll ('.track-item')
tracksInPlaylist.forEach (function (item) {
	item.addEventListener ('click', function (element) {
		if(this.id === trackProps.position){
			play_pause()
		} else {
			trackProps.position = this.id
			trackProps.currentTime = 0;
			currentTrack ()
			playAudio()
		}
	})

})


// === // === // === // === // === //
// buttons
const playNextBtn = document.querySelector ('.play-next')
const playPrevBtn = document.querySelector ('.play-prev')
const playBtn     = document.querySelector ('.play')
//
playNextBtn.addEventListener ('click', () => {
	trackProps.onAir       = false;
	nextTrack ()
})
playPrevBtn.addEventListener ('click', () => {
	trackProps.onAir       = false;
	prevTrack ()
})
playBtn.addEventListener ('click', () => {
	play_pause()

})

//=== // === // === // === // === //
//paused music

function play_pause (){
	currentTrack ()
	if (trackProps.onAir){
		pauseAudio()
	} else {
		playAudio()
	}
}
// === // === // === // === // === //
// play/pause audio from track properties
function playAudio () {
	track.pause()
	trackProps.onAir = true
	playImg.classList.add ('pause')
	track.src         = trackProps.src;
	track.volume      = trackProps.volume;
	track.currentTime = trackProps.currentTime;
	//
	track.play ()
	trackDuration ()
}
function pauseAudio () {
	trackProps.onAir = false
	playImg.classList.remove ('pause')
	track.pause ()
	//
	const play__img = document.getElementById(`playTrackItem__id-${trackProps.position}`)
	const stop__img = document.getElementById(`stopTrackItem__id-${trackProps.position}`)
	play__img.classList.add('active')
	stop__img.classList.remove('active')
}

// === // === // === // === // === //
// next track
function nextTrack () {
	trackProps.position++
	if (trackProps.position === playList.length) {
		trackProps.position = 0
	}
	trackProps.currentTime = 0;
	currentTrack ()
	playAudio()
}

// === // === // === // === // === //
// previous track
function prevTrack () {
	trackProps.position--
	if (trackProps.position < 0) {
		trackProps.position = playList.length - 1
	}
	trackProps.currentTime = 0;
	currentTrack ()
	playAudio()
}



// === // === // === // === // === //
// track duration
function trackDuration () {
	setTimeout (function () {
		renderProgressBar (trackProps.position)
		if (trackProps.onAir) {
			trackDuration ()
		}
	}, 100)
}

// === // === // === // === // === //
// music progress bar
const allProgBar = document.getElementById('track-progress')
function convertTime(time){
	let mins = Math.floor(time / 60);
	let secs = Math.floor(time % 60);
	if (secs<10){
		secs = '0'+ secs;
	}
	return mins+':'+secs
}
function renderProgressBar () {
	let percents = 100/track.duration*track.currentTime
	allProgBar.style.background = `linear-gradient(to right, #FFC75F 0%, #FFC75F ${percents}%, black ${percents}%, black 100%)`
	let bar                = document.getElementById (`track-progress`)
	bar.max                = track.duration;
	bar.value              = track.currentTime
	trackProps.currentTime = track.currentTime;
	let currentTime = 'on pause',
	    maxTime = ''
	if( track.duration > 0 ){
		currentTime = convertTime(track.currentTime)
		maxTime = convertTime(track.duration)
	} else {
		currentTime = 'loading'
		maxTime = ''
	}
	//
	console.log ('')
	console.log (convertTime(track.currentTime))
	console.log (currentTime)
	console.log (maxTime)
	console.log ('')
	//
	document.querySelector('.track-time').innerHTML = currentTime+':'+maxTime
	//
	if(Math.floor(track.duration-track.currentTime) === 0){
		nextTrack()
	}
}

// === // === // === // === // === //
// set current time to progress bar
allProgBar.addEventListener ('input', function () {
	let percents = 100/track.duration*track.currentTime
	track.currentTime = this.value
	trackProps.currentTime = this.value
	allProgBar.style.background = `linear-gradient(to right, #FFC75F 0%, #FFC75F ${percents}%, black ${percents}%, black 100%)`
})
