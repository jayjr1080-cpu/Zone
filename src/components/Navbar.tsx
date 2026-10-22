import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Truck,
  Folder,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Radio,
  AlertTriangle,
  Compass,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'tracking' | 'agencies' | 'documents' | 'admin';
  setActiveTab: (tab: 'tracking' | 'agencies' | 'documents' | 'admin') => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth
}) => {
  const { currentUser, logout, alerts } = useApp();
  const latestAlert = alerts.length > 0 ? alerts[0] : null;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-2xl">
      {/* Top Ticker Bar for Live Corridor Alerts */}
      {latestAlert && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-slate-200 text-xs py-1.5 px-4 flex items-center justify-between border-b border-indigo-800/40">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shrink-0 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Live Corridor Update
            </span>
            <span className="font-bold text-white shrink-0">{latestAlert.title}:</span>
            <span className="text-slate-300 truncate">{latestAlert.message}</span>
          </div>

          <span className="text-[10px] text-indigo-300 font-mono shrink-0 hidden sm:inline ml-4">
            SADC Logistics Watch • {latestAlert.datePosted}
          </span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* ZONE Brand Logo */}
          <div
            onClick={() => setActiveTab('tracking')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/40 group-hover:scale-105 transition-transform border border-blue-400/30">
              Z
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-white tracking-wider">ZONE</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.2 rounded font-mono uppercase">
                  SADC
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5 tracking-wide">
                Vehicle Delivery & Import Corridor
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 border border-slate-800/80 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'tracking'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4 text-blue-400" />
              Live Corridor Tracker
            </button>

            <button
              onClick={() => setActiveTab('agencies')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'agencies'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Truck className="w-4 h-4 text-emerald-400" />
              Contracted Agencies
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'documents'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Folder className="w-4 h-4 text-indigo-400" />
              Document Vault
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Admin Portal
            </button>
          </nav>

          {/* User Account Portal & Authentication */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 p-1.5 pr-3 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs uppercase">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-200 leading-none">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono capitalize mt-0.5">{currentUser.role} Account</div>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors ml-1"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-950/50 flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                Sign In / Portal Access
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('tracking')}
            className={`py-1 px-2 rounded font-bold ${activeTab === 'tracking' ? 'text-blue-400' : 'text-slate-400'}`}
          >
            Tracker
          </button>
          <button
            onClick={() => setActiveTab('agencies')}
            className={`py-1 px-2 rounded font-bold ${activeTab === 'agencies' ? 'text-blue-400' : 'text-slate-400'}`}
          >
            Agencies
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-1 px-2 rounded font-bold ${activeTab === 'documents' ? 'text-blue-400' : 'text-slate-400'}`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`py-1 px-2 rounded font-bold ${activeTab === 'admin' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            Admin Portal
          </button>
        </div>
      </div>
    </header>
  );
};
