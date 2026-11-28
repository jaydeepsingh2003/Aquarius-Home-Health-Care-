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
      
      {/* Executive Fixed Navbar */}
      <Navbar 
        onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        onOpenConsultationModal={handleOpenStandardConsultation}
        onOpenCareersModal={() => setIsCareersModalOpen(true)}
      />

      <main className="flex-grow">
        {/* Dual-Audience Hero + Trust Metrics Ribbon */}
        <HeroSection 
          activeAudience={activeAudience}
          setActiveAudience={setActiveAudience}
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
          onOpenConsultationModal={handleOpenStandardConsultation}
          onScrollToWizard={handleScrollToWizard}
        />

        {/* About Us: Core Pillars + Mission, Vision & Languages */}
        <PillarsSection />

        {/* Services: Core Role Tiers, Interactive Custom Care Plan Builder & Facility Staffing */}
        <DualServicesSection 
          activeAudience={activeAudience}
          onOpenConsultationModal={handleOpenStandardConsultation}
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
          onOpenCustomPlanModal={handleOpenCustomPlanModal}
        />

        {/* Dedicated Healthcare Facilities & Hospital Staffing Section (#facilities) */}
        <FacilitiesSection 
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        />

        {/* Concise 3-Step Onboarding Timeline */}
        <HowItWorksSection 
          onOpenConsultationModal={handleOpenStandardConsultation}
          onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        />

        {/* Dedicated Clinical Recruitment & Care Pro Growth Pathway (#careers) */}
        <CareersSection />

        {/* 60-Second Care Assessment Matcher */}
        <CareAssessmentWizard />

        {/* Client & Clinical Partner Testimonials */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Unified Stoney Creek HQ, Ontario Coverage & Contact Form (#contact) */}
        <ContactSection />
      </main>

      {/* Footer */}
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

      {/* Mobile Floating Dock */}
      <FloatingMobileDock 
        onOpenStaffingModal={() => setIsStaffingModalOpen(true)}
        onOpenConsultationModal={handleOpenStandardConsultation}
      />

    </div>
  );
}
