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
    <section className="py-20 bg-brand-surface border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Client & Healthcare Partner Feedback
          </h2>
          <p className="mt-2.5 text-base text-slate-600">
            Trusted by families and healthcare institutions across Ontario since 2016.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-brand-navy">
                  {item.author}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {item.relation} • {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
