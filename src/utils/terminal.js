/**
 * terminal.js — Elegant Portfolio CLI Engine
 */
import { portfolioConfig as STATE } from '../data/config';

// --- Configuration & Constants ---
const COMMANDS = [
  'help', 'about', 'skills', 'experience', 'projects', 'blog',
  'certifications', 'certs', 'contact', 'open', 'clear',
  'whoami', 'social', 'ls', 'pwd', 'echo', 'date', 'exit', 'theme'
];

// --- State Management ---
let cliOpen = false;
let cliHistory = [];
let cliHistIdx = -1;
let booted = false;

// --- Core DOM Selectors ---
const getOverlay = () => document.getElementById('cli-overlay');
const getBody = () => document.getElementById('term-body');
const getInput = () => document.getElementById('term-input');

// --- Window Bindings ---
window.openCLI = () => {
  const overlay = getOverlay();
  if (overlay) overlay.classList.add('open');
  cliOpen = true;
  if (!booted) bootSequence();
  else {
    const input = getInput();
    if (input) input.focus();
  }
};

window.closeCLI = () => {
  const overlay = getOverlay();
  if (overlay) overlay.classList.remove('open');
  cliOpen = false;
};

window.handleOverlayClick = (e) => {
  if (e.target === getOverlay()) window.closeCLI();
};

// --- Helper Functions ---
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function appendLine(text, cls = 't-line') {
  const body = getBody();
  if (!body) return;
  const p = document.createElement('p');
  p.className = cls;
  p.innerHTML = text;
  body.appendChild(p);
  body.scrollTop = body.scrollHeight;
}

function escHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[tag] || tag));
}

function renderHeader(title, subtitle = '────────────────────────────────────────────') {
  appendLine(`  <span class="t-yellow t-bold">${title}</span>`);
  if (subtitle) appendLine(`  <span class="t-sep">${subtitle}</span>`);
}

// --- Boot Sequence ---
async function bootSequence() {
  const body = getBody();
  const input = getInput();
  if (!body || !input) return;
  body.innerHTML = '';
  booted = true;
  input.disabled = true;

  const asciiArt = [
    { text: "", cls: "t-line" },
    { text: "  ██████╗ ██████╗  ██████╗  ██████╗ ██████╗ ██╗   ██╗", cls: "t-line t-green t-bold t-ascii" },
    { text: "  ██╔══██╗██╔══██╗██╔═══██╗██╔═══██╗██╔══██╗██║   ██║", cls: "t-line t-green t-ascii" },
    { text: "  ███████║██████╔╝██║   ██║██║   ██║██████╔╝██║   ██║", cls: "t-line t-green t-ascii" },
    { text: "  ██╔══██║██╔═══╝ ██║   ██║██║   ██║██╔══██╗╚██╗ ██╔╝", cls: "t-line t-green t-ascii" },
    { text: "  ██║  ██║██║     ╚██████╔╝╚██████╔╝██║  ██║ ╚████╔╝ ", cls: "t-line t-green t-ascii" },
    { text: "  ╚═╝  ╚═╝╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═╝  ╚═══╝  ", cls: "t-line t-dim t-ascii" },
    { text: "", cls: "t-line" },
    { text: "  AIML Enthusiast · MERN Stack Developer · Problem Solver", cls: "t-line t-yellow" },
    { text: "  ─────────────────────────────────────────────────────", cls: "t-line t-sep" },
    { text: "", cls: "t-line" },
    { text: "  [SYS] Initializing portfolio terminal...", cls: "t-line t-dim" },
    { text: "  [SYS] Loading modules: projects, skills, experience, blog, certs", cls: "t-line t-dim" },
    { text: "  [OK]  All systems operational.", cls: "t-line t-green" },
    { text: "", cls: "t-line" },
    { text: "  Welcome! Type <span class='t-yellow'>help</span> to see available commands.", cls: "t-line t-white" },
    { text: "", cls: "t-line" },
  ];

  for (const line of asciiArt) {
    await sleep(40);
    appendLine(line.text, line.cls);
  }

  input.disabled = false;
  input.focus();
  setupTermInput();
}

// --- Event Listeners & Autocomplete ---
function setupTermInput() {
  const input = getInput();
  if (!input) return;
  if (input._bound) return;
  input._bound = true;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (cmd) {
        cliHistory.unshift(cmd);
        cliHistIdx = -1;
      }
      appendLine(`<span class="t-green">apoorv</span><span class="t-dim">@portfolio:~$</span> <span class="t-white">${escHtml(cmd)}</span>`);
      input.value = '';
      if (cmd) processCommand(cmd.toLowerCase().trim());
      else appendLine('');
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cliHistIdx < cliHistory.length - 1) {
        cliHistIdx++;
        input.value = cliHistory[cliHistIdx];
      }
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cliHistIdx > 0) {
        cliHistIdx--;
        input.value = cliHistory[cliHistIdx];
      } else {
        cliHistIdx = -1;
        input.value = '';
      }
    }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.filter(c => c.startsWith(input.value.toLowerCase()));
      if (match.length === 1) input.value = match[0];
      else if (match.length > 1) appendLine(match.join('   '), 't-line t-yellow');
    }
    else if (e.key === 'Escape') {
      window.closeCLI();
    }
  });
}

// --- Command Controller Router Matrix ---
const COMMAND_REGISTRY = {
  help: async () => {
    const helpMenu = [
      ['help', 'Show this help message'],
      ['about', 'About Apoorv Mehrotra'],
      ['whoami', 'Quick identity check'],
      ['skills', 'View tech stack'],
      ['experience', 'Work history'],
      ['projects', 'List all projects'],
      ['blog [read <n>]', 'List or read blog posts'],
      ['certs [source]', 'List certifications (optional: source name)'],
      ['contact', 'Contact info'],
      ['social', 'Social media links'],
      ['open <target>', 'Open github|linkedin|twitter|resume|p1..pN'],
      ['ls', 'List portfolio sections'],
      ['pwd', 'Current directory'],
      ['echo <text>', 'Print text'],
      ['date', 'Current date & time'],
      ['theme <dark|light>', 'Toggle theme'],
      ['portfolio', 'Go to portfolio site'],
      ['clear', 'Clear terminal'],
      ['exit', 'Close terminal'],
    ];
    renderHeader('Available Commands', '──────────────────────────────────────────────');
    for (const [cmd, desc] of helpMenu) {
      await sleep(15);
      appendLine(`  <span class="t-cyan">${cmd.padEnd(26)}</span><span class="t-dim">${desc}</span>`);
    }
    appendLine('  <span class="t-sep">──────────────────────────────────────────────</span>');
    appendLine('  <span class="t-dim">↑↓ history · Tab autocomplete · Esc close</span>');
  },

  about: async () => {
    const p = STATE.personal;
    appendLine(`  <span class="t-green t-bold">▌ ${escHtml(p.name)}</span>`);
    appendLine(`  <span class="t-yellow">${escHtml(p.title)}</span>`);
    appendLine('  <span class="t-sep">────────────────────────────────────────────</span>');
    appendLine(`  📍 <span class="t-white">${escHtml(p.location)}</span>`);
    appendLine(`  📧 <span class="t-cyan">${escHtml(p.email)}</span>`);
    appendLine(`  🟢 <span class="${p.available ? 't-green' : 't-red'}">${p.available ? 'Available for opportunities' : 'Currently unavailable'}</span>\n`);

    // Word wrapper for bio
    const words = p.bio.split(' ');
    let line = '';
    for (const word of words) {
      if ((line + word).length > 60) {
        appendLine(`  <span class="t-white">${escHtml(line.trim())}</span>`);
        line = '';
      }
      line += word + ' ';
    }
    if (line.trim()) appendLine(`  <span class="t-white">${escHtml(line.trim())}</span>`);
  },

  whoami: async () => {
    await sleep(40);
    appendLine('  <span class="t-green">apoorv</span> — Full-Stack Developer & AIML Enthusiast');
    appendLine('  <span class="t-dim">uid=1337(apoorv) gid=42(devs) groups=42(devs),0(ml),1(mern)</span>');
  },

  skills: async () => {
    renderHeader('Tech Stack');
    for (const cat of STATE.skills) {
      await sleep(30);
      const items = cat.items.map(i => i.item || i).join(' · ');
      appendLine(`  <span class="t-cyan">${escHtml(cat.category).padEnd(12)}</span> <span class="t-white">${escHtml(items)}</span>`);
    }
  },

  experience: async () => {
    renderHeader('Work Experience');
    for (const exp of STATE.experience) {
      await sleep(40);
      appendLine(`  <span class="t-green t-bold">${escHtml(exp.company)}</span> <span class="t-dim">·</span> <span class="t-yellow">${escHtml(exp.role)}</span>`);
      appendLine(`  <span class="t-dim">${escHtml(exp.duration)}</span>`);
      appendLine(`  <span class="t-white">${escHtml(exp.description)}</span>\n`);
    }
  },

  exp: async () => { await COMMAND_REGISTRY.experience(); },

  projects: async () => {
    renderHeader('Projects', '──────────────────────────────────────────── <span class="t-dim">(open p1..pN to execute)</span>');
    STATE.projects.forEach(async (proj, i) => {
      await sleep(35);
      const star = proj.featured ? '<span style="color:#e3b341"> ★</span>' : '';
      appendLine(`  <span class="t-green">[p${i + 1}]</span> <span class="t-bold t-white">${escHtml(proj.title)}</span>${star}`);
      appendLine(`       <span class="t-dim">${escHtml(proj.description)}</span>`);
      appendLine(`       <span style="color:#58a6ff">${(proj.tech || []).join(' · ')}</span>\n`);
    });
  },

  blog: async (args) => {
    if (args[0] === 'read' && args[1]) {
      const idx = parseInt(args[1]) - 1;
      const b = STATE.blogs[idx];
      if (!b) return appendLine(`  <span class="t-red">Blog post #${args[1]} not found.</span>`);

      appendLine(`  <span class="t-yellow t-bold">${escHtml(b.title)}</span>`);
      appendLine(`  <span class="t-dim">${escHtml(b.date)} · ${escHtml(b.read_time)} read · ${(b.tags || []).join(', ')}</span>`);
      appendLine('  <span class="t-sep">────────────────────────────────────────────</span>');

      for (const para of b.content.split('\n\n')) {
        await sleep(20);
        if (para.startsWith('## ')) appendLine(`  <span class="t-cyan t-bold">${escHtml(para.slice(3))}</span>`);
        else appendLine(`  <span class="t-white">${escHtml(para)}</span>`);
      }
      appendLine(`  <span class="t-dim">Open in portfolio: </span><span class="t-link t-cyan" onclick="Router.showBlogPost('${b.id}');window.closeCLI()">Click here →</span>`);
      return;
    }

    renderHeader('Blog Posts', '──────────────────────────────────────────── <span class="t-dim">(blog read &lt;n&gt; to read)</span>');
    STATE.blogs.forEach(async (b, i) => {
      await sleep(35);
      const star = b.featured ? '★ ' : '  ';
      const color = b.featured ? '#e3b341' : '#e6edf3';
      appendLine(`  <span class="t-dim">[${i + 1}]</span> <span style="color:${color}">${star}${escHtml(b.title)}</span>`);
      appendLine(`       <span class="t-dim">${escHtml(b.date)} · ${escHtml(b.read_time)} · ${(b.tags || []).join(', ')}</span>`);
    });
  },

  certifications: async (args) => {
    const query = args.join(' ').toLowerCase();
    renderHeader('Certifications');

    const sources = query
      ? STATE.certSources.filter(s => s.name.toLowerCase().includes(query))
      : STATE.certSources;

    if (!sources.length) return appendLine(`  <span class="t-red">No source matching "${escHtml(query)}"</span>`);

    for (const src of sources) {
      const certs = STATE.certifications.filter(c => c.source_id === src.id);
      if (!certs.length) continue;

      appendLine(`  ${src.logo_emoji} <span class="t-cyan t-bold">${escHtml(src.name)}</span> <span class="t-dim">(${certs.length} certs)</span>`);
      for (const c of certs) {
        await sleep(20);
        appendLine(`    <span class="t-white">• ${escHtml(c.title)}</span>`);
        appendLine(`      <span class="t-dim">${escHtml(c.instructor || '')} · ${escHtml(c.issued_date || '')}</span>`);
      }
      appendLine(`    <span class="t-link t-cyan" onclick="Router.showCertsPage('${src.id}');window.closeCLI()">→ View ${escHtml(src.name)} certificates in portfolio</span>\n`);
    }
  },

  certs: async (args) => { await COMMAND_REGISTRY.certifications(args); },

  contact: async () => {
    const p = STATE.personal;
    renderHeader('Get in Touch');
    appendLine(`  📧 <span class="t-cyan t-link" onclick="location.href='mailto:${escHtml(p.email)}'">${escHtml(p.email)}</span>`);
    appendLine(`  💼 <span class="t-cyan t-link" onclick="window.open('${p.linkedin_url}')">${escHtml(p.linkedin_url)}</span>`);
    appendLine(`  💻 <span class="t-cyan t-link" onclick="window.open('${p.github_url}')">${escHtml(p.github_url)}</span>\n`);
    appendLine('  <span class="t-dim">Or type</span> <span class="t-yellow">portfolio</span> <span class="t-dim">and use the contact form.</span>');
  },

  social: async () => {
    const p = STATE.personal;
    const links = [['GitHub', p.github_url, '💻'], ['LinkedIn', p.linkedin_url, '💼'], ['Twitter', p.twitter_url, '🐦'], ['Resume', p.resume_url, '📄']];
    renderHeader('Social Links');
    for (const [label, url, icon] of links) {
      await sleep(25);
      appendLine(`  ${icon} <span class="t-white">${label.padEnd(10)}</span> <span class="t-cyan t-link" onclick="window.open('${escHtml(url)}')">${escHtml(url)}</span>`);
    }
  },

  open: async (args) => {
    const p = STATE.personal;
    const targets = { github: p.github_url, linkedin: p.linkedin_url, twitter: p.twitter_url, resume: p.resume_url };
    if (!args[0]) return appendLine('  Usage: open <github|linkedin|twitter|resume|p1..pN>', 't-line t-dim');

    if (/^p\d+$/.test(args[0])) {
      const idx = parseInt(args[0].slice(1)) - 1;
      const proj = STATE.projects[idx];
      if (proj) {
        appendLine(`  Opening ${escHtml(proj.title)}...`, 't-line t-green');
        setTimeout(() => { window.Router.showProjPage(proj.id); window.closeCLI(); }, 500);
      } else appendLine('  Project not found.', 't-line t-red');
      return;
    }

    const url = targets[args[0]];
    if (url) {
      appendLine(`  Opening ${args[0]}...`, 't-line t-green');
      setTimeout(() => window.open(url), 300);
    } else appendLine(`  Unknown target. Try: github, linkedin, twitter, resume, p1-pN`, 't-line t-red');
  },

  ls: async () => {
    const sections = ['about/', 'skills/', 'experience/', 'projects/', 'certifications/', 'testimonials/', 'blog/', 'contact/'];
    appendLine(`  <span class="t-dim">total ${sections.length}</span>`);
    for (const s of sections) {
      await sleep(15);
      appendLine(`  <span class="t-cyan">drwxr-xr-x</span>  <span class="t-white">${s}</span>`);
    }
  },

  theme: async (args) => {
    if (!args[0] || !['dark', 'light'].includes(args[0])) return appendLine('  Usage: theme <dark|light>', 't-line t-dim');
    document.documentElement.setAttribute('data-theme', args[0]);
    document.getElementById('tog-lbl').textContent = args[0].charAt(0).toUpperCase() + args[0].slice(1);
    appendLine(`  <span class="t-dim">Theme → ${args[0]}</span>`);
  },

  pwd: async () => appendLine('  /home/apoorv/portfolio', 't-line t-white'),
  echo: async (args) => appendLine('  ' + escHtml(args.join(' ')), 't-line t-white'),
  date: async () => appendLine('  ' + new Date().toString(), 't-line t-white'),
  clear: async () => { getBody().innerHTML = ''; },
  portfolio: async () => { window.closeCLI(); window.Router.goHome(); },
  exit: async () => {
    appendLine('  Goodbye! 👋', 't-line t-green');
    setTimeout(window.closeCLI, 500);
  },
  quit: async () => { await COMMAND_REGISTRY.exit(); }
};

// --- Command Execution Hub ---
async function processCommand(cmdLine) {
  const [base, ...args] = cmdLine.split(/\s+/);

  if (COMMAND_REGISTRY[base]) {
    await COMMAND_REGISTRY[base](args);
  } else {
    appendLine(`  <span class="t-red">bash: ${escHtml(base)}: command not found</span>`);
    appendLine(`  Type <span class="t-yellow">help</span> for available commands.`);
  }

  if (base !== 'clear') appendLine('');
}