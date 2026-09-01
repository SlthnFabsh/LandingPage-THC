const fs = require('fs');
const path = require('path');

const pelangganDir = 'c:/laragon/www/Landingpage-thc/assets/images/pelanggan';
const mitraDir = 'c:/laragon/www/Landingpage-thc/assets/images/mitra';

if (!fs.existsSync(pelangganDir)) fs.mkdirSync(pelangganDir, { recursive: true });
if (!fs.existsSync(mitraDir)) fs.mkdirSync(mitraDir, { recursive: true });

// SVG logo generators with professional vector designs
const logos = {
  matahari: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
    <circle cx="35" cy="30" r="16" fill="#ED1C24"/>
    <path d="M35 18 L38 27 L47 27 L40 32 L42 41 L35 36 L28 41 L30 32 L23 27 L32 27 Z" fill="#FFFFFF"/>
    <text x="62" y="38" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="22" fill="#ED1C24" letter-spacing="1">MATAHARI</text>
  </svg>`,
  
  supercorridor: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
    <g fill="none" stroke="#0256EB" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 30 L30 15 L45 30 L30 45 Z"/>
      <path d="M22 30 L30 22 L38 30 L30 38 Z" fill="#0256EB"/>
    </g>
    <text x="55" y="37" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" fill="#0F172A" letter-spacing="0.5">SUPERCORRIDOR</text>
  </svg>`,
  
  surge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 60" width="160" height="60">
    <path d="M15 38 C22 20, 28 40, 35 22 C40 30, 45 15, 50 25" fill="none" stroke="#00C9A7" stroke-width="4.5" stroke-linecap="round"/>
    <text x="58" y="39" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="24" fill="#0B2545" letter-spacing="2">SURGE</text>
  </svg>`,
  
  telkom: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 60" width="210" height="60">
    <circle cx="30" cy="30" r="18" fill="#ED1C24"/>
    <path d="M30 12 A18 18 0 0 1 48 30 L30 30 Z" fill="#FFFFFF"/>
    <circle cx="30" cy="30" r="8" fill="#ED1C24"/>
    <text x="58" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" fill="#1E293B">Telkom</text>
    <text x="58" y="46" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="11" fill="#64748B" letter-spacing="1">INDONESIA</text>
  </svg>`,
  
  tm: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60">
    <path d="M15 18 L35 18 M25 18 L25 42" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>
    <path d="M35 42 L35 18 L45 32 L55 18 L55 42" stroke="#0256EB" stroke-width="5" stroke-linecap="round" fill="none"/>
    <text x="68" y="38" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="24" fill="#0F172A">TM</text>
  </svg>`,
  
  velo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60" width="150" height="60">
    <path d="M15 18 L28 42 L41 18" fill="none" stroke="#6366F1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="28" cy="18" r="4" fill="#6366F1"/>
    <text x="50" y="38" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="24" fill="#1E1B4B" letter-spacing="1.5">VELO</text>
  </svg>`,
  
  viberlink: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
    <g fill="none" stroke="#06B6D4" stroke-width="3.5" stroke-linecap="round">
      <path d="M15 24 C 25 14, 35 36, 45 26"/>
      <path d="M15 36 C 25 26, 35 46, 45 36"/>
    </g>
    <text x="54" y="37" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="18" fill="#0891B2">Viber<tspan fill="#0F172A">Link</tspan></text>
  </svg>`,
  
  wgs: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60" width="150" height="60">
    <rect x="15" y="15" width="30" height="30" rx="8" fill="#2563EB"/>
    <path d="M22 25 L27 35 L32 25 L38 35" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    <text x="54" y="38" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="24" fill="#1E293B" letter-spacing="2">WGS</text>
  </svg>`,
  
  zenlayer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
    <polygon points="15,18 40,18 20,42 45,42" fill="none" stroke="#10B981" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="52" y="37" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="20" fill="#065F46" letter-spacing="0.5">zenlayer</text>
  </svg>`,
  
  alfamart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="180" height="60">
    <rect x="12" y="12" width="36" height="36" rx="6" fill="#EE2E24"/>
    <path d="M30 18 L20 38 L25 38 L27 33 L33 33 L35 38 L40 38 Z M30 23 L32 30 L28 30 Z" fill="#FFC20E"/>
    <text x="56" y="38" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="20" fill="#EE2E24">Alfa<tspan fill="#0054A6">mart</tspan></text>
  </svg>`,

  gramedia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
    <path d="M15 15 C30 15, 30 45, 45 45 M15 45 C30 45, 30 15, 45 15" fill="none" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>
    <text x="54" y="37" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="19" fill="#0369A1" letter-spacing="0.5">Gramedia</text>
  </svg>`,

  indomaret: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
    <rect x="12" y="14" width="36" height="32" rx="4" fill="#005CA9"/>
    <path d="M12 24 L48 24" stroke="#ED1C24" stroke-width="4"/>
    <path d="M12 36 L48 36" stroke="#FFD100" stroke-width="4"/>
    <text x="56" y="38" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="19" fill="#ED1C24">Indo<tspan fill="#005CA9">maret</tspan></text>
  </svg>`
};

// List Pelanggan (10 brand)
const pelangganList = [
  logos.matahari,
  logos.supercorridor,
  logos.surge,
  logos.telkom,
  logos.tm,
  logos.velo,
  logos.viberlink,
  logos.wgs,
  logos.zenlayer,
  logos.alfamart
];

// List Mitra (10 brand)
const mitraList = [
  logos.matahari,
  logos.supercorridor,
  logos.surge,
  logos.telkom,
  logos.tm,
  logos.velo,
  logos.viberlink,
  logos.wgs,
  logos.gramedia,
  logos.indomaret
];

pelangganList.forEach((svgContent, index) => {
  const fileName = 'logo-' + (index + 1) + '.svg';
  const filePath = path.join(pelangganDir, fileName);
  fs.writeFileSync(filePath, svgContent);
  console.log('Created Pelanggan:', fileName);
});

mitraList.forEach((svgContent, index) => {
  const fileName = 'logo-' + (index + 1) + '.svg';
  const filePath = path.join(mitraDir, fileName);
  fs.writeFileSync(filePath, svgContent);
  console.log('Created Mitra:', fileName);
});

console.log('All SVG logos generated successfully!');
