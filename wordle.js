let wordOfDay = 'annul';
let currentLetterGuess = 0;
let lastLetterNumber = [4,9,14,19,29];
let totalWord = [];
const WORD_DAY_URI = 'https://words.dev-apis.com/word-of-the-day';
const WORD_VALIDATE = 'https://words.dev-apis.com/validate-word';
const abstract = document.querySelector(".abstract");

async function getWordOfDay(){
    const promise = await fetch(WORD_DAY_URI);
    const processResp = await promise.json()
    wordOfDay = processResp.word.toUpperCase();
    console.log(wordOfDay)
    setLoading(false)
}

async function requestWordValidation() {
    setLoading(true)
    const word = totalWord.join('')
    const promise = await fetch(WORD_VALIDATE, {
        method: "POST", 
        body: JSON.stringify({"word": word})
    });
    const { validWord } = await promise.json();   
    //do validation
    console.log(validWord)
    if(validWord){
        wordMatch() // wordMatch
    } else {
        console.log("Not a valid word")
        totalWord = []
    } 
    if(currentLetterGuess!=29){ 
        currentLetterGuess += 1
    }
    setLoading(false)
}

window.onload = function() {
    isLoading = true
    setLoading(isLoading)
    getWordOfDay()
};

function setLoading(isLoading) {
    if(isLoading){
        abstract.style.display = "block";
    } else {
        abstract.style.display = "none";

    }
}
ANN
function wordMatch(){
    //Join the word to match
    const userWord = totalWord.join('')
    const wordOfDayArray = wordOfDay.split('')
    let startOfLetterDiv = currentLetterGuess - 4
    if(userWord === wordOfDay){
        setAllLettersToGreen(startOfLetterDiv) 
    } else {
        for (let index = 0; index < wordOfDayArray.length; index++) {
            const currentLetterDiv = document.getElementById(startOfLetterDiv)
            if(totalWord[index] === wordOfDayArray[index]) { //if its in the right spot 
                currentLetterDiv.style.backgroundColor = "#00ef00";
            } else if(wordOfDayArray.includes(totalWord[index])){ //if its in the word 
                currentLetterDiv.style.backgroundColor = "#f84e13";
            } else { //if not in the word 
                currentLetterDiv.style.backgroundColor = "grey";
            }
            startOfLetterDiv += 1
        }
        totalWord = []
    }
}

function setAllLettersToGreen(startOfLetterDiv) {
    for (let index = 0; index < totalWord.length; index++) {
        const currentLetterDiv = document.getElementById(startOfLetterDiv)
        currentLetterDiv.style.backgroundColor = "#00ef00";
        startOfLetterDiv += 1
    }
}

async function validateWord() {
    if(lastLetterNumber.includes(currentLetterGuess)){
        //do validation
        const validWord = requestWordValidation()
        console.log(validWord)
        if(validWord){
            wordMatch() // wordMatch
        } else {
            console.log("Not a valid word")
            totalWord = []
        } 
        if(currentLetterGuess!=29){ 
           currentLetterGuess += 1
        }
    } 
}

function setLetterGuess(input) {
    const currentLetterDiv = document.getElementById(currentLetterGuess)

    if(lastLetterNumber.includes(currentLetterGuess)){
        currentLetterDiv.textContent = input
        totalWord[4] = input

    } else if(currentLetterGuess<=29){
        currentLetterDiv.textContent = input
        totalWord.push(input)
        currentLetterGuess += 1
    } else {
        console.log("Do nothing")
    }
}

document.addEventListener("keydown", function handleKeyPress(event) {
    const input = event.key
    if(isLetter(input)) {
        setLetterGuess(input.toUpperCase())
    } else if(input === "Enter") {
        if(lastLetterNumber.includes(currentLetterGuess)){
            requestWordValidation();
        }
    }
})

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }