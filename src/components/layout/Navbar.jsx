import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { toggleTheme } from '../../store/slices/themeSlice';
import {
  RiSunLine, RiMoonLine, RiBellLine,
  RiUserLine, RiLogoutBoxLine, RiDashboardLine,
} from 'react-icons/ri';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s) => s.auth);
  const { mode } = useSelector((s) => s.theme);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--shadow)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 24px', height: '62px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link to="/dashboard" style={{
          textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '9px',
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px var(--accent-soft)',
          }}>
            <RiBellLine size={18} color="#fff" />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: '700',
            fontSize: '18px', color: 'var(--text-primary)',
          }}>
            Remindly
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[
            { path: '/dashboard', label: 'Dashboard', Icon: RiDashboardLine },
            { path: '/profile',   label: 'Profile',   Icon: RiUserLine },
          ].map(({ path, label, Icon }) => (
            <Link
              key={path}
              to={path}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '9px',
                fontSize: '14px', fontWeight: '500',
                fontFamily: 'var(--font-display)',
                color: isActive(path) ? 'var(--accent)' : 'var(--text-secondary)',
                background: isActive(path) ? 'var(--accent-soft)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            style={{
              width: '38px', height: '38px', borderRadius: '9px',
              border: '1px solid var(--border)',
              background: 'var(--bg-input)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
          >
            {mode === 'dark' ? <RiSunLine size={17} /> : <RiMoonLine size={17} />}
          </button>

          {/* User chip */}
          <Link to="/profile" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '5px 12px 5px 6px',
            background: 'var(--bg-input)',
            borderRadius: '99px',
            border: '1px solid var(--border)',
            textDecoration: 'none',
            transition: 'all 0.15s',
          }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'var(--accent)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: '700',
              fontFamily: 'var(--font-display)',
            }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span style={{
              fontSize: '13px', fontWeight: '500',
              color: 'var(--text-primary)',
              maxWidth: '100px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {user?.name}
            </span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              width: '38px', height: '38px', borderRadius: '9px',
              border: '1px solid var(--danger)',
              background: 'var(--danger-soft)',
              color: 'var(--danger)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
          >
            <RiLogoutBoxLine size={17} />
          </button>
        </div>
      </div>
    </nav>
  );
}
