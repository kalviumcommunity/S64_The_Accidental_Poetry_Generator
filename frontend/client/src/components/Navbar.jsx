import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext"; // Import authentication context

function Navbar() {
  const [hovered, setHovered] = useState(null);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav style={styles.navbar}>
      {["home", "poems", "add"].map((item, index) => (
        <Link
          key={index}
          to={
            item === "home"
              ? "/"
              : item === "poems"
              ? "/poems-vault"
              : "/add-entity"
          }
          style={{ ...styles.link, ...(hovered === item ? styles.linkHover : {}) }}
          onMouseEnter={() => setHovered(item)}
          onMouseLeave={() => setHovered(null)}
        >
          {item === "home"
            ? "🏠 Home"
            : item === "poems"
            ? "📜 Poems"
            : "➕ Add Poem"}
        </Link>
      ))}

      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          style={{ ...styles.link, ...styles.logout }}
          onMouseEnter={() => setHovered("logout")}
          onMouseLeave={() => setHovered(null)}
        >
          🚪 Logout
        </button>
      ) : (
        <Link
          to="/auth"
          style={{ ...styles.link, ...(hovered === "login" ? styles.linkHover : {}) }}
          onMouseEnter={() => setHovered("login")}
          onMouseLeave={() => setHovered(null)}
        >
          🔑 Login
        </Link>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px",
    background: "rgba(20, 20, 20, 0.95)",
    padding: "15px",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    boxShadow: "0px 4px 20px rgba(255, 0, 0, 0.5)",
    borderBottom: "2px solid #e50914",
  },
  link: {
    color: "#ff0a16",
    textDecoration: "none",
    fontSize: "1.3rem",
    fontWeight: "bold",
    textShadow: "0px 0px 10px #ff0a16, 0px 0px 20px #e50914",
    transition: "0.3s ease-in-out",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    background: "none",
    border: "none",
  },
  linkHover: {
    transform: "scale(1.1)",
    textShadow: "0px 0px 20px #ff0a16, 0px 0px 40px #e50914",
  },
  logout: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#ff0a16",
    cursor: "pointer",
  },
};

export default Navbar;
