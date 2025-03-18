import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Poems from "./pages/Poems";
import AddEntity from "./pages/AddEntity"; // Import the new page
import "./App.css";
import { useState } from "react";

function App() {
  const [poems, setPoems] = useState([]);

  return (
    <Router>
      <div style={{ backgroundColor: "#141414", color: "#ffffff", textAlign: "center", minHeight: "100vh" }}>
        <nav style={{ display: "flex", justifyContent: "center", backgroundColor: "#111", padding: "15px" }}>
          <Link to="/" style={{ color: "#e50914", textDecoration: "none", margin: "0 15px" }}>Home</Link>
          <Link to="/poems-vault" style={{ color: "#e50914", textDecoration: "none", margin: "0 15px" }}>Poem Vault</Link>
          <Link to="/add-entity" style={{ color: "#e50914", textDecoration: "none", margin: "0 15px" }}>Add Poem</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home setPoems={setPoems} poems={poems} />} />
          <Route path="/poems-vault" element={<Poems poems={poems} />} />
          <Route path="/add-entity" element={<AddEntity />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
