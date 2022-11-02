import Loading from './Loading';

function StoredWord({
  storedWord,
  isStoredWordPending,
}) {
  // All this code before the return is to make the return easier to skim
  const SHOW = {  // a constant used only in this component
    PENDING: 'pending',
    EMPTY: 'empty',
    STORED_WORD: 'storedWord',
  };

  let show;
  if(isStoredWordPending) {
    show = SHOW.PENDING;
  } else if (!storedWord.word) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.STORED_WORD;
  }

  // The `Object.values(todos).map()` below returns
  // an array of JSX elements
  return (
    <div className="stored-content">
      { show === SHOW.PENDING && <Loading className="words__waiting">Loading Stored Word...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No stored word yet, add one!</p>
      )}
      { show === SHOW.STORED_WORD && (
        <span
          data-id={storedWord.id}
          className={`stored-word__text`}
        >
          Stored word : {storedWord.word}
        </span>
      )}
    </div>
  );
}

export default StoredWord;
