import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReminders } from '../store/slices/reminderSlice';
import { format } from 'date-fns';
import Navbar from '../components/layout/Navbar';
import {
  RiUserLine, RiMailLine, RiCalendarLine,
  RiBellLine, RiCheckboxCircleLine, RiTimeLine,
} from 'react-icons/ri';

export default function ProfilePage() {
  const dispatch  = useDispatch();
  const { user }  = useSelector((s) => s.auth);
  const { items, loading } = useSelector((s) => s.reminders);

  // Make sure reminders are loaded (user might land directly on profile)
  useEffect(() => {
    if (items.length === 0 && !loading) {
      dispatch(fetchReminders());
    }
  }, [dispatch, items.length, loading]);

  const total     = items.length;
  const completed = items.filter((r) => r.completed).length;
  const pending   = items.filter((r) => !r.completed).length;
  const rate      = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Page title */}
        <div className="fade-up" style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '28px',
            fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px',
          }}>
            Profile
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Your account details and activity
          </p>
        </div>

        {/* ── Account card ───────────────────────────────────────── */}
        <div className="fade-up s1" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: 'var(--shadow)',
          marginBottom: '16px',
        }}>
          {/* Avatar + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
            <div style={{
              width: '70px', height: '70px', borderRadius: '18px',
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', fontWeight: '800', color: '#fff',
              fontFamily: 'var(--font-display)',
              boxShadow: '0 4px 20px var(--accent-soft)',
              flexShrink: 0,
            }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: '22px',
                fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px',
              }}>
                {user?.name}
              </h2>
              <span style={{
                fontSize: '12px', fontWeight: '600',
                color: 'var(--accent)',
                background: 'var(--accent-soft)',
                padding: '3px 12px', borderRadius: '99px',
              }}>
                Active Member
              </span>
            </div>
          </div>

          {/* Info rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { Icon: RiUserLine,     label: 'Full Name',    value: user?.name },
              { Icon: RiMailLine,     label: 'Email Address', value: user?.email },
              {
                Icon: RiCalendarLine,
                label: 'Member Since',
                value: user?.createdAt
                  ? format(new Date(user.createdAt), 'MMMM d, yyyy')
                  : '—',
              },
            ].map(({ Icon, label, value }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px',
                background: 'var(--bg-input)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '9px',
                  background: 'var(--accent-soft)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={17} color="var(--accent)" />
                </div>
                <div>
                  <div style={{
                    fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600',
                    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px',
                  }}>
                    {label}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {value || '—'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats card ─────────────────────────────────────────── */}
        <div className="fade-up s2" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: 'var(--shadow)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '17px',
            fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px',
          }}>
            Reminder Stats
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {[
              { Icon: RiBellLine,           label: 'Total',     value: total,     color: 'var(--accent)',  soft: 'var(--accent-soft)' },
              { Icon: RiTimeLine,           label: 'Pending',   value: pending,   color: 'var(--warning)', soft: 'var(--warning-soft)' },
              { Icon: RiCheckboxCircleLine, label: 'Completed', value: completed, color: 'var(--success)', soft: 'var(--success-soft)' },
            ].map(({ Icon, label, value, color, soft }) => (
              <div key={label} style={{
                background: soft, borderRadius: '12px',
                padding: '18px 14px', textAlign: 'center',
              }}>
                <Icon size={22} color={color} />
                <div style={{
                  fontSize: '28px', fontFamily: 'var(--font-display)',
                  fontWeight: '800', color, lineHeight: 1,
                  margin: '8px 0 4px',
                }}>
                  {value}
                </div>
                <div style={{ fontSize: '12px', color, fontWeight: '600', opacity: 0.85 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Completion progress bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                Completion rate
              </span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--success)' }}>
                {rate}%
              </span>
            </div>
            <div style={{
              height: '8px', background: 'var(--bg-input)',
              borderRadius: '99px', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${rate}%`,
                background: 'linear-gradient(90deg, var(--success), #4ade80)',
                borderRadius: '99px',
                transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </div>
            {total === 0 && (
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center' }}>
                No reminders yet — create one on the dashboard!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
