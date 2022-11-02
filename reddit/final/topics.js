const uuid = require('uuid').v4;

// We could make this an ES6 class
// or a constructor function
// But here we'll just make a new object
// without using the `new` operator
// and return it
function makeTopicList() {
    // These are hardcoded initial state when we restart the server
    const id1 = uuid();
    const id2 = uuid();

    const topicList = {};
    const topics = {
        // The below syntax lets you use a variable value as the key
        // if the value of id1 is "asdf", the property is "asdf", not "id1"
        [id1]: {
            id: id1,
            topic: 'React 18 new features',
            votes: 13,
        },
        [id2]: {
            id: id2,
            topic: 'Graphql is the new norm',
            votes: 5,
        },
    };

    topicList.contains = function contains(id) {
        // This !! syntax coerces the value to a boolean
        // First by giving us the reverse of the truthy/falsy value,
        // then by reversing it to true/false
        return !!topics[id];
    };

    topicList.getTopics = function getTopics() {
        return topics;
    };

    topicList.addTopic = function addTopic(topic) {
        const id = uuid();
        topics[id] = {
            id,
            topic,
            votes: 0,
        };
        return id;
    };

    topicList.getTopic = function getTopic(id) {
        return topics[id];
    };

    topicList.updateTopic = function updateUpVoteTopic(id, topic) {
        // this uses ?? because we need to accept `false` as a legit value
        //todos[id].votes = todo.done ?? todos[id].done;
        topics[id].votes = topic.votes;
        // the below could use ?? or ||, but I don't want to accept ''
        // todos[id].votes = todo.votes || todos[id].topic;
    };

    topicList.deleteTopic = function deleteTopic(id) {
        delete topics[id];
    };

    return topicList;
};

module.exports = {
    makeTopicList,
};