import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LogOut, LayoutDashboard } from "lucide-react";
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Protected Route Component wrapper
const ProtectedRoute = ({ children }) => {
  const { session, loading } = useAuth();
  if (loading) return null; // Or a loading spinner
  if (!session) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 relative selection:bg-cyan-500/20 selection:text-cyan-600">
      
      {/* Premium Ambient Background Mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen opacity-75 dark:opacity-60 transition-opacity duration-500">
        <div className="absolute -top-[15%] -left-[10%] w-[65%] h-[65%] rounded-full bg-gradient-to-br from-cyan-500/40 to-teal-500/30 dark:from-cyan-600/40 dark:to-teal-900/35 blur-[120px] animate-pulse-glow" style={{ animationDuration: '9s' }}></div>
        <div className="absolute top-[20%] -right-[15%] w-[55%] h-[55%] rounded-full bg-gradient-to-bl from-teal-500/40 to-blue-600/30 dark:from-teal-600/40 dark:to-cyan-900/35 blur-[120px] animate-pulse-glow" style={{ animationDuration: '13s', animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[20%] left-[15%] w-[75%] h-[75%] rounded-full bg-gradient-to-tr from-emerald-500/30 to-cyan-600/40 dark:from-emerald-800/30 dark:to-teal-900/40 blur-[130px] animate-pulse-glow" style={{ animationDuration: '11s', animationDelay: '4s' }}></div>
      </div>

      {/* Navigation Bar */}
      {session && (
        <nav className="border-b border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl px-6 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-md shadow-slate-900/10 animate-fade-in">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full object-cover shadow-sm" />
            <p className="font-bold text-xl tracking-tight leading-none text-slate-900 dark:text-white">
              Pave<span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">Wise</span>
            </p>
          </div>
          
          <div className="flex gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-medium ${location.pathname === '/dashboard' ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-200/60 dark:border-cyan-800/60 shadow-sm' : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400'}`}
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-xl transition-all font-medium text-sm border border-rose-200/50 dark:border-rose-900/30 shadow-sm"
              title="Log Out"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <Routes>
          <Route path="/" element={session ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
