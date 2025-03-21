import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Poems({ poems }) {
  const [fetchedPoems, setFetchedPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/poems");
        if (!response.ok) throw new Error("Failed to fetch poems");

        const data = await response.json();
        setFetchedPoems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
    const interval = setInterval(fetchPoems, 10000); // Auto-refresh every 10 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this poem?")) {
      try {
        await fetch(`http://localhost:4000/api/poems/${id}`, {
          method: "DELETE",
        });
        setFetchedPoems(fetchedPoems.filter((poem) => poem._id !== id));
      } catch (error) {
        alert("Failed to delete the poem.");
      }
    }
  };

  

  const filteredPoems = [...fetchedPoems, ...poems].filter((poem) =>
    (typeof poem === "string" ? poem : poem.text)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    
    <div style={styles.container}>
      <h1 style={styles.title}>📜 Poem Vault 🎭</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search poems..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchInput}
      />

      <div style={styles.poemContainer}>
        {loading ? (
          <p style={styles.loadingText}>Loading poems...</p>
        ) : error ? (
          <p style={styles.errorText}>{error}</p>
        ) : filteredPoems.length > 0 ? (
          filteredPoems.map((poem, index) => (
            <div key={index} style={styles.poemBox}>
              <pre style={styles.poemText}>
                {typeof poem === "string" ? poem : poem.text}
              </pre>
              <div style={styles.actionButtons}>
                <Link to={`/edit-poem/${poem._id}`}>
                  <button style={styles.editButton}>✏️ Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(poem._id)}
                  style={styles.deleteButton}
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.loadingText}>No poems found! ✨</p>
        )}
      </div>
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
    fontSize: "3rem",
    fontWeight: "bold",
    textShadow: "0px 0px 20px #e50914, 0px 0px 40px #ff0000",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    width: "50%",
    borderRadius: "5px",
    fontSize: "1rem",
    marginBottom: "20px",
    outline: "none",
    border: "1px solid #e50914",
  },
  poemContainer: {
    maxWidth: "700px",
    width: "100%",
    margin: "20px auto",
    textAlign: "left",
  },
  loadingText: {
    fontSize: "1.3rem",
    color: "#ff0a16",
    textAlign: "center",
  },
  errorText: {
    fontSize: "1.3rem",
    color: "#ff4c4c",
    textAlign: "center",
  },
  poemBox: {
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textShadow: "0px 0px 5px #e50914",
  },
  poemText: {
    fontSize: "1.4rem",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  editButton: {
    marginRight: "10px",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    background: "#e50914",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
  },
  deleteButton: {
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    background: "#ff0a16",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default Poems;
