import React, { useState } from 'react';
import { 
  Stethoscope, 
  Check, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { CLINICAL_ROLES } from '../data/healthcareData';

export default function ClinicalRolesSection({ onOpenStaffingModal, onOpenConsultationModal }) {
  const [selectedRole, setSelectedRole] = useState('PSW');
  const activeRole = CLINICAL_ROLES.find(r => r.code === selectedRole) || CLINICAL_ROLES[0];

  return (
    <section id="clinical-roles" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Clinical Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Our Certified Healthcare Professionals
          </h2>
          <p className="mt-2.5 text-base text-slate-600">
            Every staff member is background checked, police vulnerable sector screened, and actively credential verified.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            {CLINICAL_ROLES.map((role) => {
              const isSelected = selectedRole === role.code;
              return (
                <button
                  key={role.code}
                  onClick={() => setSelectedRole(role.code)}
                  className={`py-2 px-4 sm:px-6 rounded-xl font-bold text-xs sm:text-sm transition ${
                    isSelected
                      ? 'bg-white text-brand-navy shadow-xs'
                      : 'text-slate-600 hover:text-brand-navy'
                  }`}
                >
                  <span className="mr-1.5 font-black text-brand-blue">{role.code}</span>
                  <span className="hidden sm:inline">({role.title.replace('Workers', '').replace('Nurses', '').trim()})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Role Detailed Card */}
        <div className="max-w-5xl mx-auto bg-brand-surface rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Summary & Purpose */}
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                {activeRole.code} • Certified Scope
              </span>
              <h3 className="text-2xl font-extrabold text-brand-navy mt-1">
                {activeRole.title}
              </h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                {activeRole.tagline}
              </p>

              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {activeRole.description}
              </p>

              <div className="mt-5 p-4 rounded-xl bg-white border border-slate-200/80">
                <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                  Ideal Deployment
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  {activeRole.idealFor}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={onOpenConsultationModal}
                  className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-600 text-white font-bold text-xs shadow-xs transition"
                >
                  Request {activeRole.code} for Home Care
                </button>
                <button
                  onClick={onOpenStaffingModal}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-brand-navy border border-slate-200 font-semibold text-xs transition"
                >
                  Facility Shift Coverage
                </button>
              </div>
            </div>

            {/* Right: Responsibilities */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80">
              <h4 className="font-bold text-sm text-brand-navy mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-teal" />
                <span>Scope of Practice & Core Duties</span>
              </h4>

              <div className="space-y-2.5">
                {activeRole.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-teal-50 text-brand-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
