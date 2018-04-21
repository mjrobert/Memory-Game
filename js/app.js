/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const cards = document.getElementsByClassName('card') ;
const symbols = Array.from(document.querySelectorAll('.card i'));






// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method above
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


function createDeck() {
	deck.innerHTML = "";
	let shuffledSymbols = shuffle(symbols);

	for(let i = 0; i < 16; i++) {
		// Creates individual cards
		let card = document.createElement('li');
		card.classList.add('card');

		// Creates the symbol on the card
		let symbol = document.createElement('i');
		let symbolClasses = shuffledSymbols[i].className.split(' ');
		console.log(symbolClasses);
		symbol.classList.add(symbolClasses[0], symbolClasses[1]);

		// Add symbol to card then card to deck
		card.appendChild(symbol);
		console.log(card);
		deck.appendChild(card);
	}
}

createDeck();




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 deck.addEventListener('click', function (event) {
    if (event.target.nodeName === 'LI') {  
        event.target.classList.add("open", "show");
    }
});
