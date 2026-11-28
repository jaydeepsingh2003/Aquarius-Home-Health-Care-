import React from 'react';
import { 
  ArrowRight, 
  PhoneCall, 
  Building2, 
  Home, 
  Check, 
  ShieldCheck,
  ClipboardList
} from 'lucide-react';
import { COMPANY_INFO, TRUST_STATS } from '../data/healthcareData';

export default function HeroSection({ 
  activeAudience, 
  setActiveAudience, 
  onOpenStaffingModal, 
  onOpenConsultationModal,
  onScrollToWizard 
}) {
  const isFamily = activeAudience === 'families';

  return (
    <section id="home" className="scroll-mt-28 relative overflow-hidden bg-gradient-to-b from-[#F0F6FF] via-white to-white pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-slate-200/70">
      
      {/* Subtle Ambient Healthcare Radial Accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-teal-100/40 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Executive Segmented Audience Switcher */}
        <div className="flex justify-center mb-6 sm:mb-8 animate-fadeUp">
          <div className="inline-flex p-1.5 bg-white rounded-full border border-slate-200/90 shadow-subtle w-full max-w-sm sm:w-auto">
            <button
              onClick={() => setActiveAudience('families')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                isFamily
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              <Home className={`w-4 h-4 ${isFamily ? 'text-blue-300' : 'text-slate-400'}`} />
              <span>For Families</span>
            </button>

            <button
              onClick={() => setActiveAudience('facilities')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                !isFamily
                  ? 'bg-brand-teal text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              <Building2 className={`w-4 h-4 ${!isFamily ? 'text-teal-100' : 'text-slate-400'}`} />
              <span>For Facilities</span>
            </button>
          </div>
        </div>

        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Readable Copy */}
          <div className="lg:col-span-7 text-center lg:text-left animate-fadeUp">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-brand-navy text-xs sm:text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Stoney Creek & Greater Hamilton • Since 2016</span>
            </div>

            {isFamily ? (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-[1.15]">
                Dignified, Compassionate <br className="hidden sm:inline" />
                <span className="text-brand-blue">In-Home Healthcare.</span>
              </h1>
            ) : (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-[1.15]">
                Reliable 24/7 Clinical Staffing <br className="hidden sm:inline" />
                <span className="text-brand-teal">for Healthcare Facilities.</span>
              </h1>
            )}

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-justify max-w-2xl mx-auto lg:mx-0">
              {isFamily ? (
                <>
                  Since 2016, <strong>Aquarius Home Health Care</strong> has delivered certified nursing and personal support in the comfort of home—helping seniors stay independent with complete family peace of mind.
                </>
              ) : (
                <>
                  We provide hospitals, long-term care homes, and clinics with pre-screened PSWs, RPNs, and RNs on demand—eliminating shift gaps caused by sick calls or sudden surges.
                </>
              )}
            </p>

            {/* Clear Verification Checklist */}
            <div className="mt-5 flex justify-center lg:justify-start">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 text-sm font-semibold text-slate-700 bg-white sm:bg-transparent px-4 py-3.5 sm:p-0 rounded-2xl border border-slate-200/80 sm:border-0 w-full sm:w-auto max-w-sm sm:max-w-none">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-50 border border-teal-100 text-brand-teal flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Police Screened</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 text-brand-blue flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>CNO Licensed Staff</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-100 text-brand-amber flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>24/7 Dispatch</span>
                </div>
              </div>
            </div>

            {/* Action Pill Buttons */}
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              {isFamily ? (
                <>
                  <button
                    onClick={onOpenConsultationModal}
                    className="px-7 py-3.5 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-premium hover:shadow-elevated transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>Book Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onScrollToWizard}
                    className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-brand-navy border border-slate-200 font-bold text-sm sm:text-base shadow-subtle transition-all flex items-center justify-center gap-2"
                  >
                    <ClipboardList className="w-4 h-4 text-brand-blue" />
                    <span>60-Sec Care Assessment</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onOpenStaffingModal}
                    className="px-7 py-3.5 rounded-full bg-brand-teal hover:bg-teal-800 text-white font-bold text-sm sm:text-base shadow-premium hover:shadow-elevated transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>Request Urgent Shift Coverage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-brand-navy border border-slate-200 font-bold text-sm sm:text-base shadow-subtle transition-all flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4 text-brand-blue" />
                    <span>Call (905) 525-5111</span>
                  </a>
                </>
              )}
            </div>

          </div>

          {/* Right Column: Elevated Clinical Image & Tier Card */}
          <div className="lg:col-span-5 animate-fadeIn">
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-elevated overflow-hidden card-hover">
              
              {/* Hero Photo */}
              <div className="relative rounded-2xl overflow-hidden mb-4 shadow-xs aspect-[16/10] bg-slate-100">
                <img 
                  src="/images/hero-homecare.jpg" 
                  alt="Aquarius Home Health Care nurse caring for a senior at home" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/80 text-xs font-bold text-brand-navy shadow-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CNO & PVSS Verified</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                  <span className="bg-brand-navy/85 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    Est. 2016 • Stoney Creek
                  </span>
                  <span className="bg-emerald-600/95 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    24/7 Active
                  </span>
                </div>
              </div>

              {/* 3 Staff Tiers */}
              <div className="space-y-2">
                <div className="p-3 bg-slate-50/90 rounded-2xl border border-slate-200/70">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-brand-navy">Personal Support Workers (PSW)</span>
                    <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2.5 py-0.5 rounded-full">ADLs</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5 text-justify">
                    Hygiene, safe transfers, meal prep & companionship.
                  </p>
                </div>

                <div className="p-3 bg-slate-50/90 rounded-2xl border border-slate-200/70">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-brand-navy">Registered Practical Nurses (RPN)</span>
                    <span className="text-xs font-bold text-brand-teal bg-teal-50 px-2.5 py-0.5 rounded-full">CNO</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5 text-justify">
                    Wound care, injections, catheter & vitals monitoring.
                  </p>
                </div>

                <div className="p-3 bg-slate-50/90 rounded-2xl border border-slate-200/70">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-brand-navy">Registered Nurses (RN)</span>
                    <span className="text-xs font-bold text-brand-navy bg-white border border-slate-200 px-2.5 py-0.5 rounded-full">Acute</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5 text-justify">
                    Complex care, IV therapy & palliative support.
                  </p>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">24/7 Dispatch Desk:</span>
                <a 
                  href={`tel:${COMPANY_INFO.phoneRaw}`} 
                  className="font-extrabold text-brand-blue hover:text-brand-navy transition"
                >
                  (905) 525-5111
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* High-Contrast Dark Oxford Navy Stats Ribbon */}
        <div className="mt-10 sm:mt-12 bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-navy rounded-3xl p-5 sm:p-7 text-white shadow-elevated border border-slate-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-center divide-y-0 lg:divide-x divide-white/10">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="px-2">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-teal-300 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
