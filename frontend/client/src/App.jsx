import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Poems from "./pages/Poems";
import AddEntity from "./pages/AddEntity"; 
import EditPoem from './pages/EditPoem'; 
import { useState } from "react";

function App() {
  const [poems, setPoems] = useState([]);

  return (
    <Router>
      <div style={{
        backgroundColor: "#141414",
        color: "#ffffff",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Navigation Bar */}
        <nav style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111",
          padding: "15px",
          borderBottom: "2px solid #e50914", // Added a visible border
          position: "sticky",
          top: "0",
          zIndex: "1000"
        }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/poems-vault" style={linkStyle}>Poem Vault</Link>
          <Link to="/add-entity" style={linkStyle}>Add Poem</Link>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home setPoems={setPoems} poems={poems} />} />
          <Route path="/poems-vault" element={<Poems poems={poems} />} />
          <Route path="/add-entity" element={<AddEntity setPoems={setPoems} />} />
          <Route path="/edit-poem/:id" element={<EditPoem />} />
        </Routes>
      </div>
    </Router>
  );
}

const linkStyle = {
  color: "#e50914",
  textDecoration: "none",
  margin: "0 20px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  transition: "0.3s",
};

export default App;
