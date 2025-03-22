import { useState } from "react";

function AddEntity({ setPoems }) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState(""); // Success message

  const funnyPlaceholders = [
    "A cosmic mess of words...",
    "The void speaks in gibberish...",
    "Write something absurd!",
    "Click 'Generate' for a random disaster!",
  ];

  const generateRandomText = () => {
    const randomWords = [
      "bananas",
      "existential",
      "moonlight",
      "quantum",
      "unicorn",
      "chaos",
      "laptop",
      "whisper",
      "hollow",
      "marshmallow",
    ];
    const generatedPoem = Array.from({ length: 5 }, () =>
      randomWords[Math.floor(Math.random() * randomWords.length)]
    ).join(" ");
    setText(generatedPoem);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const response = await fetch("http://localhost:4000/api/poems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Added Auth Header
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to add poem");

      const { poem } = await response.json();
      setPoems((prev) => [poem, ...prev]); // ✅ Ensure correct update

      setMessage("✨ Poem added successfully! ✨");
      setTimeout(() => setMessage(""), 2000); // Fade success message
      setText(""); // Clear input
    } catch (error) {
      console.error("❌ Error adding poem:", error);
      setMessage("❌ Error adding poem! Try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✨ Add a New Poem ✨</h2>

      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          placeholder={funnyPlaceholders[Math.floor(Math.random() * funnyPlaceholders.length)]}
          required
          style={styles.textarea}
        />
        <div style={styles.buttonContainer}>
          <button type="button" onClick={generateRandomText} style={styles.generateButton}>
            🎲 Generate Random Words
          </button>
          <button type="submit" style={styles.addButton}>
            ✨ Add Poem
          </button>
        </div>
      </form>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    textAlign: "center",
    color: "white",
    padding: "20px",
    backgroundColor: "#141414",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(255, 0, 0, 0.3)",
  },
  title: {
    fontSize: "2rem",
    textShadow: "0px 0px 15px #e50914",
    marginBottom: "15px",
  },
  message: {
    fontSize: "1.2rem",
    textShadow: "0px 0px 10px #0f0",
    marginBottom: "15px",
    transition: "opacity 0.5s ease-in-out",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "1.1rem",
    backgroundColor: "#222",
    color: "white",
    border: "1px solid #e50914",
    borderRadius: "8px",
    textAlign: "center",
    resize: "vertical",
  },
  buttonContainer: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },
  generateButton: {
    backgroundColor: "#111",
    color: "#ff0a16",
    border: "1px solid #e50914",
    padding: "10px 15px",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0px 0px 10px #e50914",
    transition: "0.3s",
  },
  addButton: {
    backgroundColor: "#e50914",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "1rem",
    cursor: "pointer",
    textShadow: "0px 0px 5px #fff",
    boxShadow: "0px 0px 10px #e50914",
    transition: "0.3s",
  },
};

export default AddEntity;
