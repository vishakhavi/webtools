function DisplayStoredWord({
  storedWord,
  isLastAdded,
}) {
  const isAddedClass = isLastAdded ? "todo__text--added" : "";
  return (
    <>
      <label>
        <input
          className="todo__toggle"
          data-id={storedWord.id}
          onChange={ (e) => {
            const id = e.target.dataset.id;
          }}
        />
        <span
          data-id={storedWord.id}
          className={`todo__toggle todo__text ${isAddedClass}`}
        >
          {storedWord}
        </span>
      </label>
    </>
  );
}

export default DisplayStoredWord;
