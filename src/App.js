import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "./api";
import { AuthContext } from "./context/AuthContext";
import { useLocation } from "react-router-dom";

import Profile from "./components/Profile";

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f0f2f5", // softer, modern background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
  },
  card: {
    background: "#fff",
    borderRadius: 20, // smoother corners
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)", // softer, deeper shadow
    padding: "36px 32px",
    width: "100%",
    maxWidth: 450, // slightly wider
    minHeight: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    transition: "all 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    color: "#111",
    letterSpacing: 1.2,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logoutBtn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    transition: "all 0.3s ease",
  },
  logoutBtnHover: {
    background: "#c0392b",
    transform: "scale(1.05)", // subtle hover scale
    boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
  },
  todoListContainer: {
    marginTop: 20,
    maxHeight: "50vh",
    overflowY: "auto",
  },
  inputContainer: {
    display: "flex",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
    outline: "none",
    marginRight: 8,
    transition: "all 0.2s ease",
  },
  inputFocus: {
    border: "1px solid #007bff",
    boxShadow: "0 0 6px rgba(0,123,255,0.3)",
  },
  addBtn: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  addBtnHover: {
    background: "#0056b3",
    transform: "scale(1.05)",
  },
  // Responsive tweaks
  cardMobile: {
    padding: "24px 16px",
    maxWidth: "95%",
  },
  titleMobile: {
    fontSize: 24,
  },
};

function App() {
  const { user, login, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [logoutHover, setLogoutHover] = useState(false);
  // console.log(user?.user?.id , "user")
  const location = useLocation(); // <-- Add this line

  // ...existing code...
 useEffect(() => {
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const id = params.get("id");
  const name = params.get("name");
  const email = params.get("email");

  // Only login if user is not already set
  if (token && id && name && email && !user) {
    login({ _id: id, name, email, token });
    window.history.replaceState({}, document.title, "/");
  }
}, [location.search, login, user]);


  useEffect(() => {
    if (user?._id) fetchTodos();
    // eslint-disable-next-line
  }, [user?._id]);

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos(user?._id);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const handleAddTodo = async (text) => {
    await addTodo(text, user?.id);
    fetchTodos(user?.id);
  };

  const handleToggleTodo = async (id) => {
    await toggleTodo(id);
    fetchTodos(user?.user?.id);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos(user?.user?.id);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <div style={styles.container}>
              <div style={styles.card}>
                <div style={styles.header}>
                  <span style={styles.title}>Todo App</span>
                  <button
                    style={
                      logoutHover
                        ? { ...styles.logoutBtn, ...styles.logoutBtnHover }
                        : styles.logoutBtn
                    }
                    onClick={logout}
                    onMouseEnter={() => setLogoutHover(true)}
                    onMouseLeave={() => setLogoutHover(false)}
                  >
                    Logout
                  </button>
                </div>
                <TodoInput addTodo={handleAddTodo} />
                <div style={styles.todoListContainer}>
                  <TodoList
                    todos={todos}
                    toggleTodo={handleToggleTodo}
                    deleteTodo={handleDeleteTodo}
                  />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
