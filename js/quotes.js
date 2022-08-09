const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeBtn = document.querySelector('.change-quote')
changeBtn.addEventListener('click',sendQuote)
let quotesData = [];

let quotesAPI = 'https://type.fit/api/quotes'
fetch (quotesAPI)
	.then (resp => {
		return resp.json ();
	})
	// .then (data => jsonData = data)
	.then ((data) => quotesData = data)
	.then((data) => {
		sendQuote()
	})

function sendQuote (){
	const random = quotesData[Math.floor(Math.random() * quotesData.length)];
	quote.textContent = random.text;
	author.textContent = random.author;
}

