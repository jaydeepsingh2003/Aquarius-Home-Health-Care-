import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Calendar, 
  Users, 
  ChevronRight, 
  MapPin,
  Home,
  ShieldCheck,
  HeartHandshake,
  Building2,
  Briefcase,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/healthcareData';

export default function Navbar({ 
  onOpenStaffingModal, 
  onOpenConsultationModal,
  onOpenCareersModal 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Dynamic active section detection on scroll
      const scrollPosition = window.scrollY + 140;
      
      const sections = [
        { id: 'home', elementId: 'home' },
        { id: 'about', elementId: 'why-choose-us' },
        { id: 'services', elementId: 'services' },
        { id: 'facilities', elementId: 'facilities' },
        { id: 'careers', elementId: 'careers' },
        { id: 'contact', elementId: 'contact' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i];
        const el = document.getElementById(item.elementId);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent awkward background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Nav Items exactly matching user reference screenshot:
  // Home | About | Services | Facilities | Careers | Contact
  const navItems = [
    { 
      label: 'Home', 
      id: 'home', 
      href: '#home', 
      subtext: 'Overview & emergency desk',
      icon: Home,
      action: () => {
        setActiveSection('home');
        const el = document.getElementById('home');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      label: 'About', 
      id: 'about', 
      href: '#why-choose-us', 
      subtext: '4 pillars, standards & CNO checks',
      icon: ShieldCheck,
      action: () => {
        setActiveSection('about');
        const el = document.getElementById('why-choose-us');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      label: 'Services', 
      id: 'services', 
      href: '#services', 
      subtext: 'PSW, RPN & RN in-home care',
      icon: HeartHandshake,
      action: () => {
        setActiveSection('services');
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      label: 'Facilities', 
      id: 'facilities', 
      href: '#facilities', 
      subtext: 'Hospital surge & LTC staffing relief',
      icon: Building2,
      action: () => {
        setActiveSection('facilities');
        const el = document.getElementById('facilities');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      label: 'Careers', 
      id: 'careers', 
      href: '#careers', 
      subtext: 'Now hiring PSWs, RPNs & RNs',
      icon: Briefcase,
      action: () => {
        setActiveSection('careers');
        const el = document.getElementById('careers');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      label: 'Contact', 
      id: 'contact', 
      href: '#contact', 
      subtext: 'Stoney Creek HQ & 24/7 intake',
      icon: MapPin,
      action: () => {
        setActiveSection('contact');
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item.action) {
      item.action();
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 100% Fixed Header Across All Devices */}
      <header 
        className={`fixed top-0 inset-x-0 z-50 bg-white transition-all duration-200 ${
          isScrolled 
            ? 'glass-nav shadow-xs border-b border-slate-200/90 py-2 sm:py-2.5' 
            : 'border-b border-slate-200/80 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Premium Logo Section (Exact Match to User Reference Screenshot) */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, navItems[0])}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none" 
              title="Aquarius Home Health Care - Ontario Healthcare Partner"
            >
              {/* Rounded White Logo Badge with Subtle Border */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-1 shadow-2xs flex items-center justify-center flex-shrink-0 group-hover:border-slate-300 transition-colors">
                <img 
                  src="/aquarius-logo.png" 
                  alt="Aquarius Home Health Care" 
                  className="w-full h-full object-contain" 
                />
              </div>

              {/* Brand Typography & Green Status Dot */}
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base text-brand-navy tracking-tight leading-tight">
                  Aquarius Home Health Care
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse"></span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide">
                    Ontario Healthcare Partner Since 2016
                  </span>
                </div>
              </div>
            </a>

            {/* Center: Desktop Navigation Links (Home | About | Services | Facilities | Careers | Contact) */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`relative py-1 text-sm font-semibold transition-colors ${
                      isActive 
                        ? 'text-brand-blue font-bold' 
                        : 'text-slate-600 hover:text-brand-navy'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-2 sm:-bottom-2.5 left-0 right-0 h-[2.5px] bg-brand-blue rounded-full"></span>
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Desktop: Phone & Request Staff Button (Exact Match to User Reference Screenshot) */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              
              {/* Direct Phone Number */}
              <a 
                href={`tel:${COMPANY_INFO.phoneRaw}`} 
                className="flex items-center gap-2 font-bold text-xs sm:text-sm text-brand-navy hover:text-brand-blue transition group"
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center group-hover:bg-blue-100 transition">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>905-525-5111</span>
              </a>

              {/* Request Staff Pill Button */}
              <button
                onClick={onOpenStaffingModal}
                className="px-5 sm:px-6 py-2.5 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition active:scale-[0.98]"
              >
                Request Staff
              </button>
            </div>

            {/* Tablet & Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-9 h-9 rounded-full text-brand-blue bg-blue-50 border border-blue-100 flex items-center justify-center hover:bg-blue-100 transition shadow-2xs"
                aria-label="Call Dispatch 905-525-5111"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Request Staff Pill visible on tablet */}
              <button
                onClick={onOpenStaffingModal}
                className="hidden sm:inline-flex px-4 py-2 rounded-full bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition active:scale-[0.98]"
              >
                Request Staff
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center transition focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-brand-navy" /> : <Menu className="w-5 h-5 text-brand-navy" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Full-Screen Overlay Drawer with Dedicated Icons */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[68px] bottom-0 z-50 bg-white flex flex-col justify-between p-4 sm:p-6 animate-fadeIn overflow-y-auto border-t border-slate-200/80 shadow-2xl">
            
            <div className="space-y-4">
              
              {/* Category Label */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Menu & Portals
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Dispatch Active
                </span>
              </div>

              {/* Drawer Navigation Links with Dedicated Icons */}
              <div className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                        isActive 
                          ? 'bg-blue-50/90 text-brand-blue font-bold border-l-4 border-brand-blue pl-3.5' 
                          : 'text-brand-navy hover:bg-slate-50 font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isActive 
                            ? 'bg-brand-blue text-white shadow-2xs' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-bold leading-tight">{item.label}</span>
                          <span className="text-[11px] text-slate-400 font-normal">{item.subtext}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </a>
                  );
                })}
              </div>

              {/* Mobile Quick Action Pill Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStaffingModal();
                  }}
                  className="w-full py-3 px-4 rounded-full text-white bg-brand-blue hover:bg-blue-700 font-bold text-sm shadow-xs flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Users className="w-4 h-4" />
                  <span>Request Staff (Hospital / Facility)</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultationModal();
                  }}
                  className="w-full py-3 px-4 rounded-full text-brand-teal bg-teal-50 border border-teal-200/80 hover:bg-teal-100 font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book In-Home Care Assessment</span>
                </button>
              </div>

            </div>

            {/* Mobile Footer Inside Drawer */}
            <div className="pt-4 mt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2.5">
              <a 
                href={`tel:${COMPANY_INFO.phoneRaw}`} 
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-brand-navy font-bold hover:bg-blue-50/50 transition"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-brand-blue" />
                  <span>24/7 Live Dispatch Desk</span>
                </div>
                <span className="text-brand-blue font-mono font-bold">905-525-5111</span>
              </a>

              <div className="flex items-center gap-2 text-slate-500 px-1 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}</span>
              </div>
            </div>

          </div>
        )}

      </header>

      {/* Fixed Spacer Element to prevent content from jumping beneath fixed header */}
      <div className="h-[64px] sm:h-[72px]" aria-hidden="true" />
    </>
  );
}