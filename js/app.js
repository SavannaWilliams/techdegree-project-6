// Get the letter input keys
let keyboard= document.getElementById('qwerty');
// Get the empty 'phrase' div
let phrase = document.getElementById('phrase');
// Set the starting incorrect letters to 0
let missed = 0;
// Get the start button and intro overlay
let startBtn = document.getElementsByClassName('btn__reset')[0];
let overlay = document.getElementById('overlay');

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
    // Get all the list elements with a class of 'letter'.
    let letters = document.getElementsByClassName('letter');
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

keyboard.addEventListener('click', (e) => {
    // Add the class 'chosen' to the clicked letter and disable the key so it can't be clicked again.
    e.target.classList.add('chosen');
    e.target.disabled = true;
    let btn = e.target.textContent;

    // Run checkLetter and store result in letterFound.
    let letterFound = checkLetter(btn);

    if (letterFound === null) {
        missed += 1;
        console.log("Missed " + missed);
        let scoreboard = document.getElementsByTagName('ol');
        console.log(scoreboard);
        let heart = document.querySelector('.tries:last-child');
        console.log(heart);
        scoreboard.removeChild(heart);
    }
    
});


// Pick a random phrase and return an array resulting from splitting the string.
const phraseArray = getRandomPhraseAsArray(phrases);
// Turn the array of characters into the letter game board display.
addPhraseToDisplay(phraseArray);