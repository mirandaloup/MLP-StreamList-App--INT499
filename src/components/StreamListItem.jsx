import CheckIcon from "../icons/check.svg";
import EditIcon from "../icons/edit.svg";
import DeleteIcon from "../icons/delete.svg";



export default function StreamListItem({
  item,
  onToggleComplete,
  onDelete,
  onStartEdit,
}) {
  return (
    <li className={item.completed ? "item completed" : "item"}>
      <span className="item-text">{item.text}</span>

      <div className="item-actions">
        <button type="button" className="icon-btn" onClick={() => onToggleComplete(item.id)}>
        <img src={CheckIcon} alt="complete" className="icon" />
        </button>

        <button type="button" className="icon-btn" onClick={() => onStartEdit(item.id, item.text)}>
        <img src={EditIcon} alt="edit" className="icon" />
        </button>

        <button type="button" className="icon-btn" onClick={() => onDelete(item.id)}>
        <img src={DeleteIcon} alt="delete" className="icon" />
        </button>

      </div>
    </li>
  );
}
