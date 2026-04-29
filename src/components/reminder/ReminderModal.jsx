import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReminder, updateReminder } from "../../store/slices/reminderSlice";
import { format } from "date-fns";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { RiCloseLine, RiBellLine } from "react-icons/ri";

const toLocalDT = (iso) => iso ? format(new Date(iso), "yyyy-MM-dd'T'HH:mm") : "";
const minDT = () => { const d = new Date(); d.setMinutes(d.getMinutes()+2); return format(d,"yyyy-MM-dd'T'HH:mm"); };

export default function ReminderModal({ onClose, editReminder }) {
  const dispatch = useDispatch();
  const { submitting } = useSelector((s) => s.reminders);
  const [form, setForm]     = useState({ title:"", description:"", dateTime:"" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editReminder) setForm({ title:editReminder.title, description:editReminder.description||"", dateTime:toLocalDT(editReminder.dateTime) });
  }, [editReminder]);

  useEffect(() => {
    const h = (e) => { if (e.key==="Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const validate = () => {
    const e = {};
    if (!form.title.trim())      e.title    = "Title is required";
    if (form.title.length > 100) e.title    = "Max 100 characters";
    if (!form.dateTime)          e.dateTime = "Date and time is required";
    if (form.dateTime && new Date(form.dateTime) <= new Date()) e.dateTime = "Must be in the future";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const payload = { title:form.title.trim(), description:form.description.trim(), dateTime:new Date(form.dateTime).toISOString() };
    const result = editReminder
      ? await dispatch(updateReminder({ id:editReminder._id, data:payload }))
      : await dispatch(createReminder(payload));
    if (!result.error) onClose();
  };

  const set = (f) => (e) => setForm((p) => ({ ...p, [f]:e.target.value }));

  return (
    <div onClick={(e)=>{ if(e.target===e.currentTarget)onClose(); }} style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>
      <div className="scale-in" style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:"18px", padding:"28px", width:"100%", maxWidth:"480px", boxShadow:"var(--shadow-lg)", maxHeight:"90vh", overflowY:"auto" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ width:"36px", height:"36px", borderRadius:"9px", background:"var(--accent-soft)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <RiBellLine size={18} color="var(--accent)"/>
            </div>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"19px", fontWeight:"700", color:"var(--text-primary)" }}>
              {editReminder ? "Edit Reminder" : "New Reminder"}
            </h2>
          </div>
          <button onClick={onClose} style={{ width:"34px", height:"34px", borderRadius:"9px", border:"1px solid var(--border)", background:"var(--bg-input)", color:"var(--text-secondary)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <RiCloseLine size={18}/>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          <Input label="Title *" placeholder="e.g. Take medication, Team meeting..." value={form.title} onChange={set("title")} error={errors.title} autoFocus/>

          <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
            <label style={{ fontSize:"13px", fontWeight:"500", color:"var(--text-secondary)", fontFamily:"var(--font-display)" }}>Description <span style={{ color:"var(--text-muted)" }}>(optional)</span></label>
            <textarea placeholder="Add details..." value={form.description} onChange={set("description")} rows={3}
              style={{ width:"100%", padding:"10px 14px", background:"var(--bg-input)", border:"1px solid var(--border)", borderRadius:"10px", color:"var(--text-primary)", fontSize:"14px", fontFamily:"var(--font-body)", outline:"none", resize:"vertical", transition:"border-color 0.15s, box-shadow 0.15s" }}
              onFocus={e=>{ e.target.style.borderColor="var(--accent)"; e.target.style.boxShadow="0 0 0 3px var(--accent-soft)"; }}
              onBlur={e=>{ e.target.style.borderColor="var(--border)"; e.target.style.boxShadow="none"; }}
            />
          </div>

          <Input label="Date & Time *" type="datetime-local" min={editReminder?undefined:minDT()} value={form.dateTime} onChange={set("dateTime")} error={errors.dateTime}/>

          <p style={{ fontSize:"12px", color:"var(--text-muted)", background:"var(--bg-input)", borderRadius:"8px", padding:"10px 12px", lineHeight:1.5 }}>
            🔔 You'll get a browser notification at this time — even if the tab is closed.
          </p>

          <div style={{ display:"flex", gap:"10px" }}>
            <Button type="button" variant="secondary" onClick={onClose} style={{ flex:1 }}>Cancel</Button>
            <Button type="submit" loading={submitting} style={{ flex:2 }}>
              {editReminder ? "Save Changes" : "Create Reminder"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
