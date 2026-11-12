import React from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Clock, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

export default function PillarsSection({ onOpenConsultationModal, onOpenStaffingModal }) {
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

  return (
    <section id="why-choose-us" className="scroll-mt-28 py-16 sm:py-20 bg-brand-surface border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Why Choose Aquarius
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
            Built on Clinical Excellence & Reliability
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Founded in 2016 to bridge the gap between quality healthcare and personal comfort.
          </p>
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

      </div>
    </section>
  );
}
