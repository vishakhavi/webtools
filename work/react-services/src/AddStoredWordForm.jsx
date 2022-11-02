import { useState } from 'react';

function AddStoredWordForm({ onAddStoredWord }) {

  const [ storedWord, setStoredWord ] = useState('');

  function onSubmit(e) {
    e.preventDefault(); // Don't forget, confusion follows if form submits
    setStoredWord('');
    onAddStoredWord(storedWord);
  }

  function onTyping(e) {
    setStoredWord(e.target.value);
  }

  return (
    <form className="add__form" action="#/add" onSubmit={onSubmit}>
      <label>Word :</label>
      <input className="add__stored_word" value={storedWord} onChange={onTyping}/>
      <button type="submit" className="add__button">Submit</button>
    </form>
  );
}

export default AddStoredWordForm;
