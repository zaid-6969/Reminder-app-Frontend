// export default function Button({ children, loading, variant = 'primary', size = 'md', ...props }) {
//   const sizes = {
//     sm: { padding: '6px 14px',  fontSize: '13px' },
//     md: { padding: '10px 20px', fontSize: '14px' },
//     lg: { padding: '13px 28px', fontSize: '15px' },
//   };

//   const variants = {
//     primary: {
//       background: 'var(--accent)',
//       color: '#fff',
//       border: '1px solid var(--accent)',
//     },
//     secondary: {
//       background: 'var(--bg-input)',
//       color: 'var(--text-primary)',
//       border: '1px solid var(--border)',
//     },
//     danger: {
//       background: 'var(--danger-soft)',
//       color: 'var(--danger)',
//       border: '1px solid var(--danger)',
//     },
//     ghost: {
//       background: 'transparent',
//       color: 'var(--text-secondary)',
//       border: '1px solid transparent',
//     },
//   };

//   const isDisabled = loading || props.disabled;

//   return (
//     <button
//       {...props}
//       disabled={isDisabled}
//       style={{
//         ...sizes[size],
//         ...variants[variant],
//         borderRadius: '10px',
//         fontFamily: 'var(--font-display)',
//         fontWeight: '600',
//         cursor: isDisabled ? 'not-allowed' : 'pointer',
//         opacity: isDisabled ? 0.6 : 1,
//         display: 'inline-flex', alignItems: 'center',
//         justifyContent: 'center', gap: '7px',
//         transition: 'all 0.15s ease',
//         whiteSpace: 'nowrap',
//         letterSpacing: '0.01em',
//         ...props.style,
//       }}
//       onMouseEnter={(e) => {
//         if (!isDisabled && variant === 'primary') {
//           e.currentTarget.style.background = 'var(--accent-hover)';
//           e.currentTarget.style.borderColor = 'var(--accent-hover)';
//         }
//       }}
//       onMouseLeave={(e) => {
//         if (!isDisabled && variant === 'primary') {
//           e.currentTarget.style.background = 'var(--accent)';
//           e.currentTarget.style.borderColor = 'var(--accent)';
//         }
//       }}
//     >
//       {loading ? (
//         <>
//           <span style={{
//             width: '14px', height: '14px',
//             border: '2px solid currentColor',
//             borderTopColor: 'transparent',
//             borderRadius: '50%',
//             animation: 'spin 0.7s linear infinite',
//             display: 'inline-block', flexShrink: 0,
//           }} />
//           {children}
//         </>
//       ) : children}
//     </button>
//   );
// }

export default function Button({ children, loading, variant = "primary", size = "md", ...props }) {
  const sizes = { sm:"6px 14px", md:"10px 20px", lg:"13px 28px" };
  const fs    = { sm:"13px", md:"14px", lg:"15px" };
  const vars  = {
    primary:   { background:"var(--accent)",      color:"#fff",                   border:"1px solid var(--accent)" },
    secondary: { background:"var(--bg-input)",    color:"var(--text-primary)",    border:"1px solid var(--border)" },
    danger:    { background:"var(--danger-soft)", color:"var(--danger)",          border:"1px solid var(--danger)" },
    ghost:     { background:"transparent",        color:"var(--text-secondary)",  border:"1px solid transparent" },
  };
  const dis = loading || props.disabled;
  return (
    <button {...props} disabled={dis} style={{
      padding: sizes[size], fontSize: fs[size],
      ...vars[variant],
      borderRadius:"10px", fontFamily:"var(--font-display)", fontWeight:"600",
      cursor: dis ? "not-allowed" : "pointer", opacity: dis ? 0.6 : 1,
      display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"7px",
      transition:"all 0.15s", whiteSpace:"nowrap", ...props.style,
    }}>
      {loading && <span style={{ width:"14px",height:"14px",border:"2px solid currentColor",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.7s linear infinite",display:"inline-block",flexShrink:0 }} />}
      {children}
    </button>
  );
}
