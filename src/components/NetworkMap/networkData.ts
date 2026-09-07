export type NodeType = 'gateway' | 'pop';

export interface NetworkNode {
  id: string;
  city: string;
  type: NodeType;
  lat: number;
  lng: number;
  isInset?: boolean;
  /** Hide this label on small screens (node stays interactive via tooltip/detail). */
  mobileLabel?: boolean;
  /** Preferred label anchor side. */
  labelPos?: 'top' | 'bottom' | 'left' | 'right';
  /** Extra distance from the node along the anchor axis (pushes the label outward). */
  labelOffset?: number;
  /** Perpendicular shift: horizontal for top/bottom, vertical for left/right. */
  labelShift?: number;
  /** Always hide the text label (node stays interactive via tooltip/detail). */
  hideLabel?: boolean;
}

export interface CableConnection {
  from: string;
  to: string;
  kind: 'submarine' | 'inland';
  /** Curvature amount: positive bends one way, negative bends opposite, 0 = straight line. */
  curvature?: number;
}

export interface CableRoute {
  from: string;
  to: string;
  cable: string;
}

export const networkNodes: NetworkNode[] = [
  // Gateway nodes (dark blue squares)
  { id: 'batam', city: 'Batam', type: 'gateway', lat: 1.0456, lng: 104.0305, labelPos: 'left', labelOffset: 12, labelShift: -2 },
  { id: 'singapore', city: 'Singapore', type: 'gateway', lat: 1.3521, lng: 103.8198, labelPos: 'right', labelOffset: 8, labelShift: -4 },
  { id: 'pontianak', city: 'Pontianak', type: 'gateway', lat: -0.0263, lng: 109.3425, labelPos: 'right', labelOffset: 10, labelShift: 2 },
  { id: 'kuching', city: 'Kuching', type: 'gateway', lat: 1.5535, lng: 110.3593, labelPos: 'right', labelOffset: 10, labelShift: 2 },
  { id: 'brunei', city: 'Brunei', type: 'gateway', lat: 4.5353, lng: 114.7277, labelPos: 'left', labelOffset: 8, labelShift: -4 },
  { id: 'jakarta', city: 'Jakarta', type: 'gateway', lat: -6.2088, lng: 106.8456, labelPos: 'left', labelOffset: 10, labelShift: 2 },
  { id: 'hongkong', city: 'Hong Kong', type: 'gateway', lat: 22.3193, lng: 114.1694, labelPos: 'top', labelOffset: 4 },

  // Point of Presence nodes (circles with blue border)
  // Malaysia
  { id: 'mersing', city: 'Mersing', type: 'pop', lat: 2.43, lng: 103.84, labelPos: 'left', labelOffset: 8 },
  
  // Sumatra
  { id: 'medan', city: 'Medan', type: 'pop', lat: 3.5952, lng: 98.6722, labelPos: 'bottom', labelOffset: 6 },
  { id: 'padang', city: 'Padang', type: 'pop', lat: -0.9471, lng: 100.4172, labelPos: 'left', labelOffset: 6 },
  { id: 'jambi', city: 'Jambi', type: 'pop', lat: -1.6101, lng: 103.6131, labelPos: 'right', labelOffset: 6 },
  { id: 'palembang', city: 'Palembang', type: 'pop', lat: -2.9761, lng: 104.7754, labelPos: 'left', labelOffset: 6 },
  { id: 'lampung', city: 'Lampung', type: 'pop', lat: -5.4295, lng: 105.261, labelPos: 'left', labelOffset: 6 },

  // Java (radiating from Jakarta)
  { id: 'banten', city: 'Banten', type: 'pop', lat: -6.05, lng: 105.9, labelPos: 'left', labelOffset: 6 },
  { id: 'depok', city: 'Depok', type: 'pop', lat: -6.4025, lng: 106.55, labelPos: 'left', labelOffset: 4 },
  { id: 'bogor', city: 'Bogor', type: 'pop', lat: -6.7, lng: 106.75, labelPos: 'left', labelOffset: 4 },
  { id: 'cianjur', city: 'Cianjur', type: 'pop', lat: -7.0, lng: 107.05, labelPos: 'bottom', labelOffset: 4 },
  { id: 'bandung', city: 'Bandung', type: 'pop', lat: -6.9175, lng: 107.55, labelPos: 'bottom', labelOffset: 4 },
  { id: 'indramayu', city: 'Indramayu', type: 'pop', lat: -6.3264, lng: 108.2, labelPos: 'right', labelOffset: 6 },
  { id: 'cirebon', city: 'Cirebon', type: 'pop', lat: -6.732, lng: 108.5523, labelPos: 'right', labelOffset: 6 },
  { id: 'surabaya', city: 'Surabaya', type: 'pop', lat: -7.2575, lng: 112.7521, labelPos: 'bottom', labelOffset: 6 },

  // West Kalimantan & Sarawak
  { id: 'mempawah', city: 'Mempawah', type: 'pop', lat: 0.365, lng: 108.955, labelPos: 'left', labelOffset: 6 },
  { id: 'singkawang', city: 'Singkawang', type: 'pop', lat: 0.9105, lng: 108.9842, labelPos: 'left', labelOffset: 6 },
  { id: 'sambas', city: 'Sambas', type: 'pop', lat: 1.3627, lng: 109.2894, labelPos: 'left', labelOffset: 6 },
  { id: 'aruk', city: 'Aruk', type: 'pop', lat: 1.5, lng: 109.7, labelPos: 'top', labelOffset: 5 },
  { id: 'entikong', city: 'Entikong', type: 'pop', lat: 0.8833, lng: 111.0, labelPos: 'right', labelOffset: 6 },
  { id: 'sanggau', city: 'Sanggau', type: 'pop', lat: 0.1167, lng: 110.6, labelPos: 'bottom', labelOffset: 5 },
  { id: 'sintang', city: 'Sintang', type: 'pop', lat: 0.0667, lng: 111.47, labelPos: 'right', labelOffset: 6 },

  // Sarawak / Brunei
  { id: 'bintulu', city: 'Bintulu', type: 'pop', lat: 3.1667, lng: 113.0333, labelPos: 'right', labelOffset: 6 },
  { id: 'miri', city: 'Miri', type: 'pop', lat: 4.3995, lng: 113.9915, labelPos: 'right', labelOffset: 6 },

  // East Kalimantan & Sulawesi
  { id: 'balikpapan', city: 'Balikpapan', type: 'pop', lat: -1.2379, lng: 116.8529, labelPos: 'right', labelOffset: 6 },
  { id: 'samarinda', city: 'Samarinda', type: 'pop', lat: -0.5022, lng: 117.1536, labelPos: 'top', labelOffset: 5 },
  { id: 'palopo', city: 'Palopo', type: 'pop', lat: -2.9925, lng: 120.1975, labelPos: 'top', labelOffset: 5 },
  { id: 'makassar', city: 'Makassar', type: 'pop', lat: -5.1477, lng: 119.4327, labelPos: 'right', labelOffset: 6 },
];

export const networkCables: CableConnection[] = [
  // ---- Submarine cables (red curves) ----
  // Emanating from Jakarta
  { from: 'jakarta', to: 'padang', kind: 'submarine', curvature: -0.22 },
  { from: 'jakarta', to: 'lampung', kind: 'submarine', curvature: -0.08 },
  { from: 'jakarta', to: 'batam', kind: 'submarine', curvature: 0.12 },
  { from: 'jakarta', to: 'pontianak', kind: 'submarine', curvature: 0.08 },
  { from: 'jakarta', to: 'balikpapan', kind: 'submarine', curvature: 0.15 },
  { from: 'jakarta', to: 'palopo', kind: 'submarine', curvature: -0.16 },
  { from: 'jakarta', to: 'makassar', kind: 'submarine', curvature: -0.1 },

  // Emanating from Batam
  { from: 'batam', to: 'singapore', kind: 'submarine', curvature: 0 },
  { from: 'batam', to: 'mersing', kind: 'submarine', curvature: 0.12 },
  { from: 'batam', to: 'kuching', kind: 'submarine', curvature: 0.14 },
  { from: 'batam', to: 'pontianak', kind: 'submarine', curvature: -0.12 },

  // To Hong Kong
  { from: 'mersing', to: 'hongkong', kind: 'submarine', curvature: -0.18 },
  { from: 'brunei', to: 'hongkong', kind: 'submarine', curvature: 0.2 },

  // ---- Inland / Terrestrial cables (blue lines) ----
  // Sumatra (connected to Batam hub)
  { from: 'batam', to: 'medan', kind: 'inland', curvature: 0.1 },
  { from: 'batam', to: 'jambi', kind: 'inland', curvature: 0.06 },
  { from: 'batam', to: 'palembang', kind: 'inland', curvature: 0.06 },
  { from: 'batam', to: 'lampung', kind: 'inland', curvature: 0.05 },

  // Java (direct spokes radiating from Jakarta hub)
  { from: 'jakarta', to: 'banten', kind: 'inland', curvature: 0 },
  { from: 'jakarta', to: 'depok', kind: 'inland', curvature: 0 },
  { from: 'jakarta', to: 'bogor', kind: 'inland', curvature: 0 },
  { from: 'jakarta', to: 'cianjur', kind: 'inland', curvature: 0 },
  { from: 'jakarta', to: 'bandung', kind: 'inland', curvature: 0 },
  { from: 'jakarta', to: 'indramayu', kind: 'inland', curvature: 0 },
  { from: 'jakarta', to: 'cirebon', kind: 'inland', curvature: 0 },
  { from: 'jakarta', to: 'surabaya', kind: 'inland', curvature: -0.22 },

  // West Kalimantan coastal chain
  { from: 'pontianak', to: 'mempawah', kind: 'inland', curvature: 0 },
  { from: 'mempawah', to: 'singkawang', kind: 'inland', curvature: 0 },
  { from: 'singkawang', to: 'sambas', kind: 'inland', curvature: 0 },
  { from: 'sambas', to: 'aruk', kind: 'inland', curvature: 0 },
  { from: 'aruk', to: 'kuching', kind: 'inland', curvature: 0 },

  // West Kalimantan inland branches
  { from: 'mempawah', to: 'entikong', kind: 'inland', curvature: -0.06 },
  { from: 'pontianak', to: 'sanggau', kind: 'inland', curvature: 0 },
  { from: 'sanggau', to: 'sintang', kind: 'inland', curvature: 0 },

  // Sarawak chain
  { from: 'kuching', to: 'bintulu', kind: 'inland', curvature: 0.08 },
  { from: 'bintulu', to: 'miri', kind: 'inland', curvature: 0.06 },
  { from: 'miri', to: 'brunei', kind: 'inland', curvature: 0.04 },

  // East Kalimantan & Sulawesi
  { from: 'balikpapan', to: 'samarinda', kind: 'inland', curvature: -0.1 },
  { from: 'makassar', to: 'palopo', kind: 'inland', curvature: 0.12 },
];

/** Route list shown in the legend panel (matching the reference diagram). */
export const cableRoutes: CableRoute[] = [
  { from: 'Biawak', to: 'Kuching', cable: 'Telkom Malaysia Inland' },
  { from: 'Biawak', to: 'Brunei', cable: 'Telkom Malaysia Inland' },
  { from: 'Kuching', to: 'Brunei', cable: 'SKR1M' },
  { from: 'Kuching', to: 'Mersing', cable: 'SKR1M' },
  { from: 'Brunei', to: 'Hongkong', cable: 'SJC / AAG' },
];