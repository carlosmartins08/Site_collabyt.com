import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  MessageSquare,
  Home,
  Layers,
  Cpu,
  Users,
  BookOpen,
  Menu,
  X,
  Globe,
  Briefcase,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import {
  SectionSlug,
  SiteLocale,
  buildSectionPath,
  localeToAppLanguage,
  stripLocalePrefix,
} from '../siteConfig';

interface FloatingNavProps {
  locale: SiteLocale;
  contactPath: string;
  scrollToSection: (id: string) => void;
  activeSection: SectionSlug;
  scrollPercent?: number;
}

const FloatingNav: React.FC<FloatingNavProps> = ({
  locale,
  contactPath,
  scrollToSection,
  activeSection,
  scrollPercent = 0,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 50 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems: Array<{ id: SectionSlug; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: t('nav.home') as string, icon: <Home size={18} /> },
    { id: 'solutions', label: t('nav.solutions') as string, icon: <Layers size={18} /> },
    { id: 'methodology', label: t('nav.methodology') as string, icon: <BookOpen size={18} /> },
    { id: 'projects', label: t('nav.projects') as string, icon: <Briefcase size={18} /> },
    { id: 'about', label: t('nav.about') as string, icon: <Users size={18} /> },
    { id: 'tech', label: t('nav.tech') as string, icon: <Cpu size={18} /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={18} /> },
  ];

  const toggleLanguage = () => {
    const targetLocale: SiteLocale = locale === 'pt-br' ? 'en' : 'pt-br';
    const suffix = stripLocalePrefix(location.pathname);
    const normalizedSuffix = suffix === '/' ? '' : suffix;
    setLanguage(localeToAppLanguage(targetLocale));
    navigate(`/${targetLocale}${normalizedSuffix}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <>
      <div className="fixed top-6 left-0 w-full z-50 flex flex-col items-center pointer-events-none px-4">
        <motion.nav
          className={`pointer-events-auto bg-brandGray/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 transition-all duration-500 ease-out flex items-center justify-between relative z-50 ${
            isScrolled
              ? 'rounded-full py-2 px-3 gap-2'
              : 'rounded-2xl py-3 px-4 md:py-4 md:px-8 w-full max-w-5xl'
          }`}
          layout
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to={buildSectionPath(locale, 'home')} className="flex items-center gap-2 mr-2 md:mr-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-brandOrange rounded-lg flex items-center justify-center shrink-0">
              <Activity className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            {!isScrolled || isHovered ? (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-lg md:text-xl text-white whitespace-nowrap hidden sm:block"
              >
                Collaby<span className="text-brandOrange">.t</span>
              </motion.span>
            ) : null}
          </Link>

          <div className="hidden md:flex items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  to={buildSectionPath(locale, item.id)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 rounded-full flex items-center gap-2 transition-all duration-300 group ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10">{item.icon}</span>
                  {!isScrolled || isHovered ? (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      className="text-sm font-medium whitespace-nowrap hidden lg:block"
                    >
                      {item.label}
                    </motion.span>
                  ) : null}

                  {isActive ? (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-brandOrange rounded-full shadow-lg shadow-brandOrange/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  ) : null}

                  <AnimatePresence>
                    {hoveredTab === item.id ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-brandGray border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none lg:hidden"
                      >
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-brandGray rotate-45 border-t border-l border-white/10"></div>
                        {item.label}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center justify-center px-2 py-1 bg-white/5 rounded-lg border border-white/5 font-mono text-[10px] text-slate-500 font-bold shrink-0">
              {scrollPercent}%
            </div>

            <button
              onClick={toggleLanguage}
              className="hidden md:flex p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors items-center gap-1 font-mono text-xs"
              title="Mudar idioma"
            >
              <Globe size={18} />
              <span className="uppercase">{language}</span>
            </button>

            <button
              className={`md:hidden p-2 rounded-full transition-colors relative z-50 ${
                isMobileMenuOpen
                  ? 'text-white bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <motion.div layout className="ml-1 md:ml-4">
              <Link
                to={contactPath}
                className={`bg-brandOrange hover:bg-orange-600 text-white font-semibold transition-all shadow-lg shadow-brandOrange/20 flex items-center gap-2 shrink-0 ${
                  isScrolled && !isHovered
                    ? 'p-2 rounded-full'
                    : 'px-4 py-2 md:px-5 md:py-2.5 rounded-full'
                }`}
              >
                <MessageSquare size={18} />
                {!isScrolled || isHovered ? (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    className="whitespace-nowrap hidden sm:block text-sm md:text-base"
                  >
                    {t('nav.contact') as string}
                  </motion.span>
                ) : null}
              </Link>
            </motion.div>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={containerVariants}
            className="fixed inset-0 z-[45] bg-brandBlack/95 backdrop-blur-xl md:hidden flex flex-col pt-32 px-6 pb-10 overflow-y-auto"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none -z-10"></div>

            <div className="flex flex-col gap-2 max-w-lg mx-auto w-full">
              <motion.span
                variants={itemVariants}
                className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-4"
              >
                Navegação
              </motion.span>

              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div key={item.id} variants={itemVariants}>
                    <Link
                      to={buildSectionPath(locale, item.id)}
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`group flex items-center justify-between p-4 rounded-2xl transition-all border ${
                        isActive
                          ? 'bg-brandOrange text-white border-brandOrange shadow-lg shadow-brandOrange/20'
                          : 'bg-brandGray text-slate-400 border-white/5 hover:bg-white/5 hover:text-white hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`${
                            isActive
                              ? 'text-white'
                              : 'text-slate-500 group-hover:text-brandOrange transition-colors'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="font-bold text-xl">{item.label}</span>
                      </div>
                      <ChevronRight
                        size={20}
                        className={`transform transition-transform ${
                          isActive
                            ? 'translate-x-0'
                            : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={itemVariants}>
                <Link
                  to={contactPath}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 flex items-center justify-between p-4 rounded-2xl bg-brandOrange text-white border border-brandOrange/60 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <MessageSquare size={18} />
                    <span className="font-medium">{t('nav.contact') as string}</span>
                  </div>
                  <ChevronRight size={20} />
                </Link>
              </motion.div>

              <motion.button
                variants={itemVariants}
                onClick={toggleLanguage}
                className="mt-6 flex items-center justify-between p-4 rounded-2xl bg-brandGray border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Globe size={18} />
                  <span className="font-medium">Idioma / Language</span>
                </div>
                <span className="uppercase font-bold text-brandOrange bg-brandOrange/10 px-2 py-1 rounded text-xs">
                  {language}
                </span>
              </motion.button>
            </div>

            <motion.div variants={itemVariants} className="mt-auto pt-8 text-center">
              <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Collaby.t Innovation</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;

