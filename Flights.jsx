// CO3: Functional component, useState, JSX, Props
// CO2: filter on FLIGHTS array
import { useState } from 'react';
import { FLIGHTS } from '../data/data';

// CO2: derive CSS class from status
function statusClass(s) {
  if (s === 'boarding')  return 'sp sB';
  if (s === 'delayed')   return 'sp sD';
  if (s === 'conflict')  return 'sp sCo';
  if (s === 'taxiing')   return 'sp sT2';
  if (s === 'departed')  return 'sp sDp';
  return 'sp sSc';
}

// CO1: Small sub-component for filter button
function FilterBtn({ label, active, onClick, color, bg, border }) {
  return (
    <button
      className="fBtn"
      onClick={onClick}
      style={{
        color: active ? '#000' : color,
        background: active ? color : bg,
        border: `1px solid ${border}`,
        boxShadow: active ? `0 0 12px ${color}55` : 'none',
      }}
    >
      {label}
    </button>
  );
}

export default function Flights() {
  const [filter, setFilter] = useState('all');

  // CO2: filter array based on active filter
  const visible = filter === 'all'
    ? FLIGHTS
    : FLIGHTS.filter(f => f.status === filter);

  const FILTERS = [
    { key: 'all',      label: 'ALL FLIGHTS', color: 'var(--cyan)',  bg: 'var(--cyan-dim)',  border: 'rgba(0,217,255,.18)' },
    { key: 'boarding', label: 'BOARDING',    color: 'var(--green)', bg: 'var(--green-dim)', border: 'rgba(74,222,128,.18)' },
    { key: 'delayed',  label: 'DELAYED',     color: 'var(--amber)', bg: 'var(--amber-dim)', border: 'rgba(255,181,71,.18)' },
    { key: 'conflict', label: 'CONFLICT',    color: 'var(--red)',   bg: 'var(--red-dim)',   border: 'rgba(255,77,77,.18)' },
    { key: 'taxiing',  label: 'TAXIING',     color: 'var(--blue)',  bg: 'rgba(96,165,250,.1)', border: 'rgba(96,165,250,.18)' },
  ];

  return (
    <div className="pg pgIn on" style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="sH">
        <div className="sT">ALL FLIGHTS — LIVE OPS</div>
        <span className="bdg bLive">● LIVE</span>
      </div>

      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
        {FILTERS.map(f => (
          <FilterBtn
            key={f.key}
            label={f.label}
            active={filter === f.key}
            onClick={() => setFilter(f.key)}
            color={f.color}
            bg={f.bg}
            border={f.border}
          />
        ))}
        <span style={{ marginLeft: 'auto', fontFamily: "'Orbitron',monospace", fontSize: 9, color: 'var(--txt3)', alignSelf: 'center' }}>
          {visible.length} FLIGHTS
        </span>
      </div>

      {/* Flight table */}
      <div className="ftWr">
        <table className="ft">
          <thead>
            <tr>
              <th>FLIGHT</th><th>AIRLINE</th><th>ORIGIN</th><th>DESTINATION</th>
              <th>GATE</th><th>STATUS</th><th>DEP</th><th>DELAY</th>
              <th>CREW</th><th>AIRCRAFT</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((f, i) => (
              <tr key={f.id} style={{ animationDelay: `${i * 50}ms` }}>
                <td><span className="fId">{f.id}</span></td>
                <td>{f.airline}</td>
                <td style={{ fontFamily: "'Orbitron',monospace", fontSize: 11 }}>{f.origin}</td>
                <td>{f.dest}</td>
                <td style={{ fontFamily: "'Orbitron',monospace", fontSize: 11 }}>{f.gate}</td>
                <td><span className={statusClass(f.status)}>{f.status.toUpperCase()}</span></td>
                <td style={{ fontFamily: "'Share Tech Mono',monospace" }}>{f.dep}</td>
                <td style={{ color: f.delay !== '—' ? 'var(--amber)' : 'var(--txt3)' }}>{f.delay}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 54, height: 3, background: 'rgba(255,255,255,.05)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${f.crew}%`, background: f.crew >= 90 ? 'var(--green)' : f.crew >= 70 ? 'var(--amber)' : 'var(--red)', borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 11 }}>{f.crew}%</span>
                  </div>
                </td>
                <td style={{ fontFamily: "'Share Tech Mono',monospace", color: 'var(--txt3)' }}>{f.ac}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary cards */}
      <div className="g3">
        {[
          { label: 'TOTAL', val: FLIGHTS.length, col: 'var(--cyan)' },
          { label: 'DELAYED', val: FLIGHTS.filter(f => f.status === 'delayed').length, col: 'var(--amber)' },
          { label: 'BOARDING', val: FLIGHTS.filter(f => f.status === 'boarding').length, col: 'var(--green)' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 32, fontWeight: 800, color: s.col }}>{s.val}</div>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 10, letterSpacing: 2, color: 'var(--txt3)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
