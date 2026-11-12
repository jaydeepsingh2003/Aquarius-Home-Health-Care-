import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle2, 
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

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    inquiryType: 'Family Seeking Home Care',
    message: '',
    honeypot: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');
  const [copied, setCopied] = useState(false);

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

    const rateCheck = securityRateLimiter.canExecute('contact_form', 3000);
    if (!rateCheck.allowed) {
      setRateLimitError(`Please wait ${Math.ceil(rateCheck.remainingMs / 1000)}s before resubmitting.`);
      return;
    }
    setRateLimitError('');

    const newTrackingId = generateTrackingId('INQ');
    setTrackingId(newTrackingId);

    const sanitized = {
      fullName: sanitizeInput(formData.fullName, 80),
      phone: phoneCheck.formatted,
      email: sanitizeInput(formData.email, 100),
      inquiryType: sanitizeInput(formData.inquiryType, 60),
      message: sanitizeInput(formData.message, 600)
    };

    logSecurityAudit('GENERAL_INQUIRY_SENT', { trackingId: newTrackingId });

    setSubmitted(true);
  };

  const handleCopy = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="scroll-mt-28 py-20 bg-brand-surface border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Contact
          </span>
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            Connect With Our Scheduling Desk
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Available 24 hours a day, 7 days a week, 365 days a year.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
            <h3 className="font-extrabold text-brand-navy text-lg">
              Headquarters & Dispatch
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-brand-navy">
                  <Phone className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">24/7 Telephone</span>
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-sm font-black text-brand-navy hover:text-brand-blue transition">
                    {COMPANY_INFO.phone}
                  </a>
                  <p className="text-[11px] text-slate-500">Live dispatchers standing by</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-brand-navy">
                  <Mail className="w-4 h-4 text-brand-teal" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Scheduling Desk</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs font-bold text-brand-navy hover:text-brand-teal transition break-all">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-brand-navy">
                  <MapPin className="w-4 h-4 text-brand-navy" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Office Location</span>
                  <p className="font-bold text-brand-navy">{COMPANY_INFO.address.street}</p>
                  <p className="text-slate-500">{COMPANY_INFO.address.city}, {COMPANY_INFO.address.province} {COMPANY_INFO.address.postalCode}</p>
                  <a 
                    href={COMPANY_INFO.address.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-blue font-bold inline-block mt-1 hover:underline"
                  >
                    Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-brand-navy">
                  <Clock className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Operating Hours</span>
                  <p className="font-semibold text-slate-700">{COMPANY_INFO.officeHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-brand-navy">
                  Message Dispatched
                </h4>
                <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Our clinical team will respond shortly.
                </p>

                {/* Tracking ID */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Inquiry Reference ID
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

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      inquiryType: 'Family Seeking Home Care',
                      message: '',
                      honeypot: ''
                    });
                  }}
                  className="mt-6 px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy text-xs font-bold transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Honeypot */}
                <input 
                  type="text" 
                  name="aq_contact_hp" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  value={formData.honeypot} 
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden" 
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Robert Smith"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. (905) 555-0123"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. robert@example.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Type *</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white"
                    >
                      <option>Family Seeking Home Care</option>
                      <option>Hospital Staffing Coordinator</option>
                      <option>Long-Term Care Administrator</option>
                      <option>Private Medical Clinic</option>
                      <option>Careers & Clinical Employment (PSW, RPN, RN)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows={3}
                    required
                    maxLength={600}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Details about shift needs, patient care level, or questions..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                  ></textarea>
                </div>

                {rateLimitError && (
                  <p className="text-xs text-rose-600 font-semibold">{rateLimitError}</p>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-brand-teal" />
                    <span>PHIPA Protected</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
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
