import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


console.log("API URL:", process.env.REACT_APP_API_URL);

// Attach token to every request if available
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  const token = user?.token;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// Auth APIs
export const registerUser = (formData) => API.post("/registerUser", formData);
export const loginUser = (formData) => API.post("/loginUser", formData);

// Todo APIs
// change GET -> POST
  export const getTodos = (id) => API.get(`/todos/todo/${id}`);
export const addTodo = (text , id) => API.post("/todos/todo", { text , id});
export const toggleTodo = (id) => API.patch(`/todos/${id}`);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
