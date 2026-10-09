import type { BlockData, BlockType, ServiceBlock } from '@/lib/service-blocks';

/**
 * Sumber tunggal data awal section /jaringan (Network).
 *
 * Dipakai oleh `prisma/seed-network.ts` untuk mengisi tabel CMS. Konten
 * diambil dari halaman statis lama (NetworkCoverage, HubPoP, GlobalNetwork)
 * agar tampilan website tidak berubah setelah migrasi ke CMS.
 */

export interface NetworkMenuSeed {
  slug: string;
  parent: string | null;
  title: string;
  desc?: string;
  icon: string;
  isGroup?: boolean;
  showInNavbar?: boolean;
  showInSidebar?: boolean;
}

export const networkMenuSeed: NetworkMenuSeed[] = [
  {
    slug: 'coverage',
    parent: null,
    title: 'Network Coverage',
    desc: 'Submarine & inland cable routes',
    icon: 'MapPin',
  },
  {
    slug: 'hub-pop',
    parent: null,
    title: 'Hub & Point of Presence (PoP)',
    desc: 'Domestic & cross-border backbones',
    icon: 'Server',
  },
  {
    slug: 'global-network',
    parent: null,
    title: 'Global Network & Peering',
    desc: 'AS Numbers, IXPs & Tier-1 upstreams',
    icon: 'Share2',
  },
];

export interface NetworkPageSeed {
  slug: string;
  layout: 'DETAIL' | 'CATEGORY';
  category: string;
  breadcrumb: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  blocks: ServiceBlock[];
}

const block = (type: BlockType, data: BlockData): ServiceBlock => ({ type, data });

export const networkPagesSeed: NetworkPageSeed[] = [
  {
    slug: 'coverage',
    layout: 'DETAIL',
    category: 'Network',
    breadcrumb: 'Network Coverage',
    title: 'Network Coverage Map',
    subtitle:
      'Comprehensive inland and submarine fiber optic routes interconnecting major cities in Indonesia and Southeast Asian digital hubs.',
    metaTitle: 'Network Coverage Map | Trans Hybrid Communication',
    metaDescription:
      'Terrestrial and submarine fiber optic network coverage of PT Trans Hybrid Communication connecting Indonesia, Singapore, Malaysia, Brunei, and Hong Kong.',
    blocks: [
      block('INTRO', {
        eyebrow: 'Inland & Submarine Fiber Optic Infrastructure',
        title: '',
        body: 'PT Trans Hybrid Communication operates an extensive carrier-grade terrestrial and submarine fiber optic network spanning across the Indonesian archipelago, with direct redundant interconnections to Singapore, Malaysia, Brunei, and Hong Kong.',
      }),
      block('IMAGE', {
        src: '/assets/images/coverage.webp',
        alt: 'THC Network Coverage Map',
        caption: 'Geographical coverage diagram — click on the image to enlarge.',
        zoomable: true,
      }),
      block('TABLE', {
        columns: [
          { key: 'from', label: 'Route From' },
          { key: 'to', label: 'Route To' },
          { key: 'cables', label: 'Cable Systems' },
        ],
        rows: [
          { key: 'jkt-sin', label: 'Jakarta - Singapore', cells: ['Jakarta', 'Singapore', 'Jakabare, INDIGO, Matrix, B3JS'] },
          { key: 'ptk-sin', label: 'Pontianak - Singapore', cells: ['Pontianak', 'Singapore', 'Jasuka, Jakabare'] },
          { key: 'jkt-ptk', label: 'Jakarta - Pontianak', cells: ['Jakarta', 'Pontianak', 'Jakabare, Jasuka'] },
          { key: 'skw-bth', label: 'Singkawang - Batam', cells: ['Singkawang', 'Batam', 'Palapa Ring Barat'] },
          { key: 'bth-sin', label: 'Batam - Singapore', cells: ['Batam', 'Singapore', 'SEAX Cable'] },
          { key: 'biw-kch', label: 'Biawak - Kuching', cells: ['Biawak', 'Kuching', 'Telkom Malaysia Inland'] },
          { key: 'kch-brn', label: 'Kuching - Brunei', cells: ['Kuching', 'Brunei', 'SKR1M'] },
          { key: 'kch-msg', label: 'Kuching - Mersing', cells: ['Kuching', 'Mersing', 'SKR1M'] },
          { key: 'brn-hkg', label: 'Brunei - Hong Kong', cells: ['Brunei', 'Hong Kong', 'SJC, AAG'] },
        ],
        footnotes: ['Redundant multi-system pathing ensuring zero single-point-of-failure.'],
      }),
      block('METRICS', {
        items: [
          { value: '99.9%', label: 'Network Availability SLA' },
          { value: '< 15 ms', label: 'Jakarta - Singapore Latency' },
          { value: '100+', label: 'Nationwide PoPs' },
        ],
      }),
    ],
  },

  {
    slug: 'hub-pop',
    layout: 'DETAIL',
    category: 'Network',
    breadcrumb: 'Hub & PoP',
    title: 'Hub & Point of Presence (PoP)',
    subtitle:
      'Hierarchical domestic and cross-border backbone topology of THC hubs in Jakarta, Batam, and Pontianak.',
    metaTitle: 'Hub & Point of Presence (PoP) | Trans Hybrid Communication',
    metaDescription:
      'Regional backbone rings and interconnection hubs of PT Trans Hybrid Communication across Java, Sumatera, Borneo, Sulawesi, and East & West Malaysia.',
    blocks: [
      block('INTRO', {
        eyebrow: 'Hierarchical Domestic & Cross-Border Backbone Topology',
        title: '',
        body: 'A comprehensive architectural view of PT Trans Hybrid Communication regional backbone rings, showcasing central interconnection hubs in Jakarta, Batam, and Pontianak linked directly to domestic regional networks and international submarine landing stations.',
      }),
      block('IMAGE', {
        src: '/assets/images/hubpop.webp',
        alt: 'THC Hub & Point of Presence Architecture Diagram',
        caption: 'Regional backbone topology schema — click on the image to enlarge.',
        zoomable: true,
      }),
      block('CARDS', {
        style: 'grid',
        items: [
          {
            title: 'Java Domestic Backbone',
            badge: 'Active',
            icon: 'Server',
            description: 'Hub: Jakarta (Central Gateway)',
            features: ['Banten', 'Bekasi', 'Cianjur', 'Indramayu', 'Depok', 'Bogor', 'Ciawi', 'Bandung', 'Cirebon', 'Surabaya'],
            href: '',
          },
          {
            title: 'Sumatera Domestic Backbone',
            badge: 'Active',
            icon: 'Server',
            description: 'Hub: Batam (International Hub)',
            features: ['Medan', 'Palembang', 'Jambi', 'Lampung', 'Padang'],
            href: '',
          },
          {
            title: 'Borneo Domestic Backbone',
            badge: 'Active',
            icon: 'Server',
            description: 'Hub: Pontianak (Regional Hub)',
            features: ['Aruk', 'Sambas', 'Singkawang', 'Mempawah', 'Entikong', 'Sintang', 'Sanggau', 'Samarinda', 'Balikpapan'],
            href: '',
          },
          {
            title: 'East & West Malaysia Backbone',
            badge: 'Active',
            icon: 'Server',
            description: 'Hub: Kuching & Mersing Gateways',
            features: ['Kuching', 'Bintulu', 'Miri', 'Brunei', 'Mersing', 'Singapore'],
            href: '',
          },
          {
            title: 'Sulawesi Domestic Backbone',
            badge: 'Active',
            icon: 'Server',
            description: 'Hub: Makassar (Eastern Hub)',
            features: ['Makassar', 'Palopo'],
            href: '',
          },
        ],
      }),
    ],
  },

  {
    slug: 'global-network',
    layout: 'DETAIL',
    category: 'Network',
    breadcrumb: 'Global Network',
    title: 'Global Network & Peering Ecosystem',
    subtitle:
      'Multi-ASN interconnection, Tier-1 upstreams, and premier Internet Exchange Points (IXPs) worldwide.',
    metaTitle: 'Global Network & Peering Ecosystem | Trans Hybrid Communication',
    metaDescription:
      'Global peering ecosystem of PT Trans Hybrid Communication: three ASNs (AS63516, AS24534, AS153068), Tier-1 upstreams, IXPs, and official network capacity records.',
    blocks: [
      block('INTRO', {
        eyebrow: 'Multi-ASN Interconnection, Tier-1 Upstreams & IXPs',
        title: '',
        body: 'PT Trans Hybrid Communication maintains open peering relationships with Tier-1 global transit providers and premier Internet Exchange Points (IXPs) worldwide, empowering more than 100 service provider members with resilient low-latency routing.',
      }),
      block('IMAGE', {
        src: '/assets/images/globalnetwork.webp',
        alt: 'THC Global Network Peering & Upstream Diagram',
        caption: 'Global peering & upstream topology schema — click on the image to enlarge.',
        zoomable: true,
      }),
      block('CARDS', {
        style: 'grid',
        items: [
          {
            title: 'AS 63516',
            shortTitle: 'AS 63516',
            badge: 'Core Routing & Backbone Transit',
            icon: 'Network',
            description: 'Independent BGP routing domain for core routing and backbone transit operations.',
            features: ['peeringdb.com/net/8075', 'bgp.he.net/AS63516'],
            href: 'https://www.peeringdb.com/net/8075',
            ctaLabel: 'View on PeeringDB',
          },
          {
            title: 'AS 24534',
            shortTitle: 'AS 24534',
            badge: 'Dedicated Internet & Upstream Peering',
            icon: 'Globe',
            description: 'Independent BGP routing domain for dedicated internet access and upstream peering.',
            features: ['peeringdb.com/net/14388', 'bgp.he.net/AS24534'],
            href: 'https://www.peeringdb.com/net/14388',
            ctaLabel: 'View on PeeringDB',
          },
          {
            title: 'AS 153068',
            shortTitle: 'AS 153068',
            badge: 'International Submarine & Cloud Exchange',
            icon: 'Share2',
            description: 'Independent BGP routing domain for international submarine and cloud exchange services.',
            features: ['peeringdb.com/net/36934', 'bgp.he.net/AS153068'],
            href: 'https://www.peeringdb.com/net/36934',
            ctaLabel: 'View on PeeringDB',
          },
        ],
      }),
      block('TABLE', {
        columns: [
          { key: 'metric', label: 'Metric / Parameter' },
          { key: 'value', label: 'Capacity & Routing Record' },
        ],
        rows: [
          { key: 'isps', label: 'Customer / Member ISPs', cells: ['More Than 100 ISPs'] },
          { key: 'cable-cap', label: 'Capacity Interconnection Cable', cells: ['More Than 300 Gbps'] },
          { key: 'upstream-cap', label: 'Capacity Upstream (Intl & Domestic)', cells: ['More Than 1 Terabyte (Tbps)'] },
          { key: 'peeringdb-org', label: 'PeeringDB Organization', cells: ['peeringdb.com/org/11112'] },
        ],
      }),
    ],
  },
];