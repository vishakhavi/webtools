// We could make this an ES6 class
// or a constructor function
// But here we'll just make a new object
// without using the `new` operator
// and return it
function makeChatList() {
    // These are hardcoded initial state when we restart the server
    // const id1 = uuid();
    // const id2 = uuid();

    const messagesList = {};
    const chats = {
        // The below syntax lets you use a variable value as the key
        // if the value of id1 is "asdf", the property is "asdf", not "id1"
        // [id1]: {
        //     id: id1,
        //     text: 'Woke up?',
        //     username: 'Kevin',
        //     time: '06:12 AM'
        // },
        // [id2]: {
        //     id: id2,
        //     text: 'Yeah, just came from jog. How about you?',
        //     username: 'Richard',
        //     time: '08:10 AM'
        // },
    };

    messagesList.contains = function contains(id) {
        // This !! syntax coerces the value to a boolean
        // First by giving us the reverse of the truthy/falsy value,
        // then by reversing it to true/false
        return !!chats[id];
    };

    messagesList.getChats = function getChats() {
        return chats;
    };

    // messagesList.addMessage = function addMessage(text, username) {
    //     const id = uuid();
    //     chats[id] = {
    //         id,
    //         text,
    //         username,
    //         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    //     };
    //     return id;
    // };

    messagesList.getChat = function getChat(id) {
        return chats[id];
    };
    return messagesList;
}
module.exports = {
    makeChatList,
};