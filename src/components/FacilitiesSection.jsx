import React from 'react';
import { 
  Building2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  FileCheck, 
  Users,
  CalendarCheck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/healthcareData';

export default function FacilitiesSection({ onOpenStaffingModal }) {
  const facilitySolutions = [
    {
      title: "Long-Term Care & Retirement Homes",
      badge: "Geriatric Support",
      image: "/images/service-psw.jpg",
      desc: "Dependable Personal Support Workers and Registered Practical Nurses trained in Ontario Ministry standards, gentle resident transfers, medication administration, and PointClickCare systems.",
      highlights: [
        "Patient-centered ADLs & mobility care",
        "Medication pass administration (RPN)",
        "Zero onboarding friction & orientation ready",
        "Consistent staffing to maintain unit familiarity"
      ]
    },
    {
      title: "Hospitals & Acute Care Departments",
      badge: "High-Acuity Readiness",
      image: "/images/service-rpn.jpg",
      desc: "Pre-screened, experienced Registered Nurses and Practical Nurses ready for rapid integration into medical, surgical, emergency overflow, and sub-acute recovery departments.",
      highlights: [
        "Active College of Nurses of Ontario (CNO) verified",
        "CPR-HCP, First Aid & ACLS/BLS certified",
        "Acute bedside monitoring & IV therapy support",
        "Short-term, weekend & block coverage options"
      ]
    },
    {
      title: "Urgent Sick Call & Surge Replenishment",
      badge: "< 15 Min Confirmation",
      image: "/images/service-facility.jpg",
      desc: "Immediate shift relief for sudden sick calls, unplanned absences, and seasonal patient census spikes. Our 24/7 on-call dispatch desk confirms coverage in minutes.",
      highlights: [
        "24/7/365 live scheduling coordinator dispatch",
        "Day, evening, night & weekend shift coverage",
        "Police Vulnerable Sector screened personnel",
        "Comprehensive WSIB coverage & liability insured"
      ]
    }
  ];

  return (
    <section id="facilities" className="scroll-mt-28 py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-100 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Healthcare Facility Staffing
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
            Institutional Shift Coverage & Surge Support
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify sm:text-center">
            Partnering with Ontario hospitals, long-term care homes, retirement residences, and medical clinics to eliminate staffing vacancies with verified, credentialed healthcare professionals.
          </p>
        </div>

        {/* 4 Pillars of Institutional Reliability */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-3">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <div className="text-base sm:text-lg font-black text-brand-navy">&lt; 15 Mins</div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">Average shift confirmation dispatch response time</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div className="text-base sm:text-lg font-black text-brand-navy">100% Vetted</div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">CNO licensed & Police Vulnerable Sector screened</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center mb-3">
              <FileCheck className="w-4.5 h-4.5" />
            </div>
            <div className="text-base sm:text-lg font-black text-brand-navy">PHIPA Compliant</div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">Rigorous privacy, documentation & WSIB coverage</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-brand-amber flex items-center justify-center mb-3">
              <Zap className="w-4.5 h-4.5" />
            </div>
            <div className="text-base sm:text-lg font-black text-brand-navy">24/7/365</div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">Round-the-clock live human scheduling coordinators</p>
          </div>
        </div>

        {/* 3 Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {facilitySolutions.map((sol, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <img 
                  src={sol.image} 
                  alt={sol.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-brand-navy shadow-xs backdrop-blur-xs">
                  {sol.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-bold text-brand-navy leading-snug">
                    {sol.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed text-justify">
                    {sol.desc}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {sol.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={onOpenStaffingModal}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-brand-blue text-brand-navy hover:text-white font-bold text-xs transition flex items-center justify-center gap-2 group/btn border border-slate-200 hover:border-brand-blue"
                  >
                    <span>Request Shift Coverage</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facility Fast Dispatch Banner */}
        <div className="bg-gradient-to-br from-brand-navy to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1.5 text-center lg:text-left">
            <span className="text-xs font-bold text-brand-teal uppercase tracking-wider flex items-center justify-center lg:justify-start gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Staffing Dispatch Active
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Facing an Unfilled Shift or Surge Right Now?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl text-justify lg:text-left">
              Speak directly with our on-call Ontario scheduling coordinator for rapid PSW, RPN, and RN deployments across Stoney Creek, Hamilton, and Niagara.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <a 
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-brand-navy hover:bg-slate-100 font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-brand-blue" />
              <span>Call (905) 525-5111</span>
            </a>

            <button
              onClick={onOpenStaffingModal}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Submit Shift Intake</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}