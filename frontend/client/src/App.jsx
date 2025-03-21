import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Poems from "./pages/Poems";
import AddEntity from "./pages/AddEntity"; 
import EditPoem from "./pages/EditPoem"; 
import Navbar from "./components/Navbar"; // ✅ Imported Navbar Component
import { useState } from "react";

function App() {
  const [poems, setPoems] = useState([]);

  return (
    <Router>
      <div style={styles.appContainer}>
        <Navbar /> {/* ✅ Navbar included globally */}
        
        <div style={{ marginTop: "80px" }}> {/* Push content down so it doesn't overlap navbar */}
          <Routes>
            <Route path="/" element={<Home setPoems={setPoems} poems={poems} />} />
            <Route path="/poems-vault" element={<Poems poems={poems} />} />
            <Route path="/add-entity" element={<AddEntity setPoems={setPoems} />} />
            <Route path="/edit-poem/:id" element={<EditPoem />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Styles
const styles = {
  appContainer: {
    backgroundColor: "#141414",
    color: "#ffffff",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
};

export default App;
