import { useState } from "react";

const Todo = ({ value, id, isDone, deleteTodo, markDone, editValue, }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(value);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = () => {
    editValue(id, updatedValue);
    toggleEditMode();
  };

  const handleCancel = () => {
    setUpdatedValue(value);
    toggleEditMode();
  };

  return (
    <div key={id}>
      {!isEditMode ? (
        <li>
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => markDone(id)}
          />
          <span className={isDone ? "with-line-through" : ""}>{value}</span>
          <button onClick={() => deleteTodo(id)}>Delete</button>
          <button onClick={toggleEditMode}>Edit</button>
        </li>
      ) : (
        <li>
          <input
            type="text"
            value={updatedValue}
            onChange={(e) => setUpdatedValue(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </li>
      )}
    </div>
  );
};

export default Todo;
