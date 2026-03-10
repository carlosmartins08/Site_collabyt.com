import type { TeamMember } from './types';

export const DEFAULT_SITE_URL = 'https://collabyt.com';

const rawSiteUrl = (import.meta.env.VITE_SITE_URL ||
  import.meta.env.SITE_URL ||
  DEFAULT_SITE_URL) as string;

export const SITE_URL = rawSiteUrl.replace(/\/$/, '');

export const SUPPORTED_LOCALES = ['pt-br', 'en'] as const;
export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SiteLocale = 'pt-br';

export type AppLanguage = 'pt' | 'en';
export type HtmlLang = 'pt-BR' | 'en';

export const SECTION_SLUGS = [
  'home',
  'solutions',
  'methodology',
  'projects',
  'about',
  'tech',
  'faq',
] as const;

export type SectionSlug = (typeof SECTION_SLUGS)[number];

export function isSupportedLocale(value?: string): value is SiteLocale {
  if (!value) return false;
  return SUPPORTED_LOCALES.includes(value as SiteLocale);
}

export function normalizeLocale(value?: string): SiteLocale {
  if (!value) return DEFAULT_LOCALE;
  const normalized = value.toLowerCase();
  return isSupportedLocale(normalized) ? normalized : DEFAULT_LOCALE;
}

export function localeToAppLanguage(locale: SiteLocale): AppLanguage {
  return locale === 'pt-br' ? 'pt' : 'en';
}

export function localeToHtmlLang(locale: SiteLocale): HtmlLang {
  return locale === 'pt-br' ? 'pt-BR' : 'en';
}

export function buildSectionPath(locale: SiteLocale, section: SectionSlug): string {
  return section === 'home' ? `/${locale}` : `/${locale}/${section}`;
}

export function buildProjectPath(locale: SiteLocale, id: string | number): string {
  return `/${locale}/projects/${id}`;
}

export function buildStartupsPath(locale: SiteLocale): string {
  return `/${locale}/startups`;
}

export function buildIndustriesPath(locale: SiteLocale): string {
  return `/${locale}/industries`;
}

export function buildRetailPath(locale: SiteLocale): string {
  return `/${locale}/retail`;
}

export function buildHealthcarePath(locale: SiteLocale): string {
  return `/${locale}/healthcare`;
}

export function buildTechLabPath(locale: SiteLocale): string {
  return `/${locale}/tech-lab`;
}

export function buildLegalPath(
  locale: SiteLocale,
  kind: 'privacy-policy' | 'terms' | 'contact' | 'about/team'
): string {
  return `/${locale}/${kind}`;
}

export function canonicalFromPath(pathname: string): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function stripLocalePrefix(pathname: string): string {
  const cleaned = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const parts = cleaned.split('/').filter(Boolean);
  if (parts.length === 0) return '/';

  const maybeLocale = parts[0]?.toLowerCase();
  if (!isSupportedLocale(maybeLocale)) return cleaned;

  const rest = parts.slice(1);
  return rest.length ? `/${rest.join('/')}` : '/';
}

export function buildAlternateLinks(pathname: string): Array<{ hrefLang: string; href: string }> {
  const suffix = stripLocalePrefix(pathname);
  const normalizedSuffix = suffix === '/' ? '' : suffix;
  return [
    { hrefLang: 'pt-BR', href: canonicalFromPath(`/pt-br${normalizedSuffix}`) },
    { hrefLang: 'en', href: canonicalFromPath(`/en${normalizedSuffix}`) },
    { hrefLang: 'x-default', href: canonicalFromPath(`/pt-br${normalizedSuffix}`) },
  ];
}

export const SOCIAL_LINKS = {
  linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN_URL || 'https://www.linkedin.com/company/collabyt/',
  instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM_URL || 'https://www.instagram.com/collabyt/',
  github: import.meta.env.VITE_SOCIAL_GITHUB_URL || 'https://github.com/collabyt',
  googleReviews:
    import.meta.env.VITE_GOOGLE_REVIEWS_URL ||
    'https://www.google.com/search?q=collaby.t+innovation+studio',
};

export function isValidLinkedInProfileUrl(url?: string): boolean {
  if (!url) {
    return false;
  }

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    const isHttps = parsed.protocol === 'https:';
    const isLinkedInDomain = hostname === 'linkedin.com' || hostname === 'www.linkedin.com';
    const isProfilePath = /^\/in\/[a-z0-9\-._~%]+\/?$/i.test(parsed.pathname);

    return isHttps && isLinkedInDomain && isProfilePath;
  } catch {
    return false;
  }
}

// Replace these URLs with the official profile links for each team member.
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Alexandre Viana',
    role: 'CEO & Strategy Lead',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    linkedinUrl: 'https://www.linkedin.com/in/alexandre-viana/',
    skills: ['Venture Building', 'Tech Strategy', 'Leadership'],
    quote: 'Inovacao sem execucao e apenas alucinacao.',
    iconKey: 'rocket',
  },
  {
    name: 'Sofia Martins',
    role: 'CTO & AI Architect',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    linkedinUrl: 'https://www.linkedin.com/in/sofia-martins/',
    skills: ['System Architecture', 'LLMs', 'Cloud Native'],
    quote: 'Codigo e a forma de ensinar maquinas a sonhar.',
    iconKey: 'cpu',
  },
  {
    name: 'Lucas Ferreira',
    role: 'Head of Product & Design',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    linkedinUrl: 'https://www.linkedin.com/in/lucas-ferreira/',
    skills: ['UX/UI', 'Product Discovery', 'Design Systems'],
    quote: 'Design nao e apenas o que se ve, e como funciona.',
    iconKey: 'palette',
  },
  {
    name: 'Beatriz Silva',
    role: 'Tech Lead & DevOps',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    linkedinUrl: 'https://www.linkedin.com/in/beatriz-silva/',
    skills: ['Fullstack', 'CI/CD', 'Scalability'],
    quote: 'Se nao e escalavel, nao esta pronto para o mundo.',
    iconKey: 'terminal',
  },
];
