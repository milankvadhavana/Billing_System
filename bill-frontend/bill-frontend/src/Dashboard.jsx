import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome, {user.name} 👋</h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user.userId}</p>
      <button onClick={logout} style={{ padding: "10px 20px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
}