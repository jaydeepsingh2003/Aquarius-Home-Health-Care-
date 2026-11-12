import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PillarsSection from './components/PillarsSection';
import DualServicesSection from './components/DualServicesSection';
import FacilitiesSection from './components/FacilitiesSection';
import CareersSection from './components/CareersSection';
import CareAssessmentWizard from './components/CareAssessmentWizard';
import ServiceAreaSection from './components/ServiceAreaSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import UrgentStaffingModal from './components/UrgentStaffingModal';
import ConsultationModal from './components/ConsultationModal';
import CareersModal from './components/CareersModal';
import FloatingMobileDock from './components/FloatingMobileDock';

export default function App() {
  const [activeAudience, setActiveAudience] = useState('families');
  const [isStaffingModalOpen, setIsStaffingModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);

  const handleScrollToWizard = () => {
    const el = document.getElementById('care-wizard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-surface text-brand-slate-900 selection:bg-brand-blue selection:text-white pb-16 sm:pb-0 overflow-x-hidden">
      
      {/* Executive Healthcare Navbar (Matching User Reference Layout) */}
      <Navbar 
        onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
        onOpenCareersModal={() => setIsCareersModalOpen(true)}
      />

      <main className="flex-grow">
        {/* Luxury Dual-Audience Hero */}
        <HeroSection 
          activeAudience={activeAudience}
          setActiveAudience={setActiveAudience}
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
          onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
          onScrollToWizard={handleScrollToWizard}
        />

        {/* 4 Pillars of Excellence (From Document Manifesto) */}
        <PillarsSection 
          onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        />

        {/* Dual Services & Certified Staffing Matrix (PSW, RPN, RN) */}
        <DualServicesSection 
          activeAudience={activeAudience}
          onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        />

        {/* Dedicated Healthcare Facilities & Hospital Staffing Section (#facilities) */}
        <FacilitiesSection 
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        />

        {/* Dedicated Clinical Recruitment & Careers Section (#careers) */}
        <CareersSection 
          onOpenCareersModal={() => setIsCareersModalOpen(true)}
        />

        {/* 60-Second Care Assessment Matcher with Cryptographic UUID Tracking */}
        <CareAssessmentWizard />

        {/* Stoney Creek Operational HQ & Ontario Coverage */}
        <ServiceAreaSection 
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
          onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
        />

        {/* Direct Contact & Scheduling Desk */}
        <ContactSection />
      </main>

      {/* Professional Canadian Healthcare Footer */}
      <Footer 
        onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
        onOpenCareersModal={() => setIsCareersModalOpen(true)}
      />

      {/* Urgent B2B Facility Shift Request Modal */}
      <UrgentStaffingModal 
        isOpen={isStaffingModalOpen}
        onClose={() => setIsStaffingModalOpen(false)}
      />

      {/* Free Family In-Home Care Consultation Modal */}
      <ConsultationModal 
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />

      {/* Clinical Careers & Staff Recruitment Modal */}
      <CareersModal 
        isOpen={isCareersModalOpen}
        onClose={() => setIsCareersModalOpen(false)}
      />

      {/* Native-grade Floating Mobile Dock */}
      <FloatingMobileDock 
        onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
      />

    </div>
  );
}