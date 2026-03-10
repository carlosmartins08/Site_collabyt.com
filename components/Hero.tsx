import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onCtaClick: () => void;
  scrollToProjects: () => void;
  projectsHref: string;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, scrollToProjects, projectsHref }) => {
  const { t } = useLanguage();

  return (
    <section
      className="relative w-full min-h-screen bg-brandBlack overflow-hidden flex flex-col justify-center pt-24 pb-12"
      aria-label="Introdução Collaby.t"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] bg-grid"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brandBlack via-transparent to-brandBlack"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brandBlack via-transparent to-brandBlack"></div>
      </div>

      <div className="absolute top-1/4 left-10 w-64 h-64 bg-brandOrange/10 rounded-full blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-brandAmber/5 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandGray border border-white/10 text-brandAmber text-sm font-semibold mb-8 backdrop-blur-md shadow-lg"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brandAmber"></span>
          </span>
          {t('hero.badge') as string}
        </motion.div>

        <header>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] mb-8"
          >
            {t('hero.titlePre') as string} <br />
            <span className="relative inline-block mt-2 px-6 py-2">
              <span className="relative z-10 text-white">{t('hero.titlePost') as string}</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-0 bg-brandOrange rounded-lg -rotate-1 shadow-[0_0_30px_rgba(255,90,31,0.4)]"
              ></motion.span>
            </span>
          </motion.h1>
        </header>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-4 max-w-2xl mx-auto text-xl md:text-2xl text-slate-400 mb-12 font-light leading-relaxed"
        >
          {t('hero.subtitle') as string}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <button
            onClick={onCtaClick}
            aria-label="Solicitar um diagnóstico gratuito do seu projeto"
            className="group bg-brandOrange hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_20px_rgba(255,90,31,0.3)] hover:shadow-[0_0_30px_rgba(255,90,31,0.5)] hover:scale-105 flex items-center gap-2"
          >
            {t('hero.cta_diagnosis') as string}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <Link
            to={projectsHref}
            onClick={() => scrollToProjects()}
            aria-label="Ver nosso portfólio de soluções"
            className="group flex items-center gap-3 px-8 py-4 rounded-full text-white border border-slate-700 hover:border-white hover:bg-white/5 transition-all"
          >
            <PlayCircle className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
            <span className="font-medium">{t('hero.cta_portfolio') as string}</span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em]">
          {t('hero.explore') as string}
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-slate-800/0 via-slate-700 to-slate-800/0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-brandOrange animate-token-drop"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

