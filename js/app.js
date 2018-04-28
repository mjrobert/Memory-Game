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
let starCount = 3;
let starRating = 3;


    // Getting elements for timer and define firstclick
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let time;
let firstClick = true;

const modalContent = document.querySelector(".modal-content");
const modal = document.querySelector(".modal");

//const resetButton = document.querySelector(".restart");
//resetButton.addEventListener('click', reset()); 








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

    if (firstClick === true) {
   timer();
    firstClick = false;


  }

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
      seconds = seconds.textContent;
      minutes = minutes.textContent;

      toggleModal();

    }

    openCards = [];

 }













 function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  if (moves > 18 && moves < 22){
    starCount = 2;
    for (i= 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = 'collapse';
        starRating = 2;
      }
    }
  }
  else if (moves > 22) {
    starCount = 3;
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = 'collapse';
        starRating = 1;
      }
    }
  }
}


/*
*
TIMER
*
*/


function timer(startTimer) {
  time = setInterval(function() {
    seconds.innerText++;
    if (seconds.innerText == 60) {
      minutes.innerText++;
      seconds.innerText = 0;
    }
  }, 1000);
  return timer;
}


/*
*
MODAL
*
*/


    function toggleModal() {
        modal.classList.toggle("show-modal");
            let winMove = document.getElementById('winMove')

     if (minutes < 1){
document.getElementById('winText').innerHTML = (seconds + " seconds. You took " + moves + " moves, winning " + starRating + " stars." );
      }
            else if (minutes === 1) {
              document.getElementById('winText').innerHTML = (minutes + " minute and " + seconds + " seconds. You took " + moves + " moves, winning " + starRating + " stars." );
      }
            else  {
 document.getElementById('winText').innerHTML = (minutes + " minutes and " + seconds + " seconds. You took " + moves + " moves, winning " + starRating + " stars." );
      }

const resetButton = document.getElementById("replay").onclick = function(event) {
}

    }






/*
    function toggleModal() {
        modal.classList.toggle("show-modal");
        let winMessage;

      if (minutes < 1){
        winMessage = "You have completed the game in " + seconds;
        
      }

      else if (minutes === 1) {
          const winMessage = "You have completed the game in " + minutes + " minute and " + seconds;
      }

      else  {
          const winMessage = "You have completed the game in " + minutes + " minutes and " + seconds;
      }

      winMessage += " seconds. You took " + moves + " moves, earning you " + starCount + " stars."
      const winText = document.querySelector('.winText');
      winText.textContent = winMessage;
      modalContent.appendChild(winText);


      //modalContent.appendChild(modalReplay);

 


    }

*/


function reset(){
  console.log("hello");
}


  //document.getElementById('replay').addEventListener('click', reset());
 