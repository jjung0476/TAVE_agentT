export default function Column({ status, title, children }) {
  return (
    <div style={{ 
      flex: 1,
      minWidth: '250px',
      backgroundColor: '#e0e0e0',
      borderRadius: '16px',
      padding: '1.2rem 1rem',
      minHeight: '700px' 
    }}>
      <h3 style={{ 
        fontSize: '0.9rem', 
        marginBottom: '1.5rem', 
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: '1px'
      }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {children}
      </div>
    </div>
  );
}