import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ContractedAgency } from '../types';
import {
  Building2,
  Star,
  ShieldCheck,
  Truck,
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
  CheckCircle,
  ChevronRight,
  Filter,
  Award,
  ArrowUpRight
} from 'lucide-react';

export const ContractedAgencies: React.FC = () => {
  const { agencies, shipments, assignAgencyToShipment, currentUser } = useApp();
  const [selectedPort, setSelectedPort] = useState<string>('all');
  const [selectedAgencyForAssign, setSelectedAgencyForAssign] = useState<ContractedAgency | null>(null);
  const [targetShipmentId, setTargetShipmentId] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const userShipments = currentUser?.role === 'admin'
    ? shipments
    : shipments.filter(s => s.clientEmail.toLowerCase() === currentUser?.email.toLowerCase());

  const filteredAgencies = agencies.filter(agency => {
    if (selectedPort === 'all') return true;
    return agency.supportedPorts.some(port => port.toLowerCase().includes(selectedPort.toLowerCase()));
  });

  const handleConfirmAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgencyForAssign || !targetShipmentId) return;

    assignAgencyToShipment(targetShipmentId, selectedAgencyForAssign.id);
    const shipment = userShipments.find(s => s.id === targetShipmentId);
    setSuccessMsg(`Successfully contracted ${selectedAgencyForAssign.name} for vehicle ${shipment?.make} ${shipment?.model} (${shipment?.id})!`);

    setTimeout(() => {
      setSuccessMsg('');
      setSelectedAgencyForAssign(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-indigo-500/30">
              Contracted Delivery Agencies
            </span>
            <span className="text-xs text-slate-400">Vetted SADC Auto-Haulers</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Select Your Regional Vehicle Delivery Carrier
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Choose accredited trans-corridor transport companies to haul your ocean-port vehicles across borders directly into Zambia.
          </p>
        </div>

        {/* Filter bar by Ocean Port */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            Filter Port Corridor:
          </span>
          {[
            { id: 'all', label: 'All SADC Corridors' },
            { id: 'Durban', label: 'Durban Port (South Africa)' },
            { id: 'Walvis Bay', label: 'Walvis Bay (Namibia)' },
            { id: 'Dar es Salaam', label: 'Dar es Salaam (Tanzania)' },
            { id: 'Beira', label: 'Beira (Mozambique)' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPort(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedPort === p.id
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-5 h-5 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Agencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAgencies.map(agency => (
          <div
            key={agency.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Agency Title & Verified Badge */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={agency.logo}
                    alt={agency.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-700 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {agency.name}
                      </h3>
                      {agency.isVerified && (
                        <span title="Accredited SADC Carrier">
                          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {agency.rating}
                      </div>
                      <span>({agency.reviewsCount} reviews)</span>
                      <span>•</span>
                      <span className="text-slate-300">{agency.totalDeliveriesCompleted}+ deliveries</span>
                    </div>
                  </div>
                </div>

                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-lg">
                  ${agency.baseRateUSD} Est.
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                {agency.description}
              </p>

              {/* Key Details Grid */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-slate-500 block">Avg. Transit Time</span>
                  <span className="text-slate-200 font-medium flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    {agency.avgTransitDays} Days to Zambia
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase text-slate-500 block">Cargo Insurance</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    Up to ${agency.insuranceCoverageUSD.toLocaleString()}
                  </span>
                </div>

                <div className="col-span-2 pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">Supported Ocean Ports</span>
                  <div className="flex flex-wrap gap-1">
                    {agency.supportedPorts.map((port, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700 font-mono"
                      >
                        {port}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Carrier Transport Types */}
              <div className="flex flex-wrap items-center gap-1.5 mb-5">
                {agency.serviceTypes.map((st, idx) => (
                  <span key={idx} className="bg-blue-950/60 border border-blue-800/60 text-blue-300 text-[10px] font-medium px-2.5 py-1 rounded-md">
                    🚚 {st}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{agency.phone}</span>
              </div>

              <button
                onClick={() => {
                  setSelectedAgencyForAssign(agency);
                  if (userShipments.length > 0) {
                    setTargetShipmentId(userShipments[0].id);
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                Assign Agent to My Vehicle
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Assigning Agency to a Vehicle */}
      {selectedAgencyForAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                <h3 className="font-bold text-base">Contract Delivery Carrier</h3>
              </div>
              <button
                onClick={() => setSelectedAgencyForAssign(null)}
                className="text-blue-200 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmAssignment} className="p-6 space-y-4">
              <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl flex items-center gap-3">
                <img
                  src={selectedAgencyForAssign.logo}
                  alt={selectedAgencyForAssign.name}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-600"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">{selectedAgencyForAssign.name}</h4>
                  <p className="text-xs text-slate-400">Rate: ${selectedAgencyForAssign.baseRateUSD} Est.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Select Your Vehicle Shipment
                </label>
                {userShipments.length > 0 ? (
                  <select
                    value={targetShipmentId}
                    onChange={e => setTargetShipmentId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {userShipments.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.id} - {s.year} {s.make} {s.model} ({s.originPort})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-amber-400 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    No active vehicle shipments registered under your account yet.
                  </p>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAgencyForAssign(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={userShipments.length === 0}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-xs font-bold text-white rounded-xl shadow-lg shadow-blue-900/40"
                >
                  Confirm Contract & Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
