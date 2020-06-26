var counter = {};
window.addEventListener("load", function () {
  // COUNTDOWN IN SECONDS
  // EXAMPLE - 5 MINS = 5 X 60 = 300 SECS
  counter.end = 300;

  // Get the containers
  counter.min = document.getElementById("cd-min");
  counter.sec = document.getElementById("cd-sec");

  // Start if not past end date 
  if (counter.end > 0) {
    counter.ticker = setInterval(function(){
      // Stop if passed end time
      counter.end--;
      if (counter.remain <= 0) {
        counter.min.innerHTML = "done";
        counter.sec.innerHTML = "done";
        }

      // Calculate remaining time
      var secs = counter.end;
      var mins  = Math.floor(secs / 60); // 1 min = 60 secs
      secs -= mins * 60;

      // Update HTML
      counter.min.innerHTML = mins;
      counter.sec.innerHTML = secs;
    }, 1000);
  }
});



$(document).ready(function() {

  var EpossibleWords = ["jesus", "moses", "abraham","issac","daniel"]
  var HpossibleWords = ["Nathan", "Beltashazzar","Zerubabbel","Nebuchadnezzar"]
  var BPpossibleWords = ["Mahershalalhashbaz", "Chushanrishathaim","Zaphnathpaaneah", "Tilgathpilneser","Berodachbaladan" ]
  var maxGuess = 12
  var pauseGame = false

  var guessedLetters = []
  var guessingWord = []
  var wordToMatch
  var numGuess
  var wins = 0
  var difficulty = 0

  resetGame()
// if the player clicks on easy button then the game will set to easy mode with maximum guess starting at 30
  $("#Easybtn").on("click", function() {
    alert("easy mode has been selected");
    difficulty =0;
    maxGuess =12;
    counter.end =500;
    resetGame()
  });
  // if the player clicks on hard button then the game will set to hard mode with maximum guess starting at 15
  $("#Hardbtn").on("click", function() {
    alert("hard mode has been selected");
    difficulty =1;
    maxGuess =10;
    counter.end =400;
    resetGame()
  });
  //if the player click biblical proportions mode
  $("#BPbtn").on("click", function() {
    alert("bibical proportion mode has been selected");
    difficulty =2;
    maxGuess =8;
    counter.end =200;
    resetGame()
  });

  // Wait for key press
  document.onkeypress = function(event) {
      // Make sure key pressed is an alpha character
      if (isAlpha(event.key) && !pauseGame) {
          checkForLetter(event.key.toUpperCase())
      }
  }

  // Game Functions
  // Check if letter is in word & process
  function checkForLetter(letter) {
      var foundLetter = false
      var correctSound = document.createElement("audio")
      var incorrectSound = document.createElement("audio")
      correctSound.setAttribute("src", "assets/sounds/stairs.mp3")
      incorrectSound.setAttribute("src","assets/sounds/croak.mp3")

      // Search string for letter
      for (var i=0, j= wordToMatch.length; i<j; i++) {
          if (letter === wordToMatch[i]) {
              guessingWord[i] = letter
              foundLetter = true
              correctSound.play()
              // If guessing word matches random word
              if (guessingWord.join("") === wordToMatch) {
                  // Increment # of wins
                  wins++
                  pauseGame = true
                  updateDisplay()
                  setTimeout(resetGame,5000)
              }
          }
      }
// if the letter is not found then play wrong sound
      if (!foundLetter) {
          incorrectSound.play()
          
          // Check if inccorrect guess is already on the list
          if (!guessedLetters.includes(letter)) {
              // Add incorrect letter to guessed letter list
              guessedLetters.push(letter)
              // Decrement the number of remaining guesses
              numGuess--
              //minutes--
          }
          if (numGuess === 0) {
              // Display word before reseting game
              guessingWord = wordToMatch.split()
              pauseGame = true
              setTimeout(resetGame, 5000)
          }
      }

      updateDisplay()

  }
  // Check in keypressed is between A-Z or a-z
  function isAlpha (ch){
      return /^[A-Z]$/i.test(ch);
  }
//reset the current game.
  function resetGame() {
      numGuess = maxGuess
      pauseGame = false

                    if(difficulty ===0){
                                // Get a new word
                                wordToMatch = EpossibleWords[Math.floor(Math.random() * EpossibleWords.length)].toUpperCase()
                                console.log(wordToMatch)
                                
                                // Reset word arrays
                                guessedLetters = []
                                guessingWord = []

                                // Reset the guessed word
                                for (var i=0, j=wordToMatch.length; i < j; i++){
                                    // Put a space instead of an underscore between multi word "words"
                                    if (wordToMatch[i] === " ") {
                                        guessingWord.push(" ")
                                    } else {
                                        guessingWord.push("_")
                                    }
                                }

                    // Update the Display
                    updateDisplay()
                    }



                    if(difficulty ===1){
                        // Get a new word
                                    wordToMatch = HpossibleWords[Math.floor(Math.random() * HpossibleWords.length)].toUpperCase()
                                    console.log(wordToMatch)
                                    
                                    // Reset word arrays
                                    guessedLetters = []
                                    guessingWord = []
                            
                                    // Reset the guessed word
                                    for (var i=0, j=wordToMatch.length; i < j; i++){
                                        // Put a space instead of an underscore between multi word "words"
                                        if (wordToMatch[i] === " ") {
                                            guessingWord.push(" ")
                                        } else {
                                            guessingWord.push("_")
                                        }
                                    }
                            
                        // Update the Display
                        updateDisplay()
                    }
                    if(difficulty ===2){
                                    // Get a new word
                                    wordToMatch = BPpossibleWords[Math.floor(Math.random() * BPpossibleWords.length)].toUpperCase()
                                    console.log(wordToMatch)
                                    
                                    // Reset word arrays
                                    guessedLetters = []
                                    guessingWord = []
                            
                                    // Reset the guessed word
                                    for (var i=0, j=wordToMatch.length; i < j; i++){
                                        // Put a space instead of an underscore between multi word "words"
                                        if (wordToMatch[i] === " ") {
                                            guessingWord.push(" ")
                                        } else {
                                            guessingWord.push("_")
                                        }
                                        }
  
        // Update the Display
        updateDisplay()
      }


  }
  

  function updateDisplay () {
      document.getElementById("totalWins").innerText = wins
      document.getElementById("currentWord").innerText = guessingWord.join("")
      document.getElementById("remainingGuesses").innerText = numGuess
      document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
  }
})