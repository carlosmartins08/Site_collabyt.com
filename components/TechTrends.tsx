import React from 'react';
import { Globe, Leaf, Brain, Cpu, Database, Zap, Shield, Code, Server } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';

interface TechTrendsProps {
  onContactClick?: () => void;
}

const TechTrends: React.FC<TechTrendsProps> = ({ onContactClick }) => {
  const { t } = useLanguage();

  const itemsData = t('tech.items') as Array<{title: string, desc: string, impact: string}>;

  // Map distinct icons for the specific items
  // Order based on translations: IA, Blockchain, IoT, Plataformas, Green Tech
  const getIcon = (index: number) => {
    switch(index) {
        case 0: return <Brain className="w-7 h-7" />; // IA
        case 1: return <Shield className="w-7 h-7" />; // Blockchain
        case 2: return <Cpu className="w-7 h-7" />; // IoT
        case 3: return <Server className="w-7 h-7" />; // Platforms
        case 4: return <Leaf className="w-7 h-7" />; // Green Tech
        default: return <Code className="w-7 h-7" />;
    }
  };

  const getColor = (index: number) => {
     const colors = [
        "text-purple-400 bg-purple-500/10 border-purple-500/20",
        "text-blue-400 bg-blue-500/10 border-blue-500/20",
        "text-brandOrange bg-orange-500/10 border-orange-500/20",
        "text-pink-400 bg-pink-500/10 border-pink-500/20",
        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
     ];
     return colors[index % colors.length];
  }
  
  const getGlow = (index: number) => {
     const colors = [
        "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover:border-purple-500/30",
        "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group-hover:border-blue-500/30",
        "group-hover:shadow-[0_0_30px_rgba(255,90,31,0.15)] group-hover:border-orange-500/30",
        "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] group-hover:border-pink-500/30",
        "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/30"
     ];
     return colors[index % colors.length];
  }

  return (
    <section className="py-32 bg-brandBlack relative overflow-hidden" aria-labelledby="tech-heading">
      
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a1a1a,transparent_70%)]"></div>
         <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-3xl">
             <Reveal>
               <div className="flex items-center gap-3 mb-6">
                  <div className="h-[2px] w-8 bg-brandOrange shadow-[0_0_10px_rgba(255,90,31,0.8)]"></div>
                  <span className="text-brandOrange font-mono text-sm uppercase tracking-[0.2em] font-bold">{t('tech.label')}</span>
               </div>
               <h2 id="tech-heading" className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                 {t('tech.title')}
               </h2>
               <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6">
                 {t('tech.subtitle')}
               </p>
             </Reveal>
          </div>
          <Reveal delay={0.2}>
             <button 
                onClick={onContactClick}
                className="hidden lg:inline-flex items-center gap-3 text-white border border-white/10 px-8 py-4 rounded-full hover:bg-white/5 hover:border-brandOrange hover:text-brandOrange transition-all duration-300 group backdrop-blur-md bg-white/[0.02]"
             >
                <span className="font-bold text-sm tracking-wide">{t('tech.cta')}</span>
                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
             </button>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.isArray(itemsData) && itemsData.map((trend, index) => (
            <Reveal key={index} delay={index * 0.1} width="100%">
              <motion.div 
                whileHover={{ y: -8 }}
                className={`h-full min-h-[320px] bg-[#0F0F0F] p-8 rounded-[2rem] border border-white/5 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between ${getGlow(index)}`}
              >
                {/* Hover Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className={`p-3.5 rounded-2xl border backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${getColor(index)}`}>
                            {getIcon(index)}
                        </div>
                        <span className="font-mono text-[10px] text-slate-600 border border-white/5 px-2 py-1 rounded bg-black/40">
                            v.0{index + 1}
                        </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                        {trend.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm font-light">
                        {trend.desc}
                    </p>
                </div>

                <div className="relative z-10 pt-8 mt-auto">
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase text-slate-500 font-bold tracking-widest mb-1.5 opacity-70">{t('tech.generate')}</span>
                            <span className="text-sm font-bold text-white flex items-center gap-2">
                                {trend.impact}
                                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${getColor(index).split(' ')[0].replace('text-', 'bg-')}`}></span>
                            </span>
                        </div>
                        <div className={`opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 ${getColor(index).split(' ')[0]}`}>
                            <Zap className="w-5 h-5" />
                        </div>
                    </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
          
           {/* CTA Card for Mobile/Last item fill to maintain grid balance */}
           <Reveal delay={0.6} width="100%">
               <motion.div 
                  onClick={onContactClick}
                  whileHover={{ scale: 0.98 }}
                  className="h-full min-h-[320px] flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed border-white/10 bg-transparent hover:bg-white/[0.02] hover:border-brandOrange/30 transition-all cursor-pointer group relative overflow-hidden"
               >
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,90,31,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   
                   <div className="relative z-10 flex flex-col items-center text-center">
                       <div className="w-16 h-16 rounded-full bg-brandOrange/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brandOrange group-hover:text-white transition-all duration-300 text-brandOrange border border-brandOrange/20 group-hover:border-brandOrange">
                           <Database className="w-7 h-7" />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-3">Tem um desafio técnico?</h3>
                       <p className="text-slate-500 text-sm mb-8 max-w-[200px] leading-relaxed">
                           Nossa stack é agnóstica. Escolhemos a ferramenta exata para o seu problema.
                       </p>
                       <span className="text-brandOrange font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                           Falar com Arquiteto <Globe size={14} />
                       </span>
                   </div>
               </motion.div>
           </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TechTrends;
