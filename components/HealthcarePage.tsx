import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Hospital,
  HeartPulse,
  Stethoscope,
  BriefcaseMedical,
  Layers,
} from 'lucide-react';
import Meta from './Meta';
import FloatingNav from './FloatingNav';
import SiteFooter from './SiteFooter';
import { useLanguage } from '../LanguageContext';
import {
  SiteLocale,
  buildAlternateLinks,
  buildHealthcarePath,
  buildLegalPath,
  buildSectionPath,
  canonicalFromPath,
  localeToAppLanguage,
  localeToHtmlLang,
} from '../siteConfig';

type HealthcarePageProps = {
  locale: SiteLocale;
};

const content = {
  'pt-br': {
    title: 'Hospitais e Consultórios | Collaby.t',
    description:
      'Arquitetura de Conteúdo e SEO para hospitais e Consultórios que precisam de confiança, agendamentos e eficiência operacional.',
    hero: {
      eyebrow: 'Conteúdo e SEO para Saúde',
      heading: 'Hospitais e Consultórios: confiança, jornada do paciente e escala',
      subheading:
        'Criamos um ecossistema de Conteúdo que aumenta descoberta, prova credibilidade e gera agendamentos qualificados.',
      ctaPrimary: 'Falar com especialista',
      ctaSecondary: 'Ver soluções',
    },
    painPoints: {
      title: 'Principais desafios de descoberta em Saúde',
      items: [
        {
          title: 'Baixa visibilidade de especialidades',
          description: 'Pacientes não encontram serviços chave com rapidez.',
        },
        {
          title: 'Conteúdo sem prova clínica',
          description: 'Faltam dados e diferenciais que geram confiança.',
        },
        {
          title: 'experiência digital fragmentada',
          description: 'Agendamento e informações dispersas reduzem conversão.',
        },
      ],
    },
    personas: {
      title: 'Personas alvo',
      items: [
        'Diretor hospitalar buscando eficiência e reputacao',
        'Gestor de clínica aumentando agendamentos',
        'Time de TI integrando sistemas e dados',
        'Compras comparando parceiros de tecnologia',
      ],
    },
    intents: {
      title: 'intenções de busca',
      items: [
        'informacional: como aumentar agendamentos em hospitais',
        'comparativa: melhor parceiro para Saúde digital',
        'comercial: consultoria de tecnologia para hospitais',
        'transacional: contratar time para plataforma de agendamento',
      ],
    },
    methodology: {
      title: 'Método em 8 etapas para autoridade em Saúde',
      steps: [
        'Diagnóstico da oferta e especialidades',
        'Mapeamento de personas e jornada do paciente',
        'Pesquisa de intenções e termos de Saúde',
        'Clusters por especialidade e serviço',
        'Páginas por procedimento e dor critica',
        'Interligação com provas, cases e dados',
        'SEO técnico, performance e acessibilidade',
        'Otimização para motores de IA',
      ],
    },
    deliverables: {
      title: 'Entregáveis para hospitais e Consultórios',
      items: [
        'Mapa de Conteúdo por especialidade',
        'Páginas de serviços com prova clínica',
        'Schema e SEO técnico por página',
        'Plano de expansão por linhas de cuidado',
      ],
    },
    clusters: {
      title: 'Clusters recomendados para Saúde',
      items: [
        {
          title: 'Agendamento e conversão',
          description: 'Conteúdo para atrair pacientes e reduzir friccao.',
          key: 'solutions',
        },
        {
          title: 'Dados e prontuario digital',
          description: 'IA aplicada, analytics e integração de sistemas.',
          key: 'tech',
        },
        {
          title: 'Método e governança',
          description: 'Processo, compliance e confiabilidade.',
          key: 'methodology',
        },
        {
          title: 'Cases em Saúde',
          description: 'Resultados e impacto clinico.',
          key: 'projects',
        },
      ],
    },
    faq: {
      title: 'Perguntas frequentes',
      items: [
        {
          q: 'Esse plano ajuda a gerar mais agendamentos?',
          a: 'Sim. Estruturamos Páginas e funis com foco em conversão.',
        },
        {
          q: 'Como tratar LGPD e dados sensíveis?',
          a: 'Incluimos governança, segurança e Conteúdo alinhado a conformidade.',
        },
        {
          q: 'Preciso mudar meus sistemas atuais?',
          a: 'não. O plano se integra ao stack existente.',
        },
      ],
    },
    cta: {
      title: 'Vamos acelerar a descoberta em Saúde',
      text: 'Receba um plano de Conteúdo e SEO para hospitais e Consultórios.',
      button: 'Agendar Diagnóstico',
    },
  },
  en: {
    title: 'Healthcare | Collaby.t',
    description:
      'Content architecture and SEO for hospitals and clinics focused on trust, appointments and operational efficiency.',
    hero: {
      eyebrow: 'Content and SEO for Healthcare',
      heading: 'Hospitals and clinics: trust, patient journey and scale',
      subheading:
        'We build a content ecosystem that increases discovery, proves credibility and generates qualified appointments.',
      ctaPrimary: 'Talk to a specialist',
      ctaSecondary: 'View solutions',
    },
    painPoints: {
      title: 'Key healthcare discovery blockers',
      items: [
        {
          title: 'Low visibility of specialties',
          description: 'Patients cannot find key services quickly.',
        },
        {
          title: 'Content without clinical proof',
          description: 'Missing data and differentiation that builds trust.',
        },
        {
          title: 'Fragmented digital experience',
          description: 'Scheduling and information gaps reduce conversion.',
        },
      ],
    },
    personas: {
      title: 'Target personas',
      items: [
        'Hospital director focused on efficiency and reputation',
        'Clinic manager increasing appointments',
        'IT team integrating systems and data',
        'Procurement comparing technology partners',
      ],
    },
    intents: {
      title: 'Search intents',
      items: [
        'informational: how to increase hospital appointments',
        'comparative: best partner for healthcare digital',
        'commercial: technology consulting for hospitals',
        'transactional: hire a team for a scheduling platform',
      ],
    },
    methodology: {
      title: '8-step method to build healthcare authority',
      steps: [
        'Service and specialty diagnosis',
        'Persona and patient journey mapping',
        'Intent research and healthcare terms',
        'Clusters by specialty and service',
        'Pages by procedure and critical pain',
        'Linking to proof, cases and data',
        'Technical SEO, performance and accessibility',
        'AI discovery optimization',
      ],
    },
    deliverables: {
      title: 'Healthcare deliverables',
      items: [
        'Content map by specialty',
        'Service pages with clinical proof',
        'Schema and technical SEO per page',
        'Expansion plan by care line',
      ],
    },
    clusters: {
      title: 'Recommended clusters for Healthcare',
      items: [
        {
          title: 'Scheduling and conversion',
          description: 'Content to attract patients and reduce friction.',
          key: 'solutions',
        },
        {
          title: 'Data and digital health records',
          description: 'Applied AI, analytics and system integration.',
          key: 'tech',
        },
        {
          title: 'Method and governance',
          description: 'Process, compliance and reliability.',
          key: 'methodology',
        },
        {
          title: 'Healthcare cases',
          description: 'Results and clinical impact.',
          key: 'projects',
        },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Does this plan increase appointments?',
          a: 'Yes. We structure pages and funnels focused on conversion.',
        },
        {
          q: 'How do you handle sensitive data and compliance?',
          a: 'We add governance, security and compliance-aligned content.',
        },
        {
          q: 'Do we need to replace current systems?',
          a: 'No. The plan integrates with the existing stack.',
        },
      ],
    },
    cta: {
      title: 'Lets accelerate healthcare discovery',
      text: 'Get a content and SEO plan for hospitals and clinics.',
      button: 'Schedule a diagnosis',
    },
  },
} as const;

const HealthcarePage: React.FC<HealthcarePageProps> = ({ locale }) => {
  const { setLanguage } = useLanguage();
  const dictionary = content[locale];
  const htmlLang = localeToHtmlLang(locale);
  const path = buildHealthcarePath(locale);
  const canonical = canonicalFromPath(path);
  const alternates = buildAlternateLinks(path);
  const contactPath = buildLegalPath(locale, 'contact');

  useEffect(() => {
    setLanguage(localeToAppLanguage(locale));
  }, [locale, setLanguage]);

  const structuredData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: dictionary.title,
        description: dictionary.description,
        url: canonical,
        inLanguage: htmlLang,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType:
          locale === 'pt-br'
            ? 'Conteúdo e SEO para hospitais e Consultórios'
            : 'Content and SEO for hospitals and clinics',
        provider: {
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
            name: locale === 'pt-br' ? 'Hospitais e Consultórios' : 'Healthcare',
            item: canonical,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: dictionary.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
    [canonical, dictionary.description, dictionary.faq.items, dictionary.title, htmlLang, locale]
  );

  const scrollToSection = (_id: string) => {
    void _id;
  };

  const clusterLinks = [
    {
      ...dictionary.clusters.items[0],
      href: buildSectionPath(locale, 'solutions'),
    },
    {
      ...dictionary.clusters.items[1],
      href: buildSectionPath(locale, 'tech'),
    },
    {
      ...dictionary.clusters.items[2],
      href: buildSectionPath(locale, 'methodology'),
    },
    {
      ...dictionary.clusters.items[3],
      href: buildSectionPath(locale, 'projects'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brandBlack text-slate-200">
      <Meta
        title={dictionary.title}
        description={dictionary.description}
        lang={htmlLang}
        canonical={canonical}
        url={canonical}
        alternates={alternates}
        structuredData={structuredData}
      />

      <FloatingNav
        locale={locale}
        contactPath={contactPath}
        scrollToSection={scrollToSection}
        activeSection="solutions"
        scrollPercent={0}
      />

      <main className="flex-grow pt-32 pb-16">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brandOrange font-semibold">
              <Hospital className="w-4 h-4" />
              {dictionary.hero.eyebrow}
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-white max-w-3xl">
              {dictionary.hero.heading}
            </h1>
            <p className="mt-5 text-lg text-slate-400 max-w-3xl">
              {dictionary.hero.subheading}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to={contactPath}
                className="bg-brandOrange hover:bg-orange-600 text-white px-8 py-4 rounded-full text-base font-bold transition-all hover:scale-[1.02] shadow-xl shadow-brandOrange/20"
              >
                {dictionary.hero.ctaPrimary}
              </Link>
              <Link
                to={buildSectionPath(locale, 'solutions')}
                className="bg-transparent border border-slate-700 hover:border-white text-white px-8 py-4 rounded-full text-base font-medium transition-colors hover:bg-white/5"
              >
                {dictionary.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white">{dictionary.painPoints.title}</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              {dictionary.painPoints.items.map((item) => (
                <div
                  key={item.title}
                  className="bg-brandGray border border-white/5 rounded-2xl p-6 hover:border-brandOrange/30 transition-colors"
                >
                  <div className="flex items-center gap-3 text-brandOrange">
                    <HeartPulse className="w-5 h-5" />
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid lg:grid-cols-2 gap-12">
          <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 text-brandOrange">
              <Stethoscope className="w-5 h-5" />
              <h2 className="text-2xl font-bold text-white">{dictionary.personas.title}</h2>
            </div>
            <ul className="mt-6 space-y-3 text-slate-400">
              {dictionary.personas.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brandOrange mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 text-brandOrange">
              <BriefcaseMedical className="w-5 h-5" />
              <h2 className="text-2xl font-bold text-white">{dictionary.intents.title}</h2>
            </div>
            <ul className="mt-6 space-y-3 text-slate-400">
              {dictionary.intents.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brandOrange mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-brandGray border border-white/5 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 text-brandOrange">
              <Layers className="w-5 h-5" />
              <h2 className="text-2xl font-bold text-white">{dictionary.methodology.title}</h2>
            </div>
            <ol className="mt-6 grid md:grid-cols-2 gap-4 text-slate-400">
              {dictionary.methodology.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="text-brandOrange font-semibold">{String(index + 1).padStart(2, '0')}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid lg:grid-cols-2 gap-12">
          <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white">{dictionary.deliverables.title}</h2>
            <ul className="mt-6 space-y-3 text-slate-400">
              {dictionary.deliverables.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brandOrange mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white">{dictionary.clusters.title}</h2>
            <div className="mt-6 space-y-4">
              {clusterLinks.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="block border border-white/5 rounded-xl p-4 hover:border-brandOrange/30 transition-colors"
                >
                  <div className="flex items-center justify-between text-white font-semibold">
                    <span>{item.title}</span>
                    <ArrowRight className="w-4 h-4 text-brandOrange" />
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-2xl font-bold text-white">{dictionary.faq.title}</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {dictionary.faq.items.map((item) => (
              <div
                key={item.q}
                className="bg-brandGray border border-white/5 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                <p className="mt-3 text-sm text-slate-400">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-br from-brandOrange/10 via-transparent to-brandAmber/10 border border-brandOrange/20 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white">{dictionary.cta.title}</h2>
            <p className="mt-3 text-slate-400">{dictionary.cta.text}</p>
            <Link
              to={contactPath}
              className="mt-6 inline-flex items-center gap-2 bg-brandOrange hover:bg-orange-600 text-white px-8 py-4 rounded-full text-base font-bold transition-all hover:scale-[1.02] shadow-xl shadow-brandOrange/20"
            >
              {dictionary.cta.button}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} contactPath={contactPath} />
    </div>
  );
};

export default HealthcarePage;



