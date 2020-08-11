let keyboard= document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let missed = 0;
let startBtn = document.getElementsByClassName('btn__reset')[0];
let overlay = document.getElementById('overlay');

startBtn.addEventListener('click', function() {
    console.log(overlay);
    overlay.style.display = 'none';
});

const phrases = ['this is a test phrase', 'here is another test phrase'];

function getRandomPhraseAsArray (arr) {
    let maxLength = arr.length + 1;
    let randNum = Math.floor(Math.random() * (maxLength - 1)) + 1;
    let choice = arr[randNum - 1];
    return choice.split('');
}

function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++) {
        let character = arr[i];
        let ul = document.getElementsByTagName('ul')[0];
        let li = document.createElement('li');
        li.textContent = character;
        if (li.textContent !== ' ') {
            li.classList.add('letter');
        }
        ul.appendChild(li);
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 