import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMsg("");
    try {
      const res = await API.post("/register", form);
      setMsg(res.data.message + " — redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        {msg && <p style={styles.success}>{msg}</p>}
        <input name="name" placeholder="Name" onChange={handleChange} required style={styles.input} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
        <input name="phone" placeholder="Phone" onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.button}>Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f0f2f5" },
  card: { background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", width: "320px", display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid #ccc" },
  button: { padding: "10px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  error: { color: "red" },
  success: { color: "green" },
};