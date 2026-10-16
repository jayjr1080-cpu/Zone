export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  company?: string;
  avatarUrl?: string;
}

export type DocumentType =
  | 'Bill of Lading'
  | 'Customs Duty Clearance'
  | 'Interpol Clearance Certificate'
  | 'Vehicle Inspection Sheet'
  | 'Port Release Authorization'
  | 'Transit Bond Pass'
  | 'Final Delivery Note';

export type DocumentStatus = 'Pending Review' | 'Verified' | 'Approved' | 'Requires Action';

export interface VehicleDocument {
  id: string;
  title: string;
  type: DocumentType;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'doc' | 'image';
  uploadDate: string;
  status: DocumentStatus;
  vehicleVin: string;
  vehicleName: string;
  clientEmail: string;
  downloadUrl: string;
  notes?: string;
  uploadedBy: 'Admin' | 'Client' | 'Agency';
}

export interface ContractedAgency {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  email: string;
  headquarters: string;
  supportedPorts: string[];
  serviceTypes: ('Multi-Vehicle Carrier' | 'Flatbed Tow' | 'Escorted Drive' | 'Enclosed Transport')[];
  baseRateUSD: number;
  avgTransitDays: number;
  isVerified: boolean;
  totalDeliveriesCompleted: number;
  insuranceCoverageUSD: number;
  description: string;
  availableVehicles: number;
}

export type ShipmentStatus =
  | 'At Ocean Port'
  | 'Customs Clearance at Port'
  | 'En Route on Corridor'
  | 'At Inland Border Post'
  | 'In Transit to Lusaka Hub'
  | 'Ready for Client Pickup'
  | 'Delivered';

export interface TransitMilestone {
  stage: string;
  location: string;
  timestamp: string;
  completed: boolean;
  description?: string;
}

export interface VehicleShipment {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  color: string;
  imageUrl: string;
  clientEmail: string;
  clientName: string;
  clientPhone: string;
  originPort: 'Durban Port (South Africa)' | 'Walvis Bay Port (Namibia)' | 'Dar es Salaam Port (Tanzania)' | 'Maputo Port (Mozambique)' | 'Beira Port (Mozambique)';
  destinationHub: 'Lusaka Main Logistics Hub' | 'Ndola Commercial Depot' | 'Kitwe Transit Yard' | 'Livingstone Border Base';
  corridorName: 'Durban - Beitbridge - Lusaka' | 'Walvis Bay - Katima Mulilo - Kazungula' | 'Dar es Salaam - Nakonde - Lusaka' | 'Beira - Forbes - Chirundu - Lusaka';
  assignedAgencyId?: string;
  assignedAgencyName?: string;
  assignedAgencyPhone?: string;
  status: ShipmentStatus;
  currentLocationName: string;
  currentCoordinates: [number, number]; // [lat, lng]
  routeWaypoints: [number, number][]; // Array of lat, lng along corridor
  etaDate: string;
  transitCostUSD: number;
  documents: VehicleDocument[];
  milestones: TransitMilestone[];
  lastUpdated: string;
}

export interface CorridorAlert {
  id: string;
  title: string;
  corridor: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  datePosted: string;
}
