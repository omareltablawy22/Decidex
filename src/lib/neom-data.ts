import { format, addDays, subDays } from "date-fns"

// Tender statuses
export type TenderStatus = "open" | "closing-soon" | "closed" | "awarded" | "cancelled"

// Tender categories
export type TenderCategory =
  | "infrastructure"
  | "technology"
  | "energy"
  | "tourism"
  | "housing"
  | "transportation"
  | "water"
  | "waste-management"
  | "healthcare"
  | "education"

// Tender interface
export interface Tender {
  id: string
  title: string
  description: string
  publishDate: string
  closingDate: string
  status: TenderStatus
  category: TenderCategory
  estimatedValue: string
  location: string
  contactPerson: string
  contactEmail: string
  documents: {
    name: string
    type: string
    size: string
    url: string
  }[]
  requirements: string[]
  isNew: boolean
  isViewed: boolean
}

// Generate mock NEOM tenders
export const neomTenders: Tender[] = [
  {
    id: "NT-2025-001",
    title: "THE LINE Smart City Infrastructure Development",
    description:
      "Design and construction of critical infrastructure components for THE LINE, including utilities networks, transportation systems, and digital backbone infrastructure.",
    publishDate: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    closingDate: format(addDays(new Date(), 25), "yyyy-MM-dd"),
    status: "open",
    category: "infrastructure",
    estimatedValue: "SAR 5.2 billion",
    location: "THE LINE, NEOM",
    contactPerson: "Mohammed Al-Harbi",
    contactEmail: "tenders@neom.com",
    documents: [
      {
        name: "Technical Specifications",
        type: "PDF",
        size: "12.5 MB",
        url: "#",
      },
      {
        name: "Tender Requirements",
        type: "DOCX",
        size: "3.2 MB",
        url: "#",
      },
      {
        name: "Site Plans",
        type: "ZIP",
        size: "45.8 MB",
        url: "#",
      },
    ],
    requirements: [
      "Minimum 10 years experience in large-scale infrastructure projects",
      "Previous experience in smart city development",
      "Financial capability to handle project of this scale",
      "Compliance with Saudi Vision 2030 localization requirements",
      "Demonstrated expertise in sustainable development",
    ],
    isNew: false,
    isViewed: true,
  },
  {
    id: "NT-2025-002",
    title: "OXAGON Advanced Manufacturing Hub",
    description:
      "Development of advanced manufacturing facilities in OXAGON, focusing on renewable energy components, autonomous mobility systems, and sustainable materials production.",
    publishDate: format(subDays(new Date(), 3), "yyyy-MM-dd"),
    closingDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    status: "open",
    category: "technology",
    estimatedValue: "SAR 3.8 billion",
    location: "OXAGON, NEOM",
    contactPerson: "Sarah Al-Saud",
    contactEmail: "oxagon.tenders@neom.com",
    documents: [
      {
        name: "Manufacturing Specifications",
        type: "PDF",
        size: "18.7 MB",
        url: "#",
      },
      {
        name: "Environmental Requirements",
        type: "PDF",
        size: "5.1 MB",
        url: "#",
      },
    ],
    requirements: [
      "Expertise in Industry 4.0 technologies and implementation",
      "Proven track record in sustainable manufacturing",
      "Ability to integrate with NEOM's digital backbone",
      "Experience with modular construction techniques",
      "Compliance with NEOM's zero-carbon manufacturing standards",
    ],
    isNew: false,
    isViewed: true,
  },
  {
    id: "NT-2025-003",
    title: "TROJENA Winter Tourism Infrastructure",
    description:
      "Construction of winter tourism facilities in TROJENA, including ski slopes, mountain resorts, and adventure tourism infrastructure with year-round capabilities.",
    publishDate: format(subDays(new Date(), 1), "yyyy-MM-dd"),
    closingDate: format(addDays(new Date(), 45), "yyyy-MM-dd"),
    status: "open",
    category: "tourism",
    estimatedValue: "SAR 2.5 billion",
    location: "TROJENA, NEOM",
    contactPerson: "Khalid Al-Otaibi",
    contactEmail: "trojena.tenders@neom.com",
    documents: [
      {
        name: "Resort Specifications",
        type: "PDF",
        size: "22.3 MB",
        url: "#",
      },
      {
        name: "Environmental Impact Assessment",
        type: "PDF",
        size: "8.7 MB",
        url: "#",
      },
      {
        name: "Architectural Concepts",
        type: "ZIP",
        size: "65.2 MB",
        url: "#",
      },
    ],
    requirements: [
      "Experience in mountain and winter tourism development",
      "Expertise in sustainable tourism infrastructure",
      "Ability to design for extreme weather conditions",
      "Integration with NEOM's digital tourism ecosystem",
      "Compliance with international safety standards for winter sports",
    ],
    isNew: true,
    isViewed: false,
  },
  {
    id: "NT-2025-004",
    title: "NEOM Green Hydrogen Production Facility",
    description:
      "Design, construction, and commissioning of a large-scale green hydrogen production facility powered by renewable energy, including electrolyzers, storage, and distribution infrastructure.",
    publishDate: format(new Date(), "yyyy-MM-dd"),
    closingDate: format(addDays(new Date(), 60), "yyyy-MM-dd"),
    status: "open",
    category: "energy",
    estimatedValue: "SAR 6.7 billion",
    location: "NEOM Industrial City",
    contactPerson: "Ahmed Al-Ghamdi",
    contactEmail: "energy.tenders@neom.com",
    documents: [
      {
        name: "Technical Requirements",
        type: "PDF",
        size: "15.8 MB",
        url: "#",
      },
      {
        name: "Production Specifications",
        type: "PDF",
        size: "7.3 MB",
        url: "#",
      },
    ],
    requirements: [
      "Proven experience in hydrogen production at scale",
      "Expertise in renewable energy integration",
      "Advanced knowledge of electrolyzer technologies",
      "Experience with hydrogen storage and transport systems",
      "Compliance with international safety standards for hydrogen handling",
    ],
    isNew: true,
    isViewed: false,
  },
  {
    id: "NT-2025-005",
    title: "NEOM Autonomous Transportation Network",
    description:
      "Implementation of an integrated autonomous transportation system throughout NEOM, including vehicles, infrastructure, control systems, and user interfaces.",
    publishDate: format(new Date(), "yyyy-MM-dd"),
    closingDate: format(addDays(new Date(), 40), "yyyy-MM-dd"),
    status: "open",
    category: "transportation",
    estimatedValue: "SAR 4.3 billion",
    location: "NEOM-wide",
    contactPerson: "Noura Al-Zahrani",
    contactEmail: "mobility.tenders@neom.com",
    documents: [
      {
        name: "System Requirements",
        type: "PDF",
        size: "14.2 MB",
        url: "#",
      },
      {
        name: "Integration Specifications",
        type: "PDF",
        size: "6.8 MB",
        url: "#",
      },
      {
        name: "User Experience Guidelines",
        type: "PDF",
        size: "3.5 MB",
        url: "#",
      },
    ],
    requirements: [
      "Expertise in autonomous vehicle technologies and systems",
      "Experience in transportation network design and implementation",
      "Capability to integrate with NEOM's digital backbone",
      "Knowledge of AI-driven traffic management systems",
      "Compliance with emerging standards for autonomous mobility",
    ],
    isNew: true,
    isViewed: false,
  },
  {
    id: "NT-2025-006",
    title: "NEOM Desalination and Water Management System",
    description:
      "Development of next-generation desalination facilities and integrated water management systems with zero liquid discharge and minimal energy consumption.",
    publishDate: format(subDays(new Date(), 15), "yyyy-MM-dd"),
    closingDate: format(subDays(new Date(), 2), "yyyy-MM-dd"),
    status: "closed",
    category: "water",
    estimatedValue: "SAR 3.1 billion",
    location: "NEOM Coastal Areas",
    contactPerson: "Faisal Al-Malik",
    contactEmail: "water.tenders@neom.com",
    documents: [
      {
        name: "Technical Specifications",
        type: "PDF",
        size: "16.4 MB",
        url: "#",
      },
      {
        name: "Environmental Requirements",
        type: "PDF",
        size: "5.7 MB",
        url: "#",
      },
    ],
    requirements: [
      "Experience in advanced desalination technologies",
      "Expertise in zero liquid discharge systems",
      "Knowledge of renewable energy integration with water systems",
      "Track record in smart water management",
      "Compliance with NEOM's sustainability standards",
    ],
    isNew: false,
    isViewed: true,
  },
  {
    id: "NT-2025-007",
    title: "NEOM Digital Twin Platform Development",
    description:
      "Creation of a comprehensive digital twin platform for NEOM, integrating IoT data, AI analytics, simulation capabilities, and visualization tools for city management and planning.",
    publishDate: format(subDays(new Date(), 20), "yyyy-MM-dd"),
    closingDate: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    status: "awarded",
    category: "technology",
    estimatedValue: "SAR 1.8 billion",
    location: "NEOM Tech Hub",
    contactPerson: "Tariq Al-Farsi",
    contactEmail: "digital.tenders@neom.com",
    documents: [
      {
        name: "Platform Requirements",
        type: "PDF",
        size: "10.2 MB",
        url: "#",
      },
      {
        name: "Integration Specifications",
        type: "PDF",
        size: "4.8 MB",
        url: "#",
      },
    ],
    requirements: [
      "Expertise in digital twin technologies and implementation",
      "Experience with large-scale IoT deployments",
      "Advanced capabilities in AI and machine learning",
      "Knowledge of urban planning and management systems",
      "Ability to create intuitive visualization interfaces",
    ],
    isNew: false,
    isViewed: true,
  },
  {
    id: "NT-2025-008",
    title: "NEOM Vertical Farming and Food Innovation Centers",
    description:
      "Development of advanced vertical farming facilities and food innovation centers to support NEOM's food security and sustainability goals.",
    publishDate: format(subDays(new Date(), 10), "yyyy-MM-dd"),
    closingDate: format(addDays(new Date(), 5), "yyyy-MM-dd"),
    status: "closing-soon",
    category: "technology",
    estimatedValue: "SAR 1.2 billion",
    location: "NEOM Food District",
    contactPerson: "Lama Al-Harbi",
    contactEmail: "food.tenders@neom.com",
    documents: [
      {
        name: "Facility Requirements",
        type: "PDF",
        size: "9.7 MB",
        url: "#",
      },
      {
        name: "Agricultural Specifications",
        type: "PDF",
        size: "5.3 MB",
        url: "#",
      },
    ],
    requirements: [
      "Experience in vertical farming and controlled environment agriculture",
      "Expertise in food technology and innovation",
      "Knowledge of sustainable agricultural practices",
      "Ability to integrate with NEOM's water and energy systems",
      "Compliance with international food safety standards",
    ],
    isNew: false,
    isViewed: true,
  },
]

// Function to get count of new tenders
export const getNewTendersCount = () => {
  return neomTenders.filter((tender) => tender.isNew && !tender.isViewed).length
}

// Function to mark a tender as viewed
export const markTenderAsViewed = (tenderId: string) => {
  const tenderIndex = neomTenders.findIndex((tender) => tender.id === tenderId)
  if (tenderIndex !== -1) {
    // In a real app, you might want to mutate a state here instead of the const
    // For this reconstruction, we'll log it.
    console.log(`Marking tender ${tenderId} as viewed (simulated).`);
    // If neomTenders was state:
    // const updatedTenders = [...neomTenders];
    // updatedTenders[tenderIndex].isViewed = true;
    // setNeomTenders(updatedTenders); // Assuming setNeomTenders is the state setter
  }
}