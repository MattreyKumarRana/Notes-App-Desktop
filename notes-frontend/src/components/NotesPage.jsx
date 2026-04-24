import { useState, useRef, useEffect } from "react";

import NotesHeader from "./NotesHeader";
import NotesTabs from "./NotesTabs";
import NotesCards from "./NotesCards";
import NotesSearch from "./NotesSearch";
import NoteActionButtons from "./NoteActionButtons";
import NoteContent from "./NoteContent";

const NotesPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const inputRef = useRef(null);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/notes");

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const jsonData = await response.json();
        setNotes(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onDeleteNote = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (confirmed) {
      setTitle("");
      setContent("");
      setActiveNoteId(null);

      if (id) {
        try {
          const response = await fetch(`http://localhost:8000/notes/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            setNotes(notes.filter((note) => note.id !== id));
          } else {
            console.log("Error while deletion");
          }
        } catch (error) {
          console.log("Error ", error);
        }
      }
    } else {
      // Logic for cancellation
      console.log("Deletion cancelled");
    }
  };

  const onNewNote = () => {
    setTitle("");
    setContent("");
    setActiveNoteId(null);
    setIsFavourite(false);
    inputRef.current.focus();
    setActiveTab("All");
  };

  return (
    <>
      <main className="w-screen h-screen grid grid-cols-4">
        <section className="w-full h-full bg-secondary-blue  text-light-surface">
          {/* Notes Header */}
          <NotesHeader />

          {/* NotesTabs */}
          <div className="w-full bg-red-100 h-0.5 mb-3"></div>
          <NotesTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setActiveNoteId={setActiveNoteId}
            setContent={setContent}
            setTitle={setTitle}
            setIsFavourite={setIsFavourite}
          />
          <div className="w-full bg-red-100 h-0.5 my-3"></div>

          {/* NotesCards */}
          <NotesCards
            notes={notes}
            activeNoteId={activeNoteId}
            setActiveNoteId={setActiveNoteId}
            setTitle={setTitle}
            setContent={setContent}
            setNotes={setNotes}
            onDeleteNote={onDeleteNote}
            setIsFavourite={setIsFavourite}
            searchText={searchText}
            activeTab={activeTab}
          />
        </section>
        <section className="w-full h-full bg-light-surface col-span-3 px-5 pt-10 flex flex-col">
          {/* NoteSearch Component */}
          <NotesSearch
            onNewNote={onNewNote}
            searchText={searchText}
            setSearchText={setSearchText}
            setTitle={setTitle}
            setContent={setContent}
            setActiveNoteId={setActiveNoteId}
          />

          {/* NoteContent */}
          <section className="my-12 w-full px-12 grow drop-shadow-lg">
            <div className="w-full h-full rounded-lg bg-white flex flex-col">
              {/* Note Content */}
              <NoteContent
                setTitle={setTitle}
                setContent={setContent}
                title={title}
                content={content}
                activeNoteId={activeNoteId}
                notes={notes}
                inputRef={inputRef}
              />

              <div className="w-full bg-light-text h-0.5"></div>
              {/* Note Action Buttons */}
              <NoteActionButtons
                title={title}
                content={content}
                notes={notes}
                setNotes={setNotes}
                setTitle={setTitle}
                setContent={setContent}
                activeNoteId={activeNoteId}
                onDeleteNote={onDeleteNote}
                isFavourite={isFavourite}
                setIsFavourite={setIsFavourite}
              />
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default NotesPage;
