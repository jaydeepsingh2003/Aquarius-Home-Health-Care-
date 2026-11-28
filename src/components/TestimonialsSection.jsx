import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "After my mother's hip surgery, Aquarius provided a compassionate PSW and RPN within 24 hours. Their warmth gave our family complete peace of mind.",
      author: "David & Eleanor M.",
      location: "Stoney Creek, ON",
      relation: "Family Care Client",
      roleTag: "PSW & RPN Home Care"
    },
    {
      quote: "Aquarius has been our most dependable hospital staffing partner since 2018. Their CNO nurses arrive pre-vetted, punctual, and ready for acute floors.",
      author: "Karen R., RN, BScN",
      location: "Hamilton, ON",
      relation: "Hospital Unit Manager",
      roleTag: "RN Surge Coverage"
    },
    {
      quote: "With their 24/7 dispatch desk, urgent sick calls are filled with police-vetted PSWs and RPNs in under 15 minutes. Outstanding resident care.",
      author: "Marcus T.",
      location: "Burlington, ON",
      relation: "Director of Care, LTC",
      roleTag: "24/7 Shift Relief"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-soft border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-9">
            <span className="eyebrow">
              Client & Partner Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Trusted Across Ontario Since 2016
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((item, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <div className="h-full card-ab p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <span className="text-xs font-bold text-brand-blue bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                      {item.roleTag}
                    </span>
                  </div>

                  <Quote className="w-6 h-6 text-slate-200 mb-2" />

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-extrabold text-brand-navy">
                      {item.author}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {item.relation} • {item.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
