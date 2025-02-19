import { useState } from 'react';

function Home({ setPoems, poems }) {
  const [poem, setPoem] = useState('');
  const words = ['banana', 'galaxy', 'whisper', 'chaos', 'flamingo', 'quantum', 'laughter', 'void', 'pickle', 'symphony', 'moonlight', 'mystery', 'electric', 'bubble', 'shadow', 'jellybean', 'dream', 'nebula', 'tornado', 'marshmallow'];

  const generatePoem = () => {
    let newPoem = '';
    for (let i = 0; i < 20; i++) { // Increased poem length
      newPoem += words[Math.floor(Math.random() * words.length)] + ' ';
      if ((i + 1) % 5 === 0) newPoem += '\n'; // Line breaks for better readability
    }
    const finalizedPoem = newPoem.trim() + '.';
    setPoem(finalizedPoem);
    setPoems([...poems, finalizedPoem]);
  };

  return (
    <div>
      <h1 style={{ textShadow: '0px 0px 20px #e50914, 0px 0px 40px #ff0000', fontWeight: 'bold', fontSize: '3rem', animation: 'glow 1.5s infinite alternate' }}>The Accidental Poetry Generator</h1>
      <p style={{ fontSize: '1.3rem', margin: '20px 0', color: '#fff', lineHeight: '1.6', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
        Forget traditional poetry—here, we <span style={{ color: '#ff0a16', fontWeight: 'bold' }}>embrace the absurd!</span><br />
        Our generator randomly selects words to form the most <span style={{ color: '#ff0a16', fontStyle: 'italic' }}>random</span>, 
        <span style={{ color: '#ff0a16', fontStyle: 'italic' }}>chaotic</span>, and <span style={{ color: '#ff0a16', fontStyle: 'italic' }}>humorous</span> "poems" 
        you'll ever read. <span style={{ textShadow: '0px 0px 10px #ff0a16', fontStyle: 'italic' }}>It's poetry...</span> but with no rules, no sense, and all the fun. <br />
        Click the button below to unleash a new, <span style={{ color: '#ff0a16', textDecoration: 'underline', fontWeight: 'bold' }}>nonsensical poem</span> each time.<br />
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff0a16' }}>Enjoy the randomness!</span>
      </p>
      <button style={{ backgroundColor: '#e50914', color: 'white', border: 'none', padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer', transition: 'transform 0.3s ease, background-color 0.3s ease' }} 
        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        onClick={generatePoem}>
        Generate Poem
      </button>
      <pre style={{ fontSize: '1.5rem', marginTop: '20px', textShadow: '0px 0px 10px #e50914', whiteSpace: 'pre-wrap' }}>{poem}</pre>

      <style>
        {`@keyframes glow {
          from { text-shadow: 0px 0px 10px #e50914, 0px 0px 20px #ff0000; }
          to { text-shadow: 0px 0px 20px #ff0000, 0px 0px 40px #e50914; }
        }`}
      </style>
    </div>
  );
}

export default Home;