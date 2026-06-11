// CO2: ES6 module exports

export const FLIGHTS = [
  { id: 'AI-203', airline: 'Air India',  origin: 'DEL', dest: 'Mumbai BOM',    gate: 'B-12', status: 'delayed',   dep: '14:30', delay: '+45m', crew: 80, ac: 'B787' },
  { id: '6E-422', airline: 'IndiGo',     origin: 'BLR', dest: 'Delhi DEL',     gate: 'A-04', status: 'boarding',  dep: '15:00', delay: '—',    crew: 95, ac: 'A320' },
  { id: 'UK-147', airline: 'Vistara',    origin: 'MAA', dest: 'Bangalore BLR', gate: 'C-05', status: 'conflict',  dep: '15:15', delay: '+12m', crew: 60, ac: 'A321' },
  { id: 'SG-441', airline: 'SpiceJet',   origin: 'HYD', dest: 'Chennai MAA',   gate: 'D-09', status: 'taxiing',   dep: '14:45', delay: '—',    crew: 100,ac: 'B737' },
  { id: 'EK-524', airline: 'Emirates',   origin: 'DXB', dest: 'Dubai DXB',     gate: 'T-01', status: 'boarding',  dep: '16:00', delay: '—',    crew: 88, ac: 'B777' },
  { id: 'QR-573', airline: 'Qatar Air',  origin: 'DOH', dest: 'Doha DOH',      gate: 'T-03', status: 'delayed',   dep: '16:30', delay: '+20m', crew: 72, ac: 'B787' },
  { id: 'AI-556', airline: 'Air India',  origin: 'CCU', dest: 'Kolkata CCU',   gate: 'B-07', status: 'departed',  dep: '13:00', delay: '—',    crew: 90, ac: 'A320' },
  { id: '6E-817', airline: 'IndiGo',     origin: 'PNQ', dest: 'Pune PNQ',      gate: 'A-11', status: 'boarding',  dep: '15:45', delay: '—',    crew: 85, ac: 'A320' },
  { id: 'IX-302', airline: 'Air Asia',   origin: 'KUL', dest: 'KL KUL',        gate: 'T-05', status: 'scheduled', dep: '17:00', delay: '—',    crew: 78, ac: 'A320' },
  { id: 'SG-120', airline: 'SpiceJet',   origin: 'AMD', dest: 'Ahmedabad AMD', gate: 'C-02', status: 'delayed',   dep: '14:00', delay: '+30m', crew: 65, ac: 'B737' },
];

export const GATES = [
  { id: 'A-04', flight: '6E-422', status: 'boarding',  occ: 85 },
  { id: 'A-08', flight: '—',      status: 'empty',     occ: 0  },
  { id: 'A-11', flight: '6E-817', status: 'boarding',  occ: 65 },
  { id: 'B-05', flight: '—',      status: 'empty',     occ: 0  },
  { id: 'B-07', flight: 'AI-556', status: 'occupied',  occ: 100},
  { id: 'B-12', flight: 'AI-203', status: 'occupied',  occ: 90 },
  { id: 'C-02', flight: 'SG-120', status: 'occupied',  occ: 70 },
  { id: 'C-05', flight: 'UK-147', status: 'conflict',  occ: 95 },
  { id: 'C-09', flight: '—',      status: 'empty',     occ: 0  },
  { id: 'D-03', flight: '—',      status: 'empty',     occ: 0  },
  { id: 'D-09', flight: 'SG-441', status: 'occupied',  occ: 70 },
  { id: 'T-01', flight: 'EK-524', status: 'boarding',  occ: 80 },
];

export const STAFF = [
  { name: 'Rajesh Kumar',  dept: 'Ground Ops',  shift: '08:00-16:00', fatigue: 65, status: 'available', color: '#00D9FF' },
  { name: 'Priya Sharma',  dept: 'ATC Support', shift: '12:00-20:00', fatigue: 40, status: 'available', color: '#4ADE80' },
  { name: 'Mohammed Ali',  dept: 'Fuel Ops',    shift: '06:00-14:00', fatigue: 88, status: 'critical',  color: '#FF4D4D' },
  { name: 'Sunita Reddy',  dept: 'Baggage',     shift: '10:00-18:00', fatigue: 72, status: 'break',     color: '#FFB547' },
  { name: 'Vikram Singh',  dept: 'Security',    shift: '14:00-22:00', fatigue: 30, status: 'available', color: '#00D9FF' },
  { name: 'Anita Mehta',   dept: 'Ground Ops',  shift: '10:00-18:00', fatigue: 55, status: 'available', color: '#4ADE80' },
  { name: 'Ravi Patel',    dept: 'Fuel Ops',    shift: '08:00-16:00', fatigue: 82, status: 'critical',  color: '#FF4D4D' },
];

export const ALERTS = [
  { type: 'CRITICAL', msg: 'Gate C-05 conflict: UK-147 & SG-120 overlap 15 min.', time: '14:32', level: 'critical' },
  { type: 'WEATHER',  msg: 'Thunderstorm cell approaching from SW. Turbulence likely.', time: '14:28', level: 'warning' },
  { type: 'DELAY',    msg: 'AI-203 delayed +45min due to inbound aircraft issue.', time: '14:21', level: 'warning' },
  { type: 'STAFF',    msg: 'Sector D ground crew shortage. 3 staff required immediately.', time: '14:15', level: 'critical' },
  { type: 'OPS INFO', msg: 'Runway 09L cleared. Normal operations resumed.', time: '14:10', level: 'info' },
  { type: 'FUEL',     msg: 'AI-556 fuel loading complete. Ready for push-back.', time: '14:05', level: 'success' },
];

export const KPIS = [
  { lbl: 'TOTAL FLIGHTS',  val: 142,   icon: '✈',  trend: '▲ +8 today',         tc: 'tUp', fill: 70, col: '#00D9FF', pg: 'flights'   },
  { lbl: 'DELAYED',        val: 23,    icon: '⏱', trend: '▲ 4 from avg',        tc: 'tDn', fill: 30, col: '#FFB547', pg: 'flights'   },
  { lbl: 'ACTIVE GATES',   val: 38,    icon: '🏢', trend: '94% utilized',        tc: 'tUp', fill: 94, col: '#00D9FF', pg: 'dashboard' },
  { lbl: 'STAFF ONLINE',   val: 312,   icon: '👥', trend: '▼ 3 shortage',        tc: 'tWn', fill: 78, col: '#FFB547', pg: 'dashboard' },
  { lbl: 'WEATHER SEV.',   val: 'MOD', icon: '⛅', trend: 'Wind 18 kts',         tc: 'tWn', fill: 50, col: '#FFB547', pg: 'dashboard' },
  { lbl: 'ON-TIME PERF.',  val: '84%', icon: '🎯', trend: '▲ 3% vs yesterday',  tc: 'tUp', fill: 84, col: '#4ADE80', pg: 'dashboard' },
];

export const WX = [
  { val: '28°C',    lbl: 'TEMPERATURE', col: '#FFB547' },
  { val: '18kt',    lbl: 'WIND SPEED',  col: '#00D9FF' },
  { val: '8km',     lbl: 'VISIBILITY',  col: '#4ADE80' },
  { val: '35%',     lbl: 'RAIN PROB.',  col: '#60A5FA' },
  { val: 'MOD',     lbl: 'TURBULENCE',  col: '#FFB547' },
  { val: '⚠ ACTIVE',lbl: 'STORM WARN', col: '#FF4D4D' },
];

export const AI_FACTS = [
  { lbl: 'Weather Impact',  val: 85, col: '#FF4D4D' },
  { lbl: 'Traffic Load',    val: 70, col: '#FFB547' },
  { lbl: 'Staff Readiness', val: 60, col: '#FFB547' },
  { lbl: 'Gate Conflicts',  val: 40, col: '#4ADE80' },
];
