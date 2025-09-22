import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    marginBottom: 16,
    gap: 0,
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: "6px 0 0 6px",
    fontSize: 16,
    outline: "none",
    transition: "border 0.2s",
    background: "#f9fafb",
  },
  inputFocus: {
    border: "1.5px solid #3498db",
  },
  button: {
    padding: "10px 22px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "0 6px 6px 0",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  buttonHover: {
    background: "#217dbb",
  },
};

function TodoInput({ addTodo }) {
    const { user , logout} = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);


  console.log(user?._id, "userId from appjs");


 const handleSubmit = (e) => {
  e.preventDefault();
  if (value.trim()) {
 addTodo({ text: value.trim(), id: user?._id });

    setValue("");
  }
};


  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={focus ? { ...styles.input, ...styles.inputFocus } : styles.input}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoFocus
      />
      <button
        type="submit"
        style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        disabled={!value.trim()}
      >
        Add
      </button>
    </form>
  );
}

export default TodoInput;