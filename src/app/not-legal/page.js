// src/app/not-legal/page.js
export default function NotLegal() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      color: '#333',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Access Restricted</h1>
      <p style={{ fontSize: '1.2rem' }}>
        This service is not available in your country.
      </p>
    </div>
  );
}