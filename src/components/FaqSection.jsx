import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/healthcareData';
import Reveal from './Reveal';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-28 py-12 sm:py-16 bg-white border-b border-slate-200/70">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="eyebrow">
              FAQ & Insurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 text-justify sm:text-center">
              Quick answers about start times, CNO screening, insurance, and 24/7 dispatch.
            </p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition overflow-hidden ${
                  isOpen 
                    ? 'border-brand-blue/40 bg-white shadow-subtle' 
                    : 'border-slate-200/80 bg-brand-surface'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition"
                >
                  <span className="font-bold text-sm sm:text-base text-brand-navy">
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand-blue border-brand-blue/30' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 bg-white text-justify animate-fadeIn">
                    <p className="pt-3.5">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
