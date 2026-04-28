import { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import Navbar from '../components/layout/Navbar';
import { RiUserLine, RiMailLine, RiCalendarLine, RiBellLine, RiCheckboxCircleLine, RiTimeLine } from 'react-icons/ri';

export default function ProfilePage() {
  const { user }   = useSelector((s) => s.auth);
  const { items }  = useSelector((s) => s.reminders);

  const total     = items.length;
  const completed = items.filter((r) => r.completed).length;
  const pending   = items.filter((r) => !r.completed).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
            Profile
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Your account details and stats
          </p>
        </div>

        {/* Profile card */}
        <div className="fade-up s1" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: 'var(--shadow)',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            {/* Avatar */}
            <div style={{
              width: '68px', height: '68px', borderRadius: '18px',
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px', fontWeight: '800', color: '#fff',
              fontFamily: 'var(--font-display)',
              boxShadow: '0 4px 16px var(--accent-soft)',
              flexShrink: 0,
            }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {user?.name}
              </h2>
              <span style={{
                fontSize: '12px', fontWeight: '600',
                color: 'var(--accent)',
                background: 'var(--accent-soft)',
                padding: '3px 10px', borderRadius: '99px',
              }}>
                Active Member
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { Icon: RiUserLine,     label: 'Full Name', value: user?.name },
              { Icon: RiMailLine,     label: 'Email',     value: user?.email },
              { Icon: RiCalendarLine, label: 'Member since', value: user?.createdAt ? format(new Date(user.createdAt), 'MMMM d, yyyy') : '—' },
            ].map(({ Icon, label, value }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '13px 16px',
                background: 'var(--bg-input)',
                borderRadius: '10px',
                border: '1px solid var(--border)',
              }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '8px',
                  background: 'var(--accent-soft)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={16} color="var(--accent)" />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats card */}
        <div className="fade-up s2" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: 'var(--shadow)',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '18px' }}>
            Reminder Stats
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { Icon: RiBellLine,            label: 'Total',     value: total,     color: 'var(--accent)',   soft: 'var(--accent-soft)' },
              { Icon: RiTimeLine,            label: 'Pending',   value: pending,   color: '#b45309',         soft: '#fef3c7' },
              { Icon: RiCheckboxCircleLine,  label: 'Completed', value: completed, color: 'var(--success)',  soft: 'var(--success-soft)' },
            ].map(({ Icon, label, value, color, soft }) => (
              <div key={label} style={{
                background: soft,
                borderRadius: '12px',
                padding: '18px 16px',
                textAlign: 'center',
              }}>
                <Icon size={22} color={color} style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '26px', fontFamily: 'var(--font-display)', fontWeight: '800', color, lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ fontSize: '12px', color, fontWeight: '600', marginTop: '4px', opacity: 0.8 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Completion bar */}
          {total > 0 && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>Completion rate</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--success)' }}>
                  {Math.round((completed / total) * 100)}%
                </span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-input)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.round((completed / total) * 100)}%`,
                  background: 'var(--success)',
                  borderRadius: '99px',
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
