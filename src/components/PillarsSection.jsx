import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Clock, 
  Zap, 
  CheckCircle2,
  Compass,
  Eye,
  Languages
} from 'lucide-react';
import { COMPANY_INFO, MISSION_VISION } from '../data/healthcareData';
import Reveal from './Reveal';

export default function PillarsSection() {
  const [activeTab, setActiveTab] = useState('pillars');

  const pillars = [
    {
      title: "Qualified & Vetted Staff",
      tag: "Rigorous Screening",
      desc: "Every nurse and PSW passes Police Vulnerable Sector checks, CNO active license verification, and CPR-HCP certification.",
      points: ["Police Vulnerable Sector Cleared", "Active CNO License Verified"],
      icon: ShieldCheck
    },
    {
      title: "Compassion First",
      tag: "Dignity & Safety",
      desc: "We pair clinical precision with genuine warmth—preserving personal dignity and independence in every daily routine.",
      points: ["Respectful daily living pacing", "Culturally sensitive care matching"],
      icon: HeartHandshake
    },
    {
      title: "24/7 Reliability",
      tag: "Round-The-Clock",
      desc: "Our Stoney Creek dispatch coordinators answer 24/7/365 so families and charge nurses never face care gaps.",
      points: ["24/7 live phone coordination", "Rapid shift confirmation"],
      icon: Clock
    },
    {
      title: "Flexible Surge Relief",
      tag: "Rapid Response",
      desc: "From short-term home respite to urgent hospital sick calls, our team adapts rapidly to changing care demands.",
      points: ["Same-day sick call replenishment", "Short or long-term coverage"],
      icon: Zap
    }
  ];

  return (
    <section id="why-choose-us" className="scroll-mt-28 py-12 sm:py-16 bg-soft border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header + Eyebrow + Tab Switcher */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
            <div className="max-w-2xl">
              <span className="eyebrow">
                About Aquarius & Standards
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                Clinical Excellence & Reliability Since 2016
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 text-justify leading-relaxed">
                Bridging hospital-grade nursing with the comfort of home across Stoney Creek, Hamilton, and Ontario.
              </p>
            </div>

            <div className="inline-flex p-1.5 bg-white rounded-full border border-slate-200/90 shadow-subtle self-start">
              <button
                onClick={() => setActiveTab('pillars')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'pillars'
                    ? 'bg-brand-navy text-white shadow-xs'
                    : 'text-slate-600 hover:text-brand-navy'
                }`}
              >
                4 Core Pillars
              </button>
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'mission'
                    ? 'bg-brand-blue text-white shadow-xs'
                    : 'text-slate-600 hover:text-brand-navy'
                }`}
              >
                Mission & Languages
              </button>
            </div>
          </div>
        </Reveal>

        {activeTab === 'pillars' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={idx} delay={idx * 70}>
                  <div className="h-full card-ab p-6 flex flex-col justify-between">
                    <div>
                      <div className="card-icon mb-4">
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        {item.tag}
                      </span>

                      <h3 className="text-lg font-extrabold text-brand-navy">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-600 leading-relaxed text-justify">
                        {item.desc}
                      </p>

                      <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
                        {item.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fadeIn">
            <div className="lg:col-span-5 card-ab p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon !w-11 !h-11">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-brand-navy uppercase tracking-wider">
                  Our Mission
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
                {MISSION_VISION.mission}
              </p>
            </div>

            <div className="lg:col-span-4 card-ab p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon !w-11 !h-11 !bg-teal-50 !text-brand-teal">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-brand-navy uppercase tracking-wider">
                  Our Vision
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
                {MISSION_VISION.vision}
              </p>
            </div>

            <div className="lg:col-span-3 bg-brand-navy text-white rounded-[20px] p-6 sm:p-7 border border-slate-800 shadow-elevated">
              <div className="flex items-center gap-2 mb-3">
                <Languages className="w-5 h-5 text-teal-300" />
                <span className="text-sm font-extrabold uppercase tracking-wider text-slate-200">
                  Languages Spoken
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed text-justify">
                We match families with staff fluent in their preferred language:
              </p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {COMPANY_INFO.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
