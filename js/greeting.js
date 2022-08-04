const greetLocal = localStorage.getItem('greetLocal')
const greeting__alexeykoh = document.querySelector('.greeting__alexeykoh')
const ok_btn = document.querySelector('.ok_btn')

if (greetLocal !== 'true'){
	greeting__alexeykoh.classList.add('active')
}
ok_btn.addEventListener('click',function (){
	greeting__alexeykoh.classList.remove('active')
	localStorage.setItem('greetLocal','true')
})
