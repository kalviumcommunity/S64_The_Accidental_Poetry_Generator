import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import { useState } from 'react';

function App() {
  const [poems, setPoems] = useState([]);

  return (
    <Router>
      <div style={{ backgroundColor: '#141414', color: '#ffffff', textAlign: 'center', padding: '20px' }}>
        <nav style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#111', padding: '15px', boxShadow: '0px 4px 10px rgba(255, 0, 0, 0.5)' }}>
          <Link to="/" style={{ color: '#e50914', textDecoration: 'none', fontSize: '1.5rem', margin: '0 15px', transition: 'text-shadow 0.3s ease' }}>Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home setPoems={setPoems} poems={poems} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;