import React from 'react';
import { Phone, Users, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/healthcareData';

export default function FloatingMobileDock({ onOpenStaffingModal, onOpenConsultationModal }) {
  return (
    <aside 
      aria-label="Quick Mobile Action Dock"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-3 sm:hidden shadow-[0_-4px_16px_rgba(10,30,52,0.06)]"
      style={{ paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Direct Phone Call */}
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-100 text-brand-navy font-bold text-xs active:bg-slate-200 transition touch-manipulation"
        >
          <Phone className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
          <span className="truncate">Call 24/7</span>
        </a>

        {/* Urgent Facility Staffing */}
        <button
          onClick={onOpenStaffingModal}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-teal-50 text-brand-teal font-bold text-xs border border-teal-200/70 active:bg-teal-100 transition touch-manipulation"
        >
          <Users className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">Staffing</span>
        </button>

        {/* Book Care Consultation */}
        <button
          onClick={onOpenConsultationModal}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-brand-blue text-white font-bold text-xs shadow-xs active:bg-blue-700 transition touch-manipulation"
        >
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">Book Care</span>
        </button>

      </div>
    </aside>
  );
}
