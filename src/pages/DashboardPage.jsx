import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReminders, setFilter } from '../store/slices/reminderSlice';
import Navbar from '../components/layout/Navbar';
import ReminderCard from '../components/reminder/ReminderCard';
import ReminderModal from '../components/reminder/ReminderModal';
import Button from '../components/ui/Button';
import { RiAddLine, RiBellLine, RiCheckboxCircleLine, RiTimeLine, RiInboxLine } from 'react-icons/ri';

const FILTERS = [
  { key: 'all',       label: 'All',       Icon: RiBellLine },
  { key: 'pending',   label: 'Pending',   Icon: RiTimeLine },
  { key: 'completed', label: 'Completed', Icon: RiCheckboxCircleLine },
];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { items, loading, filter } = useSelector((s) => s.reminders);
  const { user } = useSelector((s) => s.auth);

  const [showModal, setShowModal] = useState(false);
  const [editReminder, setEditReminder] = useState(null);

  useEffect(() => {
    const params = filter !== 'all' ? { status: filter } : {};
    dispatch(fetchReminders(params));
  }, [dispatch, filter]);

  const openEdit = (reminder) => { setEditReminder(reminder); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditReminder(null); };

  // Stats
  const total     = items.length;
  const pending   = items.filter((r) => !r.completed).length;
  const completed = items.filter((r) => r.completed).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              My Reminders
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Hey {user?.name?.split(' ')[0]} 👋 — here are your upcoming reminders
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <RiAddLine size={17} /> New Reminder
          </Button>
        </div>

        {/* Stats row */}
        <div className="fade-up s1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
          {[
            { label: 'Total', value: total,     color: 'var(--accent)',   soft: 'var(--accent-soft)' },
            { label: 'Pending', value: pending, color: 'var(--warning, #b45309)', soft: 'var(--warning-soft, #fef3c7)' },
            { label: 'Completed', value: completed, color: 'var(--success)', soft: 'var(--success-soft)' },
          ].map(({ label, value, color, soft }) => (
            <div key={label} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              padding: '18px 20px',
              boxShadow: 'var(--shadow)',
            }}>
              <div style={{ fontSize: '28px', fontFamily: 'var(--font-display)', fontWeight: '800', color }}>{value}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="fade-up s2" style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {FILTERS.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => dispatch(setFilter(key))}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 16px', borderRadius: '99px',
                fontSize: '13px', fontWeight: '600',
                fontFamily: 'var(--font-display)',
                cursor: 'pointer', transition: 'all 0.15s',
                border: filter === key ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: filter === key ? 'var(--accent-soft)' : 'var(--bg-card)',
                color: filter === key ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              <Icon size={14} />{label}
            </button>
          ))}
        </div>

        {/* Reminder list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <div style={{
              width: '32px', height: '32px', margin: '0 auto 12px',
              border: '3px solid var(--border)', borderTopColor: 'var(--accent)',
              borderRadius: '50%', animation: 'spin 0.7s linear infinite',
            }} />
            <p style={{ fontSize: '14px' }}>Loading reminders...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : items.length === 0 ? (
          <div className="fade-up" style={{
            textAlign: 'center', padding: '70px 24px',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '16px', boxShadow: 'var(--shadow)',
          }}>
            <RiInboxLine size={44} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              No reminders yet
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              {filter === 'all' ? "Create your first reminder to get started!" : `No ${filter} reminders.`}
            </p>
            {filter === 'all' && (
              <Button onClick={() => setShowModal(true)}>
                <RiAddLine size={16} /> Create Reminder
              </Button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {items.map((r, i) => (
              <div key={r._id} className={`fade-up s${Math.min(i + 1, 6)}`}>
                <ReminderCard reminder={r} onEdit={openEdit} />
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && <ReminderModal onClose={closeModal} editReminder={editReminder} />}
    </div>
  );
}
