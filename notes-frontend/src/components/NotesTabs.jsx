const NotesTabs = ({
  activeTab,
  setActiveTab,
  setActiveNoteId,
  setTitle,
  setContent,
  setIsFavourite,
}) => {
  const changeActiveTab = (e) => {
    setActiveTab(e.target.innerText);
    setActiveNoteId(null);
    setTitle("");
    setContent("");
    setIsFavourite(false);
  };

  return (
    <>
      <section className="px-5 flex justify-center gap-3">
        <button
          className={`px-6 py-3 rounded-lg font-semibold ${activeTab === "All" ? "bg-light-text text-secondary-blue" : "bg-secondary-soft"} transition-colors duration-300`}
          onClick={(e) => changeActiveTab(e)}
        >
          All
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold ${activeTab === "Favourites" ? "bg-light-text text-secondary-blue" : "bg-secondary-soft"} transition-colors duration-300`}
          onClick={(e) => changeActiveTab(e)}
        >
          Favourites
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold ${activeTab === "Recent" ? "bg-light-text text-secondary-blue" : "bg-secondary-soft"} transition-colors duration-300`}
          onClick={(e) => changeActiveTab(e)}
        >
          Recent
        </button>
      </section>
    </>
  );
};

export default NotesTabs;
