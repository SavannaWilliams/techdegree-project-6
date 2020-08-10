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
    let result = choice.split('');
    console.log(result);
}


getRandomPhraseAsArray(phrases);