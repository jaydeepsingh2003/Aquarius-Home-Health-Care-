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
  CalendarCheck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/healthcareData';
import Reveal from './Reveal';

export default function FacilitiesSection({ onOpenStaffingModal }) {
  const facilitySolutions = [
    {
      title: "Long-Term Care & Retirement",
      badge: "Geriatric Support",
      image: "/images/service-psw.jpg",
      desc: "Dependable PSWs and RPNs trained in Ontario Ministry standards, safe resident transfers, medication passes, and PointClickCare charting.",
      highlights: [
        "Resident ADLs & fall prevention",
        "Medication pass administration (RPN)",
        "Consistent unit placements"
      ]
    },
    {
      title: "Hospitals & Acute Departments",
      badge: "High-Acuity Ready",
      image: "/images/service-rpn.jpg",
      desc: "Pre-screened, CNO-licensed RNs and RPNs prepared for rapid integration into medical, surgical, and sub-acute recovery floors.",
      highlights: [
        "Active CNO registry verified",
        "CPR-HCP, ACLS & BLS certified",
        "Short-term & block coverage"
      ]
    },
    {
      title: "Urgent Sick Call & Surge Relief",
      badge: "< 15 Min Dispatch",
      image: "/images/service-facility.jpg",
      desc: "Immediate same-day shift coverage for unplanned sick calls and patient surges via our 24/7 Stoney Creek dispatch desk.",
      highlights: [
        "24/7/365 live human dispatch",
        "Day, evening, night & weekends",
        "PVSS screened & WSIB covered"
      ]
    }
  ];

  return (
    <section id="facilities" className="scroll-mt-28 py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-100 mb-3">
              <Building2 className="w-4 h-4" />
              Healthcare Facility Staffing
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              24/7 Institutional Shift Coverage
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed text-justify sm:text-center">
              Eliminating unit vacancies across Ontario hospitals, long-term care homes, and clinics with vetted PSWs, RPNs, and RNs.
            </p>
          </div>
        </Reveal>

        {/* 4 Key Operational Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { val: "< 15 Mins", sub: "Average shift confirmation time", icon: Clock, color: "bg-blue-50 text-brand-blue" },
            { val: "100% Vetted", sub: "CNO & Vulnerable Sector cleared", icon: ShieldCheck, color: "bg-emerald-50 text-emerald-600" },
            { val: "PHIPA Ready", sub: "Compliant charting & WSIB insured", icon: FileCheck, color: "bg-teal-50 text-brand-teal" },
            { val: "24/7/365", sub: "Live scheduling coordinators", icon: Zap, color: "bg-amber-50 text-brand-amber" }
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={i} delay={i * 60}>
                <div className="h-full bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover">
                  <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-lg sm:text-xl font-black text-brand-navy">{m.val}</div>
                  <p className="text-sm text-slate-600 mt-1 leading-snug">{m.sub}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* 3 Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {facilitySolutions.map((sol, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <div className="h-full bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-subtle card-hover flex flex-col group">
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={sol.image} 
                    alt={sol.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-brand-navy shadow-xs">
                    {sol.badge}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-brand-navy leading-snug">
                      {sol.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed text-justify">
                      {sol.desc}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      {sol.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={onOpenStaffingModal}
                      className="w-full py-2.5 px-4 rounded-full bg-slate-50 hover:bg-brand-blue text-brand-navy hover:text-white font-bold text-sm transition flex items-center justify-center gap-2 border border-slate-200 hover:border-brand-blue"
                    >
                      <span>Request Shift Coverage</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Concise Facility Fast Dispatch Banner */}
        <Reveal>
          <div className="bg-gradient-to-br from-brand-navy to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-elevated flex flex-col lg:flex-row items-center justify-between gap-6 border border-slate-800">
            <div className="space-y-1.5 text-center lg:text-left">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center justify-center lg:justify-start gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Live Staffing Dispatch Active
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Need Urgent Shift Coverage Right Now?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl text-justify lg:text-left">
                Call our on-call Ontario scheduling coordinator for rapid PSW, RPN, and RN deployments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-shrink-0">
              <a 
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-brand-navy hover:bg-slate-100 font-extrabold text-sm transition flex items-center justify-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-brand-blue" />
                <span>Call (905) 525-5111</span>
              </a>

              <button
                onClick={onOpenStaffingModal}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-sm transition flex items-center justify-center gap-2 shadow-sm"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Submit Shift Intake</span>
              </button>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
