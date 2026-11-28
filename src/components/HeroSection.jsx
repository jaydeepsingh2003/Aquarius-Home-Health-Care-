import React from 'react';
import { 
  ArrowRight, 
  PhoneCall, 
  Building2, 
  Home, 
  ShieldCheck,
  ClipboardList,
  Sun,
  Coffee,
  Sunset,
  Moon,
  Award
} from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/healthcareData';

export default function HeroSection({ 
  activeAudience, 
  setActiveAudience, 
  onOpenStaffingModal, 
  onOpenConsultationModal,
  onScrollToWizard 
}) {
  const isFamily = activeAudience === 'families';

  const rhythmSteps = [
    { time: "Morning", title: "Hygiene & Vitals", desc: "Safe bathing, dressing & breakfast.", icon: Sun },
    { time: "Afternoon", title: "Mobility & Companionship", desc: "Walks, tea & appointment escorts.", icon: Coffee },
    { time: "Evening", title: "Meals & Medication", desc: "Dinner prep & bedtime calm routines.", icon: Sunset },
    { time: "Overnight", title: "24/7 Peace of Mind", desc: "Awake safety & rapid shift response.", icon: Moon }
  ];

  return (
    <section id="home" className="scroll-mt-28 hero-surface pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Pill Switcher */}
        <div className="flex justify-center lg:justify-start mb-6 animate-fadeUp">
          <div className="inline-flex p-1.5 bg-white rounded-full border border-slate-200/90 shadow-subtle w-full max-w-sm sm:w-auto">
            <button
              onClick={() => setActiveAudience('families')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all ${
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
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all ${
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

        {/* HomeCareHelp-Inspired Hero Two-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline, Pills, Buttons & Trust Strip */}
          <div className="lg:col-span-6 text-center lg:text-left animate-fadeUp">
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-brand-navy shadow-subtle">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                <span>CNO Licensed & Police Screened</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-brand-navy shadow-subtle">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Proudly Canadian • Since 2016</span>
              </span>
            </div>

            {isFamily ? (
              <h1 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-extrabold text-brand-navy tracking-tight leading-[1.13]">
                Compassionate Home Care in{' '}
                <span className="text-brand-blue">Stoney Creek & Hamilton</span>
              </h1>
            ) : (
              <h1 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-extrabold text-brand-navy tracking-tight leading-[1.13]">
                Reliable 24/7 Nursing Staffing for{' '}
                <span className="text-brand-teal">Healthcare Facilities</span>
              </h1>
            )}

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-justify max-w-xl mx-auto lg:mx-0">
              {isFamily ? (
                <>
                  <strong>Aquarius Home Health Care</strong> delivers personalized PSW, RPN, and RN support for seniors and families across Stoney Creek, Hamilton, and Ontario—preserving dignity at home.
                </>
              ) : (
                <>
                  Built on clinical rigor and rapid dispatch, we supply hospitals, long-term care homes, and clinics with pre-screened PSWs, RPNs, and RNs within minutes.
                </>
              )}
            </p>

            {/* Primary Pill Action Buttons */}
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              {isFamily ? (
                <>
                  <button
                    onClick={onOpenConsultationModal}
                    className="px-7 py-3.5 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-premium hover:shadow-elevated transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    <span>Book Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onScrollToWizard}
                    className="px-6 py-3.5 rounded-full bg-white hover:bg-brand-navy text-brand-navy hover:text-white border-2 border-brand-navy/20 hover:border-brand-navy font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>60-Sec Care Assessment</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onOpenStaffingModal}
                    className="px-7 py-3.5 rounded-full bg-brand-teal hover:bg-teal-800 text-white font-bold text-sm sm:text-base shadow-premium hover:shadow-elevated transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    <span>Request Urgent Shift Coverage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="px-6 py-3.5 rounded-full bg-white hover:bg-brand-navy text-brand-navy hover:text-white border-2 border-brand-navy/20 hover:border-brand-navy font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call (905) 525-5111</span>
                  </a>
                </>
              )}
            </div>

            {/* Signature Overlapping Caregiver Avatars Strip */}
            <div className="mt-7 pt-2 flex items-center justify-center lg:justify-start gap-3.5">
              <div className="flex -space-x-3">
                <img 
                  src="/images/care-companionship.jpg" 
                  alt="Aquarius PSW Team Member" 
                  className="w-11 h-11 rounded-full object-cover border-[3px] border-white shadow-xs"
                />
                <img 
                  src="/images/care-clinical-nursing.jpg" 
                  alt="Aquarius RN Team Member" 
                  className="w-11 h-11 rounded-full object-cover border-[3px] border-white shadow-xs"
                />
                <img 
                  src="/images/hero-aquarius-care.jpg" 
                  alt="Aquarius Mobility Caregiver" 
                  className="w-11 h-11 rounded-full object-cover border-[3px] border-white shadow-xs"
                />
              </div>
              <p className="text-sm text-slate-600 text-left leading-snug">
                Trusted across <strong className="text-brand-navy">{SERVICE_AREAS.length}+ Ontario communities</strong><br className="hidden sm:inline" /> with 24/7 dispatch at <strong className="text-brand-blue">{COMPANY_INFO.phone}</strong>
              </p>
            </div>

          </div>

          {/* Right Column: Signature Hero Media Frame + Floating Cards */}
          <div className="lg:col-span-6 animate-fadeIn">
            <div className="relative mx-auto max-w-xl lg:max-w-none pb-5 sm:pb-6 pl-0 sm:pl-5">
              
              <div className="relative rounded-[28px] overflow-hidden shadow-elevated border-4 border-white bg-white">
                <img 
                  src={isFamily ? "/images/hero-aquarius-care.jpg" : "/images/care-clinical-nursing.jpg"} 
                  alt={isFamily ? "Aquarius caregiver supporting a smiling grandfather at home" : "Aquarius registered nurse checking vitals cleanly"} 
                  className="w-full h-[300px] sm:h-[390px] object-cover transition-all duration-500"
                  loading="eager"
                />
              </div>

              {/* Floating Top-Right Experience Card */}
              <div className="hidden sm:flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-elevated border border-slate-100 absolute top-5 -right-2 animate-float">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-brand-navy leading-tight">Est. 2016</div>
                  <div className="text-xs text-slate-500 font-medium">10+ Years Caring in Ontario</div>
                </div>
              </div>

              {/* Floating Bottom-Left Stat Card (Signature hero-stat-card) */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:left-0 sm:bottom-0 bg-white rounded-2xl p-4 shadow-elevated border border-slate-100 flex items-center gap-3.5 max-w-xs mx-auto sm:mx-0">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF1FA] text-brand-blue flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-black text-brand-blue leading-none">&lt; 15 Min</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                    24/7 Dispatch & Care Coordination
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Signature HomeCareHelp 4-Segment Daily Care Rhythm Strip */}
        <div className="mt-10 sm:mt-14 bg-white rounded-[26px] border border-slate-200/90 shadow-premium overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
          {rhythmSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="p-5 sm:p-6 relative hover:bg-blue-50/35 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                    {step.time}
                  </span>
                  <Icon className="w-5 h-5 text-brand-teal" />
                </div>
                <h3 className="text-base font-extrabold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-snug">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
