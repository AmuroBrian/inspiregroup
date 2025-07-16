export default function Custom404() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Logo or Branding - Replace with your actual logo */}
        <div style={{ marginBottom: '2rem' }}>
          <img 
            src="/images/inspirelogo.png" 
            alt="Inspire Asset" 
            style={{ height: '60px' }} 
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Main Content */}
        <div style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '1rem'
          }}>
            Oops! Page Not Found
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#4a5568',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            The page you're looking for doesn't exist or access is restricted in your country.
          </p>
          
          <div style={{
            height: '1px',
            backgroundColor: '#e2e8f0',
            margin: '1.5rem 0'
          }}></div>
          
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '1rem'
          }}>
            What you can do:
          </h2>
          
          <ul style={{
            textAlign: 'left',
            paddingLeft: '1.5rem',
            marginBottom: '2rem',
            color: '#4a5568'
          }}>
            <li style={{ marginBottom: '0.5rem' }}>Check the URL for typos</li>
            <li style={{ marginBottom: '0.5rem' }}>Return to our <a href="/" style={{ color: '#3182ce', textDecoration: 'underline' }}>homepage</a></li>
            <li>Contact support if you believe this is an error</li>
          </ul>
          
          <a 
            href="/" 
            style={{
              display: 'inline-block',
              backgroundColor: '#3182ce',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2c5282'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3182ce'}
          >
            Go to Homepage
          </a>
        </div>
        
        {/* Footer */}
        <p style={{
          marginTop: '2rem',
          color: '#718096',
          fontSize: '0.875rem'
        }}>
          © {new Date().getFullYear()} Inspire Asset. All rights reserved.
        </p>
      </div>
    </div>
  );
}