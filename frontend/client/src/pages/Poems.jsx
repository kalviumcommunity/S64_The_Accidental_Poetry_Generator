import { useState, useEffect } from 'react';

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

  const displayPoems = [...fetchedPoems, ...poems]; // Merge fetched & local poems

  return (
    <div className="poem-container">
      <h1 className="page-title">📜 Poem Vault 🎭</h1>

      <div className="poem-list">
        {loading ? (
          <p className="status-message">Loading poems...</p>
        ) : error ? (
          <p className="status-message error">{error}</p>
        ) : displayPoems.length > 0 ? (
          displayPoems.map((poem, index) => (
            <pre key={index} className="poem-box">
              {typeof poem === 'string' ? poem : poem.text}
            </pre>
          ))
        ) : (
          <p className="status-message">No poems generated yet! ✨</p>
        )}
      </div>

      <style>
        {`
        .poem-container {
          text-align: center;
          padding: 40px;
          background-color: #141414;
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .page-title {
          font-size: 3rem;
          font-weight: bold;
          text-shadow: 0px 0px 20px #e50914, 0px 0px 40px #ff0000;
          margin-bottom: 20px;
          margin-top: -300px;
        }

        .poem-list {
          max-width: 700px;
          width: 100%;
          margin: 20px auto;
          text-align: left;
        }

        .status-message {
          font-size: 1.3rem;
          color: #ff0a16;
          text-align: center;
        }

        .status-message.error {
          color: #ff4c4c;
        }

        .poem-box {
          font-size: 1.4rem;
          margin-bottom: 15px;
          padding: 15px;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          white-space: pre-wrap;
          word-break: break-word;
          text-shadow: 0px 0px 5px #e50914;
        }
        `}
      </style>
    </div>
  );
}

export default Poems;
