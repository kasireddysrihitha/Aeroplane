// CO3: Functional component, useState, useEffect
// CO5: Simple form validation
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [userId, setUserId]   = useState('OPS_2847');
  const [password, setPassword] = useState('ops2024');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  // CO5: form validation before submitting
  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!userId.trim()) { setError('Operator ID is required.'); return; }
    if (!password.trim()) { setError('Security passphrase is required.'); return; }
    if (password.length < 6) { setError('Passphrase must be at least 6 characters.'); return; }

    setLoading(true);
    setTimeout(() => {
      const ok = login(userId, password);
      if (ok) {
        navigate('/dashboard');
      } else {
        setError('⚠ Invalid credentials. Please try again.');
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000,
      background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,80,120,0.28) 0%, transparent 60%), linear-gradient(180deg,#020810 0%,#051A30 100%)',
    }}>
      {/* Animated aircraft */}
      {['28%', '18%', '38%'].map((top, i) => (
        <div key={i} style={{
          position: 'absolute', fontSize: i === 1 ? 22 : i === 2 ? 16 : 32,
          opacity: 0, filter: 'drop-shadow(0 0 12px rgba(0,217,255,.35))',
          animation: `flyAc ${[18,24,14][i]}s linear infinite ${[0,9,4][i]}s`,
          top,
        }}>✈</div>
      ))}

      {/* Login card */}
      <div style={{
        position: 'relative', zIndex: 10, width: 450,
        background: 'rgba(8,17,32,.82)', backdropFilter: 'blur(24px)',
        border: '1px solid rgba(0,217,255,.18)', borderRadius: 16, padding: 38,
        boxShadow: '0 0 60px rgba(0,0,0,.6), inset 0 1px 0 rgba(0,217,255,.08)',
        animation: 'cardIn .9s ease-out',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, marginBottom: 22 }}>
          <div style={{
            width: 44, height: 44, background: 'rgba(0,217,255,.08)', border: '1px solid rgba(0,217,255,.35)',
            borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, boxShadow: '0 0 18px rgba(0,217,255,.18)',
          }}>✈</div>
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--cyan)', lineHeight: 1.4 }}>
              AODB CONTROL
            </div>
            <div style={{ fontFamily: "'Rajdhani'", fontSize: 9, color: 'var(--txt3)', letterSpacing: 2 }}>
              AIRPORT AUTHORITY
            </div>
          </div>
        </div>

        <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 18, fontWeight: 700, textAlign: 'center', color: '#fff', marginBottom: 5, lineHeight: 1.35 }}>
          Airline Ops Briefing<br/>Dashboard
        </div>
        <div style={{ fontSize: 12, textAlign: 'center', color: 'var(--txt2)', marginBottom: 22 }}>
          Real-time airport operations monitoring system
        </div>
        <div className="pgDesc" style={{ textAlign: 'center', marginBottom: 6 }}>
          Enter operator ID and password to access the dashboard.
        </div>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,217,255,.28),transparent)', marginBottom: 22 }} />

        {/* Error message */}
        {error && (
          <div style={{
            color: 'var(--red)', fontSize: 12, marginBottom: 10, padding: '8px 12px',
            background: 'var(--red-dim)', borderRadius: 6, border: '1px solid rgba(255,77,77,.18)',
          }}>
            {error}
          </div>
        )}

        {/* Form — CO5: controlled inputs with validation */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontFamily: "'Orbitron',monospace", fontSize: 8, fontWeight: 600, letterSpacing: 2, color: 'var(--txt2)', marginBottom: 6, display: 'block' }}>
              OPERATOR ID
            </label>
            <div className="cardDesc" style={{ marginTop: -2, marginBottom: 6 }}>
              Input box for staff login username.
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 15, opacity: .5 }}>👤</span>
              <input
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder="Enter operator ID"
                style={{
                  width: '100%', background: 'rgba(0,217,255,.03)', border: '1px solid rgba(0,217,255,.14)',
                  borderRadius: 7, padding: '11px 14px 11px 40px', color: 'var(--txt)',
                  fontFamily: "'Rajdhani',sans-serif", fontSize: 14, fontWeight: 500, outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontFamily: "'Orbitron',monospace", fontSize: 8, fontWeight: 600, letterSpacing: 2, color: 'var(--txt2)', marginBottom: 6, display: 'block' }}>
              SECURITY PASSPHRASE
            </label>
            <div className="cardDesc" style={{ marginTop: -2, marginBottom: 6 }}>
              Input box for secure password entry.
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 15, opacity: .5 }}>🔒</span>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter passphrase"
                style={{
                  width: '100%', background: 'rgba(0,217,255,.03)', border: '1px solid rgba(0,217,255,.14)',
                  borderRadius: 7, padding: '11px 14px 11px 40px', color: 'var(--txt)',
                  fontFamily: "'Rajdhani',sans-serif", fontSize: 14, fontWeight: 500, outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: 13,
              background: 'linear-gradient(135deg,rgba(0,217,255,.17),rgba(0,170,200,.12))',
              border: '1px solid rgba(0,217,255,.38)', borderRadius: 7, color: 'var(--cyan)',
              fontFamily: "'Orbitron',monospace", fontSize: 12, fontWeight: 700, letterSpacing: 3,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .6 : 1, transition: 'all .3s',
            }}
          >
            {loading ? '⏳  VERIFYING...' : '✈   AUTHORIZE ACCESS'}
          </button>
        </form>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 16,
          padding: 7, borderRadius: 5, background: 'rgba(255,77,77,.04)', border: '1px solid rgba(255,77,77,.1)',
        }}>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 8, letterSpacing: 2, color: 'rgba(255,77,77,.6)' }}>
            🔴 RESTRICTED — AUTHORIZED PERSONNEL ONLY — CLEARANCE LEVEL 4
          </span>
        </div>

        <div style={{ marginTop: 14, padding: 10, background: 'rgba(0,217,255,.03)', borderRadius: 6, border: '1px solid rgba(0,217,255,.08)', fontSize: 11, color: 'var(--txt3)' }}>
          Demo: <span style={{ color: 'var(--cyan)' }}>OPS_2847</span> / <span style={{ color: 'var(--cyan)' }}>ops2024</span>
          &nbsp; or &nbsp;
          <span style={{ color: 'var(--cyan)' }}>ADMIN_01</span> / <span style={{ color: 'var(--cyan)' }}>admin123</span>
          <div className="cardDesc" style={{ marginTop: 6, marginBottom: 0 }}>
            Shows sample login IDs for testing.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flyAc { 0%{left:-80px;opacity:0} 5%{opacity:.65} 95%{opacity:.65} 100%{left:calc(100vw + 80px);opacity:0} }
        @keyframes cardIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
