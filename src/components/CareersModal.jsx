import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  Copy, 
  FileCheck, 
  Send 
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

export default function CareersModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

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

    const rateCheck = securityRateLimiter.canExecute('career_form', 3000);
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
      licenseNumber: sanitizeInput(formData.licenseNumber),
      vulnerableCheck: sanitizeInput(formData.vulnerableCheck),
      availability: sanitizeInput(formData.availability),
      experienceYears: sanitizeInput(formData.experienceYears),
      submittedAt: new Date().toISOString()
    };

    logSecurityAudit('CAREER_APPLICATION_SUBMITTED', { id: newId, role: sanitizedData.role });
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setApplicationId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200/90 animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-4 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block mb-2">
              Application Received
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-brand-navy">
              Welcome to Aquarius Health Care
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.fullName}</strong>. Your clinical credential intake has been logged. Our clinical recruiter will contact you within 24 hours.
            </p>

            {/* Cryptographic Receipt */}
            <div className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-sm mx-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
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

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-brand-navy text-white text-xs font-bold hover:bg-slate-800 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-brand-navy leading-tight">
                  Join Our Ontario Clinical Team
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Direct recruitment for PSWs, RPNs & RNs across Greater Hamilton
                </p>
              </div>
            </div>

            {/* Info Badge */}
            <div className="mb-5 p-3 rounded-xl bg-blue-50/70 border border-blue-100/80 flex items-start gap-2.5 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
              <span>
                Competitive compensation, flexible shift scheduling (full-time, part-time, casual surge), and 24/7 coordinator support.
              </span>
            </div>

            {rateLimitError && (
              <div className="mb-4 p-2.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-xl border border-amber-200">
                {rateLimitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {/* Bot Honeypot */}
              <input 
                type="text" 
                name="aq_career_hp" 
                tabIndex={-1} 
                autoComplete="off" 
                value={formData.honeypot} 
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden" 
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    maxLength={80}
                    placeholder="e.g. Sarah Jenkins"
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
                    placeholder="e.g. (905) 555-0199"
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
                    placeholder="e.g. sarah@example.com"
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
                    placeholder="e.g. CNO #1234567 or Mohawk College"
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

              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 font-medium">
                  Protected under Ontario PHIPA & privacy laws.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs shadow-xs hover:shadow-sm transition flex items-center gap-2 active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}