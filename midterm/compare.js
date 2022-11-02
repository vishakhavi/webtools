"use strict";
module.exports = compare;

function compare(word, guess) {
    let matches = 0;
    const letterCount = {};
    for (let letter of word) {
        letterCount[letter] = letterCount + 1 || 1;
    }
    for (let letter of guess.toUpperCase()) {
        if (letterCount[letter]) {
            letterCount[letter] -= 1;
            matches += 1;
        }
    }
    return matches;
}