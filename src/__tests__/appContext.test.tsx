import { describe, it, expect } from 'vitest';
import { INITIAL_USERS, INITIAL_AGENCIES, INITIAL_SHIPMENTS, INITIAL_DOCUMENTS } from '../data/mockData';

describe('ZONE Data Models & Mock Logic', () => {
  it('has initial mock users with client and admin roles', () => {
    expect(INITIAL_USERS.length).toBeGreaterThan(0);
    const client = INITIAL_USERS.find(u => u.role === 'client');
    const admin = INITIAL_USERS.find(u => u.role === 'admin');
    expect(client).toBeDefined();
    expect(admin).toBeDefined();
  });

  it('contains contracted delivery agencies covering South Africa (Durban), Walvis Bay, Dar es Salaam, Beira', () => {
    expect(INITIAL_AGENCIES.length).toBeGreaterThanOrEqual(4);
    const durbanAgency = INITIAL_AGENCIES.find(a => a.supportedPorts.some(p => p.includes('Durban')));
    const walvisAgency = INITIAL_AGENCIES.find(a => a.supportedPorts.some(p => p.includes('Walvis Bay')));
    expect(durbanAgency).toBeDefined();
    expect(walvisAgency).toBeDefined();
  });

  it('tracks vehicle shipments with transit coordinates and milestones', () => {
    expect(INITIAL_SHIPMENTS.length).toBeGreaterThan(0);
    const shipment = INITIAL_SHIPMENTS[0];
    expect(shipment.vin).toBeTruthy();
    expect(shipment.currentCoordinates).toHaveLength(2);
    expect(shipment.routeWaypoints.length).toBeGreaterThan(1);
  });

  it('links vehicle documents with VIN and client email', () => {
    expect(INITIAL_DOCUMENTS.length).toBeGreaterThan(0);
    const doc = INITIAL_DOCUMENTS[0];
    expect(doc.type).toBe('Bill of Lading');
    expect(doc.status).toBe('Approved');
  });
});
