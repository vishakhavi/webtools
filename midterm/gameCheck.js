const wordList = require('./words');
const words = wordList.map(element => {
    return element.toUpperCase();
});
const compare = require('./compare');
let users = {
    'Jorts': {
        name: 'Jorts',
        turns: 0,
        guessList: {},
        score: 0,
        validGuess: 0,
        disabled: "",
        result: ""
    },
    'Jean': {
        name: 'Jean',
        turns: 0,
        guessList: {},
        score: 0,
        validGuess: 0,
        disabled: "",
        result: ""
    },
};
let sessions = {};

function pickWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}

function exactMatch(word, guess) {
    return word.toUpperCase() === guess.toUpperCase(); // Case-insensitive compare
}
const game = {
    word: process.env.OVERRIDE || pickWord(words),
    turns: 0,
    disabled: false
};

function takeTurn(guess, userinfo) {
    if (!guess) {
        userinfo.result = `You didn't guess`;
    }
    console.log(game.word);
    userinfo.turns = userinfo.turns + 1;
    if (words.includes(guess.toUpperCase())) {
        userinfo.result = `Your guess is valid, try again \n`;
        if (userinfo.guessList.length && userinfo.guessList.includes(guess.toUpperCase())) {
            console.log(userinfo.guessList)
            userinfo.result += `Your guess is incorrect, you have tried this earlier`;
            return userinfo.result;
        }

        if (exactMatch(game.word, guess)) {
            userinfo.result += `CORRECT!  You won in ${userinfo.turns} turns!`;
            userinfo.score = Math.min(userinfo.turns, userinfo.score == 0 ? userinfo.turns : userinfo.score);
            userinfo.validGuess += 1;
            userinfo.disabled = "disabled";
            return userinfo.result;
        }
    } else if (!words.includes(guess.toUpperCase())) {
        userinfo.result = `Your guess is invalid`;
        return userinfo.result;
    }

    const match = compare(game.word, guess);
    userinfo.guessList[guess.toUpperCase()] = match;
    users[userinfo.name] = userinfo;

    userinfo.result += ` You matched ${match} letters out of ${game.word.length}`;

    return userinfo.result;
};

const gameCheck = {
    users,
    takeTurn,
    game,
    pickWord,
    sessions
};

module.exports = gameCheck;