import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  DollarSign, 
  Calendar, 
  Send, 
  Copy, 
  Users
} from 'lucide-react';
import { CAREER_GROWTH_TRACKS } from '../data/healthcareData';
import { 
  generateTrackingId, 
  sanitizeInput, 
  isValidEmail,
  sanitizePhone,
  isBotHoneypotTriggered,
  securityRateLimiter, 
  logSecurityAudit,
  dispatchEmailNotification
} from '../utils/security';
import Reveal from './Reveal';

export default function CareersSection() {
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

    dispatchEmailNotification({
      type: 'career',
      trackingId: newId,
      data: sanitizedData,
      honeypot: formData.honeypot
    });

    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const perks = [
    { title: "Competitive Hourly Pay", desc: "Above-market wages with surge & holiday premiums.", icon: DollarSign },
    { title: "Flexible Scheduling", desc: "Choose days, evenings, nights, or weekend lines.", icon: Calendar },
    { title: "24/7 Team Support", desc: "Live supervisor desk backing you on every shift.", icon: Clock },
    { title: "Paid Orientation", desc: "Guided first-shift introductions & workshops.", icon: HeartHandshake }
  ];

  return (
    <section id="careers" className="scroll-mt-28 py-12 sm:py-16 bg-soft border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow">
              Careers at Aquarius
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Join Our Ontario Clinical Care Team
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed text-justify sm:text-center">
              Hiring compassionate PSWs, RPNs, and RNs across Stoney Creek and Greater Hamilton with flexible hours, mentorship, and strong pay.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Caregiver Team Photo Card + Perks + Pathway */}
          <div className="lg:col-span-5 space-y-5">
            <div className="card-ab overflow-hidden p-3">
              <div className="relative h-44 w-full rounded-2xl overflow-hidden">
                <img
                  src="/images/care-companionship.jpg"
                  alt="Smiling Aquarius PSW enjoying warm tea and conversation with client"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/65 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                  <span>Meaningful Local Work in Ontario</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white">Hiring</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {perks.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <Reveal key={idx} delay={idx * 60}>
                    <div className="h-full card-ab p-4">
                      <div className="card-icon !w-10 !h-10 mb-2.5">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="text-sm font-bold text-brand-navy">{p.title}</h4>
                      <p className="mt-1 text-sm text-slate-600 leading-snug text-justify">{p.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="flex items-start gap-2.5 text-sm text-slate-700 p-4 rounded-2xl bg-white border border-blue-100 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed text-justify">
                Requires active CNO license or accredited Ontario PSW certificate, plus Police Vulnerable Sector screening.
              </span>
            </div>
          </div>

          {/* Right Column: Readable Fast-Track Application Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-subtle">
            <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-slate-100">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy">
                  Fast-Track Clinical Application
                </h3>
                <p className="text-sm text-slate-500">
                  Submit credentials for onboarding within 24 hours.
                </p>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Hiring Now
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
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Our scheduling coordinator will review your profile and reach out within 24 hours.
                </p>

                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-sm mx-auto">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Applicant Tracking UUID Receipt
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-sm font-black text-brand-navy">
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
                    className="text-sm font-bold text-slate-500 hover:text-brand-navy hover:underline"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
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
                  <div className="p-3 bg-amber-50 text-amber-700 text-sm font-semibold rounded-xl border border-amber-200">
                    {rateLimitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      placeholder="e.g. Elena Rostova"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      placeholder="e.g. (905) 555-0144"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      placeholder="e.g. elena@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Professional Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white font-medium"
                    >
                      <option>Personal Support Worker (PSW)</option>
                      <option>Registered Practical Nurse (RPN)</option>
                      <option>Registered Nurse (RN)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      CNO # or PSW School *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={50}
                      placeholder="e.g. CNO #9876543 or Mohawk"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Vulnerable Sector Check *</label>
                    <select
                      value={formData.vulnerableCheck}
                      onChange={(e) => setFormData({ ...formData, vulnerableCheck: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white font-medium"
                    >
                      <option>Yes - Cleared within past 6 months</option>
                      <option>Yes - Valid within 1 year</option>
                      <option>In Progress / Ready to Apply</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Shift Availability *</label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white font-medium"
                    >
                      <option>Flexible / Surge Shifts</option>
                      <option>Full-Time Day Shifts</option>
                      <option>Evening & Night Shifts</option>
                      <option>Weekends Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Clinical Experience *</label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white font-medium"
                    >
                      <option>New Graduate (&lt; 1 Year)</option>
                      <option>1 - 2 Years</option>
                      <option>2 - 5 Years</option>
                      <option>5+ Years Clinical Senior</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                  <span className="text-xs sm:text-sm text-slate-500">
                    Protected under Ontario PHIPA regulations.
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm shadow-xs hover:shadow-sm transition flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Horizontal Full-Width 4-Column Care Professional Support Pathway */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4.5 h-4.5 text-brand-blue" />
            <h3 className="text-sm font-extrabold text-brand-navy uppercase tracking-wider">
              Care Professional Support Pathway
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAREER_GROWTH_TRACKS.map((track, idx) => (
              <Reveal key={track.step} delay={idx * 70}>
                <div className="h-full card-ab p-5 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#EAF1FA] text-brand-blue font-black text-sm mb-3">
                      {track.step}
                    </span>
                    <h4 className="text-base font-extrabold text-brand-navy">
                      {track.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed text-justify">
                      {track.desc}
                    </p>
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
