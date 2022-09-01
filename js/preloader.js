function startPreloader(){
	setTimeout (() => {
		function startPreloader(){
		
		}
		let preloader      = document.querySelector ('.preloader');
		let preloader__img = document.querySelector ('.preloader-img');
		let hello          = document.querySelector ('.hello');
		let greeting       = (localization.greeting[getGreet ()][searchResult (properties.language)]);
		
		//
		function getName () {
			if (localStorage.getItem ('name') !== null) {
				return getLocalStorage ('name');
			}
			else {
				return 'my friend.';
			}
		}
		
		//
		const preGreet  = `${greeting}, ` + getName ();
		hello.innerHTML = preGreet;
		
		if (preloader.classList.contains ('active')) {
			hello.classList.add ('active');
			preloader__img.classList.remove ('active');
			setTimeout (() => {
				hello.classList.remove ('active');
				setTimeout (() => {
					preloader.classList.remove ('active');
				}, 200);
				//
			}, 1500);
		}
	}, 1000);
}

// start function
document.body.onload = () => {
	startPreloader()
};


