import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, Loader2, CheckCircle2, ChevronDown, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { ContactFormData, submitContactForm } from '../services/contact';
import { SiteLocale, buildLegalPath } from '../siteConfig';

const initialFormState: ContactFormData = {
  name: '',
  email: '',
  challenge: '',
  message: '',
  consent: false,
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy: () => void;
  locale: SiteLocale;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onOpenPrivacy,
  locale,
}) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState<ContactFormData>({ ...initialFormState });

  const privacyPath = buildLegalPath(locale, 'privacy-policy');

  useEffect(() => {
    if (!isOpen) return;
    setIsSuccess(false);
    setIsSubmitting(false);
    setFormData({ ...initialFormState });
    setFormError('');
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;

    setIsSubmitting(true);
    setFormError('');

    try {
      await submitContactForm(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setFormError(
        error instanceof Error
          ? error.message
          : 'Não foi possível enviar o formulário. Tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className="bg-brandGray rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
          >
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
              {!isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                >
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                      {t('contact.title') as string}
                    </h3>
                    <p className="text-slate-400 text-lg font-light">
                      {t('contact.subtitle') as string}
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 ml-1 block">
                          {t('contact.labels.name') as string}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:ring-1 focus:ring-brandOrange focus:border-brandOrange outline-none placeholder:text-slate-600 transition-all text-sm shadow-inner"
                          placeholder={t('contact.placeholders.name') as string}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 ml-1 block">
                          {t('contact.labels.email') as string}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:ring-1 focus:ring-brandOrange focus:border-brandOrange outline-none placeholder:text-slate-600 transition-all text-sm shadow-inner"
                          placeholder={t('contact.placeholders.email') as string}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 ml-1 block">
                        {t('contact.labels.challenge') as string}
                      </label>
                      <div className="relative">
                        <select
                          name="challenge"
                          value={formData.challenge}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:ring-1 focus:ring-brandOrange focus:border-brandOrange outline-none appearance-none transition-all text-sm shadow-inner cursor-pointer"
                        >
                          <option value="" disabled className="text-slate-500">
                            Selecione uma opção...
                          </option>
                          {(t('contact.options') as string[]).map((opt, i) => (
                            <option key={i} value={opt} className="bg-brandGray">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 ml-1 block">
                        {t('contact.labels.message') as string}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:ring-1 focus:ring-brandOrange focus:border-brandOrange outline-none h-32 resize-none placeholder:text-slate-600 transition-all text-sm shadow-inner custom-scrollbar"
                        placeholder={t('contact.placeholders.message') as string}
                      ></textarea>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="relative flex items-center pt-0.5">
                        <input
                          type="checkbox"
                          name="consent"
                          id="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          required
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-500 bg-brandBlack checked:border-brandOrange checked:bg-brandOrange transition-all"
                        />
                        <ShieldCheck className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" />
                      </div>
                      <label htmlFor="consent" className="text-xs text-slate-400 cursor-pointer leading-relaxed">
                        {t('contact.labels.consentPre') as string}{' '}
                        <Link
                          to={privacyPath}
                          onClick={onOpenPrivacy}
                          className="text-brandOrange hover:underline font-bold"
                        >
                          {t('contact.labels.privacyLink') as string}
                        </Link>
                        {t('contact.labels.consentPost') as string}
                      </label>
                    </div>

                    {formError ? <p className="text-sm text-rose-400 font-medium mt-2">{formError}</p> : null}

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.consent}
                      className="w-full bg-gradient-to-r from-brandOrange to-orange-600 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-brandOrange/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          {t('contact.labels.submit') as string}
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                    className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-white">Mensagem Enviada!</h3>
                    <p className="text-slate-400 text-lg max-w-sm mx-auto">
                      Obrigado pelo interesse. Nossa equipe analisará seu perfil e entrará em contato.
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
                  >
                    Voltar ao site
                  </button>
                </motion.div>
              )}
            </div>

            {!isSuccess ? (
              <div className="h-1.5 w-full bg-gradient-to-r from-brandOrange via-brandAmber to-brandOrange opacity-20"></div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};

export default ContactModal;


