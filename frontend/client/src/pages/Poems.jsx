import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Poems({ poems }) {
  const [fetchedPoems, setFetchedPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/poems');
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this poem?")) {
      await fetch(`http://localhost:4000/api/poems/${id}`, { method: 'DELETE' });
      setFetchedPoems(fetchedPoems.filter(poem => poem._id !== id));
    }
  };

  const displayPoems = [...fetchedPoems, ...poems];

  return (
    <div style={{
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#141414',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        textShadow: '0px 0px 20px #e50914, 0px 0px 40px #ff0000',
        marginBottom: '20px',
        marginTop: '-225px'
      }}>
        📜 Poem Vault 🎭
      </h1>

      <div style={{ maxWidth: '700px', width: '100%', margin: '20px auto', textAlign: 'left' }}>
        {loading ? (
          <p style={{ fontSize: '1.3rem', color: '#ff0a16', textAlign: 'center' }}>Loading poems...</p>
        ) : error ? (
          <p style={{ fontSize: '1.3rem', color: '#ff4c4c', textAlign: 'center' }}>{error}</p>
        ) : displayPoems.length > 0 ? (
          displayPoems.map((poem, index) => (
            <div key={index} style={{
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              textShadow: '0px 0px 5px #e50914'
            }}>
              <pre style={{ fontSize: '1.4rem' }}>
                {typeof poem === 'string' ? poem : poem.text}
              </pre>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Link to={`/edit-poem/${poem._id}`}>
                  <button style={{
                    marginRight: '10px',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    border: 'none',
                    background: '#e50914',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}>
                    ✏️ Edit
                  </button>
                </Link>
                <button onClick={() => handleDelete(poem._id)} style={{
                  padding: '8px 12px',
                  borderRadius: '5px',
                  border: 'none',
                  background: '#ff0a16',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}>
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ fontSize: '1.3rem', color: '#ff0a16', textAlign: 'center' }}>No poems generated yet! ✨</p>
        )}
      </div>
    </div>
  );
}

export default Poems;
