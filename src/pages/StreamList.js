import { useState } from "react";

export default function StreamList() {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;
    
    console.log("StreamList input:", trimmed);
    setTitle("");
  }

  return (
    <div>
      <h2>StreamList</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a movie or show"
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
