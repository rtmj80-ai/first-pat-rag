import React from 'react';
import { WorldIndexRow } from '../data/marketsData';

interface CountryFlagProps {
  code: WorldIndexRow['countryCode'];
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ code }) => {
  const renderFlagSvg = () => {
    switch (code) {
      case 'JP':
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden shadow-[0_0_0_0.5px_rgba(0,0,0,0.12)]" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="#ffffff" />
            <circle cx="12" cy="12" r="5.5" fill="#bc002d" />
          </svg>
        );
      case 'DE':
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden" viewBox="0 0 24 24">
            <rect width="24" height="8" y="0" fill="#1a1a1a" />
            <rect width="24" height="8" y="8" fill="#dd0000" />
            <rect width="24" height="8" y="16" fill="#ffce00" />
          </svg>
        );
      case 'GB':
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="#012169" />
            <path d="M0,0 L24,24 M24,0 L0,24" stroke="#ffffff" strokeWidth="4" />
            <path d="M0,0 L24,24 M24,0 L0,24" stroke="#c8102e" strokeWidth="2" />
            <path d="M12,0 V24 M0,12 H24" stroke="#ffffff" strokeWidth="6" />
            <path d="M12,0 V24 M0,12 H24" stroke="#c8102e" strokeWidth="3.5" />
          </svg>
        );
      case 'FR':
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)]" viewBox="0 0 24 24">
            <rect width="8" height="24" x="0" fill="#002654" />
            <rect width="8" height="24" x="8" fill="#ffffff" />
            <rect width="8" height="24" x="16" fill="#ed2939" />
          </svg>
        );
      case 'HK':
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="#de2910" />
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2.5" />
            <circle cx="12" cy="12" r="1.8" fill="#ffffff" />
          </svg>
        );
      case 'US':
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="#ffffff" />
            <rect width="24" height="3.5" y="0" fill="#b22234" />
            <rect width="24" height="3.5" y="7" fill="#b22234" />
            <rect width="24" height="3.5" y="14" fill="#b22234" />
            <rect width="24" height="3.5" y="20.5" fill="#b22234" />
            <rect width="12" height="12" x="0" y="0" fill="#3c3b6e" />
          </svg>
        );
      case 'CA':
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden" viewBox="0 0 24 24">
            <rect width="6" height="24" x="0" fill="#ff0000" />
            <rect width="12" height="24" x="6" fill="#ffffff" />
            <rect width="6" height="24" x="18" fill="#ff0000" />
            <circle cx="12" cy="12" r="3.2" fill="#ff0000" />
          </svg>
        );
      case 'BR':
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="#009c3b" />
            <polygon points="12,4 21,12 12,20 3,12" fill="#ffdf00" />
            <circle cx="12" cy="12" r="4" fill="#002776" />
          </svg>
        );
      case 'EU':
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="#003399" />
            <circle cx="12" cy="12" r="6" fill="none" stroke="#ffcc00" strokeWidth="2" strokeDasharray="2 3" />
          </svg>
        );
      case 'AU':
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="#00008b" />
            <rect width="11" height="11" fill="#012169" />
            <path d="M5.5,0 V11 M0,5.5 H11" stroke="#ffffff" strokeWidth="2.5" />
            <path d="M5.5,0 V11 M0,5.5 H11" stroke="#c8102e" strokeWidth="1.5" />
            <circle cx="17" cy="16" r="2" fill="#ffffff" />
          </svg>
        );
      default:
        return (
          <svg className="w-3.5 h-3.5 rounded-full overflow-hidden" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="#2962ff" />
          </svg>
        );
    }
  };

  return (
    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold border border-gray-200 flex-shrink-0">
      {renderFlagSvg()}
    </span>
  );
};
