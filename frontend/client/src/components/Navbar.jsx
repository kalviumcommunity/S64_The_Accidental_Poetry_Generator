import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [hovered, setHovered] = useState(null);

  return (
    <nav style={styles.navbar}>
      {['home', 'poems', 'add', 'login'].map((item, index) => (
        <Link
          key={index}
          to={
            item === 'home'
              ? '/'
              : item === 'poems'
              ? '/poems-vault'
              : item === 'add'
              ? '/add-entity'
              : '/auth'
          }
          style={{ ...styles.link, ...(hovered === item ? styles.linkHover : {}) }}
          onMouseEnter={() => setHovered(item)}
          onMouseLeave={() => setHovered(null)}
        >
          {item === 'home'
            ? '🏠 Home'
            : item === 'poems'
            ? '📜 Poems'
            : item === 'add'
            ? '➕ Add Poem'
            : '🔑 Login'}
        </Link>
      ))}
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '25px',
    background: 'rgba(20, 20, 20, 0.95)',
    padding: '15px',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0px 4px 20px rgba(255, 0, 0, 0.5)',
    borderBottom: '2px solid #e50914',
  },
  link: {
    color: '#ff0a16',
    textDecoration: 'none',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    textShadow: '0px 0px 10px #ff0a16, 0px 0px 20px #e50914',
    transition: '0.3s ease-in-out',
    padding: '10px 15px',
    borderRadius: '5px',
  },
  linkHover: {
    transform: 'scale(1.1)',
    textShadow: '0px 0px 20px #ff0a16, 0px 0px 40px #e50914',
  },
};

export default Navbar;
