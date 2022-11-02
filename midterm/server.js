const express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const uid = uuidv4();
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
const words = require('./words'); // words holds all the non-web logic for word match 
const game = require('./game'); // game holds the templates for the generated HTML
const gameCheck = require('./gameCheck');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    const error = req.cookies.error;
    const { username } = gameCheck.sessions[sid] || {};
    const userinfo = gameCheck.users[username] || {};
    if (!username) {
        res.clearCookie('sid');
        res.send(game.loginPage(error));
        return;
    } else {
        res.send(game.playGame(words, gameCheck, userinfo));
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Below includes an example of pulling fields from a POST request body
app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    const { username } = gameCheck.sessions[sid] || {};
    const userinfo = gameCheck.users[username] || {}
    const { guess } = req.body;
    gameCheck.result = gameCheck.takeTurn(guess, userinfo);
    res.redirect('/');

});
app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;
    const { username } = gameCheck.sessions[sid] || {};
    const userinfo = gameCheck.users[username] || {}
    gameCheck.users[userinfo.name].turns = 0;
    gameCheck.users[userinfo.name].disabled = "";
    gameCheck.users[userinfo.name].guessList = {};
    gameCheck.game.word = gameCheck.pickWord(words)
    gameCheck.result = "";
    res.redirect('/');
});
app.post('/login', (req, res) => {
    const { username } = req.body;
    const error = req.cookies.error;
    console.log({ username });
    const usernameRegex = /^[a-zA-Z0-9\-]+$/;
    if (username === 'dog' || !username || !usernameRegex.test(username) || username === "DOG") {
        res.cookie('error', 'User is not authorized', { maxAge: 30 * 1000 });
        res.redirect('/');
        return;
    }
    const sid = uid
    gameCheck.sessions[sid] = { username };
    res.cookie('sid', sid);
    if (!gameCheck.users[username]) {
        const newUser = { name: username, turns: 0, guessList: {}, score: 0, validGuess: 0, disabled: "", result: "" };
        gameCheck.users[username] = newUser;
        gameCheck.result = gameCheck.result == undefined ? "" : gameCheck.result;

    }
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    const { username } = gameCheck.sessions[sid] || {};
    delete gameCheck.sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));