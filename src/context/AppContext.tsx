import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ContractedAgency, VehicleShipment, VehicleDocument, CorridorAlert } from '../types';
import { INITIAL_USERS, INITIAL_AGENCIES, INITIAL_SHIPMENTS, INITIAL_DOCUMENTS, INITIAL_ALERTS } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  agencies: ContractedAgency[];
  shipments: VehicleShipment[];
  documents: VehicleDocument[];
  alerts: CorridorAlert[];

  // Auth methods
  login: (email: string, role: 'client' | 'admin') => boolean;
  register: (name: string, email: string, phone: string, company: string) => void;
  logout: () => void;

  // Agency methods
  assignAgencyToShipment: (shipmentId: string, agencyId: string) => void;
  addAgency: (agency: Omit<ContractedAgency, 'id'>) => void;
  updateAgency: (id: string, agencyData: Partial<ContractedAgency>) => void;
  deleteAgency: (id: string) => void;

  // Document methods
  addDocument: (doc: Omit<VehicleDocument, 'id' | 'uploadDate'>) => void;
  updateDocumentStatus: (id: string, status: VehicleDocument['status'], notes?: string) => void;
  deleteDocument: (id: string) => void;

  // Shipment methods
  addShipment: (shipment: Omit<VehicleShipment, 'id' | 'documents' | 'lastUpdated'>) => void;
  updateShipmentStatus: (
    id: string,
    status: VehicleShipment['status'],
    locationName: string,
    coords?: [number, number]
  ) => void;
  updateShipment: (id: string, data: Partial<VehicleShipment>) => void;

  // Alert methods
  addAlert: (alert: Omit<CorridorAlert, 'id' | 'datePosted'>) => void;
  deleteAlert: (id: string) => void;

  // Helper
  activeShipmentId: string | null;
  setActiveShipmentId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state or localStorage
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('zone_currentUser');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default logged in as Mwamba Chanda
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('zone_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [agencies, setAgencies] = useState<ContractedAgency[]>(() => {
    const saved = localStorage.getItem('zone_agencies');
    return saved ? JSON.parse(saved) : INITIAL_AGENCIES;
  });

  const [documents, setDocuments] = useState<VehicleDocument[]>(() => {
    const saved = localStorage.getItem('zone_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [shipments, setShipments] = useState<VehicleShipment[]>(() => {
    const saved = localStorage.getItem('zone_shipments');
    return saved ? JSON.parse(saved) : INITIAL_SHIPMENTS;
  });

  const [alerts, setAlerts] = useState<CorridorAlert[]>(() => {
    const saved = localStorage.getItem('zone_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [activeShipmentId, setActiveShipmentId] = useState<string | null>(INITIAL_SHIPMENTS[0].id);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('zone_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('zone_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('zone_agencies', JSON.stringify(agencies));
  }, [agencies]);

  useEffect(() => {
    localStorage.setItem('zone_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('zone_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('zone_alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Auth implementation
  const login = (email: string, role: 'client' | 'admin'): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (found) {
      setCurrentUser(found);
      return true;
    }
    // Auto-create or switch demo user if matching role
    if (email.trim().length > 0) {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: role,
        phone: '+260 97 000 0000',
        company: role === 'admin' ? 'ZONE Regional Admin' : 'Client Representative'
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, phone: string, company: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'client',
      phone,
      company
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Agency methods
  const assignAgencyToShipment = (shipmentId: string, agencyId: string) => {
    const agency = agencies.find(a => a.id === agencyId);
    if (!agency) return;

    setShipments(prev => prev.map(s => {
      if (s.id === shipmentId) {
        return {
          ...s,
          assignedAgencyId: agency.id,
          assignedAgencyName: agency.name,
          assignedAgencyPhone: agency.phone,
          transitCostUSD: agency.baseRateUSD,
          lastUpdated: 'Just now'
        };
      }
      return s;
    }));
  };

  const addAgency = (agencyData: Omit<ContractedAgency, 'id'>) => {
    const newAgency: ContractedAgency = {
      ...agencyData,
      id: `agency-${Date.now()}`
    };
    setAgencies(prev => [...prev, newAgency]);
  };

  const updateAgency = (id: string, agencyData: Partial<ContractedAgency>) => {
    setAgencies(prev => prev.map(a => a.id === id ? { ...a, ...agencyData } : a));
  };

  const deleteAgency = (id: string) => {
    setAgencies(prev => prev.filter(a => a.id !== id));
  };

  // Document methods
  const addDocument = (docData: Omit<VehicleDocument, 'id' | 'uploadDate'>) => {
    const newDoc: VehicleDocument = {
      ...docData,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setDocuments(prev => [newDoc, ...prev]);

    // Also attach to shipment if vin matches
    setShipments(prev => prev.map(s => {
      if (s.vin === docData.vehicleVin) {
        return {
          ...s,
          documents: [newDoc, ...s.documents]
        };
      }
      return s;
    }));
  };

  const updateDocumentStatus = (id: string, status: VehicleDocument['status'], notes?: string) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === id) {
        return { ...d, status, notes: notes || d.notes };
      }
      return d;
    }));

    // Update inside shipments as well
    setShipments(prev => prev.map(s => ({
      ...s,
      documents: s.documents.map(d => d.id === id ? { ...d, status, notes: notes || d.notes } : d)
    })));
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    setShipments(prev => prev.map(s => ({
      ...s,
      documents: s.documents.filter(d => d.id !== id)
    })));
  };

  // Shipment methods
  const addShipment = (data: Omit<VehicleShipment, 'id' | 'documents' | 'lastUpdated'>) => {
    const newId = `ZON-${Math.floor(10000 + Math.random() * 90000)}`;
    const newShipment: VehicleShipment = {
      ...data,
      id: newId,
      documents: documents.filter(d => d.vehicleVin === data.vin),
      lastUpdated: 'Just now'
    };
    setShipments(prev => [newShipment, ...prev]);
    setActiveShipmentId(newId);
  };

  const updateShipmentStatus = (
    id: string,
    status: VehicleShipment['status'],
    locationName: string,
    coords?: [number, number]
  ) => {
    setShipments(prev => prev.map(s => {
      if (s.id === id) {
        const updatedMilestones = s.milestones.map(m => {
          if (m.stage.toLowerCase().includes(status.toLowerCase().slice(0, 5))) {
            return { ...m, completed: true, timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) };
          }
          return m;
        });

        return {
          ...s,
          status,
          currentLocationName: locationName,
          currentCoordinates: coords || s.currentCoordinates,
          milestones: updatedMilestones,
          lastUpdated: 'Just now'
        };
      }
      return s;
    }));
  };

  const updateShipment = (id: string, data: Partial<VehicleShipment>) => {
    setShipments(prev => prev.map(s => s.id === id ? { ...s, ...data, lastUpdated: 'Just now' } : s));
  };

  // Alert methods
  const addAlert = (alertData: Omit<CorridorAlert, 'id' | 'datePosted'>) => {
    const newAlert: CorridorAlert = {
      ...alertData,
      id: `alt-${Date.now()}`,
      datePosted: new Date().toISOString().split('T')[0]
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        agencies,
        shipments,
        documents,
        alerts,
        login,
        register,
        logout,
        assignAgencyToShipment,
        addAgency,
        updateAgency,
        deleteAgency,
        addDocument,
        updateDocumentStatus,
        deleteDocument,
        addShipment,
        updateShipmentStatus,
        updateShipment,
        addAlert,
        deleteAlert,
        activeShipmentId,
        setActiveShipmentId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
