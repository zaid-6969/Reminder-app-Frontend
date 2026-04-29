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
