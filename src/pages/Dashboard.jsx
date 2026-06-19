// CO3: Functional component, useState, useEffect, JSX, Props
// CO2: map/filter on data arrays
import { useState, useEffect } from 'react';
import { FLIGHTS, GATES, STAFF, KPIS, WX, AI_FACTS, ALERTS } from '../data/data';

// ── Sub-components (CO1: component-based architecture) ──

function KpiCard({ kpi }) {
  return (
    <div className="kpiC">
      <span className="kpiIco">{kpi.icon}</span>
      <div className="kpiV">{kpi.val}</div>
      <div className="kpiL">{kpi.lbl}</div>
      <div className={`kpiTr ${kpi.tc}`}>{kpi.trend}</div>
      <div className="mBar">
        <div className="mBarF" style={{ width: `${kpi.fill}%`, background: kpi.col }} />
      </div>
    </div>
  );
}

// CO2: derive status class from status string
function statusClass(s) {
  if (s === 'boarding')  return 'sp sB';
  if (s === 'delayed')   return 'sp sD';
  if (s === 'conflict')  return 'sp sCo';
  if (s === 'taxiing')   return 'sp sT2';
  if (s === 'departed')  return 'sp sDp';
  return 'sp sSc';
}

function FlightRow({ f, delay }) {
  return (
    <tr style={{ animationDelay: `${delay}ms` }}>
      <td><span className="fId">{f.id}</span></td>
      <td>{f.airline}</td>
      <td style={{ fontFamily: "'Orbitron',monospace", fontSize: 11 }}>{f.gate}</td>
      <td>{f.dest}</td>
      <td><span className={statusClass(f.status)}>{f.status.toUpperCase()}</span></td>
      <td style={{ color: f.delay !== '—' ? 'var(--amber)' : 'var(--txt3)' }}>{f.delay}</td>
      <td style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 12 }}>{f.crew}%</td>
    </tr>
  );
}

function GateCell({ g }) {
  const cls = g.status === 'boarding' ? 'gCell gBrd'
            : g.status === 'conflict' ? 'gCell gCon'
            : g.status === 'occupied' ? 'gCell gOcc'
            : 'gCell gEm';
  return (
    <div className={cls}>
      <div className="gL">{g.id}</div>
      <div className="gF">{g.flight}</div>
      <div className="gBar"><div className="gBarF" style={{ width: `${g.occ}%` }} /></div>
    </div>
  );
}

function AlertCard({ a }) {
  return (
    <div className={`alCard ${a.level}`} style={{ marginBottom: 7, padding: 10, borderRadius: 7, borderLeft: '3px solid', background: 'rgba(15,23,42,.55)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
        <span style={{
          fontFamily: "'Orbitron',monospace", fontSize: 7, fontWeight: 700, letterSpacing: 1, padding: '2px 5px', borderRadius: 3,
          color: a.level === 'critical' ? 'var(--red)' : a.level === 'warning' ? 'var(--amber)' : a.level === 'success' ? 'var(--green)' : 'var(--cyan)',
          background: a.level === 'critical' ? 'var(--red-dim)' : a.level === 'warning' ? 'var(--amber-dim)' : a.level === 'success' ? 'var(--green-dim)' : 'var(--cyan-dim)',
        }}>{a.type}</span>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'var(--txt3)', marginLeft: 'auto' }}>{a.time}</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--txt2)', lineHeight: 1.4 }}>{a.msg}</div>
    </div>
  );
}

// ── Main Dashboard component ──
export default function Dashboard() {
  const [riskVal, setRiskVal] = useState(74);

  // CO3: useEffect — simulate risk fluctuation
  useEffect(() => {
    const id = setInterval(() => {
      setRiskVal(v => Math.max(60, Math.min(90, v + (Math.random() > .5 ? 1 : -1))));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // CO2: filter to show only first 5 flights in dashboard
  const dashFlights = FLIGHTS.filter((_, i) => i < 5);
  // CO2: filter gates for dashboard display
  const dashGates = GATES.filter((_, i) => i < 8);

  return (
    <div className="pg pgIn on" style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Page description */}
      <div className="pgDesc">Monitor real-time airport operations and performance.</div>

      {/* KPI Grid — CO2: map */}
      <div className="kpiGrid">
        {KPIS.map((k, i) => <KpiCard key={i} kpi={k} />)}
      </div>
      <div className="sDesc" style={{ marginTop: -10 }}>Key airport numbers like flights, delays, and gates.</div>

      {/* Flights + AI Risk */}
      <div className="g2" style={{ gridTemplateColumns: '1fr 290px' }}>
        <div>
          <div className="sH">
            <div className="sT">FLIGHT OPERATIONS MONITOR</div>
            <span className="bdg bLive">● LIVE</span>
          </div>
          <div className="sDesc">Lists live flights with status and operational details.</div>
          <div className="ftWr">
            <table className="ft">
              <thead><tr>
                <th>FLIGHT</th><th>AIRLINE</th><th>GATE</th><th>DESTINATION</th>
                <th>STATUS</th><th>DELAY</th><th>CREW</th>
              </tr></thead>
              <tbody>
                {dashFlights.map((f, i) => <FlightRow key={f.id} f={f} delay={i * 60} />)}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Risk Engine */}
        <div>
          <div className="sH">
            <div className="sT">AI RISK ENGINE</div>
            <span className="bdg bWarn">⚡ ACTIVE</span>
          </div>
          <div className="sDesc">Predicts operational risks using real-time factors.</div>
          <div className="aiCard">
            <div className="aiBdg">🤖 NEURAL OPS ANALYSIS</div>
            <div className="aiRisk">{riskVal}%</div>
            <div className="aiRLbl">PREDICTED OPERATIONAL RISK</div>
            <div className="rBar"><div className="rBarF" style={{ width: `${riskVal}%` }} /></div>
            <div className="cardDesc">Breaks down risk into weather, traffic, staff, gates.</div>
            {AI_FACTS.map((f, i) => (
              <div key={i} className="aiFact">
                <span>{f.lbl}</span>
                <div className="aiFBar">
                  <div style={{ height: '100%', width: `${f.val}%`, background: f.col, borderRadius: 2 }} />
                </div>
                <span style={{ color: f.col, fontFamily: "'Orbitron',monospace", fontSize: 10 }}>{f.val}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gates + Weather + Staff */}
      <div className="g3">
        <div>
          <div className="sH">
            <div className="sT">GATE MANAGEMENT</div>
            <span className="bdg bInfo">12 ACTIVE</span>
          </div>
          <div className="sDesc">Visual view of gate occupancy status.</div>
          <div className="card">
            <div className="gGrid">
              {dashGates.map(g => <GateCell key={g.id} g={g} />)}
            </div>
          </div>
        </div>

        {/* Weather */}
        <div>
          <div className="sH">
            <div className="sT">WEATHER SYSTEMS</div>
            <span className="bdg bWarn">MODERATE</span>
          </div>
          <div className="sDesc">Quick weather stats like temperature and wind.</div>
          <div className="card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginTop: 4 }}>
              {WX.map((w, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,.18)', border: '1px solid rgba(0,217,255,.05)', borderRadius: 7, padding: 9, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 17, fontWeight: 700, color: w.col, marginBottom: 2 }}>{w.val}</div>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 9, letterSpacing: 1, color: 'var(--txt3)', textTransform: 'uppercase' }}>{w.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff */}
        <div>
          <div className="sH">
            <div className="sT">STAFF STATUS</div>
            <span className="bdg bLive">● ONLINE</span>
          </div>
          <div className="sDesc">Top staff members and their availability.</div>
          <div className="card">
            {STAFF.filter((_, i) => i < 4).map((s, i) => (
              <div key={i} className="stRow">
                <div className="stAv" style={{ background: s.color + '22', color: s.color }}>{s.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div className="stNm">{s.name}</div>
                  <div className="stDp">{s.dept}</div>
                </div>
                <span className={`stSt ${s.status === 'available' ? 'stA' : s.status === 'break' ? 'stBr' : 'stCr'}`}>
                  {s.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Alerts */}
      <div>
        <div className="sH">
          <div className="sT">LIVE ALERTS</div>
          <span className="bdg bRed">{ALERTS.filter(a => a.level === 'critical').length} CRITICAL</span>
        </div>
        <div className="sDesc">Important real-time airport alerts.</div>
        <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {ALERTS.map((a, i) => <AlertCard key={i} a={a} />)}
        </div>
      </div>
    </div>
  );
}
