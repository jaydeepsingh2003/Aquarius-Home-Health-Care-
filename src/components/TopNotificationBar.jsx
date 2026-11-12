import React from 'react';
import { Phone, Clock, MapPin, ShieldAlert } from 'lucide-react';
import { COMPANY_INFO } from '../data/healthcareData';

export default function TopNotificationBar({ activeAudience, setActiveAudience, onOpenStaffingModal }) {
  return (
    <div className="bg-brand-navy-dark text-slate-300 text-xs border-b border-slate-800/80 py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: 24/7 Status & Dispatch Contact */}
        <div className="flex items-center flex-wrap gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 font-medium text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-amber opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-amber"></span>
            </span>
            <span className="text-slate-200">24/7 Dispatch Desk</span>
          </div>

          <a 
            href={`tel:${COMPANY_INFO.phoneRaw}`} 
            className="flex items-center gap-1.5 text-white hover:text-brand-blue transition font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-brand-blue" />
            <span>(905) 525-5111</span>
          </a>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-brand-teal" />
            <span>Stoney Creek & Greater Hamilton, ON</span>
          </div>
        </div>

        {/* Right: Clean Audience Switcher & Staffing Shortcut */}
        <div className="flex items-center gap-3">
          <div className="inline-flex p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveAudience('families')}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition ${
                activeAudience === 'families'
                  ? 'bg-brand-blue text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Families
            </button>
            <button
              onClick={() => setActiveAudience('facilities')}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition ${
                activeAudience === 'facilities'
                  ? 'bg-brand-teal text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Facilities
            </button>
          </div>

          <button
            onClick={onOpenStaffingModal}
            className="hidden sm:inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 text-xs font-semibold px-2 py-0.5 rounded transition"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-brand-amber" />
            <span>Urgent Shift Request</span>
          </button>
        </div>

      </div>
    </div>
  );
}
