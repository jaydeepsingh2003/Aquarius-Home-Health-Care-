import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Building2, 
  Check, 
  ArrowRight, 
  Calendar, 
  Users,
  HeartHandshake,
  Smile,
  ShieldCheck,
  Activity,
  Utensils,
  Sparkles,
  Car,
  Coffee,
  Stethoscope,
  Moon,
  Clock,
  Heart,
  Plus,
  X,
  CheckCircle2
} from 'lucide-react';
import { MODULAR_HOME_SERVICES, MISSION_VISION } from '../data/healthcareData';

const ICON_MAP = {
  HeartHandshake,
  Smile,
  ShieldCheck,
  Activity,
  Utensils,
  Sparkles,
  Car,
  Coffee,
  Stethoscope,
  Moon,
  Clock,
  Heart
};

export default function DualServicesSection({ 
  activeAudience, 
  onOpenConsultationModal, 
  onOpenStaffingModal,
  onOpenCustomPlanModal
}) {
  const [currentTab, setCurrentTab] = useState(activeAudience || 'families');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCareMix, setSelectedCareMix] = useState([]);

  useEffect(() => {
    if (activeAudience) {
      setCurrentTab(activeAudience);
    }
  }, [activeAudience]);

  const categories = ['All', 'Personal Care', 'Specialized Care', 'Daily Living', 'Extended & Recovery'];

  const filteredModularServices = selectedCategory === 'All'
    ? MODULAR_HOME_SERVICES
    : MODULAR_HOME_SERVICES.filter(s => s.category === selectedCategory);

  const toggleCareService = (title) => {
    setSelectedCareMix(prev =>
      prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
    );
  };

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
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
            Tailored Care & Staffing Solutions
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 text-justify sm:text-center">
            Delivering personalized clinical support in private homes and healthcare institutions across Stoney Creek, Hamilton, and Ontario.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-full border border-slate-200/80 w-full max-w-sm sm:w-auto">
            <button
              onClick={() => setCurrentTab('families')}
              className={`flex-1 sm:flex-none py-2 px-5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                currentTab === 'families'
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>In-Home Care (Families)</span>
            </button>

            <button
              onClick={() => setCurrentTab('facilities')}
              className={`flex-1 sm:flex-none py-2 px-5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                currentTab === 'facilities'
                  ? 'bg-brand-teal text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
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
              className="bg-brand-surface rounded-3xl p-6 border border-slate-200/90 shadow-subtle hover:shadow-premium transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Service Card Photography */}
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-200/70">
                  <img 
                    src={srv.image} 
                    alt={srv.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-brand-navy bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-xs border border-slate-200/70">
                    {srv.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-base sm:text-lg font-extrabold text-brand-navy">
                    {srv.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400">0{idx + 1}</span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  {srv.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-200/70 space-y-2">
                  {srv.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70">
                <button
                  onClick={currentTab === 'families' ? onOpenConsultationModal : onOpenStaffingModal}
                  className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-brand-navy text-brand-navy hover:text-white border border-slate-200 hover:border-brand-navy font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{currentTab === 'families' ? 'Inquire for Home Care' : 'Book Shift Coverage'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modular Custom Care Plan Combiner (Inspired by Home Care Help & Divine Home Care) */}
        <div className="mt-14 pt-12 border-t border-slate-200/80 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-1 block">
                Flexible Care Combinations
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                Build Your Custom In-Home Care Plan
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl text-justify">
                Every service below can stand alone or be combined into one personalized schedule—such as morning personal care, afternoon companionship, and overnight peace of mind. Select the support items you need to include in your free consultation.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition ${
                    selectedCategory === cat
                      ? 'bg-brand-navy text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Care Mix Dark Oxford Navy Action Tray */}
          {selectedCareMix.length > 0 && (
            <div className="mb-6 p-5 rounded-3xl bg-brand-navy text-white border border-slate-800 shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Your Custom Care Plan Mix ({selectedCareMix.length} selected):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareMix.map((title) => (
                    <span
                      key={title}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold text-white"
                    >
                      <span>{title}</span>
                      <button
                        type="button"
                        onClick={() => toggleCareService(title)}
                        className="text-slate-300 hover:text-rose-300"
                        aria-label={`Remove ${title}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (onOpenCustomPlanModal) {
                    onOpenCustomPlanModal(selectedCareMix);
                  } else {
                    onOpenConsultationModal();
                  }
                }}
                className="px-6 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 flex-shrink-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation with This Plan</span>
              </button>
            </div>
          )}

          {/* 12-Service Modular Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {filteredModularServices.map((srv) => {
              const IconComp = ICON_MAP[srv.iconName] || HeartHandshake;
              const isSelected = selectedCareMix.includes(srv.title);

              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => toggleCareService(srv.title)}
                  className={`text-left p-4 rounded-2xl border transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/70 border-brand-blue ring-1 ring-brand-blue shadow-xs'
                      : 'bg-brand-surface border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-brand-blue text-white' : 'bg-white border border-slate-200 text-brand-navy'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-brand-blue text-white'
                          : 'bg-white border border-slate-200 text-slate-500'
                      }`}>
                        {isSelected ? <Check className="w-2.5 h-2.5" /> : <Plus className="w-2.5 h-2.5" />}
                        <span>{isSelected ? 'Added' : 'Add'}</span>
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-brand-navy">
                      {srv.title}
                    </h4>
                    <p className="mt-1.5 text-[11px] text-slate-600 leading-relaxed text-justify">
                      {srv.summary}
                    </p>
                  </div>

                  <span className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-semibold text-slate-400 block">
                    {srv.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Who This Care Helps & Consistency Promise Strip (Inspired by Divine Home Care) */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-navy mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-blue" />
                <span>Who Our In-Home Care Helps</span>
              </h4>
              <div className="space-y-2">
                {MISSION_VISION.whoItHelps.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="text-justify">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-navy mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-teal" />
                <span>Consistency & Proactive Observation Promise</span>
              </h4>
              <div className="space-y-2">
                {MISSION_VISION.consistencyPromise.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="text-justify">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
