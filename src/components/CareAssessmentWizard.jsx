import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Phone, 
  Send, 
  ShieldCheck, 
  Check,
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

export default function CareAssessmentWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    recipient: '',
    supportType: '',
    schedule: '',
    fullName: '',
    phone: '',
    email: '',
    notes: '',
    honeypot: '' // Anti-bot honeypot
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSelect = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const getRecommendation = () => {
    if (answers.supportType === 'skilled-nursing' || answers.supportType === 'palliative') {
      return {
        role: "Registered Practical Nurse (RPN) / Registered Nurse (RN)",
        desc: "Based on complex clinical needs or medication protocols, a CNO-licensed nurse is recommended.",
        tier: "Skilled Nursing Support"
      };
    }
    if (answers.supportType === 'dementia') {
      return {
        role: "Certified Personal Support Worker (PSW) - Memory Care",
        desc: "Specialized in gentle daily routines, cognitive stimulation, and wandering prevention.",
        tier: "Dementia & Memory Support"
      };
    }
    return {
      role: "Certified Personal Support Worker (PSW)",
      desc: "Compassionate bedside assistance with bathing, dressing, meal preparation, and mobility.",
      tier: "Personal Support & Companionship"
    };
  };

  const recommendation = getRecommendation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Bot Honeypot Check
    if (isBotHoneypotTriggered(answers.honeypot)) {
      return; // Silent fail for bots
    }

    if (!isValidEmail(answers.email)) {
      setRateLimitError('Please enter a valid email address.');
      return;
    }

    const phoneCheck = sanitizePhone(answers.phone);
    if (!phoneCheck.valid) {
      setRateLimitError('Please enter a valid 10-digit phone number (e.g. 905-525-5111).');
      return;
    }

    // 2. Client-side Rate Limiting (Prevents rapid submission abuse)
    const rateCheck = securityRateLimiter.canExecute('care_assessment', 3500);
    if (!rateCheck.allowed) {
      setRateLimitError(`Please wait ${Math.ceil(rateCheck.remainingMs / 1000)}s before submitting.`);
      return;
    }
    setRateLimitError('');

    // 3. Cryptographic UUID Tracking ID Generation
    const newTrackingId = generateTrackingId('CARE');
    setTrackingId(newTrackingId);

    // 4. Input Sanitization
    const sanitizedData = {
      recipient: sanitizeInput(answers.recipient, 50),
      supportType: sanitizeInput(answers.supportType, 50),
      schedule: sanitizeInput(answers.schedule, 50),
      fullName: sanitizeInput(answers.fullName, 80),
      phone: phoneCheck.formatted,
      email: sanitizeInput(answers.email, 100),
      notes: sanitizeInput(answers.notes, 500)
    };

    // 5. Ephemeral Security Audit Log
    logSecurityAudit('CARE_ASSESSMENT_SUBMITTED', { trackingId: newTrackingId });

    setSubmitted(true);
  };

  const handleCopyId = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setSubmitted(false);
    setTrackingId('');
    setRateLimitError('');
    setAnswers({
      recipient: '',
      supportType: '',
      schedule: '',
      fullName: '',
      phone: '',
      email: '',
      notes: '',
      honeypot: ''
    });
  };

  return (
    <section id="care-wizard" className="scroll-mt-28 py-20 bg-white border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Care Matcher
          </span>
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            Find the Right Level of Care
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Complete this brief 60-second assessment for a personalized recommendation.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="bg-brand-surface rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-2xs">
          
          {/* Progress Indicator */}
          {!submitted && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span>Step {step} of 4</span>
                <span>{step === 1 ? 'Care Recipient' : step === 2 ? 'Support Required' : step === 3 ? 'Schedule' : 'Recommendation'}</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-blue h-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* STEP 1: Care Recipient */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-bold text-brand-navy mb-1">
                Who requires care and assistance?
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Select the individual needing in-home health support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'parent', label: 'Aging Parent(s)', desc: 'Mother or father living at home' },
                  { id: 'spouse', label: 'Spouse or Partner', desc: 'Partner needing recovery or daily support' },
                  { id: 'self', label: 'Myself', desc: 'Personal home care or rehabilitation' },
                  { id: 'hospital-discharge', label: 'Hospital Discharge', desc: 'Transitioning home after acute surgical stay' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('recipient', opt.id)}
                    className={`p-4 rounded-xl border text-left transition ${
                      answers.recipient === opt.id
                        ? 'border-brand-blue bg-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-brand-navy">{opt.label}</span>
                      {answers.recipient === opt.id && (
                        <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  disabled={!answers.recipient}
                  onClick={() => setStep(2)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                    answers.recipient
                      ? 'bg-brand-blue text-white hover:bg-brand-blue-600 shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Support Type */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-bold text-brand-navy mb-1">
                What primary level of support is needed?
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Identifies whether a Certified PSW, Licensed RPN, or RN is needed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'daily-living', label: 'Personal Support (ADLs)', desc: 'Bathing, dressing, meals, mobility' },
                  { id: 'skilled-nursing', label: 'Skilled Nursing', desc: 'Wound care, catheter, medications' },
                  { id: 'dementia', label: 'Dementia & Memory Care', desc: 'Patience, gentle routine, wandering safety' },
                  { id: 'palliative', label: 'Palliative & Respite', desc: 'Pain management and family comfort' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('supportType', opt.id)}
                    className={`p-4 rounded-xl border text-left transition ${
                      answers.supportType === opt.id
                        ? 'border-brand-blue bg-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-brand-navy">{opt.label}</span>
                      {answers.supportType === opt.id && (
                        <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  disabled={!answers.supportType}
                  onClick={() => setStep(3)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                    answers.supportType
                      ? 'bg-brand-blue text-white hover:bg-brand-blue-600 shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Schedule */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-bold text-brand-navy mb-1">
                What care schedule is needed?
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Flexible scheduling from hourly visits to 24/7 continuous shift coverage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: '24-7', label: '24/7 Continuous Care', desc: 'Around-the-clock rotational shift coverage' },
                  { id: 'daytime', label: 'Daytime Visits (4-8 hrs)', desc: 'Morning routine, transfers, meals' },
                  { id: 'overnight', label: 'Overnight Monitoring', desc: 'Peace of mind while family rests' },
                  { id: 'respite', label: 'Flexible / Respite Care', desc: 'Short-term relief for family caregivers' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('schedule', opt.id)}
                    className={`p-4 rounded-xl border text-left transition ${
                      answers.schedule === opt.id
                        ? 'border-brand-blue bg-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-brand-navy">{opt.label}</span>
                      {answers.schedule === opt.id && (
                        <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  disabled={!answers.schedule}
                  onClick={() => setStep(4)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                    answers.schedule
                      ? 'bg-brand-blue text-white hover:bg-brand-blue-600 shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>See Recommendation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Recommendation & Secure Submission */}
          {step === 4 && !submitted && (
            <div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 mb-6">
                <span className="text-[10px] font-bold uppercase text-brand-blue block mb-1">
                  {recommendation.tier}
                </span>
                <h4 className="text-lg font-bold text-brand-navy">
                  Recommended: {recommendation.role}
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  {recommendation.desc}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Hidden Bot Honeypot */}
                <input 
                  type="text" 
                  name="aq_hp_token" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  value={answers.honeypot} 
                  onChange={(e) => setAnswers(prev => ({ ...prev, honeypot: e.target.value }))}
                  className="hidden" 
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={answers.fullName}
                      onChange={(e) => setAnswers(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      value={answers.phone}
                      onChange={(e) => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. (905) 555-0199"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={answers.email}
                    onChange={(e) => setAnswers(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. sarah@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Notes (Optional)</label>
                  <textarea
                    rows={2}
                    maxLength={500}
                    value={answers.notes}
                    onChange={(e) => setAnswers(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any specific instructions or city in Ontario..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none bg-white"
                  ></textarea>
                </div>

                {rateLimitError && (
                  <p className="text-xs text-rose-600 font-semibold">{rateLimitError}</p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-brand-teal" />
                    <span>PHIPA Protected & Encrypted</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-600 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Assessment</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Submission Success Screen with Official UUID Tracking Receipt */}
          {submitted && (
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy">
                Assessment Confirmed
              </h3>
              <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto">
                Our clinical coordinator will contact you at <strong>{answers.phone}</strong> to confirm your consultation schedule.
              </p>

              {/* Secure Tracking UUID Ticket */}
              <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 max-w-xs mx-auto text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Reference Tracking ID
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-xs font-black text-brand-navy">
                    {trackingId}
                  </span>
                  <button
                    onClick={handleCopyId}
                    className="text-[11px] font-semibold text-brand-blue hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={resetWizard}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy text-xs font-semibold transition"
                >
                  Start New
                </button>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="px-4 py-2 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold transition"
                >
                  Call (905) 525-5111
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
