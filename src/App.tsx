import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { VehicleTrackingHub } from './components/VehicleTrackingHub';
import { ContractedAgencies } from './components/ContractedAgencies';
import { DocumentFolder } from './components/DocumentFolder';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { ShieldCheck, Truck, Anchor, MapPin, Globe } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'tracking' | 'agencies' | 'documents' | 'admin'>('tracking');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'tracking' && (
          <VehicleTrackingHub
            onOpenAgencyModal={() => setActiveTab('agencies')}
            onNavigateToDocs={() => setActiveTab('documents')}
          />
        )}

        {activeTab === 'agencies' && (
          <ContractedAgencies />
        )}

        {activeTab === 'documents' && (
          <DocumentFolder />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultRole={activeTab === 'admin' ? 'admin' : 'client'}
      />

      {/* Global SADC Logistics Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                  Z
                </div>
                <span className="text-lg font-black text-white tracking-wider">ZONE</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Dedicated vehicle transit and trans-corridor logistics platform managing vehicle shipments from neighboring ocean ports into Zambia.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Ocean Transit Corridors
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li className="flex items-center gap-1.5"><Anchor className="w-3 h-3 text-blue-400" /> Durban Port Corridor (South Africa)</li>
                <li className="flex items-center gap-1.5"><Anchor className="w-3 h-3 text-blue-400" /> Walvis Bay Corridor (Namibia)</li>
                <li className="flex items-center gap-1.5"><Anchor className="w-3 h-3 text-blue-400" /> Dar es Salaam Corridor (Tanzania)</li>
                <li className="flex items-center gap-1.5"><Anchor className="w-3 h-3 text-blue-400" /> Beira & Maputo Corridors (Mozambique)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Key Border Clearance Posts
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-emerald-400" /> Chirundu One-Stop Border Post</li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-emerald-400" /> Kazungula Bridge OSBP</li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-emerald-400" /> Nakonde Customs Border</li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-emerald-400" /> Victoria Falls & Mwami Borders</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Document & Compliance
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li>ZRA Customs Duty Assessment</li>
                <li>SARPCCO Interpol Certificate</li>
                <li>Bill of Lading Marine Clearance</li>
                <li>Transit Bond & Delivery Passes</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} ZONE Vehicle Delivery & Corridor Logistics. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ZRA & Border Systems Online
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
