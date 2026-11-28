export const COMPANY_INFO = {
  name: "Aquarius Home Health Care",
  established: "2016",
  tagline: "Bridging the Gap Between Quality Healthcare and Personal Comfort",
  address: {
    street: "800 Queenston Rd, Unit 309",
    city: "Stoney Creek",
    province: "ON",
    postalCode: "L8G-1A7",
    full: "800 Queenston Rd unit 309, Stoney Creek, ON L8G-1A7",
    mapUrl: "https://maps.google.com/?q=800+Queenston+Rd+unit+309,+Stoney+Creek,+ON+L8G-1A7"
  },
  phone: "(905) 525-5111",
  phoneRaw: "9055255111",
  email: "raj.manvi@aquariushomehealth.com",
  dispatchHours: "24/7 / 365 Days a Year",
  officeHours: "Monday – Friday: 8:00 AM – 6:00 PM (Emergency Dispatch: 24/7)",
  languages: ["English", "Punjabi", "Hindi", "Urdu", "French", "Filipino (Tagalog)", "Italian"]
};

export const MISSION_VISION = {
  mission: "To bridge the gap between hospital-grade clinical care and the dignity of home by delivering thoroughly vetted, compassionate healthcare professionals who foster independence, safety, and complete peace of mind for Ontario families and partner facilities.",
  vision: "A connected Ontario healthcare community where seniors, recovering patients, and healthcare institutions never face a care gap—supported 24/7 by dependable, culturally sensitive nurses and personal support workers.",
  whoItHelps: [
    "Older adults wishing to age safely and independently at home",
    "Patients transitioning home after surgery or hospital discharge",
    "Individuals managing Alzheimer's, dementia, stroke, or mobility challenges",
    "Family caregivers seeking scheduled respite without worry"
  ],
  consistencyPromise: [
    "Consistent caregiver matching aligned to language, personality & household routine",
    "Daily observation & proactive reporting of subtle health or mobility changes",
    "Strict respect for personal privacy, cultural preferences & home autonomy"
  ]
};

export const MODULAR_HOME_SERVICES = [
  {
    id: "personal-care",
    category: "Personal Care",
    title: "Personal Care & Hygiene",
    summary: "Respectful assistance with bathing, dressing, grooming, toileting, and oral hygiene to preserve daily dignity.",
    iconName: "HeartHandshake"
  },
  {
    id: "companionship",
    category: "Daily Living",
    title: "Companionship & Social Support",
    summary: "Meaningful conversation, shared hobbies, gentle walks, and cognitive engagement to ease isolation.",
    iconName: "Smile"
  },
  {
    id: "dementia-memory",
    category: "Specialized Care",
    title: "Dementia & Alzheimer's Care",
    summary: "Stage-adapted memory support using calm redirection, wandering prevention, and familiar daily structure.",
    iconName: "ShieldCheck"
  },
  {
    id: "mobility-transfers",
    category: "Personal Care",
    title: "Mobility & Safe Transfers",
    summary: "Hands-on fall prevention, bed-to-chair transfer safety, and guided range-of-motion assistance.",
    iconName: "Activity"
  },
  {
    id: "meal-prep",
    category: "Daily Living",
    title: "Meal Prep & Grocery Runs",
    summary: "Nutritious menu planning, dietary-compliant cooking, pantry restocking, and hydration monitoring.",
    iconName: "Utensils"
  },
  {
    id: "light-housekeeping",
    category: "Daily Living",
    title: "Light Housekeeping & Laundry",
    summary: "Tidying living spaces, fresh linens, dishes, and laundry to keep the home environment safe and restful.",
    iconName: "Sparkles"
  },
  {
    id: "appointment-escort",
    category: "Daily Living",
    title: "Medical Appointment Escorts",
    summary: "Reliable door-to-door accompaniment to doctor visits, labs, and physiotherapy with notes shared back to family.",
    iconName: "Car"
  },
  {
    id: "respite-care",
    category: "Extended & Recovery",
    title: "Family Respite Relief",
    summary: "Flexible short-term relief for family caregivers—for a few hours, weekends, or weeks—so you can rest with peace of mind.",
    iconName: "Coffee"
  },
  {
    id: "post-hospital",
    category: "Extended & Recovery",
    title: "Post-Hospital Transitional Care",
    summary: "Structured discharge recovery, medication reminders, wound monitoring (RPN/RN), and readmission prevention.",
    iconName: "Stethoscope"
  },
  {
    id: "overnight-care",
    category: "Extended & Recovery",
    title: "Overnight Awake Care",
    summary: "An attentive, awake caregiver throughout the night for safe toileting, turning, and sundowning reassurance.",
    iconName: "Moon"
  },
  {
    id: "24-hour-care",
    category: "Extended & Recovery",
    title: "24-Hour & Live-In Coverage",
    summary: "Continuous around-the-clock shift rotation from a coordinated team ensuring uninterrupted safety.",
    iconName: "Clock"
  },
  {
    id: "palliative-care",
    category: "Specialized Care",
    title: "Palliative Comfort Care",
    summary: "Compassionate end-of-life comfort care, pain tracking, and emotional support for both patient and family.",
    iconName: "Heart"
  }
];

export const CAREER_GROWTH_TRACKS = [
  {
    step: "01",
    title: "Guided Orientation & Mentorship",
    desc: "New PSWs and nurses receive paid orientation covering safe transfers, documentation standards, and accompanied first-shift introductions."
  },
  {
    step: "02",
    title: "Compatibility Client Matching",
    desc: "Our coordinators match your clinical strengths, language skills, and Stoney Creek/Hamilton commute preferences with the right clients."
  },
  {
    step: "03",
    title: "Ongoing Specialized Workshops",
    desc: "Access continuous training modules in Alzheimer's/dementia care, palliative comfort, and Ontario infection prevention protocols."
  },
  {
    step: "04",
    title: "24/7 On-Call Support Team",
    desc: "Whenever you are on a home visit or hospital floor, our live supervisor desk is one phone call away for immediate clinical backing."
  }
];

export const PILLARS_OF_EXCELLENCE = [
  {
    id: "qualified-staff",
    title: "Qualified & Verified Staff",
    badge: "100% Vetted",
    summary: "Every healthcare professional undergoes exhaustive multi-level background checks, police vulnerable sector screening, and active regulatory licensing checks.",
    bullets: [
      "Ontario College of Nurses (CNO) active credential verification",
      "Comprehensive Police Vulnerable Sector Screening (PVSS)",
      "Strict clinical reference validation & behavioral assessments",
      "CPR, First Aid, and continuous clinical skill re-certifications"
    ],
    icon: "ShieldCheck",
    color: "from-blue-600 to-sky-700"
  },
  {
    id: "compassion-first",
    title: "Compassion First Care",
    badge: "Patient-Centered",
    summary: "Clinical expertise means nothing without human warmth. We foster independence, preserve personal dignity, and give families complete peace of mind.",
    bullets: [
      "Customized bedside care tailored to individual routines",
      "Emotional comfort and dignity for patients and family members",
      "Culturally sensitive, empathetic caregiver matching",
      "Respectful, patient-led pacing for daily living activities"
    ],
    icon: "HeartHandshake",
    color: "from-teal-600 to-emerald-700"
  },
  {
    id: "reliability-24-7",
    title: "24/7 Availability & Reliability",
    badge: "Always On Duty",
    summary: "Healthcare needs never observe office hours. Our dedicated scheduling desk provides round-the-clock shift coverage and immediate dispatch.",
    bullets: [
      "24/7/365 live scheduling coordinators standing by",
      "Rapid on-call emergency dispatch for unexpected needs",
      "Zero gaps in patient coverage, including holidays and weekends",
      "Direct line of communication for family members and charge nurses"
    ],
    icon: "Clock",
    color: "from-indigo-600 to-blue-700"
  },
  {
    id: "flexible-support",
    title: "Flexible & Surge Shift Support",
    badge: "Rapid Response",
    summary: "Immediate, short-term, and long-term relief to handle sudden patient surges, urgent sick calls, or critical facility staffing vacancies.",
    bullets: [
      "Immediate turnaround for unexpected same-day sick calls",
      "Seasonal and pandemic surge support for acute wards and LTCs",
      "Flexible short-term coverage or stable long-term block booking",
      "Seamless integration into your institutional EHR and unit routines"
    ],
    icon: "Zap",
    color: "from-amber-500 to-orange-600"
  }
];

export const CLINICAL_ROLES = [
  {
    code: "PSW",
    title: "Personal Support Workers",
    tagline: "Essential Dignity, Daily Living & Comfort Care",
    description: "Our certified PSWs assist with activities of daily living (ADLs), ensuring safety, personal hygiene, nutritional support, and uplifting companionship.",
    responsibilities: [
      "Bathing, dressing, grooming & personal hygiene",
      "Mobility assistance, safe transfers & fall prevention",
      "Meal preparation, feeding assistance & hydration tracking",
      "Medication reminders & daily vital logging",
      "Alzheimer's & Dementia companion support",
      "Light housekeeping and restful environment maintenance"
    ],
    idealFor: "Seniors aging in place, post-discharge recovery, caregiver respite, and LTC floor support."
  },
  {
    code: "RPN",
    title: "Registered Practical Nurses",
    tagline: "Skilled Clinical Care & Chronic Disease Management",
    description: "College of Nurses of Ontario (CNO) licensed RPNs delivering targeted clinical interventions, wound management, and specialized medication protocols.",
    responsibilities: [
      "Wound care, dressing changes & surgical site monitoring",
      "Medication administration & subcutaneous/intramuscular injections",
      "Catheter care, stoma management & ostomy care",
      "Vital signs analysis & chronic symptom tracking",
      "Diabetic care, blood glucose monitoring & insulin therapy",
      "Physician and family clinical progress reporting"
    ],
    idealFor: "Patients with controlled medical conditions, sub-acute recovery, and retirement residence nursing."
  },
  {
    code: "RN",
    title: "Registered Nurses",
    tagline: "Advanced Clinical Leadership & Complex Care",
    description: "Experienced RNs delivering complex assessment, critical nursing intervention, IV therapy, palliative comfort care, and healthcare unit leadership.",
    responsibilities: [
      "Complex clinical assessments & personalized care planning",
      "IV therapy, PICC line management & pain management infusions",
      "End-of-life palliative comfort care & symptom relief",
      "Ventilator, tracheostomy & high-acuity patient support",
      "Post-surgical acute monitoring and complication prevention",
      "Clinical oversight, facility shift charge, and triage leadership"
    ],
    idealFor: "Complex clinical cases, acute hospital shift relief, palliative care, and facility nursing leadership."
  }
];

export const DUAL_TRACK_SERVICES = {
  families: {
    badge: "For Families & Loved Ones",
    headline: "Hospital-Grade Care in the Comfort of Your Own Home",
    subheadline: "Personalized care plans that preserve your loved one's independence while giving you complete peace of mind.",
    services: [
      {
        title: "Senior Care & Aging-in-Place",
        description: "Enabling seniors to live safely and independently in the comfort of their familiar home environment.",
        features: ["Mobility & transfer support", "Fall risk mitigation", "Companionship & cognitive stimulation"]
      },
      {
        title: "Post-Hospital Discharge Care",
        description: "Smooth transition from hospital to home, reducing readmission risks with dedicated wound and recovery care.",
        features: ["Medication reconciliation", "Wound & dressing care", "Post-operative mobility rehabilitation"]
      },
      {
        title: "Dementia & Alzheimer's Care",
        description: "Gentle, memory-supportive care provided by trained caregivers who prioritize patience, safety, and routine.",
        features: ["Calming behavioral redirection", "Wandering prevention", "Structured daily engagement"]
      },
      {
        title: "Compassionate Palliative & Respite Care",
        description: "Providing dignity, pain management, and comfort during end-of-life stages, plus relief for primary caregivers.",
        features: ["24/7 symptom monitoring", "Emotional family support", "Caregiver burnout relief"]
      }
    ]
  },
  facilities: {
    badge: "For Healthcare Institutions",
    headline: "Rapid, Verified Healthcare Staffing On Demand",
    subheadline: "Never compromise patient-to-nurse ratios. We deliver fully credentialed PSWs, RPNs, and RNs within hours.",
    services: [
      {
        title: "Urgent Sick-Call & Shift Coverage",
        description: "Immediate shift replenishment to ensure your unit remains compliant and fully operational 24/7/365.",
        features: ["Rapid dispatch within hours", "Day, evening, and night block coverage", "Zero onboarding friction"]
      },
      {
        title: "Hospital & Acute Ward Surge Staffing",
        description: "Pre-screened clinical staff ready to integrate into emergency rooms, surgical floors, and sub-acute units.",
        features: ["CNO registered nurses", "ACLS/BLS certified personnel", "Immediate bedside readiness"]
      },
      {
        title: "Long-Term Care & Retirement Residences",
        description: "Reliable, compassionate nursing and support workers trained in MOHLTC standards and geriatric protocols.",
        features: ["PointClickCare familiar staff", "Consistent staffing assignments", "Resident safety prioritization"]
      },
      {
        title: "Specialized Clinic & Outpatient Relief",
        description: "Support for specialty medical clinics, surgical centers, and diagnostic facilities requiring qualified support.",
        features: ["Scheduled ongoing placements", "High professionalism", "Seamless administrative alignment"]
      }
    ]
  }
};

export const SERVICE_AREAS = [
  { name: "Stoney Creek", note: "Primary Headquarters & Rapid Hub", highlight: true },
  { name: "Hamilton", note: "Full Metro & Hospital Coverage", highlight: true },
  { name: "Burlington", note: "Residential & Facility Support", highlight: false },
  { name: "Oakville", note: "Private Home Care & Nursing", highlight: false },
  { name: "Grimsby & Lincoln", note: "Niagara Gateway Care", highlight: false },
  { name: "Niagara Region", note: "Extended Facility Placements", highlight: false },
  { name: "Ancaster & Dundas", note: "Complete Community Services", highlight: false },
  { name: "Haldimand County", note: "Regional Outreach & Support", highlight: false }
];

export const TRUST_STATS = [
  { value: "2016", label: "Founded & Operating", sub: "Over 9+ years of clinical excellence" },
  { value: "100%", label: "Screened Staff", sub: "Police Vulnerable Sector & CNO checked" },
  { value: "24/7/365", label: "Rapid Dispatch Desk", sub: "Live coordinators always on duty" },
  { value: "< 15m", label: "Average Response Time", sub: "For urgent facility shift requests" }
];

export const FAQ_ITEMS = [
  {
    q: "How quickly can Aquarius Home Health Care provide a caregiver or nurse?",
    a: "For emergency facility staffing or urgent hospital discharges, we can often dispatch qualified staff within 2 to 4 hours. For scheduled in-home care, we conduct a free comprehensive clinical assessment and can start personalized service within 24 to 48 hours."
  },
  {
    q: "How do you verify the credentials of your nurses and support workers?",
    a: "Every candidate undergoes a mandatory 4-tier screening process: 1) Active registration verification with the College of Nurses of Ontario (CNO) or accredited PSW diploma checks; 2) Police Vulnerable Sector Screening (PVSS); 3) Thorough reference audits; 4) Clinical competency, CPR, and infection control compliance."
  },
  {
    q: "What areas in Ontario do you serve?",
    a: "Our headquarters are at 800 Queenston Rd in Stoney Creek. We provide extensive home care and facility staffing across Stoney Creek, Hamilton, Burlington, Oakville, Grimsby, Niagara Region, Ancaster, and surrounding communities."
  },
  {
    q: "Can healthcare facilities book emergency shift coverage outside business hours?",
    a: "Yes. Our dispatch line (905) 525-5111 and email raj.manvi@aquariushomehealth.com operate 24 hours a day, 7 days a week, 365 days a year to immediately assist unit managers, charge nurses, and Directors of Care."
  },
  {
    q: "Are your home care services covered by insurance or government programs?",
    a: "Many private health insurance plans, Extended Health Care (EHC) benefits, Veterans Affairs Canada (VAC), and Workplace Safety & Insurance Board (WSIB) cover our nursing and personal support services. We provide detailed clinical invoices for easy reimbursement."
  }
];
