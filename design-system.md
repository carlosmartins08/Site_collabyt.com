# Design System - Collaby.t (estado atual + direcao)

Status: este documento descreve o que existe hoje no projeto e aponta gaps conhecidos. Ele serve como base para padronizar o visual sem quebrar o que ja esta implementado.

## 1) Escopo
- Produto: landing B2B com foco em lead e provas de capacidade.
- Stack visual: Tailwind via CDN, utilitarios em JSX, animacoes com Framer Motion.
- Linguas: pt-br e en.
- Tema: dark, com acento laranja.

## 2) Fundacoes

### 2.1 Cores (tokens existentes)
Tabela de cores encontradas no codigo atual:

| Token | Valor | Uso principal |
| --- | --- | --- |
| brand.black | #0A0A0A | background global, nav, base |
| brand.gray | #1A1A1A | surface principal, cards |
| brand.orange | #FF5A1F | CTA primario, foco, destaques |
| brand.amber | #FFB84A | acento secundario, badges |
| text.primary | #F8FAFC | texto principal |

Valores hardcoded ainda presentes em componentes:
- #0F0F0F usado como surface de cards e blocos.
- #0B0B0B usado em destaque de projeto.
- White com opacidade em borders e backgrounds, ex: white/5, white/10.

Regra: qualquer novo uso de cor deve mapear para token ou virar token novo. Hardcoded deve ser evitado.

### 2.2 Tipografia
Familias atuais:
- Sans: Inter
- Mono: JetBrains Mono

Escalas observadas (Tailwind):
- Titulos: text-3xl, text-4xl, text-5xl, text-7xl, text-8xl
- Corpo: text-base, text-lg, text-xl, text-2xl
- Labels: text-xs, text-[10px]

Pesos comuns:
- font-light, font-medium, font-semibold, font-bold, font-extrabold

Regra: titulos usam sans, labels pequenos usam mono quando for necessario dar peso tecnico.

### 2.3 Espacamento
Padrao atual (Tailwind scale):
- Secoes: py-20, py-24, pt-24, pb-12
- Containers: max-w-7xl + px-4 sm:px-6 lg:px-8
- Gaps: gap-4, gap-6, gap-8, gap-12, gap-16

Regra: manter um ritmo 24/32/48 para blocos principais e 16/24 para sub-blocos.

### 2.4 Layout e grid
Padrao atual:
- Container maximo: max-w-7xl (conteudo), max-w-5xl (destaques), max-w-2xl (paragrafos)
- Grid responsivo: grid-cols-1, md:grid-cols-2, md:grid-cols-3, lg:grid-cols-12
- Breakpoints Tailwind default: sm 640, md 768, lg 1024, xl 1280

Regra: layout deve ser mobile-first e nunca assumir duas colunas antes de md.

### 2.5 Raio e bordas
Raio de canto observado:
- rounded-full para CTAs e pills
- rounded-3xl para cards principais
- rounded-2xl para cards e modais
- rounded-xl e rounded-lg para inputs e badges

Bordas:
- border-white/5 e border-white/10 sao padrao
- border-brandOrange em estados ativos e destaques

Regra: use rounded-2xl como default para cards e modais; evite misturar 2xl e 3xl no mesmo bloco sem motivo.

### 2.6 Sombras e elevacao
Padrao atual:
- shadow-lg, shadow-2xl
- sombras com cor do brandOrange, ex: shadow-brandOrange/20
- sombras custom com glow, ex: shadow-[0_0_30px_rgba(255,90,31,0.3)]

Regra: sombras com glow so em CTAs e cards premium.

### 2.7 Motion
Animacoes registradas no Tailwind config:
- marquee (25s linear infinite)
- token-drop (2s ease-in-out infinite)
- float (6s ease-in-out infinite)

Framer Motion usado em:
- aparicao de hero, nav, cards, modais

Regra: animacoes devem apoiar narrativa, nao bloquear conteudo critico. Em elementos grandes, evitar delay acima de 1.2s.

### 2.8 Iconografia
Biblioteca: lucide-react.
Regra: icones de 16 a 24px, com stroke consistente. Sempre alinhados ao texto.

### 2.9 Imagens
Padrao atual:
- imagens hero e cards com overlay e gradientes
- uso de grayscale e hover para ativar cor
- imagens externas (Unsplash) com loading lazy e decoding async

Regra: todas as imagens devem declarar width e height. Preferir assets otimizados no futuro.

## 3) Componentes (inventario atual)

### 3.1 Navegacao
- FloatingNav: menu fixo com shrink on scroll, CTA primario a direita.
- Mobile menu: overlay com cards de nav e CTA.

Estados:
- ativo com bg brandOrange
- hover com white/5

### 3.2 Hero
- H1 com destaque em laranja e glow.
- CTA primario (brandOrange) e CTA secundario (border).

### 3.3 Cards
Padrao de card premium:
```
bg-brandGray border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg
```

Variante hardcoded atual:
```
bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 md:p-8
```

### 3.4 Botoes
Primario:
```
bg-brandOrange hover:bg-orange-600 text-white rounded-full font-bold
```

Secundario:
```
border border-slate-700 text-white hover:bg-white/5 rounded-full
```

Ghost:
```
bg-white/10 text-white hover:bg-white/20 rounded-xl
```

### 3.5 Badges e pills
Badge tecnico:
```
bg-brandGray border border-white/10 text-brandAmber text-sm font-semibold rounded-full
```

Skill chip:
```
text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white/10 border border-white/10 rounded
```

### 3.6 Formularios
Inputs e textarea:
```
bg-[#0A0A0A] border border-white/10 rounded-xl text-white
focus:ring-1 focus:ring-brandOrange focus:border-brandOrange
```

Checkbox:
```
appearance-none rounded border border-slate-500 bg-brandBlack
checked:border-brandOrange checked:bg-brandOrange
```

### 3.7 Modais
ContactModal:
- container bg-brandGray, rounded-3xl, border white/10
- overlay bg-black/80 + blur
- conteudo scrollavel

### 3.8 Footer
Footer com background escuro, grid 12 col, links com hover e gradientes decorativos.

### 3.9 Widget Architect AI
Chat overlay com bg-brandGray/95, header destacado, mensagens com bubbles e labels tecnicos.

## 4) Acessibilidade
Regras minimas:
- Todos os inputs devem ter focus visivel.
- Links devem ter estados hover e focus.
- Modais devem ser fechaveis via teclado.
- Evitar texto com baixo contraste (ex: slate-600 em fundos escuros).
- Planejar prefer-reduced-motion para animacoes nao essenciais.

## 5) Responsividade
Regras:
- Mobile-first, 1 coluna ate md.
- Evitar conteudo fixo fora do viewport.
- Menus e modais devem respeitar max-h e scroll interno.

## 6) Conteudo e tom
Regras:
- Linguagem direta e tecnica.
- Bilingue consistente por rota.
- Evitar duplicidade de seccoes entre paginas e guias.

## 7) Gaps identificados (backlog)
Os itens abaixo ja existem no codigo e precisam virar padrao formal:
- Superficies #0F0F0F e #0B0B0B devem virar tokens de surface.
- Classe `custom-scrollbar` e usada mas nao tem definicao local.
- Texto com encoding quebrado (strings com caracteres corrompidos).
- Foco visual inconsistente em links que nao sao inputs.
- Animacoes sem suporte a `prefers-reduced-motion`.
- Uso de Tailwind via CDN em producao limita governanca de tokens e purge.

## 8) Direcao de evolucao
- Centralizar tokens em um unico arquivo (CSS vars ou config Tailwind).
- Normalizar superficies e bordas.
- Criar recipes para botoes, cards e inputs.
- Criar wrapper de layout para secao padrao.
- Definir politica de motion com fallback sem animacao.

