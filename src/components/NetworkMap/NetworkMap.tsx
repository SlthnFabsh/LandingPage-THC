'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { select } from 'd3-selection';
import 'd3-transition';
import { zoom, zoomIdentity, type ZoomBehavior } from 'd3-zoom';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import { Minus, Plus, LocateFixed, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { networkCables, networkNodes, type NetworkNode } from './networkData';

const VB_W = 680;
const VB_H = 410;

// Hong Kong position placed in the northern waters, matching the reference diagram
const HK_POS: Pt = { x: 345, y: 44 };

interface Pt {
  x: number;
  y: number;
}

const getCablePath = (a: Pt, b: Pt, curvature: number = 0) => {
  if (!curvature || Math.abs(curvature) < 0.01) {
    return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * len * curvature;
  const cy = my + ny * len * curvature;
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
};

type TopoLike = {
  type: string;
  objects: { countries: { type: string; geometries: unknown[] } };
  arcs: unknown[];
};

type Filter = 'all' | 'gateway' | 'pop';

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
    const names = new Set(['Indonesia', 'Malaysia', 'Brunei', 'Philippines', 'Singapore']);
    return all.filter((f) => names.has(f?.properties?.name ?? ''));
  }, []);

  const projection = useMemo(() => {
    const region = { type: 'FeatureCollection', features: geometry };
    const base = geoMercator().fitExtent(
      [
        [20, 18],
        [660, 400],
      ],
      region as never
    );
    // Focus around Indonesian archipelago and Southeast Asian connections
    const center = base([111, -2.5]);
    const t = base.translate();
    const z = 1.48;
    return geoMercator()
      .scale(base.scale() * z)
      .translate([340 - z * ((center?.[0] ?? 0) - t[0]), 215 - z * ((center?.[1] ?? 0) - t[1])]);
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
      if (n.id === 'hongkong') {
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
      const b = nodePos[c.to];
      if (!a || !b) continue;
      const d = getCablePath(a, b, c.curvature ?? (c.kind === 'submarine' ? 0.12 : 0));
      list.push({ id: `${c.from}-${c.to}`, d, kind: c.kind });
    }
    return list;
  }, [nodePos]);

  const nodeById = useMemo(() => new Map(networkNodes.map((n) => [n.id, n])), []);

  // d3-zoom: pan + wheel/pinch zoom
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const zb = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 10])
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

  // measure rendered svg width for tooltip positioning
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

  // Label layout: place labels near each node with collision avoidance
  const labelLayout = useMemo(() => {
    const fs = isMobile ? 7 : 8.5;
    const cw = fs * 0.6;
    const lineH = fs * 1.1 + 1;
    const placed: { x: number; y: number; w: number; h: number }[] = [];
    const out: {
      node: NetworkNode;
      x: number;
      y: number;
      textAnchor: 'start' | 'middle' | 'end';
      leader: Pt[] | null;
    }[] = [];
    const pad = 1.5;

    for (const { node, pos, labelHidden } of visibleNodes) {
      if (!pos || labelHidden || node.hideLabel) continue;
      const gateway = node.type === 'gateway';
      const m = gateway ? 6 : 4.5;
      const w = Math.max(node.city.length * cw, 16);
      const pref = node.labelPos ?? 'top';
      const order = [pref, 'top', 'bottom', 'left', 'right'].filter(
        (v, i, a) => a.indexOf(v) === i
      );

      let chosen: { side: string; x: number; y: number; anchor: 'start' | 'middle' | 'end'; off: number; shift: number } | null = null;
      for (const side of order) {
        const off = node.labelOffset ?? 4;
        const shift = node.labelShift ?? 0;
        let x: number;
        let y: number;
        let anchor: 'start' | 'middle' | 'end';
        let box: { x: number; y: number; w: number; h: number };

        if (side === 'top') {
          x = pos.x + shift;
          y = pos.y - m - 2 - off;
          anchor = 'middle';
          box = { x: x - w / 2, y: y - lineH + 2, w, h: lineH };
        } else if (side === 'bottom') {
          x = pos.x + shift;
          y = pos.y + m + 7 + off;
          anchor = 'middle';
          box = { x: x - w / 2, y: y - lineH + 2, w, h: lineH };
        } else if (side === 'left') {
          x = pos.x - m - 3 - off;
          y = pos.y + shift + 3;
          anchor = 'end';
          box = { x: x - w, y: y - lineH / 2, w, h: lineH };
        } else {
          x = pos.x + m + 3 + off;
          y = pos.y + shift + 3;
          anchor = 'start';
          box = { x, y: y - lineH / 2, w, h: lineH };
        }

        const collides = placed.some(
          (p) =>
            box.x < p.x + p.w + pad &&
            box.x + box.w > p.x - pad &&
            box.y < p.y + p.h + pad &&
            box.y + box.h > p.y - pad
        );

        if (!collides) {
          placed.push(box);
          chosen = { side, x, y, anchor, off, shift };
          break;
        }
      }

      if (!chosen) {
        // Fallback: place regardless of collision
        const off = node.labelOffset ?? 4;
        const shift = node.labelShift ?? 0;
        chosen = {
          side: pref,
          x: pref === 'left' ? pos.x - m - 3 - off : pref === 'right' ? pos.x + m + 3 + off : pos.x + shift,
          y: pref === 'top' ? pos.y - m - 2 - off : pref === 'bottom' ? pos.y + m + 7 + off : pos.y + shift + 3,
          anchor: pref === 'left' ? 'end' : pref === 'right' ? 'start' : 'middle',
          off,
          shift,
        };
      }

      out.push({ node, x: chosen.x, y: chosen.y, textAnchor: chosen.anchor, leader: null });
    }
    return out;
  }, [visibleNodes, isMobile]);

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
    <div className="relative w-full h-full min-h-[500px] md:min-h-[560px] rounded-[18px] border border-white/10 bg-[#0b2545] p-2 sm:p-4 shadow-2xl shadow-black/10 flex flex-col justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center select-none">
        <svg
          ref={svgRef}
          role="img"
          aria-label="Peta jaringan Trans Hybrid di Indonesia, Malaysia, Brunei, dan Filipina, menampilkan gateway, titik kehadiran, serta kabel submarine dan inland."
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="block w-full h-auto max-h-[620px] cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
        >
          <title>
            Jaringan Trans Hybrid: gateway (Singapore, Batam, Pontianak, Kuching, Brunei, Jakarta, Hong Kong),
            titik kehadiran (PoP), dan koneksi kabel submarine serta inland.
          </title>

          {/* Definitions for drop shadows */}
          <defs>
            <filter id="cable-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
            {/* Country landmass shapes */}
            <g aria-hidden>
              {countryPaths.map((d, i) => (
                <path
                  key={`${d.slice(0, 12)}-${i}`}
                  d={d}
                  fill="#153664"
                  stroke="#274D85"
                  strokeWidth={0.7}
                />
              ))}
            </g>

            {/* Hong Kong organic island shape */}
            <g aria-hidden>
              <path
                d="M 320,42 C 310,24 330,16 352,16 C 374,16 388,26 386,44 C 384,62 364,68 344,66 C 326,64 316,54 320,42 Z"
                fill="#153664"
                stroke="#274D85"
                strokeWidth={0.8}
              />
              <text
                x={352}
                y={30}
                textAnchor="middle"
                fontSize={7.5}
                fontWeight={700}
                fill="#CBD8ED"
                letterSpacing="0.06em"
              >
                HONGKONG
              </text>
            </g>

            {/* Cables (Submarine: Red, Inland: Blue) */}
            <g aria-hidden filter="url(#cable-glow)">
              {cablePaths.map((c) =>
                c.kind === 'submarine' ? (
                  <path
                    key={c.id}
                    data-cable={c.id}
                    data-kind="submarine"
                    d={c.d}
                    fill="none"
                    stroke="#D23B2E"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    key={c.id}
                    data-cable={c.id}
                    data-kind="inland"
                    d={c.d}
                    fill="none"
                    stroke="#1f7fd6"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                )
              )}
            </g>

            {/* Compass Rose (positioned in top-right matching reference) */}
            <g transform="translate(610, 60)" aria-hidden className="select-none pointer-events-none">
              <line x1={0} y1={-26} x2={0} y2={26} stroke="#CBD8ED" strokeWidth={0.9} strokeOpacity={0.6} />
              <line x1={-26} y1={0} x2={26} y2={0} stroke="#CBD8ED" strokeWidth={0.9} strokeOpacity={0.6} />
              {/* Star arrows */}
              <polygon points="0,-22 4.5,-5 18,0 4.5,5 0,22 -4.5,5 -18,0 -4.5,-5" fill="#1f7fd6" stroke="#FFFFFF" strokeWidth={0.7} />
              <polygon points="0,-22 0,0 18,0" fill="#0D2C54" />
              <polygon points="0,22 0,0 -18,0" fill="#0D2C54" />
              {/* Direction labels */}
              <text x={0} y={-29} textAnchor="middle" fontSize={8} fontWeight={800} fill="#FFFFFF">N</text>
              <text x={0} y={36} textAnchor="middle" fontSize={8} fontWeight={800} fill="#FFFFFF">S</text>
              <text x={34} y={3} textAnchor="middle" fontSize={8} fontWeight={800} fill="#FFFFFF">E</text>
              <text x={-34} y={3} textAnchor="middle" fontSize={8} fontWeight={800} fill="#FFFFFF">W</text>
            </g>

            {/* Nodes: Gateways (squares) and PoPs (circles) */}
            {visibleNodes.map(({ node, pos }) => {
              if (!pos) return null;
              const gateway = node.type === 'gateway';
              return (
                <g
                  key={node.id}
                  data-node={node.id}
                  {...markerEvents(node.id)}
                  className="cursor-pointer outline-none transition-transform duration-150 hover:scale-125"
                >
                  {gateway ? (
                    <rect
                      x={pos.x - 5.5}
                      y={pos.y - 5.5}
                      width={11}
                      height={11}
                      rx={2}
                      fill="#0D2C54"
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={3.8}
                      fill="#FFFFFF"
                      stroke="#1f7fd6"
                      strokeWidth={1.8}
                    />
                  )}
                </g>
              );
            })}

            {/* Node City Labels (crisp uppercase text with outline) */}
            {labelLayout.map(({ node, x, y, textAnchor }) => (
              <g key={`label-${node.id}`} aria-hidden className="pointer-events-none select-none">
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  fontSize={isMobile ? 7 : 8.5}
                  fontWeight={700}
                  fill="#FFFFFF"
                  stroke="#0b2545"
                  strokeWidth={2.5}
                  paintOrder="stroke fill"
                  strokeLinejoin="round"
                  letterSpacing="0.02em"
                >
                  {node.city.toUpperCase()}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* Tooltip on hover */}
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

        {/* Interactive Controls (Top Right: Filter & Zoom) */}
        <div className="absolute right-3 top-3 z-30 flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
            aria-label="Filter jenis node"
            className="cursor-pointer rounded-lg bg-[#0D1F3F]/90 px-3 py-1.5 text-xs font-medium text-[#CBD8ED] ring-1 ring-white/15 outline-none backdrop-blur-sm transition hover:ring-white/30 focus:ring-white/40"
          >
            <option value="all">All nodes</option>
            <option value="gateway">Gateway only</option>
            <option value="pop">POP only</option>
          </select>
          <div className="flex items-center gap-1">
            <motion.button
              type="button"
              onClick={resetZoom}
              aria-label="Reset zoom"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0D1F3F]/90 text-white ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-[#1A3A6E] focus:ring-white/40"
            >
              <LocateFixed size={13} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => zoomBy(1.35)}
              aria-label="Perbesar"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0D1F3F]/90 text-white ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-[#1A3A6E] focus:ring-white/40"
            >
              <Plus size={13} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => zoomBy(1 / 1.35)}
              aria-label="Perkecil"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0D1F3F]/90 text-white ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-[#1A3A6E] focus:ring-white/40"
            >
              <Minus size={13} />
            </motion.button>
          </div>
        </div>

        {/* Detail Panel on Node Click */}
        {selectedNode ? (
          <div className="absolute right-3 top-14 z-40 w-64 max-w-[calc(100%-1.5rem)] rounded-2xl border border-white/10 bg-[#0D1F3F]/95 p-5 shadow-2xl backdrop-blur-sm sm:right-5 sm:w-72">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-lg font-bold text-white">{selectedNode.city}</div>
                <div
                  className="mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    background: selectedNode.type === 'gateway' ? '#0D2C54' : '#FFFFFF',
                    color: selectedNode.type === 'gateway' ? '#FFFFFF' : '#0D2C54',
                    border: '1px solid rgba(255,255,255,0.2)',
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

            <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#CBD8ED]/60">
                  Status Jaringan
                </div>
                <div className="mt-0.5 text-sm font-medium text-emerald-400">Aktif &amp; Terkoneksi</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#CBD8ED]/60">
                  Koneksi Kabel
                </div>
                <div className="mt-0.5 text-xs text-white">
                  {networkCables.filter((c) => c.from === selectedNode.id || c.to === selectedNode.id).length} jalur terhubung
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}