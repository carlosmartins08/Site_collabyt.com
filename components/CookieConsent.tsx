import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

interface CookieConsentProps {
  policyUrl: string;
  onOpenPolicy: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ policyUrl, onOpenPolicy }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('collabyt_cookie_consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('collabyt_cookie_consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('collabyt_cookie_consent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[80] bg-brandGray/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-brandOrange/10 rounded-lg shrink-0">
              <Cookie className="w-6 h-6 text-brandOrange" />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">{t('cookies.title')}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t('cookies.text')}{' '}
                <Link
                  to={policyUrl}
                  onClick={onOpenPolicy}
                  className="text-brandOrange hover:underline font-medium"
                >
                  {t('cookies.link')}
                </Link>.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-2">
             <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              {t('cookies.decline')}
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-brandOrange hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-brandOrange/20"
            >
              {t('cookies.accept')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
