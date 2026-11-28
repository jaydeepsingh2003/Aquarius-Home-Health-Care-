import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle2, 
  Lock,
  Copy,
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/healthcareData';
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

    dispatchEmailNotification({
      type: 'contact',
      trackingId: newTrackingId,
      data: sanitized,
      honeypot: formData.honeypot
    });

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
    <section id="contact" className="scroll-mt-28 py-12 sm:py-16 bg-soft border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow">
              Contact & Service Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Connect With Our Stoney Creek HQ
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 text-justify sm:text-center">
              Live scheduling coordinators standing by 24/7/365 across Stoney Creek, Hamilton, Burlington & Niagara.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Headquarters & Communities Served */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-subtle space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-brand-navy text-lg">
                Headquarters & Dispatch
              </h3>
              <a 
                href={COMPANY_INFO.address.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-blue text-xs sm:text-sm font-bold inline-flex items-center gap-1 hover:underline"
              >
                <span>Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-brand-blue">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs font-bold uppercase block">24/7 Telephone</span>
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-base font-black text-brand-navy hover:text-brand-blue transition">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 text-brand-teal">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs font-bold uppercase block">Scheduling Desk</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-sm font-bold text-brand-navy hover:text-brand-teal transition break-all">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-brand-navy">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs font-bold uppercase block">Office Location</span>
                  <p className="font-bold text-brand-navy">{COMPANY_INFO.address.street}</p>
                  <p className="text-slate-600">{COMPANY_INFO.address.city}, {COMPANY_INFO.address.province} {COMPANY_INFO.address.postalCode}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs font-bold uppercase block">Operating Hours</span>
                  <p className="font-semibold text-slate-700">{COMPANY_INFO.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Integrated Ontario Coverage Tags (Eliminates duplicate ServiceArea card) */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Communities Served
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SERVICE_AREAS.map((area, idx) => (
                  <span 
                    key={idx}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      area.highlight
                        ? 'bg-brand-navy text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {area.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Readable Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-subtle">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-brand-navy">
                  Message Dispatched
                </h4>
                <p className="mt-1.5 text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Our clinical team will respond shortly.
                </p>

                <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Inquiry Reference ID
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-sm font-black text-brand-navy">
                      {trackingId}
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
                  className="mt-6 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-brand-navy text-sm font-bold transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" 
                  name="aq_contact_hp" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  value={formData.honeypot} 
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden" 
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Robert Smith"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. (905) 555-0123"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. robert@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Inquiry Type *</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white"
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
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Message *</label>
                  <textarea
                    rows={3}
                    required
                    maxLength={600}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Details about shift needs, patient care level, or questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                  ></textarea>
                </div>

                {rateLimitError && (
                  <p className="text-sm text-rose-600 font-semibold">{rateLimitError}</p>
                )}

                <div className="pt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                    <Lock className="w-4 h-4 text-brand-teal" />
                    <span>PHIPA Protected</span>
                  </div>

                  <button
                    type="submit"
                    className="px-7 py-3 rounded-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-sm shadow-xs transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
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
