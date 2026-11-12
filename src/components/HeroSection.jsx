import React from 'react';
import { 
  ArrowRight, 
  PhoneCall, 
  Building2, 
  Home, 
  Check, 
  Sparkles,
  ShieldCheck
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
    <section id="home" className="scroll-mt-28 bg-white pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Segmented Switcher */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-2xs w-full max-w-sm sm:w-auto">
            <button
              onClick={() => setActiveAudience('families')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
                isFamily
                  ? 'bg-white text-brand-navy shadow-xs'
                  : 'text-slate-500 hover:text-brand-navy'
              }`}
            >
              <Home className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFamily ? 'text-brand-blue' : 'text-slate-400'}`} />
              <span>For Families</span>
            </button>

            <button
              onClick={() => setActiveAudience('facilities')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
                !isFamily
                  ? 'bg-white text-brand-navy shadow-xs'
                  : 'text-slate-500 hover:text-brand-navy'
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${!isFamily ? 'text-brand-teal' : 'text-slate-400'}`} />
              <span>For Facilities</span>
            </button>
          </div>
        </div>

        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Authoritative Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
              <span>Stoney Creek & Greater Hamilton Area</span>
            </div>

            {/* Headline */}
            {isFamily ? (
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-[1.18] sm:leading-[1.15]">
                Dignified, Compassionate <br className="hidden sm:inline" />
                In-Home Healthcare.
              </h1>
            ) : (
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-[1.18] sm:leading-[1.15]">
                Reliable 24/7 Clinical Staffing <br className="hidden sm:inline" />
                for Healthcare Facilities.
              </h1>
            )}

            {/* Justified Description */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed text-justify max-w-2xl mx-auto lg:mx-0">
              {isFamily ? (
                <>
                  Since 2016, <strong>Aquarius Home Health Care</strong> has delivered personalized, certified nursing and personal support where it matters most—in the comfort of home. Supporting independence while giving families complete peace of mind.
                </>
              ) : (
                <>
                  Built on clinical rigor and rapid responsiveness, we ensure hospitals, clinics, and long-term care homes never compromise on patient care due to sudden sick calls, vacancies, or patient surges.
                </>
              )}
            </p>

            {/* Clean, Perfectly Aligned Verification Checklist */}
            <div className="mt-6 flex justify-center lg:justify-start">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-6 text-xs font-semibold text-slate-700 bg-slate-50 sm:bg-transparent px-4 py-3 sm:p-0 rounded-2xl border border-slate-200/60 sm:border-0 w-full sm:w-auto max-w-sm sm:max-w-none">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-teal-50 text-brand-teal flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Police Vulnerable Sector Screened</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-teal-50 text-brand-teal flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>CNO Active Licensing Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-teal-50 text-brand-teal flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>24/7 Rapid Dispatch</span>
                </div>
              </div>
            </div>

            {/* Clean Action Buttons */}
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              {isFamily ? (
                <>
                  <button
                    onClick={onOpenConsultationModal}
                    className="px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <span>Book Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onScrollToWizard}
                    className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-brand-navy border border-slate-200 font-semibold text-sm transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-brand-blue" />
                    <span>Take 60-Sec Care Matcher</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onOpenStaffingModal}
                    className="px-6 py-3.5 rounded-xl bg-brand-teal hover:bg-teal-800 text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <span>Request Urgent Shift Coverage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-brand-navy border border-slate-200 font-semibold text-sm transition flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4 text-brand-blue" />
                    <span>Call (905) 525-5111</span>
                  </a>
                </>
              )}
            </div>

          </div>

          {/* Right Column: Clean Clinical Image & Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-brand-surface rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-subtle overflow-hidden">
              
              {/* High-Resolution Hero Visual */}
              <div className="relative rounded-2xl overflow-hidden mb-4 shadow-xs aspect-[16/10] bg-slate-100">
                <img 
                  src="/images/hero-homecare.jpg" 
                  alt="Aquarius Home Health Care nurse providing compassionate bedside care to an elderly senior at home" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200/80 text-[10px] font-bold text-brand-navy shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>CNO & PVSS Verified Staff</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-brand-navy/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[10px] font-bold shadow-xs">
                  Est. 2016 • Stoney Creek, ON
                </div>
              </div>

              {/* 3 Staff Tiers */}
              <div className="space-y-2">
                
                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-brand-navy">Personal Support Workers (PSW)</span>
                    <span className="text-[10px] font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded">ADLs</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 text-justify">
                    Personal hygiene, safe transfers, meal assistance, and companionship.
                  </p>
                </div>

                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-brand-navy">Registered Practical Nurses (RPN)</span>
                    <span className="text-[10px] font-bold text-brand-teal bg-teal-50 px-2 py-0.5 rounded">CNO Licensed</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 text-justify">
                    Wound dressings, subcutaneous injections, catheter care, and vital monitoring.
                  </p>
                </div>

                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-brand-navy">Registered Nurses (RN)</span>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Acute Care</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 text-justify">
                    Complex assessment, IV therapy, palliative comfort, and unit leadership.
                  </p>
                </div>

              </div>

              {/* Quick direct line inside card */}
              <div className="mt-3.5 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">24/7 Dispatch Desk:</span>
                <a 
                  href={`tel:${COMPANY_INFO.phoneRaw}`} 
                  className="font-bold text-brand-navy hover:text-brand-blue transition"
                >
                  (905) 525-5111
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Clean Stats Strip */}
        <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {TRUST_STATS.map((stat, idx) => (
            <div key={idx} className="p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-brand-blue mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
