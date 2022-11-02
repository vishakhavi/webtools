import Loading from './Loading';
import TopicItem from './TopicItem';

function Topics({
  topics,
  isTopicPending,
  lastAddedTopicId,
  onUpdateUpVote,
  onUpdateDownVote,
  onCreatePost
}) {
  // All this code before the return is to make the return easier to skim
  const SHOW = {  // a constant used only in this component
    PENDING: 'pending',
    EMPTY: 'empty',
    TOPICS: 'topics',
  };

  let show;
  if(isTopicPending) {
    show = SHOW.PENDING;
  } else if (!Object.keys(topics).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.TOPICS;
  }

  // The `Object.values(todos).map()` below returns
  // an array of JSX elements
  return (
    <div className="content">
      { show === SHOW.PENDING && <Loading className="topics__waiting">Loading Topics...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No Topic Items yet, add one!</p>
      )}
      { show === SHOW.TOPICS && (
        <ul className="topics">
          { Object.values(topics).map( topic => (
            <li className="topic" key={topic.id}>
              <TopicItem
                topic={topic}
                onUpdateUpVote={onUpdateUpVote}
                onUpdateDownVote={onUpdateDownVote}
                onCreatePost={onCreatePost}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Topics;
