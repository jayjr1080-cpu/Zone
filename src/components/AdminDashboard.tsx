import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleDocument, DocumentStatus, VehicleShipment, ContractedAgency, CorridorAlert } from '../types';
import {
  ShieldCheck,
  FileCheck,
  Truck,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Search,
  Layers,
  Radio,
  UserCheck,
  Save,
  Building2,
  Globe,
  Activity,
  FileText,
  DollarSign
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    documents,
    updateDocumentStatus,
    deleteDocument,
    addDocument,
    shipments,
    updateShipmentStatus,
    updateShipment,
    addShipment,
    agencies,
    addAgency,
    updateAgency,
    deleteAgency,
    alerts,
    addAlert,
    deleteAlert
  } = useApp();

  const [activeTab, setActiveTab] = useState<'docs' | 'shipments' | 'agencies' | 'alerts'>('docs');

  // Document Edit Modal State
  const [editingDoc, setEditingDoc] = useState<VehicleDocument | null>(null);
  const [docStatus, setDocStatus] = useState<DocumentStatus>('Verified');
  const [docNotes, setDocNotes] = useState('');

  // Add Document Modal State
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState<VehicleDocument['type']>('Bill of Lading');
  const [newDocVin, setNewDocVin] = useState('');
  const [newDocEmail, setNewDocEmail] = useState('mwamba@gmail.com');
  const [newDocNotes, setNewDocNotes] = useState('');

  // Shipment Edit Modal State
  const [editingShipment, setEditingShipment] = useState<VehicleShipment | null>(null);
  const [shipmentStatus, setShipmentStatus] = useState<VehicleShipment['status']>('En Route on Corridor');
  const [currentLocName, setCurrentLocName] = useState('');
  const [lat, setLat] = useState<number>(-18.0);
  const [lng, setLng] = useState<number>(26.0);
  const [etaDate, setEtaDate] = useState('');

  // Add Agency Modal State
  const [isAddAgencyOpen, setIsAddAgencyOpen] = useState(false);
  const [agencyName, setAgencyName] = useState('');
  const [agencyPhone, setAgencyPhone] = useState('');
  const [agencyEmail, setAgencyEmail] = useState('');
  const [agencyHq, setAgencyHq] = useState('');
  const [agencyRate, setAgencyRate] = useState(1400);
  const [agencyDays, setAgencyDays] = useState(4);
  const [agencyDesc, setAgencyDesc] = useState('');

  // Add Alert Modal State
  const [isAddAlertOpen, setIsAddAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertCorridor, setAlertCorridor] = useState('Durban & Beira Corridors');
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'info' | 'warning' | 'critical'>('warning');

  // Search filter
  const [searchDocTerm, setSearchDocTerm] = useState('');

  const filteredDocs = documents.filter(d =>
    d.title.toLowerCase().includes(searchDocTerm.toLowerCase()) ||
    d.vehicleVin.toLowerCase().includes(searchDocTerm.toLowerCase()) ||
    d.clientEmail.toLowerCase().includes(searchDocTerm.toLowerCase())
  );

  const handleSaveDocEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc) return;
    updateDocumentStatus(editingDoc.id, docStatus, docNotes);
    setEditingDoc(null);
  };

  const handleCreateDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle || !newDocVin) return;

    const matchedShipment = shipments.find(s => s.vin === newDocVin);

    addDocument({
      title: newDocTitle,
      type: newDocType,
      fileName: `${newDocTitle.replace(/\s+/g, '_')}_ADMIN.pdf`,
      fileSize: '1.8 MB',
      fileType: 'pdf',
      status: 'Approved',
      vehicleVin: newDocVin,
      vehicleName: matchedShipment ? `${matchedShipment.year} ${matchedShipment.make} ${matchedShipment.model}` : 'Vehicle Import',
      clientEmail: newDocEmail,
      downloadUrl: '#',
      notes: newDocNotes || 'Uploaded & Approved by Admin Command.',
      uploadedBy: 'Admin'
    });

    setNewDocTitle('');
    setNewDocNotes('');
    setIsAddDocOpen(false);
  };

  const handleSaveShipmentEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingShipment) return;

    updateShipmentStatus(editingShipment.id, shipmentStatus, currentLocName, [Number(lat), Number(lng)]);
    if (etaDate) {
      updateShipment(editingShipment.id, { etaDate });
    }
    setEditingShipment(null);
  };

  const handleCreateAgencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agencyName) return;

    addAgency({
      name: agencyName,
      logo: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=120&auto=format&fit=crop&q=80',
      rating: 4.8,
      reviewsCount: 1,
      phone: agencyPhone || '+260 211 000000',
      email: agencyEmail || 'info@agency.co.zm',
      headquarters: agencyHq || 'Lusaka, Zambia',
      supportedPorts: ['Durban Port (South Africa)', 'Walvis Bay Port (Namibia)'],
      serviceTypes: ['Multi-Vehicle Carrier', 'Flatbed Tow'],
      baseRateUSD: Number(agencyRate),
      avgTransitDays: Number(agencyDays),
      isVerified: true,
      totalDeliveriesCompleted: 10,
      insuranceCoverageUSD: 150000,
      description: agencyDesc || 'Contracted SADC auto-carrier line.',
      availableVehicles: 8
    });

    setAgencyName('');
    setAgencyPhone('');
    setAgencyDesc('');
    setIsAddAgencyOpen(false);
  };

  const handleCreateAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle || !alertMsg) return;

    addAlert({
      title: alertTitle,
      corridor: alertCorridor,
      message: alertMsg,
      severity: alertSeverity
    });

    setAlertTitle('');
    setAlertMsg('');
    setIsAddAlertOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-500/20 text-indigo-400 text-xs px-3 py-0.5 rounded-full font-bold uppercase tracking-wider border border-indigo-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                ZONE Master Command Control
              </span>
              <span className="text-xs text-slate-400">Admin Portal</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Regional Vehicle Corridor Admin Console
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Control client documents, update live vehicle GPS coordinates & status, manage contracted carriers, and broadcast corridor notices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700/80 px-4 py-2 rounded-xl text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Active System Shipments</div>
              <div className="text-lg font-black text-blue-400 font-mono">{shipments.length} Vehicles</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 px-4 py-2 rounded-xl text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Verified Documents</div>
              <div className="text-lg font-black text-emerald-400 font-mono">{documents.length} Docs</div>
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          {[
            { id: 'docs', label: 'Document Control Hub', icon: FileCheck },
            { id: 'shipments', label: 'Operations & Vehicle Tracker', icon: Truck },
            { id: 'agencies', label: 'Contracted Agencies Manager', icon: Building2 },
            { id: 'alerts', label: 'Corridor Notices & Alerts', icon: Radio }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: DOCUMENT CONTROL HUB */}
      {activeTab === 'docs' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchDocTerm}
                onChange={e => setSearchDocTerm(e.target.value)}
                placeholder="Search documents by Title, VIN, or Client Email..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={() => {
                if (shipments.length > 0) setNewDocVin(shipments[0].vin);
                setIsAddDocOpen(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-md"
            >
              <Plus className="w-4 h-4" />
              Upload & Attach Admin Document
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-4">Document Title & Type</th>
                  <th className="py-3 px-4">Vehicle VIN</th>
                  <th className="py-3 px-4">Client Account</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs text-slate-300">
                {filteredDocs.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div>{doc.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono font-normal mt-0.5">{doc.type} • {doc.fileSize}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400">{doc.vehicleVin}</td>
                    <td className="py-3.5 px-4 text-slate-300">{doc.clientEmail}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                        doc.status === 'Approved' || doc.status === 'Verified'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : doc.status === 'Requires Action'
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingDoc(doc);
                            setDocStatus(doc.status);
                            setDocNotes(doc.notes || '');
                          }}
                          className="p-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg transition-colors"
                          title="Edit Status / Notes"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="p-1.5 bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white rounded-lg transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: OPERATIONS & VEHICLE SHIPMENT MANAGER */}
      {activeTab === 'shipments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shipments.map(s => (
              <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                      {s.id}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {s.year} {s.make} {s.model}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">VIN: {s.vin}</div>
                  </div>

                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-2.5 py-1 rounded-lg">
                    {s.status}
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Current Position:</span>
                    <strong className="text-white">{s.currentLocationName}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300 font-mono">
                    <span>Coordinates:</span>
                    <strong className="text-emerald-400">[{s.currentCoordinates[0]}, {s.currentCoordinates[1]}]</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Assigned Agency:</span>
                    <strong className="text-blue-400">{s.assignedAgencyName || 'Unassigned'}</strong>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingShipment(s);
                      setShipmentStatus(s.status);
                      setCurrentLocName(s.currentLocationName);
                      setLat(s.currentCoordinates[0]);
                      setLng(s.currentCoordinates[1]);
                      setEtaDate(s.etaDate);
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Update Vehicle Coordinates & Stage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONTRACTED AGENCIES MANAGER */}
      {activeTab === 'agencies' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddAgencyOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add New Contracted Delivery Carrier
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agencies.map(agency => (
              <div key={agency.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={agency.logo} alt={agency.name} className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{agency.name}</h4>
                      <p className="text-xs text-slate-400">{agency.headquarters}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteAgency(agency.id)}
                    className="p-1.5 bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-colors"
                    title="Remove Agency"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs grid grid-cols-2 gap-2">
                  <div>Base Rate: <strong className="text-emerald-400">${agency.baseRateUSD}</strong></div>
                  <div>Avg Transit: <strong className="text-slate-200">{agency.avgTransitDays} Days</strong></div>
                  <div className="col-span-2">Contact: <strong className="text-slate-300">{agency.phone}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SITE NOTICES & CORRIDOR ALERTS MANAGER */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddAlertOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Publish Live Corridor Alert
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map(a => (
              <div key={a.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      a.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {a.severity}
                    </span>
                    <span className="text-xs font-bold text-white">{a.title}</span>
                    <span className="text-[10px] text-slate-500">({a.corridor})</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{a.message}</p>
                </div>

                <button
                  onClick={() => deleteAlert(a.id)}
                  className="p-1.5 bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-colors shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Edit Document Status */}
      {editingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Control Document Status & Clearance</h3>
              <button onClick={() => setEditingDoc(null)} className="font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveDocEdit} className="p-6 space-y-4 text-xs">
              <div>
                <span className="text-slate-400 font-bold block mb-1">Document Title</span>
                <div className="text-white font-bold text-sm bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  {editingDoc.title}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Status Action</label>
                <select
                  value={docStatus}
                  onChange={e => setDocStatus(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Pending Review">Pending Review</option>
                  <option value="Verified">Verified</option>
                  <option value="Approved">Approved</option>
                  <option value="Requires Action">Requires Action</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Admin Remarks / Notes</label>
                <textarea
                  rows={3}
                  value={docNotes}
                  onChange={e => setDocNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingDoc(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-950/50"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Admin Add Document */}
      {isAddDocOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Attach Admin Document to Vehicle</h3>
              <button onClick={() => setIsAddDocOpen(false)} className="font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateDocSubmit} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={e => setNewDocTitle(e.target.value)}
                  placeholder="e.g. Interpol Cleared Clearance Certificate"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={newDocType}
                  onChange={e => setNewDocType(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white focus:outline-none"
                >
                  <option value="Bill of Lading">Bill of Lading</option>
                  <option value="Customs Duty Clearance">Customs Duty Clearance</option>
                  <option value="Interpol Clearance Certificate">Interpol Clearance Certificate</option>
                  <option value="Vehicle Inspection Sheet">Vehicle Inspection Sheet</option>
                  <option value="Transit Bond Pass">Transit Bond Pass</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Vehicle VIN</label>
                <select
                  value={newDocVin}
                  onChange={e => setNewDocVin(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white font-mono"
                >
                  {shipments.map(s => (
                    <option key={s.id} value={s.vin}>{s.vin} - {s.make} {s.model}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Client Email</label>
                <input
                  type="email"
                  value={newDocEmail}
                  onChange={e => setNewDocEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddDocOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md">Upload & Approve</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Shipment Coordinates & Status */}
      {editingShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Update Vehicle GPS Coordinates & Stage</h3>
              <button onClick={() => setEditingShipment(null)} className="font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveShipmentEdit} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Transit Status Stage</label>
                <select
                  value={shipmentStatus}
                  onChange={e => setShipmentStatus(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                >
                  <option value="At Ocean Port">At Ocean Port</option>
                  <option value="Customs Clearance at Port">Customs Clearance at Port</option>
                  <option value="En Route on Corridor">En Route on Corridor</option>
                  <option value="At Inland Border Post">At Inland Border Post</option>
                  <option value="In Transit to Lusaka Hub">In Transit to Lusaka Hub</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Current Location Name</label>
                <input
                  type="text"
                  required
                  value={currentLocName}
                  onChange={e => setCurrentLocName(e.target.value)}
                  placeholder="e.g. Chirundu OSBP Clearance Yard"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={e => setLat(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={lng}
                    onChange={e => setLng(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Estimated Delivery Date</label>
                <input
                  type="date"
                  value={etaDate}
                  onChange={e => setEtaDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingShipment(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md">Update Map Position</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Contracted Agency */}
      {isAddAgencyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add Contracted Delivery Carrier</h3>
              <button onClick={() => setIsAddAgencyOpen(false)} className="font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateAgencySubmit} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Carrier Name</label>
                <input
                  type="text"
                  required
                  value={agencyName}
                  onChange={e => setAgencyName(e.target.value)}
                  placeholder="e.g. Copperbelt Express Auto-Haulers"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Base Rate (USD)</label>
                  <input
                    type="number"
                    value={agencyRate}
                    onChange={e => setAgencyRate(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Avg Transit Days</label>
                  <input
                    type="number"
                    value={agencyDays}
                    onChange={e => setAgencyDays(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Phone Contact</label>
                <input
                  type="text"
                  value={agencyPhone}
                  onChange={e => setAgencyPhone(e.target.value)}
                  placeholder="+260 97 111 2222"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={agencyDesc}
                  onChange={e => setAgencyDesc(e.target.value)}
                  placeholder="Specialized in Durban & Walvis Bay vehicle transport..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddAgencyOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md">Add Agency</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Corridor Alert */}
      {isAddAlertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Publish Corridor Alert Notice</h3>
              <button onClick={() => setIsAddAlertOpen(false)} className="font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateAlertSubmit} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  value={alertTitle}
                  onChange={e => setAlertTitle(e.target.value)}
                  placeholder="e.g. Nakonde Border OSBP Scanner Maintenance"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Affected Corridor</label>
                <input
                  type="text"
                  value={alertCorridor}
                  onChange={e => setAlertCorridor(e.target.value)}
                  placeholder="e.g. Dar es Salaam - Nakonde Route"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Message Detail</label>
                <textarea
                  rows={3}
                  required
                  value={alertMsg}
                  onChange={e => setAlertMsg(e.target.value)}
                  placeholder="Details for clients regarding delays or customs updates..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddAlertOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md">Broadcast Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
