

// switch ()
document.querySelector('.greeting').innerHTML = `Good ${getGreet()},`;
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
