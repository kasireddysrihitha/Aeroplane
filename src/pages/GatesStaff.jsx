// CO2: ES6 named exports — two pages in one module (file-count constraint)
// CO3: Functional Components, JSX, useState, useEffect, Props
import { useState } from 'react';
import { GATES, STAFF } from '../data/data';

// ── CO1: Gate Cell sub-component ──
function GateCell({ g, onClick }) {
  const cls = g.status === 'boarding' ? 'gCell gBrd'
             : g.status === 'conflict' ? 'gCell gCon'
             : g.status === 'occupied' ? 'gCell gOcc'
             : 'gCell gEm';
  return (
    <div className={cls} onClick={() => onClick(g)}>
      <div className="gL">{g.id}</div>
      <div className="gF">{g.flight}</div>
      <div className="gBar"><div className="gBarF" style={{ width: `${g.occ}%` }} /></div>
      {g.status === 'conflict' && <span style={{ position:'absolute', top:6, right:6, fontSize:10 }}>⚠</span>}
    </div>
  );
}

// ── CO1: Gate Timeline Row sub-component ──
function TimelineRow({ g }) {
  const cl = g.status === 'conflict' ? 'var(--red)'
           : g.status === 'boarding'  ? 'var(--cyan)'
           : 'var(--green)';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:8 }}>
      <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'var(--txt3)', width:35 }}>{g.id}</span>
      <div style={{ flex:1, height:18, background:'rgba(0,0,0,.25)', borderRadius:4, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${g.occ}%`, background:cl, borderRadius:4, display:'flex', alignItems:'center', paddingLeft:6 }}>
          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:'rgba(0,0,0,.8)' }}>{g.flight}</span>
        </div>
      </div>
      <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:cl, width:32 }}>{g.occ}%</span>
    </div>
  );
}

// ── CO3: Gates Page ──
export function Gates() {
  const [conflicts, setConflicts] = useState(GATES.filter(g => g.status === 'conflict'));
  const [selected, setSelected] = useState(null);

  function resolveConflict(id) {
    setConflicts(prev => prev.filter(g => g.id !== id));
  }

  return (
    <div className="pg pgIn on" style={{ flex:1, overflowY:'auto', padding:18, display:'flex', flexDirection:'column', gap:14 }}>
      <div className="sH">
        <div className="sT">GATE MANAGEMENT &amp; OCCUPANCY</div>
        <span className="bdg bLive">● LIVE</span>
      </div>
      <div className="pgDesc">Visual cards showing each gate's status.</div>

      {/* CO3: Props passed to child components */}
      <div className="g2">
        <div>
          <div className="card">
            <div className="gGrid">
              {GATES.map(g => <GateCell key={g.id} g={g} onClick={setSelected} />)}
            </div>
          </div>
        </div>

        <div>
          <div className="sH"><div className="sT">GATE TIMELINE</div></div>
          <div className="sDesc">Bar view showing flight occupancy per gate.</div>
          <div className="card">
            {GATES.filter(g => g.flight !== '—').map(g => (
              <TimelineRow key={g.id} g={g} />
            ))}
          </div>
        </div>
      </div>

      {/* Conflict Alerts */}
      <div className="sH" style={{ marginTop:4 }}>
        <div className="sT">CONFLICT ALERTS</div>
        <span className="bdg bRed">⚠ {conflicts.length > 0 ? 'ACTIVE' : 'CLEAR'}</span>
      </div>
      <div className="sDesc">Lists gates with scheduling conflicts.</div>
      <div className="card">
        {conflicts.length > 0 ? conflicts.map(g => (
          <div key={g.id} style={{ display:'flex', alignItems:'center', gap:12, padding:12, background:'var(--red-dim)', border:'1px solid rgba(255,77,77,.25)', borderRadius:7, marginBottom:8 }}>
            <span style={{ fontSize:18, animation:'bR .6s infinite' }}>⚠</span>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:11, color:'var(--red)', marginBottom:2 }}>
                CONFLICT — GATE {g.id}
              </div>
              <div style={{ fontSize:12, color:'var(--txt2)' }}>
                Flight {g.flight} has a schedule overlap. Reassignment required.
              </div>
            </div>
            <button
              onClick={() => resolveConflict(g.id)}
              style={{ padding:'6px 12px', background:'rgba(255,77,77,.2)', border:'1px solid rgba(255,77,77,.4)', borderRadius:5, color:'var(--red)', fontFamily:"'Orbitron',monospace", fontSize:8, cursor:'pointer', letterSpacing:1 }}
            >
              RESOLVE
            </button>
          </div>
        )) : (
          <div style={{ color:'var(--txt3)', fontSize:13, padding:12 }}>✅ No gate conflicts detected</div>
        )}
      </div>

      {/* CO3: useState — gate detail panel */}
      {selected && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.6)', zIndex:400, display:'flex', alignItems:'center', justifyContent:'center' }}
             onClick={() => setSelected(null)}>
          <div style={{ background:'rgba(8,17,32,.98)', border:'1px solid rgba(0,217,255,.25)', borderRadius:12, padding:24, minWidth:280, maxWidth:340 }}
               onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily:"'Orbitron',monospace", fontSize:14, color:'var(--cyan)', marginBottom:12 }}>GATE {selected.id}</div>
            <div className="cardDesc" style={{ marginTop: -8, marginBottom: 10 }}>Shows full info when a gate is clicked.</div>
            {[
              ['FLIGHT', selected.flight],
              ['STATUS', selected.status.toUpperCase()],
              ['OCCUPANCY', `${selected.occ}%`],
            ].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid var(--bdr)', fontSize:12 }}>
                <span style={{ color:'var(--txt3)', fontFamily:"'Orbitron',monospace", fontSize:8, letterSpacing:1 }}>{k}</span>
                <span style={{ color:'var(--txt)' }}>{v}</span>
              </div>
            ))}
            <button onClick={() => setSelected(null)}
              style={{ marginTop:14, width:'100%', padding:'8px', background:'rgba(0,217,255,.08)', border:'1px solid rgba(0,217,255,.2)', borderRadius:6, color:'var(--cyan)', fontFamily:"'Orbitron',monospace", fontSize:9, cursor:'pointer', letterSpacing:2 }}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── CO1: Staff Row sub-component ──
function StaffRow({ s }) {
  const fc = s.fatigue >= 80 ? '#FF4D4D' : s.fatigue >= 60 ? '#FFB547' : '#4ADE80';
  const sc = s.status === 'available' ? 'stSt stA' : s.status === 'break' ? 'stSt stBr' : 'stSt stCr';
  return (
    <div className="stRow">
      <div className="stAv" style={{ background:`${s.color}22`, border:`1px solid ${s.color}44`, color:s.color }}>
        {s.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div style={{ flex:1 }}>
        <div className="stNm">{s.name}</div>
        <div className="stDp">{s.dept} • {s.shift}</div>
      </div>
      <div className="fatWr">
        <div className="fatL"><span>FAT</span><span style={{ color:fc }}>{s.fatigue}%</span></div>
        <div className="fatB"><div className="fatBF" style={{ width:`${s.fatigue}%`, background:fc }} /></div>
        <div className="cardDesc" style={{ marginTop: 2, fontSize: 8 }}>Staff tiredness level.</div>
      </div>
      <span className={sc}>{s.status.toUpperCase()}</span>
    </div>
  );
}

// ── CO3: Staff Page ──
export function Staff() {
  // CO3: useState for department filter
  const [dept, setDept] = useState('all');

  const depts = ['all', ...new Set(STAFF.map(s => s.dept))];
  const visible = dept === 'all' ? STAFF : STAFF.filter(s => s.dept === dept);

  const online   = STAFF.filter(s => s.status === 'available').length;
  const onBreak  = STAFF.filter(s => s.status === 'break').length;
  const critical = STAFF.filter(s => s.status === 'critical').length;

  return (
    <div className="pg pgIn on" style={{ flex:1, overflowY:'auto', padding:18, display:'flex', flexDirection:'column', gap:14 }}>
      <div className="sH">
        <div className="sT">STAFF OPERATIONS CENTER</div>
        <span className="bdg bLive">● ONLINE</span>
      </div>
      <div className="pgDesc">Shows online, on-break, and critical staff counts.</div>

      {/* KPI strip */}
      <div className="g3" style={{ marginBottom:4 }}>
        {[
          { val: online,   lbl: 'STAFF ONLINE',    col: 'var(--green)' },
          { val: onBreak,  lbl: 'ON BREAK',         col: 'var(--amber)' },
          { val: critical, lbl: 'CRITICAL FATIGUE', col: 'var(--red)'   },
        ].map(k => (
          <div key={k.lbl} className="card" style={{ textAlign:'center' }}>
            <div className="kpiV" style={{ color:k.col }}>{k.val}</div>
            <div className="kpiL" style={{ marginTop:4 }}>{k.lbl}</div>
          </div>
        ))}
      </div>

      {/* Department filter */}
      <div className="sDesc" style={{ marginBottom: -2 }}>Filter staff list by department.</div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {depts.map(d => (
          <button key={d} className="fBtn"
            onClick={() => setDept(d)}
            style={{
              color: dept === d ? '#000' : 'var(--cyan)',
              background: dept === d ? 'var(--cyan)' : 'var(--cyan-dim)',
              border: '1px solid rgba(0,217,255,.18)',
              boxShadow: dept === d ? '0 0 12px rgba(0,217,255,.4)' : 'none',
            }}
          >
            {d === 'all' ? 'ALL STAFF' : d.toUpperCase()}
          </button>
        ))}
        <span style={{ marginLeft:'auto', fontFamily:"'Orbitron',monospace", fontSize:9, color:'var(--txt3)', alignSelf:'center' }}>
          {visible.length} PERSONNEL
        </span>
      </div>

      <div className="sH"><div className="sT">STAFF ROSTER</div></div>
      <div className="sDesc">List of all staff with role, shift, and status.</div>
      <div className="card">
        {visible.map(s => <StaffRow key={s.name} s={s} />)}
      </div>
    </div>
  );
}
