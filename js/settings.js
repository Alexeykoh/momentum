

document.querySelector('.settings__btn').addEventListener('click',function (){
	document.querySelector('.settings__window').classList.add('active')
	document.querySelector('.settings__btn').classList.add('active')
	document.querySelector('.settings__bg').classList.add('active')
	console.log (properties)
})
document.querySelector('.settings__bg').addEventListener('click',function (){
	document.querySelector('.settings__window').classList.remove('active')
	document.querySelector('.settings__btn').classList.remove('active')
	document.querySelector('.settings__bg').classList.remove('active')
})

// === // === // === // === // === //
//  properties data structure
function searchResult(way){
	console.log ('way => ',way)
	for (const wayKey in way) {
		if (way[wayKey]){
			return wayKey
		}
	}
}
let properties = {
	language: {
		RU: false,
		EN: true,
	},
	widgets: {
		weather: true,
		player: true,
		ToDo: true,
		quotes: true,
		date: true,
	},
	date: {
		time: true,
		date: true,
		greeting: true,
	},
	slider: {
		GitHub: true,
		Unsplash_API: false,
		Flickr_API: false,
	},
	tags: [],
}
if (localStorage.getItem('properties') === null){
	localStorage.setItem('properties', JSON.stringify(properties));
} else {
	properties = JSON.parse(localStorage.getItem('properties'))
	renderSettings()
}


// === // === // === // === // === //
// randomizer
function getRandomNum (max){
	return Math.floor(Math.random() * max)
}

// === // === // === // === // === //
// greeting
function getGreet(){
	let greetVar = [
		'night',
		'morning',
		'afternoon',
		'evening',
		'night'
	]
	const date = new Date();
	const hours = date.getHours();
	const timeID= (4/24*hours);
	return greetVar[Math.floor (timeID)]
}
const greet = getGreet()



function changeLangInProps(lang){
	for (const key in properties.language) {
		properties.language[key] = false
	}
	properties.language[lang.value] = lang.checked
	localStorage.setItem('properties', JSON.stringify(properties));
	unparseWeather()
	showDate()
	sendQuote (true)
	switchGreeting()
}
function changeWidgetInProps(widget){
	properties.widgets[widget.value] = widget.checked
	localStorage.setItem('properties', JSON.stringify(properties));
	show_hide_Widgets('widgets',widget)

}
function changeDateInProps(date){
	properties.date[date.value] = date.checked
	localStorage.setItem('properties', JSON.stringify(properties));
	show_hide_Widgets('date',date)

}
function changeApiInProps(slider){
	for (const key in properties.slider) {
		properties.slider[key] = false
	}
	properties.slider[slider.value] = slider.checked
	localStorage.setItem('properties', JSON.stringify(properties));
	setBg ()
}


function renderSettings (){
	for (const propertiesKey in properties) {
		let element = document.querySelectorAll(`.input-${propertiesKey}`)
		element.forEach(function (a, index){
			let keys = Object.keys(properties[propertiesKey])[index].toString()
			document.getElementById(a.id).checked = properties[propertiesKey][keys]
			show_hide_Widgets(propertiesKey,a)
		})
		if (propertiesKey === 'tags'){
			properties[propertiesKey].forEach((a)=>{
				renderNewTag(a)
			})
		}
	}
	document.querySelectorAll('.removeTagSVG').forEach((a)=>{
		a.addEventListener('click',removeTag)
	})
}



// === // === // === // === // === //
//
const settings__window = document.querySelector('.settings__window')
const newTagButton = document.querySelector('.new-tag__btn')
const newTagTextArea = document.querySelector('#tag-label')
newTagButton.addEventListener('click',()=>{
	createNewTag(newTagTextArea.value)
})
newTagTextArea.addEventListener('keypress',function (key){
	if (key.key === 'Enter'){
		createNewTag(newTagTextArea.value)
		key.preventDefault()
	}
})
//
function createNewTag(tagName){
	console.log (tagName)
	if (tagName !== '' && !properties.tags.includes(tagName)){
		properties.tags.push(tagName)
		renderNewTag(tagName)
	}
	newTagTextArea.value = '';
	newTagTextArea.innerHTML = '';
	newTagTextArea.focus()
	settings__window.scrollTo(0, settings__window.scrollHeight)
	//
	localStorage.setItem('properties', JSON.stringify(properties));
	//
	document.querySelectorAll('.removeTagSVG').forEach((a)=>{
		a.addEventListener('click',removeTag)
	})

}
//
function renderNewTag(id){
	const tags__container = document.querySelector('#tags__wrapper')
	let newElement = document.createElement ('li')
	newElement.classList.add ('API__tag')
	newElement.setAttribute ('id', `tagName-${id}`);
	newElement.innerHTML = id
	tags__container.appendChild (newElement)
	//
	let removeTag = document.createElement ('img')
	removeTag.classList.add ('removeTagSVG')
	removeTag.setAttribute ('id', `removeTag-${id}`);
	removeTag.setAttribute ('alt', "removeTag");
	removeTag.setAttribute ('src', "assets/svg/remove_ico.svg");
	newElement.appendChild (removeTag)
	//
}


function removeTag(){
	const id = this.id.replace (/removeTag-/ig, '')
	document.getElementById(`tagName-${id}`).remove()
	const tagArr = properties.tags;
	properties.tags.splice(tagArr.indexOf(id), 1)
	localStorage.setItem('properties', JSON.stringify(properties));
}


function show_hide_Widgets (type,input) {
	// console.log ('type / ',type)
	// console.log ('input / ',input.value)
	//
	if (type === 'date'){
		const dateDOM = document.querySelector('.date')
		const timeDOM = document.querySelector('.time')
		const nameDOM = document.querySelector('.name')
		const greetingDOM = document.querySelector('.greeting')
		//
		if(input.value === 'time'){
			if (properties.date[input.value]){
				timeDOM.classList.remove('hidden')
			} else {
				timeDOM.classList.add('hidden')
			}
		}
		if(input.value === 'date'){
			if (properties.date[input.value]){
				dateDOM.classList.remove('hidden')
			} else {
				dateDOM.classList.add('hidden')
			}
		}
		if(input.value === 'greeting'){
			if (properties.date[input.value]){
				nameDOM.classList.remove('hidden')
				greetingDOM.classList.remove('hidden')
			} else {
				nameDOM.classList.add('hidden')
				greetingDOM.classList.add('hidden')
			}
		}
	}

	if (type === 'widgets'){
		const dateDOM = document.querySelector('.date')
		const timeDOM = document.querySelector('.time')
		const nameDOM = document.querySelector('.name')
		const greetingDOM = document.querySelector('.greeting')
		//
		if(input.value === 'player'){
			const playerDOM = document.querySelector('.player')
			if (properties.widgets[input.value]){
				playerDOM.classList.remove('hidden')
			} else {
				playerDOM.classList.add('hidden')
			}
		}
		if(input.value === 'weather'){
			const playerDOM = document.querySelector('.weather')
			if (properties.widgets[input.value]){
				playerDOM.classList.remove('hidden')
			} else {
				playerDOM.classList.add('hidden')
			}
		}
		if(input.value === 'ToDo'){
			const playerDOM = document.querySelector('.ToDo__widget')
			if (properties.widgets[input.value]){
				playerDOM.classList.remove('hidden')
			} else {
				playerDOM.classList.add('hidden')
			}
		}
		if(input.value === 'quotes'){
			const playerDOM = document.querySelector('.quotes__wrapper')
			if (properties.widgets[input.value]){
				playerDOM.classList.remove('hidden')
			} else {
				playerDOM.classList.add('hidden')
			}
		}
		if(input.value === 'date'){

			if (properties.widgets[input.value]){
				dateDOM.classList.remove('hidden')
				timeDOM.classList.remove('hidden')
				nameDOM.classList.remove('hidden')
				greetingDOM.classList.remove('hidden')
			} else {
				dateDOM.classList.add('hidden')
				timeDOM.classList.add('hidden')
				nameDOM.classList.add('hidden')
				greetingDOM.classList.add('hidden')
			}
		}
	}
}
