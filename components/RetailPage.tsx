import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  ShoppingBag,
  Layers,
  TrendingUp,
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
  buildRetailPath,
  buildSectionPath,
  canonicalFromPath,
  localeToAppLanguage,
  localeToHtmlLang,
} from '../siteConfig';

type RetailPageProps = {
  locale: SiteLocale;
};

const content = {
  'pt-br': {
    title: 'Varejo | Collaby.t',
    description:
      'Arquitetura de Conteúdo e SEO para varejo que busca conversão, omnichannel e crescimento sustentável.',
    hero: {
      eyebrow: 'Conteúdo e SEO para Varejo',
      heading: 'Varejo: experiência de compra, conversão e escala',
      subheading:
        'Criamos um ecossistema de Conteúdo que aumenta descoberta, reduz custo de aquisição e prova valor comercial.',
      ctaPrimary: 'Falar com especialista',
      ctaSecondary: 'Ver soluções',
    },
    painPoints: {
      title: 'Principais desafios do varejo na busca orgânica',
      items: [
        {
          title: 'Baixa conversão em canais digitais',
          description: 'O tráfego chega, mas não se transforma em receita.',
        },
        {
          title: 'Pouca integração omnichannel',
          description: 'A experiência entre loja fisica e digital e inconsistente.',
        },
        {
          title: 'Conteúdo sem foco em intenção',
          description: 'Páginas não respondem as perguntas certas do cliente.',
        },
      ],
    },
    personas: {
      title: 'Personas alvo',
      items: [
        'Diretor de e-commerce buscando aumento de conversão',
        'CMO avaliando CAC e posicionamento',
        'Time de tecnologia integrando canais e dados',
        'Compras comparando fornecedores de plataforma',
      ],
    },
    intents: {
      title: 'intenções de busca',
      items: [
        'informacional: como aumentar conversão no varejo',
        'comparativa: melhor plataforma omnichannel',
        'comercial: consultoria de e-commerce e IA aplicada',
        'transacional: contratar time para evoluir loja digital',
      ],
    },
    methodology: {
      title: 'Método em 8 etapas para escalar o varejo digital',
      steps: [
        'Diagnóstico de funil e canais',
        'Mapeamento de personas e jornada',
        'Pesquisa de intenções e categorias',
        'Clusters por linhas e ofertas',
        'Páginas por solucao e campanha',
        'Interligação com provas e cases',
        'SEO técnico e performance',
        'Otimização para motores de IA',
      ],
    },
    deliverables: {
      title: 'Entregáveis para varejo',
      items: [
        'Mapa de Conteúdo por categoria e jornada',
        'Pilares de conversão e omnichannel',
        'Schema e SEO técnico por página',
        'Plano de expansão por coleção/linha',
      ],
    },
    clusters: {
      title: 'Clusters recomendados para Varejo',
      items: [
        {
          title: 'conversão e performance',
          description: 'Otimização de funil e jornada de compra.',
          key: 'solutions',
        },
        {
          title: 'Dados e personalizacao',
          description: 'IA aplicada para recomendacao e CRM.',
          key: 'tech',
        },
        {
          title: 'Método e operação',
          description: 'Processos, testes e governança.',
          key: 'methodology',
        },
        {
          title: 'Cases de varejo',
          description: 'Resultados reais e impacto comercial.',
          key: 'projects',
        },
      ],
    },
    faq: {
      title: 'Perguntas frequentes',
      items: [
        {
          q: 'Esse plano ajuda no omnichannel?',
          a: 'Sim, estruturamos Páginas e dados para integrar canais.',
        },
        {
          q: 'Quanto tempo para melhorar conversão?',
          a: 'Normalmente 4 a 8 semanas para sinais iniciais.',
        },
        {
          q: 'Preciso trocar minha plataforma?',
          a: 'não. O plano se adapta ao stack atual.',
        },
      ],
    },
    cta: {
      title: 'Vamos destravar conversão no varejo',
      text: 'Receba um plano de Conteúdo e SEO alinhado a receita.',
      button: 'Agendar Diagnóstico',
    },
  },
  en: {
    title: 'Retail | Collaby.t',
    description:
      'Content architecture and SEO for retail teams that want conversion, omnichannel and sustainable growth.',
    hero: {
      eyebrow: 'Content and SEO for Retail',
      heading: 'Retail: shopping experience, conversion and scale',
      subheading:
        'We build a content ecosystem that increases discovery, lowers CAC and proves commercial value.',
      ctaPrimary: 'Talk to a specialist',
      ctaSecondary: 'View solutions',
    },
    painPoints: {
      title: 'Key retail blockers in organic search',
      items: [
        {
          title: 'Low conversion in digital channels',
          description: 'Traffic arrives but does not turn into revenue.',
        },
        {
          title: 'Weak omnichannel integration',
          description: 'The experience across physical and digital is inconsistent.',
        },
        {
          title: 'Content without intent focus',
          description: 'Pages do not answer the right customer questions.',
        },
      ],
    },
    personas: {
      title: 'Target personas',
      items: [
        'E-commerce director focused on conversion lift',
        'CMO evaluating CAC and positioning',
        'Tech team integrating channels and data',
        'Procurement comparing platform vendors',
      ],
    },
    intents: {
      title: 'Search intents',
      items: [
        'informational: how to increase retail conversion',
        'comparative: best omnichannel platform',
        'commercial: e-commerce consulting and applied AI',
        'transactional: hire a team to evolve digital store',
      ],
    },
    methodology: {
      title: '8-step method to scale digital retail',
      steps: [
        'Funnel and channel diagnosis',
        'Persona and journey mapping',
        'Intent research and categories',
        'Clusters by product lines',
        'Pages by solution and campaign',
        'Linking to proof and cases',
        'Technical SEO and performance',
        'AI discovery optimization',
      ],
    },
    deliverables: {
      title: 'Retail deliverables',
      items: [
        'Content map by category and journey',
        'Conversion and omnichannel pillars',
        'Schema and technical SEO per page',
        'Expansion plan by collection/line',
      ],
    },
    clusters: {
      title: 'Recommended clusters for Retail',
      items: [
        {
          title: 'Conversion and performance',
          description: 'Funnel optimization and shopping journey.',
          key: 'solutions',
        },
        {
          title: 'Data and personalization',
          description: 'Applied AI for recommendations and CRM.',
          key: 'tech',
        },
        {
          title: 'Method and operations',
          description: 'Process, testing and governance.',
          key: 'methodology',
        },
        {
          title: 'Retail cases',
          description: 'Real results and commercial impact.',
          key: 'projects',
        },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Does this plan help omnichannel?',
          a: 'Yes, we structure pages and data to integrate channels.',
        },
        {
          q: 'How fast does conversion improve?',
          a: 'Usually 4 to 8 weeks for early signals.',
        },
        {
          q: 'Do we need to change our platform?',
          a: 'No. The plan adapts to your current stack.',
        },
      ],
    },
    cta: {
      title: 'Lets unlock retail conversion',
      text: 'Get a content and SEO plan aligned to revenue.',
      button: 'Schedule a diagnosis',
    },
  },
} as const;

const RetailPage: React.FC<RetailPageProps> = ({ locale }) => {
  const { setLanguage } = useLanguage();
  const dictionary = content[locale];
  const htmlLang = localeToHtmlLang(locale);
  const path = buildRetailPath(locale);
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
            ? 'E-commerce, omnichannel e crescimento no varejo'
            : 'E-commerce, omnichannel and retail growth',
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
            name: locale === 'pt-br' ? 'Varejo' : 'Retail',
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
              <ShoppingBag className="w-4 h-4" />
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
                    <TrendingUp className="w-5 h-5" />
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

export default RetailPage;




