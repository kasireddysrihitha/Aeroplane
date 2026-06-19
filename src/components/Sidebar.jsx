// CO1: Reusable Sidebar component  CO3: Props, useState
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// CO2: data array, map usage
const NAV_ITEMS = [
  { icon: '📊', label: 'Dashboard',     path: '/dashboard', desc: 'Main overview page' },
  { icon: '✈',  label: 'Flights',       path: '/flights',   desc: 'Flights monitoring page' },
  { icon: '🏢', label: 'Gates',         path: '/gates',     desc: 'Gate management page' },
  { icon: '👥', label: 'Staff',         path: '/staff',     desc: 'Staff management page' },
  { icon: '🌧', label: 'Weather',       path: '/weather',   desc: 'Weather monitoring page' },
  { icon: '📈', label: 'Analytics',     path: '/analytics', desc: 'Operations analytics page' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <aside style={{
      width: 58, background: 'rgba(8,17,32,.95)', backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--bdr)', display: 'flex', flexDirection: 'column',
      padding: '14px 0', gap: 2, flexShrink: 0, zIndex: 100,
      transition: 'width .3s cubic-bezier(.4,0,.2,1)', overflow: 'hidden',
    }}
      onMouseEnter={e => e.currentTarget.style.width = '210px'}
      onMouseLeave={e => e.currentTarget.style.width = '58px'}
    >
      {/* CO2: map over nav items */}
      {NAV_ITEMS.map(item => {
        const active = location.pathname === item.path;
        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex', alignItems: 'center', gap: 11, padding: '10px 17px',
              cursor: 'pointer', whiteSpace: 'nowrap', position: 'relative',
              color: active ? 'var(--cyan)' : 'var(--txt3)',
              background: active ? 'rgba(0,217,255,.07)' : 'transparent',
              borderLeft: active ? '2px solid var(--cyan)' : '2px solid transparent',
              transition: 'all .25s',
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(0,217,255,.05)'; e.currentTarget.style.color = 'var(--cyan)'; }}}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--txt3)'; }}}
          >
            <span style={{
              fontSize: 18, flexShrink: 0, width: 22, textAlign: 'center',
              filter: active ? 'drop-shadow(0 0 5px var(--cyan))' : 'none',
            }}>
              {item.icon}
            </span>
            <span style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 600,
              letterSpacing: '.4px', pointerEvents: 'none',
            }}>
              {item.label}
            </span>
            <span style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: 9, fontWeight: 500,
              color: 'var(--txt3)', letterSpacing: '.3px', pointerEvents: 'none', marginLeft: 'auto',
            }}>
              {item.desc}
            </span>
          </div>
        );
      })}

      <div style={{ flex: 1 }} />
      <div style={{ height: 1, background: 'var(--bdr)', margin: '8px 10px' }} />

      {/* Admin link only for admin role */}
      {user?.role === 'admin' && (
        <div
          onClick={() => navigate('/admin')}
          style={{
            display: 'flex', alignItems: 'center', gap: 11, padding: '10px 17px',
            cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--txt3)',
          }}
        >
          <span style={{ fontSize: 18, flexShrink: 0, width: 22, textAlign: 'center' }}>🛡</span>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 600 }}>Admin Panel</span>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 9, fontWeight: 500, color: 'var(--txt3)', letterSpacing: '.3px', marginLeft: 'auto' }}>
            Special menu for admins
          </span>
        </div>
      )}
    </aside>
  );
}
