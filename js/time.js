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
	const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
	dateSelector.textContent = date.toLocaleDateString ('en-En', options);
}
showDate();
