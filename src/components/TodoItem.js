import React from "react";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f9fafb",
    borderRadius: 6,
    padding: "10px 16px",
    marginBottom: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    transition: "background 0.2s",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flex: 1,
    cursor: "pointer",
  },
  text: (completed) => ({
    textDecoration: completed ? "line-through" : "none",
    color: completed ? "#aaa" : "#222",
    fontSize: 17,
    fontWeight: 500,
    transition: "color 0.2s",
  }),
  checkbox: {
    width: 18,
    height: 18,
    accentColor: "#3498db",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "6px 12px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    marginLeft: 12,
    transition: "background 0.2s",
  },
};

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li style={styles.item}>
      <div
        style={styles.left}
        onClick={() => toggleTodo(todo._id)}
        title="Toggle complete"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
          style={styles.checkbox}
        />
        <span style={styles.text(todo.completed)}>{todo.text}</span>
      </div>
      <button
        style={styles.deleteBtn}
        onClick={() => deleteTodo(todo._id)}
        title="Delete"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;