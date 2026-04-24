const NoteContent = ({ title, content, setTitle, setContent, inputRef }) => {
  return (
    <div className="grow px-4 py-4">
      <div className="flex flex-col gap-5">
        <input
          type="text"
          className="px-3 py-3 w-full h-full focus-within:outline-0 bg-light-surface rounded-lg"
          placeholder="Enter your title..."
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={inputRef}
        />
        <textarea
          type="text"
          id="body"
          className="px-3 py-3 w-full h-84 focus-within:outline-0 bg-light-surface rounded-lg"
          placeholder="Enter the details..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default NoteContent;
