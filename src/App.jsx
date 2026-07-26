import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Map, LogOut, LayoutDashboard, Settings as SettingsIcon } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200 relative">
      
      {/* Premium Ambient Background matching flood-analytics */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen opacity-70 dark:opacity-40 transition-opacity duration-500">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-emerald-400/30 dark:bg-emerald-600/30 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-teal-400/30 dark:bg-teal-600/30 blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[80%] h-[80%] rounded-full bg-emerald-300/30 dark:bg-emerald-800/30 blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
      </div>

      {/* Navigation Bar */}
      {session && (
        <nav className="border-b border-gray-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-xl shadow-inner">
              <Map className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="font-bold text-xl tracking-tight hidden sm:block">Muar<span className="text-emerald-600 dark:text-emerald-400">GIS</span></p>
          </div>
          
          <div className="flex gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${location.pathname === '/dashboard' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold shadow-sm' : 'hover:bg-white/50 dark:hover:bg-zinc-800/50 text-gray-600 dark:text-gray-400'}`}
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeSwitcher />
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition-all font-medium text-sm shadow-sm"
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
