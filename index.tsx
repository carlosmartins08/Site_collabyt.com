import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ProjectDetail from './components/ProjectDetail';
import ContactPage from './components/ContactPage';
import LegalPage from './components/LegalPage';
import StartupsPage from './components/StartupsPage';
import IndustriesPage from './components/IndustriesPage';
import RetailPage from './components/RetailPage';
import HealthcarePage from './components/HealthcarePage';
import TechLabPage from './components/TechLabPage';
import { LanguageProvider } from './LanguageContext';
import {
  DEFAULT_LOCALE,
  SectionSlug,
  SiteLocale,
  buildIndustriesPath,
  buildHealthcarePath,
  buildRetailPath,
  buildStartupsPath,
  buildTechLabPath,
  buildLegalPath,
  buildSectionPath,
  isSupportedLocale,
  normalizeLocale,
} from './siteConfig';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const LandingRoute: React.FC<{ section: SectionSlug; anchorId?: string; fallbackPath?: string }> = ({
  section,
  anchorId,
  fallbackPath,
}) => {
  const { locale } = useParams();
  const location = useLocation();
  const normalizedLocale = normalizeLocale(locale);

  if (!isSupportedLocale(locale)) {
    return <Navigate to={fallbackPath || buildSectionPath(DEFAULT_LOCALE, section)} replace />;
  }

  return (
    <App
      locale={normalizedLocale}
      initialSection={section}
      anchorId={anchorId}
      currentPath={location.pathname}
    />
  );
};

const ProjectRoute: React.FC = () => {
  const { locale, id } = useParams();
  const normalizedLocale = normalizeLocale(locale);

  if (!isSupportedLocale(locale)) {
    return <Navigate to={buildProjectFallbackPath(DEFAULT_LOCALE, id)} replace />;
  }

  return <ProjectDetail locale={normalizedLocale} />;
};

const ContactRoute: React.FC = () => {
  const { locale } = useParams();
  const normalizedLocale = normalizeLocale(locale);

  if (!isSupportedLocale(locale)) {
    return <Navigate to={buildLegalPath(DEFAULT_LOCALE, 'contact')} replace />;
  }

  return <ContactPage locale={normalizedLocale} />;
};

const StartupsRoute: React.FC = () => {
  const { locale } = useParams();
  const normalizedLocale = normalizeLocale(locale);

  if (!isSupportedLocale(locale)) {
    return <Navigate to={buildStartupsPath(DEFAULT_LOCALE)} replace />;
  }

  return <StartupsPage locale={normalizedLocale} />;
};

const IndustriesRoute: React.FC = () => {
  const { locale } = useParams();
  const normalizedLocale = normalizeLocale(locale);

  if (!isSupportedLocale(locale)) {
    return <Navigate to={buildIndustriesPath(DEFAULT_LOCALE)} replace />;
  }

  return <IndustriesPage locale={normalizedLocale} />;
};

const RetailRoute: React.FC = () => {
  const { locale } = useParams();
  const normalizedLocale = normalizeLocale(locale);

  if (!isSupportedLocale(locale)) {
    return <Navigate to={buildRetailPath(DEFAULT_LOCALE)} replace />;
  }

  return <RetailPage locale={normalizedLocale} />;
};

const HealthcareRoute: React.FC = () => {
  const { locale } = useParams();
  const normalizedLocale = normalizeLocale(locale);

  if (!isSupportedLocale(locale)) {
    return <Navigate to={buildHealthcarePath(DEFAULT_LOCALE)} replace />;
  }

  return <HealthcarePage locale={normalizedLocale} />;
};

const TechLabRoute: React.FC = () => {
  const { locale } = useParams();
  const normalizedLocale = normalizeLocale(locale);

  if (!isSupportedLocale(locale)) {
    return <Navigate to={buildTechLabPath(DEFAULT_LOCALE)} replace />;
  }

  return <TechLabPage locale={normalizedLocale} />;
};

const LegalRoute: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { locale } = useParams();
  const normalizedLocale = normalizeLocale(locale);

  if (!isSupportedLocale(locale)) {
    return (
      <Navigate
        to={buildLegalPath(DEFAULT_LOCALE, type === 'privacy' ? 'privacy-policy' : 'terms')}
        replace
      />
    );
  }

  return <LegalPage locale={normalizedLocale} type={type} />;
};

const LegacyProjectRedirect: React.FC = () => {
  const { id } = useParams();
  return <Navigate to={`/${DEFAULT_LOCALE}/projects/${id || ''}`} replace />;
};

const LegacySectionRedirect: React.FC<{ section: SectionSlug }> = ({ section }) => (
  <Navigate to={buildSectionPath(DEFAULT_LOCALE, section)} replace />
);

const LegacySimpleRedirect: React.FC<{ to: string }> = ({ to }) => <Navigate to={to} replace />;

function buildProjectFallbackPath(locale: SiteLocale, id?: string): string {
  return `/${locale}/projects/${id || '1'}`;
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />

            <Route path="/projects/:id" element={<LegacyProjectRedirect />} />
            <Route path="/solutions" element={<LegacySectionRedirect section="solutions" />} />
            <Route path="/methodology" element={<LegacySectionRedirect section="methodology" />} />
            <Route path="/projects" element={<LegacySectionRedirect section="projects" />} />
            <Route path="/about" element={<LegacySectionRedirect section="about" />} />
            <Route path="/tech" element={<LegacySectionRedirect section="tech" />} />
            <Route path="/faq" element={<LegacySectionRedirect section="faq" />} />
            <Route path="/about/team" element={<LegacySimpleRedirect to={`/${DEFAULT_LOCALE}/about/team`} />} />
            <Route path="/startups" element={<LegacySimpleRedirect to={`/${DEFAULT_LOCALE}/startups`} />} />
            <Route path="/industries" element={<LegacySimpleRedirect to={`/${DEFAULT_LOCALE}/industries`} />} />
            <Route path="/retail" element={<LegacySimpleRedirect to={`/${DEFAULT_LOCALE}/retail`} />} />
            <Route path="/healthcare" element={<LegacySimpleRedirect to={`/${DEFAULT_LOCALE}/healthcare`} />} />
            <Route path="/tech-lab" element={<LegacySimpleRedirect to={`/${DEFAULT_LOCALE}/tech-lab`} />} />
            <Route path="/privacy-policy" element={<LegacySimpleRedirect to={`/${DEFAULT_LOCALE}/privacy-policy`} />} />
            <Route path="/terms" element={<LegacySimpleRedirect to={`/${DEFAULT_LOCALE}/terms`} />} />
            <Route path="/contact" element={<LegacySimpleRedirect to={`/${DEFAULT_LOCALE}/contact`} />} />

            <Route path="/:locale/projects/:id" element={<ProjectRoute />} />
            <Route path="/:locale/startups" element={<StartupsRoute />} />
            <Route path="/:locale/industries" element={<IndustriesRoute />} />
            <Route path="/:locale/retail" element={<RetailRoute />} />
            <Route path="/:locale/healthcare" element={<HealthcareRoute />} />
            <Route path="/:locale/tech-lab" element={<TechLabRoute />} />
            <Route path="/:locale/privacy-policy" element={<LegalRoute type="privacy" />} />
            <Route path="/:locale/terms" element={<LegalRoute type="terms" />} />
            <Route path="/:locale/contact" element={<ContactRoute />} />

            <Route
              path="/:locale/about/team"
              element={
                <LandingRoute
                  section="about"
                  anchorId="about-team"
                  fallbackPath={`/${DEFAULT_LOCALE}/about/team`}
                />
              }
            />
            <Route path="/:locale/solutions" element={<LandingRoute section="solutions" />} />
            <Route path="/:locale/methodology" element={<LandingRoute section="methodology" />} />
            <Route path="/:locale/projects" element={<LandingRoute section="projects" />} />
            <Route path="/:locale/about" element={<LandingRoute section="about" />} />
            <Route path="/:locale/tech" element={<LandingRoute section="tech" />} />
            <Route path="/:locale/faq" element={<LandingRoute section="faq" />} />
            <Route path="/:locale" element={<LandingRoute section="home" />} />

            <Route path="*" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
