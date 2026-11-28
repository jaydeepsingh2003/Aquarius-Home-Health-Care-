import React, { useState } from 'react';
import { ChevronDown, PhoneCall, Calendar } from 'lucide-react';
import { FAQ_ITEMS, COMPANY_INFO } from '../data/healthcareData';

export default function FaqSection({ onOpenConsultationModal }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-28 py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-100 mb-3">
            FAQ & Insurance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 text-justify sm:text-center leading-relaxed">
            Clear answers for Ontario families seeking personalized care and healthcare administrators scheduling facility shifts.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 max-w-3xl mx-auto">
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
                  <div className={`w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand-blue border-brand-blue/30' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white text-justify">
                    <p className="pt-3.5">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pre-Contact Conversation Callout Banner (Inspired by Home Care Help & Divine Home Care) */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy p-6 sm:p-9 text-white shadow-elevated border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block">
              Free, No-Obligation Consultation
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Compassionate Care Starts With a Conversation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl text-justify md:text-left leading-relaxed">
              Not sure which combination of PSW, RPN, or RN support fits best? Speak directly with an Aquarius care coordinator today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
            <button
              onClick={onOpenConsultationModal}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Call</span>
            </button>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-brand-navy hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-brand-blue" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
