const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
const chat = require('./chat'); // "chat" holds all the non-web logic for managing users/messages
const chatWeb = require('./chat-web'); // "chat-web" holds the templates for the generated HTML

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send(chatWeb.chatPage(chat));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Below includes an example of pulling fields from a POST request body
app.post('/chat', (req, res) => {
    const {
        username,
        text
    } = req.body; // You'll need to add something!
    // Fill in here!
    console.log(req.body);
    chat.addMessage({
        sender: username,
        text
    })
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));