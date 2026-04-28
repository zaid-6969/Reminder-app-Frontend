export default function Input({ label, error, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          width: '100%',
          padding: '10px 14px',
          background: 'var(--bg-input)',
          border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
          borderRadius: '10px',
          color: 'var(--text-primary)',
          fontSize: '14px',
          fontFamily: 'var(--font-body)',
          outline: 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          ...props.style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)';
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border)';
          e.target.style.boxShadow = 'none';
          props.onBlur?.(e);
        }}
      />
      {error && <span style={{ fontSize: '12px', color: 'var(--danger)' }}>{error}</span>}
    </div>
  );
}
