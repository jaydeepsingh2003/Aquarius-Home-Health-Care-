import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Clock, 
  Send, 
  CheckCircle2, 
  Phone, 
  Copy,
  Lock
} from 'lucide-react';
import { COMPANY_INFO } from '../data/healthcareData';
import { 
  generateTrackingId, 
  sanitizeInput, 
  sanitizePhone,
  isBotHoneypotTriggered,
  securityRateLimiter, 
  logSecurityAudit 
} from '../utils/security';

export default function UrgentStaffingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    facilityName: '',
    facilityType: 'Long-Term Care (LTC)',
    contactPerson: '',
    contactPhone: '',
    staffType: 'PSW',
    staffCount: '1',
    shiftDate: new Date().toISOString().split('T')[0],
    shiftTiming: 'Immediate / Urgent Surge (< 2-4 hrs)',
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

    // 1. Anti-bot honeypot
    if (isBotHoneypotTriggered(formData.honeypot)) return;

    // Validate phone number
    const phoneCheck = sanitizePhone(formData.contactPhone);
    if (!phoneCheck.valid) {
      setRateLimitError('Please provide a valid 10-digit phone number (e.g. 905-525-5111).');
      return;
    }

    // 2. Client-side rate limiting
    const rateCheck = securityRateLimiter.canExecute('urgent_staffing_dispatch', 3000);
    if (!rateCheck.allowed) {
      setRateLimitError(`Please wait ${Math.ceil(rateCheck.remainingMs / 1000)}s before resubmitting.`);
      return;
    }
    setRateLimitError('');

    // 3. Generate Cryptographic Dispatch Reference UUID
    const newTrackingId = generateTrackingId('DISP');
    setTrackingId(newTrackingId);

    // 4. Sanitize inputs
    const sanitized = {
      facilityName: sanitizeInput(formData.facilityName, 100),
      facilityType: sanitizeInput(formData.facilityType, 60),
      contactPerson: sanitizeInput(formData.contactPerson, 80),
      contactPhone: phoneCheck.formatted,
      staffType: sanitizeInput(formData.staffType, 50),
      staffCount: sanitizeInput(formData.staffCount, 20),
      shiftTiming: sanitizeInput(formData.shiftTiming, 60),
      notes: sanitizeInput(formData.notes, 500)
    };

    // 5. Ephemeral audit log
    logSecurityAudit('STAFFING_DISPATCH_REQUESTED', { trackingId: newTrackingId });

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
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Clean Modal Header */}
        <div className="bg-brand-navy p-5 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight">
              Facility Shift Request
            </h3>
            <p className="text-xs text-slate-300">
              24/7 Rapid Shift Coverage & Surge Replenishment
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
                Shift Request Confirmed
              </h4>
              <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto">
                Our on-duty coordinator will call <strong>{formData.contactPhone}</strong> within 15 minutes to confirm assignment details.
              </p>

              {/* Cryptographic Dispatch Ticket */}
              <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Official Dispatch Reference ID
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
                name="aq_fac_hp" 
                tabIndex={-1} 
                autoComplete="off" 
                value={formData.honeypot} 
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden" 
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Facility / Hospital Name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={80}
                    value={formData.facilityName}
                    onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                    placeholder="e.g. St. Joseph's / Hamilton General"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Facility Type *
                  </label>
                  <select
                    value={formData.facilityType}
                    onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none bg-white"
                  >
                    <option>Long-Term Care (LTC)</option>
                    <option>Hospital Acute Ward</option>
                    <option>Retirement Residence</option>
                    <option>Specialty Medical Clinic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Role Needed *
                  </label>
                  <select
                    value={formData.staffType}
                    onChange={(e) => setFormData({ ...formData, staffType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none bg-white"
                  >
                    <option value="PSW">PSW</option>
                    <option value="RPN">RPN (Licensed)</option>
                    <option value="RN">RN (Registered Nurse)</option>
                    <option value="Multiple">Multiple Roles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Staff Count *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    required
                    value={formData.staffCount}
                    onChange={(e) => setFormData({ ...formData, staffCount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Shift Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.shiftDate}
                    onChange={(e) => setFormData({ ...formData, shiftDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Shift Timing / Urgency *
                </label>
                <select
                  value={formData.shiftTiming}
                  onChange={(e) => setFormData({ ...formData, shiftTiming: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none bg-white"
                >
                  <option>Immediate / Urgent Surge (&lt; 2-4 hrs)</option>
                  <option>Day Shift (07:00 – 15:00)</option>
                  <option>Evening Shift (15:00 – 23:00)</option>
                  <option>Night Shift (23:00 – 07:00)</option>
                  <option>12-Hour Day (07:00 – 19:00)</option>
                  <option>12-Hour Night (19:00 – 07:00)</option>
                  <option>Multi-Day Block Booking</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Coordinator / Charge Nurse *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={80}
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. John Doe, RN"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Direct Callback Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="e.g. (905) 555-0144"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Unit Floor / Assignment Notes
                </label>
                <textarea
                  rows={2}
                  maxLength={400}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Ward 3B, report to nursing station at 06:45."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                ></textarea>
              </div>

              {rateLimitError && (
                <p className="text-xs text-rose-600 font-semibold">{rateLimitError}</p>
              )}

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-brand-teal" />
                  <span>Secure Transmission</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-teal hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Request</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
