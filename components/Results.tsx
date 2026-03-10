import React, { useEffect, useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink, Share2, Quote, X } from 'lucide-react';
import { useInView, motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';
import { useLanguage } from '../LanguageContext';
import { SOCIAL_LINKS } from '../siteConfig';

// CountUp Component
const Counter = ({ value, duration = 2, suffix = "" }: { value: number, duration?: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const springValue = useSpring(0, { duration: duration * 1000 });
  const displayValue = useTransform(springValue, (current) => Math.round(current) + suffix);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const Results: React.FC = () => {
  const { t } = useLanguage();
  
  // Get Reviews Dynamically
  const reviewsData = t('results.reviews.items') as Array<{role: string, text: string}>;
  
  // Mock data augmentation for display (since translation file doesn't have images/names)
  // In a real app, this would come from a CMS or API
  const reviewMeta = [
    { name: "Ricardo Silva", image: "https://picsum.photos/id/1025/100/100", date: "2 weeks ago" },
    { name: "Mariana Costa", image: "https://picsum.photos/id/1011/100/100", date: "1 month ago" },
    { name: "Carlos Mendes", image: "https://picsum.photos/id/1005/100/100", date: "3 weeks ago" }
  ];

  const googleReviews = Array.isArray(reviewsData) ? reviewsData.map((item, index) => ({
      id: index,
      role: item.role,
      text: item.text,
      name: reviewMeta[index % reviewMeta.length].name,
      image: reviewMeta[index % reviewMeta.length].image,
      date: reviewMeta[index % reviewMeta.length].date,
      rating: 5
  })) : [];

  const [currentReview, setCurrentReview] = useState(0);
  const [selectedReview, setSelectedReview] = useState<typeof googleReviews[0] | null>(null);

  const nextReview = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (googleReviews.length === 0) return;
    setCurrentReview((prev) => (prev + 1) % googleReviews.length);
  };

  const prevReview = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (googleReviews.length === 0) return;
    setCurrentReview((prev) => (prev - 1 + googleReviews.length) % googleReviews.length);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const review = googleReviews[currentReview];
    const shareData = {
      title: 'Collaby.t - Histórias de Sucesso',
      text: `"${review.text}" — ${review.name}, sobre a Collaby.t`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert("Link e depoimento copiados para a área de transferência!");
    }
  };

  const techStack = [
     { name: "React", color: "bg-blue-400" },
     { name: "Node.js", color: "bg-green-500" },
     { name: "AWS", color: "bg-orange-400" },
     { name: "Python", color: "bg-yellow-400" },
     { name: "Google Cloud", color: "bg-red-500" },
     { name: "Figma", color: "bg-purple-500" },
     { name: "Docker", color: "bg-blue-600" },
     { name: "TypeScript", color: "bg-blue-500" },
     { name: "Kubernetes", color: "bg-blue-700" },
     { name: "GraphQL", color: "bg-pink-600" }
  ];

  if (googleReviews.length === 0) return null;

  return (
    <section className="py-24 bg-brandBlack overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Stats & Tech Stack */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <span className="text-brandOrange font-bold tracking-wider text-sm uppercase">{t('results.label')}</span>
              <h2 className="text-4xl font-bold text-white mt-2 mb-6 whitespace-pre-line">
                {t('results.title')}
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                {t('results.description')}
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <Reveal delay={0.2}>
                <div className="p-6 bg-brandGray rounded-2xl border-l-4 border-brandOrange group hover:shadow-lg hover:shadow-brandOrange/10 transition-all duration-300">
                  <p className="text-3xl font-extrabold text-white mb-1 flex">
                     +<Counter value={45} />
                  </p>
                  <p className="text-sm text-slate-500 font-medium">{t('results.stats.delivered')}</p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="p-6 bg-brandGray rounded-2xl border-l-4 border-brandAmber group hover:shadow-lg hover:shadow-brandAmber/10 transition-all duration-300">
                  <p className="text-3xl font-extrabold text-white mb-1 flex">
                     <Counter value={98} suffix="%" />
                  </p>
                  <p className="text-sm text-slate-500 font-medium">{t('results.stats.nps')}</p>
                </div>
              </Reveal>
            </div>
            
            {/* Infinite Tech/Partner Scroll (Marquee) */}
            <div className="w-full relative py-4 border-t border-white/10">
               <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-brandBlack to-transparent z-10"></div>
               <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-brandBlack to-transparent z-10"></div>
               
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">{t('results.techs')}</p>
               
               <div className="overflow-hidden flex w-full">
                 <div className="flex whitespace-nowrap animate-marquee gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                     {/* Tripled list for seamless looping on ultrawide screens */}
                     {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                         <span key={i} className="text-xl font-bold text-slate-500 flex items-center gap-2">
                             <div className={`w-2 h-2 ${tech.color} rounded-full`}></div>
                             {tech.name}
                         </span>
                     ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column: Google Reviews Card */}
          <div className="order-1 lg:order-2 relative perspective-1000">
            {/* Google Rating Badge */}
            <div className="absolute -top-6 -left-6 z-20 bg-brandGray p-3 rounded-xl shadow-lg flex items-center gap-3 border border-white/10 animate-float">
               <div className="bg-white p-1 rounded-full shadow-sm">
                  {/* Google G Logo SVG */}
                  <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1" fill="#34A853"/>
                    <path d="M5.41 13.59c-.27-.8-.41-1.65-.41-2.52s.14-1.72.41-2.52l-3.57-2.77c-.73 1.45-1.14 3.09-1.14 4.8s.41 3.35 1.14 4.8l3.57-2.77z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.57 2.77c.84-2.45 3.16-4.22 5.86-4.22z" fill="#EA4335"/>
                  </svg>
               </div>
               <div>
                  <div className="flex text-amber-400 text-xs">
                     {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                  <p className="text-xs font-bold text-white leading-none mt-0.5">5.0 de 5.0</p>
               </div>
            </div>

            <div 
              onClick={() => setSelectedReview(googleReviews[currentReview])}
              className="bg-brandGray rounded-3xl shadow-2xl p-8 lg:p-12 relative border border-white/5 transform rotate-1 hover:rotate-0 transition-all duration-500 cursor-pointer group/card hover:border-brandOrange/30 hover:shadow-brandOrange/5"
            >
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/card:opacity-10 transition-opacity">
                 <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 16.6569 20.6739 18 19.017 18H16.017C15.4647 18 15.017 18.4477 15.017 19V21H14.017ZM8.01691 21L8.01691 18C8.01691 16.8954 8.91234 16 10.0169 16H13.0169C13.5692 16 14.0169 15.5523 14.0169 15V9C14.0169 8.44772 13.5692 8 13.0169 8H9.01691C8.46462 8 8.01691 8.44772 8.01691 9V11C8.01691 11.5523 7.56919 12 7.01691 12H6.01691V5H16.0169V15C16.0169 16.6569 14.6738 18 13.0169 18H10.0169C9.46462 18 9.01691 18.4477 9.01691 19V21H8.01691Z" /></svg>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentReview}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={googleReviews[currentReview].image}
                        alt={googleReviews[currentReview].name}
                        className="w-14 h-14 rounded-full border-2 border-brandOrange p-0.5"
                        loading="lazy"
                        decoding="async"
                        width="56"
                        height="56"
                      />
                      <div>
                        <h4 className="font-bold text-white text-lg">{googleReviews[currentReview].name}</h4>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{googleReviews[currentReview].role}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 text-amber-400 mb-4">
                      {[...Array(googleReviews[currentReview].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="text-slate-500 text-xs ml-2 font-medium pt-0.5">{googleReviews[currentReview].date}</span>
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed italic mb-8 group-hover/card:text-white transition-colors">
                      &ldquo;{googleReviews[currentReview].text}&rdquo;
                    </p>
                    
                    <div className="text-xs text-brandOrange font-bold uppercase tracking-wider opacity-0 group-hover/card:opacity-100 transition-opacity absolute bottom-24 right-0">
                        {t('results.reviews.readMore')}
                    </div>
                  </motion.div>
               </AnimatePresence>

               <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-20">
                  <div className="flex items-center gap-4">
                      <a 
                        href={SOCIAL_LINKS.googleReviews}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} 
                        className="flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 hover:underline"
                      >
                        {t('results.reviews.google')}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button 
                        onClick={handleShare} 
                        className="text-slate-500 hover:text-brandOrange transition-colors" 
                        title="Compartilhar"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={prevReview}
                      className="p-3 rounded-full bg-brandBlack hover:bg-slate-900 text-white transition-colors border border-white/5"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextReview}
                      className="p-3 rounded-full bg-brandOrange hover:bg-orange-600 text-white shadow-lg shadow-brandOrange/20 transition-all hover:scale-105"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Details Modal */}
      <AnimatePresence>
        {selectedReview && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedReview(null)}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-brandGray border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
                >
                    <div className="absolute top-0 right-0 p-4 z-20">
                         <button 
                            onClick={() => setSelectedReview(null)}
                            className="p-2 bg-black/50 hover:bg-white/10 text-white rounded-full transition-colors"
                         >
                             <X className="w-5 h-5" />
                         </button>
                    </div>

                    <div className="p-8 md:p-10">
                        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
                            <img 
                                src={selectedReview.image} 
                                alt={selectedReview.name} 
                                className="w-20 h-20 rounded-full border-2 border-brandOrange shadow-lg" 
                                loading="lazy"
                                decoding="async"
                                width="80"
                                height="80"
                            />
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">{selectedReview.name}</h3>
                                <p className="text-brandOrange font-medium mb-2">{selectedReview.role}</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-amber-400">
                                        {[...Array(selectedReview.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-slate-500 text-sm">{selectedReview.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <Quote className="absolute -top-2 -left-4 w-8 h-8 text-brandOrange/20 transform -scale-x-100" />
                            <p className="text-xl leading-relaxed text-slate-200 italic pl-6 border-l-2 border-brandOrange/30">
                                {selectedReview.text}
                            </p>
                             <Quote className="absolute -bottom-4 -right-2 w-8 h-8 text-brandOrange/20" />
                        </div>
                        
                         <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                            <button 
                                onClick={() => setSelectedReview(null)}
                                className="text-slate-400 hover:text-white font-medium text-sm transition-colors"
                            >
                                {t('results.reviews.close')}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Results;
