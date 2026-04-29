// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../store/slices/authSlice';
// import { toggleTheme } from '../store/slices/themeSlice';
// import Input from '../components/ui/Input';
// import Button from '../components/ui/Button';
// import { RiBellLine, RiSunLine, RiMoonLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

// export default function RegisterPage() {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((s) => s.auth);
//   const { mode }    = useSelector((s) => s.theme);
//   const [form, setForm]     = useState({ name: '', email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [showPw, setShowPw] = useState(false);

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim())    e.name     = 'Name is required';
//     if (form.name.length > 50) e.name    = 'Max 50 characters';
//     if (!form.email)           e.email   = 'Email is required';
//     if (!form.password)        e.password = 'Password is required';
//     if (form.password.length < 6) e.password = 'At least 6 characters';
//     return e;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errs = validate();
//     if (Object.keys(errs).length) { setErrors(errs); return; }
//     setErrors({});
//     dispatch(registerUser(form));
//   };

//   return (
//     <div style={{
//       minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
//       background: 'var(--bg)', padding: '24px', position: 'relative',
//     }}>
//       <div style={{
//         position: 'fixed', bottom: '-120px', left: '-120px',
//         width: '400px', height: '400px', borderRadius: '50%',
//         background: 'var(--accent-soft)', filter: 'blur(80px)',
//         pointerEvents: 'none', zIndex: 0,
//       }} />

//       <button
//         onClick={() => dispatch(toggleTheme())}
//         style={{
//           position: 'fixed', top: '20px', right: '20px', zIndex: 10,
//           width: '40px', height: '40px', borderRadius: '10px',
//           border: '1px solid var(--border)', background: 'var(--bg-card)',
//           color: 'var(--text-secondary)', cursor: 'pointer',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}
//       >
//         {mode === 'dark' ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
//       </button>

//       <div className="fade-up" style={{
//         background: 'var(--bg-card)',
//         border: '1px solid var(--border)',
//         borderRadius: '20px',
//         padding: '40px',
//         width: '100%', maxWidth: '420px',
//         boxShadow: 'var(--shadow-lg)',
//         position: 'relative', zIndex: 1,
//       }}>
//         <div style={{ textAlign: 'center', marginBottom: '32px' }}>
//           <div style={{
//             width: '52px', height: '52px', borderRadius: '14px',
//             background: 'var(--accent)', margin: '0 auto 14px',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             boxShadow: '0 4px 14px var(--accent-soft)',
//           }}>
//             <RiBellLine size={26} color="#fff" />
//           </div>
//           <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
//             Create account
//           </h1>
//           <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
//             Start managing your reminders today
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//           <div className="fade-up s1">
//             <Input
//               label="Full name"
//               placeholder="Your name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               error={errors.name}
//             />
//           </div>
//           <div className="fade-up s2">
//             <Input
//               label="Email address"
//               type="email"
//               placeholder="you@example.com"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               error={errors.email}
//             />
//           </div>
//           <div className="fade-up s3" style={{ position: 'relative' }}>
//             <Input
//               label="Password"
//               type={showPw ? 'text' : 'password'}
//               placeholder="Min 6 characters"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               error={errors.password}
//               style={{ paddingRight: '42px' }}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPw(!showPw)}
//               style={{
//                 position: 'absolute', right: '12px',
//                 top: errors.password ? '36px' : '34px',
//                 background: 'none', border: 'none',
//                 color: 'var(--text-muted)', cursor: 'pointer',
//               }}
//             >
//               {showPw ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
//             </button>
//           </div>

//           <div className="fade-up s4">
//             <Button type="submit" loading={loading} style={{ width: '100%' }}>
//               Create account
//             </Button>
//           </div>
//         </form>

//         <p className="fade-up s5" style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
//           Already have an account?{' '}
//           <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'none' }}>
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import { toggleTheme } from "../store/slices/themeSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { RiBellLine, RiSunLine, RiMoonLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);
  const { mode }    = useSelector((s) => s.theme);
  const [form, setForm]     = useState({ name:"", email:"", password:"" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name     = "Name is required";
    if (form.name.length > 50)    e.name     = "Max 50 characters";
    if (!form.email)              e.email    = "Email is required";
    if (!form.password)           e.password = "Password is required";
    if (form.password.length < 6) e.password = "At least 6 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    dispatch(registerUser(form));
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", background:"var(--bg)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"fixed", top:"-120px", right:"-120px", width:"400px", height:"400px", borderRadius:"50%", background:"var(--accent-soft)", filter:"blur(80px)", pointerEvents:"none" }}/>
      <div style={{ position:"fixed", bottom:"-80px", left:"-80px", width:"280px", height:"280px", borderRadius:"50%", background:"var(--accent-soft)", filter:"blur(60px)", pointerEvents:"none" }}/>

      <button onClick={() => dispatch(toggleTheme())} style={{ position:"fixed", top:"16px", right:"16px", zIndex:10, width:"40px", height:"40px", borderRadius:"10px", border:"1px solid var(--border)", background:"var(--bg-card)", color:"var(--text-secondary)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {mode==="dark"?<RiSunLine size={18}/>:<RiMoonLine size={18}/>}
      </button>

      {/* Form panel */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 20px", minHeight:"100vh" }}>
        <div className="fade-up" style={{ width:"100%", maxWidth:"400px" }}>
          <div style={{ textAlign:"center", marginBottom:"28px" }}>
            <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", boxShadow:"0 4px 16px var(--accent-soft)" }}>
              <RiBellLine size={26} color="#fff"/>
            </div>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"28px", fontWeight:"800", color:"var(--text-primary)", marginBottom:"6px" }}>Create account</h1>
            <p style={{ fontSize:"14px", color:"var(--text-secondary)" }}>Start managing reminders — it's free</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            <div className="fade-up s1">
              <Input label="Full name" placeholder="Your name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} error={errors.name}/>
            </div>
            <div className="fade-up s2">
              <Input label="Email address" type="email" placeholder="you@example.com" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} error={errors.email}/>
            </div>
            <div className="fade-up s3" style={{ position:"relative" }}>
              <Input label="Password" type={showPw?"text":"password"} placeholder="Min 6 characters" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} error={errors.password} style={{ paddingRight:"44px" }}/>
              <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:"absolute", right:"12px", top: errors.password ? "38px" : "34px", background:"none", border:"none", color:"var(--text-muted)", cursor:"pointer", padding:"2px" }}>
                {showPw?<RiEyeOffLine size={17}/>:<RiEyeLine size={17}/>}
              </button>
            </div>
            <div className="fade-up s4">
              <Button type="submit" loading={loading} style={{ width:"100%" }}>Create account</Button>
            </div>
          </form>

          <p className="fade-up s5" style={{ textAlign:"center", marginTop:"20px", fontSize:"14px", color:"var(--text-secondary)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color:"var(--accent)", fontWeight:"600", textDecoration:"none" }}>Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right panel — desktop */}
      <div className="auth-panel" style={{ flex:1, background:"linear-gradient(135deg, var(--accent) 0%, #c94010 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"48px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-60px", left:"-60px", width:"220px", height:"220px", borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
        <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:"320px" }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"30px", fontWeight:"800", color:"#fff", marginBottom:"16px" }}>How it works</h2>
          {[
            { n:"1", t:"Create a reminder", d:"Set a title, description, and date/time" },
            { n:"2", t:"We notify you",      d:"Push notification fires right on time" },
            { n:"3", t:"Never forget",       d:"Even if the tab is closed, you'll know" },
          ].map(({ n, t, d }) => (
            <div key={n} style={{ display:"flex", alignItems:"flex-start", gap:"14px", background:"rgba(255,255,255,0.12)", borderRadius:"12px", padding:"16px", marginBottom:"12px", textAlign:"left" }}>
              <div style={{ width:"30px", height:"30px", borderRadius:"50%", background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontWeight:"800", color:"#fff", fontSize:"14px", flexShrink:0 }}>{n}</div>
              <div>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:"700", color:"#fff", marginBottom:"3px" }}>{t}</div>
                <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.75)" }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
