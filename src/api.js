import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


console.log("API URL:", process.env.REACT_APP_API_URL);

// Attach token to every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth APIs
export const registerUser = (formData) => API.post("/registerUser", formData);
export const loginUser = (formData) => API.post("/loginUser", formData);

// Todo APIs
export const getTodos = () => API.get("/todos");
export const addTodo = (text) => API.post("/todos", { text });
export const toggleTodo = (id) => API.patch(`/todos/${id}`);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
