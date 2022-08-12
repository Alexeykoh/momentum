

// switch ()
switchGreeting()
function switchGreeting(){
	let greeting = (localization.greeting[getGreet()][searchResult(properties.language)])
	document.querySelector('.greeting').innerHTML = `${greeting},`;

}
//

// name //
const name = document.querySelector('.name')
name.addEventListener('input',()=>
	setLocalStorage('name',name.value)
)
//
if (localStorage.getItem('name') !== name.value){
	name.value = getLocalStorage('name')
}
