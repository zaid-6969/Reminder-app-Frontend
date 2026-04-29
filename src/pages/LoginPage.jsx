import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { toggleTheme } from "../store/slices/themeSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { RiBellLine, RiSunLine, RiMoonLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);
  const { mode }    = useSelector((s) => s.theme);
  const [form, setForm]     = useState({ email:"", password:"" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = "Email is required";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    dispatch(loginUser(form));
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", background:"var(--bg)", position:"relative", overflow:"hidden" }}>
      {/* Blobs */}
      <div style={{ position:"fixed", top:"-120px", right:"-120px", width:"400px", height:"400px", borderRadius:"50%", background:"var(--accent-soft)", filter:"blur(80px)", pointerEvents:"none" }}/>
      <div style={{ position:"fixed", bottom:"-80px", left:"-80px", width:"280px", height:"280px", borderRadius:"50%", background:"var(--accent-soft)", filter:"blur(60px)", pointerEvents:"none" }}/>

      {/* Theme btn */}
      <button onClick={() => dispatch(toggleTheme())} style={{ position:"fixed", top:"16px", right:"16px", zIndex:10, width:"40px", height:"40px", borderRadius:"10px", border:"1px solid var(--border)", background:"var(--bg-card)", color:"var(--text-secondary)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {mode==="dark"?<RiSunLine size={18}/>:<RiMoonLine size={18}/>}
      </button>

      {/* Left panel — desktop only */}
      <div className="auth-panel" style={{ flex:1, background:"var(--accent)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"48px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"220px", height:"220px", borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
        <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"160px", height:"160px", borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
        <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:"340px" }}>
          <div style={{ width:"64px", height:"64px", borderRadius:"18px", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
            <RiBellLine size={32} color="#fff"/>
          </div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"30px", fontWeight:"800", color:"#fff", marginBottom:"16px", lineHeight:1.2 }}>Never miss a reminder again</h2>
          <p style={{ fontSize:"15px", color:"rgba(255,255,255,0.8)", lineHeight:1.7 }}>Get notified at exactly the right time — even when your browser is closed.</p>
          <div style={{ marginTop:"36px", display:"flex", flexDirection:"column", gap:"10px" }}>
            {["⏰ Background push notifications","🌙 Dark & light mode","📱 Works on all devices"].map(f=>(
              <div key={f} style={{ background:"rgba(255,255,255,0.12)", borderRadius:"10px", padding:"11px 16px", textAlign:"left" }}>
                <span style={{ color:"#fff", fontSize:"14px", fontWeight:"500" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 20px", minHeight:"100vh" }}>
        <div className="fade-up" style={{ width:"100%", maxWidth:"400px" }}>
          {/* Mobile logo */}
          <div className="auth-mobile-logo" style={{ display:"none", textAlign:"center", marginBottom:"28px" }}>
            <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
              <RiBellLine size={24} color="#fff"/>
            </div>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:"800", fontSize:"22px", color:"var(--text-primary)" }}>Remindly</h2>
          </div>

          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"28px", fontWeight:"800", color:"var(--text-primary)", marginBottom:"6px" }}>Welcome back</h1>
          <p style={{ fontSize:"14px", color:"var(--text-secondary)", marginBottom:"32px" }}>Sign in to continue to your reminders</p>

          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            <div className="fade-up s1">
              <Input label="Email address" type="email" placeholder="you@example.com" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} error={errors.email}/>
            </div>
            <div className="fade-up s2" style={{ position:"relative" }}>
              <Input label="Password" type={showPw?"text":"password"} placeholder="••••••••" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} error={errors.password} style={{ paddingRight:"44px" }}/>
              <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:"absolute", right:"12px", top: errors.password ? "38px" : "34px", background:"none", border:"none", color:"var(--text-muted)", cursor:"pointer", padding:"2px" }}>
                {showPw?<RiEyeOffLine size={17}/>:<RiEyeLine size={17}/>}
              </button>
            </div>
            <div className="fade-up s3">
              <Button type="submit" loading={loading} style={{ width:"100%" }}>Sign in</Button>
            </div>
          </form>

          <p className="fade-up s4" style={{ textAlign:"center", marginTop:"20px", fontSize:"14px", color:"var(--text-secondary)" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color:"var(--accent)", fontWeight:"600", textDecoration:"none" }}>Sign up</Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-panel { display: none !important; }
          .auth-mobile-logo { display: block !important; }
        }
      `}</style>
    </div>
  );
}
