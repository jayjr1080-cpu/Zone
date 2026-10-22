import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  User as UserIcon,
  LogOut,
  ExternalLink,
  Globe
} from 'lucide-react';

interface AdminNavbarProps {
  onOpenAuth: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  onOpenAuth
}) => {
  const { currentUser, logout } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-indigo-900/60 shadow-2xl">
      {/* Top Admin Warning / Security Bar */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-950 text-indigo-200 text-xs py-1.5 px-4 flex items-center justify-between border-b border-indigo-800/50">
        <div className="flex items-center gap-2">
          <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            ZONE Central Command
          </span>
          <span className="text-slate-300 font-medium">
            Admin Master Control Console for SADC Corridors & Client Documents
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[10px] text-indigo-300 font-mono">
          <span>Server: Operational</span>
          <span>•</span>
          <span>ZRA Customs Link: Active</span>
        </div>
      </div>

      {/* Main Admin Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* ZONE Admin Brand Logo */}
          <a href="/admin" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-950/50 group-hover:scale-105 transition-transform border border-indigo-400/40">
              Z
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-white tracking-wider">ZONE</span>
                <span className="text-[10px] bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 px-1.5 py-0.2 rounded font-mono uppercase font-bold">
                  ADMIN CONSOLE
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5 tracking-wide">
                Vehicle Control & Document Command
              </span>
            </div>
          </a>

          {/* Center Title / Portal Label */}
          <div className="hidden md:flex items-center gap-2 bg-indigo-950/50 border border-indigo-800/40 px-4 py-1.5 rounded-xl text-xs text-indigo-200">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>Managing Client Corridors, Documents & Hauler Carriers</span>
          </div>

          {/* Right Actions & Portal Navigation */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-blue-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-blue-500/40 transition-colors bg-slate-900"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Visit Client Website</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-slate-900 border border-indigo-800/60 p-1.5 pr-3 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/40 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-xs uppercase">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-200 leading-none">{currentUser.name}</div>
                  <div className="text-[10px] text-indigo-400 font-mono capitalize mt-0.5">{currentUser.role} Control</div>
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
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-950/50 flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                Admin Authentication
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
