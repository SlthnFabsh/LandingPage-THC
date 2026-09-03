export type NodeType = 'gateway' | 'pop';

export interface NetworkNode {
  id: string;
  city: string;
  type: NodeType;
  lat: number;
  lng: number;
  isInset?: boolean;
  mobileLabel?: boolean;
  labelPos?: 'top' | 'bottom';
}

export interface CableConnection {
  from: string;
  to: string;
  kind: 'submarine' | 'inland';
}

export const networkNodes: NetworkNode[] = [
  // Gateway nodes
  { id: 'singapore', city: 'Singapore', type: 'gateway', lat: 1.3521, lng: 103.8198 },
  { id: 'batam', city: 'Batam', type: 'gateway', lat: 1.0456, lng: 104.0305, labelPos: 'bottom' },
  { id: 'pontianak', city: 'Pontianak', type: 'gateway', lat: -0.0263, lng: 109.3425, mobileLabel: false },
  { id: 'kuching', city: 'Kuching', type: 'gateway', lat: 1.5535, lng: 110.3593, labelPos: 'bottom' },
  { id: 'brunei', city: 'Brunei', type: 'gateway', lat: 4.5353, lng: 114.7277 },

  // Point of Presence nodes
  { id: 'jakarta', city: 'Jakarta', type: 'pop', lat: -6.2088, lng: 106.8456 },
  { id: 'miri', city: 'Miri', type: 'pop', lat: 4.3995, lng: 113.9915, mobileLabel: false, labelPos: 'bottom' },
  { id: 'bintulu', city: 'Bintulu', type: 'pop', lat: 3.1667, lng: 113.0333, mobileLabel: false },
  { id: 'padang', city: 'Padang', type: 'pop', lat: -0.9471, lng: 100.4172, mobileLabel: false, labelPos: 'bottom' },
  { id: 'jambi', city: 'Jambi', type: 'pop', lat: -1.6101, lng: 103.6131, mobileLabel: false },
  { id: 'palembang', city: 'Palembang', type: 'pop', lat: -2.9761, lng: 104.7754 },
  { id: 'lampung', city: 'Lampung', type: 'pop', lat: -5.4295, lng: 105.261, mobileLabel: false },
  { id: 'surabaya', city: 'Surabaya', type: 'pop', lat: -7.2575, lng: 112.7521 },
  { id: 'balikpapan', city: 'Balikpapan', type: 'pop', lat: -1.2379, lng: 116.8529, labelPos: 'bottom' },
  { id: 'makassar', city: 'Makassar', type: 'pop', lat: -5.1477, lng: 119.4327, labelPos: 'bottom' },
  { id: 'samarinda', city: 'Samarinda', type: 'pop', lat: -0.5022, lng: 117.1536, mobileLabel: false, labelPos: 'bottom' },
  { id: 'hongkong', city: 'Hong Kong', type: 'pop', lat: 22.3193, lng: 114.1694, isInset: true },
];

export const networkCables: CableConnection[] = [
  // Submarine cables
  { from: 'jakarta', to: 'singapore', kind: 'submarine' },
  { from: 'singapore', to: 'batam', kind: 'submarine' },
  { from: 'batam', to: 'kuching', kind: 'submarine' },
  { from: 'kuching', to: 'brunei', kind: 'submarine' },
  { from: 'pontianak', to: 'kuching', kind: 'submarine' },
  { from: 'singapore', to: 'hongkong', kind: 'submarine' },

  // Inland cables
  { from: 'padang', to: 'jambi', kind: 'inland' },
  { from: 'jambi', to: 'palembang', kind: 'inland' },
  { from: 'palembang', to: 'lampung', kind: 'inland' },
  { from: 'lampung', to: 'jakarta', kind: 'inland' },
  { from: 'jakarta', to: 'surabaya', kind: 'inland' },
  { from: 'balikpapan', to: 'samarinda', kind: 'inland' },
  { from: 'balikpapan', to: 'makassar', kind: 'inland' },
];