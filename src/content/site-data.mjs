export const SHADER_PATHS = [
  "./shaders/main-webgpu.js",
  "./shaders/main2-webgpu.js",
  "./shaders/main3-webgpu.js",
  "./shaders/main4-webgpu.js",
];

export const KNOWLEDGE_ENTRIES = {
  "design-thinking": {
    mdPath: "content/knowledge/design-thinking-{lang}.md",
    pdfUrl:
      "https://uminomae.github.io/pjdhiro/assets/project-design/knowledge/{lang}/pdf/design-thinking.pdf",
    titleKey: "knowledge.designThinking.title",
  },
  trust: {
    mdPath: "content/knowledge/trust-{lang}.md",
    pdfUrl:
      "https://uminomae.github.io/pjdhiro/assets/project-design/knowledge/{lang}/pdf/trust.pdf",
    titleKey: "knowledge.trust.title",
  },
  value: {
    mdPath: "content/knowledge/value-{lang}.md",
    pdfUrl:
      "https://uminomae.github.io/pjdhiro/assets/project-design/knowledge/{lang}/pdf/value.pdf",
    titleKey: "knowledge.value.title",
  },
};

const SITE_MENU_LINKS = [
  { siteId: "home", href: "/project-design/", labelKey: "menu.home" },
  { siteId: "wiki", href: "/project-design/wiki/", labelKey: "menu.wiki" },
  { siteId: "kesson", href: "/kesson-space/", labelKey: "menu.kesson" },
  { siteId: "creation", href: "/creation-space/", labelKey: "menu.creation" },
  {
    siteId: "awareness",
    href: "/awareness-space/",
    labelKey: "menu.awareness",
  },
  { siteId: "blog", href: "/pjdhiro/", labelKey: "menu.blog" },
];

const KNOWLEDGE_MENU_KEYS = ["design-thinking", "trust", "value"];

// NOTE: This menu data is also imported by Quartz for the wiki top nav.
// When changing labels, ordering, or destinations here, review the wiki side too.
export function getMenuItems({ currentSite = "home", context = "main" } = {}) {
  const siteLinks =
    context === "wiki"
      ? SITE_MENU_LINKS.map((item) => ({
          ...item,
          labelKey:
            item.siteId === "home" ? "menu.projectDesignHome" : item.labelKey,
        }))
      : SITE_MENU_LINKS;

  const items = [
    { type: "label", labelKey: "menu.sites" },
    ...siteLinks.map((item) => ({
      type: "link",
      href: item.href,
      labelKey: item.labelKey,
      className: item.siteId === currentSite ? "menu-current" : undefined,
    })),
  ];

  if (context === "main") {
    items.push(
      { type: "separator" },
      { type: "label", labelKey: "menu.researchNotes" },
      ...KNOWLEDGE_MENU_KEYS.map((key) => ({
        type: "knowledge-link",
        key,
        href: `?knowledge=${key}`,
      })),
      { type: "separator" },
      { type: "action", labelKey: "slides.trigger", modalOpen: "slides" },
    );
    return items;
  }

  return items;
}

export const MENU_ITEMS = getMenuItems({
  currentSite: "home",
  context: "main",
});

export const TRANSLATIONS = {
  ja: {
    "menu.toggle": "Menu",
    "menu.sites": "Sites",
    "menu.home": "HOME",
    "menu.projectDesignHome": "PROJECT DESIGN HOME",
    "menu.wiki": "WIKI",
    "menu.kesson": "欠損駆動思考",
    "menu.creation": "創造とは",
    "menu.awareness": "意識とは",
    "menu.blog": "BLOG",
    "menu.researchNotes": "調査ノート",
    "controls.topBarAria": "サイト操作",
    "controls.languageAria": "言語切替",
    "hero.notice":
      "Love駆動開発と呼びたい現象を、これまで何度も経験してきました。<br>ここでいうプロジェクトは「やること（Doing）」だけでなく「起きていること（Being）」まで含む出来事です。",
    "hero.aboutAria": "このサイトについて",
    "section.overview.label": "Overview",
    "section.overview.title": "概要",
    "overview.p1":
      "プロジェクトデザインとは、プロジェクトの構想・設計・実行だけでなく、実行・管理の方法そのものを対象化し、構想・設計する営みです。",
    "overview.p2":
      "まず、その基底として射程と領域を固定し、以降の議論を「やること（Doing）」と「起きてること（Being）」に分けて整理します。",
    "overview.p3":
      "プロジェクト実務は、環境適応（物質的条件）とコミュニケーション（非物質的条件）に大別できます。本サイトでは環境適応を前提知（PMBOK等）とし、コミュニケーションを情報処理／感情処理に分解して、とくに感情処理を中心に扱います。",
    "overview.definition.title": "定義",
    "overview.definition.item1": "プロジェクトの構想・設計・実行",
    "overview.definition.item2": "実行・管理方法の構想・設計",
    "overview.scope.title": "射程",
    "overview.scope.body":
      "営利・非営利の事業を主たる適用対象とする（論証の射程）。研究、人生など、主体が目的を持って行為する営み一般へは、構造の類似を手がかりに広げて考える（論証ではなく試み）。",
    "overview.domain.title": "領域",
    "overview.domain.body":
      "コミュニケーション（情報処理＋感情処理）と環境適応（経営学など）",
    "section.doing.label": "Doing",
    "section.doing.title": "やること",
    "doing.principles.title": "行動原理",
    "doing.principles.item1": "多様な価値観を受容れる",
    "doing.principles.item2": "バランスを達成する",
    "doing.principles.item3": "状況に常に適応する",
    "doing.environment.title": "環境適応",
    "doing.environment.body":
      "「PMBOK第7版」等に基づく物質的条件の整理。本サイトでは前提知とし、非物質的条件へ焦点を当てます。",
    "doing.communication.title": "コミュニケーション",
    "doing.communication.body":
      "情報処理と感情処理。心の反応を通じて感じ取る感情の側面を中心に扱います。",
    "pill.kesson": "欠損駆動思考",
    "pill.beauty": "美駆動思考",
    "pill.emotionalProcessing": "感情処理（総論）",
    "pill.meditation": "瞑想",
    "section.being.label": "Being",
    "section.being.title": "起きていること",
    "section.being.body":
      "場（Field）が現れ、差異＝波（Wave）が立ち上がり、縁＝境界（Relation）で衝突が生まれ、渦（Spinor）として止揚・統合され、成果が束（Bundle）として成る。プロジェクトの現在地を知ること。",
    "being.faq.summary": "よくある誤解",
    "being.faq.body":
      "<ul><li><strong>「回転は渦だけのもの」</strong> → 回転は全段階に遍在します。波も回転です。「位相」も回転の一種で、あえて一般的・曖昧な語を当てています。</li><li><strong>「衝突は渦で統合される」</strong> → 衝突は縁（境界）で生まれ、渦はそれを止揚・統合する段階です。</li><li><strong>「束→場は同じ場に戻る閉じた循環」</strong> → 次サイクルの場へ前進する循環で、螺旋的に展開し元へは戻りません。</li></ul>",
    "pill.creationModel": "創造のモデル",
    "pill.awarenessModel": "意識のモデル",
    "section.direction.label": "Direction",
    "section.direction.title": "今後の方向性",
    "section.direction.body":
      "本ページで固定した「射程・領域・Doing/Beingの二分」は基底（土台・骨格）です。以降の各ページは、この骨格の上に展開します。",
    "repo.kesson": "欠損駆動思考",
    "repo.creation": "創造とは",
    "repo.awareness": "意識とは",
    "knowledge.designThinking.title": "デザイン思考とは",
    "knowledge.trust.title": "信頼とは",
    "knowledge.value.title": "価値とは",
    "modal.aboutTitle": "このサイトについて",
    "modal.close": "閉じる",
    "modal.knowledgeTitle": "調査ノート",
    "knowledge.pdf.pending": "PDF準備中",
    "knowledge.pdf.open": "PDFで読む",
    "howto.triggerLabel": "AIに読ませる",
    "howto.title": "このプロジェクトを AI に読ませる",
    "howto.steps.heading": "3ステップで始める",
    "howto.steps.1": "LLM（Claude.ai / ChatGPT / Gemini 等）を開く",
    "howto.steps.2": "下のプロンプトをコピーして貼り付ける",
    "howto.steps.3": "「○○」を自分のテーマに置き換えて送信",
    "howto.copy": "コピー",
    "howto.copied": "OK!",
    "howto.prompt.basic.label": "基本プロンプト",
    "howto.prompt.basic.code":
      "https://github.com/uminomae/project-design\n\nこのrepoと関連repoを読んでください。\nこのプロジェクトの知見やフレームワークを活用して\n「○○」を手伝ってください。関連repoも参照してください。",
    "howto.research.heading": "A. 調査・分析に使う",
    "howto.research.desc":
      "このプロジェクトの理論構造や調査手法を、自分のテーマに転用できます。",
    "howto.research.ex1":
      "「Being×Doingの二軸で、自分のプロジェクトを見直したい」",
    "howto.research.ex2":
      "「30領域の三角測量手法を参考に、○○を多角的に調査して」",
    "howto.research.ex3":
      "「創造の5段階モデルで、私の創作プロセスを構造化したい」",
    "howto.research.ex4":
      "「間主観性の視点を使って、チームの関係性を分析したい」",
    "howto.prompt.research.label": "調査向けプロンプト",
    "howto.prompt.research.code":
      "https://github.com/uminomae/project-design\n\nこのrepoと関連repoを読んで、中にある理論構造\n（Doing/Being の二軸、創造の5段階モデル、\n間主観性の意識モデル、三角測量など）を参考に、\n「○○」というテーマを多角的に分析してください。",
    "howto.harness.heading": "B. LLM協働環境を自分のプロジェクトに導入する",
    "howto.harness.desc":
      "CLAUDE.md・hooks・skills・agents などのハーネス設計を参考にできます。",
    "howto.harness.ex1":
      "「CLAUDE.mdやhooksの設計を参考に、LLM協働環境を構築したい」",
    "howto.harness.ex2":
      "「マルチエージェント構成（Claude/Gemini/Codex）を設計したい」",
    "howto.prompt.harness.label": "ハーネス導入プロンプト",
    "howto.prompt.harness.code":
      "https://github.com/uminomae/project-design\n\nこのrepoと関連repoの .claude/ ディレクトリ構造を読んで、\n仮説検証型の文献調査をLLMに自律実行させるための\nハーネス（CLAUDE.md、hooks、skills、agents）の設計を分析して、\n私のプロジェクトにも導入する方法を提案してください。",
    "howto.thinking.heading": "C. 思考の整理・対人スキル",
    "howto.thinking.ex1":
      "「感情処理やメタ認知のフレームワークを私の状況に当てはめて」",
    "howto.thinking.ex2": "「間主観性と生存-信頼軸の視点で、チームの関係性を考えたい」",
    "howto.thinking.ex3":
      "「5段階モデル（場→波→縁→渦→束）で創作プロセスを設計して」",
    "howto.map.heading": "なぜ1つのURLで済むのか",
    "howto.map.desc":
      "project-design（pd）は理論のトップに位置し、READMEから関連repoへリンクしています。LLMがそれらを辿り、目的に最適な知見を引き出します。",
    "howto.map.colTitle": "ページタイトル",
    "howto.map.colContent": "コンテンツ概要",
    "howto.map.pd":
      "Doing（やること）と Being（起きていること）を包含するプロジェクトの構想・設計・実行の理論",
    "howto.map.cs.title": "創造とは",
    "howto.map.cs":
      "30の学術領域から「創造とは何か」を探索。創造の5段階モデル（場→波→縁→渦→束）",
    "howto.map.as.title": "意識とは",
    "howto.map.as":
      "身体・予測・情動・社会性の知見から間主観性を中核に据えた意識の探索",
    "howto.map.ks.title": "欠損駆動思考とは",
    "howto.map.ks":
      "違和感・未定義要件・弱い信号を「保持すべき問い」として扱う思考フレームワーク",
    "howto.tips.1": "具体的に「何をしたいか」を伝えるほど良い結果が出ます",
    "howto.tips.2": "「関連repoも見て」と追加すると、深掘りされます",
    "howto.tips.3": "Claude.ai、ChatGPT、Gemini など、どのLLMでも使えます",
    "howto.note":
      "MIT License — 商用利用・改変・再配布すべて自由です。出典表示の義務はありません。詳細は各リポジトリの LICENSE ファイルをご覧ください。",
    "slides.trigger": "プレゼン資料",
    "slides.title": "プレゼン資料",
  },
  en: {
    "menu.toggle": "Menu",
    "menu.sites": "Sites",
    "menu.home": "HOME",
    "menu.projectDesignHome": "PROJECT DESIGN HOME",
    "menu.wiki": "WIKI",
    "menu.kesson": "KESSON-DRIVEN",
    "menu.creation": "CREATION",
    "menu.awareness": "AWARENESS",
    "menu.blog": "BLOG",
    "menu.researchNotes": "Research Notes",
    "controls.topBarAria": "Site controls",
    "controls.languageAria": "Language switcher",
    "hero.notice":
      'Many times, I have experienced what I want to call Love-Driven Development.<br>Here, a project is an event that includes not only "Doing" but also "Being."',
    "hero.aboutAria": "About this site",
    "section.overview.label": "Overview",
    "section.overview.title": "Overview",
    "overview.p1":
      "Project Design is a practice that not only envisions, designs, and executes projects, but also takes the methods of execution and management themselves as its object of inquiry, and envisions and designs them.",
    "overview.p2":
      'First, we fix the scope and domain as the foundation, and organize the subsequent discussion into "Doing" and "Being."',
    "overview.p3":
      "Project practice can be broadly divided into environmental adaptation (material conditions) and communication (non-material conditions). This site treats environmental adaptation as prerequisite knowledge (PMBOK, etc.), decomposes communication into information processing and emotional processing, and focuses especially on emotional processing.",
    "overview.definition.title": "Definition",
    "overview.definition.item1":
      "Envisioning, designing, and executing projects",
    "overview.definition.item2":
      "Envisioning and designing execution and management methods",
    "overview.scope.title": "Scope",
    "overview.scope.body":
      "Primarily applicable to profit and non-profit enterprises (the scope of demonstration). To any purposeful endeavor — such as research or life itself — it extends by structural analogy (an attempt, not a proof).",
    "overview.domain.title": "Domain",
    "overview.domain.body":
      "Communication (information processing + emotional processing) and environmental adaptation (management studies, etc.)",
    "section.doing.label": "Doing",
    "section.doing.title": "Doing",
    "doing.principles.title": "Principles of Action",
    "doing.principles.item1": "Embrace diverse values",
    "doing.principles.item2": "Achieve balance",
    "doing.principles.item3": "Continuously adapt to the situation",
    "doing.environment.title": "Environmental Adaptation",
    "doing.environment.body":
      "Organization of material conditions based on PMBOK 7th Edition, etc. This site treats these as prerequisite knowledge and focuses on non-material conditions.",
    "doing.communication.title": "Communication",
    "doing.communication.body":
      "Information processing and emotional processing. We focus on the emotional aspects perceived through our inner responses.",
    "pill.kesson": "Kesson-Driven Thinking",
    "pill.beauty": "Beauty-Driven Thinking",
    "pill.emotionalProcessing": "Emotional Processing",
    "pill.meditation": "Meditation",
    "section.being.label": "Being",
    "section.being.title": "Being",
    "section.being.body":
      "Fields emerge, waves of difference arise, collisions emerge at the relation (boundary), are sublated and integrated as a vortex, and outcomes bundle together. To know where the project stands.",
    "being.faq.summary": "Common misconceptions",
    "being.faq.body":
      "<ul><li><strong>“Rotation belongs only to the vortex”</strong> → Rotation pervades every stage; the wave is rotation too. “Phase” is also a kind of rotation — a deliberately general, vague term.</li><li><strong>“Collisions are integrated by the vortex”</strong> → Collisions emerge at the relation (boundary); the vortex is where they are sublated and integrated.</li><li><strong>“Bundle → Field is a closed loop back to the same field”</strong> → It is a cycle forward to the next field — spiraling onward, never returning to the same point.</li></ul>",
    "pill.creationModel": "Model of Creation",
    "pill.awarenessModel": "Model of Awareness",
    "section.direction.label": "Direction",
    "section.direction.title": "Future Direction",
    "section.direction.body":
      'The "scope, domain, and Doing/Being dichotomy" established on this page is the foundation (base and skeleton). Each subsequent page develops upon this skeleton.',
    "repo.kesson": "Kesson-Driven Thinking",
    "repo.creation": "What Is Creation",
    "repo.awareness": "What Is Awareness",
    "knowledge.designThinking.title": "What is Design Thinking?",
    "knowledge.trust.title": "What is Trust?",
    "knowledge.value.title": "What is Value?",
    "modal.aboutTitle": "About this site",
    "modal.close": "Close",
    "modal.knowledgeTitle": "Research note",
    "knowledge.pdf.pending": "PDF pending",
    "knowledge.pdf.open": "Open PDF",
    "howto.triggerLabel": "Let AI Read",
    "howto.title": "Let AI Read This Project",
    "howto.steps.heading": "Start in 3 Steps",
    "howto.steps.1": "Open an LLM (Claude.ai / ChatGPT / Gemini, etc.)",
    "howto.steps.2": "Copy and paste the prompt below",
    "howto.steps.3": 'Replace "○○" with your topic and send',
    "howto.copy": "Copy",
    "howto.copied": "OK!",
    "howto.prompt.basic.label": "Basic Prompt",
    "howto.prompt.basic.code":
      'https://github.com/uminomae/project-design\n\nPlease read this repo and its related repos.\nUsing the knowledge and frameworks in this project,\nhelp me with "○○". Please also refer to related repos.',
    "howto.research.heading": "A. Use for Research & Analysis",
    "howto.research.desc":
      "Apply the theoretical structures and research methods in this project to your own topic.",
    "howto.research.ex1":
      '"I want to review my project through the Being × Doing dual-axis lens"',
    "howto.research.ex2":
      '"Research ○○ from multiple angles using the 30-domain triangulation method"',
    "howto.research.ex3":
      '"I want to structure my creative process using the Five-Stage Model of Creation"',
    "howto.research.ex4":
      '"I want to analyze team dynamics using the intersubjectivity perspective"',
    "howto.prompt.research.label": "Research Prompt",
    "howto.prompt.research.code":
      'https://github.com/uminomae/project-design\n\nPlease read this repo and related repos, and using the\ntheoretical structures within (Doing/Being dual-axis,\nFive-Stage Model of Creation, awareness model of\nintersubjectivity, triangulation, etc.), analyze the topic\n"○○" from multiple perspectives.',
    "howto.harness.heading": "B. Set Up LLM Collaboration in Your Project",
    "howto.harness.desc":
      "Reference the harness design: CLAUDE.md, hooks, skills, agents, and more.",
    "howto.harness.ex1":
      '"I want to build an LLM collaboration environment based on the CLAUDE.md and hooks design"',
    "howto.harness.ex2":
      '"I want to design a multi-agent setup (Claude/Gemini/Codex)"',
    "howto.prompt.harness.label": "Harness Setup Prompt",
    "howto.prompt.harness.code":
      "https://github.com/uminomae/project-design\n\nPlease read the .claude/ directory structure of this repo\nand related repos, analyze the harness design (CLAUDE.md,\nhooks, skills, agents) for autonomous LLM-driven hypothesis\nresearch, and suggest how to introduce it to my project.",
    "howto.thinking.heading": "C. Organize Thinking & Interpersonal Skills",
    "howto.thinking.ex1":
      '"Apply the emotional processing and metacognition framework to my situation"',
    "howto.thinking.ex2":
      '"I want to think about team dynamics using the intersubjectivity and survival-trust axis"',
    "howto.thinking.ex3":
      '"Design a creative process using the 5-stage model (Ba → Wave → En → Vortex → Bundle)"',
    "howto.map.heading": "Why One URL Is Enough",
    "howto.map.desc":
      "project-design (pd) sits at the top of the theory structure, with README links to related repos. The LLM follows these to find the best knowledge for your purpose.",
    "howto.map.colTitle": "Page Title",
    "howto.map.colContent": "Content Overview",
    "howto.map.pd":
      "Theory of project envisioning, design, and execution encompassing Doing and Being",
    "howto.map.cs.title": "What Is Creation",
    "howto.map.cs":
      'Exploring "what is creativity" across 30 academic domains. Five-Stage Model of Creation (Field → Wave → Edge → Vortex → Bundle)',
    "howto.map.as.title": "What Is Awareness",
    "howto.map.as":
      "Exploring consciousness with intersubjectivity at its core — from body, prediction, emotion, and social neuroscience",
    "howto.map.ks.title": "What Is Kesson-Driven Thinking",
    "howto.map.ks":
      "A thinking framework that treats discomfort, undefined requirements, and weak signals as questions to hold",
    "howto.tips.1":
      "The more specific you are about your goal, the better the results",
    "howto.tips.2":
      'Adding "also check related repos" enables deeper exploration',
    "howto.tips.3": "Works with any LLM: Claude.ai, ChatGPT, Gemini, etc.",
    "howto.note":
      "MIT License — Free for commercial use, modification, and redistribution. No attribution required. See the LICENSE file in each repository for details.",
    "slides.trigger": "Slides",
    "slides.title": "Presentation Slides",
  },
};
