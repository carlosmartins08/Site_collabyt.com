import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../LanguageContext';

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Dynamically retrieve the array of FAQ items from translations
  // This makes the component robust to changes in the number of questions
  const faqs = t('faq.items') as Array<{q: string, a: string}>;

  if (!Array.isArray(faqs)) return null;

  return (
    <section className="py-24 bg-brandBlack relative border-t border-white/5" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandGray border border-white/10 text-brandOrange text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle size={14} /> FAQ
            </span>
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">{t('faq.title')}</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">{t('faq.subtitle')}</p>
          </Reveal>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={index * 0.1} width="100%">
              <div 
                className={`border rounded-2xl transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-brandGray border-brandOrange/30 shadow-lg shadow-brandOrange/5' 
                    : 'bg-transparent border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <span className={`text-lg font-semibold transition-colors pr-8 ${openIndex === index ? 'text-white' : 'text-slate-300'}`}>
                    {faq.q}
                  </span>
                  <div className={`p-1 rounded-full transition-colors shrink-0 ${openIndex === index ? 'bg-brandOrange text-white' : 'bg-white/5 text-slate-500'}`}>
                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;