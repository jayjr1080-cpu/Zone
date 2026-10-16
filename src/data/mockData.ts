import { ContractedAgency, VehicleShipment, VehicleDocument, CorridorAlert, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-client-1',
    name: 'Mwamba Chanda',
    email: 'mwamba@gmail.com',
    role: 'client',
    phone: '+260 97 712 3456',
    company: 'Apex Logistics Zambia',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-client-2',
    name: 'Thabo Mbeki Mutale',
    email: 'thabo@client.com',
    role: 'client',
    phone: '+260 96 688 9900',
    company: 'Mutale Motors Lusaka',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-admin-1',
    name: 'ZONE Admin Specialist',
    email: 'admin@zone.zm',
    role: 'admin',
    phone: '+260 211 889900',
    company: 'ZONE Trans-Corridor Command',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_AGENCIES: ContractedAgency[] = [
  {
    id: 'agency-1',
    name: 'Trans-Kalahari Highway Haulers',
    logo: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=120&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 142,
    phone: '+27 31 400 9012',
    email: 'dispatches@transkalahari.co.za',
    headquarters: 'Durban Harbor Logistics Hub, South Africa',
    supportedPorts: ['Durban Port (South Africa)', 'Walvis Bay Port (Namibia)'],
    serviceTypes: ['Multi-Vehicle Carrier', 'Flatbed Tow', 'Enclosed Transport'],
    baseRateUSD: 1450,
    avgTransitDays: 4,
    isVerified: true,
    totalDeliveriesCompleted: 1890,
    insuranceCoverageUSD: 250000,
    description: 'Premier auto-logistics operator connecting South African ocean ports directly to Zambian inland customs terminals. Features real-time GPS fleet tracking and licensed transit border clearance.',
    availableVehicles: 18
  },
  {
    id: 'agency-2',
    name: 'Walvis Bay Express Corridor Services',
    logo: 'https://images.unsplash.com/photo-1586191582056-a60d00922883?w=120&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 98,
    phone: '+264 64 201 889',
    email: 'ops@walvisexpress.com.na',
    headquarters: 'Port Area, Walvis Bay, Namibia',
    supportedPorts: ['Walvis Bay Port (Namibia)'],
    serviceTypes: ['Multi-Vehicle Carrier', 'Escorted Drive'],
    baseRateUSD: 1380,
    avgTransitDays: 3,
    isVerified: true,
    totalDeliveriesCompleted: 1240,
    insuranceCoverageUSD: 200000,
    description: 'Specialized in fast-track transit from Walvis Bay ocean port through Katima Mulilo and Kazungula bridge into Lusaka and the Copperbelt.',
    availableVehicles: 12
  },
  {
    id: 'agency-3',
    name: 'Tanzam Northern Corridor Logistics',
    logo: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=120&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 115,
    phone: '+255 22 211 4455',
    email: 'support@tanzamfreight.co.tz',
    headquarters: 'Kurasini Port Zone, Dar es Salaam, Tanzania',
    supportedPorts: ['Dar es Salaam Port (Tanzania)'],
    serviceTypes: ['Multi-Vehicle Carrier', 'Flatbed Tow'],
    baseRateUSD: 1250,
    avgTransitDays: 5,
    isVerified: true,
    totalDeliveriesCompleted: 1560,
    insuranceCoverageUSD: 180000,
    description: 'High-frequency vehicle transport line running daily standard car carriers along the TANZAM corridor through Nakonde border directly to Lusaka & Ndola.',
    availableVehicles: 24
  },
  {
    id: 'agency-4',
    name: 'Beira Gateway Auto Freight',
    logo: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=120&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewsCount: 76,
    phone: '+258 23 321 000',
    email: 'bookings@beiragateway.mz',
    headquarters: 'Port of Beira Complex, Mozambique',
    supportedPorts: ['Beira Port (Mozambique)', 'Maputo Port (Mozambique)'],
    serviceTypes: ['Multi-Vehicle Carrier', 'Enclosed Transport'],
    baseRateUSD: 1300,
    avgTransitDays: 4,
    isVerified: true,
    totalDeliveriesCompleted: 820,
    insuranceCoverageUSD: 150000,
    description: 'Cost-effective freight route connecting Mozambican ports across Chirundu into Zambian business hubs.',
    availableVehicles: 10
  }
];

export const INITIAL_DOCUMENTS: VehicleDocument[] = [
  {
    id: 'doc-101',
    title: 'Bill of Lading - Durban Ocean Transit',
    type: 'Bill of Lading',
    fileName: 'BOL_DUR_ZAM_99210.pdf',
    fileSize: '2.4 MB',
    fileType: 'pdf',
    uploadDate: '2025-02-10',
    status: 'Approved',
    vehicleVin: 'JN1AZ4EH8DM102983',
    vehicleName: '2021 Toyota Prado VX',
    clientEmail: 'mwamba@gmail.com',
    downloadUrl: '#',
    notes: 'Verified by Durban Port customs officer and marine shipper.',
    uploadedBy: 'Admin'
  },
  {
    id: 'doc-102',
    title: 'ZRA Customs Duty Clearance Certificate',
    type: 'Customs Duty Clearance',
    fileName: 'ZRA_CLEARANCE_883912.pdf',
    fileSize: '1.8 MB',
    fileType: 'pdf',
    uploadDate: '2025-02-12',
    status: 'Verified',
    vehicleVin: 'JN1AZ4EH8DM102983',
    vehicleName: '2021 Toyota Prado VX',
    clientEmail: 'mwamba@gmail.com',
    downloadUrl: '#',
    notes: 'Zambia Revenue Authority tax assessment paid in full.',
    uploadedBy: 'Admin'
  },
  {
    id: 'doc-103',
    title: 'Interpol SARPCCO Vehicle Verification',
    type: 'Interpol Clearance Certificate',
    fileName: 'INTERPOL_CLEARANCE_ZM402.pdf',
    fileSize: '1.1 MB',
    fileType: 'pdf',
    uploadDate: '2025-02-13',
    status: 'Approved',
    vehicleVin: 'JN1AZ4EH8DM102983',
    vehicleName: '2021 Toyota Prado VX',
    clientEmail: 'mwamba@gmail.com',
    downloadUrl: '#',
    notes: 'Stolen vehicle database check passed. SARPCCO stamp attached.',
    uploadedBy: 'Admin'
  },
  {
    id: 'doc-104',
    title: 'Vehicle Physical Condition Inspection Sheet',
    type: 'Vehicle Inspection Sheet',
    fileName: 'INSPECTION_WALVIS_00491.pdf',
    fileSize: '3.2 MB',
    fileType: 'pdf',
    uploadDate: '2025-02-14',
    status: 'Verified',
    vehicleVin: 'KTY200-992817263',
    vehicleName: '2022 Nissan X-Trail 4WD',
    clientEmail: 'thabo@client.com',
    downloadUrl: '#',
    notes: 'Recorded minor scratch on rear bumper prior to loading onto carrier trailer.',
    uploadedBy: 'Agency'
  },
  {
    id: 'doc-105',
    title: 'Kazungula Transit Bond Pass',
    type: 'Transit Bond Pass',
    fileName: 'TRANSIT_BOND_KZG_492.pdf',
    fileSize: '950 KB',
    fileType: 'pdf',
    uploadDate: '2025-02-15',
    status: 'Pending Review',
    vehicleVin: 'KTY200-992817263',
    vehicleName: '2022 Nissan X-Trail 4WD',
    clientEmail: 'thabo@client.com',
    downloadUrl: '#',
    notes: 'Awaiting final stamp at border control checkpoint.',
    uploadedBy: 'Admin'
  }
];

export const INITIAL_SHIPMENTS: VehicleShipment[] = [
  {
    id: 'ZON-88910',
    vin: 'JN1AZ4EH8DM102983',
    make: 'Toyota',
    model: 'Land Cruiser Prado VX',
    year: 2021,
    color: 'Pearl White',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=80',
    clientEmail: 'mwamba@gmail.com',
    clientName: 'Mwamba Chanda',
    clientPhone: '+260 97 712 3456',
    originPort: 'Durban Port (South Africa)',
    destinationHub: 'Lusaka Main Logistics Hub',
    corridorName: 'Durban - Beitbridge - Lusaka',
    assignedAgencyId: 'agency-1',
    assignedAgencyName: 'Trans-Kalahari Highway Haulers',
    assignedAgencyPhone: '+27 31 400 9012',
    status: 'En Route on Corridor',
    currentLocationName: 'Beitbridge Border Post (South Africa / Zimbabwe)',
    currentCoordinates: [-22.2162, 29.9863],
    routeWaypoints: [
      [-29.8587, 31.0218], // Durban
      [-26.2041, 28.0473], // Johannesburg
      [-22.2162, 29.9863], // Beitbridge
      [-17.8252, 31.0335], // Harare
      [-16.0389, 28.8508], // Chirundu
      [-15.3875, 28.3228]  // Lusaka
    ],
    etaDate: '2025-02-18',
    transitCostUSD: 1450,
    documents: [INITIAL_DOCUMENTS[0], INITIAL_DOCUMENTS[1], INITIAL_DOCUMENTS[2]],
    milestones: [
      { stage: 'Port Discharge', location: 'Durban Container Terminal', timestamp: '2025-02-10 09:30', completed: true, description: 'Discharged from RoRo Vessel MV TransOceanic.' },
      { stage: 'Port Customs Inspection', location: 'Durban Commercial Gate', timestamp: '2025-02-11 14:15', completed: true, description: 'Customs clearance approved for cross-border transit.' },
      { stage: 'Car Carrier Dispatch', location: 'Durban Depot', timestamp: '2025-02-12 08:00', completed: true, description: 'Loaded on multi-vehicle transport trailer #ZA-449.' },
      { stage: 'Border Gate Entry', location: 'Beitbridge Border Checkpoint', timestamp: '2025-02-14 11:20', completed: true, description: 'Undergoing SARPCCO Interpol clearance check.' },
      { stage: 'Zambia Border Crossing', location: 'Chirundu One-Stop Border Post', timestamp: 'Expected 2025-02-16', completed: false },
      { stage: 'Final Delivery', location: 'Lusaka Main Hub', timestamp: 'Expected 2025-02-18', completed: false }
    ],
    lastUpdated: '10 mins ago'
  },
  {
    id: 'ZON-77201',
    vin: 'KTY200-992817263',
    make: 'Nissan',
    model: 'X-Trail 4WD',
    year: 2022,
    color: 'Silver Metallic',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=80',
    clientEmail: 'thabo@client.com',
    clientName: 'Thabo Mbeki Mutale',
    clientPhone: '+260 96 688 9900',
    originPort: 'Walvis Bay Port (Namibia)',
    destinationHub: 'Lusaka Main Logistics Hub',
    corridorName: 'Walvis Bay - Katima Mulilo - Kazungula',
    assignedAgencyId: 'agency-2',
    assignedAgencyName: 'Walvis Bay Express Corridor Services',
    assignedAgencyPhone: '+264 64 201 889',
    status: 'At Inland Border Post',
    currentLocationName: 'Kazungula Bridge Border Terminal',
    currentCoordinates: [-17.7923, 25.2631],
    routeWaypoints: [
      [-22.9575, 14.5053], // Walvis Bay
      [-22.5609, 17.0658], // Windhoek
      [-17.9333, 19.7667], // Rundu
      [-17.7923, 25.2631], // Kazungula
      [-17.8419, 25.8543], // Livingstone
      [-15.3875, 28.3228]  // Lusaka
    ],
    etaDate: '2025-02-17',
    transitCostUSD: 1380,
    documents: [INITIAL_DOCUMENTS[3], INITIAL_DOCUMENTS[4]],
    milestones: [
      { stage: 'Port Discharge', location: 'Walvis Bay Port', timestamp: '2025-02-12 10:00', completed: true },
      { stage: 'Transit Bond Clearance', location: 'Walvis Customs Station', timestamp: '2025-02-13 16:30', completed: true },
      { stage: 'Highway Transit', location: 'Trans-Kalahari Corridor', timestamp: '2025-02-14 07:45', completed: true },
      { stage: 'Bridge Border Entry', location: 'Kazungula One-Stop Border Post', timestamp: '2025-02-15 13:10', completed: true, description: 'Crossing Zambezi River Bridge into Zambia.' },
      { stage: 'Zambia Inland Inspection', location: 'Livingstone Base', timestamp: 'Expected 2025-02-16', completed: false },
      { stage: 'Client Handover', location: 'Lusaka Main Hub', timestamp: 'Expected 2025-02-17', completed: false }
    ],
    lastUpdated: '25 mins ago'
  },
  {
    id: 'ZON-55412',
    vin: 'SAD300-881273641',
    make: 'Mitsubishi',
    model: 'Canter Commercial Truck 4.5T',
    year: 2020,
    color: 'Solid Blue',
    imageUrl: 'https://images.unsplash.com/photo-1586191582056-a60d00922883?w=500&auto=format&fit=crop&q=80',
    clientEmail: 'mwamba@gmail.com',
    clientName: 'Mwamba Chanda',
    clientPhone: '+260 97 712 3456',
    originPort: 'Dar es Salaam Port (Tanzania)',
    destinationHub: 'Ndola Commercial Depot',
    corridorName: 'Dar es Salaam - Nakonde - Lusaka',
    assignedAgencyId: 'agency-3',
    assignedAgencyName: 'Tanzam Northern Corridor Logistics',
    assignedAgencyPhone: '+255 22 211 4455',
    status: 'Customs Clearance at Port',
    currentLocationName: 'Dar es Salaam Port Automobile Yard',
    currentCoordinates: [-6.7924, 39.2083],
    routeWaypoints: [
      [-6.7924, 39.2083], // Dar es Salaam
      [-8.9094, 33.4586], // Mbeya
      [-9.3400, 32.7560], // Nakonde
      [-11.8343, 31.4529], // Mpika
      [-12.9583, 28.6366]  // Ndola
    ],
    etaDate: '2025-02-21',
    transitCostUSD: 1250,
    documents: [],
    milestones: [
      { stage: 'Ship Arrival', location: 'Dar Port Terminal 3', timestamp: '2025-02-15 06:15', completed: true },
      { stage: 'Tanzania Customs Verification', location: 'TRA Dar Port Office', timestamp: '2025-02-15 11:00', completed: false, description: 'Awaiting export transit release.' },
      { stage: 'Dispatch onto TANZAM Route', location: 'Dar Freight Yard', timestamp: 'Expected 2025-02-17', completed: false }
    ],
    lastUpdated: '1 hour ago'
  }
];

export const INITIAL_ALERTS: CorridorAlert[] = [
  {
    id: 'alt-1',
    title: 'Chirundu Border Processing Delay Notice',
    corridor: 'Durban & Beira Corridors',
    message: 'Increased heavy vehicle traffic at Chirundu One-Stop Border Post causing +6 hour processing queues. Delivery agency drivers are prioritized for pre-cleared vehicles.',
    severity: 'warning',
    datePosted: '2025-02-15'
  },
  {
    id: 'alt-2',
    title: 'Kazungula Bridge OSBP Toll Gate Upgrades',
    corridor: 'Walvis Bay Corridor',
    message: 'Seamless electronic customs scanner deployment complete at Kazungula. Average transit clearance time reduced to 45 minutes.',
    severity: 'info',
    datePosted: '2025-02-14'
  }
];
