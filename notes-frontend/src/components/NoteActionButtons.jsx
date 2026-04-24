const NoteActionButtons = ({
  title,
  content,
  notes,
  setTitle,
  setContent,
  setNotes,
  activeNoteId,
  onDeleteNote,
  isFavourite,
  setIsFavourite,
}) => {
  // Save a note
  const addNote = async () => {
    if (!activeNoteId) {
      if (!title || !content) {
        console.log("Nothing to enter in the note");
        return;
      }

      try {
        // If not empty
        const response = await fetch("http://localhost:8000/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            is_favorite: isFavourite,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create note");
        }

        const createdNote = await response.json();

        setNotes((prevNotes) => [createdNote, ...prevNotes]);
        setTitle("");
        setContent("");
        setIsFavourite(false);
      } catch (error) {
        console.log("Error ", error);
      }
    } else {
      const response = await fetch(
        `http://localhost:8000/notes/${activeNoteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            is_favorite: isFavourite,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const createdNote = await response.json();

      setNotes(
        notes.map((note) => {
          if (note.id === activeNoteId) {
            return {
              ...note,
              title: createdNote.title,
              content: createdNote.content,
              is_favorite: createdNote.is_favorite,
            };
          }
          return note;
        }),
      );
    }
  };

  const addFavourite = async (id) => {
    if (!id) return;

    const note = notes.find((note) => note.id === id);
    if (!note) return;

    const nextFavourite = !note.is_favorite;

    try {
      const response = await fetch(`http://localhost:8000/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: note.title,
          content: note.content,
          is_favorite: nextFavourite,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favourite");
      }

      const updatedNote = await response.json();

      setIsFavourite(updatedNote.is_favorite);

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updatedNote : note)),
      );
    } catch (error) {
      console.log("Error updating favourite:", error);
    }
  };

  return (
    <div className="w-full px-4 py-3 flex justify-between">
      <div className="pt-1 pl-2">
        <button onClick={() => addFavourite(activeNoteId)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavourite ? "red" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 hover:fill-primary-red"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>

      <div className="flex gap-6 mr-6">
        <button
          className="px-6 py-2 bg-primary-purple rounded-full mr-auto font-semibold border border-light-surface text-light-surface flex gap-2 hover:bg-light-surface hover:text-primary-purple transition-colors duration-300 hover:border hover:border-primary-purple disabled:opacity-75"
          onClick={addNote}
          disabled={title && content ? false : true}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          Save
        </button>
        <button
          className="px-6 py-2  rounded-full mr-auto font-semibold text-primary-red flex gap-2 border border-primary-red hover:bg-primary-red hover:text-white transition-colors duration-300 disabled:opacity-75"
          onClick={() => onDeleteNote(activeNoteId)}
          disabled={title && content ? false : true}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="size-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteActionButtons;
