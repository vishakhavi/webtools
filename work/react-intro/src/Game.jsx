import { useState } from "react";
import compare from "./compare";
function Game({user}) {
	const [guesses, setIsGuessed] = useState('');
	const [matches, setMatchedCount] = useState('');
	const secretWord = "RECAT";
	return (
	<div className="game">
	<h1 className="game-title">Welcome <span className="game-user">{user.toUpperCase()}</span> to Word Guess game</h1>
	<h3>Enter a 5 letter word:</h3>
	<form>
	<label>
	<span>Guess Word </span>
	<input value={guesses} onInput={(e) => {setIsGuessed(e.target.value); setMatchedCount(0)}}/>
	</label>
	<button className="btn btn--play" type="button" onClick={() => setMatchedCount(compare(secretWord,guesses))}>Play</button>
	<div className="display-result">
	{ guesses.length !==0 ? 
	(guesses.length < 5 ?
		<span className="game-error">{<p>"{guesses.toUpperCase()} was not a valid word"</p>}</span>
	: (matches === 5 && secretWord.toUpperCase() === guesses.toUpperCase() ? 
	<span className="game-success">{<p>"{guesses.toUpperCase()} is the secret word"</p>}</span> :
	<span className="game-error">{<p>"{guesses.toUpperCase} had {matches || 0} letters in common"</p>}</span>)) :
	<span className="game-error">{<p>"You haven't guessed yet"</p>}</span>
	}
	</div>
	</form>
	</div>
	);

}
export default Game;