export default function Button({ children, loading, variant = 'primary', size = 'md', ...props }) {
  const sizes = {
    sm: { padding: '6px 14px', fontSize: '13px' },
    md: { padding: '10px 20px', fontSize: '14px' },
    lg: { padding: '13px 28px', fontSize: '15px' },
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: '#fff',
      border: '1px solid var(--accent)',
    },
    secondary: {
      background: 'var(--bg-input)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border)',
    },
    danger: {
      background: 'var(--danger-soft)',
      color: 'var(--danger)',
      border: '1px solid var(--danger)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent',
    },
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{
        ...sizes[size],
        ...variants[variant],
        borderRadius: '10px',
        fontFamily: 'var(--font-display)',
        fontWeight: '600',
        cursor: loading || props.disabled ? 'not-allowed' : 'pointer',
        opacity: loading || props.disabled ? 0.6 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
        ...props.style,
      }}
    >
      {loading ? (
        <>
          <span style={{
            width: '14px', height: '14px', border: '2px solid currentColor',
            borderTopColor: 'transparent', borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            display: 'inline-block',
          }} />
          {children}
        </>
      ) : children}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
