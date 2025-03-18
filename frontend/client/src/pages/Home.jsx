import { useState } from 'react';

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
    <div className="container">
      <div className="background-animation"></div>

      <h1 className="glow-title">🎭 The Accidental Poetry Generator 🎨</h1>

      <p className="description">
        Forget traditional poetry—here, we <span className="highlight bold">embrace the absurd! 🤯</span><br />
        Step into the chaotic world of poetry where <span className="highlight">randomness</span> is key!
        Every poem is a <span className="highlight">unique</span> blend of absurdity and fun 🌀 Click below to generate
        a new poem made entirely from **random** words🎵📝🔥 No repeats, no rules, just <span className="highlight">pure nonsense</span>.
      </p>

      <button 
        className={`generate-button ${saving ? 'disabled' : ''}`} 
        disabled={saving} 
        onClick={generatePoem}
      >
        {saving ? 'Saving...' : 'Generate Poem'}
      </button>

      {poem && (  // 🔥 Fix: Only show poem box when there is a poem
        <pre className="poem-display">
          {poem}
        </pre>
      )}

      <style>
        {`
        .container {
          text-align: center;
          padding: 40px;
          background-color: #141414;
          color: white;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        /* Animated Background */
        .background-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,0,0,0.2) 0%, rgba(20,20,20,1) 70%);
          z-index: -1;
          animation: pulse 5s infinite alternate;
        }

        @keyframes pulse {
          from { opacity: 0.8; }
          to { opacity: 1; }
        }

        .glow-title {
          font-size: 3rem;
          font-weight: bold;
          text-shadow: 0px 0px 20px #e50914, 0px 0px 40px #ff0000;
          animation: glow 1.5s infinite alternate;
        }

        .description {
          font-size: 1.3rem;
          margin: 20px auto;
          max-width: 700px;
          line-height: 1.6;
          color: #ccc;
        }

        .highlight {
          color: #ff0a16;
          font-weight: bold;
        }

        .bold {
          font-size: 1.5rem;
          text-shadow: 0px 0px 10px #ff0a16;
        }

        .generate-button {
          background-color: #e50914;
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 1.3rem;
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease;
          box-shadow: 0px 0px 15px #e50914;
          border-radius: 8px;
        }

        .generate-button:hover {
          transform: scale(1.1);
          background-color: #ff0a16;
        }

        .generate-button.disabled {
          background-color: #888;
          cursor: not-allowed;
        }

        .poem-display {
          font-size: 1.5rem;
          margin-top: 20px;
          text-shadow: 0px 0px 10px #e50914;
          white-space: pre-wrap;
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 8px;
          display: inline-block;
          max-width: 80%;
          box-shadow: 0px 0px 15px rgba(255, 0, 0, 0.3);
        }

        @keyframes glow {
          from { text-shadow: 0px 0px 10px #e50914, 0px 0px 20px #ff0000; }
          to { text-shadow: 0px 0px 20px #ff0000, 0px 0px 40px #e50914; }
        }
        `}
      </style>
    </div>
  );
}

export default Home;
