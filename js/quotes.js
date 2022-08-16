const quote     = document.querySelector ('.quote')
const author    = document.querySelector ('.author')
const changeBtn = document.querySelector ('.change-quote')
changeBtn.addEventListener ('click', function () {
	sendQuote (false)
})
let quotesData = [];

let quotesState = {
	id: 0,
}

//
let new_quotesAPI = 'assets/quotes.json'
fetch (new_quotesAPI)
	.then (resp => {
		return resp.json ();
	})
	.then ((data) => quotesData = data)
	.then ((data) => {
		sendQuote (false)
	})

//
function sendQuote (newLang) {
	let random;
	const max = quotesData.RU.length
	if (!newLang) {
		quotesState.id = Math.floor (Math.random () * max)
	}
	//
	random             = quotesData[searchResult (properties.language)][quotesState.id];
	//
	quote.textContent  = random.text;
	author.textContent = random.author;
	//
}

