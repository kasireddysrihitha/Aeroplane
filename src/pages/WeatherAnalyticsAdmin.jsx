// CO2: ES6 named exports — three pages in one module (file-count constraint)
// CO3: Functional Components, JSX, useState, useEffect, Props
import { useState, useEffect } from 'react';
import { WX, FLIGHTS, ALERTS } from '../data/data';

// ═══════════ WEATHER ═══════════

// CO1: Weather metric card
function WxMetric({ m }) {
  return (
    <div className="wM">
      <div className="wV" style={{ color: m.col }}>{m.val}</div>
      <div className="wLb">{m.lbl}</div>
    </div>
  );
}

// CO1: Turbulence forecast row
function TurbRow({ alt, val }) {
  const c   = val >= 0.6 ? 'var(--red)' : val >= 0.35 ? 'var(--amber)' : 'var(--green)';
  const lbl = val >= 0.6 ? 'SEVERE'     : val >= 0.35 ? 'MODERATE'     : 'LIGHT';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:7 }}>
      <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'var(--txt3)', width:58 }}>{alt}</span>
      <div style={{ flex:1, height:12, background:'rgba(0,0,0,.25)', borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${val*100}%`, background:c, borderRadius:3, transition:'width .8s ease' }} />
      </div>
      <span style={{ fontFamily:"'Orbitron',monospace", fontSize:8, color:c, width:55 }}>{lbl}</span>
    </div>
  );
}

const TURB_DATA = [
  { alt: 'FL350', val: 0.7 },
  { alt: 'FL280', val: 0.4 },
  { alt: 'FL180', val: 0.2 },
  { alt: 'FL100', val: 0.6 },
  { alt: 'Surface', val: 0.3 },
];

// CO3: Weather page
export function Weather() {
  return (
    <div className="pg pgIn on" style={{ flex:1, overflowY:'auto', padding:18, display:'flex', flexDirection:'column', gap:14 }}>
      <div className="sH">
        <div className="sT">WEATHER SYSTEMS — LIVE</div>
        <span className="bdg bWarn">MODERATE RISK</span>
      </div>
      <div className="pgDesc">Animated radar showing weather activity.</div>

      <div className="g2">
        {/* Radar + metrics */}
        <div className="card">
          <div style={{ textAlign:'center', padding:'10px 0' }}>
            {/* Radar SVG */}
            <div style={{ width:160, height:160, margin:'0 auto 16px', position:'relative' }}>
              <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
                <circle cx="80" cy="80" r="74" fill="none" stroke="rgba(0,217,255,0.07)" strokeWidth="1"/>
                <circle cx="80" cy="80" r="54" fill="none" stroke="rgba(0,217,255,0.11)" strokeWidth="1"/>
                <circle cx="80" cy="80" r="34" fill="none" stroke="rgba(0,217,255,0.17)" strokeWidth="1"/>
                <circle cx="80" cy="80" r="14" fill="rgba(0,217,255,0.09)"/>
                <line x1="80" y1="6"  x2="80"  y2="154" stroke="rgba(0,217,255,0.05)" strokeWidth="1"/>
                <line x1="6"  y1="80" x2="154" y2="80"  stroke="rgba(0,217,255,0.05)" strokeWidth="1"/>
                <defs>
                  <radialGradient id="sg2" cx="60%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="rgba(0,217,255,0.4)"/>
                    <stop offset="100%" stopColor="rgba(0,217,255,0)"/>
                  </radialGradient>
                </defs>
                <path d="M80,80 L154,80 A74,74 0 0,0 80,6 Z" fill="url(#sg2)" opacity="0.6">
                  <animateTransform attributeName="transform" type="rotate" from="0 80 80" to="360 80 80" dur="4s" repeatCount="indefinite"/>
                </path>
                <circle cx="110" cy="52" r="4" fill="#00D9FF" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.1;0.9" dur="4s" begin="1s" repeatCount="indefinite"/>
                </circle>
                <circle cx="58"  cy="100" r="3" fill="#FFB547" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="4s" begin="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="120" cy="95"  r="2.5" fill="#FF4D4D" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;0.15;0.7" dur="3s" begin="0.5s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            {/* CO3: Props passed down to WxMetric */}
            <div className="sDesc" style={{ textAlign:'center' }}>Temperature, wind, visibility, and more.</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {WX.map(m => <WxMetric key={m.lbl} m={m} />)}
            </div>
          </div>
        </div>

        {/* Alerts + Turbulence */}
        <div>
          <div className="card" style={{ marginBottom:12 }}>
            <div className="sT" style={{ marginBottom:4 }}>STORM ALERTS</div>
            <div className="sDesc">Thunderstorm and wind warnings.</div>
            <div style={{ padding:10, background:'var(--amber-dim)', border:'1px solid rgba(255,181,71,.25)', borderRadius:7, marginBottom:8 }}>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:10, color:'var(--amber)', marginBottom:3 }}>⚡ THUNDERSTORM WATCH</div>
              <div style={{ fontSize:12, color:'var(--txt2)' }}>Approaching from SW, ETA 2h. Expect delays and reduced visibility.</div>
            </div>
            <div style={{ padding:10, background:'var(--cyan-dim)', border:'1px solid rgba(0,217,255,.18)', borderRadius:7 }}>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:10, color:'var(--cyan)', marginBottom:3 }}>💨 WIND ADVISORY</div>
              <div style={{ fontSize:12, color:'var(--txt2)' }}>Crosswind gusts up to 25 kts on runway 09L.</div>
            </div>
          </div>

          <div className="card">
            <div className="sT" style={{ marginBottom:4 }}>TURBULENCE FORECAST</div>
            <div className="sDesc">Turbulence risk at different altitudes.</div>
            {TURB_DATA.map(t => <TurbRow key={t.alt} alt={t.alt} val={t.val} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════ ANALYTICS ═══════════

const ANA_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const ANA_VALS = [118, 142, 135, 160, 148, 95, 80];
const OTP_VALS = [78, 80, 82, 79, 84, 86, 83, 85, 87, 84, 82, 84, 86, 88];

// CO1: Bar chart bar
function Bar({ val, max }) {
  const h   = Math.round((val / max) * 148);
  const col = val >= 150 ? 'var(--red)' : val >= 130 ? 'var(--amber)' : 'var(--cyan)';
  return (
    <div className="cBar" style={{ height:h, background:col, opacity:.8 }}
         title={`${val} flights`} />
  );
}

// CO3: Analytics page
export function Analytics() {
  const max = Math.max(...ANA_VALS);
  const pts = OTP_VALS.map((v, i) => `${(i / (OTP_VALS.length - 1)) * 300},${100 - (v - 70) * 5}`);

  return (
    <div className="pg pgIn on" style={{ flex:1, overflowY:'auto', padding:18, display:'flex', flexDirection:'column', gap:14 }}>
      <div className="sH">
        <div className="sT">OPERATIONS ANALYTICS</div>
        <span className="bdg bInfo">30 DAYS</span>
      </div>
      <div className="pgDesc">Key stats like on-time rate and average delay.</div>

      <div className="g2" style={{ marginBottom:4 }}>
        {/* Bar chart */}
        <div>
          <div className="sH"><div className="sT">DAILY FLIGHT VOLUME</div></div>
          <div className="sDesc">Bar chart of flights per day.</div>
          <div className="card" style={{ height:220, overflow:'hidden' }}>
            <div className="cBars">
              {ANA_VALS.map((v, i) => <Bar key={i} val={v} max={max} />)}
            </div>
            <div className="cXLbls">
              {ANA_DAYS.map((d, i) => <div key={i} className="cXL">{d}</div>)}
            </div>
          </div>
        </div>

        {/* Line chart */}
        <div>
          <div className="sH"><div className="sT">ON-TIME PERFORMANCE %</div></div>
          <div className="sDesc">Line graph showing punctuality trend.</div>
          <div className="card" style={{ height:220, overflow:'hidden', display:'flex', alignItems:'flex-end' }}>
            <svg width="100%" height="170" viewBox="0 0 300 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(0,217,255,.25)"/>
                  <stop offset="100%" stopColor="rgba(0,217,255,0)"/>
                </linearGradient>
              </defs>
              <polyline points={pts.join(' ')} fill="none" stroke="var(--cyan)" strokeWidth="2"/>
              {pts.map((p, i) => {
                const [cx, cy] = p.split(',');
                return <circle key={i} cx={cx} cy={cy} r="3" fill="var(--cyan)"/>;
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="g3">
        {[
          { val:'84%', lbl:'ON-TIME RATE',    col:'var(--cyan)'  },
          { val:'23',  lbl:'AVG DELAY (MIN)', col:'var(--amber)' },
          { val:'142', lbl:'FLIGHTS TODAY',   col:'var(--green)' },
        ].map(k => (
          <div key={k.lbl} className="card" style={{ textAlign:'center' }}>
            <div className="kpiV" style={{ color:k.col }}>{k.val}</div>
            <div className="kpiL" style={{ marginTop:4 }}>{k.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════ ADMIN ═══════════

// CO3: useAuth from context to verify admin
import { useAuth } from '../context/AuthContext';

const ADM_CARDS = [
  { icon:'✈', lbl:'TOTAL FLIGHTS', val:142, col:'var(--cyan)'  },
  { icon:'⚡', lbl:'ACTIVE ALERTS', val:6,   col:'var(--red)'   },
  { icon:'👥', lbl:'STAFF ONLINE',  val:312, col:'var(--green)' },
  { icon:'🏢', lbl:'GATES ACTIVE',  val:38,  col:'var(--amber)' },
];

const ACT_LOG = [
  { t:'14:32', m:'ADMIN: Updated gate C-05 conflict status' },
  { t:'14:21', m:'SYSTEM: AI-203 delay flag raised automatically' },
  { t:'14:15', m:'OPS: Staff shortage alert issued for Sector D' },
  { t:'14:05', m:'ADMIN: Fuel clearance granted for AI-556' },
  { t:'13:58', m:'ATC: SG-441 taxi clearance logged' },
  { t:'13:45', m:'SYSTEM: Fatigue threshold exceeded — Mohammed Ali' },
];

// CO3: Admin page (CO4: useAuth context)
export function Admin() {
  const { user } = useAuth();
  // CO5: simple form validation for flight override
  const [override, setOverride] = useState('');
  const [overMsg,  setOverMsg]  = useState('');

  function handleOverride(e) {
    e.preventDefault();
    if (!override.trim()) { setOverMsg('⚠ Flight ID required'); return; }
    setOverMsg(`✅ Override submitted for ${override.toUpperCase()}`);
    setOverride('');
  }

  return (
    <div className="pg pgIn on" style={{ flex:1, overflowY:'auto', padding:18, display:'flex', flexDirection:'column', gap:14 }}>
      <div className="sH">
        <div className="sT">🛡 ADMIN CONTROL PANEL</div>
        <span className="bdg bRed">RESTRICTED</span>
      </div>
      <div className="pgDesc">Shows totals for flights, alerts, staff, gates.</div>

      {/* Admin KPI cards */}
      <div className="admGrid" style={{ marginBottom:4 }}>
        {ADM_CARDS.map(c => (
          <div key={c.lbl} className="admC">
            <div style={{ fontSize:24, marginBottom:6 }}>{c.icon}</div>
            <div style={{ fontFamily:"'Orbitron',monospace", fontSize:18, color:c.col, marginBottom:2 }}>{c.val}</div>
            <div style={{ fontFamily:"'Orbitron',monospace", fontSize:7, color:'var(--txt3)', letterSpacing:1 }}>{c.lbl}</div>
          </div>
        ))}
      </div>

      <div className="g2">
        {/* Flight management table */}
        <div>
          <div className="sH"><div className="sT">FLIGHT MANAGEMENT</div></div>
          <div className="sDesc">List of flights with quick edit option.</div>
          <div className="card">
            <div className="ftWr">
              <table className="ft">
                <thead>
                  <tr>
                    {['FLIGHT','STATUS','GATE','DELAY','ACTION'].map(h => <th key={h}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {FLIGHTS.slice(0, 6).map(f => (
                    <tr key={f.id}>
                      <td><span className="fId">{f.id}</span></td>
                      <td><span className={`sp ${f.status === 'delayed' ? 'sD' : f.status === 'boarding' ? 'sB' : f.status === 'conflict' ? 'sCo' : 'sSc'}`}>{f.status.toUpperCase()}</span></td>
                      <td style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:'var(--cyan)' }}>{f.gate}</td>
                      <td style={{ color: f.delay !== '—' ? 'var(--amber)' : 'var(--txt3)' }}>{f.delay}</td>
                      <td>
                        <button style={{ padding:'3px 8px', background:'rgba(0,217,255,.08)', border:'1px solid rgba(0,217,255,.2)', borderRadius:4, color:'var(--cyan)', fontSize:9, fontFamily:"'Orbitron',monospace", cursor:'pointer', letterSpacing:1 }}>
                          EDIT
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CO5: Simple form validation */}
            <div style={{ marginTop:14, paddingTop:12, borderTop:'1px solid var(--bdr)' }}>
              <div className="sT" style={{ marginBottom:4, fontSize:9 }}>FLIGHT STATUS OVERRIDE</div>
              <div className="cardDesc" style={{ marginTop:0, marginBottom:8 }}>Manually update a flight's status.</div>
              <div style={{ display:'flex', gap:8 }}>
                <input
                  className="iF"
                  style={{ padding:'7px 12px', flex:1 }}
                  placeholder="Flight ID (e.g. AI-203)"
                  value={override}
                  onChange={e => { setOverride(e.target.value); setOverMsg(''); }}
                />
                <button onClick={handleOverride}
                  style={{ padding:'7px 14px', background:'rgba(0,217,255,.1)', border:'1px solid rgba(0,217,255,.3)', borderRadius:6, color:'var(--cyan)', fontFamily:"'Orbitron',monospace", fontSize:9, cursor:'pointer', letterSpacing:1, whiteSpace:'nowrap' }}>
                  SUBMIT
                </button>
              </div>
              {overMsg && (
                <div style={{ marginTop:6, fontSize:11, color: overMsg.startsWith('✅') ? 'var(--green)' : 'var(--red)' }}>
                  {overMsg}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activity log */}
        <div>
          <div className="sH"><div className="sT">ACTIVITY LOG</div></div>
          <div className="sDesc">Record of recent system and admin actions.</div>
          <div className="card">
            <div className="actLog">
              {ACT_LOG.map((a, i) => (
                <div key={i} className="actItem">
                  <span className="actT">{a.t}</span>
                  <span style={{ color:'var(--txt2)' }}>{a.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
