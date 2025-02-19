function Poems({ poems }) {
    return (
      <div>
        <h1 style={{ textShadow: '0px 0px 20px #e50914, 0px 0px 40px #ff0000', fontWeight: 'bold', fontSize: '3rem', animation: 'glow 1.5s infinite alternate' }}>Poem Vault</h1>
        <div style={{ maxWidth: '700px', margin: '20px auto', color: '#fff', textAlign: 'left' }}>
          {poems.length > 0 ? poems.map((poem, index) => (
            <pre key={index} style={{ fontSize: '1.2rem', marginBottom: '15px', padding: '10px', border: '1px solid #e50914', borderRadius: '5px', textShadow: '0px 0px 5px #e50914' }}>{poem}</pre>
          )) : <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#ff0a16' }}>No poems generated yet!</p>}
        </div>
      </div>
    );
  }
  
  export default Poems;
  