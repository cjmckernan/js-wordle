let wordOfDay = ''
let currentLetterGuess = 0
let lastLetterNumber = [4,9,14,19,29]
let totalWord = []
const WORD_DAY_URI = 'https://words.dev-apis.com/word-of-the-day'
const WORD_VALIDATE = 'https://words.dev-apis.com/validate-word'

async function getWordOfDay(){
    const promise = await fetch(WORD_DAY_URI);
    const processResp = await promise.json()
    wordOfDay = processResp.word;
    console.log(wordOfDay)
}

async function requestWordValidation() {
    const word = totalWord.join('')
    const promise = await fetch(WORD_VALIDATE, {
        method: "POST", 
        body: JSON.stringify({"word": word})
    });
    const processResp = await promise.json()
    validWord = processResp.validWord
    return validWord
}

// window.onload = function() {
//     getWordOfDay()
//   };

function validateWord() {
    if(lastLetterNumber.includes(currentLetterGuess)){
        //do validation
        if(requestWordValidation()){
            //do the matching with todays word
        }
        //update css with correct values
        if(currentLetterGuess!=29){
           currentLetterGuess += 1
        }
    } else {
        console.log("Do Nothing")
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
        console.log(input)
        setLetterGuess(input.toUpperCase())
    } else if(input === "Enter") {
        validateWord();
    }
})

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }