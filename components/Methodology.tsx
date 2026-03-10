import React from 'react';
import { Search, PenTool, FlaskConical, Code2, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../LanguageContext';

const Methodology: React.FC = () => {
  const { t } = useLanguage();

  // Get steps from translation
  const stepsData = t('methodology.steps') as Array<{title: string, desc: string}>;
  
  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Search className="w-6 h-6" />;
      case 1: return <PenTool className="w-6 h-6" />;
      case 2: return <FlaskConical className="w-6 h-6" />;
      case 3: return <Code2 className="w-6 h-6" />;
      case 4: return <Rocket className="w-6 h-6" />;
      default: return <CheckCircle2 className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-32 bg-brandBlack relative overflow-hidden border-t border-white/5" aria-labelledby="method-heading">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brandGray/20 via-brandBlack to-brandBlack pointer-events-none"></div>
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <Reveal width="100%">
             <span className="text-brandOrange font-mono text-sm uppercase tracking-[0.2em] font-bold mb-4 block">
                Workflow
             </span>
            <h2 id="method-heading" className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              {t('methodology.title')}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              {t('methodology.subtitle')}
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* Desktop Connection Line */}
          <div className="hidden lg:block absolute top-[60px] left-0 w-full h-0.5 bg-white/5 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-brandOrange/0 via-brandOrange to-brandOrange/0 w-1/2 animate-[marquee_3s_linear_infinite]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            {Array.isArray(stepsData) && stepsData.map((step, index) => (
              <Reveal key={index} delay={index * 0.15} width="100%">
                <div className="group relative">
                  
                  {/* Step Card */}
                  <div className="relative bg-[#0F0F0F] border border-white/10 p-6 rounded-2xl h-full flex flex-col items-center text-center transition-all duration-500 group-hover:-translate-y-2 group-hover:border-brandOrange/30 group-hover:shadow-[0_10px_40px_-10px_rgba(255,90,31,0.1)]">
                    
                    {/* Number Background */}
                    <span className="absolute top-2 right-4 text-6xl font-black text-white/[0.03] select-none group-hover:text-brandOrange/[0.05] transition-colors duration-500">
                      0{index + 1}
                    </span>

                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-brandGray border border-white/10 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500 group-hover:border-brandOrange text-slate-400 group-hover:text-white">
                        {getIcon(index)}
                      </div>
                      {/* Glow behind icon */}
                      <div className="absolute inset-0 bg-brandOrange blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      {/* Connector Dot for Mobile */}
                      <div className="lg:hidden absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-white/10"></div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brandOrange transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Bottom Progress Bar (Active on Hover) */}
                    <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-white/5 overflow-hidden rounded-full mt-auto">
                       <div className="h-full bg-brandOrange w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>
                  </div>

                  {/* Desktop Arrow Connector */}
                  {index < stepsData.length - 1 && (
                    <div className="hidden lg:block absolute top-[60px] -right-4 transform -translate-y-1/2 translate-x-1/2 z-0 text-white/10">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
