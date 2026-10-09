import type { BlockData, BlockType, ServiceBlock } from '@/lib/service-blocks';

/**
 * Sumber tunggal data awal section /layanan.
 *
 * Dipakai oleh `prisma/seed.ts` untuk mengisi tabel CMS, dan oleh route
 * dinamis sebagai jaring pengaman saat sebuah slug belum ada di database.
 * Tidak mengimpor React agar aman dipakai oleh script seed.
 */

export interface ServiceMenuSeed {
  slug: string;
  parent: string | null;
  title: string;
  desc?: string;
  icon: string;
  isGroup?: boolean;
  showInNavbar?: boolean;
  showInSidebar?: boolean;
}

export const serviceMenuSeed: ServiceMenuSeed[] = [
  { slug: 'internet', parent: null, title: 'Internet Services', desc: 'Dedicated Fiber Optic, IP Transit & THC IX', icon: 'Globe' },
  { slug: 'internet/ip-transit', parent: 'internet', title: 'IP Transit (ASN 24534)', icon: 'Radio', showInNavbar: false },
  { slug: 'internet/dedicated-internet', parent: 'internet', title: 'Dedicated Internet', icon: 'Zap', showInNavbar: false },
  { slug: 'internet/thc-ix', parent: 'internet', title: 'THC IX', icon: 'Radio', showInNavbar: false },

  { slug: 'konektivitas', parent: null, title: 'Connectivity Services', desc: 'IPLC, IEPL Layer-2, Metro Ethernet & IDCB', icon: 'Network' },
  { slug: 'konektivitas/iplc', parent: 'konektivitas', title: 'IPLC (International Private Leased Circuit)', icon: 'Cable', showInNavbar: false },
  { slug: 'konektivitas/iepl', parent: 'konektivitas', title: 'IEPL (International Ethernet Private Line)', icon: 'ArrowLeftRight', showInNavbar: false },
  { slug: 'konektivitas/metro-ethernet', parent: 'konektivitas', title: 'Local-Loop Metro Ethernet', icon: 'GitBranch', showInNavbar: false },
  { slug: 'konektivitas/idcb', parent: 'konektivitas', title: 'Inter Data Center Backbone (IDCB)', icon: 'Share2', showInNavbar: false },

  { slug: 'solusi', parent: null, title: 'Solutions', icon: 'Cpu', isGroup: true, showInNavbar: false },
  { slug: 'solusi/solusi-terkelola', parent: 'solusi', title: 'Managed Solutions', desc: 'Hospitality & Education digital solutions', icon: 'Building2' },
  { slug: 'solusi/solusi-terkelola/hospitality-solutions', parent: 'solusi/solusi-terkelola', title: 'Hospitality Solutions', icon: 'Hotel', showInNavbar: false },
  { slug: 'solusi/solusi-terkelola/education-solutions', parent: 'solusi/solusi-terkelola', title: 'Education Solutions', icon: 'GraduationCap', showInNavbar: false },
  { slug: 'solusi/layanan-terkelola', parent: 'solusi', title: 'Managed Services', desc: '24/7 Managed CPE, Wi-Fi & IT NOC Monitoring', icon: 'ServerCog' },
  { slug: 'solusi/layanan-terkelola/managed-cpe', parent: 'solusi/layanan-terkelola', title: 'Managed CPE', icon: 'Router', showInNavbar: false },
  { slug: 'solusi/layanan-terkelola/managed-wifi', parent: 'solusi/layanan-terkelola', title: 'Managed Wi-Fi & IT', icon: 'Wifi', showInNavbar: false },

  { slug: 'pusat-data', parent: null, title: 'Data Center', desc: 'Tier-3 Colocation Server & THC Cloud', icon: 'Database' },
  { slug: 'pusat-data/colocation', parent: 'pusat-data', title: 'Colocation Server', icon: 'Server', showInNavbar: false },
  { slug: 'pusat-data/thc-cloud', parent: 'pusat-data', title: 'THC Cloud', icon: 'Cloud', showInNavbar: false },
];

export interface ServicePageSeed {
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

/* ------------------------------------------------------------------ */

export const servicePagesSeed: ServicePageSeed[] = [
  {
    slug: 'internet',
    layout: 'CATEGORY',
    category: 'Services',
    breadcrumb: 'Internet Services',
    title: 'Internet Services',
    subtitle:
      'High-speed dedicated internet access over advanced fiber optic infrastructure, with bandwidth reserved exclusively for your organisation.',
    metaTitle: 'Internet Services | Trans Hybrid Communication',
    metaDescription:
      'High-speed dedicated fiber optic internet access with 1:1 symmetrical bandwidth, IP Transit under ASN 24534, and local peering via THC IX.',
    blocks: [
      block('INTRO', {
        title: '',
        eyebrow: 'High-Speed Dedicated Fiber Infrastructure',
        body: 'High-speed internet access service utilizing advanced Fiber Optic technology, where bandwidth is exclusively dedicated to your organization without sharing with other customers, delivering stable, high-performance, and flexible connectivity to support your enterprise growth.',
      }),
      block('CARDS', {
        style: 'accordion',
        items: [
          {
            title: 'IP Transit',
            badge: 'Global & Domestic BGP',
            icon: 'Globe',
            description:
              'A comprehensive internet routing solution for global and domestic connectivity to reference points utilizing enterprise IP and ASN, featuring Border Gateway Protocol (BGP) technical configuration for optimal path redundancy and ultra-low latency.',
            features: ['Direct Tier-1 Upstreams', 'Full BGP Routing Table', 'Sub-millisecond Latency'],
            href: '/layanan/internet/ip-transit',
            ctaLabel: 'Learn More',
          },
          {
            title: 'Dedicated Internet',
            badge: '1:1 Symmetrical Bandwidth',
            icon: 'Zap',
            description:
              'Dedicated Internet is a premium 1:1 symmetrical IP service directly peered with THC routers under ASN 24534, provisioned across all THC International gateways for guaranteed throughput and 99.9% uptime SLA.',
            features: ['100% Dedicated (No Sharing)', '99.9% SLA Guarantee', '24/7 Proactive Monitoring'],
            href: '/layanan/internet/dedicated-internet',
            ctaLabel: 'Learn More',
          },
          {
            title: 'THC IX',
            badge: 'Internet Exchange Peering',
            icon: 'Radio',
            description:
              'A high-capacity internet exchange service that optimizes domestic traffic routing, reduces upstream transit latency, and ensures resilient, high-speed direct interconnection across national peering points.',
            features: ['Direct Local Peering', 'Reduced Bandwidth Costs', 'Low Hop-Count Routing'],
            href: '/layanan/internet/thc-ix',
            ctaLabel: 'Learn More',
          },
        ],
      }),
    ],
  },

  {
    slug: 'internet/ip-transit',
    layout: 'DETAIL',
    category: 'Services \u203a Internet',
    breadcrumb: 'IP Transit',
    title: 'IP Transit (ASN 24534)',
    subtitle:
      'Carrier-grade global and domestic BGP routing solution with multi-Tier-1 upstream redundancy, 10G-100G capacity, and 24/7 certified NOC support.',
    metaTitle: 'IP Transit (ASN 24534) | Trans Hybrid Communication',
    metaDescription:
      'Carrier-grade global and domestic BGP IP Transit services under ASN 24534 with 10G-100G upstream capacity, Equinix-IX peering, and 24/7 certified NOC support.',
    blocks: [
      block('BADGES', { items: ['ASN 24534', 'BGP Multi-Homed', 'IPv4 & IPv6 Dual-Stack'] }),
      block('INTRO', {
        title: 'IP Transit (ASN 24534)',
        eyebrow: 'Carrier-Grade Global & Domestic BGP',
        body: 'IP Transit delivers a full BGP routing table for your own ASN, with direct multi-homed sessions to Tier-1 upstreams and content networks. Traffic is routed across redundant DWDM international cable systems to keep latency and packet loss at the lowest possible levels.',
      }),
      block('METRICS', {
        items: [
          { value: '10G - 100G', label: 'Backbone Capacity' },
          { value: '1 - 10 Gbps', label: 'Port Speed' },
          { value: '99.9%', label: 'Service Availability' },
          { value: '24/7/365', label: 'NOC Support' },
        ],
      }),
      block('TABS', {
        items: [
          {
            label: 'Key Advantages',
            blocks: [
              block('FEATURES', {
                heading: 'High-Capacity & Symmetrical Bandwidth',
                items: [
                  { title: 'Super Fast Bandwidth', desc: '10G to 100G port speeds with symmetrical capacity on every international gateway.', icon: 'Zap' },
                  { title: 'Full BGP Table', desc: 'Complete IPv4 and IPv6 routing tables delivered directly to your edge router.', icon: 'Network' },
                  { title: 'No Shared Capacity', desc: 'Transit ports are not oversubscribed, guaranteeing consistent throughput.', icon: 'ShieldCheck' },
                ],
              }),
              block('FEATURES', {
                heading: 'Tier-1 Upstreams & Content Peering',
                items: [
                  { title: 'Direct Tier-1 Sessions', desc: 'Peered with Cogent, Tata, TM and China Mobile at Equinix-IX and SG-IX.', icon: 'Globe' },
                  { title: 'Content Network Access', desc: 'Direct peering with Google, Meta, Microsoft and Cloudflare reduces transit cost.', icon: 'Share2' },
                  { title: 'Equinix-IX Presence', desc: 'Equinix Fabric and IX exchange fabric access for low-latency cloud on-ramp.', icon: 'Server' },
                ],
              }),
              block('FEATURES', {
                heading: 'Protocol Support & Multi-Path Redundancy',
                items: [
                  { title: 'BGP Multi-Homed', desc: 'Up to four upstream sessions with automated failover in under a minute.', icon: 'Network' },
                  { title: 'IPv4 & IPv6 Dual-Stack', desc: 'Native dual-stack sessions so your IPv6 growth needs no new contract.', icon: 'Server' },
                  { title: 'Redundant Cable Systems', desc: 'Jakabare primary and Indigo backup DWDM routes across the backbone.', icon: 'Cable' },
                ],
              }),
              block('FEATURES', {
                heading: 'Nationwide Presence & 24/7 Certified NOC',
                items: [
                  { title: '24/7 Certified NOC', desc: 'CCIE and JNCIE engineers monitoring your session around the clock.', icon: 'ServerCog' },
                  { title: 'Multiple Domestic PoPs', desc: 'Local peering points reduce hop count for Indonesian destinations.', icon: 'MapPin' },
                  { title: 'Proactive Monitoring', desc: 'Traffic, latency and error-rate telemetry with automatic escalation.', icon: 'Activity' },
                ],
              }),
            ],
          },
          {
            label: 'International IP Transit',
            blocks: [
              block('TABLE', {
                columns: [
                  { key: 'premium-protected', label: 'Premium Protected' },
                  { key: 'premium', label: 'Premium Non Protected' },
                  { key: 'standard', label: 'Standard' },
                  { key: 'lite', label: 'Lite' },
                ],
                rows: [
                  {
                    key: 'content',
                    label: 'Content / Connection',
                    cells: [
                      'Equinix-IX\nISPL\nCogent\nSingtel\nDomestik THC-IX',
                      'Equinix-IX\nISPL\nCogent\nSingtel\nDomestik THC-IX',
                      'Equinix-IX\nISPL\nCogent\nSingtel\nDomestik THC-IX',
                      'Equinix-IX\nCogent\nSingtel\nDomestik THC-IX',
                    ],
                    footnotes: ['Internet Exchange: IIX, Oixp, JKT-IX', 'Public Peering: FB, Akamai, Zenlayer, PHC, Cloudflare'],
                  },
                  {
                    key: 'cable',
                    label: 'International Cable',
                    cells: ['Redundant Cable DWDM (Jakabare Main & Indigo Backup)', 'Redundant Cable DWDM (Jakabare Main & Indigo Backup)', 'Redundant Cable DWDM (Jakabare Main & Indigo Backup)', 'Single Cable DWDM'],
                  },
                  { key: 'sharing', label: 'Sharing Ratio', cells: ['1:1', '1:1', '1:1', '70:30'] },
                  { key: 'capacity', label: 'International Capacity', cells: ['100 Gbps', '100 Gbps', '100 Gbps', '100 Gbps'] },
                  { key: 'sla', label: 'SLA', cells: ['99.8%', '99.5%', '99.5%', '99.5%'] },
                ],
              }),
            ],
          },
          {
            label: 'Domestic IP Transit',
            blocks: [
              block('TABLE', {
                columns: [
                  { key: 'premium-domestic', label: 'Premium Domestic IP Transit' },
                  { key: 'standard-domestic', label: 'Standard Domestic IP Transit' },
                ],
                rows: [
                  {
                    key: 'content',
                    label: 'Content / Connection',
                    cells: ['Domestik THC-IX\nTelkom NeuCen-IX\nBonus International SG-IX (Sharing)', 'Domestik THC-IX\nTelkom NeuCen-IX'],
                  },
                  { key: 'capacity', label: 'Capacity', cells: ['100 Gbps', '100 Gbps'] },
                  { key: 'sla', label: 'SLA', cells: ['99.5%', '99.5%'] },
                ],
              }),
            ],
          },
          {
            label: 'Topology & Architecture',
            blocks: [
              block('IMAGE', {
                src: '/assets/images/iptransit.webp',
                alt: 'IP Transit Architecture & Peering Topology',
                caption: 'Multi-homed BGP routing path from Customer Edge to Global Upstreams',
              }),
            ],
          },
        ],
      }),
      block('CTA', {
        title: 'Ready to Configure Your BGP Peering Session?',
        description:
          'Consult with our certified network engineers to obtain IP Transit bandwidth quotas, ASN cross-connects, and competitive enterprise rates.',
        label: 'Request BGP Quote',
        href: '/#faq',
      }),
    ],
  },

  {
    slug: 'internet/dedicated-internet',
    layout: 'DETAIL',
    category: 'Services \u203a Internet',
    breadcrumb: 'Dedicated Internet',
    title: 'Dedicated Internet',
    subtitle: 'Premium 1:1 symmetrical dedicated internet access with 99.9% SLA across all THC international gateways.',
    metaTitle: 'Dedicated Internet | Trans Hybrid Communication',
    metaDescription:
      'Premium 1:1 symmetrical dedicated internet access under ASN 24534 with redundant DWDM cable systems, 99.9% SLA, and 24/7 proactive monitoring.',
    blocks: [
      block('INTRO', {
        title: 'Dedicated Internet',
        eyebrow: '1:1 Symmetrical Bandwidth Enterprise Service',
        body: 'Dedicated Internet is a premium 1:1 symmetrical IP service directly peered with THC routers under ASN 24534. Bandwidth is reserved exclusively for your organisation across all THC international gateways, guaranteeing consistent throughput and 99.9% uptime regardless of neighbouring traffic.',
      }),
      block('BADGES', { items: ['ASN 24534', '1:1 Symmetrical', '99.9% SLA'] }),
      block('METRICS', {
        items: [
          { value: '1:1', label: 'Symmetrical Ratio' },
          { value: '1 - 10 Gbps', label: 'Bandwidth' },
          { value: '99.9%', label: 'Uptime SLA' },
          { value: '24/7/365', label: 'Monitoring' },
        ],
      }),
      block('TABS', {
        items: [
          {
            label: 'Advantage',
            blocks: [
              block('FEATURES', {
                items: [
                  { title: 'Super Fast Bandwidth', desc: 'Symmetrical 1:1 capacity from 1 Gbps up to 10 Gbps per port.', icon: 'Zap' },
                  { title: '99.9% SLA Guarantee', desc: 'Service credits apply when monthly availability falls below target.', icon: 'ShieldCheck' },
                  { title: 'Multi-Sector Ready', desc: 'Finance, healthcare, education, government and media workloads.', icon: 'Globe' },
                  { title: 'Latest Technology Support', desc: 'IPv4/IPv6 dual-stack and native VLAN handover supported.', icon: 'Server' },
                ],
              }),
            ],
          },
          {
            label: 'Service',
            blocks: [
              block('TABLE', {
                columns: [
                  { key: 'premium', label: 'Premium Service', highlight: true },
                  { key: 'standard', label: 'Standard Service' },
                  { key: 'burtable', label: 'Burtable Service' },
                  { key: 'lite', label: 'Lite' },
                ],
                rows: [
                  { key: 'sharing', label: 'Sharing Rasio', cells: ['1:1', '1:1', '1:1', '1:1'] },
                  {
                    key: 'connection',
                    label: 'Connection / Content',
                    cells: ['Internet Akses Dedicated\nMultiple Upstream & Tier 1', 'Internet Akses Dedicated\nSingle Upstream', 'Dual Commitment Bandwidth\nSingle Upstream', 'Fleksibel Sesuai Kebutuhan (International & Domestik)'],
                  },
                  { key: 'cable', label: 'International Cable', cells: ['Redundant Cable DWDM', 'Single Cable DWDM', 'Single Cable DWDM', 'Single Cable DWDM'] },
                  { key: 'sla', label: 'SLA', cells: ['99.8%', '99.5%', '99.5%', '99.5%'] },
                ],
              }),
            ],
          },
          {
            label: 'Topology',
            blocks: [
              block('IMAGE', { src: '/assets/images/topologi_dedicated.webp', alt: 'Dedicated Internet Topology' }),
            ],
          },
        ],
      }),
      block('CTA', {
        title: 'Ready to Deploy Dedicated Internet?',
        description: 'Speak with our enterprise team about symmetrical capacity, SLA terms, and installation scheduling.',
        label: 'Request Quote',
        href: '/#faq',
      }),
    ],
  },

  {
    slug: 'internet/thc-ix',
    layout: 'DETAIL',
    category: 'Services \u203a Internet',
    breadcrumb: 'THC IX',
    title: 'THC IX',
    subtitle: 'Neutral internet exchange peering that shortens domestic routing paths and lowers transit cost.',
    metaTitle: 'THC IX | Trans Hybrid Communication',
    metaDescription:
      'THC IX is a high-capacity internet exchange offering direct local peering, reduced bandwidth cost, and low hop-count routing across national IX points.',
    blocks: [
      block('INTRO', {
        title: 'THC IX',
        eyebrow: 'Internet Exchange Peering',
        body: 'THC IX is a high-capacity internet exchange service that optimizes domestic traffic routing, reduces upstream transit latency, and ensures resilient, high-speed direct interconnection across national peering points.',
      }),
      block('IMAGE', { src: '/assets/images/thcix.webp', alt: 'THC IX Internet Exchange Topology' }),
    ],
  },

  {
    slug: 'konektivitas',
    layout: 'CATEGORY',
    category: 'Services',
    breadcrumb: 'Connectivity Services',
    title: 'Connectivity Services',
    subtitle: 'Carrier-grade global and domestic private links built on DWDM and Carrier Ethernet infrastructure.',
    metaTitle: 'Connectivity Services | Trans Hybrid Communication',
    metaDescription:
      'IPLC, IEPL, local-loop Metro Ethernet and Inter Data Center Backbone for carrier-grade private connectivity.',
    blocks: [
      block('INTRO', {
        title: '',
        eyebrow: 'Carrier-Grade Global & Domestic Private Links',
        body: 'THC delivers private connectivity over an extensive fiber optic backbone spanning international gateways, metropolitan rings, and inter-city loops. Every link can be engineered with redundant paths, protected handover, and 24/7 monitoring by our Network Operations Center.',
      }),
      block('CARDS', {
        style: 'accordion',
        items: [
          {
            title: 'IPLC',
            shortTitle: 'IPLC',
            badge: 'Point-to-Point DWDM',
            icon: 'Cable',
            description:
              'International Private Leased Circuit provides a dedicated point-to-point DWDM path with the highest security level for your organisation, connecting offices across countries over redundant Jakabare and Indigo backbone systems.',
            features: ['Point-to-point DWDM', '100 Gbps capacity', 'Redundant backbone', '24/7 NOC support'],
            href: '/layanan/konektivitas/iplc',
            ctaLabel: 'Inquire Solution',
          },
          {
            title: 'IEPL',
            shortTitle: 'IEPL',
            badge: 'Layer-2 Carrier Ethernet',
            icon: 'Network',
            description:
              'International Ethernet Private Line delivers a transparent Layer-2 private network over dedicated fiber optic, ideal for applications that require full protocol control and consistent low-latency data transfer.',
            features: ['Layer-2 transparency', 'Point-to-point and multipoint', 'Scalable bandwidth', '24/7 NOC support'],
            href: '/layanan/konektivitas/iepl',
            ctaLabel: 'Inquire Solution',
          },
          {
            title: 'Metro Ethernet',
            badge: 'Inner & Inter City Loop',
            icon: 'GitBranch',
            description:
              'Local-Loop Metro Ethernet connects multiple branches within a city or across cities with flexible bandwidth allocation, high availability, and the security of a private network.',
            features: ['Flexible bandwidth allocation', 'Multi-branch capable', 'Inner & inter city loop', '24/7 NOC support'],
            href: '/layanan/konektivitas/metro-ethernet',
            ctaLabel: 'Inquire Solution',
          },
          {
            title: 'IDCB',
            badge: 'Data Center Interconnect',
            icon: 'Share2',
            description:
              'Inter Data Center Backbone links your colocation space directly to THC Cloud and partner data centers with predictable latency and protected routes.',
            features: ['Data center interconnect', 'Predictable latency', 'Protected handover', 'Direct cloud access'],
            href: '/layanan/konektivitas/idcb',
            ctaLabel: 'Inquire Solution',
          },
        ],
      }),
    ],
  },

  {
    slug: 'konektivitas/iplc',
    layout: 'DETAIL',
    category: 'Services \u203a Connectivity',
    breadcrumb: 'IPLC',
    title: 'International Private Leased Circuit (IPLC)',
    subtitle: 'Point-to-point DWDM private link with redundant backbone protection and real-time transfer speed.',
    metaTitle: 'IPLC | Trans Hybrid Communication',
    metaDescription:
      'International Private Leased Circuit (IPLC) with redundant DWDM backbone (Jakabare & Indigo), up to 100 Gbps capacity, and 24/7 NOC monitoring.',
    blocks: [
      block('INTRO', {
        title: 'International Private Leased Circuit (IPLC)',
        eyebrow: 'Point-to-Point DWDM Private Link',
        body: 'IPLC is a dedicated point-to-point connection carried over DWDM wavelengths on our international backbone. Because the circuit is exclusive to your organisation, data never traverses shared infrastructure, giving you consistent throughput and the highest level of confidentiality.',
      }),
      block('METRICS', {
        items: [
          { value: '100G', label: 'Capacity' },
          { value: 'Point-to-Point', label: 'Topology' },
          { value: 'DWDM', label: 'Technology' },
          { value: '99.9%', label: 'Availability' },
        ],
      }),
      block('TABS', {
        items: [
          {
            label: 'Features',
            blocks: [
              block('FEATURES', {
                items: [
                  { title: 'High-Level Security', desc: 'Private, dedicated circuit with no shared access at any point.', icon: 'ShieldCheck' },
                  { title: 'Redundant Backbone', desc: 'Dual DWDM cable system across Jakabare main and Indigo backup routes.', icon: 'Cable' },
                  { title: '100 Gbps Capacity', desc: 'DWDM wavelengths scalable up to 100 Gbps per circuit.', icon: 'Zap' },
                  { title: 'Real-Time Transfer Speed', desc: 'Consistent throughput with no contention from other customers.', icon: 'Activity' },
                  { title: 'Tailored To Your Needs', desc: 'Bandwidth, SLA, and protection profile configured per customer.', icon: 'Layers' },
                  { title: 'High Network Availability', desc: 'Protected handover with 24/7 monitoring by our NOC team.', icon: 'ServerCog' },
                ],
              }),
            ],
          },
          {
            label: 'Topology',
            blocks: [
              block('IMAGE', { src: '/assets/images/topologi_iplc_jkt.webp', alt: 'IPLC Jakarta Topology' }),
            ],
          },
        ],
      }),
      block('CTA', {
        title: 'Need a Dedicated IPLC Connection?',
        description: 'Tell us your endpoints and required capacity, and our team will propose the ideal protected route.',
        label: 'Inquire Solution',
        href: '/#faq',
      }),
    ],
  },

  {
    slug: 'konektivitas/iepl',
    layout: 'DETAIL',
    category: 'Services \u203a Connectivity',
    breadcrumb: 'IEPL',
    title: 'International Ethernet Private Line',
    subtitle: 'Layer-2 Carrier Ethernet private line with transparent protocol control and mission-critical reliability.',
    metaTitle: 'IEPL | Trans Hybrid Communication',
    metaDescription:
      'International Ethernet Private Line (IEPL) over dedicated fiber optic with Layer-2 transparency, scalable bandwidth, and 24/7 NOC support.',
    blocks: [
      block('INTRO', {
        title: 'International Ethernet Private Line (IEPL)',
        eyebrow: 'Layer-2 Carrier Ethernet Private Line',
        body: 'IEPL carries your traffic as a transparent Layer-2 service across dedicated fiber optic. You keep full control over routing protocols, broadcast domains, and encapsulation, which makes it suitable for consolidation, storage replication, and any application that depends on predictable behaviour.',
      }),
      block('METRICS', {
        items: [
          { value: 'Point-to-Point', label: 'Topology' },
          { value: 'Layer-2', label: 'Service' },
          { value: 'MPLS', label: 'Transport' },
          { value: '24/7', label: 'Support' },
        ],
      }),
      block('TABS', {
        items: [
          {
            label: 'Features',
            blocks: [
              block('FEATURES', {
                items: [
                  { title: 'Reliable Private Connectivity', desc: 'Point-to-point and multipoint Layer-2 connectivity with stable jitter.', icon: 'Network' },
                  { title: 'Dedicated Fiber Optic', desc: 'No shared media; your frames travel only across dedicated wavelengths.', icon: 'Cable' },
                  { title: 'Critical App Performance', desc: 'Guaranteed security and speed for one-way real-time applications.', icon: 'ShieldCheck' },
                  { title: 'Elastic Bandwidth', desc: 'Increase capacity during traffic peaks without waiting for new provisioning.', icon: 'Zap' },
                  { title: 'Cost Efficiency', desc: 'Consolidate multiple circuits onto one Carrier Ethernet handoff.', icon: 'BadgeDollarSign' },
                  { title: '24/7 NOC Coverage', desc: 'Round-the-clock monitoring and incident response by our NOC team.', icon: 'ServerCog' },
                ],
              }),
            ],
          },
          {
            label: 'Topology',
            blocks: [
              block('IMAGE', { src: '/assets/images/topologi_iepl.webp', alt: 'IEPL Topology' }),
            ],
          },
        ],
      }),
      block('CTA', {
        title: 'Need an IEPL Connection?',
        description: 'Share your bandwidth and latency requirements for a tailored Layer-2 proposal.',
        label: 'Inquire Solution',
        href: '/#faq',
      }),
    ],
  },

  {
    slug: 'konektivitas/metro-ethernet',
    layout: 'DETAIL',
    category: 'Services \u203a Connectivity',
    breadcrumb: 'Metro Ethernet',
    title: 'Local-Loop Metro Ethernet (INNER & INTER CITY)',
    subtitle: 'Inner and inter-city fiber loop connecting multiple branches with flexible bandwidth allocation.',
    metaTitle: 'Local-Loop Metro Ethernet | Trans Hybrid Communication',
    metaDescription:
      'Local-Loop Metro Ethernet for inner and inter city connectivity with flexible bandwidth allocation, high stability, private-network security, and 24/7 NOC support.',
    blocks: [
      block('INTRO', {
        title: 'Local-Loop Metro Ethernet (INNER & INTER CITY)',
        eyebrow: 'Inner & Inter City Fiber Loop',
        body: 'Local-Loop Metro Ethernet extends Carrier Ethernet across a metropolitan ring and between nearby cities, letting you connect branches, retail outlets, or CCTV sites back to your head office with predictable performance.',
      }),
      block('METRICS', {
        items: [
          { value: 'Fiber Grid', label: 'Infrastructure' },
          { value: 'Sub-ms', label: 'Latency' },
          { value: 'Multi-Branch', label: 'Topology' },
          { value: '24/7', label: 'Support' },
        ],
      }),
      block('TABS', {
        items: [
          {
            label: 'Features',
            blocks: [
              block('FEATURES', {
                items: [
                  { title: 'Flexible Bandwidth', desc: 'Allocate capacity per site and adjust as demand changes.', icon: 'Zap' },
                  { title: 'Large Capacity', desc: 'Aggregate branch traffic onto high-capacity uplink ports.', icon: 'Server' },
                  { title: 'High Connection Stability', desc: 'Ring-protected design removes single points of failure.', icon: 'Network' },
                  { title: 'Private-Network Security', desc: 'Completely private service with no exposure to the public internet.', icon: 'ShieldCheck' },
                  { title: 'Cost Efficiency', desc: 'Replace multiple leased lines with a single managed network.', icon: 'BadgeDollarSign' },
                  { title: '24/7 NOC Support', desc: 'Continuous monitoring and rapid fault handling by our NOC team.', icon: 'ServerCog' },
                ],
              }),
            ],
          },
          {
            label: 'Topology',
            blocks: [
              block('IMAGE', { src: '/assets/images/topologi_metro_e.webp', alt: 'Metro Ethernet Topology' }),
            ],
          },
        ],
      }),
      block('CTA', {
        title: 'Need a Metro Ethernet Connection?',
        description: 'Send us your branch list and we will map the optimal ring and bandwidth plan.',
        label: 'Inquire Solution',
        href: '/#faq',
      }),
    ],
  },

  {
    slug: 'konektivitas/idcb',
    layout: 'DETAIL',
    category: 'Services \u203a Connectivity',
    breadcrumb: 'IDCB',
    title: 'Inter Data Center Backbone (IDCB)',
    subtitle: 'Data center interconnect linking colocation space to THC Cloud and partner facilities.',
    metaTitle: 'Inter Data Center Backbone (IDCB) | Trans Hybrid Communication',
    metaDescription:
      'Inter Data Center Backbone (IDCB) connects your colocation space to THC Cloud and partner data centers with predictable low latency.',
    blocks: [
      block('INTRO', {
        title: 'Inter Data Center Backbone (IDCB)',
        eyebrow: 'Data Center Interconnect',
        body: 'IDCB extends our backbone between data center facilities, so workloads hosted in our colocation space can reach THC Cloud resources and partner data centers without leaving our protected network. Replication, storage, and hybrid architectures benefit from consistent latency and no public-internet exposure.',
      }),
      block('IMAGE', { src: '/assets/images/idcb.webp', alt: 'Inter Data Center Backbone Topology' }),
    ],
  },

  {
    slug: 'pusat-data',
    layout: 'CATEGORY',
    category: 'Services',
    breadcrumb: 'Data Center',
    title: 'Data Center Services',
    subtitle: 'Tier-3 high-security colocation and private enterprise hybrid cloud services.',
    metaTitle: 'Data Center Services | Trans Hybrid Communication',
    metaDescription:
      'Tier-3 colocation server space with redundant power and cooling, plus THC Cloud private and enterprise hybrid cloud with dedicated VPC.',
    blocks: [
      block('INTRO', {
        title: '',
        eyebrow: 'Tier-3 High-Security Enterprise Colocation & Cloud',
        body: 'THC operates a Tier-3 data center facility in Jakarta with redundant power and precision cooling, biometric and CCTV access control, and direct cross-connection to our low-latency backbone. For customers who need more than rack space, our private and hybrid cloud is available in the same facility.',
      }),
      block('CARDS', {
        style: 'grid',
        items: [
          {
            title: 'Colocation Server',
            badge: 'Tier-3 Data Center Space',
            icon: 'Server',
            description: 'Place your servers in a Tier-3 facility with redundant power, precision cooling, biometric access control, and direct cross-connect to the THC backbone.',
            features: [
              'Tier-3 Redundant Power & Precision Cooling (2N)',
              '24/7/365 On-site Biometrics & CCTV Surveillance',
              'Direct Cross-Connect to THC Low-Latency Backbone',
            ],
            href: '/layanan/pusat-data/colocation',
            ctaLabel: 'Reserve Rack Space / Cloud',
          },
          {
            title: 'THC Cloud',
            badge: 'Private & Enterprise Hybrid Cloud',
            icon: 'Cloud',
            description: 'Private and enterprise hybrid cloud with high-performance distributed storage, automated disaster recovery, and granular access controls.',
            features: [
              'High-Performance NVMe Distributed Storage',
              'Automated Disaster Recovery & Instant Snapshots',
              'Dedicated VPC with Granular Access Controls',
            ],
            href: '/layanan/pusat-data/thc-cloud',
            ctaLabel: 'Reserve Rack Space / Cloud',
          },
        ],
      }),
    ],
  },

  {
    slug: 'pusat-data/colocation',
    layout: 'DETAIL',
    category: 'Services \u203a Data Center',
    breadcrumb: 'Colocation Server',
    title: 'Colocation Server',
    subtitle: 'Tier-3 colocation space with redundant power, precision cooling, and 24/7 physical security.',
    metaTitle: 'Colocation Server | Trans Hybrid Communication',
    metaDescription:
      'Tier-3 colocation server space with redundant power and cooling, on-site biometrics and CCTV, and direct cross-connect to the THC low-latency backbone.',
    blocks: [
      block('INTRO', {
        title: 'Colocation Server',
        eyebrow: 'Tier-3 Data Center Space',
        body: 'Our Tier-3 facility is designed for enterprise workloads that cannot tolerate unplanned downtime. Redundant power feeds and precision cooling are engineered so your servers keep running through any single component failure, while biometric access control and CCTV coverage protect the physical environment.',
      }),
      block('FEATURES', {
        heading: 'Colocation Server Features',
        items: [
          { title: 'Fleksibilitas untuk Scale Up', desc: 'Add racks, power, and cross-connects as your footprint grows.', icon: 'ArrowRight' },
          { title: 'Pilihan Interkonektivitas', desc: 'Single cross-connect to THC backbone, cloud, and partner carriers.', icon: 'ShieldCheck' },
          { title: 'Keandalan untuk Uptime', desc: 'Redundant power and cooling engineered for continuous availability.', icon: 'ServerCog' },
          { title: 'Keamanan data yang terjamin', desc: 'Biometric access control, CCTV surveillance, and logged entry records.', icon: 'Lock' },
          { title: 'Efisiensi biaya untuk perusahaan', desc: 'Enterprise-grade facility without the capital cost of your own data center.', icon: 'BadgeDollarSign' },
        ],
      }),
      block('CTA', {
        title: 'Reserve Rack Space?',
        description: 'Our team will survey your power, cooling, and connectivity requirements before handing over your rack.',
        label: 'Inquire Solution',
        href: '/#faq',
      }),
    ],
  },

  {
    slug: 'pusat-data/thc-cloud',
    layout: 'DETAIL',
    category: 'Services \u203a Data Center',
    breadcrumb: 'THC Cloud',
    title: 'THC Cloud',
    subtitle: 'Private and enterprise hybrid cloud with high-performance storage and granular access controls.',
    metaTitle: 'THC Cloud | Trans Hybrid Communication',
    metaDescription:
      'THC Cloud private and enterprise hybrid cloud with NVMe distributed storage, automated disaster recovery, and dedicated VPC access controls.',
    blocks: [
      block('INTRO', {
        title: 'THC Cloud',
        eyebrow: 'Private & Enterprise Hybrid Cloud',
        body: 'THC Cloud runs in the same Tier-3 facility as our colocation services, so moving from rack space to cloud is a network change rather than a migration project. Dedicated VPCs, distributed NVMe storage, and automated snapshots give your team control comparable to on-premises infrastructure.',
      }),
      block('IMAGE', { src: '/assets/images/thcloud.webp', alt: 'THC Cloud Architecture' }),
      block('FEATURES', {
        heading: 'THC Cloud Features',
        items: [
          { title: 'Fleksibilitas', desc: 'Scale compute and storage on demand without new hardware procurement.', icon: 'Layers' },
          { title: 'Keamanan data yang tinggi', desc: 'Dedicated VPC with granular access controls and encryption at rest.', icon: 'ShieldCheck' },
          { title: 'Ketepatan dalam pengaturan', desc: 'Full control over network policy, routing, and resource quotas.', icon: 'Zap' },
          { title: 'Penghematan biaya dengan mudah', desc: 'Consolidate idle capacity and pay only for what you consume.', icon: 'BadgeDollarSign' },
        ],
      }),
      block('CTA', {
        title: 'Migrate to THC Cloud?',
        description: 'We will assess your current estate and propose a staged migration plan.',
        label: 'Inquire Solution',
        href: '/#faq',
      }),
    ],
  },

  {
    slug: 'solusi/layanan-terkelola',
    layout: 'CATEGORY',
    category: 'Services \u203a Solutions',
    breadcrumb: 'Managed Services',
    title: 'Managed Services',
    subtitle: '24/7 proactive monitoring and enterprise IT operations for CPE, wireless, and network operations.',
    metaTitle: 'Managed Services | Trans Hybrid Communication',
    metaDescription:
      '24/7 managed CPE, enterprise Wi-Fi and IT operations with proactive monitoring, zero-touch provisioning, and NOC-backed support.',
    blocks: [
      block('INTRO', {
        title: '',
        eyebrow: '24/7 Proactive Monitoring & Enterprise IT Operations',
        body: 'Our managed services team takes responsibility for the equipment and infrastructure inside your premises. From zero-touch provisioning and firmware patching to wireless optimisation and NOC-backed incident response, everything is handled by certified engineers on a 24/7 basis.',
      }),
      block('CARDS', {
        style: 'grid',
        items: [
          {
            title: 'Managed CPE (Customer Premises Equipment)',
            badge: 'Hardware & Lifecycle Management',
            icon: 'Router',
            description: 'We design, deploy, and maintain the customer premises equipment that connects your site to the THC backbone.',
            features: [
              'Zero-Touch Provisioning & Deployment',
              'Continuous Firmware & Security Patching',
              'Hardware Replacement & SLA Guarantees',
            ],
            href: '/layanan/solusi/layanan-terkelola/managed-cpe',
            ctaLabel: 'Consult with NOC Engineer',
          },
          {
            title: 'Managed Wi-Fi & IT Operations',
            badge: '24/7 Wireless & Infrastructure NOC',
            icon: 'Wifi',
            description: 'Design, deploy, and operate enterprise wireless and supporting IT infrastructure with continuous NOC monitoring.',
            features: [
              'Seamless Multi-SSID Enterprise Roaming',
              'Captive Portal & RADIUS Guest Authentication',
              'Real-Time RF Channel Optimisation',
            ],
            href: '/layanan/solusi/layanan-terkelola/managed-wifi',
            ctaLabel: 'Consult with NOC Engineer',
          },
        ],
      }),
      block('INTRO', {
        title: 'Network Flow & Telemetry Architecture',
        eyebrow: 'Proactive Observability',
        body: 'Every managed service is instrumented end to end: flow records, interface counters, wireless client telemetry, and device health are collected continuously so our NOC engineers can detect degradation before your users notice it.',
        image: '/assets/images/topologi-manage-service.webp',
        imageAlt: 'Network Flow & Telemetry Architecture',
      }),
    ],
  },

  {
    slug: 'solusi/layanan-terkelola/managed-cpe',
    layout: 'DETAIL',
    category: 'Services \u203a Solutions',
    breadcrumb: 'Managed CPE',
    title: 'Managed CPE (Customer Premises Equipment)',
    subtitle: 'Customer premises equipment designed, deployed, and maintained by our provider.',
    metaTitle: 'Managed CPE | Trans Hybrid Communication',
    metaDescription:
      'Managed CPE with high-security private paths, real-time transfer speed, provider-managed IT operations, and 24/7 NOC coverage.',
    blocks: [
      block('INTRO', {
        title: 'Managed CPE',
        eyebrow: 'Customer Premises Equipment',
        body: 'Managed CPE covers the routers, switches, and firewall equipment sitting on your premises. We select hardware appropriate to your bandwidth and redundancy requirements, provision it remotely, and keep it patched and monitored for the life of the contract.',
      }),
      block('TABS', {
        items: [
          {
            label: 'Features',
            blocks: [
              block('FEATURES', {
                items: [
                  { title: 'High-Level Security', desc: 'Protected private path with no shared infrastructure segments.', icon: 'ShieldCheck' },
                  { title: 'Real-Time Transfer Speed', desc: 'Consistent throughput for voice, video, and bulk transfer.', icon: 'Activity' },
                  { title: 'Provider-Managed IT', desc: 'Configuration, patching, and incident handling handled by THC.', icon: 'ServerCog' },
                  { title: 'Tailored To Your Needs', desc: 'Hardware and protection profile matched to your site.', icon: 'Layers' },
                  { title: 'High Network Availability', desc: 'Redundant hardware options with 24/7 NOC monitoring.', icon: 'Network' },
                ],
              }),
            ],
          },
          {
            label: 'Our Process Support',
            blocks: [
              block('PROCESS', {
                items: [
                  { title: 'Site Survey', desc: 'Our engineers survey power, space, and existing cabling before proposing hardware.' },
                  { title: 'Hardware Staging', desc: 'Devices are configured, imaged, and tested in our facility before dispatch.' },
                  { title: 'Zero-Touch Deployment', desc: 'On site, devices power up and pull their configuration automatically.' },
                  { title: '24/7 Operations', desc: 'NOC engineers monitor, patch, and replace hardware under SLA.' },
                ],
              }),
            ],
          },
        ],
      }),
      block('IMAGE', { src: '/assets/images/cpe.webp', alt: 'Managed CPE Topology' }),
      block('CTA', {
        title: 'Need Managed CPE Deployment?',
        description: 'Our team will survey your site and recommend the right hardware and protection profile.',
        label: 'Inquire Solution',
        href: '/#faq',
      }),
    ],
  },

  {
    slug: 'solusi/layanan-terkelola/managed-wifi',
    layout: 'DETAIL',
    category: 'Services \u203a Solutions',
    breadcrumb: 'Managed Wi-Fi & IT',
    title: 'Managed Wi-Fi & IT',
    subtitle: '24/7 wireless and infrastructure NOC for enterprise campuses, hotels, and retail sites.',
    metaTitle: 'Managed Wi-Fi & IT | Trans Hybrid Communication',
    metaDescription:
      'Managed Wi-Fi and IT operations with reliable private connectivity, dedicated fiber optic backhaul, and 24/7 NOC monitoring.',
    blocks: [
      block('INTRO', {
        title: 'Managed Wi-Fi & IT',
        eyebrow: '24/7 Wireless & Infrastructure NOC',
        body: 'We design, deploy, and operate enterprise wireless networks together with the infrastructure that supports them: switching, cabling, guest access, and monitoring. Our engineers tune the radio plan based on real client telemetry rather than relying on default settings.',
      }),
      block('TABS', {
        items: [
          {
            label: 'Features',
            blocks: [
              block('FEATURES', {
                items: [
                  { title: 'Reliable Private Connectivity', desc: 'Dedicated fiber optic backhaul for every access point.', icon: 'Network' },
                  { title: 'Guaranteed Speed', desc: 'Consistent performance for mission-critical applications.', icon: 'Zap' },
                  { title: 'Guest Authentication', desc: 'Captive portal and RADIUS support for visitor access.', icon: 'ShieldCheck' },
                  { title: 'Cost Efficiency', desc: 'Centralised operations reduce on-site support overhead.', icon: 'BadgeDollarSign' },
                  { title: '24/7 NOC Coverage', desc: 'Continuous monitoring and rapid fault handling.', icon: 'ServerCog' },
                ],
              }),
            ],
          },
          {
            label: 'Our Process Support',
            blocks: [
              block('PROCESS', {
                items: [
                  { title: 'RF Site Survey', desc: 'Predictive and on-site surveys determine the correct access point count and placement.' },
                  { title: 'Network Design', desc: 'Controller, switching, and cabling design produced around your building layout.' },
                  { title: 'Deployment & Tuning', desc: 'Hardware installed, then channels and power tuned from live client telemetry.' },
                  { title: '24/7 Operations', desc: 'NOC engineers watch client experience and intervene before users escalate.' },
                ],
              }),
            ],
          },
        ],
      }),
      block('IMAGE', { src: '/assets/images/wifit.webp', alt: 'Managed Wi-Fi Topology' }),
      block('CTA', {
        title: 'Need Managed Wi-Fi & IT?',
        description: 'Book a consultation with our NOC engineers to review your wireless requirements.',
        label: 'Inquire Solution',
        href: '/#faq',
      }),
    ],
  },

  {
    slug: 'solusi/solusi-terkelola',
    layout: 'CATEGORY',
    category: 'Services \u203a Solutions',
    breadcrumb: 'Managed Solutions',
    title: 'Managed Solutions',
    subtitle: 'Industry-specific digital ecosystems for hospitality and education.',
    metaTitle: 'Managed Solutions | Trans Hybrid Communication',
    metaDescription:
      'Managed digital solutions for hospitality and education, including smart room IoT, high-density guest Wi-Fi, LMS integration, and campus-wide wireless.',
    blocks: [
      block('INTRO', {
        title: '',
        eyebrow: 'Industry-Specific Digital Ecosystems',
        body: 'Beyond connectivity, we deliver managed digital solutions built around how your industry actually operates. Our system integration teams combine network infrastructure, CCTV, hotspot, and IPTV into one operating environment maintained by our engineers.',
      }),
      block('CARDS', {
        style: 'grid',
        items: [
          {
            title: 'Hospitality Solutions',
            badge: 'Hotels, Resorts & Tourism',
            icon: 'Hotel',
            description: 'A complete digital ecosystem for hotels and resorts: smart room control, in-room IPTV, PMS integration, and high-density guest Wi-Fi.',
            features: [
              'Smart Room IoT & IPTV Integration',
              'High-Density Guest Wi-Fi & Bandwidth Shaping',
              'PMS & Automated Booking System Integration',
            ],
            href: '/layanan/solusi/solusi-terkelola/hospitality-solutions',
            ctaLabel: 'Request Custom Proposal',
          },
          {
            title: 'Education Solutions',
            badge: 'Universities & K-12 Schools',
            icon: 'GraduationCap',
            description: 'Campus-wide wireless and digital classroom support designed for schools and universities, with content filtering and centralised administration.',
            features: [
              'Campus-Wide High-Density Wireless',
              'LMS & Smart Classroom Digital Support',
              'Safe Browsing & Content Filtering Policies',
            ],
            href: '/layanan/solusi/solusi-terkelola/education-solutions',
            ctaLabel: 'Request Custom Proposal',
          },
        ],
      }),
    ],
  },

  {
    slug: 'solusi/solusi-terkelola/hospitality-solutions',
    layout: 'DETAIL',
    category: 'Services \u203a Solutions \u203a Managed Solutions',
    breadcrumb: 'Hospitality Solutions',
    title: 'Hospitality Solutions',
    subtitle: 'Hotels, resorts, and tourism digital ecosystem built on managed infrastructure.',
    metaTitle: 'Hospitality Solutions | Trans Hybrid Communication',
    metaDescription:
      'Hospitality digital ecosystem with smart room IoT, IPTV integration, PMS connectivity, and high-density guest Wi-Fi with bandwidth shaping.',
    blocks: [
      block('INTRO', {
        title: 'Hospitality Solutions',
        eyebrow: 'Hotels, Resorts & Tourism Digital Ecosystem',
        body: 'Guests judge a property on the technology they cannot see. We connect every room, back-office system, and outdoor area into one managed environment so your team can focus on service rather than troubleshooting individual devices.',
      }),
      block('TABS', {
        items: [
          {
            label: 'Hospitality Needs',
            blocks: [
              block('IMAGE', { src: '/assets/images/topologi-hospitality.webp', alt: 'Hospitality Solutions Topology' }),
            ],
          },
          {
            label: 'Our Process Support',
            blocks: [
              block('IMAGE', { src: '/assets/images/support-hospitality.webp', alt: 'Hospitality Support Process' }),
            ],
          },
        ],
      }),
      block('CTA', {
        title: 'Build a Smart Hospitality Experience?',
        description: 'Our hospitality team will map your property and propose a phased rollout.',
        label: 'Inquire Solution',
        href: '/#faq',
      }),
    ],
  },

  {
    slug: 'solusi/solusi-terkelola/education-solutions',
    layout: 'DETAIL',
    category: 'Services \u203a Solutions \u203a Managed Solutions',
    breadcrumb: 'Education Solutions',
    title: 'Education Solutions',
    subtitle: 'Universities and K-12 smart school digital ecosystem with campus-wide wireless.',
    metaTitle: 'Education Solutions | Trans Hybrid Communication',
    metaDescription:
      'University and K-12 smart school solutions: campus-wide high-density wireless, LMS and smart classroom support, content filtering, and centralised dashboards.',
    blocks: [
      block('INTRO', {
        title: 'Education Solutions',
        eyebrow: 'Universities & K-12 Smart Schools',
        body: 'Education Service Solution delivers a managed digital environment for schools and universities: high-density campus wireless, digital classroom support, LMS integration, and centralised administration with safe browsing policies.',
      }),
      block('INTRO', {
        title: 'Education Service Solution',
        eyebrow: 'Learning Environment Digital Support',
        body: 'Our education service solution connects learning management systems, digital classroom equipment, campus network infrastructure, and administrative reporting into one ecosystem maintained by our engineers.',
      }),
      block('FEATURES', {
        heading: 'Smart School Benefits',
        items: [
          { title: 'Go Green Go Paperless', desc: 'Digital documents and workflows reduce printing and physical archiving.', icon: 'Leaf' },
          { title: 'Penghematan Biaya', desc: 'Centralised infrastructure lowers total cost of ownership per campus.', icon: 'PiggyBank' },
          { title: 'Mobile Application', desc: 'Students and staff access learning resources from any device.', icon: 'Smartphone' },
          { title: 'School Dashboard System', desc: 'Centralised monitoring of network and service health.', icon: 'LayoutDashboard' },
          { title: 'Kapanpun & dimanapun', desc: 'Reliable access for staff, students, and parents at any time.', icon: 'Clock4' },
          { title: 'Terintegrasi E-learning', desc: 'Direct integration with your existing learning management system.', icon: 'Sparkles' },
          { title: 'Transparasi Data', desc: 'Consolidated reporting on usage, incidents, and performance.', icon: 'Eye' },
          { title: 'Keamanan Data', desc: 'Access controls and safe browsing policies across the campus.', icon: 'Lock' },
        ],
      }),
    ],
  },
];
