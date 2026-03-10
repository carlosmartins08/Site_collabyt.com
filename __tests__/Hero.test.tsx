import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Hero from '../components/Hero'
import { LanguageProvider } from '../LanguageContext'

test('renders Hero with CTA button', () => {
  const mockAction = vi.fn()
  render(
    <MemoryRouter>
      <LanguageProvider>
        <Hero onCtaClick={mockAction} scrollToProjects={mockAction} projectsHref="/pt-br/projects" />
      </LanguageProvider>
    </MemoryRouter>
  )

  const cta = screen.getByText(/Solicite um Diagnóstico|Request a Diagnosis/i)
  expect(cta).toBeInTheDocument()
})
