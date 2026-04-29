// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchReminders, setFilter } from '../store/slices/reminderSlice';
// import Navbar from '../components/layout/Navbar';
// import ReminderCard from '../components/reminder/ReminderCard';
// import ReminderModal from '../components/reminder/ReminderModal';
// import Button from '../components/ui/Button';
// import {
//   RiAddLine, RiBellLine, RiCheckboxCircleLine,
//   RiTimeLine, RiInboxLine, RiRefreshLine,
// } from 'react-icons/ri';

// const FILTERS = [
//   { key: 'all',       label: 'All',       Icon: RiBellLine },
//   { key: 'pending',   label: 'Pending',   Icon: RiTimeLine },
//   { key: 'completed', label: 'Completed', Icon: RiCheckboxCircleLine },
// ];

// export default function DashboardPage() {
//   const dispatch = useDispatch();
//   const { items, allItems, loading, filter } = useSelector((s) => s.reminders);
//   const { user } = useSelector((s) => s.auth);

//   const [showModal,    setShowModal]    = useState(false);
//   const [editReminder, setEditReminder] = useState(null);

//   useEffect(() => {
//     // Always fetch all for stats, then filtered list for display
//     dispatch(fetchReminders(filter !== 'all' ? { status: filter } : {}));
//   }, [dispatch, filter]);

//   const openEdit   = (r) => { setEditReminder(r); setShowModal(true); };
//   const closeModal = () => { setShowModal(false); setEditReminder(null); };

//   // Stats always from full list (stored separately in slice)
//   const total     = (allItems ?? items).length;
//   const pending   = (allItems ?? items).filter((r) => !r.completed).length;
//   const completed = (allItems ?? items).filter((r) =>  r.completed).length;

//   return (
//     <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
//       <Navbar />

//       <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

//         {/* ── Page header ───────────────────────────────────── */}
//         <div className="fade-up" style={{
//           display: 'flex', justifyContent: 'space-between',
//           alignItems: 'flex-start', marginBottom: '28px',
//           flexWrap: 'wrap', gap: '16px',
//         }}>
//           <div>
//             <h1 style={{
//               fontFamily: 'var(--font-display)', fontSize: '28px',
//               fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px',
//             }}>
//               My Reminders
//             </h1>
//             <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
//               Hey {user?.name?.split(' ')[0]} 👋 — manage your upcoming reminders
//             </p>
//           </div>
//           <div style={{ display: 'flex', gap: '8px' }}>
//             <button
//               onClick={() => dispatch(fetchReminders(filter !== 'all' ? { status: filter } : {}))}
//               title="Refresh"
//               style={{
//                 width: '40px', height: '40px', borderRadius: '10px',
//                 border: '1px solid var(--border)', background: 'var(--bg-card)',
//                 color: 'var(--text-secondary)', cursor: 'pointer',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 transition: 'all 0.15s',
//               }}
//             >
//               <RiRefreshLine size={17} />
//             </button>
//             <Button onClick={() => setShowModal(true)}>
//               <RiAddLine size={17} /> New Reminder
//             </Button>
//           </div>
//         </div>

//         {/* ── Stats row ─────────────────────────────────────── */}
//         <div className="fade-up s1" style={{
//           display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: '14px', marginBottom: '28px',
//         }}>
//           {[
//             { label: 'Total',     value: total,     color: 'var(--accent)',  Icon: RiBellLine },
//             { label: 'Pending',   value: pending,   color: 'var(--warning)', Icon: RiTimeLine },
//             { label: 'Completed', value: completed, color: 'var(--success)', Icon: RiCheckboxCircleLine },
//           ].map(({ label, value, color, Icon }) => (
//             <div key={label} style={{
//               background: 'var(--bg-card)',
//               border: '1px solid var(--border)',
//               borderRadius: '14px',
//               padding: '20px',
//               boxShadow: 'var(--shadow)',
//               display: 'flex', flexDirection: 'column', gap: '8px',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>
//                   {label}
//                 </span>
//                 <div style={{
//                   width: '30px', height: '30px', borderRadius: '8px',
//                   background: color === 'var(--accent)'  ? 'var(--accent-soft)'  :
//                               color === 'var(--warning)' ? 'var(--warning-soft)' : 'var(--success-soft)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 }}>
//                   <Icon size={15} color={color} />
//                 </div>
//               </div>
//               <div style={{
//                 fontSize: '32px', fontFamily: 'var(--font-display)',
//                 fontWeight: '800', color, lineHeight: 1,
//               }}>
//                 {value}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── Filter tabs ───────────────────────────────────── */}
//         <div className="fade-up s2" style={{
//           display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap',
//         }}>
//           {FILTERS.map(({ key, label, Icon }) => (
//             <button
//               key={key}
//               onClick={() => dispatch(setFilter(key))}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: '6px',
//                 padding: '8px 18px', borderRadius: '99px',
//                 fontSize: '13px', fontWeight: '600',
//                 fontFamily: 'var(--font-display)',
//                 cursor: 'pointer', transition: 'all 0.15s',
//                 border: filter === key ? '1px solid var(--accent)' : '1px solid var(--border)',
//                 background: filter === key ? 'var(--accent-soft)' : 'var(--bg-card)',
//                 color: filter === key ? 'var(--accent)' : 'var(--text-secondary)',
//               }}
//             >
//               <Icon size={14} /> {label}
//             </button>
//           ))}
//         </div>

//         {/* ── Reminder list ─────────────────────────────────── */}
//         {loading ? (
//           <div style={{ textAlign: 'center', padding: '70px' }}>
//             <div style={{
//               width: '36px', height: '36px', margin: '0 auto 14px',
//               border: '3px solid var(--border)', borderTopColor: 'var(--accent)',
//               borderRadius: '50%', animation: 'spin 0.7s linear infinite',
//             }} />
//             <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Loading reminders...</p>
//           </div>
//         ) : items.length === 0 ? (
//           <div className="fade-up" style={{
//             textAlign: 'center', padding: '70px 24px',
//             background: 'var(--bg-card)', border: '1px dashed var(--border)',
//             borderRadius: '16px', boxShadow: 'var(--shadow)',
//           }}>
//             <RiInboxLine size={48} style={{ color: 'var(--text-muted)', marginBottom: '14px' }} />
//             <h3 style={{
//               fontFamily: 'var(--font-display)', fontSize: '19px',
//               fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px',
//             }}>
//               {filter === 'all' ? 'No reminders yet' : `No ${filter} reminders`}
//             </h3>
//             <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
//               {filter === 'all'
//                 ? 'Create your first reminder and never miss anything important.'
//                 : `You have no ${filter} reminders right now.`}
//             </p>
//             {filter === 'all' && (
//               <Button onClick={() => setShowModal(true)}>
//                 <RiAddLine size={16} /> Create Your First Reminder
//               </Button>
//             )}
//           </div>
//         ) : (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//             {items.map((r, i) => (
//               <div key={r._id} className={`fade-up s${Math.min(i + 1, 6)}`}>
//                 <ReminderCard reminder={r} onEdit={openEdit} />
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {showModal && (
//         <ReminderModal onClose={closeModal} editReminder={editReminder} />
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReminders, setFilter } from "../store/slices/reminderSlice";
import Navbar from "../components/layout/Navbar";
import ReminderCard from "../components/reminder/ReminderCard";
import ReminderModal from "../components/reminder/ReminderModal";
import Button from "../components/ui/Button";
import { RiAddLine, RiBellLine, RiCheckboxCircleLine, RiTimeLine, RiInboxLine, RiRefreshLine } from "react-icons/ri";

const FILTERS = [
  { key:"all",       label:"All",       Icon:RiBellLine },
  { key:"pending",   label:"Pending",   Icon:RiTimeLine },
  { key:"completed", label:"Completed", Icon:RiCheckboxCircleLine },
];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { items, allItems, loading, filter } = useSelector((s) => s.reminders);
  const { user } = useSelector((s) => s.auth);
  const [showModal,    setShowModal]    = useState(false);
  const [editReminder, setEditReminder] = useState(null);

  useEffect(() => {
    dispatch(fetchReminders(filter !== "all" ? { status:filter } : {}));
  }, [dispatch, filter]);

  const openEdit   = (r) => { setEditReminder(r); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditReminder(null); };

  const src   = allItems?.length ? allItems : items;
  const total = src.length;
  const pend  = src.filter((r) => !r.completed).length;
  const done  = src.filter((r) =>  r.completed).length;

  const stats = [
    { label:"Total",     value:total, color:"var(--accent)",  soft:"var(--accent-soft)",  Icon:RiBellLine },
    { label:"Pending",   value:pend,  color:"var(--warning)", soft:"var(--warning-soft)", Icon:RiTimeLine },
    { label:"Completed", value:done,  color:"var(--success)", soft:"var(--success-soft)", Icon:RiCheckboxCircleLine },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>
      <Navbar/>
      <main style={{ maxWidth:"1100px", margin:"0 auto", padding:"24px 16px" }}>

        {/* Header */}
        <div className="fade-up" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"24px", flexWrap:"wrap", gap:"12px" }}>
          <div>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px, 4vw, 28px)", fontWeight:"800", color:"var(--text-primary)", marginBottom:"4px" }}>My Reminders</h1>
            <p style={{ fontSize:"14px", color:"var(--text-secondary)" }}>Hey {user?.name?.split(" ")[0]} 👋 — manage your reminders</p>
          </div>
          <div style={{ display:"flex", gap:"8px" }}>
            <button onClick={()=>dispatch(fetchReminders(filter!=="all"?{status:filter}:{}))} title="Refresh" style={{ width:"40px", height:"40px", borderRadius:"10px", border:"1px solid var(--border)", background:"var(--bg-card)", color:"var(--text-secondary)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <RiRefreshLine size={17}/>
            </button>
            <Button onClick={()=>setShowModal(true)}><RiAddLine size={17}/> New Reminder</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="fade-up s1" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", marginBottom:"24px" }}>
          {stats.map(({ label, value, color, soft, Icon }) => (
            <div key={label} style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:"12px", padding:"16px", boxShadow:"var(--shadow)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px" }}>
                <span style={{ fontSize:"12px", fontWeight:"500", color:"var(--text-secondary)" }}>{label}</span>
                <div style={{ width:"28px", height:"28px", borderRadius:"7px", background:soft, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon size={14} color={color}/>
                </div>
              </div>
              <div style={{ fontSize:"clamp(24px,4vw,32px)", fontFamily:"var(--font-display)", fontWeight:"800", color, lineHeight:1 }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="fade-up s2" style={{ display:"flex", gap:"8px", marginBottom:"18px", flexWrap:"wrap" }}>
          {FILTERS.map(({ key, label, Icon }) => (
            <button key={key} onClick={()=>dispatch(setFilter(key))} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"7px 16px", borderRadius:"99px", fontSize:"13px", fontWeight:"600", fontFamily:"var(--font-display)", cursor:"pointer", transition:"all 0.15s", border: filter===key?"1px solid var(--accent)":"1px solid var(--border)", background: filter===key?"var(--accent-soft)":"var(--bg-card)", color: filter===key?"var(--accent)":"var(--text-secondary)" }}>
              <Icon size={14}/>{label}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div style={{ textAlign:"center", padding:"60px" }}>
            <div style={{ width:"36px", height:"36px", margin:"0 auto 14px", border:"3px solid var(--border)", borderTopColor:"var(--accent)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
            <p style={{ fontSize:"14px", color:"var(--text-muted)" }}>Loading reminders...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="fade-up" style={{ textAlign:"center", padding:"60px 24px", background:"var(--bg-card)", border:"1px dashed var(--border)", borderRadius:"16px" }}>
            <RiInboxLine size={48} style={{ color:"var(--text-muted)", marginBottom:"14px" }}/>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:"19px", fontWeight:"700", color:"var(--text-primary)", marginBottom:"8px" }}>
              {filter==="all" ? "No reminders yet" : `No ${filter} reminders`}
            </h3>
            <p style={{ fontSize:"14px", color:"var(--text-secondary)", marginBottom:"24px" }}>
              {filter==="all" ? "Create your first reminder and never miss anything." : `You have no ${filter} reminders.`}
            </p>
            {filter==="all" && <Button onClick={()=>setShowModal(true)}><RiAddLine size={16}/> Create Reminder</Button>}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {items.map((r, i) => (
              <div key={r._id} className={`fade-up s${Math.min(i+1,6)}`}>
                <ReminderCard reminder={r} onEdit={openEdit}/>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && <ReminderModal onClose={closeModal} editReminder={editReminder}/>}
    </div>
  );
}
