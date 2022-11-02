import { useState } from 'react';

function CreateTopic({ onCreateTopic }) {

  const [ topic, setTopic ] = useState('');

  function onSubmit(e) {
    e.preventDefault(); // Don't forget, confusion follows if form submits
    setTopic('');
    onCreateTopic(topic);
  }

  function onTyping(e) {
    setTopic(e.target.value);
  }

  return (
    <form className="add__form" action="#/add" onSubmit={onSubmit}>
      <input className="add__topic" value={topic} onChange={onTyping}/>
      <button type="submit" className="add__button">Add Topic</button>
    </form>
  );
}

export default CreateTopic;
