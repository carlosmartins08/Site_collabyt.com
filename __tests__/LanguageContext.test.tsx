import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { expect, test } from 'vitest'
import { LanguageProvider, useLanguage } from '../LanguageContext'

const wrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <LanguageProvider>{children}</LanguageProvider>
)

test('LanguageContext provides default language and t()', () => {
  const { result } = renderHook(() => useLanguage(), { wrapper })

  expect(result.current.language).toBe('pt')
  const val = result.current.t('nav.home')
  expect(typeof val === 'string' || typeof val === 'object').toBeTruthy()

  act(() => {
    result.current.setLanguage('en')
  })

  expect(result.current.language).toBe('en')
})
