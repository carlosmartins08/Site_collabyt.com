import React from 'react';
import { Helmet } from 'react-helmet-async';

type AlternateLink = {
  hrefLang: string;
  href: string;
};

type MetaProps = {
  title?: string;
  description?: string;
  url?: string;
  canonical?: string;
  image?: string;
  lang?: string;
  robots?: string;
  alternates?: AlternateLink[];
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const Meta: React.FC<MetaProps> = ({
  title,
  description,
  url,
  canonical,
  image,
  lang = 'pt-BR',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates = [],
  structuredData,
}) => {
  const defaultTitle = 'Collaby.t | Innovation Studio - MVPs, IA Generativa & Venture Building';
  const defaultDescription =
    'Innovation Studio especializado em desenvolvimento de MVPs, IA Generativa e Venture Building. Transformamos estratégias complexas em produtos digitais escaláveis e de alta performance.';
  const siteUrl = url || 'https://collabyt.com/';
  const img = image || 'https://collabyt.com/og-image.jpg';
  const schemas = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="robots" content={robots} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {alternates.map((alternate) => (
        <link
          key={`${alternate.hrefLang}-${alternate.href}`}
          rel="alternate"
          hrefLang={alternate.hrefLang}
          href={alternate.href}
        />
      ))}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'pt-BR' ? 'pt_BR' : 'en_US'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={img} />
      {schemas.map((schema, index) => (
        <script key={`ld-json-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Meta;

