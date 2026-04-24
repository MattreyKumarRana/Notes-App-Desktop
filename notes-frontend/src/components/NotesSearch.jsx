const NotesSearch = ({
  onNewNote,
  searchText,
  setSearchText,
  setTitle,
  setContent,
  setActiveNoteId,
}) => {
  const searchNote = (e) => {
    setSearchText(e.target.value);
    setTitle("");
    setContent("");
    setActiveNoteId(null);
  };

  return (
    <header className="px-12 flex justify-between gap-12">
      <div className="w-2xl  bg-white relative py-1 rounded-lg focus-within:outline-1 drop-shadow-lg">
        <input
          type="text"
          placeholder="Search..."
          className="px-14 py-2 w-full h-full focus-within:outline-0"
          value={searchText}
          onChange={(e) => searchNote(e)}
        />
        <span className="absolute top-3.5 left-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
      </div>

      <button
        onClick={onNewNote}
        className="px-3 py-3 bg-primary-purple rounded-lg mr-auto font-semibold text-light-surface hover:opacity-75"
      >
        + New Note
      </button>
    </header>
  );
};

export default NotesSearch;
