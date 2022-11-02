const express = require('express');
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const uid = uuidv4();
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use(cookieParser());
const users = {
    'Jorts': {
        name: 'Jorts',
        age: 3
    },
    'Jean': {
        name: 'Jean',
        age: 5
    },
};

//const userWeb = require('./user-web');
const sessions = {};

app.get('/', (req, res) => {
    res.send(`
    <html>    
    <head>    
        <title>Login Form</title>    
        <link rel="stylesheet" type="text/css" href="css/login.css">
    </head>    
    <body>    
        <h2>Login Page</h2><br>    
        <div class="login">    
        <form id="login" method="POST" action="/login">    
            <label><b>User Name     
            </b>    
            </label>    
            <input type="text" name="username" id="Uname" placeholder="Username">    
            <br><br>       
            <button type="submit" name="log" id="log" >Login</button>      
    
        </form>     
    </div>    
    </body>    
    </html>
   `)

});
app.get('/userdetail', (req, res) => {
    const sid = req.cookies.sid;
    const { username } = sessions[sid] || {};
    const userinfo = users[username] || {}
    res.send(`
    <html>    
    <head>    
        <title>User Detail Page</title>    
        <link rel="stylesheet" type="text/css" href="css/userdetail.css">
    </head>    
    <body>    
        <h2>User Detail Page</h2><br>    
        <div class="userdetail">    
        <form method="POST" action="/update">
            <label><b>User Name :   
            </b>    
            </label>    
            <span class="details">${userinfo.name}</span>
            <br><br>  
            <label><b>User Age :   
            </b>    
            </label> 
            <span class="details">${userinfo.age}</span>
            <br><br>     
            <button type="submit" name="log" id="log" >Edit</button>  
            </form>
            <br><br>  
            <form id="logout" method="POST" action="/logout">
            <button type="submit" name="log" id="log" >Logout </button>  
            </form>
        </form>     
    </div>    
    </body>    
    </html>
   `)

});
app.post('/login', (req, res) => {
    const { username } = req.body;
    const usernameRegex = /^[a-zA-Z\-]+$/;
    if (username === 'dog' || !username || !usernameRegex.test(username) || username === "DOG") {
        res.status(403).send(`<img src="images/error.jpg">`);
        return;
    }
    const sid = uid;
    sessions[sid] = { username };
    res.cookie('sid', sid);
    if (!users[username]) {
        const newUser = { name: username, age: "" };
        users[username] = newUser;
    }
    res.redirect('/userdetail')
});

app.post('/update', (req, res) => {
    const sid = req.cookies.sid;
    const { username } = sessions[sid] || {};
    const userinfo = users[username] || {}
    res.send(`
    <html>    
    <head>    
        <title>User Detail Page</title>    
        <link rel="stylesheet" type="text/css" href="css/userdetail.css">
    </head>    
    <body>    
        <h2>User Detail Page</h2><br>    
        <div class="userdetail">    
        <form method="GET" action="/update">
            <label><b>User Name :   
            </b>    
            </label>    
            <input type="text" name="username" id="Uname" placeholder=${userinfo.name}>  
            <br><br>  
            <label><b>User Age :   
            </b>    
            </label> 
            <input type="text" name="age" id="Uname" placeholder=${userinfo.age}> 
            <br><br>
            <button type="submit" id="log" >Save </button>  
            </form>
            <form id="logout" method="POST" action="/logout">
            <button type="submit" name="log" id="log" >Logout </button>  
        </form>     
    </div>    
    </body>    
    </html>
   `)

});

app.get('/update', (req, res) => {
    const newAge = req.query.age;
    const sid = req.cookies.sid;
    const { username } = sessions[sid] || {};
    const userinfo = users[username] || {}
    if (username === 'dog' || !username) {
        res.status(403).send('invalid username');
        return;
    }
    users[username] = { name: userinfo.name, age: newAge };
    res.redirect('/userdetail')
})

app.post('/logout', (req, res) => {
    const { username } = req.body;
    const sid = uid;
    sessions[sid] = { username };
    res.clearCookie('sid');
    res.redirect('/');
});




app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));