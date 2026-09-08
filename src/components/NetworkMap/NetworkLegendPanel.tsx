'use client';

import { cableRoutes } from './networkData';

const legendItems = [
  { label: 'Gateway and Cable' },
  { label: 'Submarine Cable' },
  { label: 'Terrestrial Cable' },
  { label: 'Point of Presence (PoP)' },
];

export default function NetworkLegendPanel() {
  return (
    <div className="rounded-[18px] border border-white/10 bg-[#0b2545] p-4 shadow-2xl shadow-black/10">
      <div className="space-y-5 text-[#cdd9ee]">
        <div>
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#cdd9ee]/70">
            Legend
          </h3>
          <ul className="flex flex-col gap-3">
            {legendItems.map((item, idx) => {
              const color = ['#0D2C54', '#D23B2E', '#1f7fd6', '#ffffff'][idx];
              const shape = ['gateway', 'marine', 'terrestrial', 'pop'][idx];
              return (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="shrink-0 flex items-center justify-center w-5">
                    {shape === 'gateway' && (
                      <span className="inline-block h-3.5 w-3.5 rounded-[2px]" style={{ background: color, border: '1.5px solid #ffffff' }} />
                    )}
                    {shape === 'pop' && (
                      <span className="inline-block h-3 w-3 rounded-full bg-white border-2 border-[#1f7fd6]" />
                    )}
                    {shape === 'marine' && (
                      <span className="inline-block h-[2.5px] w-5 rounded-full" style={{ background: color }} />
                    )}
                    {shape === 'terrestrial' && (
                      <span className="inline-block h-[2.5px] w-5 rounded-full" style={{ background: color }} />
                    )}
                  </span>
                  <span className="text-[13px] leading-snug">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#cdd9ee]/70">
            Cable Routes
          </h3>
          <ul className="flex flex-col gap-4">
            {cableRoutes.map((route) => (
              <li key={`${route.from}-${route.to}`} className="space-y-1">
                <div className="flex items-baseline gap-2 text-[14px] font-medium">
                  <span>{route.from}</span>
                  <span className="text-[#cdd9ee]/40">&gt;&lt;</span>
                  <span>{route.to}</span>
                </div>
                <div className="text-[12px] leading-snug text-[#cdd9ee]/70">{route.cable}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
