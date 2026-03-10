import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Meta from './Meta';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import type { DefaultLang, Translations } from '../translations';
import {
  SiteLocale,
  buildAlternateLinks,
  buildProjectPath,
  buildSectionPath,
  canonicalFromPath,
  localeToAppLanguage,
  localeToHtmlLang,
} from '../siteConfig';

type ProjectDetailProps = {
  locale: SiteLocale;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ locale }) => {
  const { id } = useParams();
  const { language, setLanguage } = useLanguage();
  const pid = Number(id);
  const htmlLang = localeToHtmlLang(locale);

  useEffect(() => {
    setLanguage(localeToAppLanguage(locale));
  }, [locale, setLanguage]);

  type ProjectItem = Translations[DefaultLang]['projects']['items'][number];
  const projects = ((translations as Translations)[language]?.projects?.items ?? []) as ProjectItem[];
  const project = projects.find((p) => Number(p.id) === pid);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">
            {locale === 'pt-br' ? 'Projeto não encontrado' : 'Project not found'}
          </h1>
          <p className="mb-6 text-slate-400">
            {locale === 'pt-br'
              ? 'O projeto solicitado não existe ou foi removido.'
              : 'The requested project does not exist or was removed.'}
          </p>
          <Link to={buildSectionPath(locale, 'projects')} className="text-brandOrange font-bold">
            {locale === 'pt-br' ? 'Voltar para o catálogo' : 'Back to catalog'}
          </Link>
        </div>
      </div>
    );
  }

  const path = buildProjectPath(locale, project.id);
  const canonical = canonicalFromPath(path);
  const alternates = buildAlternateLinks(path);
  const catalogPath = buildSectionPath(locale, 'projects');

  const structuredData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        inLanguage: htmlLang,
        url: canonical,
        image: project.image,
        creator: {
          '@type': 'Organization',
          name: 'Collaby.t',
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
            name: locale === 'pt-br' ? 'Projetos' : 'Projects',
            item: canonicalFromPath(catalogPath),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: canonical,
          },
        ],
      },
    ],
    [canonical, catalogPath, htmlLang, locale, project.description, project.image, project.title]
  );

  return (
    <div className="min-h-screen bg-brandBlack text-slate-200 py-16 px-4">
      <Meta
        title={`${project.title} | Collaby.t`}
        description={project.description}
        url={canonical}
        canonical={canonical}
        image={project.image}
        lang={htmlLang}
        alternates={alternates}
        structuredData={structuredData}
      />

      <div className="max-w-5xl mx-auto bg-[#0B0B0B] rounded-2xl overflow-hidden border border-white/5 shadow-lg">
        <div className="w-full h-80 relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            width="1200"
            height="800"
            decoding="async"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-brandOrange font-mono text-xs uppercase tracking-widest">
                {project.category}
              </span>
              <h1 className="text-4xl font-extrabold mt-2">{project.title}</h1>
              <p className="text-slate-400 mt-2">{project.impact}</p>
            </div>
            <div className="text-right">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brandOrange text-black px-4 py-2 rounded-full font-bold"
              >
                {locale === 'pt-br' ? 'Abrir site' : 'Open website'}
              </a>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed mb-6">{project.description}</p>

          <h2 className="text-white font-bold mb-3">Stack</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((s: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-white/5 rounded text-sm font-mono">
                {s}
              </span>
            ))}
          </div>

          <Link to={catalogPath} className="text-slate-400 hover:text-white">
            {locale === 'pt-br' ? 'Voltar ao catálogo' : 'Back to catalog'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
