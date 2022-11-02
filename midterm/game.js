const gameCheck = require("./gameCheck");

const game = {
    playGame: function(words, gameCheck, userinfo) {
        // Fill in/modify anything below!
        return `
      <!doctype html>
      <html>
        <head>
          <title>Let's play</title>
          <link rel="stylesheet" type="text/css" href="css/game.css">
        </head>
        <body>
        <h1> Guess the word </h1>
        <div id="game-app">
         
            <div class="display-words">
            ${game.displaySecretWords(words)}
            </div>
            <div class="play-game">
            ${game.startNewGame()}
            ${game.getGuessWord(userinfo)}
            ${game.triedWords(userinfo)}
            ${game.gameScore(userinfo)}
            ${game.displayResult(userinfo)}
            </div>
            ${game.logoutApp()}
        
          </div>
        </body>
      </html>
  `;
    },
    loginPage: function(error) {
        return `
        <!doctype html>
        <html>
          <head>
            <title>Let's play</title>
            <link rel="stylesheet" type="text/css" href="css/game.css">
          </head>
          <body>
          <h1> Let's guess the word! </h1>
            <div id="game-login">
        <div class="login">    
        <img src="images/guess-animation.gif" alt="Avatar" class="avatar">
        <form id="login" method="POST" action="/login">    
      
            <label><b>User Name     
            </b>    
            </label>    
            <input type="text" name="username" placeholder="Username">    
            <br><br>  
            <div role="alert">
            <p>${error == undefined ? "" : error} </p>
            </div>     
            <button type="submit" >Login</button>      
    
        </form>     
    </div>  
    </body>
  </html>`
    },

    displaySecretWords: function(words) {
        return `<ul class="words">` +
            Object.values(words).map(word => `
        <li>
          <div class="word-list">
              <span class="word">${word}</span>
          </div>
        </li>
        `).join('') +
            `</ul>`;
    },
    startNewGame: function() {
        return ` <div class="new-game">
        <form action="/new-game" method="POST">
          <button type="submit">Start Game</button>
        </form>
      </div>`;
    },
    getGuessWord: function(userinfo) {
        return ` <div class="start">
        <form action="/guess" method="POST">
          <input name="guess" class="guess" value="" placeholder="Enter the guess word" ${userinfo.validGuess==0 || userinfo.turns == 0? "" : userinfo.disabled} />
          <button type="submit">Enter</button>
        </form>
      </div>`;
    },
    triedWords: function(userinfo) {
        // let guess = gameCheck.users[userinfo.name].guessList || {};
        return `<div class="guess-words">
        <h3><strong>Guessed Words :</strong></h3>
        <div class="scrollable">` +
            Object.keys(gameCheck.users[userinfo.name].guessList).map(attemptedWord => {
                return `<ul>${attemptedWord} : ${ gameCheck.users[userinfo.name].guessList[attemptedWord]} matches</ul>`
            }).join("\n") +
            `</div>
        </div>`
    },
    gameScore: function(userinfo) {
        return `<div class="score">
        <h3><strong>Your best score :</strong></h3>
        <span class="wins">` + gameCheck.users[userinfo.name].score +
            `</span>
        <h3><strong>Valid guesses :</strong></h3>
        <span class="valid-guess">` + gameCheck.users[userinfo.name].validGuess +
            `</span>
        </div>`
    },
    displayResult: function(userinfo) {
        return ` <div class="result">
        <div class="message">
        <p>${gameCheck.users[userinfo.name].result}</p>
        </div>
      </div>`;
    },
    logoutApp: function() {
        return `<div class="logout-form">
         <form id="logout" method="POST" action="/logout">
        <button type="submit" name="log" id="log" >Logout </button>  
        </form>
        </div>`
    }
};
module.exports = game;