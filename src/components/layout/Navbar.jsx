// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../../store/slices/authSlice';
// import { toggleTheme } from '../../store/slices/themeSlice';
// import {
//   RiSunLine, RiMoonLine, RiBellLine,
//   RiUserLine, RiLogoutBoxLine, RiDashboardLine,
// } from 'react-icons/ri';

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useSelector((s) => s.auth);
//   const { mode } = useSelector((s) => s.theme);

//   const handleLogout = async () => {
//     await dispatch(logoutUser());
//     navigate('/login');
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav style={{
//       position: 'sticky', top: 0, zIndex: 50,
//       background: 'var(--bg-card)',
//       borderBottom: '1px solid var(--border)',
//       boxShadow: 'var(--shadow)',
//     }}>
//       <div style={{
//         maxWidth: '1100px', margin: '0 auto',
//         padding: '0 24px', height: '62px',
//         display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//       }}>

//         {/* Logo */}
//         <Link to="/dashboard" style={{
//           textDecoration: 'none',
//           display: 'flex', alignItems: 'center', gap: '10px',
//         }}>
//           <div style={{
//             width: '34px', height: '34px', borderRadius: '9px',
//             background: 'var(--accent)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             boxShadow: '0 2px 8px var(--accent-soft)',
//           }}>
//             <RiBellLine size={18} color="#fff" />
//           </div>
//           <span style={{
//             fontFamily: 'var(--font-display)', fontWeight: '700',
//             fontSize: '18px', color: 'var(--text-primary)',
//           }}>
//             Remindly
//           </span>
//         </Link>

//         {/* Nav links */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//           {[
//             { path: '/dashboard', label: 'Dashboard', Icon: RiDashboardLine },
//             { path: '/profile',   label: 'Profile',   Icon: RiUserLine },
//           ].map(({ path, label, Icon }) => (
//             <Link
//               key={path}
//               to={path}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: '6px',
//                 padding: '7px 14px', borderRadius: '9px',
//                 fontSize: '14px', fontWeight: '500',
//                 fontFamily: 'var(--font-display)',
//                 color: isActive(path) ? 'var(--accent)' : 'var(--text-secondary)',
//                 background: isActive(path) ? 'var(--accent-soft)' : 'transparent',
//                 textDecoration: 'none',
//                 transition: 'all 0.15s ease',
//               }}
//             >
//               <Icon size={16} />
//               {label}
//             </Link>
//           ))}
//         </div>

//         {/* Right actions */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

//           {/* Theme toggle */}
//           <button
//             onClick={() => dispatch(toggleTheme())}
//             title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
//             style={{
//               width: '38px', height: '38px', borderRadius: '9px',
//               border: '1px solid var(--border)',
//               background: 'var(--bg-input)',
//               color: 'var(--text-secondary)',
//               cursor: 'pointer',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               transition: 'all 0.15s',
//             }}
//           >
//             {mode === 'dark' ? <RiSunLine size={17} /> : <RiMoonLine size={17} />}
//           </button>

//           {/* User chip */}
//           <Link to="/profile" style={{
//             display: 'flex', alignItems: 'center', gap: '8px',
//             padding: '5px 12px 5px 6px',
//             background: 'var(--bg-input)',
//             borderRadius: '99px',
//             border: '1px solid var(--border)',
//             textDecoration: 'none',
//             transition: 'all 0.15s',
//           }}>
//             <div style={{
//               width: '28px', height: '28px', borderRadius: '50%',
//               background: 'var(--accent)', color: '#fff',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: '12px', fontWeight: '700',
//               fontFamily: 'var(--font-display)',
//             }}>
//               {user?.name?.[0]?.toUpperCase()}
//             </div>
//             <span style={{
//               fontSize: '13px', fontWeight: '500',
//               color: 'var(--text-primary)',
//               maxWidth: '100px',
//               overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
//             }}>
//               {user?.name}
//             </span>
//           </Link>

//           {/* Logout */}
//           <button
//             onClick={handleLogout}
//             title="Logout"
//             style={{
//               width: '38px', height: '38px', borderRadius: '9px',
//               border: '1px solid var(--danger)',
//               background: 'var(--danger-soft)',
//               color: 'var(--danger)',
//               cursor: 'pointer',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               transition: 'all 0.15s',
//             }}
//           >
//             <RiLogoutBoxLine size={17} />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import { RiSunLine, RiMoonLine, RiBellLine, RiUserLine, RiLogoutBoxLine, RiDashboardLine, RiMenuLine, RiCloseLine } from "react-icons/ri";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s) => s.auth);
  const { mode } = useSelector((s) => s.theme);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => { setOpen(false); await dispatch(logoutUser()); navigate("/login"); };
  const isActive = (p) => location.pathname === p;
  const links = [
    { path:"/dashboard", label:"Dashboard", Icon:RiDashboardLine },
    { path:"/profile",   label:"Profile",   Icon:RiUserLine },
  ];

  return (
    <>
      <nav style={{ position:"sticky", top:0, zIndex:50, background:"var(--bg-card)", borderBottom:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 16px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* Logo */}
          <Link to="/dashboard" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <RiBellLine size={17} color="#fff" />
            </div>
            <span style={{ fontFamily:"var(--font-display)", fontWeight:"700", fontSize:"17px", color:"var(--text-primary)" }}>Remindly</span>
          </Link>

          {/* Desktop links */}
          <div style={{ display:"flex", gap:"4px" }} className="nav-desktop">
            {links.map(({ path, label, Icon }) => (
              <Link key={path} to={path} style={{
                display:"flex", alignItems:"center", gap:"6px", padding:"7px 14px", borderRadius:"9px",
                fontSize:"14px", fontWeight:"500", fontFamily:"var(--font-display)", textDecoration:"none",
                color: isActive(path)?"var(--accent)":"var(--text-secondary)",
                background: isActive(path)?"var(--accent-soft)":"transparent", transition:"all 0.15s",
              }}><Icon size={15}/>{label}</Link>
            ))}
          </div>

          {/* Right */}
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <button onClick={() => dispatch(toggleTheme())} style={{ width:"36px", height:"36px", borderRadius:"8px", border:"1px solid var(--border)", background:"var(--bg-input)", color:"var(--text-secondary)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {mode==="dark" ? <RiSunLine size={17}/> : <RiMoonLine size={17}/>}
            </button>

            {/* Desktop user chip */}
            <Link to="/profile" className="nav-desktop" style={{ display:"flex", alignItems:"center", gap:"8px", padding:"4px 12px 4px 5px", background:"var(--bg-input)", borderRadius:"99px", border:"1px solid var(--border)", textDecoration:"none" }}>
              <div style={{ width:"27px", height:"27px", borderRadius:"50%", background:"var(--accent)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:"700" }}>{user?.name?.[0]?.toUpperCase()}</div>
              <span style={{ fontSize:"13px", fontWeight:"500", color:"var(--text-primary)", maxWidth:"90px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name}</span>
            </Link>

            <button onClick={handleLogout} className="nav-desktop" style={{ width:"36px", height:"36px", borderRadius:"8px", border:"1px solid var(--danger)", background:"var(--danger-soft)", color:"var(--danger)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <RiLogoutBoxLine size={16}/>
            </button>

            {/* Mobile hamburger */}
            <button onClick={() => setOpen(!open)} className="nav-mobile" style={{ width:"36px", height:"36px", borderRadius:"8px", border:"1px solid var(--border)", background:"var(--bg-input)", color:"var(--text-primary)", cursor:"pointer", display:"none", alignItems:"center", justifyContent:"center" }}>
              {open ? <RiCloseLine size={20}/> : <RiMenuLine size={20}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ position:"fixed", top:"60px", left:0, right:0, zIndex:49, background:"var(--bg-card)", borderBottom:"1px solid var(--border)", boxShadow:"var(--shadow-lg)", padding:"12px 16px 20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px", marginBottom:"10px", background:"var(--bg-input)", borderRadius:"12px" }}>
            <div style={{ width:"40px", height:"40px", borderRadius:"50%", background:"var(--accent)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700", fontSize:"16px", flexShrink:0 }}>{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <div style={{ fontSize:"14px", fontWeight:"600", color:"var(--text-primary)" }}>{user?.name}</div>
              <div style={{ fontSize:"12px", color:"var(--text-muted)" }}>{user?.email}</div>
            </div>
          </div>
          {links.map(({ path, label, Icon }) => (
            <Link key={path} to={path} onClick={() => setOpen(false)} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"13px 14px", borderRadius:"10px", marginBottom:"4px", textDecoration:"none", fontWeight:"500", fontSize:"15px", color:isActive(path)?"var(--accent)":"var(--text-primary)", background:isActive(path)?"var(--accent-soft)":"transparent" }}>
              <Icon size={19}/>{label}
            </Link>
          ))}
          <button onClick={handleLogout} style={{ width:"100%", display:"flex", alignItems:"center", gap:"12px", padding:"13px 14px", borderRadius:"10px", marginTop:"6px", border:"none", background:"var(--danger-soft)", color:"var(--danger)", cursor:"pointer", fontWeight:"600", fontSize:"15px", fontFamily:"var(--font-body)" }}>
            <RiLogoutBoxLine size={19}/> Sign out
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
