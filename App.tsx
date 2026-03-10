import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Solutions from './components/Solutions';
import Methodology from './components/Methodology';
import Results from './components/Results';
import About from './components/About';
import TechTrends from './components/TechTrends';
import ProjectCatalog from './components/ProjectCatalog';
import ContactModal from './components/ContactModal';
import FloatingNav from './components/FloatingNav';
import LegalModals from './components/LegalModals';
import CookieConsent from './components/CookieConsent';
import FAQ from './components/FAQ';
import Preloader from './components/Preloader';
import Meta from './components/Meta';
import SiteFooter from './components/SiteFooter';
import { Reveal } from './components/Reveal';
import { useLanguage } from './LanguageContext';
import {
  SectionSlug,
  SiteLocale,
  SOCIAL_LINKS,
  SITE_URL,
  buildIndustriesPath,
  buildRetailPath,
  buildStartupsPath,
  buildTechLabPath,
  buildHealthcarePath,
  buildAlternateLinks,
  buildLegalPath,
  buildSectionPath,
  canonicalFromPath,
  localeToAppLanguage,
  localeToHtmlLang,
} from './siteConfig';

const AIConsultant = lazy(() => import('./components/AIConsultant'));

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return <div ref={cursorRef} className={`custom-cursor ${isHovering ? 'hovered' : ''}`} />;
};

type AppProps = {
  locale: SiteLocale;
  initialSection: SectionSlug;
  currentPath: string;
  anchorId?: string;
};

const App: React.FC<AppProps> = ({ locale, initialSection, currentPath, anchorId }) => {
  const [loading, setLoading] = useState(() => {
    try {
      if (typeof window === 'undefined') return true;
      const seen = window.sessionStorage.getItem('collabyt_preloader_seen');
      return seen !== '1' && initialSection === 'home';
    } catch {
      return initialSection === 'home';
    }
  });
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [activeSection, setActiveSection] = useState<SectionSlug>(initialSection);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { t, setLanguage } = useLanguage();
  const htmlLang = localeToHtmlLang(locale);

  useEffect(() => {
    setLanguage(localeToAppLanguage(locale));
  }, [locale, setLanguage]);

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const sectionMeta: Record<
    SectionSlug,
    { title?: string; description?: string; url?: string; image?: string }
  > = {
    home: {
      title: (t('meta.home.title') as string) || 'Collaby.t | Innovation Studio - Inove com IA & MVPs',
      description:
        (t('meta.home.description') as string) ||
        'Estúdio de inovação especializado em MVPs e IA generativa — transformamos ideias em produtos escaláveis.',
      url: canonicalFromPath(buildSectionPath(locale, 'home')),
      image: `${SITE_URL}/og-image.jpg`,
    },
    solutions: {
      title: (t('meta.solutions.title') as string) || 'Soluções — Collaby.t',
      description:
        (t('meta.solutions.description') as string) ||
        'Soluções para indústrias, startups e varejo com IA e tecnologia de ponta.',
      url: canonicalFromPath(buildSectionPath(locale, 'solutions')),
      image: `${SITE_URL}/og-image.jpg`,
    },
    methodology: {
      title: (t('meta.methodology.title') as string) || 'Metodologia â€” Collaby.t',
      description:
        (t('meta.methodology.description') as string) ||
        'Nossa abordagem de discovery, prototipagem e entrega contínua para reduzir riscos e acelerar resultados.',
      url: canonicalFromPath(buildSectionPath(locale, 'methodology')),
      image: `${SITE_URL}/og-image.jpg`,
    },
    projects: {
      title: (t('meta.projects.title') as string) || 'Projetos â€” Collaby.t',
      description:
        (t('meta.projects.description') as string) ||
        'Portfólio de MVPs e soluções desenvolvidas com foco em impacto e escalabilidade.',
      url: canonicalFromPath(buildSectionPath(locale, 'projects')),
      image: `${SITE_URL}/og-image.jpg`,
    },
    about: {
      title: (t('meta.about.title') as string) || 'Sobre â€” Collaby.t',
      description:
        (t('meta.about.description') as string) ||
        'Conheça nossa equipe, missão e experiência em construir produtos digitais.',
      url: canonicalFromPath(buildSectionPath(locale, 'about')),
      image: `${SITE_URL}/og-image.jpg`,
    },
    tech: {
      title: (t('meta.tech.title') as string) || 'Tech â€” Collaby.t',
      description:
        (t('meta.tech.description') as string) ||
        'Tendências tecnológicas e aplicações de IA generativa para produtos digitais.',
      url: canonicalFromPath(buildSectionPath(locale, 'tech')),
      image: `${SITE_URL}/og-image.jpg`,
    },
    faq: {
      title: locale === 'pt-br' ? 'Perguntas Frequentes â€” Collaby.t' : 'FAQ â€” Collaby.t',
      description:
        locale === 'pt-br'
          ? 'Perguntas frequentes sobre desenvolvimento de MVP, IA aplicada e contratação da Collaby.t.'
          : 'Frequently asked questions about MVP development, applied AI and hiring Collaby.t.',
      url: canonicalFromPath(buildSectionPath(locale, 'faq')),
      image: `${SITE_URL}/og-image.jpg`,
    },
  };

  const canonical = canonicalFromPath(currentPath || buildSectionPath(locale, activeSection));
  const alternates = buildAlternateLinks(currentPath || buildSectionPath(locale, activeSection));

  const faqItems = t('faq.items') as Array<{ q: string; a: string }>;

  const structuredData = useMemo(() => {
    const baseSchemas: Array<Record<string, unknown>> = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Collaby.t Innovation Studio',
        alternateName: 'Collaby.t',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og-image.jpg`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Rua Cassimiro de Abreu, 56, Sala 05',
          addressLocality: 'João Pessoa',
          addressRegion: 'PB',
          postalCode: '58033-330',
          addressCountry: 'BR',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'contato@collabyt.com.br',
          contactType: 'sales',
          areaServed: ['BR', 'US', 'PT'],
          availableLanguage: ['Portuguese', 'English'],
        },
        sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.instagram, SOCIAL_LINKS.github],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Collaby.t',
        url: SITE_URL,
        inLanguage: htmlLang,
      },
    ];

    if (activeSection === 'faq' && Array.isArray(faqItems)) {
      baseSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      });
    }

    if (activeSection === 'solutions') {
      baseSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: locale === 'pt-br' ? 'Desenvolvimento de MVP e IA aplicada' : 'MVP and applied AI development',
        provider: {
          '@type': 'Organization',
          name: 'Collaby.t',
          url: SITE_URL,
        },
        areaServed: ['BR', 'US', 'PT'],
      });
    }

    return baseSchemas;
  }, [activeSection, faqItems, htmlLang, locale]);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollPercent(Math.round(latest * 100));
  });

  const scrollToSection = (id: string, behavior: ScrollBehavior = 'smooth') => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.scrollY + window.innerHeight * 0.35;
      const sections: SectionSlug[] = [
        'home',
        'solutions',
        'methodology',
        'projects',
        'about',
        'tech',
        'faq',
      ];

      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;
        if (triggerPoint >= top && triggerPoint < bottom) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (!loading) {
      handleScroll();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    if (anchorId) {
      const anchorElement = document.getElementById(anchorId);
      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }

    if (initialSection !== 'home') {
      scrollToSection(initialSection, 'auto');
    }
  }, [anchorId, initialSection, loading]);

  const openContact = () => setIsContactModalOpen(true);
  const closeContact = () => setIsContactModalOpen(false);
  const contactPath = buildLegalPath(locale, 'contact');
  const startupsPath = buildStartupsPath(locale);
  const industriesPath = buildIndustriesPath(locale);
  const retailPath = buildRetailPath(locale);
  const techLabPath = buildTechLabPath(locale);
  const healthcarePath = buildHealthcarePath(locale);

  const handlePreloaderComplete = () => {
    setLoading(false);
    try {
      window.sessionStorage.setItem('collabyt_preloader_seen', '1');
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-300 bg-brandBlack selection:bg-brandOrange selection:text-white">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.99, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.8 },
            }}
            className="flex-grow w-full flex flex-col"
          >
            <Meta
              title={sectionMeta[activeSection]?.title}
              description={sectionMeta[activeSection]?.description}
              url={canonical}
              canonical={canonical}
              image={sectionMeta[activeSection]?.image}
              lang={htmlLang}
              alternates={alternates}
              structuredData={structuredData}
            />

            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-brandOrange origin-left z-[100] shadow-[0_0_15px_rgba(255,90,31,0.5)]"
              style={{ scaleX }}
            />

            <FloatingNav
              locale={locale}
              contactPath={contactPath}
              scrollToSection={scrollToSection}
              activeSection={activeSection}
              scrollPercent={scrollPercent}
            />

            <main className="flex-grow w-full">
              <div id="home">
                <Hero
                  onCtaClick={openContact}
                  scrollToProjects={() => scrollToSection('projects')}
                  projectsHref={buildSectionPath(locale, 'projects')}
                />
              </div>

              <PainPoints />

              <div id="solutions">
                <Solutions
                  onContactClick={openContact}
                  startupsHref={startupsPath}
                  industriesHref={industriesPath}
                  retailHref={retailPath}
                  techHref={techLabPath}
                  healthcareHref={healthcarePath}
                />
              </div>

              <div id="methodology">
                <Methodology />
              </div>

              <div id="projects">
                <ProjectCatalog locale={locale} />
              </div>

              <Results />

              <div id="about">
                <About />
              </div>

              <div id="tech">
                <TechTrends onContactClick={openContact} />
              </div>

              <div id="faq">
                <FAQ />
              </div>

              <section className="bg-brandBlack py-28 px-4 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/1920/1080?grayscale')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/80 to-transparent"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                  <Reveal width="100%">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight whitespace-pre-line">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: (t('cta_section.title') as string).replace('\n', '<br/>'),
                        }}
                      />
                    </h2>
                  </Reveal>

                  <Reveal width="100%" delay={0.4}>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                      {t('cta_section.text') as string}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <Link
                        to={contactPath}
                        className="bg-brandOrange hover:bg-orange-600 text-white px-10 py-5 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-xl shadow-brandOrange/20"
                      >
                        {t('cta_section.btn_primary') as string}
                      </Link>
                      <Link
                        to={contactPath}
                        className="bg-transparent border border-slate-700 hover:border-white text-white px-10 py-5 rounded-full text-lg font-medium transition-colors hover:bg-white/5"
                      >
                        {t('cta_section.btn_secondary') as string}
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </section>
            </main>
            <SiteFooter locale={locale} contactPath={contactPath} />

            <ContactModal
              isOpen={isContactModalOpen}
              onClose={closeContact}
              onOpenPrivacy={() => setActiveLegalModal('privacy')}
              locale={locale}
            />
            <LegalModals activeModal={activeLegalModal} onClose={() => setActiveLegalModal(null)} />
            <CookieConsent
              policyUrl={buildLegalPath(locale, 'privacy-policy')}
              onOpenPolicy={() => setActiveLegalModal('privacy')}
            />
            <Suspense fallback={null}>
              <AIConsultant />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;


