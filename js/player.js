const playList = [
	// {
	// 	title:    'Aqua Caelestis',
	// 	src:      './assets/sounds/AquaCaelestis.mp3',
	// 	duration: '00:40'
	// },
	// {
	// 	title:    'River Flows In You',
	// 	src:      './assets/sounds/River Flows In You.mp3',
	// 	duration: '01:37'
	// },
	// {
	// 	title:    'Ennio Morricone',
	// 	src:      './assets/sounds/Ennio Morricone.mp3',
	// 	duration: '01:37'
	// },
	// {
	// 	title:    'Summer Wind',
	// 	src:      './assets/sounds/Summer Wind.mp3',
	// 	duration: '01:51'
	// },
	{
		title:    'DD - Mish',
		src:      './assets/sounds/DD - MISH.mp3',
		duration: '01:51'
	},
	{
		title:    'DD - Vonka',
		src:      './assets/sounds/DD - VONKA.mp3',
		duration: '01:51'
	},
	{
		title:    'ЗУБЫ :) - KAZN.mp3',
		src:      './assets/sounds/ЗУБЫ - KAZN.mp3',
		duration: '01:51'
	}
]
let trackProps = {
	onAir:       false,
	position:    0,
	src:         '',
	volume:      '',
	prevVolume:  '',
	muted:       false,
	currentTime: 0,
}

// === // === // === // === // === //
// rendering playlist in DOM
renderPlaylist ()
function renderPlaylist () {
	playList.forEach ((a, index) => {
		const classPlaylist = document.querySelector ('.play-list')
		//
		const track         = document.createElement ("li")
		track.classList.add ('track')
		classPlaylist.appendChild (track);
		//
		const trackItems = document.createElement ("div");
		trackItems.classList.add ('trackItems')
		track.appendChild (trackItems);
		//
		const trackName = document.createElement ("div");
		trackName.classList.add (a.title.replace (/ /ig, '_'))
		trackName.classList.add ('trackName')
		trackName.setAttribute ('id', index);
		trackName.innerHTML = a.title;
		trackItems.appendChild (trackName);
		//
		const progressBar = document.createElement ("input");
		progressBar.classList.add ('progress-bar')
		progressBar.setAttribute ('orient', "vertical");
		progressBar.setAttribute ('type', "range");
		progressBar.setAttribute ('min', "0");
		progressBar.setAttribute ('max', "1");
		progressBar.setAttribute ('step', "0.01");
		progressBar.setAttribute ('value', `0`);
		progressBar.setAttribute ('id', `progBar-${index}`);
		progressBar.setAttribute ('oninput', `progBar(this)`);
		trackItems.appendChild (progressBar);
		//
		//
		const volumeWrapper = document.createElement ("div");
		volumeWrapper.classList.add ('volumeWrapper')
		track.appendChild (volumeWrapper);
		//
		//
		const volumeBtn = document.createElement ("img");
		volumeBtn.classList.add ('volume-btn')
		volumeBtn.classList.add ('active')
		volumeBtn.setAttribute ('alt', "volume-img");
		volumeBtn.setAttribute ('src', "assets/svg/player/volUp.svg");
		volumeWrapper.appendChild (volumeBtn);
		//
		const volumeBtnMute = document.createElement ("img");
		volumeBtnMute.classList.add ('volume-btn')
		volumeBtnMute.classList.add ('muted')
		volumeBtnMute.setAttribute ('alt', "volume-mutet-img");
		volumeBtnMute.setAttribute ('src', "assets/svg/player/volOff.svg");
		volumeWrapper.appendChild (volumeBtnMute);
		//
		const volumeFader = document.createElement ("input");
		volumeFader.classList.add ('volumeFader')
		volumeFader.setAttribute ('orient', "vertical");
		volumeFader.setAttribute ('type', "range");
		volumeFader.setAttribute ('min', "0");
		volumeFader.setAttribute ('max', "1");
		volumeFader.setAttribute ('step', "0.01");
		volumeFader.setAttribute ('value', `0.8`);
		trackProps.volume     = 0.8;
		trackProps.prevVolume = 0.8;
		volumeFader.setAttribute ('id', `volBar-${index}`);
		volumeFader.setAttribute ('oninput', `volBar(this)`);
		volumeWrapper.appendChild (volumeFader);
		//
		// render tune
		//
		const tuneImg = document.createElement ("img");
		tuneImg.classList.add ('tune')
		tuneImg.setAttribute ('alt', "tune-img");
		tuneImg.setAttribute ('src', "assets/svg/player/tune.svg");
		// volumeWrapper.appendChild (tuneImg);
	})
}

function progBar (prog) {
	// console.log (prog.value)
}

// === // === // === // === // === //
// set track volume by volume fader
function volBar (vol) {
	trackProps.volume     = vol.value;
	trackProps.prevVolume = trackProps.volume;
	let allFaders         = document.querySelectorAll ('.volumeFader')
	allFaders.forEach (function (fader) {
		if (trackProps.muted) {
			console.log ('muted')
			muteImg ()
			trackProps.muted = false;
		}
		fader.value = trackProps.volume
		kek.volume  = trackProps.volume;
	})
}

// === // === // === // === // === //
// set track to play
let currentTrackFromID = 0;
const allTracks        = document.querySelectorAll ('.trackName')
allTracks.forEach (function (track) {
	track.addEventListener ('click', function () {
		// playAudio(playList[this.id].src, this.id)
		currentTrackFromID = this.id;
		currentTrack ()
	})
})

document.querySelector ('.track-name').innerHTML = playList[currentTrackFromID].title

// === // === // === // === // === //
// set trek to play ay current position in playlist
function currentTrack () {
	document.querySelector ('.track-name').innerHTML = playList[currentTrackFromID].title;
	const allTracks                                  = document.querySelectorAll ('.progress-bar')
	allTracks.forEach (function (track) {
		track.classList.remove ('active')
		track.parentElement.classList.remove ('active')
		track.parentElement.nextSibling.classList.remove ('active')
		if (track.id === `progBar-${currentTrackFromID}`) {
			track.classList.add ('active')
			track.parentElement.classList.add ('active')
			track.parentElement.nextSibling.classList.add ('active')
		}
	})
	// add to current Track
	trackProps.position    = currentTrackFromID;
	trackProps.src         = playList[currentTrackFromID].src;
	//
	trackProps.onAir       = false;
	trackProps.currentTime = 0;
	playAudio (playList[currentTrackFromID].src, currentTrackFromID)
}

// === // === // === // === // === //
// volume buttons
const volUP = document.querySelectorAll ('.volume-btn')
volUP.forEach (function (element) {
	element.addEventListener ('click', function (a) {
		//
		muteImg ()
		//
		mute ()
	})
})

// === // === // === // === // === //
// mute sound
function mute () {
	let allFaders = document.querySelectorAll ('.volumeFader')
	allFaders.forEach (function (fader) {
		if (trackProps.muted) {
			fader.value       = 0;
			trackProps.volume = 0;
			kek.volume        = 0;
		} else {
			fader.value       = trackProps.prevVolume;
			trackProps.volume = trackProps.prevVolume;
			kek.volume        = trackProps.prevVolume;
		}
	})
}

// === // === // === // === // === //
// sound mute button
function muteImg () {
	const volUP = document.querySelectorAll ('.volume-btn')
	volUP.forEach (function (kek) {
		if (Array.from (kek.classList).includes ('active')) {
			kek.classList.remove ('active')
			trackProps.muted = false
		} else {
			kek.classList.add ('active')
			trackProps.muted = true
		}
	})
}

// === // === // === // === // === //
//  default const
const kek     = new Audio ();
const playImg = document.querySelector ('.play')


// === // === // === // === // === //
// play audio from track properties
function playAudio (src, id) {
	// to default props
	if (trackProps.src === '') {
		trackProps.src         = playList[0].src
		trackProps.volume      = 0.8;
		trackProps.currentTime = 0;
		currentTrack()
	} else {

		playImg.classList.add ('pause')
		//
		if (trackProps.onAir) {
			pause ()
		}
		//
		kek.src         = trackProps.src;
		kek.volume      = trackProps.volume;
		kek.currentTime = trackProps.currentTime;
		//
		kek.play ()
		trackDuration ()
		trackProps.onAir = true
	}
}

// === // === // === // === // === //
// buttons
const playNextBtn = document.querySelector ('.play-next')
const playPrevBtn = document.querySelector ('.play-prev')
const playBtn     = document.querySelector ('.play')
//
playNextBtn.addEventListener ('click', () => {
	trackProps.onAir       = false;
	trackProps.currentTime = 0;
	nextTrack ()
})
playPrevBtn.addEventListener ('click', () => {
	trackProps.onAir       = false;
	trackProps.currentTime = 0;
	prevTrack ()
})
playBtn.addEventListener ('click', () => {
	playAudio ()
})

// === // === // === // === // === //
// paused music
function pause () {
	console.log (pause)
	playImg.classList.remove ('pause')
	setTimeout (function () {
		kek.pause ()
		trackProps.onAir = false;
	}, 10)
}

// === // === // === // === // === //
// next track
function nextTrack () {
	currentTrackFromID++
	if (currentTrackFromID === playList.length) {
		currentTrackFromID = 0
	}
	// console.log (currentTrackFromID)
	currentTrack ()
	// playAudio(playList[currentTrackFromID].src, currentTrackFromID)
}

// === // === // === // === // === //
// previous track
function prevTrack () {
	currentTrackFromID--
	if (currentTrackFromID < 0) {
		currentTrackFromID = playList.length - 1
	}
	// console.log (currentTrackFromID)
	currentTrack ()
	// playAudio(playList[currentTrackFromID].src, currentTrackFromID)
}


// === // === // === // === // === //
// track duration
function trackDuration () {
	setTimeout (function () {
		renderProgressBar (currentTrackFromID)
		if (trackProps.onAir) {
			trackDuration ()
		}
	}, 1000)
}

// === // === // === // === // === //
// music progress bar
function renderProgressBar (id) {
	let bar                = document.getElementById (`progBar-${id}`)
	bar.max                = kek.duration;
	bar.value              = kek.currentTime
	trackProps.currentTime = kek.currentTime;
	//
	// let mins = Math.floor(kek.currentTime / 60);
	// let secs = Math.floor(kek.currentTime % 60);
	// console.log (mins+':'+secs)
}

// === // === // === // === // === //
// set current time to progress bar
const allProgBar = document.querySelectorAll ('.progress-bar')
allProgBar.forEach (function (bar) {
	bar.addEventListener ('input', function (a) {
		kek.currentTime = this.value
	})
})


// === // === // === // === // === //
// reset tracks properties
function resetTrackProps () {
	trackProps.currentTime = 0;
	trackProps.onAir       = false;
}
