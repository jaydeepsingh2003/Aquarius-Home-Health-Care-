import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  UserCheck2, 
  HeartHandshake, 
  PhoneCall, 
  Zap, 
  CheckCircle,
  Home,
  Building2,
  ArrowRight
} from 'lucide-react';

export default function HowItWorksSection({ onOpenConsultationModal, onOpenStaffingModal }) {
  const [activeTab, setActiveTab] = useState('families');

  const familySteps = [
    {
      step: '01',
      title: 'Free In-Home Assessment',
      desc: 'Our clinical supervisor visits your home to review medical background, fall risks, daily routines, and family goals.',
      highlight: 'Zero obligation'
    },
    {
      step: '02',
      title: 'Care Plan & Caregiver Matching',
      desc: 'We match a certified PSW, RPN, or RN whose personality, clinical experience, and schedule fit your loved one seamlessly.',
      highlight: 'Matched for Compatibility'
    },
    {
      step: '03',
      title: 'Continuous Compassionate Care',
      desc: 'Care begins with regular clinical oversight, transparent family communication, and flexible scheduling adjustments as needed.',
      highlight: '24/7 Peace of Mind'
    }
  ];

  const facilitySteps = [
    {
      step: '01',
      title: 'Submit Shift Request',
      desc: 'Call (905) 525-5111 or use our instant staffing portal. Specify unit, shift time, and role needed (PSW, RPN, RN).',
      highlight: '24/7 Live Desk'
    },
    {
      step: '02',
      title: 'Instant Credential Verification',
      desc: 'We dispatch pre-screened, CNO-active, and vulnerable sector cleared personnel with confirmation in under 15 minutes.',
      highlight: '< 15 Min Turnaround'
    },
    {
      step: '03',
      title: 'Seamless Floor Readiness',
      desc: 'Our staff arrives on time with photo ID, ready to report to the charge nurse and maintain proper patient ratios.',
      highlight: 'Immediate Readiness'
    }
  ];

  const steps = activeTab === 'families' ? familySteps : facilitySteps;

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            How Our Care & Staffing Works
          </h2>
          <p className="mt-2.5 text-base text-slate-600">
            A simple 3-step experience designed for rapid, dependable execution.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('families')}
              className={`py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
                activeTab === 'families'
                  ? 'bg-white text-brand-navy shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>For Families</span>
            </button>

            <button
              onClick={() => setActiveTab('facilities')}
              className={`py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
                activeTab === 'facilities'
                  ? 'bg-white text-brand-navy shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>For Facilities</span>
            </button>
          </div>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="bg-brand-surface rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-brand-blue">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="text-base font-bold text-brand-navy">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 text-[11px] font-medium text-slate-400">
                Step {idx + 1} of 3
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
