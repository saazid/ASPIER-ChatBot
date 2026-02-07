
export enum ResponseSpeed {
  FAST = 'Fast',
  THINKING = 'Thinking',
  PRO = 'Pro'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ResearchWing {
  id: string;
  name: string;
  description: string;
}

export const RESEARCH_WINGS: ResearchWing[] = [
  { 
    id: 'general', 
    name: '🌐 General Research', 
    description: 'Universal discussion on scientific methodologies, models, and cross-disciplinary theories.' 
  },
  { 
    id: 'aero', 
    name: '✈️ Aeronautical Engineering & UAV Systems', 
    description: 'Design of fixed-wing UAVs, quadcopters, and autonomous drone swarms for environmental surveillance.' 
  },
  { 
    id: 'planetary', 
    name: '🪐 Planetary Science & Astrobiology', 
    description: 'Comparison of Earth\'s geomorphology with Martian features and simulation of planetary atmospheres.' 
  },
  { 
    id: 'hydrology', 
    name: '🌦️ Hydrology & Atmospheric Physics', 
    description: 'Flood risk modeling, rainfall trend analysis, and groundwater depletion assessment.' 
  },
  { 
    id: 'geospatial', 
    name: '🗺️ Geospatial Intelligence & Remote Sensing', 
    description: 'Deforestation monitoring, urban sprawl mapping, and automated oil spill detection.' 
  },
  { 
    id: 'geomicro', 
    name: '🦠 Geomicrobiology & Biogeology', 
    description: 'Microbial interactions with mineral surfaces and role in purifying groundwater aquifers.' 
  },
  { 
    id: 'chem', 
    name: '🧪 Environmental Chemistry & Toxicology', 
    description: 'Quantifying heavy metal persistence and analyzing chemical kinetics of ozone depletion.' 
  },
  { 
    id: 'biotech', 
    name: '🧬 Applied Biotechnology', 
    description: 'Microbial strains for bioremediation and drought-resistant crop varieties using CRISPR.' 
  },
  { 
    id: 'agri', 
    name: '🌾 Agricultural Sciences & Food Security', 
    description: 'Precision agriculture using IoT sensors and climate-resilient supply chains.' 
  },
  { 
    id: 'econ', 
    name: '📊 Economic Geography & Resource Management', 
    description: 'Spatial poverty distribution and economic impacts of natural disasters.' 
  },
  { 
    id: 'policy', 
    name: '⚖️ Environmental Policy & Governance', 
    description: 'Evaluation of protection laws and policy frameworks for transboundary water sharing.' 
  }
];
