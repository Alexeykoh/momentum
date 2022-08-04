// greeting //
let greetVar = [
	'night',
	'morning',
	'afternoon',
	'evening',
	'night'
]
// switch ()
const date = new Date();
const hours = date.getHours();
const timeID= (4/24*hours);
let greet = greetVar[Math.floor(timeID)];
document.querySelector('.greeting').innerHTML = `Good ${greet},`;
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
