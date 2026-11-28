import React, { useState } from 'react';
import { 
  Home, 
  Building2, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function HowItWorksSection({ onOpenConsultationModal, onOpenStaffingModal }) {
  const [activeTab, setActiveTab] = useState('families');

  const familySteps = [
    {
      step: '01',
      title: 'Tell Us Your Needs',
      desc: 'Request a free call or submit your custom care mix. Share personal care, companionship, memory support, or clinical nursing requirements.',
      highlight: 'Zero Obligation'
    },
    {
      step: '02',
      title: 'Custom Care Plan & Match',
      desc: 'Our clinical supervisor conducts a comprehensive evaluation and proposes hours, schedules, and a language-matched PSW, RPN, or RN.',
      highlight: 'Personal Compatibility'
    },
    {
      step: '03',
      title: 'Care Begins Quickly',
      desc: 'In-home support often begins within 24–48 hours with consistent routine oversight, proactive observation, and 24/7 coordinator check-ins.',
      highlight: '24–48 Hr Start'
    }
  ];

  const facilitySteps = [
    {
      step: '01',
      title: 'Submit Shift Request',
      desc: 'Call (905) 525-5111 or submit our intake form 24/7. Specify unit type, shift timing, and required credentials (PSW, RPN, or RN).',
      highlight: '24/7 Live Desk'
    },
    {
      step: '02',
      title: 'Instant Credential Audit',
      desc: 'Our dispatch desk matches pre-screened, CNO-active, and Police Vulnerable Sector cleared staff with confirmation in under 15 minutes.',
      highlight: '< 15 Min Confirmation'
    },
    {
      step: '03',
      title: 'Seamless Floor Readiness',
      desc: 'Credentialed staff arrive on time with photo ID, ready to report to the charge nurse and maintain compliant patient-to-staff ratios.',
      highlight: 'Immediate Readiness'
    }
  ];

  const steps = activeTab === 'families' ? familySteps : facilitySteps;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-11">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-100 mb-3">
            Simple Onboarding
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
            How Care & Staffing Begins
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 text-justify sm:text-center leading-relaxed">
            A clear 3-step onboarding process—starting private in-home care within 24–48 hours and confirming urgent facility shifts in under 15 minutes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-full border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => setActiveTab('families')}
              className={`py-2 px-5 sm:px-6 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
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
              className={`py-2 px-5 sm:px-6 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
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

        {/* 3 Step Process Grid with Visual Desktop Timeline Connector */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Horizontal Connecting Line */}
          <div className="hidden md:block absolute top-11 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-blue/30 via-brand-teal/40 to-brand-blue/30" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, idx) => (
              <div 
                key={idx}
                className="relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-subtle hover:shadow-premium transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-navy text-white font-black text-base flex items-center justify-center shadow-xs relative z-10">
                      {item.step}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.highlight}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-brand-navy">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>STEP {idx + 1} OF 3</span>
                  <button
                    onClick={activeTab === 'families' ? onOpenConsultationModal : onOpenStaffingModal}
                    className="text-brand-blue hover:underline inline-flex items-center gap-1"
                  >
                    <span>Start Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
