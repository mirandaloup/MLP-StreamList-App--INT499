import { useEffect, useState } from "react";

import StreamListItem from "../components/StreamListItem";
import AddIcon from "../icons/add.svg";
import SaveIcon from "../icons/save.svg";
import CancelIcon from "../icons/cancel.svg";

export default function StreamList() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("streamlist_items");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("streamlist_items", JSON.stringify(items));
  }, [items]);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    const newItem = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setItems((prev) => [newItem, ...prev]);
    console.log("StreamList input:", trimmed);

    setTitle("");
  }

  function toggleComplete(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function startEdit(id, currentText) {
    setEditingId(id);
    setEditText(currentText);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  function saveEdit() {
    const trimmed = editText.trim();
    if (!trimmed) return;

    setItems((prev) =>
      prev.map((item) => (item.id === editingId ? { ...item, text: trimmed } : item))
    );

    cancelEdit();
  }

  return (
    <div className="streamlist-page">
      <h2>StreamList</h2>

      <form onSubmit={handleSubmit} className="streamlist-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a movie"
        />
        <button type="submit">
          <img src={AddIcon} alt="add" className="icon" />
          </button>
      </form>


      {editingId !== null && (
        <div className="edit-box">
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit title"
          />
          <button type="button" onClick={saveEdit}>
          <img src={SaveIcon} alt="save" className="icon" />
          </button>

          <button type="button" onClick={cancelEdit}>
          <img src={CancelIcon} alt="cancel" className="icon" />
          </button>
        </div>
      )}


      {items.length === 0 ? (
        <p>List Empty.</p>
      ) : (
        <ul className="streamlist-list">
          {items.map((item) => (
            <StreamListItem
              key={item.id}
              item={item}
              onToggleComplete={toggleComplete}
              onDelete={deleteItem}
              onStartEdit={startEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
