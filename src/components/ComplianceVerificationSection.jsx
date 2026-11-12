import React from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  UserCheck, 
  Lock, 
  CheckCircle,
  Award
} from 'lucide-react';

export default function ComplianceVerificationSection() {
  const steps = [
    {
      step: '01',
      title: 'Police Vulnerable Sector Screening',
      desc: 'Mandatory Canadian criminal record & vulnerable sector checks renewed continuously to protect patients.',
      icon: Lock
    },
    {
      step: '02',
      title: 'Active CNO & Diploma Verification',
      desc: 'Live licensing standing checks with the College of Nurses of Ontario (CNO) and verified accredited PSW diplomas.',
      icon: FileCheck2
    },
    {
      step: '03',
      title: 'Clinical Competency & CPR/BLS',
      desc: 'Medication management audits, infection prevention standards, and current Heart & Stroke CPR credentials.',
      icon: Award
    },
    {
      step: '04',
      title: 'Empathy & Reliability Auditing',
      desc: 'Thorough reference checks and behavioral interviews evaluating bedside patience and compassionate ethics.',
      icon: UserCheck
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Regulatory Compliance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Our 4-Tier Clinical Vetting Protocol
          </h2>
          <p className="mt-2.5 text-base text-slate-600">
            Before entering any private home or healthcare floor, every staff member completes this safety pipeline.
          </p>
        </div>

        {/* 4 Steps Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-brand-surface rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-black text-slate-300">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-navy">
                      <Icon className="w-4 h-4 text-brand-navy" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-brand-teal">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>100% Pre-Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
