import React, { useState } from 'react';
import { 
  Home, 
  Building2, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Reveal from './Reveal';

export default function HowItWorksSection({ onOpenConsultationModal, onOpenStaffingModal }) {
  const [activeTab, setActiveTab] = useState('families');

  const familySteps = [
    {
      step: '01',
      title: 'Tell Us Your Needs',
      desc: 'Book a free call to discuss personal care, memory support, or clinical nursing needs.',
      highlight: 'Zero Obligation'
    },
    {
      step: '02',
      title: 'Custom Care Plan & Match',
      desc: 'We design a flexible schedule and match a language- & personality-compatible caregiver.',
      highlight: 'Personal Fit'
    },
    {
      step: '03',
      title: 'Care Begins Quickly',
      desc: 'In-home support typically begins within 24–48 hours with 24/7 coordinator check-ins.',
      highlight: '24–48 Hr Start'
    }
  ];

  const facilitySteps = [
    {
      step: '01',
      title: 'Submit Shift Request',
      desc: 'Call (905) 525-5111 or submit intake 24/7 with unit type, shift time, and role needed.',
      highlight: '24/7 Live Desk'
    },
    {
      step: '02',
      title: 'Instant Credential Audit',
      desc: 'We assign pre-screened, CNO-active, and PVSS-cleared staff in under 15 minutes.',
      highlight: '< 15 Min Dispatch'
    },
    {
      step: '03',
      title: 'Seamless Floor Readiness',
      desc: 'Staff arrive punctually with full ID, ready to report directly to your charge nurse.',
      highlight: 'Shift Ready'
    }
  ];

  const steps = activeTab === 'families' ? familySteps : facilitySteps;

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
            <span className="eyebrow">
              3-Step Onboarding
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              How Care & Staffing Begins
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 text-justify sm:text-center leading-relaxed">
              Fast, transparent setup—starting in-home care in 24–48 hours and confirming urgent facility shifts in under 15 minutes.
            </p>
          </div>
        </Reveal>

        <div className="flex justify-center mb-9">
          <div className="inline-flex p-1.5 bg-[#EAF1FA] rounded-full border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => setActiveTab('families')}
              className={`py-2 px-5 sm:px-6 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'families'
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>For Families</span>
            </button>

            <button
              onClick={() => setActiveTab('facilities')}
              className={`py-2 px-5 sm:px-6 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'facilities'
                  ? 'bg-brand-teal text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>For Facilities</span>
            </button>
          </div>
        </div>

        {/* 3 Step Grid with Timeline Line */}
        <div className="relative max-w-6xl mx-auto">
          <div className="hidden md:block absolute top-11 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-blue/30 via-brand-teal/40 to-brand-blue/30" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, idx) => (
              <Reveal key={`${activeTab}-${idx}`} delay={idx * 90}>
                <div className="h-full relative card-ab p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-brand-navy text-white font-black text-base flex items-center justify-center shadow-xs relative z-10">
                        {item.step}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-teal bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.highlight}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-brand-navy">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 leading-relaxed text-justify">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>STEP {idx + 1} OF 3</span>
                    <button
                      onClick={activeTab === 'families' ? onOpenConsultationModal : onOpenStaffingModal}
                      className="text-brand-blue hover:underline inline-flex items-center gap-1 text-sm"
                    >
                      <span>Start Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
