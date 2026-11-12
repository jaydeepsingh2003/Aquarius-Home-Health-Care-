import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Building2, 
  Check, 
  ArrowRight, 
  Calendar, 
  Users 
} from 'lucide-react';

export default function DualServicesSection({ 
  activeAudience, 
  onOpenConsultationModal, 
  onOpenStaffingModal 
}) {
  const [currentTab, setCurrentTab] = useState(activeAudience || 'families');

  useEffect(() => {
    if (activeAudience) {
      setCurrentTab(activeAudience);
    }
  }, [activeAudience]);

  const familyServices = [
    {
      title: "Personal Support Workers (PSW)",
      badge: "In-Home ADLs",
      image: "/images/service-psw.jpg",
      desc: "Assisting with bathing, dressing, personal hygiene, safe mobility, fall prevention, nutritional meal preparation, and heartfelt companionship.",
      items: ["Personal hygiene & grooming", "Mobility assistance & transfers", "Meal prep & hydration logging", "Gentle dementia memory routines"]
    },
    {
      title: "Registered Practical Nurses (RPN)",
      badge: "CNO Licensed",
      image: "/images/service-rpn.jpg",
      desc: "Delivering skilled clinical interventions, complex medication administration, wound care management, catheter care, and chronic health tracking.",
      items: ["Surgical wound management", "Subcutaneous/IM injections", "Catheter & stoma care", "Diabetic & chronic monitoring"]
    },
    {
      title: "Registered Nurses (RN)",
      badge: "Advanced Care",
      image: "/images/hero-homecare.jpg",
      desc: "High-acuity clinical assessment, post-surgical acute rehabilitation, IV therapy, and compassionate end-of-life palliative comfort care.",
      items: ["Complex clinical assessments", "IV therapy & pain management", "Post-op acute monitoring", "Palliative & family respite care"]
    }
  ];

  const facilityServices = [
    {
      title: "Urgent Shift Replacement",
      badge: "< 15 Min Confirmation",
      image: "/images/service-facility.jpg",
      desc: "Immediate shift replenishment for sudden sick calls, staff vacancies, and unstaffed weekend and night shifts across Hamilton & Stoney Creek.",
      items: ["Rapid same-day dispatch", "Day, evening & night coverage", "Fully compliant credential audit", "Direct charge nurse coordination"]
    },
    {
      title: "Long-Term Care & Retirement",
      badge: "Geriatric Excellence",
      image: "/images/service-psw.jpg",
      desc: "Dependable PSWs and RPNs trained in Ontario Ministry standards, geriatric bedside empathy, and PointClickCare documentation systems.",
      items: ["Resident hygiene & transfer safety", "Medication pass administration", "Consistent unit assignments", "Zero onboarding friction"]
    },
    {
      title: "Hospital & Acute Ward Surge",
      badge: "Clinical Readiness",
      image: "/images/service-rpn.jpg",
      desc: "Pre-screened, experienced RNs and RPNs ready to support acute medical, surgical, and sub-acute hospital departments during seasonal surges.",
      items: ["CNO registered personnel", "ACLS / BLS certified nurses", "Immediate bedside integration", "Flexible short & block booking"]
    }
  ];

  const currentList = currentTab === 'families' ? familyServices : facilityServices;

  return (
    <section id="services" className="scroll-mt-28 py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
            Tailored Care & Staffing Solutions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Delivering personalized clinical support in private homes and healthcare institutions.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80 w-full max-w-sm sm:w-auto">
            <button
              onClick={() => setCurrentTab('families')}
              className={`flex-1 sm:flex-none py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
                currentTab === 'families'
                  ? 'bg-white text-brand-navy shadow-xs'
                  : 'text-slate-500 hover:text-brand-navy'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>In-Home Care (Families)</span>
            </button>

            <button
              onClick={() => setCurrentTab('facilities')}
              className={`flex-1 sm:flex-none py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
                currentTab === 'facilities'
                  ? 'bg-white text-brand-navy shadow-xs'
                  : 'text-slate-500 hover:text-brand-navy'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Facility Staffing (B2B)</span>
            </button>
          </div>
        </div>

        {/* 3-Card Balanced Grid with Visual Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentList.map((srv, idx) => (
            <div
              key={idx}
              className="bg-brand-surface rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-subtle transition flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Service Card Photography */}
                <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/70">
                  <img 
                    src={srv.image} 
                    alt={srv.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-brand-navy bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-2xs border border-slate-200/60">
                    {srv.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-brand-navy">
                    {srv.title}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">0{idx + 1}</span>
                </div>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed text-justify">
                  {srv.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-2">
                  {srv.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60">
                <button
                  onClick={currentTab === 'families' ? onOpenConsultationModal : onOpenStaffingModal}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-brand-navy border border-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>{currentTab === 'families' ? 'Inquire for Home Care' : 'Book Shift Coverage'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Switch Helper */}
        <div className="mt-10 text-center">
          {currentTab === 'families' ? (
            <p className="text-xs text-slate-500">
              Are you a hospital, LTC, or retirement residence coordinator?{' '}
              <a href="#facilities" className="font-bold text-brand-blue hover:underline">
                Explore Institutional Facility Staffing Solutions →
              </a>
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Looking for dedicated in-home support for an aging parent or family member?{' '}
              <button onClick={() => setCurrentTab('families')} className="font-bold text-brand-teal hover:underline">
                Switch to In-Home Care Services →
              </button>
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
