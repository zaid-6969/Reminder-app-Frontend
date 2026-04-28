import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { toggleTheme } from '../store/slices/themeSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { RiBellLine, RiSunLine, RiMoonLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);
  const { mode }    = useSelector((s) => s.theme);
  const [form, setForm]     = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    dispatch(loginUser(form));
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '24px', position: 'relative',
    }}>
      {/* Decorative blob */}
      <div style={{
        position: 'fixed', top: '-120px', right: '-120px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'var(--accent-soft)', filter: 'blur(80px)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Theme toggle */}
      <button
        onClick={() => dispatch(toggleTheme())}
        style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 10,
          width: '40px', height: '40px', borderRadius: '10px',
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          color: 'var(--text-secondary)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {mode === 'dark' ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
      </button>

      <div className="fade-up" style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '40px',
        width: '100%', maxWidth: '420px',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'var(--accent)', margin: '0 auto 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px var(--accent-soft)',
          }}>
            <RiBellLine size={26} color="#fff" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Sign in to your Remindly account
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="fade-up s1">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
          </div>

          <div className="fade-up s2" style={{ position: 'relative' }}>
            <Input
              label="Password"
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              style={{ paddingRight: '42px' }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{
                position: 'absolute', right: '12px',
                top: errors.password ? '36px' : '34px',
                background: 'none', border: 'none',
                color: 'var(--text-muted)', cursor: 'pointer',
              }}
            >
              {showPw ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
            </button>
          </div>

          <div className="fade-up s3">
            <Button type="submit" loading={loading} style={{ width: '100%' }}>
              Sign in
            </Button>
          </div>
        </form>

        <p className="fade-up s4" style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'none' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
