import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Meta from './Meta';
import { ContactFormData, submitContactForm } from '../services/contact';
import {
  SiteLocale,
  buildAlternateLinks,
  buildLegalPath,
  canonicalFromPath,
} from '../siteConfig';

type ContactPageProps = {
  locale: SiteLocale;
};

const initialFormState: ContactFormData = {
  name: '',
  email: '',
  challenge: '',
  message: '',
  consent: false,
};

const content = {
  'pt-br': {
    title: 'Contato | Collaby.t',
    description:
      'Fale com a Collaby.t sobre MVP, IA aplicada e transformação digital. Resposta inicial em até 24 horas úteis.',
    heading: 'Fale com o time Collaby.t',
    subtitle:
      'Conte seu cenário atual e retornamos com direcionamento técnico-comercial para o próximo passo do seu projeto.',
    labels: {
      name: 'Nome completo',
      email: 'E-mail corporativo',
      challenge: 'Desafio principal',
      message: 'Mensagem',
      consent:
        'Li e concordo com a Política de Privacidade e autorizo o contato comercial.',
      submit: 'Enviar contato',
    },
    placeholders: {
      name: 'Seu nome',
      email: 'voce@empresa.com',
      challenge: 'Ex.: tirar MVP do papel em 90 dias',
      message: 'Contexto, prazo e objetivos do projeto',
    },
    legalCta: 'Também podemos formalizar o atendimento via NDA antes da imersão.',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Uso',
    success: 'Mensagem enviada com sucesso. Nosso time retorna em breve.',
    error: 'Não foi possível enviar agora. Tente novamente em instantes.',
  },
  en: {
    title: 'Contact | Collaby.t',
    description:
      'Talk to Collaby.t about MVP development, applied AI and digital transformation. Initial reply within 24 business hours.',
    heading: 'Talk to the Collaby.t team',
    subtitle:
      'Share your current scenario and we will reply with technical and commercial direction for your next product step.',
    labels: {
      name: 'Full name',
      email: 'Work email',
      challenge: 'Main challenge',
      message: 'Message',
      consent: 'I agree with the Privacy Policy and allow commercial contact.',
      submit: 'Send request',
    },
    placeholders: {
      name: 'Your name',
      email: 'you@company.com',
      challenge: 'e.g. launch an MVP in 90 days',
      message: 'Project context, timeline and goals',
    },
    legalCta: 'We can also formalize engagement through NDA before discovery sessions.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    success: 'Message sent successfully. Our team will contact you soon.',
    error: 'Could not send right now. Please try again in a moment.',
  },
} as const;

const ContactPage: React.FC<ContactPageProps> = ({ locale }) => {
  const dictionary = content[locale];
  const [formData, setFormData] = useState<ContactFormData>({ ...initialFormState });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const path = buildLegalPath(locale, 'contact');
  const canonical = canonicalFromPath(path);
  const alternates = buildAlternateLinks(path);
  const htmlLang = locale === 'pt-br' ? 'pt-BR' : 'en';

  const structuredData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: dictionary.title,
        url: canonical,
        inLanguage: htmlLang,
        about: {
          '@type': 'Organization',
          name: 'Collaby.t',
          url: 'https://collabyt.com',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'pt-br' ? 'Início' : 'Home',
            item: canonicalFromPath(`/${locale}`),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: locale === 'pt-br' ? 'Contato' : 'Contact',
            item: canonical,
          },
        ],
      },
    ],
    [canonical, dictionary.title, htmlLang, locale]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      setStatusMessage(dictionary.success);
      setFormData({ ...initialFormState });
    } catch (error) {
      console.error(error);
      setStatusMessage(dictionary.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brandBlack text-slate-200 py-16 px-4">
      <Meta
        title={dictionary.title}
        description={dictionary.description}
        lang={htmlLang}
        canonical={canonical}
        url={canonical}
        alternates={alternates}
        structuredData={structuredData}
      />

      <main className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {dictionary.heading}
          </h1>
          <p className="text-slate-400 text-lg">{dictionary.subtitle}</p>
        </header>

        <section className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 md:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                {dictionary.labels.name}
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={dictionary.placeholders.name}
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white outline-none focus:border-brandOrange"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                {dictionary.labels.email}
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={dictionary.placeholders.email}
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white outline-none focus:border-brandOrange"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                {dictionary.labels.challenge}
              </label>
              <input
                type="text"
                name="challenge"
                required
                value={formData.challenge}
                onChange={handleChange}
                placeholder={dictionary.placeholders.challenge}
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white outline-none focus:border-brandOrange"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                {dictionary.labels.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={dictionary.placeholders.message}
                className="w-full px-4 py-3 rounded-xl h-28 resize-y bg-black border border-white/10 text-white outline-none focus:border-brandOrange"
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-slate-400">
              <input
                type="checkbox"
                name="consent"
                required
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1"
              />
              <span>
                {dictionary.labels.consent}{' '}
                <Link to={buildLegalPath(locale, 'privacy-policy')} className="text-brandOrange hover:underline">
                  {dictionary.privacy}
                </Link>{' '}
                |{' '}
                <Link to={buildLegalPath(locale, 'terms')} className="text-brandOrange hover:underline">
                  {dictionary.terms}
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || !formData.consent}
              className="w-full bg-brandOrange hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
            >
              {isSubmitting ? '...' : dictionary.labels.submit}
            </button>
          </form>

          {statusMessage ? (
            <p className="mt-4 text-sm text-slate-300">{statusMessage}</p>
          ) : null}
        </section>

        <p className="mt-6 text-sm text-slate-500">{dictionary.legalCta}</p>
      </main>
    </div>
  );
};

export default ContactPage;

