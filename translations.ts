
export const translations = {
  meta: {
    home: {
      title: 'Collaby.t | Innovation Studio - Inove com IA & MVPs',
      description: 'Estúdio de inovação especializado em MVPs e IA generativa — transformamos ideias em produtos escaláveis.'
    },
    solutions: {
      title: 'Soluções — Collaby.t',
      description: 'Soluções para indústrias, startups e varejo com IA e tecnologia de ponta.'
    },
    methodology: {
      title: 'Metodologia — Collaby.t',
      description: 'Nossa abordagem de discovery, prototipagem e entrega contínua para reduzir riscos e acelerar resultados.'
    },
    projects: {
      title: 'Projetos — Collaby.t',
      description: 'Portfólio de MVPs e soluções desenvolvidas com foco em impacto e escalabilidade.'
    },
    about: {
      title: 'Sobre — Collaby.t',
      description: 'Conheça nossa equipe, missão e experiência em construir produtos digitais.'
    },
    tech: {
      title: 'Tech — Collaby.t',
      description: 'Tendências tecnológicas e aplicações de IA generativa para produtos digitais.'
    }
  },
  pt: {
    nav: {
      home: "Início",
      solutions: "Soluções",
      methodology: "Método",
      projects: "Projetos",
      about: "Sobre",
      tech: "Tech",
      diagnosis: "Diagnóstico",
      contact: "Contato"
    },
    hero: {
      badge: "Acelerado pelo programa Centelha I",
      titlePre: "Transforme Ideias em",
      titlePost: "Soluções Reais.",
      subtitle: "Conectamos inovação, estratégia e desenvolvimento de ponta para tirar seus projetos do papel com inteligência e escalabilidade.",
      cta_diagnosis: "Solicite um Diagnóstico",
      cta_portfolio: "Veja o que resolvemos",
      explore: "Explore"
    },
    painPoints: {
      title: "Você se identifica com isso?",
      subtitle: "Muitos projetos inovadores morrem na gaveta por falta de execução técnica ou estratégia clara. Não deixe o seu ser um deles.",
      points: [
        { q: "Sua ideia está parada há meses?", a: "Nós desbloqueamos o desenvolvimento com metodologias ágeis e MVPs rápidos." },
        { q: "Medo de investir em tecnologia errada?", a: "Realizamos diagnósticos técnicos profundos para escolher a arquitetura ideal." },
        { q: "Precisa escalar, mas o sistema travou?", a: "Refatoramos e preparamos sua infraestrutura para suportar alto volume de usuários." },
        { q: "Falta time especializado?", a: "Atuamos como seu braço de tecnologia on-demand, sem o custo fixo de contratação." }
      ]
    },
    solutions: {
      title: "O Que Resolvemos Para Você",
      subtitle: "Soluções adaptadas ao estágio e necessidade do seu negócio.",
      tabs: {
        startups: "Startups",
        industries: "Indústrias",
        retail: "Varejo",
        niche: "Nichos"
      },
      items: {
        startups: {
          title: 'Do Zero ao MVP em Tempo Recorde',
          description: 'Transformamos rascunhos em produtos digitais funcionais prontos para validação de mercado e captação de investimento.',
          benefits: ['Prototipagem em alta fidelidade', 'Desenvolvimento Ágil e Lean', 'Arquitetura preparada para escala'],
          caseTitle: 'Fintech App',
          caseDesc: 'Tempo total entre a concepção e o lançamento na loja de aplicativos.'
        },
        industries: {
          title: 'Transformação Digital e Indústria 4.0',
          description: 'Digitalizamos processos fabris, integramos IoT e criamos dashboards de gestão para aumentar a eficiência.',
          benefits: ['Integração com sensores IoT', 'Automação de Processos (RPA)', 'Redução de custos operacionais'],
          caseTitle: 'Fábrica Inteligente',
          caseDesc: 'Redução de desperdício de matéria-prima no primeiro trimestre.'
        },
        retail: {
          title: 'Experiências de Compra Fluidas',
          description: 'Criamos plataformas de e-commerce robustas e integradas que convertem visitantes em clientes fiéis.',
          benefits: ['Checkout Otimizado', 'Integração Omnichannel', 'UX/UI de Alta Conversão'],
          caseTitle: 'Marketplace B2B',
          caseDesc: 'Aumento na taxa de conversão após redesign da jornada do usuário.'
        },
        niche: {
          title: 'Soluções Sob Medida',
          description: 'Saúde, Educação ou Agronegócio. Adaptamos tecnologias emergentes para resolver dores específicas.',
          benefits: ['Conformidade Regulatória', 'Sistemas Customizados', 'Segurança de Dados Avançada'],
          caseTitle: 'EdTech Platform',
          caseDesc: 'Alunos ativos na plataforma nos primeiros 6 meses de operação.'
        },
      },
      cta: "Veja como podemos aplicar no seu caso",
      squad: "Squad Collaby.t dedicado",
      caseLabel: "Case de Sucesso"
    },
    projects: {
      title: "Arquivo de Inovação",
      subtitle: "Cada solução desenvolvida pela Collaby.t nasce de um desafio real e uma vontade enorme de transformar mercados.",
      filters: {
        all: "Todos",
        live: "Entregues (Live)",
        building: "Em Construção",
        scaling: "Escalando"
      },
      view: "Ver Case Online",
      items: [
        {
          id: 1,
          title: "Persona.app",
          category: "Healthtech",
          status: "scaling",
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
          description: "Plataforma de análise comportamental aplicada à saúde mental para conectar profissionais e pacientes via gamificação e dados.",
          stack: ["Engenharia de Dados", "UX Empática", "Gamificação"],
          impact: "Alta Retenção",
          link: "https://persona.app.br/"
        },
        {
          id: 2,
          title: "Econotrip",
          category: "Travel / AI",
          status: "live",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109c055?q=80&w=2070&auto=format&fit=crop",
          description: "Assistente de viagens com Inteligência Artificial focado em acessibilidade financeira e roteiros personalizados inteligentes.",
          stack: ["IA Generativa", "Finanças", "Arquitetura Cloud"],
          impact: "Roteiros Reais",
          link: "https://econotrip.com.br/"
        },
        {
          id: 3,
          title: "Alugue Temporada Maceió",
          category: "Proptech",
          status: "scaling",
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
          description: "Gestão inteligente de imóveis por temporada com foco em segurança jurídica e automação de repasses financeiros.",
          stack: ["Sistemas de Gestão", "Automação Financeira", "Data Analytics"],
          impact: "Valor Patrimonial",
          link: "https://alugueportemporadamaceio.com.br/"
        },
        {
          id: 4,
          title: "TAG08",
          category: "Design Strategy",
          status: "live",
          image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop",
          description: "Hub estratégico para modelagem de produtos digitais, transformando telas em ativos de negócio viáveis e escaláveis.",
          stack: ["Product Design", "Viabilidade de Negócio", "Prototipagem"],
          impact: "UX Estratégico",
          link: "https://tag08.com.br/"
        }
      ]
    },
    methodology: {
      title: "Como Trabalhamos",
      subtitle: "Metodologia proprietária focada em agilidade, transparência e resultado.",
      steps: [
        { title: "Imersão", desc: "Deep dive no seu negócio e dores." },
        { title: "Prototyping", desc: "Design visual para validar o concept." },
        { title: "Validação", desc: "Testes reais antes do código." },
        { title: "Build", desc: "Desenvolvimento robusto e escalável." },
        { title: "Evolução", desc: "Melhoria contínua baseada em dados." }
      ]
    },
    results: {
      label: "Resultados Reais",
      title: "Nós não vendemos código.\nVendemos impacto.",
      description: "A Collaby.t nasceu da necessidade de entregar tecnologia que move ponteiros de negócio. Nossos projetos são medidos por ROI, não por linhas de código.",
      stats: {
        delivered: "Projetos Entregues",
        nps: "Satisfação (NPS)"
      },
      techs: "Tecnologias & Parceiros",
      reviews: {
        google: "Ver no Google",
        readMore: "Clique para ler mais",
        close: "Fechar",
        items: [
           { role: "CEO, Fintech Startup", text: "A Collaby.t entendeu nosso modelo de negócio melhor do que qualquer outra consultoria. O MVP que entregaram nos permitiu captar nossa rodada Seed em tempo recorde." },
           { role: "Diretora de Inovação", text: "Profissionalismo impecável. A transformação digital da nossa fábrica reduziu custos operacionais em 25% já no primeiro trimestre. Recomendo fortemente." },
           { role: "Fundador, E-commerce B2B", text: "Equipe técnica de altíssimo nível. Resolveram gargalos de performance que travavam nosso crescimento há meses. O suporte pós-entrega também é excelente." }
        ]
      }
    },
    about: {
      title: "A Jornada Collaby.t",
      subtitle: "De uma ideia promissora à referência em inovação tecnológica.",
      timeline: [
        { year: "2020", title: "O Início como Personapp", desc: "Nascemos focados em personalização de apps, atendendo pequenas demandas locais com agilidade." },
        { year: "2022", title: "Aceleração Centelha", desc: "Nosso potencial tecnológico foi validado e acelerado pelo programa Centelha I." },
        { year: "2023", title: "Semifinalista Startup NE", desc: "Reconhecimento oficial pelo Sebrae como uma das startups de maior potencial do Nordeste." },
        { year: "HOJE", title: "Innovation Studio", desc: "Expandimos para a marca Collaby.t, unindo estratégia e engenharia de software de elite." }
      ],
      culture: {
        label: "Nossa Cultura",
        text: "\"Tecnologia complexa. Soluções simples. Impacto real.\""
      },
      team: {
        title: "Mentes por trás do código",
        subtitle: "Um squad multidisciplinar de alta performance, sincronizado para entregar valor.",
        linkedin: "Ver quadro completo de colaboradores no LinkedIn"
      }
    },
    tech: {
      label: "Innovation Lab",
      title: "Tecnologias que Dominamos",
      subtitle: "Não usamos tecnologia por hype. Usamos quando ela resolve um problema real de forma mais eficiente.",
      cta: "Ver stack completa",
      items: [
        { title: "IA Aplicada", desc: "Automação inteligente e análise preditiva.", impact: "Eficiência" },
        { title: "Blockchain", desc: "Segurança e transparência em transações.", impact: "Confiança" },
        { title: "IoT Industrial", desc: "Conexão de máquinas e sensores em tempo real.", impact: "Controle" },
        { title: "Plataformas", desc: "Ecossistemas digitais colaborativos.", impact: "Escala" },
        { title: "Green Tech", desc: "Soluções digitais com foco em sustentabilidade.", impact: "Futuro" }
      ],
      generate: "Gera"
    },
    faq: {
      title: "Perguntas Frequentes",
      subtitle: "Tiramos suas dúvidas antes mesmo de começarmos.",
      items: [
        {
          q: "Eu serei dono do código-fonte e da Propriedade Intelectual (PI)?",
          a: "Sim, absolutamente. Diferente de plataformas 'low-code' ou modelos de aluguel, na Collaby.t todo o código desenvolvido é 100% propriedade da sua empresa após a entrega final. Garantimos isso em contrato."
        },
        {
          q: "Vocês trabalham com manutenção pós-lançamento?",
          a: "Sim. Sabemos que o software é um organismo vivo. Oferecemos pacotes de sustentação (SLA), evolução contínua e suporte técnico para garantir que sua operação nunca pare."
        },
        {
          q: "Quanto tempo leva para desenvolver um MVP?",
          a: "Nossa metodologia Lean foca em velocidade. Tipicamente, entregamos MVPs funcionais entre 6 a 12 weeks, dependendo da complexidade, para que você possa validar sua ideia no mercado o mais rápido possível."
        },
        {
          q: "Vocês assinam Acordo de Confidencialidade (NDA)?",
          a: "Sim. A proteção da sua ideia e dos seus dados estratégicos é nossa prioridade. Assinamos NDAs antes mesmo da primeira reunião de imersão, se necessário."
        }
      ]
    },
    cookies: {
      title: "Sua privacidade importa",
      text: "Utilizamos cookies para melhorar sua experiência e analisar tráfego.",
      accept: "Aceitar Todos",
      decline: "Rejeitar",
      link: "Leia nossa Política"
    },
    contact: {
      title: "Vamos conversar?",
      subtitle: "Preencha o formulário e entraremos em contato em até 24h.",
      labels: {
        name: "Nome Completo",
        email: "E-mail Corporativo",
        challenge: "Qual seu principal desafio hoje?",
        message: "Mensagem (Opcional)",
        submit: "Solicitar Diagnóstico Gratuito",
        consentPre: "Li e concordo com a",
        privacyLink: "Política de Privacidade",
        consentPost: "e autorizo o contato."
      },
      placeholders: {
        name: "Seu nome",
        email: "voce@empresa.com",
        message: "Conte um pouco mais sobre o projeto..."
      },
      options: [
        "Tirar uma ideia do papel (MVP)",
        "Modernizar sistema legado",
        "Escalar equipe de tecnologia",
        "Consultoria estratégica / Inovação",
        "Outro"
      ]
    },
    footer: {
      tagline: "Somos um estúdio de inovação que conecta estratégia de negócios com engenharia de software de alta performance.",
      cols: {
        solutions: "Soluções",
        institutional: "Institucional",
        legal: "Legal"
      },
      links: {
        privacy: "Política de Privacidade",
        terms: "Termos de Uso",
        careers: "Carreiras"
      },
      rights: "Todos os direitos reservados.",
      made: "Feito com ❤ e código no Brasil."
    },
    cta_section: {
      title: "Inovação de verdade\nnão espera.",
      text: "Cada dia pode ser um dia a menos para sua ideia sair do papel. Vamos construir o futuro juntos?",
      btn_primary: "Solicite um Diagnóstico",
      btn_secondary: "Falar com Especialista"
    }
  },
  en: {
    nav: {
      home: "Home",
      solutions: "Solutions",
      methodology: "Method",
      projects: "Projects",
      about: "About",
      tech: "Tech",
      diagnosis: "Diagnosis",
      contact: "Contact"
    },
    hero: {
      badge: "Accelerated by Centelha I Program",
      titlePre: "Transform Ideas into",
      titlePost: "Real Solutions.",
      subtitle: "We connect innovation, strategy, and high-end development to bring your projects to life with intelligence and scalability.",
      cta_diagnosis: "Request a Diagnosis",
      cta_portfolio: "See what we solve",
      explore: "Explore"
    },
    painPoints: {
      title: "Does this sound like you?",
      subtitle: "Many innovative projects die in the drawer due to lack of technical execution or clear strategy. Don't let yours be one of them.",
      points: [
        { q: "Is your idea stuck for months?", a: "We unlock development with agile methodologies and fast MVPs." },
        { q: "Afraid of investing in wrong tech?", a: "We perform deep technical diagnostics to choose the ideal architecture." },
        { q: "Need to scale, but system crashed?", a: "We refactor and prepare your infrastructure to support high user volume." },
        { q: "Lacking specialized team?", a: "We act as your on-demand technology arm, without the fixed cost of hiring." }
      ]
    },
    solutions: {
      title: "What We Solve For You",
      subtitle: "Solutions adapted to the stage and needs of your business.",
      tabs: {
        startups: "Startups",
        industries: "Industries",
        retail: "Retail",
        niche: "Niches"
      },
      items: {
        startups: {
          title: 'From Zero to MVP in Record Time',
          description: 'We turn drafts into functional digital products ready for market validation and investment fundraising.',
          benefits: ['High-fidelity prototyping', 'Agile and Lean Development', 'Architecture prepared for scale'],
          caseTitle: 'Fintech App',
          caseDesc: 'Total time between conception and app store launch.'
        },
        industries: {
          title: 'Digital Transformation & Industry 4.0',
          description: 'We digitize factory processes, integrate IoT, and create management dashboards to increase efficiency.',
          benefits: ['IoT Sensor Integration', 'Process Automation (RPA)', 'Operational cost reduction'],
          caseTitle: 'Smart Factory',
          caseDesc: 'Reduction of raw material waste in the first quarter.'
        },
        retail: {
          title: 'Fluid Shopping Experiences',
          description: 'We create robust and integrated e-commerce platforms that convert visitors into loyal customers.',
          benefits: ['Optimized Checkout', 'Omnichannel Integration', 'High Conversion UX/UI'],
          caseTitle: 'B2B Marketplace',
          caseDesc: 'Increase in conversion rate after user journey redesign.'
        },
        niche: {
          title: 'Tailored Solutions',
          description: 'Health, Education, or Agribusiness. We adapt emerging technologies to solve specific pains in your sector.',
          benefits: ['Regulatory Compliance', 'Customized Systems', 'Advanced Data Security'],
          caseTitle: 'EdTech Platform',
          caseDesc: 'Active students on the platform in the first 6 months of operation.'
        }
      },
      cta: "See how we can apply this to you",
      squad: "Dedicated Collaby.t Squad",
      caseLabel: "Success Case"
    },
    projects: {
      title: "Innovation Archive",
      subtitle: "Every solution developed by Collaby.t is born from a real challenge and an enormous desire to transform markets.",
      filters: {
        all: "All",
        live: "Live",
        building: "Building",
        scaling: "Scaling"
      },
      view: "View Project Online",
      items: [
        {
          id: 1,
          title: "Persona.app",
          category: "Healthtech",
          status: "scaling",
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
          description: "Behavioral analysis platform applied to mental health, connecting professionals and patients via gamification and data.",
          stack: ["Data Engineering", "Empathetic UX", "Gamification"],
          impact: "High Retention",
          link: "https://persona.app.br/"
        },
        {
          id: 2,
          title: "Econotrip",
          category: "Travel / AI",
          status: "live",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109c055?q=80&w=2070&auto=format&fit=crop",
          description: "AI-driven travel assistant focused on financial accessibility and smart personalized itineraries.",
          stack: ["Generative AI", "Fintech", "Cloud Architecture"],
          impact: "Real Itineraries",
          link: "https://econotrip.com.br/"
        },
        {
          id: 3,
          title: "Alugue Temporada Maceió",
          category: "Proptech",
          status: "scaling",
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
          description: "Smart management for short-term rentals focusing on legal security and automated financial distributions.",
          stack: ["Management Systems", "Financial Automation", "Data Analytics"],
          impact: "Equity Value",
          link: "https://alugueportemporadamaceio.com.br/"
        },
        {
          id: 4,
          title: "TAG08",
          category: "Design Strategy",
          status: "live",
          image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop",
          description: "Strategic hub for digital product modeling, turning designs into viable and scalable business assets.",
          stack: ["Product Design", "Business Viability", "Prototyping"],
          impact: "Strategic UX",
          link: "https://tag08.com.br/"
        }
      ]
    },
    methodology: {
      title: "How We Work",
      subtitle: "Proprietary methodology focused on agility, transparency, and results.",
      steps: [
        { title: "Immersion", desc: "Deep dive into your business and pains." },
        { title: "Prototyping", desc: "Visual design to validate the concept." },
        { title: "Validation", desc: "Real tests before code." },
        { title: "Build", desc: "Robust and scalable development." },
        { title: "Evolution", desc: "Continuous improvement based on data." }
      ]
    },
    results: {
      label: "Real Results",
      title: "We don't sell code.\nWe sell impact.",
      description: "Collaby.t was born from the need to deliver technology that moves business pointers. Our projects are measured by ROI, not lines of code.",
      stats: {
        delivered: "Delivered Projects",
        nps: "Satisfaction (NPS)"
      },
      techs: "Technologies & Partners",
      reviews: {
        google: "View on Google",
        readMore: "Click to read more",
        close: "Close",
        items: [
           { role: "CEO, Fintech Startup", text: "Collaby.t understood our business model better than any other consultancy. The MVP they delivered allowed us to raise our Seed round in record time." },
           { role: "Innovation Director", text: "Impeccable professionalism. Our factory's digital transformation reduced operational costs by 25% in the very first quarter. Highly recommend." },
           { role: "Founder, B2B E-commerce", text: "Top-level technical team. They solved performance bottlenecks that had been stalling our growth for months. Post-delivery support is also excellent." }
        ]
      }
    },
    about: {
      title: "The Collaby.t Journey",
      subtitle: "From a promising idea to a reference in technological innovation.",
      timeline: [
        { year: "2020", title: "The Beginning as Personapp", desc: "Born focused on app personalization, serving small local demands with agility." },
        { year: "2022", title: "Centelha Acceleration", desc: "Our technological potential was validated and accelerated by the Centelha I program." },
        { year: "2023", title: "Startup NE Semifinalist", desc: "Official recognition by Sebrae as one of the startups with the highest potential in the Northeast." },
        { year: "TODAY", title: "Innovation Studio", desc: "Expanded to the Collaby.t brand, combining business strategy and elite software engineering." }
      ],
      culture: {
        label: "Our Culture",
        text: "\"Complex technology. Simple solutions. Real impact.\""
      },
      team: {
        title: "Minds behind the code",
        subtitle: "A high-performance multidisciplinary squad, synchronized to deliver value.",
        linkedin: "See full team on LinkedIn"
      }
    },
    tech: {
      label: "Innovation Lab",
      title: "Technologies We Master",
      subtitle: "We don't use technology for hype. We use it when it solves a real problem more efficiently.",
      cta: "See full stack",
      items: [
        { title: "Applied AI", desc: "Intelligent automation and predictive analysis.", impact: "Efficiency" },
        { title: "Blockchain", desc: "Security and transparency in transactions.", impact: "Trust" },
        { title: "Industrial IoT", desc: "Connection of machines and sensors in real-time.", impact: "Control" },
        { title: "Platforms", desc: "Collaborative digital ecosystems.", impact: "Scale" },
        { title: "Green Tech", desc: "Digital solutions focused on sustainability.", impact: "Future" }
      ],
      generate: "Generates"
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "We answer your doubts even before we start.",
      items: [
        {
          q: "Will I own the source code and Intellectual Property (IP)?",
          a: "Yes, absolutely. Unlike 'low-code' platforms or rental models, at Collaby.t all code developed is 100% owned by your company upon final delivery. We guarantee this in contract."
        },
        {
          q: "Do you offer post-launch maintenance?",
          a: "Yes. We know software is a living organism. We offer support packages (SLA), continuous evolution, and technical support to ensure your operation never stops."
        },
        {
          q: "How long does it take to build an MVP?",
          a: "Our Lean methodology focuses on speed. Typically, we deliver functional MVPs between 6 to 12 weeks, depending on complexity, so you can validate your idea in the market as fast as possible."
        },
        {
          q: "Do you sign a Non-Disclosure Agreement (NDA)?",
          a: "Yes. Protecting your idea and strategic data is our priority. We sign NDAs even before the first immersion meeting if necessary."
        }
      ]
    },
    cookies: {
      title: "Your privacy matters",
      text: "We use cookies to improve your experience and analyze traffic.",
      accept: "Accept All",
      decline: "Decline",
      link: "Read our Policy"
    },
    contact: {
      title: "Let's talk?",
      subtitle: "Fill out the form and we will contact you within 24h.",
      labels: {
        name: "Full Name",
        email: "Corporate Email",
        challenge: "What is your main challenge today?",
        message: "Message (Optional)",
        submit: "Request Free Diagnosis",
        consentPre: "I have read and agree to the",
        privacyLink: "Privacy Policy",
        consentPost: "and authorize contact."
      },
      placeholders: {
        name: "Your name",
        email: "you@company.com",
        message: "Tell us a bit more about the project..."
      },
      options: [
        "Get an idea off the paper (MVP)",
        "Modernize legacy system",
        "Scale technology team",
        "Strategic consulting / Innovation",
        "Other"
      ]
    },
    footer: {
      tagline: "We are an innovation studio connecting business strategy with high-performance software engineering.",
      cols: {
        solutions: "Solutions",
        institutional: "Institutional",
        legal: "Legal"
      },
      links: {
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        careers: "Careers"
      },
      rights: "All rights reserved.",
      made: "Made with ❤ and code in Brazil."
    },
    cta_section: {
      title: "True innovation\ndoesn't wait.",
      text: "Every day could be one less day for your idea to get off the paper. Shall we build the future together?",
      btn_primary: "Request a Diagnosis",
      btn_secondary: "Talk to Specialist"
    }
  }
} as const;

// --- Type helpers for translations ---
export type Translations = typeof translations;
// Explicit languages used by the app (translations contains other helper keys like `meta`).
export type DefaultLang = 'pt' | 'en';

type Primitive = string | number | boolean | null | undefined;

type Join<K extends string, P extends string> = P extends '' ? K : `${K}.${P}`;

type NestedKeys<T> = T extends Primitive
  ? ''
  : T extends readonly (infer U)[]
  ? // For arrays we expose numeric indices and nested paths
    | `${number}`
    | `${number}.${NestedKeys<U>}`
  : {
      [K in Extract<keyof T, string>]: T[K] extends Primitive
        ? K
        : T[K] extends readonly (infer U)[]
        ? K | Join<K, `${number}`> | Join<K, `${number}.${NestedKeys<U>}`>
        : K | Join<K, NestedKeys<T[K]> >;
    }[Extract<keyof T, string>];

export type TranslationKey = NestedKeys<Translations[DefaultLang]>;

type ValueAtPath<T, P extends string> =
  P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? ValueAtPath<T[K], Rest>
      : T extends readonly (infer U)[]
      ? K extends `${number}`
        ? ValueAtPath<U, Rest>
        : never
      : never
    : P extends keyof T
    ? T[P]
    : T extends readonly (infer U)[]
    ? P extends `${number}`
      ? U
      : never
    : never;

export type TranslationValue<K extends TranslationKey> = ValueAtPath<Translations[DefaultLang], K>;

