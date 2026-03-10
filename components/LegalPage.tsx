import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Meta from './Meta';
import {
  SiteLocale,
  buildAlternateLinks,
  buildLegalPath,
  canonicalFromPath,
} from '../siteConfig';

type LegalPageProps = {
  locale: SiteLocale;
  type: 'privacy' | 'terms';
};

const copy = {
  'pt-br': {
    privacy: {
      title: 'Política de Privacidade | Collaby.t',
      description:
        'Política de privacidade da Collaby.t com diretrizes de tratamento de dados e conformidade LGPD.',
      heading: 'Política de Privacidade',
      updated: 'Última atualização: 10 de março de 2026',
      sections: [
        {
          title: '1. Dados coletados',
          body:
            'Coletamos dados fornecidos diretamente por você (nome, e-mail, contexto do projeto) e dados técnicos necessários para segurança e melhoria da experiência.',
        },
        {
          title: '2. Finalidade',
          body:
            'Os dados são tratados para atendimento comercial solicitado, execução de serviços, prevenção de abuso e melhoria contínua do site e dos fluxos de contato.',
        },
        {
          title: '3. Compartilhamento',
          body:
            'Compartilhamos dados apenas com operadores essenciais para hospedagem, comunicação e automação de atendimento, sob cláusulas de proteção de dados.',
        },
        {
          title: '4. Direitos do titular',
          body:
            'Você pode solicitar acesso, correção, portabilidade, anonimização ou exclusão de dados, conforme os limites legais aplicáveis.',
        },
      ],
    },
    terms: {
      title: 'Termos de Uso | Collaby.t',
      description:
        'Termos de uso da Collaby.t para acesso ao site, uso de conteúdo e limitações de responsabilidade.',
      heading: 'Termos de Uso',
      updated: 'Última atualização: 10 de março de 2026',
      sections: [
        {
          title: '1. Uso do site',
          body:
            'O uso do site deve respeitar a legislação vigente e não pode comprometer disponibilidade, segurança ou integridade dos sistemas.',
        },
        {
          title: '2. Propriedade intelectual',
          body:
            'Conteúdo, identidade visual, documentação e ativos de software exibidos no site são protegidos por direitos autorais e marcas.',
        },
        {
          title: '3. Limitações',
          body:
            'As informações disponibilizadas têm caráter informativo e podem ser atualizadas sem aviso prévio, de acordo com a evolução dos serviços.',
        },
        {
          title: '4. Contato legal',
          body:
            'Para temas jurídicos ou de proteção de dados, entre em contato por privacidade@collabyt.com.br.',
        },
      ],
    },
    home: 'Início',
    privacyLabel: 'Política de Privacidade',
    termsLabel: 'Termos de Uso',
  },
  en: {
    privacy: {
      title: 'Privacy Policy | Collaby.t',
      description:
        'Collaby.t privacy policy covering data processing practices and compliance principles.',
      heading: 'Privacy Policy',
      updated: 'Last update: March 10, 2026',
      sections: [
        {
          title: '1. Data we collect',
          body:
            'We collect data you provide directly (name, email, project context) and technical data required for security and user experience improvements.',
        },
        {
          title: '2. Purpose',
          body:
            'Data is processed for requested commercial contact, service execution, abuse prevention and continuous website improvement.',
        },
        {
          title: '3. Sharing',
          body:
            'We only share data with essential operators for hosting, communication and contact automation under data protection clauses.',
        },
        {
          title: '4. Data subject rights',
          body:
            'You may request access, correction, portability, anonymization or deletion according to applicable legal boundaries.',
        },
      ],
    },
    terms: {
      title: 'Terms of Use | Collaby.t',
      description:
        'Collaby.t terms of use for website access, content usage and liability boundaries.',
      heading: 'Terms of Use',
      updated: 'Last update: March 10, 2026',
      sections: [
        {
          title: '1. Website usage',
          body:
            'The website must be used in compliance with applicable law and without affecting system integrity, security or availability.',
        },
        {
          title: '2. Intellectual property',
          body:
            'Content, visual identity, documentation and software assets shown on the website are protected by copyright and trademark laws.',
        },
        {
          title: '3. Limitations',
          body:
            'Information available on the website is informative in nature and may be updated without prior notice as services evolve.',
        },
        {
          title: '4. Legal contact',
          body:
            'For legal and data protection requests, contact privacidade@collabyt.com.br.',
        },
      ],
    },
    home: 'Home',
    privacyLabel: 'Privacy Policy',
    termsLabel: 'Terms of Use',
  },
} as const;

const LegalPage: React.FC<LegalPageProps> = ({ locale, type }) => {
  const dictionary = copy[locale];
  const page = dictionary[type];
  const path = buildLegalPath(locale, type === 'privacy' ? 'privacy-policy' : 'terms');
  const canonical = canonicalFromPath(path);
  const alternates = buildAlternateLinks(path);
  const htmlLang = locale === 'pt-br' ? 'pt-BR' : 'en';

  const structuredData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: canonical,
        inLanguage: htmlLang,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: dictionary.home,
            item: canonicalFromPath(`/${locale}`),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: type === 'privacy' ? dictionary.privacyLabel : dictionary.termsLabel,
            item: canonical,
          },
        ],
      },
    ],
    [canonical, dictionary.home, dictionary.privacyLabel, dictionary.termsLabel, htmlLang, locale, page.description, page.title, type]
  );

  return (
    <div className="min-h-screen bg-brandBlack text-slate-200 py-16 px-4">
      <Meta
        title={page.title}
        description={page.description}
        lang={htmlLang}
        canonical={canonical}
        url={canonical}
        alternates={alternates}
        structuredData={structuredData}
      />

      <main className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{page.heading}</h1>
          <p className="text-slate-400">{page.updated}</p>
        </header>

        <article className="space-y-8 bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 md:p-8">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold text-white mb-2">{section.title}</h2>
              <p className="text-slate-300 leading-relaxed">{section.body}</p>
            </section>
          ))}
        </article>

        <div className="mt-8 flex gap-4 text-sm">
          <Link to={buildLegalPath(locale, 'privacy-policy')} className="text-brandOrange hover:underline">
            {dictionary.privacyLabel}
          </Link>
          <Link to={buildLegalPath(locale, 'terms')} className="text-brandOrange hover:underline">
            {dictionary.termsLabel}
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LegalPage;

