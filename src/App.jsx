import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PillarsSection from './components/PillarsSection';
import DualServicesSection from './components/DualServicesSection';
import HowItWorksSection from './components/HowItWorksSection';
import FacilitiesSection from './components/FacilitiesSection';
import CareersSection from './components/CareersSection';
import CareAssessmentWizard from './components/CareAssessmentWizard';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
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
  const [preselectedServices, setPreselectedServices] = useState([]);

  const handleOpenStandardConsultation = () => {
    setPreselectedServices([]);
    setIsConsultationModalOpen(true);
  };

  const handleOpenCustomPlanModal = (servicesList) => {
    setPreselectedServices(servicesList || []);
    setIsConsultationModalOpen(true);
  };

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
        onOpenConsultationModal={handleOpenStandardConsultation}
        onOpenCareersModal={() => setIsCareersModalOpen(true)}
      />

      <main className="flex-grow">
        {/* Luxury Dual-Audience Hero */}
        <HeroSection 
          activeAudience={activeAudience}
          setActiveAudience={setActiveAudience}
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
          onOpenConsultationModal={handleOpenStandardConsultation}
          onScrollToWizard={handleScrollToWizard}
        />

        {/* About Us: Mission, Vision, Multilingual Support, 4 Pillars & 4-Tier Clinical Vetting */}
        <PillarsSection />

        {/* Dual Services, PSW/RPN/RN Matrix & Modular Custom Care Plan Combiner */}
        <DualServicesSection 
          activeAudience={activeAudience}
          onOpenConsultationModal={handleOpenStandardConsultation}
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
          onOpenCustomPlanModal={handleOpenCustomPlanModal}
        />

        {/* 3-Step Onboarding & Shift Coverage Process */}
        <HowItWorksSection 
          onOpenConsultationModal={handleOpenStandardConsultation}
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        />

        {/* Dedicated Healthcare Facilities & Hospital Staffing Section (#facilities) */}
        <FacilitiesSection 
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        />

        {/* Dedicated Clinical Recruitment & Care Pro Growth Pathway (#careers) */}
        <CareersSection 
          onOpenCareersModal={() => setIsCareersModalOpen(true)}
        />

        {/* 60-Second Care Assessment Matcher with Cryptographic UUID Tracking */}
        <CareAssessmentWizard />

        {/* Verified Client & Clinical Partner Feedback */}
        <TestimonialsSection />

        {/* Frequently Asked Questions (Insurance, Vetting & 24/7 Dispatch) */}
        <FaqSection onOpenConsultationModal={handleOpenStandardConsultation} />

        {/* Stoney Creek Operational HQ & Ontario Coverage */}
        <ServiceAreaSection 
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
          onOpenConsultationModal={handleOpenStandardConsultation}
        />

        {/* Direct Contact & Scheduling Desk */}
        <ContactSection />
      </main>

      {/* Professional Canadian Healthcare Footer */}
      <Footer 
        onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        onOpenConsultationModal={handleOpenStandardConsultation}
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
        preselectedServices={preselectedServices}
      />

      {/* Clinical Careers & Staff Recruitment Modal */}
      <CareersModal 
        isOpen={isCareersModalOpen}
        onClose={() => setIsCareersModalOpen(false)}
      />

      {/* Native-grade Floating Mobile Dock */}
      <FloatingMobileDock 
        onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        onOpenConsultationModal={handleOpenStandardConsultation}
      />

    </div>
  );
}
