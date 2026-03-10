import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HealthcarePage from '../components/HealthcarePage';
import { LanguageProvider } from '../LanguageContext';

vi.mock('framer-motion', async () => {
  const ReactModule = await import('react');
  const motionProxy = new Proxy(
    {},
    {
      get: (_target, tag) =>
        ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
          const sanitizedProps = { ...props } as Record<string, unknown>;
          delete sanitizedProps.layout;
          delete sanitizedProps.layoutId;
          delete sanitizedProps.initial;
          delete sanitizedProps.animate;
          delete sanitizedProps.exit;
          delete sanitizedProps.transition;
          delete sanitizedProps.variants;
          delete sanitizedProps.whileHover;
          delete sanitizedProps.whileTap;
          delete sanitizedProps.whileInView;
          delete sanitizedProps.viewport;
          return ReactModule.createElement(tag as string, sanitizedProps, children);
        },
    }
  );

  return {
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      ReactModule.createElement(ReactModule.Fragment, null, children),
  };
});

const renderHealthcarePage = (locale: 'pt-br' | 'en') =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/${locale}/healthcare`]}>
        <LanguageProvider>
          <HealthcarePage locale={locale} />
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>
  );

test('renders healthcare page in pt-br with CTA and layout', () => {
  renderHealthcarePage('pt-br');

  expect(
    screen.getByRole('heading', { level: 1, name: /Hospitais/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Falar com especialista/i })).toHaveAttribute(
    'href',
    '/pt-br/contact'
  );
  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('renders healthcare page in en with CTA and layout', () => {
  renderHealthcarePage('en');

  expect(
    screen.getByRole('heading', { level: 1, name: /Hospitals/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Talk to a specialist/i })).toHaveAttribute(
    'href',
    '/en/contact'
  );
  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});
