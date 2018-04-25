/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const cards = document.getElementsByClassName('card') ;
const symbols = Array.from(document.querySelectorAll('.card i'));
let openCards = []; //array to hold the flipped open cards
let matchedPairs = []; //array to hold the matched cards



// declaring move variable
let moves = 0;
let counter = document.querySelector('.moves');

// declare variables for star icons
const stars = document.querySelectorAll('.fa-star');




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
    card.classList.add("card", "closed");

    // Creates the symbol on the card
    let symbol = document.createElement('i');
    let symbolClasses = shuffledSymbols[i].className.split(' ');
    symbol.classList.add(symbolClasses[0], symbolClasses[1]);

    // Add symbol to card then card to deck
    card.appendChild(symbol);
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


 deck.addEventListener('click', function click (event) {
    if (event.target.nodeName === 'LI') {  
        flipCard();
    }
});



 function flipCard() {
  if (event.target.classList.contains("closed")) {
    event.target.classList.toggle("closed");
    event.target.classList.add("open", "show");
    openCards.push(event.target);

    if (openCards.length === 2) {
      moveCounter();
      cardCheck();
    }
  }

 }



  function cardCheck() {

  console.log("card check");
  if (openCards[0].innerHTML === openCards[1].innerHTML){
      console.log("match");
      match();
  }

  else {
    setTimeout (function() {
      openCards[0].classList.remove("open", "show");
      openCards[1].classList.remove("open", "show");
      openCards[0].classList.add("closed");
      openCards[1].classList.add("closed");
      openCards = [];
    }, 400);
  }
 }


 function match () {
   openCards[0].classList.remove("open", "show");
    openCards[1].classList.remove("open", "show");
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
    matchedPairs.push(openCards);

    if (matchedPairs.length === 8){
      console.log("YOU FOUND ALL");

      win();
    }

    openCards = [];

 }













 function moveCounter() {
  moves++;
  //CHECK IF LINE BELOW IS NEEDED
  counter.innerHTML = moves;
  /* start timer on first click
  if(moves == 1){ 
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  */
  // setting rates based on moves
  if (moves > 9 && moves < 15){
    for (i= 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = 'collapse';
      }
    }
  }
  else if (moves > 15) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = 'collapse';
      }
    }
  }
}
 