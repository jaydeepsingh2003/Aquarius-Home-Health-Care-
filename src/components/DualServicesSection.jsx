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
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { MODULAR_HOME_SERVICES, MISSION_VISION } from '../data/healthcareData';
import Reveal from './Reveal';

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
      desc: "Respectful assistance with bathing, dressing, safe transfers, meal preparation, and daily companionship.",
      items: ["Personal hygiene & grooming", "Safe mobility & meal support", "Gentle dementia memory routines"]
    },
    {
      title: "Registered Practical Nurses (RPN)",
      badge: "CNO Licensed",
      image: "/images/service-rpn.jpg",
      desc: "Skilled clinical care including complex medication administration, wound dressings, catheter care, and monitoring.",
      items: ["Surgical wound care", "Injections & diabetic care", "Catheter & chronic tracking"]
    },
    {
      title: "Registered Nurses (RN)",
      badge: "Advanced Care",
      image: "/images/hero-homecare.jpg",
      desc: "High-acuity assessments, post-surgical recovery, IV therapy, and compassionate palliative comfort care.",
      items: ["Complex clinical assessments", "IV therapy & pain management", "Palliative & respite comfort"]
    }
  ];

  const facilityServices = [
    {
      title: "Urgent Shift Replacement",
      badge: "< 15 Min Confirmation",
      image: "/images/service-facility.jpg",
      desc: "Immediate same-day staffing for sudden sick calls, weekend shortages, and unstaffed overnight shifts.",
      items: ["Rapid 24/7 dispatch", "Pre-screened & CNO audited", "Charge nurse coordination"]
    },
    {
      title: "Long-Term Care & Retirement",
      badge: "Geriatric Excellence",
      image: "/images/service-psw.jpg",
      desc: "Dependable PSWs and RPNs trained in Ontario Ministry standards, safe lifts, and PointClickCare charting.",
      items: ["Resident ADLs & safety", "Medication pass coverage", "Consistent unit placement"]
    },
    {
      title: "Hospital & Acute Ward Surge",
      badge: "Clinical Readiness",
      image: "/images/service-rpn.jpg",
      desc: "Experienced RNs and RPNs ready to step into medical, surgical, and sub-acute floors during seasonal surges.",
      items: ["ACLS / BLS certified nurses", "Immediate floor integration", "Flexible block bookings"]
    }
  ];

  const currentList = currentTab === 'families' ? familyServices : facilityServices;

  return (
    <section id="services" className="scroll-mt-28 py-12 sm:py-16 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-blue mb-1.5 block">
              Our Services
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Tailored Care & Staffing Solutions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 text-justify sm:text-center leading-relaxed">
              Choose certified care roles or build a personalized in-home care schedule in seconds.
            </p>
          </div>
        </Reveal>

        {/* Clean 3-Way Tab Toggle Keeps Height Short & Organized */}
        <div className="flex justify-center mb-9">
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-slate-100 rounded-2xl sm:rounded-full border border-slate-200/80 gap-1">
            <button
              onClick={() => setCurrentTab('families')}
              className={`py-2 px-4 sm:px-5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                currentTab === 'families'
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>In-Home Care (Roles)</span>
            </button>

            <button
              onClick={() => setCurrentTab('custom')}
              className={`py-2 px-4 sm:px-5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                currentTab === 'custom'
                  ? 'bg-brand-blue text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Build Custom Care Plan</span>
            </button>

            <button
              onClick={() => setCurrentTab('facilities')}
              className={`py-2 px-4 sm:px-5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                currentTab === 'facilities'
                  ? 'bg-brand-teal text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Facility Staffing</span>
            </button>
          </div>
        </div>

        {currentTab === 'custom' ? (
          /* Compact Interactive 12-Service Custom Care Plan Combiner */
          <div className="max-w-6xl mx-auto animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <p className="text-sm sm:text-base text-slate-600 text-justify">
                Select one or more services below to combine into a custom in-home care schedule:
              </p>

              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
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

            {selectedCareMix.length > 0 && (
              <div className="mb-6 p-5 rounded-3xl bg-brand-navy text-white border border-slate-800 shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-teal-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    <span>Your Custom Care Plan ({selectedCareMix.length} selected):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCareMix.map((title) => (
                      <span
                        key={title}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white"
                      >
                        <span>{title}</span>
                        <button
                          type="button"
                          onClick={() => toggleCareService(title)}
                          className="text-slate-300 hover:text-rose-300"
                          aria-label={`Remove ${title}`}
                        >
                          <X className="w-3.5 h-3.5" />
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
                  className="px-6 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredModularServices.map((srv) => {
                const IconComp = ICON_MAP[srv.iconName] || HeartHandshake;
                const isSelected = selectedCareMix.includes(srv.title);

                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleCareService(srv.title)}
                    className={`text-left p-5 rounded-2xl border transition-all card-hover flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/80 border-brand-blue ring-1 ring-brand-blue shadow-xs'
                        : 'bg-brand-surface border-slate-200/80 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-brand-blue text-white' : 'bg-white border border-slate-200 text-brand-navy'
                        }`}>
                          <IconComp className="w-4.5 h-4.5" />
                        </div>
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-brand-blue text-white'
                            : 'bg-white border border-slate-200 text-slate-600'
                        }`}>
                          {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          <span>{isSelected ? 'Added' : 'Add'}</span>
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-brand-navy">
                        {srv.title}
                      </h4>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed text-justify">
                        {srv.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Concise Who It Helps & Consistency Strip */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-brand-navy mb-2.5 flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-blue" />
                  <span>Who Our Care Helps</span>
                </h4>
                <div className="space-y-2">
                  {MISSION_VISION.whoItHelps.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5 stroke-[2.5]" />
                      <span className="text-justify">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-brand-navy mb-2.5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-teal" />
                  <span>Consistency & Observation Promise</span>
                </h4>
                <div className="space-y-2">
                  {MISSION_VISION.consistencyPromise.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5 stroke-[2.5]" />
                      <span className="text-justify">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 3-Card Balanced Grid with Visual Photography */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {currentList.map((srv, idx) => (
              <Reveal key={`${currentTab}-${idx}`} delay={idx * 80}>
                <div className="h-full bg-brand-surface rounded-3xl p-6 border border-slate-200/90 shadow-subtle card-hover flex flex-col justify-between overflow-hidden group">
                  <div>
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-200/70">
                      <img 
                        src={srv.image} 
                        alt={srv.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 text-xs font-bold text-brand-navy bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-xs border border-slate-200/70">
                        {srv.badge}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-lg font-extrabold text-brand-navy">
                        {srv.title}
                      </h3>
                      <span className="text-sm font-bold text-slate-400">0{idx + 1}</span>
                    </div>

                    <p className="mt-2 text-sm text-slate-600 leading-relaxed text-justify">
                      {srv.desc}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-200/70 space-y-2">
                      {srv.items.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/70">
                    <button
                      onClick={currentTab === 'families' ? onOpenConsultationModal : onOpenStaffingModal}
                      className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-brand-navy text-brand-navy hover:text-white border border-slate-200 hover:border-brand-navy font-bold text-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{currentTab === 'families' ? 'Inquire for Home Care' : 'Book Shift Coverage'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
