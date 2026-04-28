import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { toggleTheme } from '../../store/slices/themeSlice';
import { RiSunLine, RiMoonLine, RiBellLine, RiUserLine, RiLogoutBoxLine } from 'react-icons/ri';

export default function Navbar() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user }  = useSelector((s) => s.auth);
  const { mode }  = useSelector((s) => s.theme);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const navLink = (path, label, Icon) => (
    <Link
      to={path}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '7px 14px', borderRadius: '8px',
        fontSize: '14px', fontWeight: '500',
        color: location.pathname === path ? 'var(--accent)' : 'var(--text-secondary)',
        background: location.pathname === path ? 'var(--accent-soft)' : 'transparent',
        textDecoration: 'none',
        transition: 'all 0.15s ease',
      }}
    >
      <Icon size={16} />
      {label}
    </Link>
  );

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--shadow)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 24px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <RiBellLine size={16} color="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '17px', color: 'var(--text-primary)' }}>
            Remindly
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navLink('/dashboard', 'Dashboard', RiBellLine)}
          {navLink('/profile', 'Profile', RiUserLine)}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            style={{
              width: '36px', height: '36px', borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg-input)',
              color: 'var(--text-secondary)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
          >
            {mode === 'dark' ? <RiSunLine size={17} /> : <RiMoonLine size={17} />}
          </button>

          {/* User chip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '4px 10px 4px 6px',
            background: 'var(--bg-input)', borderRadius: '99px',
            border: '1px solid var(--border)',
          }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: 'var(--accent)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: '700', fontFamily: 'var(--font-display)',
            }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              width: '36px', height: '36px', borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg-input)',
              color: 'var(--danger)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            title="Logout"
          >
            <RiLogoutBoxLine size={17} />
          </button>
        </div>
      </div>
    </nav>
  );
}
