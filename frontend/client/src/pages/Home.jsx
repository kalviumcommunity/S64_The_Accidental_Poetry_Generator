import { useState } from 'react';
import Navbar from '../components/Navbar';

function Home({ setPoems, poems }) {
  const [poem, setPoem] = useState('');
  const [saving, setSaving] = useState(false);
  const words = ['banana', 'galaxy', 'whisper', 'chaos', 'flamingo', 'quantum', 'laughter', 'void', 'pickle', 'symphony', 'moonlight', 'mystery', 'electric', 'bubble', 'shadow', 'jellybean', 'dream', 'nebula', 'tornado', 'marshmallow'];

  const generatePoem = async () => {
    let newPoem = '';
    const usedWords = new Set();

    while (usedWords.size < 20) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      if (!usedWords.has(randomWord)) {
        usedWords.add(randomWord);
        newPoem += randomWord + ' ';
        if (usedWords.size % 5 === 0) newPoem += '\n';
      }
    }

    const finalizedPoem = newPoem.trim() + '.';

    setPoem(finalizedPoem);
    setPoems([...poems, finalizedPoem]);

    // Save to backend
    try {
      setSaving(true);
      const response = await fetch('http://localhost:4000/api/poems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: finalizedPoem }),
      });

      if (!response.ok) throw new Error('Failed to save poem');
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar /> {/* ✅ Navbar included, but no extra styling here */}
      <h1 style={styles.glowTitle}>🎭 The Accidental Poetry Generator 🎨</h1>

      <p style={styles.description}>
        Forget traditional poetry—here, we <span style={styles.highlight}>embrace the absurd! 🤯</span><br />
        Step into the chaotic world of poetry where <span style={styles.highlight}>randomness</span> is key!
        Every poem is a <span style={styles.highlight}>unique</span> blend of absurdity and fun 🌀 Click below to generate
        a new poem made entirely from **random** words🎵📝🔥 No repeats, no rules, just <span style={styles.highlight}>pure nonsense</span>.
      </p>

      <button 
        style={saving ? styles.disabledButton : styles.button} 
        disabled={saving} 
        onClick={generatePoem}
      >
        {saving ? 'Saving...' : 'Generate Poem'}
      </button>

      {poem && (  
        <pre style={styles.poemDisplay}>
          {poem}
        </pre>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#141414',
    color: 'white',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  glowTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    textShadow: '0px 0px 20px #e50914, 0px 0px 40px #ff0000',
    animation: 'glow 1.5s infinite alternate',
  },
  description: {
    fontSize: '1.3rem',
    margin: '20px auto',
    maxWidth: '700px',
    lineHeight: '1.6',
    color: '#ccc',
  },
  highlight: {
    color: '#ff0a16',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#e50914',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '1.3rem',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    boxShadow: '0px 0px 15px #e50914',
    borderRadius: '8px',
  },
  disabledButton: {
    backgroundColor: '#888',
    cursor: 'not-allowed',
  },
  poemDisplay: {
    fontSize: '1.5rem',
    marginTop: '20px',
    textShadow: '0px 0px 10px #e50914',
    whiteSpace: 'pre-wrap',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '8px',
    display: 'inline-block',
    maxWidth: '80%',
    boxShadow: '0px 0px 15px rgba(255, 0, 0, 0.3)',
  },
};

export default Home;
