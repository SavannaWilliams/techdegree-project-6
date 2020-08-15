// Get the letter input keys
let keyboard = document.getElementById('qwerty');
let keyBtns = document.querySelectorAll('.keyrow button');
// Get the empty 'phrase' div
let phrase = document.getElementById('phrase');
// Prepare for the phrase choice.
let currentPhrase;
// Set the starting incorrect letters to 0
let missed = 0;
// Get the start button, intro overlay, and overlay header text.
let startBtn = document.querySelector('.btn__reset');
let overlay = document.getElementById('overlay');
let overlayTitle = document.querySelector('#overlay .title');
// Preparing for the dynamically added win phrase.
let winPhrase;
// Get the document's phrase ul.
let ul = document.querySelector('#phrase ul');
// Get all letters on the phrase board
let letters = document.getElementsByClassName('letter');
// Get all shown letters on the phrase board
let shown = document.getElementsByClassName('show');
// Declare "hearts" as all none hidden hearts in the ul.
let hearts = document.querySelectorAll(".tries:not([style*='display: none']");
// Start lastHeart at -1 so can remove 0 indexed final heart.
let lastHeart = -1;

// Start and reset button event listener
startBtn.addEventListener('click', function(e) {
    // Remove chosen keyboard styling.
    keyBtns.forEach(btn => {
    btn.classList.remove('chosen');
    btn.disabled = false;
    });

    // Remove shown letters.
    for (let i = 0; i < letters.length; i++) {
        let currentLi = letters[i];
        currentLi.classList.remove('show');
    }

    // Remove none display type on hearts and check for and remove hidden class.
    for (let i = 0; i < hearts.length; i++) {
        let currentHeart = hearts[i];
        currentHeart.style.display = '';
        if (currentHeart.classList.contains('hidden')){
            currentHeart.classList.remove('hidden');
        }
    }

    // Overlay styles on delay to ensure board is cleared before revealed.
    setTimeout(function(){
        // Hide overlay and remove start class to prepare for win or loss.
        overlay.style.display = 'none';
        if (overlay.classList.contains('start')){
            overlay.classList.remove('start');
        }

        // Change start button into reset button by changing button text.
        startBtn.textContent = "Play again?";

        // Check for and remove overlay classes to prepare for new win or loss.
        if (overlay.classList.contains('win')){
            overlay.classList.remove('win');
        } else if (overlay.classList.contains('lose')){
            overlay.classList.remove('lose');
        }
    }, 200);
});

// Array of phrases for the game
const phrases = ['javascript is fun', 'bootstrap is a framework', 'react was developed by facebook', 'visual studio code is free', 'html is a markup language'];

function getRandomPhraseAsArray (arr) {
    // Get array's length, then + 1 to account for the fact that maxLength's value is exclusive in randNum.
    let maxLength = arr.length + 1;
    // This random number generator creates an integar that is inclusive of 1 and exclusive of maxLength.
    // This is why maxLength needs to be one more than the true length, because otherwise randNum would never pick the last string.
    let randNum = Math.floor(Math.random() * (maxLength - 1)) + 1;
    // Arrays start at zero, so to include that first string as a possible choice, subtract one from randNum.
    currentPhrase = arr[randNum - 1];
    console.log(currentPhrase);
    // Split the string up by character.
    return currentPhrase.split('');
}

function addPhraseToDisplay(arr){
    // Loop through the split string's characters.
    for (let i = 0; i < arr.length; i++) {
        // Select a character in the array.
        let character = arr[i];
        // Create an empty li.
        let li = document.createElement('li');
        // Give the li the text content of the selected character.
        li.textContent = character;
        // If the selected character is a letter, give it the class of 'letter'. Otherwise, give it the class of 'space'.
        if (li.textContent !== ' ') {
            li.classList.add('letter');
        } else {
            li.classList.add('space');
        }
        // Add the li to the ul.
        ul.appendChild(li);
    }
}

function checkLetter (btn){
    // Checking for undefined stops it for adding to Missed when clicking the keyboard's white space.
    if (btn !== undefined) {
        // Get all the list elements with a class of 'letter'.
        let match = '';
        for (let i = 0; i < letters.length; i++) {
            // Get the current list item.
            let currentLi = letters[i];
            // Get the text content of the current list item.
            let currentLtr = letters[i].textContent;

            // If the current letter matches the pushed button, give it the class 'show' to show the tile.
            if (currentLtr === btn) {
                currentLi.classList.add('show');
                match = currentLtr;
            }
        }
        if (match !== '') {
            return match;
        } else {
            return null;
        }
    }
}

function resetGame() {
    // Reset missed and lastHeart to initial numbers.
    missed = 0;
    lastHeart = -1;

    //Clear current phrase board.
    while(ul.firstChild ){
        ul.removeChild(ul.firstChild);
      }

    // Pick new phrase and add to letter game board.
    let phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
}

function checkWin () {
    let showLength = shown.length;
    let ltrsLength = letters.length;
    // Win: If shown letters are equal to the total number of letters in the phrase, the player wins.
    if (showLength === ltrsLength) {
        // Update the overlay after .28 seconds (enough time for the final heart to disappear).
        setTimeout(function(){
            overlay.style.display = '';
            overlay.classList.add('win');
            winPhrase = overlay.prepend(`Correct! "${currentPhrase}."`);
            winPhrase.classList.add('win-phrase');
            overlayTitle.textContent = "You won!";
            //Reset missed.
            resetGame();
        }, 280);

    // Lose: If the play has had 5 wrong choices, they lose.
    } else if (missed === 5) {
        // Update the overlay after .28 seconds.
        setTimeout(function(){
            overlay.style.display = '';
            overlay.classList.remove('start');
            overlay.classList.add('lose');
            overlayTitle.textContent = "You lost.";
            //Reset game.
            resetGame();
        }, 280);
    }
}

keyboard.addEventListener('click', (e) => {
    let btn;
    let clicked = e.target;

    // Check that the clicked element is a letter button.
    if (clicked.tagName == 'BUTTON') {
    // Add the class 'chosen' to the clicked letter and disable the key so it can't be clicked again.
        clicked.classList.add('chosen');
        clicked.disabled = true;
        btn = clicked.textContent;
    }

    // Run checkLetter and store result in letterFound.
    let letterFound = checkLetter(btn);

    /// If letterFound returns null (wrong letter clicked) then add one to Missed and hide the last heart in the ol.
    if (letterFound === null) {
        missed += 1;
        lastHeart +=1;
        // If heart is not the fifth heart, add .hidden which contains transitions and an animation.
        if (lastHeart !== 4) {
            hearts[lastHeart].classList.add('hidden');
            // Delay setting the display to none until the animations have finished (in 1 second).
            setTimeout(function(){
                hearts[lastHeart].style.display = 'none';
            }, 1000);
        // If the heart is the fifth heart, skip the animations and hide immediately.
        } else {
            hearts[lastHeart].style.display = 'none';
        }
    }

    // Check for win lose condition.
    checkWin();
});


// Pick a random phrase and return an array resulting from splitting the string.
let phraseArray = getRandomPhraseAsArray(phrases);
// Turn the array of characters into the letter game board display.
addPhraseToDisplay(phraseArray);