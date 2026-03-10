import React from 'react';
import { AlertTriangle, Clock, Users, ServerCrash, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { useLanguage } from '../LanguageContext';

const PainPoints: React.FC = () => {
  const { t } = useLanguage();

  // Retrieve points array dynamically
  const pointsData = t('painPoints.points') as Array<{q: string, a: string}>;
  
  // Custom icons mapping based on the content (assumed order: Time, Strategy, Scale, Team)
  const getIcon = (index: number) => {
    switch(index) {
        case 0: return <Clock className="w-8 h-8" />;
        case 1: return <AlertTriangle className="w-8 h-8" />;
        case 2: return <ServerCrash className="w-8 h-8" />;
        case 3: return <Users className="w-8 h-8" />;
        default: return <Activity className="w-8 h-8" />;
    }
  };

  const getErrorCode = (index: number) => {
    const codes = ["ERR_TIMEOUT", "ERR_UNCERTAINTY", "ERR_SCALABILITY", "ERR_RESOURCE"];
    return codes[index] || `ERR_0${index+1}`;
  };

  return (
    <section className="py-32 bg-brandBlack relative z-20" aria-labelledby="pain-heading">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-red-900/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/5 pb-8">
          <div className="max-w-2xl">
             <Reveal width="100%">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold">System Diagnosis</span>
               </div>
               <h2 id="pain-heading" className="text-3xl md:text-5xl font-bold text-white mb-4">
                 {t('painPoints.title')}
               </h2>
               <p className="text-slate-400 text-lg leading-relaxed">
                 {t('painPoints.subtitle')}
               </p>
             </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(pointsData) && pointsData.map((point, index) => (
            <Reveal key={index} delay={index * 0.1} width="100%">
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative h-full bg-[#0F0F0F] rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-brandOrange/50 hover:shadow-[0_0_30px_rgba(255,90,31,0.1)]"
              >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>
                
                {/* Active State Gradient (Hidden by default) */}
                <div className="absolute inset-0 bg-gradient-to-b from-brandOrange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative p-8 flex flex-col h-full z-10">
                  
                  {/* Header: Status Badge */}
                  <div className="flex justify-between items-start mb-8">
                     <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:border-brandOrange/30 group-hover:text-brandOrange transition-colors">
                        {getErrorCode(index)}
                     </span>
                     
                     <div className="flex items-center gap-2">
                        {/* Status Dot: Red (Alert) -> Green (Fixed) */}
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 bg-red-500 rounded-full group-hover:opacity-0 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping group-hover:opacity-0"></div>
                            <div className="absolute inset-0 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#22c55e]"></div>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-red-500 group-hover:text-green-500 transition-colors duration-300">
                           <span className="group-hover:hidden">ALERT</span>
                           <span className="hidden group-hover:inline">SOLVED</span>
                        </span>
                     </div>
                  </div>

                  {/* Icon Area */}
                  <div className="mb-6 text-slate-500 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110 origin-left">
                     {getIcon(index)}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brandOrange transition-colors duration-300">
                    {point.q}
                  </h3>
                  
                  {/* Solution Reveal */}
                  <div className="mt-auto relative">
                     <div className="h-px w-full bg-white/10 mb-4 group-hover:bg-brandOrange/30 transition-colors duration-500"></div>
                     <p className="text-sm text-slate-400 leading-relaxed opacity-60 group-hover:opacity-100 group-hover:text-white transition-all duration-300">
                        <ArrowRight className="inline-block w-3 h-3 mr-1 text-brandOrange -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                        {point.a}
                     </p>
                  </div>

                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
