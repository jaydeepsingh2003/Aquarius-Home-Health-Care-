import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Phone, 
  ShieldCheck,
  Lock,
  Copy
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

export default function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Stoney Creek',
    serviceNeeded: 'Certified PSW (Personal Support & ADLs)',
    notes: '',
    honeypot: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isBotHoneypotTriggered(formData.honeypot)) return;

    if (!isValidEmail(formData.email)) {
      setRateLimitError('Please enter a valid email address.');
      return;
    }

    const phoneCheck = sanitizePhone(formData.phone);
    if (!phoneCheck.valid) {
      setRateLimitError('Please enter a valid 10-digit phone number (e.g. 905-525-5111).');
      return;
    }

    const rateCheck = securityRateLimiter.canExecute('consultation_modal', 3000);
    if (!rateCheck.allowed) {
      setRateLimitError(`Please wait ${Math.ceil(rateCheck.remainingMs / 1000)}s before submitting.`);
      return;
    }
    setRateLimitError('');

    const newTrackingId = generateTrackingId('CONS');
    setTrackingId(newTrackingId);

    const sanitized = {
      fullName: sanitizeInput(formData.fullName, 80),
      phone: phoneCheck.formatted,
      email: sanitizeInput(formData.email, 100),
      city: sanitizeInput(formData.city, 60),
      serviceNeeded: sanitizeInput(formData.serviceNeeded, 80),
      notes: sanitizeInput(formData.notes, 500)
    };

    logSecurityAudit('CONSULTATION_REQUESTED', { trackingId: newTrackingId });

    setSubmitted(true);
  };

  const handleCopy = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setTrackingId('');
    setRateLimitError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-brand-navy p-5 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight">
              Book a Free In-Home Consultation
            </h3>
            <p className="text-xs text-slate-300">
              Personalized In-Home Assessment with Zero Obligation
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-brand-navy">
                Consultation Request Received
              </h4>
              <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Our clinical supervisor will call <strong>{formData.phone}</strong> to confirm your home visit.
              </p>

              {/* Secure Tracking Ticket */}
              <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Consultation Reference ID
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-xs font-black text-brand-navy">
                    {trackingId}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-[11px] font-semibold text-brand-blue hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy font-bold text-xs transition"
                >
                  Close
                </button>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="px-5 py-2 rounded-xl bg-brand-navy text-white font-bold text-xs transition"
                >
                  Call (905) 525-5111
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Bot Honeypot */}
              <input 
                type="text" 
                name="aq_cons_hp" 
                tabIndex={-1} 
                autoComplete="off" 
                value={formData.honeypot} 
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden" 
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Mary Henderson"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. (905) 525-5111"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. mary@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Town in Ontario *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none bg-white"
                  >
                    <option>Stoney Creek</option>
                    <option>Hamilton</option>
                    <option>Burlington</option>
                    <option>Oakville</option>
                    <option>Grimsby</option>
                    <option>Ancaster</option>
                    <option>Niagara Region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Care Needed *
                  </label>
                  <select
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none bg-white"
                  >
                    <option>Certified PSW (ADLs & Support)</option>
                    <option>Licensed RPN (Wound / Medication)</option>
                    <option>Registered Nurse (Complex Care)</option>
                    <option>Dementia / Alzheimer's Care</option>
                    <option>Post-Op Hospital Recovery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Details on Loved One's Needs
                </label>
                <textarea
                  rows={2}
                  maxLength={400}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Morning transfer support after surgery..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                ></textarea>
              </div>

              {rateLimitError && (
                <p className="text-xs text-rose-600 font-semibold">{rateLimitError}</p>
              )}

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-brand-teal" />
                  <span>PHIPA Compliant</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-600 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Consultation</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
