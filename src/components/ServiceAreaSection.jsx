import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Clock, 
  Building 
} from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/healthcareData';

export default function ServiceAreaSection({ onOpenStaffingModal, onOpenConsultationModal }) {
  return (
    <section id="service-areas" className="scroll-mt-28 py-16 sm:py-20 bg-brand-surface border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
              Service Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Stoney Creek Headquarters & Regional Coverage
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Centrally based at <strong>800 Queenston Rd</strong>, our team provides personalized in-home care and rapid shift replenishment across the Greater Hamilton and Golden Horseshoe corridor.
            </p>

            {/* HQ Card */}
            <div className="mt-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-brand-navy flex items-center justify-center">
                    <Building className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm">
                      Aquarius Home Health Care
                    </h3>
                    <p className="text-xs text-slate-500">
                      Unit 309, Stoney Creek, ON
                    </p>
                  </div>
                </div>

                <a
                  href={COMPANY_INFO.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg text-brand-blue bg-blue-50 text-xs font-semibold hover:bg-blue-100 transition flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{COMPANY_INFO.address.full}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-brand-navy hover:underline">
                    {COMPANY_INFO.phone} (24/7 Live Desk)
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-teal flex-shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-600 hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
                <button
                  onClick={onOpenConsultationModal}
                  className="flex-1 py-2 px-3 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition"
                >
                  Book Home Visit
                </button>
                <button
                  onClick={onOpenStaffingModal}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy font-bold text-xs transition"
                >
                  Staffing Shift
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Communities Served */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs">
              <h3 className="font-bold text-base text-brand-navy mb-4">
                Communities We Serve in Ontario
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {SERVICE_AREAS.map((area, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/70"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-brand-navy">{area.name}</span>
                      {area.highlight && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-blue text-white">
                          HQ
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {area.note}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs text-slate-500 pt-4 border-t border-slate-100 text-justify">
                Staff members are regionally dispatched to ensure punctual arrival for both scheduled home care and urgent institutional shift coverage.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
