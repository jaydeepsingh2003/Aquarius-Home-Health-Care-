import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  DollarSign, 
  Calendar, 
  Award, 
  Send, 
  Copy, 
  FileCheck,
  Users
} from 'lucide-react';
import { COMPANY_INFO } from '../data/healthcareData';
import { 
  generateTrackingId, 
  sanitizeInput, 
  isValidEmail,
  sanitizePhone,
  isBotHoneypotTriggered,
  securityRateLimiter, 
  logSecurityAudit 
} from '../utils/security';

export default function CareersSection({ onOpenCareersModal }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    role: 'Personal Support Worker (PSW)',
    licenseNumber: '',
    vulnerableCheck: 'Yes - Cleared within past 6 months',
    availability: 'Flexible / Surge Shifts',
    experienceYears: '2 - 5 Years',
    honeypot: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isBotHoneypotTriggered(formData.honeypot)) return;

    if (!isValidEmail(formData.email)) {
      setRateLimitError('Please provide a valid email address.');
      return;
    }

    const phoneCheck = sanitizePhone(formData.phone);
    if (!phoneCheck.valid) {
      setRateLimitError('Please provide a valid phone number (e.g. 905-525-5111).');
      return;
    }

    const rateCheck = securityRateLimiter.canExecute('career_section_form', 3000);
    if (!rateCheck.allowed) {
      setRateLimitError(`Please wait ${Math.ceil(rateCheck.remainingMs / 1000)}s before resubmitting.`);
      return;
    }
    setRateLimitError('');

    const newId = generateTrackingId('CAREER');
    setApplicationId(newId);

    const sanitizedData = {
      fullName: sanitizeInput(formData.fullName, 80),
      phone: phoneCheck.formatted,
      email: sanitizeInput(formData.email, 100),
      role: sanitizeInput(formData.role, 50),
      licenseNumber: sanitizeInput(formData.licenseNumber, 50),
      vulnerableCheck: sanitizeInput(formData.vulnerableCheck, 60),
      availability: sanitizeInput(formData.availability, 60),
      experienceYears: sanitizeInput(formData.experienceYears, 50),
      submittedAt: new Date().toISOString()
    };

    logSecurityAudit('CAREER_PAGE_APPLICATION_SUBMITTED', { id: newId, role: sanitizedData.role });
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const perks = [
    {
      title: "Above-Market Compensation",
      desc: "Competitive hourly pay with premium rates for urgent surge calls, night shifts, and Ontario statutory holidays.",
      icon: DollarSign
    },
    {
      title: "Total Schedule Flexibility",
      desc: "Take full control of your work-life balance. Choose from full-time lines, evening hours, or casual weekend availability.",
      icon: Calendar
    },
    {
      title: "24/7 Coordinator Backing",
      desc: "Never feel isolated on duty. Our live scheduling coordinators and senior clinical supervisors support you round the clock.",
      icon: Clock
    },
    {
      title: "Dignity & Manageable Pacing",
      desc: "Enjoy reasonable patient ratios that let you deliver the gentle, compassionate, and attentive care you were trained to provide.",
      icon: HeartHandshake
    }
  ];

  return (
    <section id="careers" className="scroll-mt-28 py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            Careers at Aquarius
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
            Join Our Ontario Clinical Care Team
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify sm:text-center">
            Are you a dedicated PSW, RPN, or RN who believes in patient dignity and clinical excellence? Join a healthcare family that respects your expertise, pays competitively, and supports your career.
          </p>
        </div>

        {/* 2-Column Grid: Left Perks & Roles / Right Fast-Track Intake */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Why Work With Us & Open Roles */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block mb-1">
                Why Choose Aquarius
              </span>
              <h3 className="text-xl font-bold text-brand-navy">
                A Practice Environment Built for Healthcare Professionals
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed text-justify">
                We believe exceptional patient care starts with how an agency treats its nurses and personal support workers. At Aquarius, you are valued as an essential frontline professional.
              </p>
            </div>

            {/* 4 Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-brand-navy">{p.title}</h4>
                    <p className="mt-1 text-[11px] text-slate-500 leading-relaxed text-justify">{p.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Open Disciplines */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-blue" />
                <span>Actively Recruiting Roles</span>
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/70 text-xs">
                  <div>
                    <span className="font-bold text-brand-navy block">Personal Support Worker (PSW)</span>
                    <span className="text-[10px] text-slate-500">In-Home ADLs, Palliative, LTC Shift Coverage</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">Open</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/70 text-xs">
                  <div>
                    <span className="font-bold text-brand-navy block">Registered Practical Nurse (RPN)</span>
                    <span className="text-[10px] text-slate-500">Wound Care, Medication Passes, Hospital Surge</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">Open</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/70 text-xs">
                  <div>
                    <span className="font-bold text-brand-navy block">Registered Nurse (RN)</span>
                    <span className="text-[10px] text-slate-500">High Acuity, Clinical Assessments, IV Therapy</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">Open</span>
                </div>
              </div>
            </div>

            {/* Credential Prerequisite Note */}
            <div className="flex items-start gap-2.5 text-xs text-slate-500 p-3 rounded-xl bg-blue-50/60 border border-blue-100">
              <ShieldCheck className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
              <span className="leading-snug">
                Candidates must hold active CNO registration or an accredited Ontario PSW certificate, with clean Police Vulnerable Sector screening.
              </span>
            </div>
          </div>

          {/* Right Column: Fast-Track Application Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-brand-navy">
                  Fast-Track Clinical Application
                </h3>
                <p className="text-xs text-slate-500">
                  Submit your credentials for expedited onboarding within 24 hours.
                </p>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-brand-blue border border-blue-100">
                Direct Recruiter Desk
              </span>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-brand-navy">
                  Application Logged Successfully
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your clinical credential intake has been received. Our clinical scheduling coordinator will review your profile and reach out within 24 hours.
                </p>

                {/* Tracking ID */}
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-sm mx-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Applicant Tracking UUID Receipt
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-xs font-black text-brand-navy">
                      {applicationId}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setApplicationId('');
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-brand-navy hover:underline"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                {/* Honeypot */}
                <input 
                  type="text" 
                  name="aq_career_sec_hp" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  value={formData.honeypot} 
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden" 
                />

                {rateLimitError && (
                  <div className="p-2.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-xl border border-amber-200">
                    {rateLimitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      placeholder="e.g. Elena Rostova"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      placeholder="e.g. (905) 555-0144"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      placeholder="e.g. elena@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Professional Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white font-medium"
                    >
                      <option>Personal Support Worker (PSW)</option>
                      <option>Registered Practical Nurse (RPN)</option>
                      <option>Registered Nurse (RN)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      CNO Registration # or PSW School *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={50}
                      placeholder="e.g. CNO #9876543 or Mohawk College"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Police Vulnerable Sector *</label>
                    <select
                      value={formData.vulnerableCheck}
                      onChange={(e) => setFormData({ ...formData, vulnerableCheck: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white font-medium"
                    >
                      <option>Yes - Cleared within past 6 months</option>
                      <option>Yes - Valid within 1 year</option>
                      <option>In Progress / Ready to Apply</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Shift Availability *</label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white font-medium"
                    >
                      <option>Flexible / Surge Shifts</option>
                      <option>Full-Time Day Shifts</option>
                      <option>Evening & Night Shifts</option>
                      <option>Weekends Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Clinical Experience *</label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white font-medium"
                    >
                      <option>New Graduate (&lt; 1 Year)</option>
                      <option>1 - 2 Years</option>
                      <option>2 - 5 Years</option>
                      <option>5+ Years Clinical Senior</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">
                    Protected under Ontario PHIPA & privacy regulations.
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs shadow-xs hover:shadow-sm transition flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}