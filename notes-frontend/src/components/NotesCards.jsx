import moment from "moment";

const NotesCards = ({
  notes,
  activeNoteId,
  setActiveNoteId,
  setTitle,
  setContent,
  onDeleteNote,
  setIsFavourite,
  searchText,
  activeTab,
}) => {
  const activeNote = (note) => {
    setActiveNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setIsFavourite(note.is_favorite);
  };

  const searchNotes = notes.filter((note) => {
    if (
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.content.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    }
  });

  let filteredNotes;

  if (activeTab === "Favourites") {
    filteredNotes = searchNotes.filter((note) => note.is_favorite === true);
  } else if (activeTab === "Recent") {
    filteredNotes = searchNotes.sort((a, b) => b.updated_at - a.updated_at);
  } else {
    filteredNotes = [...searchNotes];
  }

  return (
    <section className="px-5 mt-6 space-y-3">
      {filteredNotes.length === 0 && (
        <p className="text-center">No Notes Yet!!! Create one 😉</p>
      )}
      {filteredNotes.map((note) => (
        <div
          className={`px-3 py-3 rounded-lg ${note.id === activeNoteId ? "bg-primary-purple" : "bg-secondary-soft"}`}
          key={note.id}
          onClick={() => activeNote(note)}
        >
          <div className="flex justify-between mb-2">
            <h2 className="font-semibold text-xl">{note.title}</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNote(note.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="red"
                className="size-6 hover:fill-primary-red hover:stroke-rose-300 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-between">
            <p>{note.content?.slice(0, 25) + "..."}</p>
            <span>{moment(note.updated_at).format("MMMM	DD")}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default NotesCards;
