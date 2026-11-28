import React from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Clock, 
  Zap, 
  CheckCircle2,
  Compass,
  Eye,
  Languages,
  Lock,
  FileCheck2,
  Award,
  UserCheck
} from 'lucide-react';
import { COMPANY_INFO, MISSION_VISION } from '../data/healthcareData';

export default function PillarsSection() {
  const pillars = [
    {
      title: "Qualified & Screened Staff",
      tag: "Rigorous Standards",
      desc: "Every nurse and support worker undergoes rigorous background checks, police vulnerable sector screening, and active College of Nurses of Ontario (CNO) verification.",
      points: ["Police Vulnerable Sector Cleared", "Active CNO & Diploma Verification", "CPR-HCP & First Aid Certified"],
      icon: ShieldCheck
    },
    {
      title: "Compassion First",
      tag: "Dignity & Safety",
      desc: "Clinical excellence paired with genuine empathy. We preserve personal dignity, support independence, and provide families with complete peace of mind.",
      points: ["Patient-centered care planning", "Respectful daily living pacing", "Empathetic, compassionate bedside presence"],
      icon: HeartHandshake
    },
    {
      title: "24/7 Continuous Reliability",
      tag: "Round-The-Clock",
      desc: "Available 24/7/365 to ensure continuous patient care and rapid shift coverage. Our live scheduling coordinators respond whenever you need us.",
      points: ["Round-the-clock live dispatch", "No gaps in patient coverage", "Rapid shift confirmation in minutes"],
      icon: Clock
    },
    {
      title: "Flexible Surge Support",
      tag: "Rapid Relief",
      desc: "Short-term, on-demand, or block staffing to handle sudden patient surges, unexpected sick calls, or temporary institutional vacancies.",
      points: ["Same-day sick call replenishment", "Hospital acute & sub-acute surge", "Long-term care & retirement coverage"],
      icon: Zap
    }
  ];

  const vettingSteps = [
    { step: "01", title: "Vulnerable Sector Check", detail: "Mandatory PVSS clearance", icon: Lock },
    { step: "02", title: "CNO & PSW Registry", detail: "Live Ontario license audit", icon: FileCheck2 },
    { step: "03", title: "Clinical & CPR Audits", detail: "Medication & BLS certified", icon: Award },
    { step: "04", title: "Empathy & References", detail: "Behavioral vetting checks", icon: UserCheck }
  ];

  return (
    <section id="why-choose-us" className="scroll-mt-28 py-16 sm:py-20 bg-brand-surface border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            About Aquarius & Standards
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
            Built on Clinical Excellence & Reliability
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 text-justify sm:text-center leading-relaxed">
            Founded in 2016 in Stoney Creek to bridge the gap between quality clinical healthcare and the personal dignity of home across Ontario.
          </p>
        </div>

        {/* Mission, Vision & Multilingual Heritage Band (Inspired by Trillium Med Village) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10">
          <div className="lg:col-span-5 bg-gradient-to-br from-[#F0F6FF] to-white rounded-3xl p-6 sm:p-7 border border-blue-100/90 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-xs">
                  <Compass className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-sm font-extrabold text-brand-navy uppercase tracking-wider">
                  Our Mission
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {MISSION_VISION.mission}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-[#F0FDFB] to-white rounded-3xl p-6 sm:p-7 border border-teal-100/90 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-brand-teal text-white flex items-center justify-center shadow-xs">
                  <Eye className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-sm font-extrabold text-brand-navy uppercase tracking-wider">
                  Our Vision
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {MISSION_VISION.vision}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 bg-brand-navy text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-premium flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Languages className="w-4 h-4 text-brand-teal" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Culturally Sensitive Care
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed text-justify">
                Multilingual matching available so seniors feel understood in their own language:
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {COMPANY_INFO.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-[10px] font-semibold text-slate-100"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs hover:shadow-subtle transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-brand-navy mb-3.5">
                    <Icon className="w-5 h-5 text-brand-navy" />
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {item.tag}
                  </span>

                  <h3 className="text-base font-bold text-brand-navy">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed text-justify">
                    {item.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact 4-Tier Clinical Vetting Bar */}
        <div className="mt-10 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal block">
                Mandatory Quality Assurance
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-brand-navy">
                Our 4-Tier Clinical Vetting Protocol Before Any Deployment
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-3 py-1 rounded-full self-start sm:self-auto">
              100% Screened & Insured
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vettingSteps.map((v) => {
              const VIcon = v.icon;
              return (
                <div key={v.step} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <VIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400">STEP {v.step}</div>
                    <div className="text-xs font-bold text-brand-navy">{v.title}</div>
                    <div className="text-[11px] text-slate-500">{v.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
