import { useState } from 'react';

function CreatePosts({ onCreatePost }) {

  const [post, SetPost] = useState({});

  function onSubmit(e) {
    e.preventDefault(); // Don't forget, confusion follows if form submits
    SetPost('');
    onCreatePost(post);
  }

  function onTyping(e) {
    SetPost(e.target.value);
  }

  return (
    <form className="post__form" action="#/add" onSubmit={onSubmit}>
      <input className="add__post" onChange={onTyping}/>
      <button type="submit" className="post__button">Submit Post</button>
    </form>
  );
}

export default CreatePosts;
