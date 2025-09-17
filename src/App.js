import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "./api";
import { AuthContext } from "./context/AuthContext";

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    padding: "36px 28px",
    width: "100%",
    maxWidth: 420,
    minHeight: 480,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#222",
    letterSpacing: 1,
  },
  logoutBtn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 18px",
    borderRadius: 6,
    fontWeight: 500,
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  logoutBtnHover: {
    background: "#c0392b",
  },
};

function App() {
  const { user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [logoutHover, setLogoutHover] = useState(false);

  useEffect(() => {
    if (user) fetchTodos();
    // eslint-disable-next-line
  }, [user]);

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const handleAddTodo = async (text) => {
    await addTodo(text);
    fetchTodos();
  };

  const handleToggleTodo = async (id) => {
    await toggleTodo(id);
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div style={styles.container}>
                <div style={styles.card}>
                  <div style={styles.header}>
                    <span style={styles.title}>Todo Application</span>
                    <button
                      style={logoutHover ? { ...styles.logoutBtn, ...styles.logoutBtnHover } : styles.logoutBtn}
                      onClick={logout}
                      onMouseEnter={() => setLogoutHover(true)}
                      onMouseLeave={() => setLogoutHover(false)}
                    >
                      Logout
                    </button>
                  </div>
                  <TodoInput addTodo={handleAddTodo} />
                  <TodoList
                    todos={todos}
                    toggleTodo={handleToggleTodo}
                    deleteTodo={handleDeleteTodo}
                  />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;