// Get the letter input keys
let keyboard = document.getElementById('qwerty');
let keyBtns = document.querySelectorAll('.keyrow button');
// Get the empty 'phrase' div
let phrase = document.getElementById('phrase');
// Set the starting incorrect letters to 0
let missed = 0;
// Get the start button, intro overlay, and overlay header text.
let startBtn = document.getElementsByClassName('btn__reset')[0];
let overlay = document.getElementById('overlay');
let overlayTitle = document.querySelector('#overlay .title');
// Get all letters on the phrase board
let letters = document.getElementsByClassName('letter');
// Get all shown letters on the phrase board
let shown = document.getElementsByClassName('show');
// Prepare for reset button
let resetBtn = document.createElement('a');
resetBtn.textContent = "Play again?";
resetBtn.classList.add('btn__reset');
overlay.appendChild(resetBtn);
resetBtn.style.display = "none";
// Hide the intro overlay when start button clicked
startBtn.addEventListener('click', function() {
    overlay.style.display = 'none';
});

// Array of phrases for the game
const phrases = ['this is a test phrase', 'here is another test phrase', 'yet another phrase to test'];

function getRandomPhraseAsArray (arr) {
    // Get array's length, then + 1 to account for the fact that maxLength's value is exclusive in randNum.
    let maxLength = arr.length + 1;
    // This random number generator creates an integar that is inclusive of 1 and exclusive of maxLength.
    // This is why maxLength needs to be one more than the true length, because otherwise randNum would never pick the last string.
    let randNum = Math.floor(Math.random() * (maxLength - 1)) + 1;
    // Arrays start at zero, so to include that first string as a possible choice, subtract one from randNum.
    let choice = arr[randNum - 1];
    console.log(choice);
    // Split the string up by character.
    return choice.split('');
}

function addPhraseToDisplay(arr){
    // Loop through the split string's characters.
    for (let i = 0; i < arr.length; i++) {
        // Select a character in the array.
        let character = arr[i];
        // Get the document's empty ul.
        let ul = document.getElementsByTagName('ul')[0];
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

function checkWin () {
    let showLength = shown.length;
    let ltrsLength = letters.length;
    // Win- If shown letters are equal to the total number of letters in the phrase, the player wins.
    if (showLength === ltrsLength) {
        // Update the overlay
        overlay.style.display = '';
        overlay.classList.remove('start');
        overlay.classList.add('win');
        overlayTitle.textContent = "You won!";
        // Create the reset button
        startBtn.remove();
        resetBtn.style.display = "";

        resetBtn.addEventListener('click', (e) => {
            missed = 0;
            for (let i = 0; i < letters.length; i++) {
                // Get the current list item.
                let currentLi = letters[i];
                currentLi.classList.remove('show');
            }
            keyBtns.forEach(btn => {
                btn.classList.remove('chosen');
                btn.disabled = false;
            });

            overlay.style.display = 'none';
        });
        
    // Lose- If the play has had 5 wrong choices, they lose.
    } else if (missed === 5) {
        // Update the overlay
        overlay.style.display = '';
        overlay.classList.remove('start');
        overlay.classList.add('lose');
        overlayTitle.textContent = "You lost.";
        // Create the reset button
        startBtn.remove();
        resetBtn.style.display = "";
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

    /// If letterFound returns null (wrong letter clicked) then add one to Missed and remove the last heart in the ol.
    if (letterFound === null) {
        missed += 1;
        console.log("Missed " + missed);
        let heart = document.querySelector('.tries:last-child');
        heart.remove();
    }

    // Check for win lose condition.
    checkWin();
});


// Pick a random phrase and return an array resulting from splitting the string.
const phraseArray = getRandomPhraseAsArray(phrases);
// Turn the array of characters into the letter game board display.
addPhraseToDisplay(phraseArray);