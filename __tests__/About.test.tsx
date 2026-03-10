import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import About from '../components/About';
import { LanguageProvider } from '../LanguageContext';

vi.mock('../components/Reveal', () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: (props: React.HTMLAttributes<HTMLDivElement> & { whileHover?: unknown }) => {
      const sanitizedProps = { ...props };
      delete sanitizedProps.whileHover;
      return <div {...sanitizedProps} />;
    },
  },
}));

vi.mock('../siteConfig', () => ({
  SOCIAL_LINKS: {
    linkedin: 'https://www.linkedin.com/company/collabyt/',
  },
  TEAM_MEMBERS: [
    {
      name: 'Ana Costa',
      role: 'CEO',
      image: 'https://images.example.com/ana.jpg',
      skills: ['Leadership'],
      quote: 'Build fast.',
      iconKey: 'rocket',
      linkedinUrl: 'https://www.linkedin.com/in/ana-costa/',
    },
    {
      name: 'Bruno Lima',
      role: 'CTO',
      image: 'https://images.example.com/bruno.jpg',
      skills: ['Architecture'],
      quote: 'Scale safely.',
      iconKey: 'cpu',
    },
    {
      name: 'Carla Souza',
      role: 'Product Lead',
      image: 'https://images.example.com/carla.jpg',
      skills: ['Product'],
      quote: 'Ship outcomes.',
      iconKey: 'palette',
      linkedinUrl: 'https://www.linkedin.com/company/collabyt/',
    },
  ],
  isValidLinkedInProfileUrl: (url?: string) =>
    typeof url === 'string' &&
    /^https:\/\/(www\.)?linkedin\.com\/in\/[a-z0-9\-._~%]+\/?$/i.test(url),
}));

const renderAbout = () =>
  render(
    <LanguageProvider>
      <About />
    </LanguageProvider>
  );

test('renders a LinkedIn button when the member has a valid personal profile URL', () => {
  renderAbout();

  const profileLink = screen.getByRole('link', { name: 'Conectar com Ana Costa' });
  expect(profileLink).toBeInTheDocument();
  expect(profileLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ana-costa/');
});

test('hides LinkedIn button when profile URL is missing or invalid', () => {
  renderAbout();

  expect(screen.queryByRole('link', { name: 'Conectar com Bruno Lima' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Conectar com Carla Souza' })).not.toBeInTheDocument();
});
