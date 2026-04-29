import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReminder, markComplete } from '../../store/slices/reminderSlice';
import { format, isPast, isToday, isTomorrow, differenceInHours } from 'date-fns';
import {
  RiDeleteBinLine, RiEditLine, RiCheckLine,
  RiTimeLine, RiCalendarLine, RiAlarmLine,
} from 'react-icons/ri';

const getDateInfo = (dateTime) => {
  const d = new Date(dateTime);
  if (isToday(d)) {
    const hrs = differenceInHours(d, new Date());
    if (hrs <= 0) return { label: 'Due now', color: 'var(--danger)', bg: 'var(--danger-soft)' };
    if (hrs < 3)  return { label: `In ${hrs}h`, color: 'var(--warning)', bg: 'var(--warning-soft)' };
    return { label: 'Today', color: 'var(--accent)', bg: 'var(--accent-soft)' };
  }
  if (isTomorrow(d)) return { label: 'Tomorrow', color: 'var(--success)', bg: 'var(--success-soft)' };
  if (isPast(d))     return { label: 'Overdue',  color: 'var(--danger)',  bg: 'var(--danger-soft)' };
  return { label: format(d, 'MMM d'), color: 'var(--text-secondary)', bg: 'var(--bg-input)' };
};

export default function ReminderCard({ reminder, onEdit }) {
  const dispatch = useDispatch();
  const [deleting,    setDeleting]    = useState(false);
  const [completing,  setCompleting]  = useState(false);

  const dateInfo  = getDateInfo(reminder.dateTime);
  const isOverdue = isPast(new Date(reminder.dateTime)) && !reminder.completed;

  const handleDelete = async () => {
    if (!window.confirm('Delete this reminder?')) return;
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
        border: '1px solid var(--border)',
        borderLeft: `4px solid ${
          reminder.completed ? 'var(--success)' :
          isOverdue          ? 'var(--danger)'  : 'var(--accent)'
        }`,
        borderRadius: '12px',
        padding: '16px 18px',
        boxShadow: 'var(--shadow)',
        opacity: reminder.completed ? 0.6 : 1,
        transition: 'opacity 0.2s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '15px', fontWeight: '600',
              color: 'var(--text-primary)',
              textDecoration: reminder.completed ? 'line-through' : 'none',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {reminder.title}
            </h3>

            {/* Status badge */}
            {reminder.completed ? (
              <span style={{
                fontSize: '11px', fontWeight: '700',
                color: 'var(--success)', background: 'var(--success-soft)',
                padding: '2px 9px', borderRadius: '99px', flexShrink: 0,
              }}>
                ✓ Done
              </span>
            ) : (
              <span style={{
                fontSize: '11px', fontWeight: '700',
                color: dateInfo.color, background: dateInfo.bg,
                padding: '2px 9px', borderRadius: '99px', flexShrink: 0,
              }}>
                {dateInfo.label}
              </span>
            )}
          </div>

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

          {/* Date & time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: reminder.description ? 0 : '8px' }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '12px', color: 'var(--text-muted)',
            }}>
              <RiCalendarLine size={13} />
              {format(new Date(reminder.dateTime), 'EEE, MMM d yyyy')}
            </span>
            <span style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '12px', color: 'var(--text-muted)',
            }}>
              <RiTimeLine size={13} />
              {format(new Date(reminder.dateTime), 'h:mm a')}
            </span>
            {!reminder.completed && !isOverdue && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                fontSize: '12px', color: 'var(--text-muted)',
              }}>
                <RiAlarmLine size={13} />
                Notification scheduled
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0, alignItems: 'center' }}>
          {!reminder.completed && (
            <>
              <button
                onClick={() => onEdit(reminder)}
                title="Edit reminder"
                style={{
                  width: '34px', height: '34px', borderRadius: '9px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-input)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
              >
                <RiEditLine size={15} />
              </button>

              <button
                onClick={handleComplete}
                disabled={completing}
                title="Mark as complete"
                style={{
                  width: '34px', height: '34px', borderRadius: '9px',
                  border: '1px solid var(--success)',
                  background: 'var(--success-soft)',
                  color: 'var(--success)',
                  cursor: completing ? 'not-allowed' : 'pointer',
                  opacity: completing ? 0.6 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
              >
                <RiCheckLine size={15} />
              </button>
            </>
          )}

          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Delete reminder"
            style={{
              width: '34px', height: '34px', borderRadius: '9px',
              border: '1px solid var(--danger)',
              background: 'var(--danger-soft)',
              color: 'var(--danger)',
              cursor: deleting ? 'not-allowed' : 'pointer',
              opacity: deleting ? 0.6 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
          >
            <RiDeleteBinLine size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
