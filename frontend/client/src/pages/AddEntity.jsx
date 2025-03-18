import { useState } from "react";

function AddEntity() {
  const [text, setText] = useState("");
  const [poems, setPoems] = useState([]);
  const [message, setMessage] = useState(""); // Success message

  const funnyPlaceholders = [
    "A cosmic mess of words...",
    "The void speaks in gibberish...",
    "Write something absurd!",
    "Click 'Generate' for a random disaster!"
  ];

  const generateRandomText = () => {
    const randomWords = [
      "bananas", "existential", "moonlight", "quantum", "unicorn",
      "chaos", "laptop", "whisper", "hollow", "marshmallow"
    ];
    const generatedPoem = new Array(5).fill(0).map(() =>
      randomWords[Math.floor(Math.random() * randomWords.length)]
    ).join(" ");
    setText(generatedPoem);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await fetch("http://localhost:4000/api/poems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to add poem");

      const newPoem = await response.json();
      setPoems((prev) => [newPoem.poem, ...prev]);
      setMessage("✨ Poem added successfully! ✨");
      setTimeout(() => setMessage(""), 2000);
      setText("");
    } catch (error) {
      console.error("Error adding poem:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center", color: "#fff" }}>
      <h2 style={{ textShadow: "0px 0px 10px #e50914" }}>✨ Add a New Poem ✨</h2>

      {message && (
        <p style={{ color: "#0f0", fontSize: "1.2rem", textShadow: "0px 0px 5px #0f0" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          cols="50"
          placeholder={funnyPlaceholders[Math.floor(Math.random() * funnyPlaceholders.length)]}
          required
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#222",
            color: "#fff",
            border: "1px solid #e50914",
            boxShadow: "0px 0px 10px #e50914",
            borderRadius: "5px",
            textAlign: "center"
          }}
        />
        <div>
          <button
            type="button"
            onClick={generateRandomText}
            style={{
              margin: "10px",
              padding: "10px 20px",
              backgroundColor: "#111",
              color: "#ff0a16",
              border: "1px solid #e50914",
              boxShadow: "0px 0px 10px #e50914",
              cursor: "pointer"
            }}
          >
            🎲 Generate Random Words
          </button>

          <button
            type="submit"
            style={{
              margin: "10px",
              padding: "10px 20px",
              backgroundColor: "#e50914",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              textShadow: "0px 0px 5px #fff",
              boxShadow: "0px 0px 10px #e50914"
            }}
          >
            ✨ Add Poem
          </button>
        </div>
      </form>

      <h3 style={{ marginTop: "20px", textShadow: "0px 0px 5px #e50914" }}>🔥 Added Poems 🔥</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {poems.map((poem) => (
          <li key={poem._id} style={{ borderBottom: "1px solid #e50914", padding: "10px", color: "#ddd" }}>
            {poem.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddEntity;
