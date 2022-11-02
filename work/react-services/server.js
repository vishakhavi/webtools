const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

const words = require('./storedWords');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({
            error: 'auth-missing'
        });
        return;
    }
    // Notice here that an existing session will just get back the username
    // So the consumer will need to make an additional service call to get the list of todos
    // But below performing a login (creating a session) will return the list of todos directly
    // I have this difference because these are the sorts of quirks you can expect when you
    // consume services, not because I advocate for this inconsistency
    //
    // Which way is best depends on your service
    // - forcing extra service calls is bad
    // - sending more data than needed is bad
    // Your service specifics decides which is "worse"
    res.json({
        username
    });
});

app.post('/api/session', (req, res) => {
    const {
        username
    } = req.body;

    if (!users.isValid(username)) {
        res.status(400).json({
            error: 'required-username'
        });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({
            error: 'auth-insufficient'
        });
        return;
    }

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);

    if (!existingUserData) {
        users.addUserData(username, words.makeWordList());
    }

    res.cookie('sid', sid);
    res.json(users.getUserData(username).getWords());
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        // Delete the session, but not the user data
        sessions.deleteSession(sid);
    }

    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({
        username
    });
});

app.get('/api/word', (req, res) => {
    // Session checks for these are very repetitive - a good place to abstract out
    // I've left the repetitive sections here for ease of learning
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({
            error: 'auth-missing'
        });
        return;
    }
    res.json(users.getUserData(username).getWords());
});

app.post('/api/word', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({
            error: 'auth-missing'
        });
        return;
    }
    const {
        word
    } = req.body;
    if (!word) {
        res.status(400).json({
            error: 'required-word'
        });
        return;
    }
    // users.addUserData(username, word)
    const wordList = users.getUserData(username);
    const id = wordList.addWord(word);
    console.log(id);
    res.json(wordList.getWords());
    // res.json(users.getUserData(username).getWords());
});

app.get('/api/word/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({
            error: 'auth-missing'
        });
        return;
    }
    const wordList = users.getUserData(username);
    const {
        id
    } = req.params;
    if (!wordList.contains(id)) {
        res.status(404).json({
            error: `noSuchId`,
            message: `No word with id ${id}`
        });
        return;
    }
    res.json(wordList.getWords());
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));