import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      type: 'Family In-Home Care',
      quote: "When my mother was discharged from the hospital after hip surgery, we were overwhelmed. Aquarius provided an exceptional PSW and an RPN within 24 hours. The compassion and dignity they treated my mother with gave our entire family peace of mind.",
      author: "David & Eleanor M.",
      location: "Stoney Creek, ON",
      relation: "Family of Senior Patient",
      rating: 5,
      roleTag: "PSW & RPN In-Home Care"
    },
    {
      type: 'Hospital Acute Care Staffing',
      quote: "Staffing shortages can paralyze an acute ward during winter surges. Aquarius has been our most dependable staffing partner since 2018. Their registered nurses arrive on time, pre-vetted, and ready to take on heavy patient loads with zero friction.",
      author: "Karen R., RN, BScN",
      location: "Hamilton Healthcare Network",
      relation: "Clinical Unit Manager",
      rating: 5,
      roleTag: "RN Surge Coverage"
    },
    {
      type: 'Long-Term Care Home',
      quote: "Sudden morning sick calls used to cause massive panic. With Aquarius's 24/7 dispatch desk, we get qualified, police-vetted PSWs and RPNs confirmed in under 15 minutes. Their clinical documentation standards and resident warmth are top-notch.",
      author: "Marcus T.",
      location: "Burlington, ON",
      relation: "Director of Care, LTC",
      rating: 5,
      roleTag: "24/7 Shift Relief"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-brand-surface border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/70 mb-3">
            Client & Partner Voices
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
            Trusted Across Ontario Since 2016
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 text-justify sm:text-center leading-relaxed">
            Real feedback from Stoney Creek families, hospital clinical managers, and long-term care directors who rely on Aquarius daily.
          </p>
        </div>

        {/* 3 Elevated Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className="relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-subtle hover:shadow-premium transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold text-brand-blue bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                    {item.roleTag}
                  </span>
                </div>

                <Quote className="w-7 h-7 text-slate-200 mb-2" />

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-navy">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {item.relation} • {item.location}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
