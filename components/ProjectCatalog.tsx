
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, Code, TrendingUp, ExternalLink } from 'lucide-react';
import { Reveal } from './Reveal';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { SiteLocale, buildProjectPath } from '../siteConfig';

interface Project {
  id: number;
  title: string;
  category: string;
  status: string;
  image: string;
  description: string;
  stack: string[];
  impact: string;
  link: string;
}

type ProjectCatalogProps = {
  locale: SiteLocale;
};

const ProjectCatalog: React.FC<ProjectCatalogProps> = ({ locale }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'building' | 'scaling'>('all');

  // Recupera os itens de projeto das traduções
  const projects = t('projects.items') as Project[];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.status === activeFilter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'live': return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
      case 'building': return 'bg-brandAmber shadow-[0_0_10px_rgba(255,184,74,0.5)]';
      case 'scaling': return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
      default: return 'bg-slate-500';
    }
  };

  const getStatusLabel = (status: string) => {
     switch(status) {
        case 'live': return t('projects.filters.live');
        case 'building': return t('projects.filters.building');
        case 'scaling': return t('projects.filters.scaling');
        default: return status;
     }
  };

  return (
    <section className="py-32 bg-brandBlack relative border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <Reveal width="100%">
             <div className="flex items-center gap-3 mb-4">
                <Layers className="text-brandOrange w-5 h-5" />
                <span className="text-brandOrange font-mono text-sm uppercase tracking-[0.2em] font-bold">Catalog</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t('projects.title')}</h2>
             <p className="text-slate-400 text-lg max-w-2xl">{t('projects.subtitle')}</p>
          </Reveal>

          <Reveal delay={0.2} width="100%">
            <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 w-fit">
              {(['all', 'live', 'scaling', 'building'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter 
                      ? 'bg-brandOrange text-white shadow-lg shadow-brandOrange/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(`projects.filters.${filter}`)}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/10 bg-[#0F0F0F] flex flex-col"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                   <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 grayscale-[0.5] group-hover:grayscale-0" 
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/80 to-transparent"></div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-20">
                   <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusColor(project.status)}`}></div>
                   <span className="text-[10px] font-bold text-white uppercase tracking-wide">{getStatusLabel(project.status)}</span>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                   
                   <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-3 mb-2">
                         <span className="text-brandOrange font-mono text-[10px] uppercase tracking-widest font-bold">{project.category}</span>
                         <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                         <span className="text-slate-400 text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
                            <TrendingUp size={12} className="text-brandAmber" />
                            {project.impact}
                         </span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-brandOrange transition-colors">{project.title}</h3>
                      
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-md opacity-80 group-hover:opacity-100 transition-opacity">
                         {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-8">
                         {project.stack.map((tech, i) => (
                            <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded border border-white/5 text-[9px] text-slate-300 font-mono uppercase tracking-wider">
                               <Code size={10} className="text-brandOrange" />
                               {tech}
                            </span>
                         ))}
                      </div>

                      <div className="border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center justify-between">
                         <Link
                           to={buildProjectPath(locale, project.id)}
                           className="flex items-center gap-2 text-white font-bold hover:text-brandOrange transition-all group/btn text-sm"
                         >
                            {t('projects.view')}
                            <ExternalLink size={16} className="text-brandOrange group-hover/btn:translate-x-1 transition-transform" />
                         </Link>
                         
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <ArrowRight size={14} className="text-slate-500" />
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectCatalog;
