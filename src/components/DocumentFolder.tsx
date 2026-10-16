import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleDocument, DocumentType } from '../types';
import {
  Folder,
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Upload,
  Filter,
  FileCheck,
  ShieldCheck,
  X,
  FileCode,
  Calendar,
  Lock
} from 'lucide-react';

export const DocumentFolder: React.FC = () => {
  const { documents, currentUser, shipments, addDocument } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewingDoc, setViewingDoc] = useState<VehicleDocument | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<DocumentType>('Bill of Lading');
  const [vehicleVin, setVehicleVin] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Filter documents for logged-in user or all for admin
  const userDocs = currentUser?.role === 'admin'
    ? documents
    : documents.filter(d => d.clientEmail.toLowerCase() === currentUser?.email.toLowerCase());

  const userShipments = currentUser?.role === 'admin'
    ? shipments
    : shipments.filter(s => s.clientEmail.toLowerCase() === currentUser?.email.toLowerCase());

  const filteredDocs = userDocs.filter(d => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.vehicleVin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.vehicleName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || d.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !vehicleVin) return;

    const matchedShipment = shipments.find(s => s.vin === vehicleVin);

    addDocument({
      title,
      type,
      fileName: uploadedFileName || `${title.replace(/\s+/g, '_')}.pdf`,
      fileSize: '1.5 MB',
      fileType: 'pdf',
      status: 'Pending Review',
      vehicleVin,
      vehicleName: matchedShipment ? `${matchedShipment.year} ${matchedShipment.make} ${matchedShipment.model}` : 'Import Vehicle',
      clientEmail: currentUser?.email || 'mwamba@gmail.com',
      downloadUrl: '#',
      notes: notes || 'Uploaded by client for border clearance.',
      uploadedBy: 'Client'
    });

    setTitle('');
    setNotes('');
    setUploadedFileName('');
    setIsUploadOpen(false);
  };

  const handleSimulatedDownload = (doc: VehicleDocument) => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `ZONE TRANS-CORRIDOR LOGISTICS - OFFICIAL DOCUMENT\n\n` +
        `Document Title: ${doc.title}\n` +
        `Type: ${doc.type}\n` +
        `Vehicle VIN: ${doc.vehicleVin}\n` +
        `Vehicle Name: ${doc.vehicleName}\n` +
        `Status: ${doc.status}\n` +
        `Upload Date: ${doc.uploadDate}\n` +
        `Uploaded By: ${doc.uploadedBy}\n` +
        `Notes: ${doc.notes || 'N/A'}\n\n` +
        `Verified by ZONE Customs & Corridor Command.`
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = doc.fileName.replace(/\.pdf$/, '.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-blue-500/30">
                Client Document Folder
              </span>
              <span className="text-xs text-slate-400">Import & Clearance Vault</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Vehicle Import & Transit Documentation
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Access and manage Bills of Lading, ZRA Customs Duty clearances, SARPCCO Interpol certificates, and delivery passes.
            </p>
          </div>

          <button
            onClick={() => {
              if (userShipments.length > 0) {
                setVehicleVin(userShipments[0].vin);
              }
              setIsUploadOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2 shrink-0"
          >
            <Upload className="w-4 h-4" />
            Upload Document for Review
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search documents by VIN, title, vehicle model or file name..."
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl py-2.5 px-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Document Categories</option>
              <option value="Bill of Lading">Bill of Lading</option>
              <option value="Customs Duty Clearance">Customs Duty Clearance</option>
              <option value="Interpol Clearance Certificate">Interpol Certificate</option>
              <option value="Vehicle Inspection Sheet">Inspection Sheet</option>
              <option value="Transit Bond Pass">Transit Bond Pass</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Document Vault ({filteredDocs.length} items)
            </h3>
          </div>
        </div>

        {filteredDocs.length > 0 ? (
          <div className="divide-y divide-slate-800/80">
            {filteredDocs.map(doc => {
              let statusBadge = (
                <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md">
                  <Clock className="w-3 h-3" />
                  {doc.status}
                </span>
              );

              if (doc.status === 'Approved' || doc.status === 'Verified') {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3" />
                    {doc.status}
                  </span>
                );
              } else if (doc.status === 'Requires Action') {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-md">
                    <AlertTriangle className="w-3 h-3" />
                    Action Required
                  </span>
                );
              }

              return (
                <div
                  key={doc.id}
                  className="p-4 hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-3 bg-blue-950/80 border border-blue-800/60 rounded-xl text-blue-400 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-white truncate">{doc.title}</h4>
                        <span className="bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                          {doc.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-slate-300">VIN: {doc.vehicleVin}</span>
                        <span>•</span>
                        <span>{doc.vehicleName}</span>
                        <span>•</span>
                        <span className="text-slate-500">{doc.fileSize}</span>
                        <span>•</span>
                        <span className="text-slate-500">Uploaded {doc.uploadDate}</span>
                      </div>
                      {doc.notes && (
                        <p className="text-[11px] text-slate-400 mt-1 bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                          <span className="text-slate-300 font-semibold">Note:</span> {doc.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                    {statusBadge}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewingDoc(doc)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
                        title="View Document Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleSimulatedDownload(doc)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            <Folder className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-sm">No documentation found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Viewing Document Details Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="bg-slate-800 p-5 border-b border-slate-700 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm">Document Vault Inspection</h3>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-base font-bold text-white">{viewingDoc.title}</div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Category: <strong className="text-slate-200">{viewingDoc.type}</strong></span>
                  <span>Size: <strong className="text-slate-200">{viewingDoc.fileSize}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Vehicle VIN</span>
                  <span className="font-mono text-xs font-bold text-blue-400">{viewingDoc.vehicleVin}</span>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Verification Status</span>
                  <span className="font-bold text-emerald-400">{viewingDoc.status}</span>
                </div>
              </div>

              <div className="bg-slate-800/30 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
                <div className="font-bold text-slate-200">Notes & Clearance Verification</div>
                <p className="text-slate-400 leading-relaxed">{viewingDoc.notes || 'No remarks added.'}</p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setViewingDoc(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={() => handleSimulatedDownload(viewingDoc)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-900/40"
                >
                  <Download className="w-4 h-4" />
                  Download Certified Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-blue-600 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                <h3 className="font-bold text-base">Upload Document for Verification</h3>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-blue-200 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Proof of Customs Tax Payment"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Document Type</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Bill of Lading">Bill of Lading</option>
                  <option value="Customs Duty Clearance">Customs Duty Clearance</option>
                  <option value="Interpol Clearance Certificate">Interpol Clearance Certificate</option>
                  <option value="Vehicle Inspection Sheet">Vehicle Inspection Sheet</option>
                  <option value="Transit Bond Pass">Transit Bond Pass</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Target Vehicle (VIN)</label>
                {userShipments.length > 0 ? (
                  <select
                    value={vehicleVin}
                    onChange={e => setVehicleVin(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  >
                    {userShipments.map(s => (
                      <option key={s.id} value={s.vin}>
                        {s.vin} - {s.year} {s.make} {s.model}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    value={vehicleVin}
                    onChange={e => setVehicleVin(e.target.value)}
                    placeholder="Enter VIN Number"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">File Attachment</label>
                <input
                  type="file"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedFileName(e.target.files[0].name);
                    }
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-300 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Additional Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Provide context or clearance reference numbers..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-blue-900/40"
                >
                  Upload & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
