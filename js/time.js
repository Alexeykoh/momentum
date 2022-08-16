	const days = [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота'
	];

	function showTime() {
		const time = document.querySelector('.time');
		const date = new Date();
		time.textContent = date.toLocaleTimeString ();
		setTimeout(showTime, 1000);
	}
	showTime();

	function showDate() {
		const dateSelector = document.querySelector('.date');
		const date = new Date();
		const options = {month: 'long', day: 'numeric', weekday: 'long', timeZone: 'UTC'};

		let lang = 'RU'
		if(properties.language.RU){lang = 'RU'}else{lang = 'EN'}
		dateSelector.textContent = date.toLocaleDateString (lang, options);
	}
	showDate();

