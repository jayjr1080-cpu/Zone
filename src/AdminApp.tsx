import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { AdminNavbar } from './components/AdminNavbar';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { ShieldCheck, Lock, Globe, FileText, MapPin } from 'lucide-react';

function AdminAppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Dedicated Admin Top Navigation */}
      <AdminNavbar
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AdminDashboard />
      </main>

      {/* Admin Authentication Portal Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultRole="admin"
      />

      {/* Admin Website Footer */}
      <footer className="bg-slate-950 border-t border-indigo-900/50 py-10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
                Z
              </div>
              <div>
                <span className="text-sm font-black text-white tracking-wider">ZONE Admin Command Portal</span>
                <p className="text-[11px] text-slate-400">
                  Control documents, update live vehicle coordinates, manage contracted delivery agencies, and broadcast corridor notices.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/"
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 text-[11px] font-bold px-3.5 py-2 rounded-xl border border-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                Go To Client Portal Website
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div className="flex items-center gap-2 text-slate-500">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Encrypted Admin Session • SADC Regional Vehicle Delivery Authority</span>
            </div>
            <div>
              &copy; {new Date().getFullYear()} ZONE Master Console. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function AdminApp() {
  return (
    <AppProvider>
      <AdminAppContent />
    </AppProvider>
  );
}
