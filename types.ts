import React from 'react';

export interface SolutionTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  caseStudy: {
    title: string;
    stat: string;
    description: string;
  };
}

export interface MethodologyStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TechTrend {
  title: string;
  description: string;
  impact: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type TeamMemberIconKey = 'rocket' | 'cpu' | 'palette' | 'terminal';

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  skills: string[];
  quote: string;
  iconKey: TeamMemberIconKey;
  linkedinUrl?: string;
}
