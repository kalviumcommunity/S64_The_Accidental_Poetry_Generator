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
      .catch(error => {
        console.error('Error fetching poem:', error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:4000/api/poems/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: poemText }),
      });
      navigate('/poems-vault'); // Redirect to Poem Vault
    } catch (error) {
      console.error("Error updating poem:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✍️ Edit Your Poem</h1>
      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : (
        <>
          <textarea
            value={poemText}
            onChange={(e) => setPoemText(e.target.value)}
            style={styles.textarea}
          />
          <div style={styles.buttonContainer}>
            <button onClick={handleUpdate} style={styles.saveButton}>
              💾 Save Changes
            </button>
            <button onClick={() => navigate('/poems-vault')} style={styles.cancelButton}>
              ❌ Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#141414",
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    textShadow: "0px 0px 15px #e50914",
    marginBottom: "20px",
  },
  loadingText: {
    fontSize: "1.3rem",
    color: "#e50914",
  },
  textarea: {
    width: "80%",
    height: "150px",
    padding: "15px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "1px solid #e50914",
    backgroundColor: "#222",
    color: "white",
    resize: "vertical",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
  },
  saveButton: {
    backgroundColor: "#e50914",
    color: "white",
    border: "none",
    padding: "12px 20px",
    fontSize: "1.2rem",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "0.3s",
  },
  cancelButton: {
    backgroundColor: "gray",
    color: "white",
    border: "none",
    padding: "12px 20px",
    fontSize: "1.2rem",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "0.3s",
  },
};

export default EditPoem;
