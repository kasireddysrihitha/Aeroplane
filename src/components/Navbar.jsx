// CO1: Reusable Navbar component  CO3: Props, useState
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [time, setTime] = useState('');

  // CO3: useEffect for live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav style={{
      height: 58, background: 'rgba(8,17,32,.95)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 12, flexShrink: 0, position: 'relative', zIndex: 200,
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/dashboard')}
        style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', flexShrink: 0 }}
      >
        <div style={{
          width: 34, height: 34, background: 'rgba(0,217,255,.08)',
          border: '1px solid rgba(0,217,255,.28)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
        }}>✈</div>
        <div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 10, fontWeight: 700, color: 'var(--cyan)', letterSpacing: 1 }}>
            AODB CONTROL
          </div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 9, color: 'var(--txt3)', letterSpacing: 2 }}>
            HYD INTL • RJAA
          </div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 8, color: 'var(--txt3)', letterSpacing: 1, opacity: .7 }}>
            Airport control system branding
          </div>
        </div>
      </div>

      <div style={{ width: 1, height: 28, background: 'var(--bdr)', flexShrink: 0 }} />
      <div style={{ flex: 1 }} />

      {/* Weather badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7, padding: '5px 10px',
        background: 'rgba(0,217,255,.04)', border: '1px solid rgba(0,217,255,.1)',
        borderRadius: 18, fontFamily: "'Rajdhani', sans-serif", fontSize: 12,
        color: 'var(--txt2)', flexShrink: 0,
      }}>
        ⛅ <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>28°C</span> Hyderabad
      </div>

      {/* Clock */}
      <div style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: 'var(--cyan)',
        letterSpacing: 1, padding: '5px 10px', background: 'rgba(0,217,255,.04)',
        border: '1px solid rgba(0,217,255,.1)', borderRadius: 6, flexShrink: 0,
      }}>
        {time}
      </div>

      {/* User info & logout */}
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px',
            background: 'rgba(0,217,255,.04)', border: '1px solid rgba(0,217,255,.1)',
            borderRadius: 18,
          }}>
            <div style={{
              width: 26, height: 26, background: 'linear-gradient(135deg,var(--cyan),rgba(0,120,180,1))',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: '#000',
            }}>
              {user.initials}
            </div>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--txt2)' }}>
              {user.name}
            </span>
          </div>
          <button onClick={handleLogout} style={{
            padding: '6px 12px', background: 'rgba(255,77,77,.07)', border: '1px solid rgba(255,77,77,.28)',
            borderRadius: 7, color: 'var(--red)', fontFamily: "'Orbitron', monospace", fontSize: 9,
            fontWeight: 700, letterSpacing: 2, cursor: 'pointer',
          }}>
            LOGOUT
          </button>
        </div>
      )}
    </nav>
  );
}
