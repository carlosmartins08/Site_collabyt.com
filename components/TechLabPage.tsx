import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Cpu,
  Database,
  Cloud,
  Shield,
  Layers,
} from 'lucide-react';
import Meta from './Meta';
import FloatingNav from './FloatingNav';
import SiteFooter from './SiteFooter';
import { useLanguage } from '../LanguageContext';
import {
  SiteLocale,
  buildAlternateLinks,
  buildLegalPath,
  buildSectionPath,
  buildTechLabPath,
  canonicalFromPath,
  localeToAppLanguage,
  localeToHtmlLang,
} from '../siteConfig';

type TechLabPageProps = {
  locale: SiteLocale;
};

const content = {
  'pt-br': {
    title: 'Tech | Collaby.t',
    description:
      'Arquitetura de conteudo e SEO para tecnologia, com foco em stack moderno, IA aplicada e confiabilidade.',
    hero: {
      eyebrow: 'Tech Lab',
      heading: 'Tech: arquitetura, IA aplicada e stack moderno',
      subheading:
        'Estruturamos conteudo tecnico para provar capacidade, acelerar decisao e gerar demanda qualificada.',
      ctaPrimary: 'Falar com especialista',
      ctaSecondary: 'Ver solucoes',
    },
    painPoints: {
      title: 'Principais desafios de descoberta tecnica',
      items: [
        {
          title: 'Arquitetura pouco explicita',
          description: 'O mercado nao entende a robustez da solucao.',
        },
        {
          title: 'Baixa prova tecnica',
          description: 'Faltam dados e benchmarks de performance.',
        },
        {
          title: 'Conteudo sem foco em decisor tecnico',
          description: 'Nao responde as perguntas de CTO e TI.',
        },
      ],
    },
    personas: {
      title: 'Personas alvo',
      items: [
        'CTO avaliando arquitetura e escalabilidade',
        'Engenharia validando stack e integracoes',
        'Product lead buscando time tecnico confiavel',
        'Compras comparando fornecedores de tecnologia',
      ],
    },
    intents: {
      title: 'Intencoes de busca',
      items: [
        'informacional: como escolher stack para produto',
        'comparativa: melhor parceiro tecnico para IA',
        'comercial: desenvolvimento com IA e cloud',
        'transacional: contratar time para build e escalacao',
      ],
    },
    methodology: {
      title: 'Metodo em 8 etapas para autoridade tecnica',
      steps: [
        'Diagnostico da stack e objetivos do produto',
        'Mapeamento de personas tecnicas',
        'Pesquisa de intencoes e termos de engenharia',
        'Clusters por tecnologia e uso',
        'Paginas por solucao e benchmark',
        'Interligacao com cases e metricas',
        'SEO tecnico e padronizacao semantica',
        'Otimizacao para motores de IA',
      ],
    },
    deliverables: {
      title: 'Entregaveis para Tech',
      items: [
        'Mapa de conteudo por tecnologia',
        'Paginas de arquitetura e benchmarks',
        'Schema e SEO tecnico por pagina',
        'Plano de expansao por stack e produto',
      ],
    },
    clusters: {
      title: 'Clusters recomendados para Tech',
      items: [
        {
          title: 'Arquitetura e escalabilidade',
          description: 'Stack, performance e resiliencia.',
          key: 'solutions',
        },
        {
          title: 'IA aplicada e dados',
          description: 'Modelos, pipelines e governanca.',
          key: 'tech',
        },
        {
          title: 'Metodo e entrega',
          description: 'Processo, qualidade e confiabilidade.',
          key: 'methodology',
        },
        {
          title: 'Cases tecnicos',
          description: 'Resultados e provas de execucao.',
          key: 'projects',
        },
      ],
    },
    faq: {
      title: 'Perguntas frequentes',
      items: [
        {
          q: 'Esse plano ajuda a explicar a arquitetura?',
          a: 'Sim. Criamos paginas e provas tecnicas por stack.',
        },
        {
          q: 'Como voce trata seguranca e compliance?',
          a: 'Incluimos conteudo tecnico e governanca no cluster.',
        },
        {
          q: 'Precisa de documentacao existente?',
          a: 'Nao. Produzimos do zero com o time.',
        },
      ],
    },
    cta: {
      title: 'Vamos estruturar sua autoridade tecnica',
      text: 'Receba um plano de conteudo e SEO focado em decisores tecnicos.',
      button: 'Agendar diagnostico',
    },
  },
  en: {
    title: 'Tech | Collaby.t',
    description:
      'Content architecture and SEO for technology with focus on modern stacks, applied AI and reliability.',
    hero: {
      eyebrow: 'Tech Lab',
      heading: 'Tech: architecture, applied AI and modern stack',
      subheading:
        'We structure technical content to prove capability, speed decisions and generate qualified demand.',
      ctaPrimary: 'Talk to a specialist',
      ctaSecondary: 'View solutions',
    },
    painPoints: {
      title: 'Key technical discovery blockers',
      items: [
        {
          title: 'Architecture not explicit',
          description: 'The market cannot see how robust the solution is.',
        },
        {
          title: 'Low technical proof',
          description: 'Missing data and performance benchmarks.',
        },
        {
          title: 'Content not built for technical buyers',
          description: 'Does not answer CTO and IT questions.',
        },
      ],
    },
    personas: {
      title: 'Target personas',
      items: [
        'CTO evaluating architecture and scalability',
        'Engineering validating stack and integrations',
        'Product lead looking for a reliable tech team',
        'Procurement comparing technology vendors',
      ],
    },
    intents: {
      title: 'Search intents',
      items: [
        'informational: how to choose a product stack',
        'comparative: best technical partner for AI',
        'commercial: AI and cloud development',
        'transactional: hire a team to build and scale',
      ],
    },
    methodology: {
      title: '8-step method to build technical authority',
      steps: [
        'Stack diagnosis and product goals',
        'Technical persona mapping',
        'Intent research and engineering terms',
        'Clusters by tech and use case',
        'Pages by solution and benchmark',
        'Linking to cases and metrics',
        'Technical SEO and semantic standards',
        'AI discovery optimization',
      ],
    },
    deliverables: {
      title: 'Tech deliverables',
      items: [
        'Content map by technology',
        'Architecture and benchmark pages',
        'Schema and technical SEO per page',
        'Expansion plan by stack and product',
      ],
    },
    clusters: {
      title: 'Recommended clusters for Tech',
      items: [
        {
          title: 'Architecture and scalability',
          description: 'Stack, performance and resilience.',
          key: 'solutions',
        },
        {
          title: 'Applied AI and data',
          description: 'Models, pipelines and governance.',
          key: 'tech',
        },
        {
          title: 'Method and delivery',
          description: 'Process, quality and reliability.',
          key: 'methodology',
        },
        {
          title: 'Technical cases',
          description: 'Results and execution proof.',
          key: 'projects',
        },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Does this help explain architecture?',
          a: 'Yes. We create technical pages per stack and proof.',
        },
        {
          q: 'How do you handle security and compliance?',
          a: 'We add governance and technical proof to the cluster.',
        },
        {
          q: 'Do you need existing documentation?',
          a: 'No. We can build it from scratch with your team.',
        },
      ],
    },
    cta: {
      title: 'Lets build your technical authority',
      text: 'Get a content and SEO plan focused on technical buyers.',
      button: 'Schedule a diagnosis',
    },
  },
} as const;

const TechLabPage: React.FC<TechLabPageProps> = ({ locale }) => {
  const { setLanguage } = useLanguage();
  const dictionary = content[locale];
  const htmlLang = localeToHtmlLang(locale);
  const path = buildTechLabPath(locale);
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
            ? 'Arquitetura de tecnologia e IA aplicada'
            : 'Technology architecture and applied AI',
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
            name: locale === 'pt-br' ? 'Inicio' : 'Home',
            item: canonicalFromPath(`/${locale}`),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tech',
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
              <Cpu className="w-4 h-4" />
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
                    <Shield className="w-5 h-5" />
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
              <Database className="w-5 h-5" />
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
              <Cloud className="w-5 h-5" />
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

export default TechLabPage;
