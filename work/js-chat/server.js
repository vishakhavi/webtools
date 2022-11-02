const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;

const app = express();
const PORT = 4000;

const chats = require('./chats');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

const messagesList = {};
// Sessions
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
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
    res.json({ username });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if (!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);

    if (!existingUserData) {
        users.addUserData(username, chats.makeChatList());
    }

    res.cookie('sid', sid);
    res.json(messagesList);
    // res.json(users.getUserData(username).getChats());
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
        users.deleteUsername(username);
    }

    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ username });
});

// Chat
app.get('/api/chat', (req, res) => {
    // Session checks for these are very repetitive - a good place to abstract out
    // I've left the repetitive sections here for ease of learning
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    //res.json(chats.makeChatList().getChats());
    // res.json(users.getUserData(username).getChats());
    res.json(messagesList);
});

app.post('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'required-text' });
        return;
    }

    //const messagesList = users.getUserData(username);
    // chats.makeChatList().addMessage(text, username);
    // res.json(chats.makeChatList().getChats());
    const id = uuid();
    messagesList[id] = {
        id,
        text,
        username,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    res.json(messagesList);
});

app.get('/api/chat/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const messagesList = users.getUserData(username);
    const { id } = req.params;
    if (!messagesList.contains(id)) {
        res.status(404).json({ error: `noSuchId`, message: `No message with id ${id}` });
        return;
    }
    res.json(messagesList.getChat(id));
});

app.get('/api/getOnlineUsers', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    res.json(users.getAllOnlineUsers())
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));