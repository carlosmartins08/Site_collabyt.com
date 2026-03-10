import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Linkedin, Instagram, Github, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import {
  SiteLocale,
  SOCIAL_LINKS,
  buildLegalPath,
  buildSectionPath,
  buildHealthcarePath,
} from '../siteConfig';

type SiteFooterProps = {
  locale: SiteLocale;
  contactPath: string;
};

const SiteFooter: React.FC<SiteFooterProps> = ({ locale, contactPath }) => {
  const { t } = useLanguage();
  const healthcarePath = buildHealthcarePath(locale);

  return (
    <footer className="bg-black text-slate-400 py-20 border-t border-white/10 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(255, 90, 31, 0.15) 0%, transparent 60%), radial-gradient(circle at top left, rgba(255, 184, 74, 0.1) 0%, transparent 50%)',
          backgroundSize: '150% 150%',
        }}
      />
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-grid-pattern"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden select-none pointer-events-none opacity-[0.03]">
        <span className="text-[18vw] font-black text-white whitespace-nowrap leading-none tracking-tighter">
          COLLABY.T
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 space-y-8">
            <Link to={buildSectionPath(locale, 'home')} className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 bg-brandOrange rounded-xl flex items-center justify-center shadow-lg shadow-brandOrange/20 group-hover:scale-110 transition-transform duration-300">
                <Activity className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-3xl text-white tracking-tight">
                Collaby<span className="text-brandOrange">.t</span>
              </span>
            </Link>
            <p className="text-base leading-relaxed text-slate-500 max-w-sm">
              {t('footer.tagline') as string}
            </p>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brandGray border border-white/5 flex items-center justify-center text-slate-400 hover:bg-brandOrange hover:text-white hover:border-brandOrange transition-all duration-300 hover:-translate-y-1"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brandGray border border-white/5 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-300 hover:-translate-y-1"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brandGray border border-white/5 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover:-translate-y-1"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pt-2">
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">
                {t('footer.cols.solutions') as string}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to={buildSectionPath(locale, 'solutions')}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {t('solutions.tabs.startups') as string}
                  </Link>
                </li>
                <li>
                  <Link
                    to={buildSectionPath(locale, 'solutions')}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {t('solutions.tabs.industries') as string}
                  </Link>
                </li>
                <li>
                  <Link
                    to={buildSectionPath(locale, 'solutions')}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {t('solutions.tabs.retail') as string}
                  </Link>
                </li>
                <li>
                  <Link
                    to={healthcarePath}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {locale === 'pt-br' ? 'Hospitais e Consultórios' : 'Healthcare'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={buildSectionPath(locale, 'tech')}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {t('nav.tech') as string}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">
                {t('footer.cols.institutional') as string}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to={buildSectionPath(locale, 'about')}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {t('nav.about') as string}
                  </Link>
                </li>
                <li>
                  <Link
                    to={buildSectionPath(locale, 'methodology')}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {t('nav.methodology') as string}
                  </Link>
                </li>
                <li>
                  <Link
                    to={buildSectionPath(locale, 'projects')}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {t('nav.projects') as string}
                  </Link>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left flex items-center gap-2"
                  >
                    {t('footer.links.careers') as string}{' '}
                    <span className="text-[10px] bg-brandOrange/20 text-brandOrange px-2 py-0.5 rounded-full">
                      Hiring
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">
                {t('footer.cols.legal') as string}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to={buildLegalPath(locale, 'privacy-policy')}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {t('footer.links.privacy') as string}
                  </Link>
                </li>
                <li>
                  <Link
                    to={buildLegalPath(locale, 'terms')}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {t('footer.links.terms') as string}
                  </Link>
                </li>
                <li>
                  <Link
                    to={contactPath}
                    className="hover:text-brandOrange hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {locale === 'pt-br' ? 'Contato' : 'Contact'}
                  </Link>
                </li>
                <li className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={16} className="text-brandOrange shrink-0" />
                    <a
                      href="mailto:contato@collabyt.com.br"
                      className="hover:text-white transition-colors text-sm break-all"
                    >
                      contato@collabyt.com.br
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-brandOrange mt-1 shrink-0" />
                    <span className="text-sm leading-snug">
                      João Pessoa, PB <br />
                      <span className="text-xs text-slate-500">R Cassimiro de Abreu, 56</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <p>
            © {new Date().getFullYear()} Collaby.t Innovation Studio.{' '}
            {t('footer.rights') as string}
          </p>
          <p className="flex items-center gap-1">{t('footer.made') as string}</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

