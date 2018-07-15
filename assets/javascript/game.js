





var selectableWords =           // Word list
    [
        "FALLOUT",
        "SMASHBROS",
        "DIVISION",
        "GODOFWAR",
        "SKYRIM",
        "FORTNITE",
        "ANTHEM",
        "KINGDOMHEARTS",
        "BATTLEFEILD",
        "THELASTOFUS",
        "CYBERPUNK",
        "WITCHER",
        "BREATHOFTHEWILD",
        "PERSONA",
    ];


const maxTries = 10;            
var guessedLetters = [];        
var currentWordIndex;           
var guessingWord = [];          
var remainingGuesses = 0;   
var hasFinished = false;         
var wins = 0;               

// Rreset the game when you rub out of guesses


function resetGame() {
    remainingGuesses = maxTries;

    

    // random word 
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    // clear everything out of the arrays
    guessedLetters = [];
    guessingWord = [];

    // clear off the hang man image after the game
     document.getElementById("hangmanImage").src = "assets/images/12.png";

    // puts the word together 

    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }   

    // Hide imges till needed
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // Show display
    updateDisplay();
};

//  Updates the html
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    // shows what we guessed right
    // the array would add commas, this removes them
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }


    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};


// grabs the right image for how many guesses we have left 
function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
    
};

// This finds repaet letters
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // need to find a way to loop through the word and grab same letters
            
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
    
        if(selectableWords[currentWordIndex][i] === letter) {
    
            positions.push(i);
    
        }
    }

    // if there are no indexes, remove a guess and update the hangman image
    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        // Loop through all the indexes and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
// chaecks if all _ are gone if so trigger win
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        
        hasFinished = true;
    }
};


// Event listener for the key strokes
document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // make sure only letters ar pressed
        if(event.keyCode >= 65 && event.keyCode <= 90) {
        
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};


// Checks remaining guesses to see if there are no guesses left
function checkLoss()
{
    if(remainingGuesses <= 0) {
        
        document.getElementById("gameover-image").style.cssText = "display: block";
        
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        
        hasFinished = true;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // need to find a way to make sure same letter isn't chosen twice
                if (guessedLetters.indexOf(letter) === -1) {

            guessedLetters.push(letter);
            
          evaluateGuess(letter);
        }
    }
    
};

