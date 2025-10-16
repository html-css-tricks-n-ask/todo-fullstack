import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";
import { AuthContext } from "../context/AuthContext";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    padding: 32,
    width: "100%",
    maxWidth: 350,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 24,
    color: "#222",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 18,
  },
  input: {
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 5,
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.2s",
  },
  button: {
    padding: 12,
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: 8,
    transition: "background 0.2s",
  },
  buttonHover: {
    background: "#217dbb",
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
    fontWeight: 500,
  },
  footer: {
    marginTop: 18,
    fontSize: "1rem",
    color: "#555",
  },
  googleButton: {
    padding: 12,
    background: "#db4437",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginTop: 12,
    transition: "background 0.2s",
  },
  googleButtonHover: {
    background: "#c33d2e",
  },
};

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [googleHover, setGoogleHover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const { data } = await loginUser(form);
      login(data);
      navigate("/"); // Uncomment if you want to redirect after login
    } catch (err) {
      console.log(err, "error");
      alert("Login failed!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>Login</div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={styles.input}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={styles.input}
          />
          <button
            type="submit"
            style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Login
          </button>
          <button
            type="button" // Important: prevents form submission
            onClick={() => (window.location.href = "http://localhost:5000/auth/google")}
            style={googleHover ? { ...styles.googleButton, ...styles.googleButtonHover } : styles.googleButton}
            onMouseEnter={() => setGoogleHover(true)}
            onMouseLeave={() => setGoogleHover(false)}
          >
            Login with Google
          </button>
        </form>
        <div style={styles.footer}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
