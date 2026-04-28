import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReminder, updateReminder } from '../../store/slices/reminderSlice';
import { format } from 'date-fns';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { RiCloseLine } from 'react-icons/ri';

const toLocalDatetimeValue = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  return format(d, "yyyy-MM-dd'T'HH:mm");
};

const minDateTime = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 1);
  return format(d, "yyyy-MM-dd'T'HH:mm");
};

export default function ReminderModal({ onClose, editReminder }) {
  const dispatch = useDispatch();
  const { submitting } = useSelector((s) => s.reminders);

  const [form, setForm] = useState({
    title: '',
    description: '',
    dateTime: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editReminder) {
      setForm({
        title: editReminder.title,
        description: editReminder.description || '',
        dateTime: toLocalDatetimeValue(editReminder.dateTime),
      });
    }
  }, [editReminder]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (form.title.length > 100) e.title = 'Max 100 characters';
    if (!form.dateTime) e.dateTime = 'Date and time is required';
    if (form.dateTime && new Date(form.dateTime) <= new Date()) e.dateTime = 'Must be in the future';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      dateTime: new Date(form.dateTime).toISOString(),
    };

    let result;
    if (editReminder) {
      result = await dispatch(updateReminder({ id: editReminder._id, data: payload }));
    } else {
      result = await dispatch(createReminder(payload));
    }

    if (!result.error) onClose();
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="scale-in"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '28px',
          width: '100%', maxWidth: '460px',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {editReminder ? 'Edit Reminder' : 'New Reminder'}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', borderRadius: '8px',
              border: '1px solid var(--border)', background: 'var(--bg-input)',
              color: 'var(--text-secondary)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <RiCloseLine size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Title *"
            placeholder="e.g. Take medication, Team meeting..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            error={errors.title}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>
              Description
            </label>
            <textarea
              placeholder="Optional details..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              style={{
                width: '100%', padding: '10px 14px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                fontSize: '14px', fontFamily: 'var(--font-body)',
                outline: 'none', resize: 'vertical',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)'; }}
              onBlur={(e)  => { e.target.style.borderColor = 'var(--border)';  e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <Input
            label="Date & Time *"
            type="datetime-local"
            min={editReminder ? undefined : minDateTime()}
            value={form.dateTime}
            onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
            error={errors.dateTime}
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <Button type="button" variant="secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting} style={{ flex: 2 }}>
              {editReminder ? 'Save Changes' : 'Create Reminder'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
