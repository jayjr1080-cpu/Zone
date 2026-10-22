import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CorridorMap } from './CorridorMap';
import {
  Search,
  Truck,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ShieldCheck,
  ExternalLink,
  Phone,
  ChevronRight,
  Compass,
  Building2,
  Package,
  Plus
} from 'lucide-react';

interface VehicleTrackingHubProps {
  onOpenAgencyModal: () => void;
  onNavigateToDocs: () => void;
}

export const VehicleTrackingHub: React.FC<VehicleTrackingHubProps> = ({
  onOpenAgencyModal,
  onNavigateToDocs
}) => {
  const { shipments, activeShipmentId, setActiveShipmentId, currentUser, addShipment } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPort, setFilterPort] = useState<string>('all');
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);

  // New vehicle form state for clients
  const [newVin, setNewVin] = useState('');
  const [newMake, setNewMake] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newYear, setNewYear] = useState(2022);
  const [newColor, setNewColor] = useState('Silver');
  const [newPort, setNewPort] = useState<'Durban Port (South Africa)' | 'Walvis Bay Port (Namibia)' | 'Dar es Salaam Port (Tanzania)' | 'Maputo Port (Mozambique)' | 'Beira Port (Mozambique)'>('Durban Port (South Africa)');
  const [newHub, setNewHub] = useState<'Lusaka Main Logistics Hub' | 'Ndola Commercial Depot' | 'Kitwe Transit Yard' | 'Livingstone Border Base'>('Lusaka Main Logistics Hub');

  // Filter shipments based on current logged in client or admin
  const userShipments = currentUser?.role === 'admin'
    ? shipments
    : shipments.filter(s => s.clientEmail.toLowerCase() === currentUser?.email.toLowerCase());

  const filteredShipments = userShipments.filter(s => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.clientName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPort = filterPort === 'all' || s.originPort.includes(filterPort);
    return matchesSearch && matchesPort;
  });

  const selectedShipment = userShipments.find(s => s.id === activeShipmentId) || userShipments[0] || null;

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVin || !newMake || !newModel) return;

    let corridorName: 'Durban - Beitbridge - Lusaka' | 'Walvis Bay - Katima Mulilo - Kazungula' | 'Dar es Salaam - Nakonde - Lusaka' | 'Beira - Forbes - Chirundu - Lusaka' = 'Durban - Beitbridge - Lusaka';
    let waypoints: [number, number][] = [[-29.8587, 31.0218], [-22.2162, 29.9863], [-15.3875, 28.3228]];
    let currentCoords: [number, number] = [-29.8587, 31.0218];

    if (newPort.includes('Walvis Bay')) {
      corridorName = 'Walvis Bay - Katima Mulilo - Kazungula';
      waypoints = [[-22.9575, 14.5053], [-17.7923, 25.2631], [-15.3875, 28.3228]];
      currentCoords = [-22.9575, 14.5053];
    } else if (newPort.includes('Dar es Salaam')) {
      corridorName = 'Dar es Salaam - Nakonde - Lusaka';
      waypoints = [[-6.7924, 39.2083], [-9.3400, 32.7560], [-15.3875, 28.3228]];
      currentCoords = [-6.7924, 39.2083];
    } else if (newPort.includes('Beira')) {
      corridorName = 'Beira - Forbes - Chirundu - Lusaka';
      waypoints = [[-19.8436, 34.8389], [-16.0389, 28.8508], [-15.3875, 28.3228]];
      currentCoords = [-19.8436, 34.8389];
    }

    addShipment({
      vin: newVin.toUpperCase(),
      make: newMake,
      model: newModel,
      year: Number(newYear),
      color: newColor,
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=80',
      clientEmail: currentUser?.email || 'mwamba@gmail.com',
      clientName: currentUser?.name || 'Mwamba Chanda',
      clientPhone: currentUser?.phone || '+260 97 712 3456',
      originPort: newPort,
      destinationHub: newHub,
      corridorName: corridorName,
      status: 'At Ocean Port',
      currentLocationName: `${newPort} Terminal Gate`,
      currentCoordinates: currentCoords,
      routeWaypoints: waypoints,
      etaDate: '2025-02-25',
      transitCostUSD: 1400,
      milestones: [
        { stage: 'Port Discharge', location: newPort, timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16), completed: true, description: 'Vehicle offloaded from container ship.' },
        { stage: 'Customs Verification', location: newPort, timestamp: 'Pending', completed: false },
        { stage: 'Transit Dispatch', location: 'Corridor Highway', timestamp: 'Pending', completed: false }
      ]
    });

    setNewVin('');
    setNewMake('');
    setNewModel('');
    setIsAddVehicleOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Search Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-blue-500/30">
                SADC Vehicle Corridor
              </span>
              <span className="text-xs text-slate-400">Live GPS Tracking</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Vehicle Transit & Corridor Tracker
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Track shipments arriving by ocean ports in South Africa, Namibia, Tanzania & Mozambique into Zambia.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddVehicleOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Register Imported Vehicle
            </button>
          </div>
        </div>

        {/* Search & Filter bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by VIN, Shipment ID, Vehicle Make or Client..."
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={filterPort}
              onChange={e => setFilterPort(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl py-2.5 px-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Ocean Ports</option>
              <option value="Durban">Durban Port (South Africa)</option>
              <option value="Walvis Bay">Walvis Bay Port (Namibia)</option>
              <option value="Dar es Salaam">Dar es Salaam Port (Tanzania)</option>
              <option value="Beira">Beira Port (Mozambique)</option>
            </select>
          </div>

          <div className="flex items-center justify-end text-xs text-slate-400 font-medium px-2">
            Showing <span className="text-white font-bold mx-1">{filteredShipments.length}</span> active vehicle(s)
          </div>
        </div>
      </div>

      {/* Main Grid: Corridor Interactive Map + Selected Vehicle Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <CorridorMap
            shipments={filteredShipments}
            selectedShipmentId={selectedShipment?.id || null}
            onSelectShipment={(id) => setActiveShipmentId(id)}
          />

          {/* Quick List of User's Vehicles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Your Registered Shipments</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                {userShipments.length} Total
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userShipments.map(s => {
                const isSelected = s.id === selectedShipment?.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveShipmentId(s.id)}
                    className={`text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-blue-600/10 border-blue-500/50 text-white shadow-md'
                        : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <img
                      src={s.imageUrl}
                      alt={s.make}
                      className="w-12 h-12 object-cover rounded-lg border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold truncate">{s.year} {s.make} {s.model}</span>
                        <span className="text-[10px] font-mono text-blue-400 font-semibold">{s.id}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{s.originPort}</div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span className="text-[10px] font-medium text-emerald-400 truncate">{s.status}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Vehicle Details & Corridor Stage Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedShipment ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5">
              {/* Vehicle Title & Badge */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-800">
                      {selectedShipment.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">VIN: {selectedShipment.vin}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedShipment.year} {selectedShipment.make} {selectedShipment.model}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Color: <span className="text-slate-200">{selectedShipment.color}</span> • Client: <span className="text-slate-200">{selectedShipment.clientName}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedShipment.status}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-1">Updated {selectedShipment.lastUpdated}</div>
                </div>
              </div>

              {/* Corridor Logistics Summary Box */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Origin Ocean Port</span>
                    <span className="text-slate-200 font-medium flex items-center gap-1 mt-0.5">
                      <AnchorIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      {selectedShipment.originPort}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Zambia Destination</span>
                    <span className="text-slate-200 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {selectedShipment.destinationHub}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Transit Corridor</span>
                    <span className="text-slate-300 font-medium">{selectedShipment.corridorName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Estimated Delivery</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      {selectedShipment.etaDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Assigned Contracted Delivery Agency */}
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-blue-400" />
                    Contracted Delivery Agency
                  </span>

                  <button
                    onClick={onOpenAgencyModal}
                    className="text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    {selectedShipment.assignedAgencyId ? 'Change Agency' : 'Choose Agency'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {selectedShipment.assignedAgencyName ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{selectedShipment.assignedAgencyName}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Phone className="w-3 h-3 text-slate-500" />
                          {selectedShipment.assignedAgencyPhone || '+27 31 400 9012'}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-400 font-mono font-semibold">USD ${selectedShipment.transitCostUSD}</span>
                      </div>
                    </div>
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2 py-1 rounded">
                      Verified Carrier
                    </span>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300 flex items-center justify-between">
                    <span>No delivery agency contracted yet for this vehicle shipment.</span>
                    <button
                      onClick={onOpenAgencyModal}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded text-[11px] shrink-0"
                    >
                      Select Agent
                    </button>
                  </div>
                )}
              </div>

              {/* Documents Quick Vault Access */}
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Client Document Vault</div>
                    <div className="text-[11px] text-slate-400">
                      {selectedShipment.documents.length} document(s) uploaded for this vehicle
                    </div>
                  </div>
                </div>

                <button
                  onClick={onNavigateToDocs}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  View Folder
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Transit Milestone Progress Timeline */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  Corridor Milestone Progress
                </h3>

                <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                  {selectedShipment.milestones.map((m, idx) => (
                    <div key={idx} className="relative flex items-start gap-3 pl-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 border ${
                        m.completed
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                          : 'bg-slate-900 text-slate-500 border-slate-700'
                      }`}>
                        {m.completed ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-mono">{idx + 1}</span>}
                      </div>

                      <div className="min-w-0 flex-1 bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 text-xs">
                        <div className="flex items-center justify-between font-bold">
                          <span className={m.completed ? 'text-white' : 'text-slate-400'}>{m.stage}</span>
                          <span className="text-[10px] font-mono text-slate-500">{m.timestamp}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          {m.location}
                        </div>
                        {m.description && (
                          <div className="text-[10px] text-slate-500 mt-1 pt-1 border-t border-slate-900">
                            {m.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
              <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-sm">No shipment selected or registered under this account.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Registering a New Vehicle Import */}
      {isAddVehicleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="bg-blue-600 p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Register New Imported Vehicle</h3>
                <p className="text-xs text-blue-100">Add vehicle details arriving via ocean port</p>
              </div>
              <button
                onClick={() => setIsAddVehicleOpen(false)}
                className="text-blue-200 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">VIN Number / Chassis</label>
                  <input
                    type="text"
                    required
                    value={newVin}
                    onChange={e => setNewVin(e.target.value)}
                    placeholder="e.g. JN1AZ4EH8DM9901"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Make</label>
                  <input
                    type="text"
                    required
                    value={newMake}
                    onChange={e => setNewMake(e.target.value)}
                    placeholder="e.g. Toyota"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Model Name</label>
                  <input
                    type="text"
                    required
                    value={newModel}
                    onChange={e => setNewModel(e.target.value)}
                    placeholder="e.g. Hilux Revo / RAV4"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Year</label>
                  <input
                    type="number"
                    required
                    value={newYear}
                    onChange={e => setNewYear(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Origin Ocean Port</label>
                <select
                  value={newPort}
                  onChange={e => setNewPort(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Durban Port (South Africa)">Durban Port (South Africa)</option>
                  <option value="Walvis Bay Port (Namibia)">Walvis Bay Port (Namibia)</option>
                  <option value="Dar es Salaam Port (Tanzania)">Dar es Salaam Port (Tanzania)</option>
                  <option value="Beira Port (Mozambique)">Beira Port (Mozambique)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Zambia Destination Depot</label>
                <select
                  value={newHub}
                  onChange={e => setNewHub(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Lusaka Main Logistics Hub">Lusaka Main Logistics Hub</option>
                  <option value="Ndola Commercial Depot">Ndola Commercial Depot</option>
                  <option value="Kitwe Transit Yard">Kitwe Transit Yard</option>
                  <option value="Livingstone Border Base">Livingstone Border Base</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddVehicleOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-blue-900/40"
                >
                  Save & Start Tracking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

function AnchorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="8" x2="12" y2="22" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </svg>
  );
}
