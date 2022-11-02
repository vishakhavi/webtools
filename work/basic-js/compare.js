"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY
let guessUpperCased = guess.toUpperCase();
let freq = {};
let count = 0;
for(let i=0; i<word.length; i++) {
  if(guessUpperCased.includes(word.charAt(i))){
    freq[word.charAt(i)] = freq.hasOwnProperty( word.charAt(i) ) ? freq[word.charAt(i)] +1 : 1;
  }
}
console.log(freq);
for(let i=0; i<guessUpperCased.length; i++) {
 if (freq.hasOwnProperty(guessUpperCased.charAt(i)) && freq[guessUpperCased.charAt(i)] > 1){
  freq[guessUpperCased.charAt(i)] =  freq[guessUpperCased.charAt(i)] - 1;
  count++;
}else if(freq.hasOwnProperty(guessUpperCased.charAt(i)) && freq[guessUpperCased.charAt(i)] === 1){
  freq[guessUpperCased.charAt(i)] =  0;
  count++;
} else {
  continue;
}
}
  return count;
}
