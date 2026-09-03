'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { select } from 'd3-selection';
import 'd3-transition';
import { zoom, zoomIdentity, type ZoomBehavior } from 'd3-zoom';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import { Minus, Plus, LocateFixed, X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { networkCables, networkNodes, type NetworkNode } from './networkData';


const VB_W = 680;
const VB_H = 430;

const HK_INSET = { x: 494, y: 52, w: 166, h: 112 };
const HK_POS = { x: HK_INSET.x + 62, y: HK_INSET.y + 56 };
const HK_ANCHOR = { x: HK_INSET.x + 40, y: HK_INSET.y + HK_INSET.h };

interface Pt {
  x: number;
  y: number;
}

const curvePath = (a: Pt, b: Pt) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * len * 0.18;
  const cy = my + ny * len * 0.18;
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
};

type TopoLike = {
  type: string;
  objects: { countries: { type: string; geometries: unknown[] } };
  arcs: unknown[];
};

type Filter = 'all' | 'gateway' | 'pop';

const legendItems: { label: string; shape: 'rect' | 'circle' | 'dash' | 'line'; color: string }[] = [
  { label: 'Gateway', shape: 'rect', color: '#4FA8FF' },
  { label: 'Point of Presence', shape: 'circle', color: '#FFD500' },
  { label: 'Submarine cable', shape: 'dash', color: '#FF6B5B' },
  { label: 'Inland cable', shape: 'line', color: '#4CD07D' },
];

export default function NetworkMap() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [svgWidth, setSvgWidth] = useState(VB_W);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const geometry = useMemo(() => {
    const topo = worldAtlas as unknown as TopoLike;
    const coll = feature(topo as never, (topo as never as { objects: { countries: never } }).objects.countries) as {
      features?: { properties?: { name?: string } }[];
    };
    const all = coll?.features ?? [];
    const names = new Set(['Indonesia', 'Malaysia', 'Brunei', 'Philippines']);
    return all.filter((f) => names.has(f?.properties?.name ?? ''));
  }, []);

  const projection = useMemo(() => {
    const region = { type: 'FeatureCollection', features: geometry };
    return geoMercator().fitExtent(
      [
        [18, 14],
        [662, 416],
      ],
      region as never
    );
  }, [geometry]);

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  const countryPaths = useMemo(() => {
    const paths: string[] = [];
    geometry.forEach((f) => {
      const d = pathGenerator(f as never);
      if (d) paths.push(d);
    });
    return paths;
  }, [geometry, pathGenerator]);

  const nodePos = useMemo(() => {
    const map: Record<string, Pt> = {};
    for (const n of networkNodes) {
      if (n.isInset) {
        map[n.id] = HK_POS;
        continue;
      }
      const p = projection([n.lng, n.lat]);
      if (p) map[n.id] = { x: p[0], y: p[1] };
    }
    return map;
  }, [projection]);

  const cablePaths = useMemo(() => {
    const list: { id: string; d: string; kind: 'submarine' | 'inland' }[] = [];
    for (const c of networkCables) {
      const a = nodePos[c.from];
      const b = c.to === 'hongkong' ? HK_ANCHOR : nodePos[c.to];
      if (!a || !b) continue;
      const d =
        c.kind === 'submarine'
          ? curvePath(a, b)
          : `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
      list.push({ id: `${c.from}-${c.to}`, d, kind: c.kind });
    }
    return list;
  }, [nodePos]);

  const nodeById = useMemo(() => new Map(networkNodes.map((n) => [n.id, n])), []);
  const hkConnector = useMemo(() => {
    const s = nodePos['singapore'];
    return s ? curvePath(s, HK_ANCHOR) : '';
  }, [nodePos]);

  // d3-zoom: pan + wheel/pinch zoom
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const zb = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 12])
      .on('zoom', (event) => {
        const t = event as { transform: { x: number; y: number; k: number } };
        setTransform(t.transform);
      });
    zoomBehaviorRef.current = zb;
    const selection = select(svg);
    (selection as any).call(zb);
    return () => {
      selection.on('.zoom', null);
    };
  }, []);

  // measure rendered svg width for overlay positioning
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const update = () => setSvgWidth(svg.clientWidth || VB_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const zoomBy = (factor: number) => {
    const svg = svgRef.current;
    if (!svg || !zoomBehaviorRef.current) return;
    (select(svg).transition().duration(250) as any).call(
      (zoomBehaviorRef.current as any).scaleBy,
      factor
    );
  };

  const resetZoom = () => {
    const svg = svgRef.current;
    if (!svg || !zoomBehaviorRef.current) return;
    (select(svg).transition().duration(300) as any).call(
      (zoomBehaviorRef.current as any).transform,
      zoomIdentity
    );
    setTransform({ x: 0, y: 0, k: 1 });
  };

  const toScreen = useCallback(
    (x: number, y: number): Pt => {
      const s = svgWidth / VB_W;
      return { x: (x * transform.k + transform.x) * s, y: (y * transform.k + transform.y) * s };
    },
    [svgWidth, transform]
  );

  const isMobile = svgWidth < 560;

  const visibleNodes = useMemo(() => {
    const filtered = networkNodes.filter((n) => (filter === 'all' ? true : n.type === filter));
    return filtered.map((n) => ({
      node: n,
      pos: nodePos[n.id],
      labelHidden: isMobile && n.mobileLabel === false,
    }));
  }, [filter, nodePos, isMobile]);

  const activeNode = activeId ? nodeById.get(activeId) : null;
  const selectedNode = selectedId ? nodeById.get(selectedId) : null;

  const tooltipPos = useMemo(() => {
    if (!activeNode) return null;
    const p = nodePos[activeNode.id];
    if (!p) return null;
    return toScreen(p.x, p.y);
  }, [activeNode, nodePos, toScreen]);

  const markerEvents = useCallback(
    (id: string) => ({
      tabIndex: 0,
      role: 'button',
      'aria-label': `${nodeById.get(id)?.city ?? id} - ${
        nodeById.get(id)?.type === 'gateway' ? 'Gateway' : 'Point of Presence'
      }`,
      onMouseEnter: () => setActiveId(id),
      onMouseLeave: () => setActiveId((cur) => (cur === id ? null : cur)),
      onFocus: () => setActiveId(id),
      onBlur: () => setActiveId((cur) => (cur === id ? null : cur)),
      onClick: () => setSelectedId(id),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelectedId(id);
        }
      },
    }),
    [nodeById]
  );

  return (
    <div className="relative overflow-hidden rounded-[16px] bg-[#132A54] p-3 sm:p-5 md:p-6">
      <div className="relative select-none">
            <svg
              ref={svgRef}
              role="img"
              aria-label="Peta jaringan Trans Hybrid di Indonesia, Malaysia, Brunei, dan Filipina, menampilkan gateway, titik kehadiran, serta kabel submarine dan inland."
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="block w-full cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'none' }}
            >
              <title>
                Jaringan Trans Hybrid: gateway (Singapore, Batam, Pontianak, Kuching, Brunei),
                titik kehadiran di Indonesia, dan koneksi kabel submarine serta inland.
              </title>
              <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
                {/* Country shapes */}
                <g aria-hidden>
                  {countryPaths.map((d, i) => (
                    <path
                      key={`${d.slice(0, 12)}-${i}`}
                      d={d}
                      fill="#1E3E73"
                      stroke="#3A5C96"
                      strokeWidth={0.6}
                    />
                  ))}
                </g>

                {/* Cables */}
                <g aria-hidden>
                  {cablePaths.map((c) =>
                    c.kind === 'submarine' ? (
                      <path
                        key={c.id}
                        data-cable={c.id}
                        data-kind="submarine"
                        d={c.d}
                        fill="none"
                        stroke="#FF6B5B"
                        strokeWidth={1.6}
                        strokeDasharray="6 5"
                        strokeLinecap="round"
                      />
                    ) : (
                      <path
                        key={c.id}
                        data-cable={c.id}
                        data-kind="inland"
                        d={c.d}
                        fill="none"
                        stroke="#4CD07D"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      />
                    )
                  )}
                </g>

                {/* Hong Kong inset callout */}
                <g aria-hidden>
                  <path
                    d={hkConnector}
                    fill="none"
                    stroke="#FF6B5B"
                    strokeWidth={1.4}
                    strokeDasharray="6 5"
                    strokeLinecap="round"
                  />
                  <rect
                    x={HK_INSET.x}
                    y={HK_INSET.y}
                    width={HK_INSET.w}
                    height={HK_INSET.h}
                    rx={10}
                    fill="#0D1F3F"
                    stroke="#3A5C96"
                    strokeWidth={0.8}
                  />
                  <text
                    x={HK_INSET.x + 10}
                    y={HK_INSET.y + 14}
                    fontSize={7.5}
                    fill="#CBD8ED"
                    opacity={0.7}
                    fontFamily="inherit"
                  >
                    INSET
                  </text>
                </g>

                {/* Nodes */}
                {visibleNodes.map(({ node, pos, labelHidden }) => {
                  if (!pos) return null;
                  const gateway = node.type === 'gateway';
                  const label = node.city;
                  const labelY = node.labelPos === 'bottom' ? pos.y + (gateway ? 16 : 16) : pos.y - (gateway ? 12 : 12);
                  return (
                    <g key={node.id} data-node={node.id} {...markerEvents(node.id)} className="cursor-pointer outline-none">
                      {gateway ? (
                        <rect
                          x={pos.x - 6}
                          y={pos.y - 6}
                          width={12}
                          height={12}
                          rx={3}
                          fill="#4FA8FF"
                          stroke="#132A54"
                          strokeWidth={1.2}
                        />
                      ) : (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={4.5}
                          fill="#FFD500"
                          stroke="#132A54"
                          strokeWidth={1.2}
                        />
                      )}
                      {!labelHidden && (
                        <text
                          x={pos.x}
                          y={labelY}
                          textAnchor="middle"
                          fontSize={isMobile ? 8.5 : 11}
                          fontWeight={600}
                          fill="#CBD8ED"
                          style={{ pointerEvents: 'none' }}
                        >
                          {label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Tooltip */}
            {activeNode && tooltipPos ? (
              <div
                className="pointer-events-none absolute z-20 -translate-x-1/2 rounded-lg bg-[#0D1F3F] px-3 py-2 text-white shadow-xl ring-1 ring-white/15"
                style={{
                  left: Math.min(Math.max(tooltipPos.x, 70), Math.max(svgWidth - 70, 70)),
                  top: tooltipPos.y - 46,
                }}
              >
                <div className="text-sm font-semibold">{activeNode.city}</div>
                <div className="text-xs text-[#CBD8ED]">
                  {activeNode.type === 'gateway' ? 'Gateway' : 'Point of Presence'}
                </div>
              </div>
            ) : null}

            {/* Legend */}
            <div
              className="pointer-events-none absolute bottom-3 left-3 z-20 flex flex-col gap-1 rounded-lg bg-[#0D1F3F]/85 px-2.5 py-2 ring-1 ring-white/10 backdrop-blur-sm sm:left-4 sm:bottom-4"
              aria-hidden
            >
              <div className="mb-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#CBD8ED]/70">
                Legend
              </div>
              {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className="flex h-2.5 w-4 items-center justify-center">
                    {item.shape === 'rect' && (
                      <span
                        className="block h-2 w-2 rounded-[2px]"
                        style={{ background: item.color, boxShadow: `0 0 0 1px #132A54` }}
                      />
                    )}
                    {item.shape === 'circle' && (
                      <span
                        className="block h-1.5 w-1.5 rounded-full"
                        style={{ background: item.color, boxShadow: `0 0 0 1px #132A54` }}
                      />
                    )}
                    {item.shape === 'dash' && (
                      <span
                        className="block h-0 w-4 border-t-[1.5px]"
                        style={{ borderTop: `1.5px dashed ${item.color}` }}
                      />
                    )}
                    {item.shape === 'line' && (
                      <span className="block h-0 w-4 border-t-[1.5px]" style={{ borderTop: `1.5px solid ${item.color}` }} />
                    )}
                  </span>
                  <span className="text-[10px] leading-tight text-[#CBD8ED]">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Controls: filter + zoom (top right) */}
            <div className="absolute right-3 top-3 z-30 flex flex-col items-end gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as Filter)}
                aria-label="Filter jenis node"
                className="max-w-[150px] cursor-pointer rounded-lg bg-[#0D1F3F] px-3 py-2 text-xs text-[#CBD8ED] ring-1 ring-white/15 outline-none transition hover:ring-white/30 focus:ring-white/40"
              >
                <option value="all">All nodes</option>
                <option value="gateway">Gateway only</option>
                <option value="pop">POP only</option>
              </select>
              <div className="flex items-center gap-1.5">
                <motion.button
                  type="button"
                  onClick={resetZoom}
                  aria-label="Reset zoom"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D1F3F] text-white ring-1 ring-white/15 transition hover:bg-[#1A3A6E] focus:ring-white/40"
                >
                  <LocateFixed size={14} />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => zoomBy(1.4)}
                  aria-label="Perbesar"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D1F3F] text-white ring-1 ring-white/15 transition hover:bg-[#1A3A6E] focus:ring-white/40"
                >
                  <Plus size={14} />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => zoomBy(1 / 1.4)}
                  aria-label="Perkecil"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D1F3F] text-white ring-1 ring-white/15 transition hover:bg-[#1A3A6E] focus:ring-white/40"
                >
                  <Minus size={14} />
                </motion.button>
              </div>
            </div>

            {/* Detail panel (right side) */}
            {selectedNode ? (
              <div className="absolute right-3 top-24 z-40 w-64 max-w-[calc(100%-1.5rem)] rounded-2xl border border-white/10 bg-[#0D1F3F]/95 p-5 shadow-2xl backdrop-blur-sm sm:right-6 sm:w-72">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-lg font-bold text-white">{selectedNode.city}</div>
                    <div className="mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        background: selectedNode.type === 'gateway' ? '#4FA8FF' : '#FFD500',
                        color: '#132A54',
                      }}
                    >
                      {selectedNode.type === 'gateway' ? 'Gateway' : 'Point of Presence'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    aria-label="Tutup panel detail"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#CBD8ED] transition hover:bg-white/20"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="mt-3 space-y-1 text-xs text-[#CBD8ED]">
                  <div>
                    Lat: <span className="font-medium text-white">{selectedNode.lat.toFixed(4)}</span>
                  </div>
                  <div>
                    Lng: <span className="font-medium text-white">{selectedNode.lng.toFixed(4)}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#CBD8ED]/60">
                      Kapasitas
                    </div>
                    <div className="mt-0.5 text-sm text-white">— (menunggu backend)</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#CBD8ED]/60">
                      Uptime
                    </div>
                    <div className="mt-0.5 text-sm text-white">— (menunggu backend)</div>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-white/5 px-3 py-2 text-[11px] leading-relaxed text-[#CBD8ED]/80">
                  Placeholder — data kapasitas &amp; uptime akan diisi dari backend.
                </div>
              </div>
            ) : null}
        </div>
      </div>
  );
}