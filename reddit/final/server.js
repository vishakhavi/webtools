const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const app = express();
// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

const topics = require('./topics');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

const id1 = uuid();
const id2 = uuid();
const id3 = uuid();
const id4 = uuid();
const id5 = uuid();
const userData = {
    [id1]: {
        id: id1,
        topic: 'React 18 new features',
        posts: {
            [id3]: {
                postId: id3,
                post: "Batching is when React groups multiple state updates into a single re-render for better performance. Without automatic batching, we only batched updates inside React event handlers. Updates inside of promises, setTimeout, native event handlers, or any other event were not batched in React by default. With automatic batching, these updates will be batched automatically:",
                username: "Joey",
                time: new Date(2022, 07, 05, 3, 33, 45, 0),
                votes: 3
            },
            [id4]: {
                postId: id4,
                post: "when you select a filter in a dropdown, you expect the filter button itself to respond immediately when you click. However, the actual results may transition separately. A small delay would be imperceptible and often expected. And if you change the filter again before the results are done rendering, you only care to see the latest results.",
                username: "Mel",
                time: new Date(2022, 07, 05, 4, 0, 45, 0),
                votes: -1
            },
        },
        username: "Joey",
        votes: 13,
        time: new Date(2022, 07, 05, 2, 33, 45, 0)
    },
    [id2]: {
        id: id2,
        topic: 'Graphql is the new norm',
        posts: {
            [id3]: {
                postId: id3,
                post: "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools",
                username: "Joey",
                time: new Date(2018, 12, 24, 10, 33, 30, 0),
                votes: 3
            },
            [id4]: {
                postId: id4,
                post: "Apps using GraphQL can be quick even on slow mobile network connections.",
                username: "Jack",
                time: new Date(2018, 12, 25, 10, 33, 30, 0),
                votes: 5
            },
            [id5]: {
                postId: id5,
                post: "GraphQL uses types to ensure Apps only ask for what’s possible and provide clear and helpful errors. Apps can use types to avoid writing manual parsing code..",
                username: "Richard",
                time: new Date(2018, 12, 25, 12, 33, 30, 0),
                votes: 5
            },
        },
        username: "Kevin",
        votes: 5,
        time: new Date(2018, 11, 24, 10, 33, 30, 0)
    }
};
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
        //  userData = topics.getTopics();
        users.addUserData(username, topics.makeTopicList());
    }
    // console.log(topics.makeTopicList());
    res.cookie('sid', sid);
    // res.json(users.getUserData(username).getTopics());
    res.json(userData);

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

// Topics
app.get('/api/topics', (req, res) => {
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
    // res.json(users.getUserData(username).getTopics());
    res.json(userData);
});

app.post('/api/topics', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({
            error: 'auth-missing'
        });
        return;
    }
    const {
        topic
    } = req.body;
    if (!topic) {
        res.status(400).json({
            error: 'required-topic'
        });
        return;
    }
    // const topicList = users.getUserData(username);
    // const id = topicList.addTopic(topic);
    // res.json(topicList.getTopic(id));
    const id = uuid();
    userData[id] = {
        id,
        topic,
        votes: 0,
        posts: [],
        time: new Date(),
        username: username
    };
    res.json(userData);
});

app.post('/api/posts', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({
            error: 'auth-missing'
        });
        return;
    }
    const {
        post
    } = req.body;
    if (!post) {
        res.status(400).json({
            error: 'empty-post'
        });
        return;
    }
    // const topicList = users.getUserData(username);
    // const id = topicList.addTopic(topic);
    // res.json(topicList.getTopic(id));
    const id = uuid();
    const oldPosts = userData[id].posts;
    userData[id] = {
        ...userData[id],
        posts: oldPosts.push(post),
        time: new Date(),
        username: username
    }

    res.json(userData);
});
app.get('/api/topics/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({
            error: 'auth-missing'
        });
        return;
    }
    const topicList = users.getUserData(username);
    const {
        id
    } = req.params;
    if (!topicList.contains(id)) {
        res.status(404).json({
            error: `noSuchId`,
            message: `No Topic with id ${id}`
        });
        return;
    }
    res.json(topicList.getTopic(id));
});


app.put('/api/topics/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({
            error: 'auth-missing'
        });
        return;
    }
    const topicList = users.getUserData(username);
    const {
        id
    } = req.params;
    const {
        topic,
        votes
    } = req.body;
    // Full Replacement required for a PUT
    if (!topic) {
        res.status(400).json({
            error: 'required-topic'
        });
        return;
    }
    if (!topicList.contains(id)) {
        res.status(404).json({
            error: `noSuchId`,
            message: `No Topic with id ${id}`
        });
        return;
    }
    topicList.updateTopic(id, {
        topic,
        votes
    });
    const oldPosts = userData[id].posts;
    userData[id] = {
            ...userData[id],
            posts: oldPosts.push(post),
            time: new Date(),
            username: username
        }
        // userData[id] = {
        //     id,
        //     topic,
        //     votes,
        // };
    res.json(userData);
    //res.json(topicList.getTopic(id));
});

app.patch('/api/topics/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({
            error: 'auth-missing'
        });
        return;
    }
    const {
        id
    } = req.params;
    const {
        topic,
        votes
    } = req.body;
    // const topicList = users.getUserData(username);
    // console.log(topicList.getTopics());
    console.log(userData);
    if (!userData[id]) {
        res.status(404).json({
            error: `noSuchId`,
            message: `No Topic with id ${id}`
        });
        return;
    }
    // topicList.updateTopic(id, {
    //     topic,
    //     votes
    // });
    userData[id] = {
        ...userData[id],
        votes: req.body.votes
    };
    res.json(userData);
    // res.json(topicList.getTopic(id));
});

app.delete('/api/topics/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({
            error: 'auth-missing'
        });
        return;
    }
    const {
        id
    } = req.params;
    const topicList = users.getUserData(username);
    const exists = topicList.contains(id);
    if (exists) {
        topicList.deleteTopic(id);
    }
    res.json({
        message: exists ? `Topic ${id} deleted` : `Topic ${id} did not exist`
    });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));