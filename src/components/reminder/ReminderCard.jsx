import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteReminder,
  markComplete,
  markIncomplete,
} from "../../store/slices/reminderSlice";
import {
  format,
  isPast,
  isToday,
  isTomorrow,
  differenceInHours,
} from "date-fns";
import {
  RiDeleteBinLine,
  RiEditLine,
  RiCheckLine,
  RiTimeLine,
  RiCalendarLine,
  RiCrossFill,
  RiCrossLine,
  RiCloseLine,
  RiRestartLine,
} from "react-icons/ri";

const getDateInfo = (dt) => {
  const d = new Date(dt);
  if (isToday(d)) {
    const h = differenceInHours(d, new Date());
    if (h <= 0)
      return {
        label: "Due now",
        color: "var(--danger)",
        bg: "var(--danger-soft)",
      };
    if (h < 3)
      return {
        label: `In ${h}h`,
        color: "var(--warning)",
        bg: "var(--warning-soft)",
      };
    return { label: "Today", color: "var(--accent)", bg: "var(--accent-soft)" };
  }
  if (isTomorrow(d))
    return {
      label: "Tomorrow",
      color: "var(--success)",
      bg: "var(--success-soft)",
    };
  if (isPast(d))
    return {
      label: "Overdue",
      color: "var(--danger)",
      bg: "var(--danger-soft)",
    };
  return {
    label: format(d, "MMM d"),
    color: "var(--text-secondary)",
    bg: "var(--bg-input)",
  };
};

export default function ReminderCard({ reminder, onEdit }) {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const [completing, setCompleting] = useState(false);

  const info = getDateInfo(reminder.dateTime);
  const isOverdue = isPast(new Date(reminder.dateTime)) && !reminder.completed;

  const handleDelete = async () => {
    if (!window.confirm("Delete this reminder?")) return;
    setDeleting(true);
    await dispatch(deleteReminder(reminder._id));
    setDeleting(false);
  };

  const handleComplete = async () => {
    setCompleting(true);
    await dispatch(markComplete(reminder._id));
    setCompleting(false);
  };

  const handleIncomplete = async () => {
    setCompleting(true);
    await dispatch(markIncomplete(reminder._id));
    setCompleting(false);
  };

  return (
    <div
      className="scale-in"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderLeft: `4px solid ${reminder.completed ? "var(--success)" : isOverdue ? "var(--danger)" : "var(--accent)"}`,
        borderRadius: "12px",
        padding: "14px 16px",
        boxShadow: "var(--shadow)",
        opacity: reminder.completed ? 0.65 : 1,
        transition: "box-shadow 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "var(--shadow-lg)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow)")}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
              flexWrap: "wrap",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "15px",
                fontWeight: "600",
                color: "var(--text-primary)",
                textDecoration: reminder.completed ? "line-through" : "none",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {reminder.title}
            </h3>
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: reminder.completed ? "var(--success)" : info.color,
                background: reminder.completed
                  ? "var(--success-soft)"
                  : info.bg,
                padding: "2px 9px",
                borderRadius: "99px",
                flexShrink: 0,
              }}
            >
              {reminder.completed ? "✓ Done" : info.label}
            </span>
          </div>

          {reminder.description && (
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "8px",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {reminder.description}
            </p>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              <RiCalendarLine size={13} />{" "}
              {format(new Date(reminder.dateTime), "EEE, MMM d yyyy")}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              <RiTimeLine size={13} />{" "}
              {format(new Date(reminder.dateTime), "h:mm a")}
            </span>
          </div>
        </div>

        {/* Actions */}
        {/* Actions */}
        <div className="flex gap-1.5 shrink-0 items-center">
          {!reminder.completed && (
            <>
              {/* Edit */}
              <button
                onClick={() => onEdit(reminder)}
                title="Edit"
                className="w-8 h-8 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200"
              >
                <RiEditLine size={15} />
              </button>

              {/* Mark Complete */}
              <button
                onClick={handleComplete}
                disabled={completing}
                title="Mark complete"
                className={`w-8 h-8 rounded-lg border border-green-500 bg-green-100 text-green-600 flex items-center justify-center
          ${completing ? "opacity-50 cursor-not-allowed" : "hover:bg-green-200"}`}
              >
                <RiCheckLine size={15} />
              </button>
            </>
          )}
          {reminder.completed && (
            <button
              onClick={handleIncomplete}
              disabled={completing}
              title="Mark incomplete"
              className={`w-8 h-8 rounded-lg border border-yellow-500 bg-yellow-100 text-yellow-600 flex items-center justify-center
        ${completing ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-200"}`}
            >
              <RiRestartLine size={15} />
            </button>
          )}

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Delete"
            className={`w-8 h-8 rounded-lg border border-red-500 bg-red-100 text-red-600 flex items-center justify-center
      ${deleting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-200"}`}
          >
            <RiDeleteBinLine size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
