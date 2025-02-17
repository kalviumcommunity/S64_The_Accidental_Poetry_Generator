import React, { useState } from 'react';
import './App.css'; // Import the Joker-styled CSS

// Function to generate random poetry
const generatePoetry = () => {
  const words = [
    'chaos', 'madness', 'laugh', 'joker', 'clown', 'smile', 'dark', 
    'card', 'trick', 'shadow', 'fear', 'night', 'twist', 'whisper'
  ];

  const randomWord = () => words[Math.floor(Math.random() * words.length)];
  const randomLine = () => `${randomWord()} ${randomWord()} ${randomWord()}`;

  return `${randomLine()}\n${randomLine()}\n${randomLine()}`;
};

const App = () => {
  const [poem, setPoem] = useState('');

  const handleGeneratePoem = () => {
    setPoem(generatePoetry());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="joker-text">Welcome to the Accidental Poetry Generator!</h1>

        <p className="joker-subtext">
          Where <span className="highlight">nonsense</span> meets <span className="highlight">creativity </span> 
          in the most hilarious ways.
        </p>

        <p className="joker-subtext">
          Forget traditional poetry—here, we <span className="wild">embrace the absurd!</span><br />
          Our generator randomly selects words to form the most <span className="chaotic">random</span>, 
          <span className="chaotic">chaotic</span>, and <span className="chaotic">humorous</span> "poems" 
          you'll ever read. <span className="mystery">It's poetry...</span> but with no rules, no sense, and all the fun.
        </p>

        <p className="joker-subtext">
          Click the button below to unleash a new, <span className="glitch">nonsensical poem</span> each time.<br />
          <span className="laugh">Enjoy the randomness!</span>
        </p>

        <button className="joker-button" onClick={handleGeneratePoem}>Generate Accidental Poetry</button>

        <pre className="joker-textbox">{poem}</pre>
      </header>
    </div>
  );
};

export default App;
