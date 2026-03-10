import React from 'react';
import { Linkedin, ExternalLink, Rocket, Palette, Terminal, Cpu } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, TEAM_MEMBERS, isValidLinkedInProfileUrl } from '../siteConfig';
import type { TeamMemberIconKey } from '../types';

const TEAM_MEMBER_ICONS: Record<TeamMemberIconKey, React.ReactNode> = {
  rocket: <Rocket size={18} />,
  cpu: <Cpu size={18} />,
  palette: <Palette size={18} />,
  terminal: <Terminal size={18} />,
};

const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-brandBlack relative overflow-hidden" aria-labelledby="about-heading">
       {/* Decorative background element */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-brandGray/20 skew-x-12 transform translate-x-20 pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-brandOrange/5 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <Reveal width="100%">
            <h2 id="about-heading" className="text-3xl md:text-5xl font-bold text-white mb-4">{t('about.title')}</h2>
            <p className="mt-2 text-slate-400 text-lg max-w-2xl mx-auto">{t('about.subtitle')}</p>
          </Reveal>
        </div>

        {/* History & Timeline Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-40">
          <div className="order-2 md:order-1 relative">
             {/* Timeline Vertical Line */}
             <div className="absolute left-[9px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-slate-800 via-slate-700 to-transparent"></div>

             <div className="space-y-12">
                <Reveal delay={0.1}>
                  <div className="relative pl-10 group">
                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-brandBlack border-2 border-slate-600 group-hover:border-white group-hover:scale-110 transition-all duration-300 z-10"></div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-xs font-mono font-bold text-slate-400 mb-2 border border-white/5">{t('about.timeline.0.year')}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{t('about.timeline.0.title')}</h3>
                    <p className="text-slate-400 text-base leading-relaxed">{t('about.timeline.0.desc')}</p>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="relative pl-10 group">
                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-brandBlack border-2 border-brandAmber group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(255,184,74,0.3)] z-10"></div>
                    <span className="inline-block px-3 py-1 rounded-full bg-brandAmber/10 text-xs font-mono font-bold text-brandAmber mb-2 border border-brandAmber/20">{t('about.timeline.1.year')}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{t('about.timeline.1.title')}</h3>
                    <p className="text-slate-400 text-base leading-relaxed">{t('about.timeline.1.desc')}</p>
                  </div>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="relative pl-10 group">
                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-brandBlack border-2 border-blue-500 group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.3)] z-10"></div>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-xs font-mono font-bold text-blue-400 mb-2 border border-blue-500/20">{t('about.timeline.2.year')}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{t('about.timeline.2.title')}</h3>
                    <p className="text-slate-400 text-base leading-relaxed">
                      {t('about.timeline.2.desc')}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.4}>
                  <div className="relative pl-10 group">
                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-brandBlack border-4 border-brandOrange group-hover:scale-125 transition-all duration-300 shadow-[0_0_15px_rgba(255,90,31,0.6)] z-10"></div>
                    <span className="inline-block px-3 py-1 rounded-full bg-brandOrange/10 text-xs font-mono font-bold text-brandOrange mb-2 border border-brandOrange/20">{t('about.timeline.3.year')}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{t('about.timeline.3.title')}</h3>
                    <p className="text-slate-400 text-base leading-relaxed">{t('about.timeline.3.desc')}</p>
                  </div>
                </Reveal>
             </div>
          </div>

          <div className="order-1 md:order-2 sticky top-24">
            <Reveal width="100%">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 group aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-br from-brandOrange/20 via-transparent to-brandAmber/5 mix-blend-overlay z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                  alt="Equipe de tecnologia da Collaby.t trabalhando em um projeto de software em um escritÃ³rio moderno" 
                  width="800"
                  height="600"
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 transform group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end z-20">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-brandOrange font-mono text-xs uppercase tracking-widest mb-2">{t('about.culture.label')}</p>
                    <p className="text-white font-medium text-xl leading-snug">{t('about.culture.text')}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* New Premium Team Section */}
        <div id="about-team" className="border-t border-white/10 pt-24 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-brandBlack flex items-center justify-center rounded-full border border-white/5 shadow-2xl z-20">
                <span className="text-3xl animate-pulse">âš¡</span>
            </div>

            <div className="text-center mb-16">
                <Reveal width="100%">
                    <h3 className="text-4xl font-bold text-white mb-6">{t('about.team.title')}</h3>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        {t('about.team.subtitle')}
                    </p>
                </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {TEAM_MEMBERS.map((member, idx) => {
                    const linkedinProfileUrl = isValidLinkedInProfileUrl(member.linkedinUrl)
                      ? member.linkedinUrl
                      : undefined;

                    return (
                    <Reveal key={idx} delay={idx * 0.1} width="100%">
                        <motion.div 
                          whileHover={{ y: -10 }}
                          className="group relative h-[450px] w-full rounded-3xl overflow-hidden bg-brandGray border border-white/5 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(255,90,31,0.15)]"
                        >
                            
                            {/* Glow Effect Border on Hover */}
                            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-brandOrange/30 transition-colors duration-500 z-20 pointer-events-none"></div>

                            {/* Image Container */}
                            <div className="absolute inset-0">
                                <img 
                                    src={member.image} 
                                    alt={`Foto de ${member.name}, ${member.role} na Collaby.t`} 
                                    width="600"
                                    height="800"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                                    loading="lazy"
                                    decoding="async"
                                />
                                {/* Gradient Overlay - Always Visible but stronger at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brandBlack opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 bg-brandOrange/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end z-30">
                                
                                {/* Hidden Content appearing on hover */}
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    
                                    {/* Quote */}
                                    <div className="overflow-hidden h-0 group-hover:h-auto mb-0 group-hover:mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                       <p className="text-sm italic text-slate-300 border-l-2 border-brandOrange pl-3 leading-relaxed">
                                         &ldquo;{member.quote}&rdquo;
                                       </p>
                                    </div>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {member.skills.map((skill, sIdx) => (
                                            <span key={sIdx} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white/10 backdrop-blur-md rounded text-white border border-white/10">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-0.5 group-hover:text-brandOrange transition-colors">{member.name}</h4>
                                            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                                <span className="text-brandOrange">{TEAM_MEMBER_ICONS[member.iconKey]}</span>
                                                <span className="uppercase tracking-wide text-xs">{member.role}</span>
                                            </div>
                                        </div>
                                        
                                        {/* LinkedIn Button */}
                                        {linkedinProfileUrl && (
                                          <a
                                            href={linkedinProfileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-brandOrange transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                            title={`Conectar com ${member.name}`}
                                            aria-label={`Conectar com ${member.name}`}
                                          >
                                            <Linkedin size={18} />
                                          </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Reveal>
                )})}
            </div>
            
            <div className="mt-20 text-center">
                <a 
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-brandGray border border-white/10 text-slate-400 hover:text-white hover:border-brandOrange hover:bg-brandOrange/5 transition-all duration-300"
                >
                    <span className="font-medium text-sm tracking-wide">{t('about.team.linkedin')}</span>
                    <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>

      </div>
    </section>
  );
};

export default About;

