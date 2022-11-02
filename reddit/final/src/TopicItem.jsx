import { Link,Route,Routes } from 'react-router-dom';
import Post from './Post';
import App from './App';
function TopicItem({
  topic,
  onUpdateUpVote,
  onUpdateDownVote,
  onCreatePost
}) {

const onCalculateDate = (date) => {
let result = new Date(date);
let today = new Date();
  return Math.ceil((today-result) / 8.64e7);
}
  return (
    <>
      <label className='topic__label'>
        <img className="avatar" alt={topic.username} src={`https://avatars.dicebear.com/api/personas/${topic.username}.svg`}/>
        <span className="vote__count">Votes {topic.votes} </span>
        <Link to={{pathname:`/post/${topic.id}`}} >
        <div className='topic__toggle topic__text'>
        <span
          data-id={topic.id}
          className={'topic__heading'}
        >
          {topic.topic}
          </span>
           <Routes>
          <Route path="/topics" element={<App/>} exact/>
           <Route path={`/post/${topic.id}`} element={<Post topic={topic.posts} onCreatePost={onCreatePost}/>} />
          </Routes> 

        </div>
      </Link>
      </label>
      <div className='topic__buttons'>
      <button
        data-id={topic.id}
        className="topic__upvote"
        onClick={ (e) => {
          const id = e.target.dataset.id;
          onUpdateUpVote(id);
        }}
      >
        &#x1F44D;
      </button>
      <button
        data-id={topic.id}
        className="topic__downvote"
        onClick={ (e) => {
          const id = e.target.dataset.id;
          onUpdateDownVote(id);
        }}
      >
        &#x1F44E;
      </button>
      <div className="topic__details">Submitted {onCalculateDate(topic.time)} day(s) ago by  {topic.username}</div>
      </div>
    </>
  );
}

export default TopicItem;
