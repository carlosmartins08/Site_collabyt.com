import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Layers,
  Sparkles,
  Target,
  Users,
  Zap,
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
  buildStartupsPath,
  canonicalFromPath,
  localeToAppLanguage,
  localeToHtmlLang,
} from '../siteConfig';

type StartupsPageProps = {
  locale: SiteLocale;
};

const content = {
  'pt-br': {
    title: 'Startups | Collaby.t',
    description:
      'Arquitetura de conteudo e SEO para startups que precisam de tracao, clareza de posicionamento e demanda qualificada.',
    hero: {
      eyebrow: 'Conteudo e SEO para Startups',
      heading: 'Startups: MVP, IA aplicada e crescimento com foco em tracao',
      subheading:
        'Transformamos sua pagina principal em um ecossistema de conteudo que gera demanda, prova autoridade e acelera validacao.',
      ctaPrimary: 'Falar com especialista',
      ctaSecondary: 'Ver solucoes',
    },
    painPoints: {
      title: 'O que trava a descoberta de startups',
      items: [
        {
          title: 'Baixa clareza de proposta',
          description: 'O publico nao entende rapido o que voce resolve.',
        },
        {
          title: 'Falta de paginas por intencao',
          description: 'Tudo esta em uma pagina e o Google nao sabe ranquear.',
        },
        {
          title: 'Pouca prova de capacidade',
          description: 'Sem cases e dados, a confianca nao escala.',
        },
      ],
    },
    personas: {
      title: 'Personas alvo',
      items: [
        'Fundador em pre-seed buscando validacao',
        'Product lead comparando parceiros tecnicos',
        'CTO avaliando arquitetura e time',
        'Investidor analisando sinais de tracao',
      ],
    },
    intents: {
      title: 'Intencoes de busca',
      items: [
        'informacional: como validar MVP',
        'comparativa: melhor parceiro tecnico para startup',
        'comercial: consultoria de MVP e IA aplicada',
        'transacional: contratar equipe para construir MVP',
      ],
    },
    methodology: {
      title: 'Metodo em 8 etapas para gerar tracao organica',
      steps: [
        'Interpretacao do negocio e diferenciais',
        'Mapeamento de personas e maturidade',
        'Levantamento de intencoes de busca',
        'Definicao de clusters de conteudo',
        'Criacao de paginas complementares',
        'Estrategia de hiperlinks internos',
        'Coerencia narrativa e semantica',
        'Otimizacao para motores de IA',
      ],
    },
    deliverables: {
      title: 'Entregaveis para startups',
      items: [
        'Mapa de clusters e paginas prioritarias',
        'Wireframe e copy orientados a conversao',
        'SEO tecnico + schema por pagina',
        'Plano de expansao de conteudo',
      ],
    },
    clusters: {
      title: 'Clusters recomendados para Startups',
      items: [
        {
          title: 'MVP e validacao rapida',
          description: 'Paginas que respondem a busca por MVP e testes de mercado.',
          key: 'solutions',
        },
        {
          title: 'IA aplicada e automacao',
          description: 'Casos de uso claros e resultados mensuraveis.',
          key: 'tech',
        },
        {
          title: 'Metodologia e processo',
          description: 'Como reduzimos risco e aceleramos entrega.',
          key: 'methodology',
        },
        {
          title: 'Cases e provas',
          description: 'Resultados reais para construir confianca.',
          key: 'projects',
        },
      ],
    },
    faq: {
      title: 'Perguntas frequentes',
      items: [
        {
          q: 'Em quanto tempo esse plano gera impacto?',
          a: 'Normalmente entre 4 e 8 semanas para indexacao e sinais iniciais.',
        },
        {
          q: 'Preciso criar varias paginas de uma vez?',
          a: 'Nao. Priorizamos as paginas com maior impacto e expandimos por ciclos.',
        },
        {
          q: 'Isso substitui anuncios pagos?',
          a: 'Nao. Complementa e reduz custo por lead ao longo do tempo.',
        },
      ],
    },
    cta: {
      title: 'Vamos destravar a descoberta da sua startup',
      text: 'Receba um diagnostico de cluster, paginas prioritarias e plano de execucao.',
      button: 'Agendar diagnostico',
    },
  },
  en: {
    title: 'Startups | Collaby.t',
    description:
      'Content architecture and SEO for startups that need traction, clear positioning and qualified demand.',
    hero: {
      eyebrow: 'Content and SEO for Startups',
      heading: 'Startups: MVP, applied AI and growth with traction in mind',
      subheading:
        'We turn your main page into a content ecosystem that generates demand, proves authority and speeds up validation.',
      ctaPrimary: 'Talk to a specialist',
      ctaSecondary: 'View solutions',
    },
    painPoints: {
      title: 'What blocks startup discovery',
      items: [
        {
          title: 'Unclear value proposition',
          description: 'Your audience cannot tell fast what you solve.',
        },
        {
          title: 'No pages by intent',
          description: 'Everything is on one page and Google cannot rank well.',
        },
        {
          title: 'Low proof of capability',
          description: 'Without cases and data, trust does not scale.',
        },
      ],
    },
    personas: {
      title: 'Target personas',
      items: [
        'Founder in pre-seed looking for validation',
        'Product lead comparing technical partners',
        'CTO evaluating architecture and team',
        'Investor scanning traction signals',
      ],
    },
    intents: {
      title: 'Search intents',
      items: [
        'informational: how to validate an MVP',
        'comparative: best technical partner for startups',
        'commercial: MVP and applied AI consulting',
        'transactional: hire a team to build an MVP',
      ],
    },
    methodology: {
      title: '8-step method to unlock organic traction',
      steps: [
        'Business interpretation and differentiation',
        'Persona and maturity mapping',
        'Search intent discovery',
        'Content cluster definition',
        'Supporting page creation',
        'Internal linking strategy',
        'Narrative and semantic consistency',
        'AI discovery optimization',
      ],
    },
    deliverables: {
      title: 'Startup deliverables',
      items: [
        'Cluster map and priority pages',
        'Wireframe and conversion copy',
        'Technical SEO + schema per page',
        'Content expansion roadmap',
      ],
    },
    clusters: {
      title: 'Recommended clusters for Startups',
      items: [
        {
          title: 'MVP and fast validation',
          description: 'Pages answering MVP and market test queries.',
          key: 'solutions',
        },
        {
          title: 'Applied AI and automation',
          description: 'Clear use cases and measurable outcomes.',
          key: 'tech',
        },
        {
          title: 'Method and process',
          description: 'How we reduce risk and speed delivery.',
          key: 'methodology',
        },
        {
          title: 'Cases and proof',
          description: 'Real results to build trust.',
          key: 'projects',
        },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'How fast does this plan show impact?',
          a: 'Usually 4 to 8 weeks for indexing and early signals.',
        },
        {
          q: 'Do I need many pages at once?',
          a: 'No. We prioritize the highest impact pages and expand in cycles.',
        },
        {
          q: 'Does this replace paid ads?',
          a: 'No. It complements them and lowers cost per lead over time.',
        },
      ],
    },
    cta: {
      title: 'Lets unlock discovery for your startup',
      text: 'Get a cluster diagnosis, priority pages and an execution plan.',
      button: 'Schedule a diagnosis',
    },
  },
} as const;

const StartupsPage: React.FC<StartupsPageProps> = ({ locale }) => {
  const { setLanguage } = useLanguage();
  const dictionary = content[locale];
  const htmlLang = localeToHtmlLang(locale);
  const path = buildStartupsPath(locale);
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
            ? 'Arquitetura de conteudo e SEO para startups'
            : 'Content architecture and SEO for startups',
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
            name: 'Startups',
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
              <Sparkles className="w-4 h-4" />
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
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
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
              <Users className="w-5 h-5" />
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
              <Zap className="w-5 h-5" />
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

export default StartupsPage;
