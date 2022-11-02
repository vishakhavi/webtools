const uuid = require('uuid').v4;

// We could make this an ES6 class
// or a constructor function
// But here we'll just make a new object
// without using the `new` operator
// and return it
function makeWordList() {
    // These are hardcoded initial state when we restart the server
    //const id1 = uuid();

    const storedWordList = {};
    let storedWord = {
        // The below syntax lets you use a variable value as the key
        // if the value of id1 is "asdf", the property is "asdf", not "id1"


    }

    storedWordList.contains = function contains(id) {
        // This !! syntax coerces the value to a boolean
        // First by giving us the reverse of the truthy/falsy value,
        // then by reversing it to true/false
        return !!storedWord[id];
    };

    storedWordList.getWords = function getWords() {
        return storedWord;
    };

    storedWordList.addWord = function addWord(word) {
        let id = uuid();
        if (Object.keys(storedWord).length === 0) {
            storedWord = {
                id,
                word,
            };
        } else {
            storedWord = {
                ...id,
                word
            }

        }
        return storedWord.id;
    };

    return storedWordList;
};

module.exports = {
    makeWordList,
};