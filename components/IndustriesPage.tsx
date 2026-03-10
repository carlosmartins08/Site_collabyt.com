import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Factory,
  Layers,
  Shield,
  Target,
  Wrench,
} from 'lucide-react';
import Meta from './Meta';
import FloatingNav from './FloatingNav';
import SiteFooter from './SiteFooter';
import { useLanguage } from '../LanguageContext';
import {
  SiteLocale,
  buildAlternateLinks,
  buildIndustriesPath,
  buildLegalPath,
  buildSectionPath,
  canonicalFromPath,
  localeToAppLanguage,
  localeToHtmlLang,
} from '../siteConfig';

type IndustriesPageProps = {
  locale: SiteLocale;
};

const content = {
  'pt-br': {
    title: 'Indústrias | Collaby.t',
    description:
      'Arquitetura de Conteúdo e SEO para Indústrias que buscam produtividade, automação e transformação digital com previsibilidade.',
    hero: {
      eyebrow: 'Conteúdo e SEO para Indústrias',
      heading: 'Indústrias: transformação digital e eficiência operacional',
      subheading:
        'Construímos um ecossistema de Conteúdo que prova capacidade técnica, reduz risco e gera demanda qualificada.',
      ctaPrimary: 'Falar com especialista',
      ctaSecondary: 'Ver soluções',
    },
    painPoints: {
      title: 'Principais desafios de descoberta industrial',
      items: [
        {
          title: 'Processos legacy pouco claros',
          description: 'O mercado não entende a evolução da operação nem o impacto.',
        },
        {
          title: 'Baixa visibilidade de ganhos',
          description: 'Sem indicadores e casos, a confiança não se estabelece.',
        },
        {
          title: 'Conteúdo técnico disperso',
          description: 'Falta uma narrativa que conecte tecnologia a resultado.',
        },
      ],
    },
    personas: {
      title: 'Personas alvo',
      items: [
        'Diretor industrial buscando eficiência e custo menor',
        'Gerente de operações avaliando automação',
        'CTO ou TI validando arquitetura e segurança',
        'Compras comparando fornecedores de tecnologia',
      ],
    },
    intents: {
      title: 'Intenções de busca',
      items: [
        'informacional: indústria 4.0 na prática',
        'comparativa: parceiro de transformação digital',
        'comercial: automação industrial e IA aplicada',
        'transacional: contratar integrador e time técnico',
      ],
    },
    methodology: {
      title: 'Método em 8 etapas para gerar autoridade industrial',
      steps: [
        'Diagnóstico do negócio e objetivos operacionais',
        'Mapeamento de personas e jornada de compra',
        'Pesquisa de Intenções e termos setoriais',
        'Definição de clusters por linha de produção',
        'Páginas por solução e por dor crítica',
        'Interligação com cases e resultados',
        'Padronização semântica e SEO técnico',
        'Otimização para motores de IA',
      ],
    },
    deliverables: {
      title: 'Entregáveis para Indústrias',
      items: [
        'Mapa de Conteúdo por área industrial',
        'Pilares de solução com provas técnicas',
        'Schema e SEO técnico por página',
        'Plano de expansão por setor e planta',
      ],
    },
    clusters: {
      title: 'Clusters recomendados para Indústrias',
      items: [
        {
          title: 'automação e controle',
          description: 'Conteúdo para ganhos de produtividade e redução de falhas.',
          key: 'solutions',
        },
        {
          title: 'Dados e analytics',
          description: 'Dashboards, rastreabilidade e indicadores.',
          key: 'tech',
        },
        {
          title: 'Método e governança',
          description: 'Processo, compliance e segurança.',
          key: 'methodology',
        },
        {
          title: 'Cases industriais',
          description: 'Prova social e impactos mensuráveis.',
          key: 'projects',
        },
      ],
    },
    faq: {
      title: 'Perguntas frequentes',
      items: [
        {
          q: 'Qual o primeiro passo para a indústria?',
          a: 'Começamos com Diagnóstico da operação e metas de negócio.',
        },
        {
          q: 'Quanto tempo leva para ver resultado?',
          a: 'Normalmente 6 a 10 semanas para sinais iniciais de tração.',
        },
        {
          q: 'Precisa parar a operação?',
          a: 'não. O plano é pensado para evolução gradual e segura.',
        },
      ],
    },
    cta: {
      title: 'Vamos estruturar a descoberta da sua indústria',
      text: 'Receba um plano de Conteúdo e SEO alinhado aos objetivos de eficiência.',
      button: 'Agendar Diagnóstico',
    },
  },
  en: {
    title: 'Industries | Collaby.t',
    description:
      'Content architecture and SEO for industries seeking productivity, automation and digital transformation with predictability.',
    hero: {
      eyebrow: 'Content and SEO for Industries',
      heading: 'Industries: digital transformation and operational efficiency',
      subheading:
        'We build a content ecosystem that proves technical capability, reduces risk and generates qualified demand.',
      ctaPrimary: 'Talk to a specialist',
      ctaSecondary: 'View solutions',
    },
    painPoints: {
      title: 'Key industrial discovery blockers',
      items: [
        {
          title: 'Legacy processes are unclear',
          description: 'The market does not see the operational evolution or impact.',
        },
        {
          title: 'Low visibility of gains',
          description: 'Without indicators and cases, trust is hard to build.',
        },
        {
          title: 'Scattered technical content',
          description: 'There is no narrative connecting tech to results.',
        },
      ],
    },
    personas: {
      title: 'Target personas',
      items: [
        'Industrial director focused on efficiency and cost',
        'Operations manager evaluating automation',
        'CTO or IT validating architecture and security',
        'Procurement comparing technology vendors',
      ],
    },
    intents: {
      title: 'Search intents',
      items: [
        'informational: industry 4.0 in practice',
        'comparative: digital transformation partner',
        'commercial: industrial automation and applied AI',
        'transactional: hire integrator and technical team',
      ],
    },
    methodology: {
      title: '8-step method to build industrial authority',
      steps: [
        'Operational diagnosis and business goals',
        'Persona and buying journey mapping',
        'Intent research with sector terms',
        'Cluster definition by production line',
        'Pages by solution and critical pain',
        'Linking to cases and outcomes',
        'Semantic standardization and technical SEO',
        'AI discovery optimization',
      ],
    },
    deliverables: {
      title: 'Industry deliverables',
      items: [
        'Content map by industrial área',
        'Solution pillars with technical proof',
        'Schema and technical SEO per page',
        'Expansion roadmap by sector and plant',
      ],
    },
    clusters: {
      title: 'Recommended clusters for Industries',
      items: [
        {
          title: 'Automation and control',
          description: 'Content for productivity gains and failure reduction.',
          key: 'solutions',
        },
        {
          title: 'Data and analytics',
          description: 'Dashboards, traceability and indicators.',
          key: 'tech',
        },
        {
          title: 'Method and governance',
          description: 'Process, compliance and security.',
          key: 'methodology',
        },
        {
          title: 'Industrial cases',
          description: 'Social proof and measurable impact.',
          key: 'projects',
        },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'What is the first step for industry?',
          a: 'We start with operational diagnosis and business goals.',
        },
        {
          q: 'How fast do results show up?',
          a: 'Usually 6 to 10 weeks for early traction signals.',
        },
        {
          q: 'Do we need to stop operations?',
          a: 'No. The plan is designed for gradual and safe evolution.',
        },
      ],
    },
    cta: {
      title: 'Lets structure discovery for your industry',
      text: 'Get a content and SEO plan aligned to efficiency goals.',
      button: 'Schedule a diagnosis',
    },
  },
} as const;

const IndustriesPage: React.FC<IndustriesPageProps> = ({ locale }) => {
  const { setLanguage } = useLanguage();
  const dictionary = content[locale];
  const htmlLang = localeToHtmlLang(locale);
  const path = buildIndustriesPath(locale);
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
            ? 'transformação digital e indústria 4.0'
            : 'Digital transformation and Industry 4.0',
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
            name: 'Indústrias',
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
              <Factory className="w-4 h-4" />
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
                    <Target className="w-5 h-5" />
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
              <Shield className="w-5 h-5" />
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
              <Wrench className="w-5 h-5" />
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

export default IndustriesPage;



