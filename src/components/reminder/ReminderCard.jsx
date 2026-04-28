import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReminder, markComplete } from '../../store/slices/reminderSlice';
import { format, isPast, isToday, isTomorrow } from 'date-fns';
import { RiDeleteBinLine, RiEditLine, RiCheckLine, RiTimeLine, RiCalendarLine } from 'react-icons/ri';
import Button from '../ui/Button';

const getDateLabel = (dateTime) => {
  const d = new Date(dateTime);
  if (isToday(d))    return { label: 'Today',    color: 'var(--accent)' };
  if (isTomorrow(d)) return { label: 'Tomorrow', color: 'var(--success)' };
  if (isPast(d))     return { label: 'Overdue',  color: 'var(--danger)' };
  return { label: format(d, 'MMM d'), color: 'var(--text-secondary)' };
};

export default function ReminderCard({ reminder, onEdit }) {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const [completing, setCompleting] = useState(false);

  const dateLabel = getDateLabel(reminder.dateTime);
  const isOverdue = isPast(new Date(reminder.dateTime)) && !reminder.completed;

  const handleDelete = async () => {
    setDeleting(true);
    await dispatch(deleteReminder(reminder._id));
    setDeleting(false);
  };

  const handleComplete = async () => {
    setCompleting(true);
    await dispatch(markComplete(reminder._id));
    setCompleting(false);
  };

  return (
    <div
      className="scale-in"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${isOverdue ? 'var(--danger)' : reminder.completed ? 'var(--border)' : 'var(--border)'}`,
        borderLeft: `3px solid ${reminder.completed ? 'var(--success)' : isOverdue ? 'var(--danger)' : 'var(--accent)'}`,
        borderRadius: '12px',
        padding: '16px 18px',
        boxShadow: 'var(--shadow)',
        opacity: reminder.completed ? 0.65 : 1,
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        {/* Left: content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '15px', fontWeight: '600',
            color: 'var(--text-primary)',
            textDecoration: reminder.completed ? 'line-through' : 'none',
            marginBottom: '4px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {reminder.title}
          </h3>

          {reminder.description && (
            <p style={{
              fontSize: '13px', color: 'var(--text-secondary)',
              marginBottom: '10px', lineHeight: '1.5',
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {reminder.description}
            </p>
          )}

          {/* Date/time row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600', color: dateLabel.color }}>
              <RiCalendarLine size={13} />
              {dateLabel.label}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <RiTimeLine size={13} />
              {format(new Date(reminder.dateTime), 'h:mm a, MMM d yyyy')}
            </span>
            {reminder.completed && (
              <span style={{
                fontSize: '11px', fontWeight: '600',
                color: 'var(--success)',
                background: 'var(--success-soft)',
                padding: '2px 8px', borderRadius: '99px',
              }}>
                ✓ Done
              </span>
            )}
          </div>
        </div>

        {/* Right: actions */}
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          {!reminder.completed && (
            <>
              <button
                onClick={() => onEdit(reminder)}
                style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-input)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                title="Edit"
              >
                <RiEditLine size={14} />
              </button>
              <button
                onClick={handleComplete}
                disabled={completing}
                style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  border: '1px solid var(--success)',
                  background: 'var(--success-soft)',
                  color: 'var(--success)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                title="Mark complete"
              >
                <RiCheckLine size={14} />
              </button>
            </>
          )}
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              width: '32px', height: '32px', borderRadius: '8px',
              border: '1px solid var(--danger)',
              background: 'var(--danger-soft)',
              color: 'var(--danger)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            title="Delete"
          >
            <RiDeleteBinLine size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
