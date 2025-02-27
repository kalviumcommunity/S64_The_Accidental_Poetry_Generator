import { useState, useEffect } from 'react';

function Poems({ poems }) {
  const [fetchedPoems, setFetchedPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/poems'); // Update this if needed
        if (!response.ok) throw new Error('Failed to fetch poems');
        
        const data = await response.json();
        setFetchedPoems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  const displayPoems = [...fetchedPoems, ...poems]; // Combine local & fetched poems

  return (
    <div>
      <h1 style={{
        textShadow: '0px 0px 20px #e50914, 0px 0px 40px #ff0000',
        fontWeight: 'bold',
        fontSize: '3rem',
        animation: 'glow 1.5s infinite alternate'
      }}>
        Poem Vault
      </h1>

      <div style={{ maxWidth: '700px', margin: '20px auto', color: '#fff', textAlign: 'left' }}>
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#ff0a16' }}>Loading poems...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#ff0a16' }}>{error}</p>
        ) : displayPoems.length > 0 ? (
          displayPoems.map((poem, index) => (
            <pre key={index} style={{
              fontSize: '1.2rem',
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #e50914',
              borderRadius: '5px',
              textShadow: '0px 0px 5px #e50914',
              backgroundColor: '#222',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {typeof poem === 'string' ? poem : poem.text} {/* Handle both local & fetched formats */}
            </pre>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#ff0a16' }}>No poems generated yet!</p>
        )}
      </div>

      <style>
        {`@keyframes glow {
          from { text-shadow: 0px 0px 10px #e50914, 0px 0px 20px #ff0000; }
          to { text-shadow: 0px 0px 20px #ff0000, 0px 0px 40px #e50914; }
        }`}
      </style>
    </div>
  );
}

export default Poems;
