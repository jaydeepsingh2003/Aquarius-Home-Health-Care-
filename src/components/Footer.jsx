import React from 'react';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowUp 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/healthcareData';

export default function Footer({ onOpenStaffingModal, onOpenConsultationModal, onOpenCareersModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy-dark text-slate-300 pt-14 pb-12 border-t border-brand-navy-light/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-5 space-y-3.5">
            <a href="#home" className="inline-block bg-white px-3 py-1.5 rounded-xl border border-slate-700 shadow-xs" title="Return to Top">
              <img 
                src="/aquarius-logo.png" 
                alt="Aquarius Home Health Care Logo" 
                className="h-10 w-auto object-contain" 
              />
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm text-justify">
              Since 2016, bridging the gap between quality healthcare and personal comfort. Delivering qualified PSWs, RPNs, and RNs for in-home care and institutional staffing across Ontario.
            </p>

            <div className="pt-1 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                <span>Police Vulnerable Sector Screened Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-amber" />
                <span>24/7/365 On-Call Dispatch Desk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Services & Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={onOpenConsultationModal} className="hover:text-white transition text-left">Personal Support Workers (PSW)</button></li>
              <li><button onClick={onOpenConsultationModal} className="hover:text-white transition text-left">Registered Practical Nurses (RPN)</button></li>
              <li><button onClick={onOpenConsultationModal} className="hover:text-white transition text-left">Registered Nurses (RN Acute Care)</button></li>
              <li><button onClick={onOpenStaffingModal} className="hover:text-white transition text-left text-brand-teal font-semibold">Hospital Surge Shift Coverage</button></li>
              <li><button onClick={onOpenStaffingModal} className="hover:text-white transition text-left text-brand-teal font-semibold">Long-Term Care Home Staffing</button></li>
              <li><button onClick={onOpenCareersModal} className="hover:text-white transition text-left text-brand-amber font-semibold">Careers: Join Our Care Team (PSW/RPN/RN)</button></li>
            </ul>
          </div>

          {/* Office & Direct Contact */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Stoney Creek Headquarters
            </h4>

            <div className="text-xs text-slate-400 space-y-1.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address.full}</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-amber flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-white font-bold hover:underline">
                  {COMPANY_INFO.phone} (24/7 Live Desk)
                </a>
              </p>

              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-300 hover:underline truncate">
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Regulatory & Emergency Notice */}
        <div className="pt-6 pb-2 text-[11px] text-slate-500 space-y-1 leading-relaxed text-justify">
          <p>
            <strong>Medical Notice:</strong> If experiencing an acute life-threatening emergency, please dial 911 immediately.
          </p>
          <p>
            <strong>Regulatory Standard:</strong> Aquarius Home Health Care aligns with the College of Nurses of Ontario (CNO) standards of clinical practice and complies with Ontario's Personal Health Information Protection Act (PHIPA).
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Aquarius Home Health Care. Clinical excellence since 2016.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
}
