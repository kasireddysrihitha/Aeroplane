// CO1: Component-based architecture — root App composition
// CO2: ES6 import/export throughout
// CO3: Functional components, JSX
// CO4: AuthProvider wraps entire app
// CO5: React Router with protected routes
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Flights from './pages/Flights';
// CO2: named imports from combined modules (keeps file count ≤ 10 component files)
import { Gates, Staff } from './pages/GatesStaff';
import { Weather, Analytics, Admin } from './pages/WeatherAnalyticsAdmin';

// CO5: Protected route — redirects to /login if no session
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// CO1: AppShell — shared layout wrapping Navbar + Sidebar + content
function AppShell({ children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', position:'relative', zIndex:1 }}>
      <Navbar />
      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        <Sidebar />
        <div style={{ flex:1, display:'flex', overflow:'hidden' }}>{children}</div>
      </div>
    </div>
  );
}

// Route map — CO2: array of objects for DRY route definitions
const PAGE_ROUTES = [
  { path:'/dashboard', el:<Dashboard /> },
  { path:'/flights',   el:<Flights />   },
  { path:'/gates',     el:<Gates />     },
  { path:'/staff',     el:<Staff />     },
  { path:'/weather',   el:<Weather />   },
  { path:'/analytics', el:<Analytics /> },
  { path:'/admin',     el:<Admin />     },
];

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {PAGE_ROUTES.map(({ path, el }) => (
        <Route key={path} path={path} element={
          <ProtectedRoute><AppShell>{el}</AppShell></ProtectedRoute>
        } />
      ))}
      <Route path="/"  element={<Navigate to="/dashboard" replace />} />
      <Route path="*"  element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

// CO4: AuthProvider at root — auth state flows to all pages via Context
export default function App() {
  return (
    <AuthProvider>
      <div className="bg-grid" />
      <div className="bg-glow" />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
