const THEME_KEY = "theme";

// All page content lives here. Add a project/repo/"now" entry by adding
// one object below — the layout adapts. No other file needs to change.
const CONTENT = {
  profile: {
    name: "Muhammed Ali Khan",
    role: "Software engineer",
    statement: "I build systems that stay up.",
    intro:
      "Gaming, mobile, fintech, transportation, cloud-native platforms, large-scale distributed systems, and lately AI. Different domains, same pull: figure out how the hard part actually works, then build the thing that didn't exist yet.",
    links: [
      { label: "email", href: "mailto:mak.official@outlook.com" },
      { label: "github", href: "https://github.com/mak100186" },
      { label: "linkedin", href: "https://www.linkedin.com/in/muhammed-ali-khan-a1a067223/" },
    ],
  },
  domains: [
    { name: "Distributed systems", note: "consensus, partitioning, failure modes" },
    { name: "Event-driven platforms", note: "streams, sagas, idempotency" },
    { name: "AI & agentic systems", note: "tools, evals, guardrails" },
    { name: "Developer tooling", note: "CLIs, pipelines, paved roads" },
    { name: "Cloud & observability", note: "tracing, SLOs, cost" },
    { name: "Performance", note: "profiling, tail latency" },
  ],
  projects: [
    {
      kind: "project",
      year: "2026",
      title: "Asterisk - Ask Your Documents",
      blurb: "Drop documents in. Ask in plain language. Asterisk reads across everything you have given it and writes back a synthesized answer, with citations to the exact source material it used and a stated confidence level, so you know when to check it yourself.",
      tags: [".NET Core", "LM Studio", "Angular"],
      images: ["./images/asterisk-1.png", "./images/asterisk-2.png", "./images/asterisk-3.png"],
      href: "https://products-xi-eight.vercel.app/asterisk",
    },
    {
      kind: "product",
      year: "2026",
      title: "YouTube Video Summarizer",
      blurb: "Turns any YouTube video into a timestamped transcript and a structured summary without a single cloud AI call — in-process whisper.cpp transcription, a local LLM for summarisation, live per-stage progress over SSE, automatic chunking for long videos, and inline frame grabs where the speaker says “look at this.” Closed source; .NET queue engine behind an Angular front end.",
      tags: [".NET", "Angular", "whisper.cpp", "LM Studio", "SQLite"],
      images: ["./images/yt1.png", "./images/yt2.png", "./images/yt3.png"],
      href: "https://products-xi-eight.vercel.app/video-summarizer",
    },
    {
      kind: "project",
      year: "2026",
      title: "Git Crawler",
      blurb: "Scores and surfaces high-potential GitHub repositories before they trend, using activity and quality signals plus AI-generated summaries from a self-hosted LLM — an Angular dashboard over a .NET/Postgres backend.",
      tags: [".NET", "PostgreSQL", "Angular", "Ollama"],
      images: ["./images/gitcr-1.png", "./images/gitcr-2.png", "./images/gitcr-3.png", "./images/gitcr-4.png"],
      href: "https://products-xi-eight.vercel.app/gitcrawler",
    },
  ],
  openSource: [
    { name: "Vertical Sliced Plugins", desc: "A plugin-based, vertical sliced architecture.", lang: "C#", stars: "0", href: "https://github.com/mak100186/maxx-plugin-veritcals" },
    { name: "Distributed Observability", desc: "The project is structured to showcase how multiple microservices can be orchestrated using Aspire.NET, and how observability features provided by Aspire dashboards can be utilized to monitor and manage the system.", lang: "C#", stars: "0", href: "https://github.com/mak100186/mircroservices.observability" },
    { name: "VS Code Printer", desc: "Multi-Lingual Cross Platform Print Support for VS Code. Completely local print support for VS Code with syntax-colouring and line numbering.", lang: "TypeScript", stars: "0", href: "https://github.com/mak100186/vsc-print" },
    { name: "Push-Delivered MQ", desc: "A reactive push-based dispatcher for real-time systems and event-driven architectures — in-memory queue with automatic retries, subscriber management, and configurable TTL.", lang: "C#", stars: "0", href: "https://github.com/mak100186/push-delivered-queue" },
    { name: "Actor Framework", desc: "A lightweight, host-agnostic actor framework built on .NET 9 — actors process immutable messages in parallel, with directors balancing load and isolating failures.", lang: "C#", stars: "0", href: "https://github.com/mak100186/actor-pattern" },
  ],
  now: [
    {
      title: "Agentic tooling for build pipelines",
      body: "Curious whether an agent can own a flaky test suite end to end. So far: promising, occasionally alarming.",
      live: true,
    },
    {
      title: "Reading streaming-systems internals",
      body: "Working through log compaction and watermarks slowly enough to actually keep them.",
      live: false,
    },
    {
      title: "Rebuilding my own tooling in the open",
      body: "If I use it every day, it should be public and small enough to read in one sitting.",
      live: false,
    },
  ],
};
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const $ = (selector, root = document) => root.querySelector(selector);

/* ---------------------------------------------------------------- */
/* Theme                                                              */
/* ---------------------------------------------------------------- */

function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme, toggleBtn) {
  document.documentElement.dataset.theme = theme;
  if (toggleBtn) {
    toggleBtn.textContent = theme;
    toggleBtn.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

function initTheme() {
  const toggleBtn = $("#theme-toggle");
  // The inline head script already set html[data-theme] before first paint;
  // this just syncs the button label/state and wires the click handler.
  applyTheme(currentTheme(), toggleBtn);
  toggleBtn?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private browsing / storage disabled — theme just won't persist */
    }
    applyTheme(next, toggleBtn);
  });
}

/* ---------------------------------------------------------------- */
/* Cursor-aware surfaces (hero header + work cards only)              */
/* ---------------------------------------------------------------- */

function trackCursor(el) {
  if (!canHover || !el) return;
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.backgroundImage = `radial-gradient(420px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, var(--accent-soft), transparent 70%)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.backgroundImage = "none";
  });
}

/* ---------------------------------------------------------------- */
/* Scroll reveal                                                      */
/* ---------------------------------------------------------------- */

function initReveal() {
  if (reducedMotion) return;
  const targets = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );

  for (const el of targets) {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 560ms cubic-bezier(.22,1,.36,1), transform 560ms cubic-bezier(.22,1,.36,1)";
    io.observe(el);
  }
}

/* ---------------------------------------------------------------- */
/* Signature architecture diagram — built from data, not hand-placed  */
/* ---------------------------------------------------------------- */

const SVG_NS = "http://www.w3.org/2000/svg";
const NODE_H = 40;

const DIAGRAM_NODES = [
  { x: 40, y: 110, w: 96, label: "discovery", sub: "domain" },
  { x: 190, y: 110, w: 104, label: "engage", sub: "SME" },
  { x: 348, y: 110, w: 112, label: "design", sub: "architecture" },
  { x: 520, y: 44, w: 116, label: "build", sub: "orchestration" },
  { x: 520, y: 176, w: 116, label: "observe", sub: "operations" },
  { x: 696, y: 110, w: 116, label: "deploy", sub: "artifacts" },
  { x: 870, y: 44, w: 112, label: "support", sub: "documentation" },
  { x: 870, y: 176, w: 112, label: "maintenance", sub: "telemetry" },
];

const DIAGRAM_EDGES = [
  { d: "M136 130 L190 130", c: 1 },
  { d: "M294 130 L348 130", c: 1 },
  { d: "M460 130 C490 130 490 64 520 64", c: 1 },
  { d: "M520 196 C490 196 490 130 460 130", c: 1 },
  { d: "M636 64 C670 64 666 130 696 130", c: 2 },
  { d: "M696 130 C666 130 670 196 636 196", c: 2 },
  { d: "M812 130 C842 130 840 64 870 64", c: 2 },
  { d: "M812 130 C842 130 840 196 870 196", c: 2 },
];

function svgEl(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}

function buildDiagram(mount) {
  if (!mount) return;

  const svg = svgEl("svg", {
    viewBox: "0 0 1022 260",
    role: "img",
    "aria-label":
      "Architecture diagram: client connects through edge and gateway to two services, which fan out to an event bus, then to a data store and a telemetry system.",
  });
  Object.assign(svg.style, { width: "100%", height: "auto", display: "block" });

  DIAGRAM_EDGES.forEach((edge, i) => {
    const color = edge.c === 1 ? "var(--accent)" : "var(--accent-2)";
    svg.appendChild(
      svgEl("path", { d: edge.d, fill: "none", stroke: "var(--line-strong)", "stroke-width": 1.25 })
    );
    const pulse = svgEl("path", {
      d: edge.d,
      fill: "none",
      stroke: color,
      "stroke-width": 1.8,
      "stroke-linecap": "round",
      "stroke-dasharray": "26 220",
    });
    if (!reducedMotion) {
      pulse.style.animation = `dash ${5 + (i % 3)}s linear ${i * 0.28}s infinite`;
    }
    svg.appendChild(pulse);
  });

  DIAGRAM_NODES.forEach((node, i) => {
    const g = svgEl("g");
    g.appendChild(
      svgEl("rect", {
        x: node.x,
        y: node.y,
        width: node.w,
        height: NODE_H,
        rx: 8,
        fill: "var(--surface-2)",
        stroke: "var(--line-strong)",
        "stroke-width": 1,
      })
    );

    const dot = svgEl("circle", {
      cx: node.x + 13,
      cy: node.y + NODE_H / 2,
      r: 3.2,
      fill: i > 4 ? "var(--accent-2)" : "var(--accent)",
    });
    if (!reducedMotion) {
      dot.style.transformOrigin = `${node.x + 13}px ${node.y + NODE_H / 2}px`;
      dot.style.animation = `pulseNode ${2.4 + (i % 4) * 0.35}s ease-in-out ${i * 0.2}s infinite`;
    }
    g.appendChild(dot);

    const label = svgEl("text", { x: node.x + 24, y: node.y + 17, fill: "var(--ink)" });
    label.style.font = "500 11px 'JetBrains Mono', monospace";
    label.style.letterSpacing = "0.04em";
    label.textContent = node.label;
    g.appendChild(label);

    const sub = svgEl("text", { x: node.x + 24, y: node.y + 30, fill: "var(--ink-3)" });
    sub.style.font = "400 9.5px 'JetBrains Mono', monospace";
    sub.textContent = node.sub;
    g.appendChild(sub);

    svg.appendChild(g);
  });

  mount.appendChild(svg);
}

/* ---------------------------------------------------------------- */
/* Content rendering                                                   */
/* ---------------------------------------------------------------- */

function setOutboundHref(a, href) {
  a.href = href;
  if (/^https?:/i.test(href)) {
    a.target = "_blank";
    a.rel = "noopener";
  }
}

function linkEl(link, { arrow = true } = {}) {
  const a = document.createElement("a");
  setOutboundHref(a, link.href);
  a.textContent = arrow ? `${link.label} ↗` : link.label;
  return a;
}

function renderIntro(profile) {
  const el = $("#intro");
  if (el) el.textContent = profile.intro;
}

function renderFooterLinks(profile) {
  const el = $("#footer-links");
  if (!el) return;
  el.innerHTML = "";
  for (const link of profile.links) el.appendChild(linkEl(link));
}

function renderDomains(domains) {
  const list = $("#domain-list");
  if (!list) return;
  list.innerHTML = "";
  domains.forEach((d, i) => {
    const row = document.createElement("div");
    row.className = "domain-row";

    const n = document.createElement("span");
    n.className = "domain-row__n";
    n.setAttribute("aria-hidden", "true");
    n.textContent = String(i + 1).padStart(2, "0");

    const name = document.createElement("span");
    name.className = "domain-row__name";
    name.textContent = d.name;

    const rule = document.createElement("span");
    rule.className = "domain-row__rule";

    const note = document.createElement("span");
    note.className = "domain-row__note";
    note.textContent = d.note;

    row.append(n, name, rule, note);
    list.appendChild(row);
  });
}

function renderProjects(projects) {
  const grid = $("#work-grid");
  const count = $("#work-count");
  if (count) count.textContent = `${projects.length} ${projects.length === 1 ? "entry" : "entries"}`;
  if (!grid) return;
  grid.innerHTML = "";

  for (const p of projects) {
    const card = document.createElement("a");
    card.className = "work-card";
    setOutboundHref(card, p.href);
    trackCursor(card);

    const top = document.createElement("div");
    top.className = "work-card__top";
    const kind = document.createElement("span");
    kind.className = "work-card__kind";
    kind.textContent = p.kind;
    const year = document.createElement("span");
    year.className = "work-card__year";
    year.textContent = p.year;
    top.append(kind, year);

    const title = document.createElement("div");
    title.className = "work-card__title";
    title.textContent = p.title;

    const blurb = document.createElement("div");
    blurb.className = "work-card__blurb";
    blurb.textContent = p.blurb;

    const tags = document.createElement("div");
    tags.className = "work-card__tags";
    for (const tag of p.tags) {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      tags.appendChild(span);
    }

    card.append(top, title, blurb, tags);
    grid.appendChild(card);
  }
}

const WORK_CAROUSEL_INTERVAL_MS = 2800;
const WORK_CAROUSEL_PLACEHOLDER_SLIDES = 3;

function buildCarouselSlides(project) {
  const images = project.images && project.images.length ? project.images : new Array(WORK_CAROUSEL_PLACEHOLDER_SLIDES).fill(null);
  return images.map((src, i) => {
    const slide = document.createElement("div");
    slide.className = "work-carousel__slide";
    if (src) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${project.title} screenshot ${i + 1}`;
      slide.appendChild(img);
    }
    return slide;
  });
}

function initWorkCarousel(projects) {
  const root = $("#work-carousel");
  const frame = $("#work-carousel-frame");
  const title = $("#work-carousel-title");
  const dots = $("#work-carousel-dots");
  const grid = $("#work-grid");
  if (!root || !frame || !title || !dots || !grid) return;

  let activeIndex = -1;
  let slideIndex = 0;
  let timer = null;

  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function showSlide(i) {
    slideIndex = i;
    frame.querySelectorAll(".work-carousel__slide").forEach((s, idx) => s.classList.toggle("is-visible", idx === i));
    dots.querySelectorAll(".work-carousel__dot").forEach((d, idx) => d.classList.toggle("is-active", idx === i));
  }

  function startAutoplay(count) {
    stopAutoplay();
    if (reducedMotion || count < 2) return;
    timer = setInterval(() => showSlide((slideIndex + 1) % count), WORK_CAROUSEL_INTERVAL_MS);
  }

  function setProject(i) {
    if (i === activeIndex) return;
    activeIndex = i;
    const project = projects[i];

    const slides = buildCarouselSlides(project);
    frame.replaceChildren(...slides);
    dots.replaceChildren(...slides.map(() => {
      const dot = document.createElement("span");
      dot.className = "work-carousel__dot";
      return dot;
    }));

    title.textContent = project.title;
    showSlide(0);
    startAutoplay(slides.length);
  }

  function clear() {
    activeIndex = -1;
    stopAutoplay();
    root.classList.remove("is-active");
  }

  grid.querySelectorAll(".work-card").forEach((card, i) => {
    card.addEventListener("mouseenter", () => {
      root.classList.add("is-active");
      setProject(i);
    });
    card.addEventListener("focus", () => {
      root.classList.add("is-active");
      setProject(i);
    });
  });

  grid.addEventListener("mouseleave", clear);
  grid.addEventListener("focusout", (e) => {
    if (!grid.contains(e.relatedTarget)) clear();
  });
}

function renderOpenSource(openSource) {
  const list = $("#os-list");
  if (!list) return;
  list.innerHTML = "";

  for (const r of openSource) {
    const row = document.createElement("a");
    row.className = "os-row";
    setOutboundHref(row, r.href);

    const name = document.createElement("span");
    name.className = "os-row__name";
    name.textContent = r.name;

    const desc = document.createElement("span");
    desc.className = "os-row__desc";
    desc.textContent = r.desc;

    const lang = document.createElement("span");
    lang.className = "os-row__lang";
    lang.textContent = r.lang;

    const stars = document.createElement("span");
    stars.className = "os-row__stars";
    stars.textContent = `★ ${r.stars}`;

    row.append(name, desc, lang, stars);
    list.appendChild(row);
  }
}

function renderNow(nowItems) {
  const grid = $("#now-grid");
  if (!grid) return;
  grid.innerHTML = "";

  for (const n of nowItems) {
    const item = document.createElement("div");
    item.className = "now-item";

    const dot = document.createElement("span");
    dot.className = "now-item__dot" + (n.live ? " now-item__dot--live" : "");

    const text = document.createElement("div");
    const title = document.createElement("div");
    title.className = "now-item__title" + (n.live ? " now-item__title--live" : "");
    title.textContent = n.title;
    const body = document.createElement("div");
    body.className = "now-item__body";
    body.textContent = n.body;
    text.append(title, body);

    item.append(dot, text);
    grid.appendChild(item);
  }
}

/* ---------------------------------------------------------------- */
/* Boot                                                                */
/* ---------------------------------------------------------------- */

initTheme();
buildDiagram($("#diagram-mount"));
trackCursor($("#hero"));
initReveal();

renderIntro(CONTENT.profile);
renderFooterLinks(CONTENT.profile);
renderDomains(CONTENT.domains);
renderProjects(CONTENT.projects);
initWorkCarousel(CONTENT.projects);
renderOpenSource(CONTENT.openSource);
renderNow(CONTENT.now);
