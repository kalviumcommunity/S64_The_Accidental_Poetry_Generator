import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPoem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poemText, setPoemText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the poem to edit
    fetch(`http://localhost:4000/api/poems/${id}`)
      .then(response => response.json())
      .then(data => {
        setPoemText(data.text);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching poem:', error));
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`http://localhost:4000/api/poems/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: poemText }),
    });
    navigate('/poems-vault'); // Redirect to Poem Vault
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ color: '#e50914' }}>Edit Poem</h2>
      {loading ? <p>Loading...</p> : (
        <>
          <textarea
            value={poemText}
            onChange={(e) => setPoemText(e.target.value)}
            style={{ width: '80%', height: '150px', padding: '10px' }}
          />
          <br />
          <button onClick={handleUpdate} style={{ margin: '10px', background: '#e50914', color: 'white', padding: '10px' }}>
            Save Changes
          </button>
          <button onClick={() => navigate('/poems')} style={{ margin: '10px', background: 'gray', color: 'white', padding: '10px' }}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default EditPoem;
