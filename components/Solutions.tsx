import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Factory, ShoppingBag, Lightbulb, CheckCircle, ArrowRight, Activity } from 'lucide-react';
import { SolutionTab } from '../types';
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';
import { useLanguage } from '../LanguageContext';

interface SolutionsProps {
  onContactClick?: () => void;
  startupsHref?: string;
  industriesHref?: string;
  retailHref?: string;
}

// Reusing Counter Logic locally for Solutions to ensure it works smoothly inside dynamic tabs
const TabCounter = ({ value, prefix = "", suffix = "" }: { value: number | string, prefix?: string, suffix?: string }) => {
    let numericValue = 0;
    let isCountable = false;

    if (typeof value === 'string') {
        const match = value.match(/(\d+)/);
        if (match) {
            numericValue = parseInt(match[0]);
            isCountable = true;
        }
    }

    if (!isCountable) return <span>{value}</span>;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const springValue = useSpring(0, { duration: 2000 });
    const displayValue = useTransform(springValue, (current) => Math.round(current));

    useEffect(() => {
        if (isInView) {
            springValue.set(numericValue);
        }
    }, [isInView, numericValue, springValue]);

    return (
        <span ref={ref} className="flex">
            {prefix}
            <motion.span>{displayValue}</motion.span>
            {suffix}
        </span>
    );
};

const Solutions: React.FC<SolutionsProps> = ({
  onContactClick,
  startupsHref,
  industriesHref,
  retailHref,
}) => {
  const { t, language } = useLanguage();
  const startupsCtaLabel =
    language === 'pt' ? 'Ver pagina completa para startups' : 'View the full startups page';
  const industriesCtaLabel =
    language === 'pt' ? 'Ver pagina completa para industrias' : 'View the full industries page';
  const retailCtaLabel =
    language === 'pt' ? 'Ver pagina completa para varejo' : 'View the full retail page';
  
  const solutions: SolutionTab[] = [
    {
      id: 'startups',
      label: t('solutions.tabs.startups'),
      icon: <Rocket className="w-5 h-5" />,
      title: t('solutions.items.startups.title'),
      description: t('solutions.items.startups.description'),
      benefits: t('solutions.items.startups.benefits'),
      caseStudy: {
        title: t('solutions.items.startups.caseTitle'),
        stat: '90 ' + (t('nav.diagnosis').includes('Diagnóstico') ? 'dias' : 'days'), // Simple heuristic or use explicit translation
        description: t('solutions.items.startups.caseDesc'),
      }
    },
    {
      id: 'industries',
      label: t('solutions.tabs.industries'),
      icon: <Factory className="w-5 h-5" />,
      title: t('solutions.items.industries.title'),
      description: t('solutions.items.industries.description'),
      benefits: t('solutions.items.industries.benefits'),
      caseStudy: {
        title: t('solutions.items.industries.caseTitle'),
        stat: '-25%',
        description: t('solutions.items.industries.caseDesc'),
      }
    },
    {
      id: 'retail',
      label: t('solutions.tabs.retail'),
      icon: <ShoppingBag className="w-5 h-5" />,
      title: t('solutions.items.retail.title'),
      description: t('solutions.items.retail.description'),
      benefits: t('solutions.items.retail.benefits'),
      caseStudy: {
        title: t('solutions.items.retail.caseTitle'),
        stat: '+30%',
        description: t('solutions.items.retail.caseDesc'),
      }
    },
    {
      id: 'niche',
      label: t('solutions.tabs.niche'),
      icon: <Lightbulb className="w-5 h-5" />,
      title: t('solutions.items.niche.title'),
      description: t('solutions.items.niche.description'),
      benefits: t('solutions.items.niche.benefits'),
      caseStudy: {
        title: t('solutions.items.niche.caseTitle'),
        stat: '5000+',
        description: t('solutions.items.niche.caseDesc'),
      }
    }
  ];

  const [activeTab, setActiveTab] = useState<string>(solutions[0].id);
  const activeSolution = solutions.find(s => s.id === activeTab) || solutions[0];

  const renderStat = (stat: string) => {
      // Helper to format stat string for animation
      if (stat.includes('dias') || stat.includes('days')) return <TabCounter value={stat} suffix={stat.includes('dias') ? ' dias' : ' days'} />;
      if (stat.includes('%')) {
          const prefix = stat.includes('-') ? '-' : '+';
          return <TabCounter value={stat} prefix={prefix} suffix="%" />;
      }
      if (stat.includes('+')) return <TabCounter value={stat} suffix="+" />;
      return stat;
  }

  return (
    <section className="py-32 bg-brandBlack" aria-labelledby="solutions-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 id="solutions-heading" className="text-3xl md:text-4xl font-bold text-white">{t('solutions.title')}</h2>
            <p className="mt-4 text-slate-400 text-lg">{t('solutions.subtitle')}</p>
          </Reveal>
        </div>

        {/* Tabs Navigation with Fluid Background */}
        <div className="flex flex-wrap justify-center gap-2 mb-16" role="tablist" aria-label="Tipos de soluções">
          <div className="bg-brandGray p-1.5 rounded-full inline-flex flex-wrap justify-center border border-white/5">
            {solutions.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm md:text-base transition-colors duration-200 z-10 ${
                  activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brandOrange rounded-full -z-10 shadow-lg shadow-brandOrange/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Column: Text & Benefits */}
              <article>
                <h3 className="text-4xl font-bold text-white mb-6">{activeSolution.title}</h3>
                <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                  {activeSolution.description}
                </p>
                
                <ul className="space-y-5 mb-10">
                  {activeSolution.benefits.map((benefit, idx) => (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-brandOrange flex-shrink-0" />
                      <span className="text-slate-300 font-medium text-lg">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <button 
                  onClick={onContactClick}
                  className="group flex items-center gap-3 text-brandOrange font-bold text-lg transition-all duration-300"
                >
                  <span className="relative py-1">
                    <span className="relative z-10 group-hover:text-orange-300 transition-colors duration-300">{t('solutions.cta')}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brandOrange/30 group-hover:bg-brandOrange group-hover:shadow-[0_0_15px_rgba(255,90,31,0.8)] transition-all duration-300"></span>
                  </span>
                  <span className="w-8 h-8 rounded-full bg-transparent group-hover:bg-brandOrange/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-transparent group-hover:border-brandOrange/30 shadow-sm group-hover:shadow-[0_0_15px_rgba(255,90,31,0.2)]">
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </button>

                {activeTab === 'startups' && startupsHref ? (
                  <Link
                    to={startupsHref}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {startupsCtaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : null}
                {activeTab === 'industries' && industriesHref ? (
                  <Link
                    to={industriesHref}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {industriesCtaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : null}
                {activeTab === 'retail' && retailHref ? (
                  <Link
                    to={retailHref}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {retailCtaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : null}
              </article>

              {/* Right Column: Case Study Card */}
              <aside className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-brandOrange to-brandAmber rounded-[2.5rem] transform rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500 blur-xl"></div>
                <div className="bg-brandGray p-10 rounded-[2.5rem] shadow-2xl relative z-10 border border-white/5 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-brandAmber uppercase tracking-wider mb-2 border border-white/5">{t('solutions.caseLabel')}</span>
                      <h4 className="text-2xl font-bold text-white">{activeSolution.caseStudy.title}</h4>
                    </div>
                    <div className="bg-brandOrange/10 p-4 rounded-2xl">
                      <Activity className="w-8 h-8 text-brandOrange" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                     <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brandOrange to-brandAmber tracking-tight flex items-center">
                       {renderStat(activeSolution.caseStudy.stat)}
                     </span>
                  </div>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">
                    {activeSolution.caseStudy.description}
                  </p>

                  <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4">
                     <div className="flex -space-x-3">
                        <img className="w-10 h-10 rounded-full border-2 border-brandGray shadow-sm grayscale opacity-70" src="https://picsum.photos/id/1005/100/100" alt="Membro da equipe" loading="lazy" decoding="async" width="40" height="40" />
                        <img className="w-10 h-10 rounded-full border-2 border-brandGray shadow-sm grayscale opacity-70" src="https://picsum.photos/id/1011/100/100" alt="Membro da equipe" loading="lazy" decoding="async" width="40" height="40" />
                        <img className="w-10 h-10 rounded-full border-2 border-brandGray shadow-sm grayscale opacity-70" src="https://picsum.photos/id/1027/100/100" alt="Membro da equipe" loading="lazy" decoding="async" width="40" height="40" />
                     </div>
                     <span className="text-sm font-semibold text-slate-500">{t('solutions.squad')}</span>
                  </div>
                </div>
              </aside>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
