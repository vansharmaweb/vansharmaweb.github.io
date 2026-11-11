/**
 * Vansh Sharma — Portfolio & Digital Garden
 * Interactive behaviors: Theme toggling, accent colors, mobile drawer, field notes modal & Vansh AI.
 */

(function () {
  'use strict';

  // ─── 1. THEME TOGGLING (DARK / LIGHT) ──────────────────────────
  const THEME_KEY = 'vansh_theme';
  const COLOR_KEY = 'vansh_accent_color';
  const COLOR_PALETTE = ['yellow', 'blue', 'green', 'pink', 'lavender'];

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    applyTheme(isDark);

    const savedColor = localStorage.getItem(COLOR_KEY) || 'yellow';
    applyAccentColor(savedColor);
  }

  function applyTheme(isDark) {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('is-dark');
      root.classList.remove('is-light');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      root.classList.add('is-light');
      root.classList.remove('is-dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
    updateThemeIcons(isDark);
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('is-dark');
    applyTheme(!isDark);
  }

  function updateThemeIcons(isDark) {
    // Sun icon for dark mode (click to make light), Moon icon for light mode (click to make dark)
    const sunSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>`;
    const moonSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>`;

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.innerHTML = isDark ? sunSvg : moonSvg;
      btn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  // ─── 2. ACCENT COLOR CYCLER ───────────────────────────────────
  function applyAccentColor(color) {
    if (!COLOR_PALETTE.includes(color)) color = 'yellow';
    document.documentElement.setAttribute('data-color', color);
    localStorage.setItem(COLOR_KEY, color);

    // Update color indicator dots
    document.querySelectorAll('.accent-color-circle').forEach(circle => {
      circle.style.backgroundColor = `var(--theme-${color})`;
    });

    // Update active state in color menu if open
    document.querySelectorAll('.color-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.color === color);
    });
  }

  function cycleAccentColor() {
    const current = document.documentElement.getAttribute('data-color') || 'yellow';
    const nextIndex = (COLOR_PALETTE.indexOf(current) + 1) % COLOR_PALETTE.length;
    applyAccentColor(COLOR_PALETTE[nextIndex]);
  }

  // ─── 3. MOBILE SIDEBAR DRAWER ─────────────────────────────────
  function setupMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.querySelector('.sidebar-backdrop');
    const menuButtons = document.querySelectorAll('.nav-menu-button');

    function openSidebar() {
      if (sidebar) sidebar.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      if (sidebar) sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    menuButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (sidebar && sidebar.classList.contains('is-open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeSidebar);
    }

    // Close when clicking nav links in mobile sidebar
    document.querySelectorAll('.sidebar-nav-links a, .sidebar-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1020) closeSidebar();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });
  }

  // ─── 4. PROJECT FIELD NOTES MODAL ─────────────────────────────
  const PROJECT_NOTES = {
    campusconfessions: {
      title: "CampusConfessions",
      subtitle: "Anonymous Campus Social Platform with AI Moderation",
      year: "2025",
      tags: ["React", "Node.js", "Python", "SQL", "Groq AI", "GCP"],
      live: "https://campusconfessions.in",
      github: "https://github.com/vansharmaweb",
      content: `
        <p><strong>CampusConfessions</strong> was born from a simple observation: university students often need a safe, judgment-free space to speak candidly about campus life, academics, mental health, and community questions.</p>
        
        <h4>Key Technical Contributions</h4>
        <ul>
          <li><strong>Real-Time Anonymous Feeds:</strong> Designed high-concurrency feeds supporting polls, anonymous comments, and audio voice posts without storing identifying user headers.</li>
          <li><strong>Automated AI Moderation:</strong> Built a multi-tier safety pipeline integrating Groq Llama-3.3 to flag hate speech, personal harassment, and sensitive personal information in under 200ms before posts hit the database.</li>
          <li><strong>Scalable Relational Database:</strong> Optimized MySQL indexes and relational schemas to handle peak traffic bursts during campus exam seasons.</li>
          <li><strong>Push Notifications & Engagement:</strong> Integrated web push alerts for trending discussions and campus updates.</li>
        </ul>

        <h4>Engineering Focus</h4>
        <p>Balancing extreme user anonymity with rigorous content safety and high-speed delivery. Built with zero tracking cookies and end-to-end sanitized input channels.</p>
      `
    },
    gitgrind: {
      title: "GitGrind",
      subtitle: "Developer Habit Tracker & CP Solutions Visualizer",
      year: "2025",
      tags: ["Python", "GitHub Actions", "REST API", "Automation", "Developer Tools"],
      github: "https://github.com/vansharmaweb",
      content: `
        <p><strong>GitGrind</strong> bridges the gap between competitive programming practice and real-world developer portfolios. Many students solve hundreds of problems across LeetCode, GeeksforGeeks, and HackerRank, yet their GitHub contribution graphs remain blank.</p>

        <h4>Key Technical Contributions</h4>
        <ul>
          <li><strong>Submission Syncing & Webhook Listeners:</strong> Automatically captures accepted solutions, parses problem statements, and categorizes solutions by topic (Trees, DP, Graphs).</li>
          <li><strong>Automated Commit Pipeline:</strong> Generates clean, well-formatted Markdown documentation and commits code directly to user GitHub repositories with custom messages.</li>
          <li><strong>Habit Metrics & Streaks:</strong> Calculates daily consistency streaks and provides data visualization badges for developer profiles.</li>
        </ul>

        <h4>Engineering Focus</h4>
        <p>Designing seamless automation that requires zero manual copy-pasting, empowering developers to maintain verifiable proof of their problem-solving journey.</p>
      `
    },
    portfoliogenerator: {
      title: "Portfolio Website Generator",
      subtitle: "AI-Powered Instant Developer Portfolio SaaS",
      year: "2025",
      tags: ["TypeScript", "React", "Tailwind CSS", "Groq API", "JSON Schema"],
      live: "https://vansharma.is-a.dev",
      github: "https://github.com/vansharmaweb",
      content: `
        <p><strong>Portfolio Website Generator</strong> is a lightweight developer tool that converts raw structured JSON (skills, GitHub repos, education, and social links) into highly optimized, responsive personal portfolios.</p>

        <h4>Key Technical Contributions</h4>
        <ul>
          <li><strong>Schema-Driven UI Engine:</strong> Dynamic layout generators rendering custom themes, project grids, and interactive components on the fly.</li>
          <li><strong>AI Bio & Project Summary Enhancer:</strong> Leverages LLMs to distill messy project READMEs into punchy, recruiter-friendly field notes and key highlights.</li>
          <li><strong>Export & Deployment Ready:</strong> Exports clean static HTML/CSS/JS ready for 1-click deployment on GitHub Pages, Netlify, or Vercel.</li>
        </ul>
      `
    },
    utilityx: {
      title: "UtilityX",
      subtitle: "High-Speed Browser Developer Utilities Suite",
      year: "2024",
      tags: ["JavaScript", "HTML5", "CSS3", "Web Workers", "Productivity"],
      github: "https://github.com/vansharmaweb",
      content: `
        <p><strong>UtilityX</strong> is a zero-latency, client-side utility suite designed for developers who are tired of bloated online formatters filled with trackers and advertisements.</p>

        <h4>Core Modules</h4>
        <ul>
          <li><strong>JSON Validator & Tree Formatter:</strong> High-speed syntax checking and collapsible tree view.</li>
          <li><strong>JWT Inspector:</strong> Offline decoding of header, payload, and signature expiry verification.</li>
          <li><strong>Base64 / URL Encoder & Decoder:</strong> Instant bidirectional transformation.</li>
          <li><strong>Regex Sandbox:</strong> Real-time regular expression match testing and cheat sheet.</li>
        </ul>
        <p><em>Privacy-First:</em> Runs 100% in the client browser memory with zero network calls.</p>
      `
    },
    hospitalmgmt: {
      title: "Hospital Management System",
      subtitle: "Relational Database & OOP Architecture",
      year: "2024",
      tags: ["C++", "SQL", "Relational Database", "OOP", "System Architecture"],
      github: "https://github.com/vansharmaweb",
      content: `
        <p>A comprehensive system engineered from first principles to explore enterprise database design, strict OOP patterns, and data consistency in high-stakes environments.</p>

        <h4>Architectural Highlights</h4>
        <ul>
          <li><strong>Relational Database Design:</strong> Fully normalized (3NF) relational schema with ACID transaction guarantees across patient admissions, doctor assignments, and billing.</li>
          <li><strong>OOP Domain Modeling:</strong> Polymorphic class hierarchies for hospital staff, patients, medical equipment, and appointment schedules.</li>
          <li><strong>Data Integrity & Concurrency:</strong> Strict foreign key cascading, index optimization for search queries, and audit logging.</li>
        </ul>
      `
    },
    vajranet: {
      title: "VajraNet & AgentForge",
      subtitle: "Intelligent Connected Systems & AI Platform Concepts",
      year: "2025",
      tags: ["Python", "Groq AI", "System Design", "Multi-Agent Workflows"],
      github: "https://github.com/vansharmaweb",
      content: `
        <p>A research and implementation exploration into how intelligent multi-agent systems can automate complex multi-step workflows for developer operations and business assistance.</p>
        
        <h4>Explorations</h4>
        <ul>
          <li>Translating unstructured human business instructions into structured API tool calls.</li>
          <li>Autonomous task orchestration and self-correcting execution loops.</li>
          <li>Context management and long-term memory retrieval for domain-specific assistants.</li>
        </ul>
      `
    }
  };

  function setupFieldNotesModal() {
    const overlay = document.getElementById('field-notes-modal');
    if (!overlay) return;

    const dialog = overlay.querySelector('.modal-dialog');
    const titleEl = document.getElementById('modal-title');
    const subtitleEl = document.getElementById('modal-subtitle');
    const yearEl = document.getElementById('modal-year');
    const tagsEl = document.getElementById('modal-tags');
    const bodyEl = document.getElementById('modal-body');
    const linksEl = document.getElementById('modal-links');
    const closeBtn = document.getElementById('modal-close');

    function openModal(projectId) {
      const data = PROJECT_NOTES[projectId];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (subtitleEl) subtitleEl.textContent = data.subtitle;
      if (yearEl) yearEl.textContent = data.year;
      
      if (tagsEl) {
        tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join(' ');
      }
      
      if (bodyEl) {
        bodyEl.innerHTML = data.content;
      }

      if (linksEl) {
        let linksHtml = '';
        if (data.live) {
          linksHtml += `<a class="button secondary small" href="${data.live}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a> `;
        }
        if (data.github) {
          linksHtml += `<a class="button secondary small" href="${data.github}" target="_blank" rel="noopener noreferrer">GitHub Source ↗</a>`;
        }
        linksEl.innerHTML = linksHtml;
      }

      overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-field-note]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-field-note');
        openModal(id);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  // ─── 5. ONE-CLICK EMAIL COPY ──────────────────────────────────
  function setupClipboard() {
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'vansharmaweb@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          const feedback = btn.querySelector('.copy-feedback');
          if (feedback) {
            feedback.classList.add('is-visible');
            setTimeout(() => {
              feedback.classList.remove('is-visible');
            }, 2000);
          } else {
            alert('Copied to clipboard: ' + email);
          }
        }).catch(() => {
          prompt('Copy email:', email);
        });
      });
    });
  }

  // ─── 6. RETRO TERMINAL & VANSH AI AVATAR ───────────────────────
  function setupVanshAI() {
    const terminalBody = document.getElementById('ai-terminal-body');
    const input = document.getElementById('ai-terminal-input');
    const sendBtn = document.getElementById('ai-terminal-send');

    if (!terminalBody || !input) return;

    const apiKey = window.GROQ_API_KEY || localStorage.getItem('groq_api_key');

    const KNOWLEDGE_BASE = {
      who: "Vansh Sharma is a 2nd-year B.Tech CSE (AI/ML) student at PSIT Kanpur (CGPA: 8.86/10), full-stack developer, and open-source builder passionate about high-impact software.",
      internship: "Vansh is actively seeking Summer 2026 software engineering & AI/ML internships! He brings strong foundations in C++, Python, SQL, React, Node.js, and practical AI systems.",
      projects: "Vansh's featured projects include CampusConfessions (anonymous campus community with AI moderation), GitGrind (developer CP visualizer), Portfolio Website Generator, and UtilityX.",
      campusconfessions: "CampusConfessions is an anonymous campus community platform built with React, Node.js, and Groq AI for real-time safety moderation. Live at https://campusconfessions.in",
      skills: "Primary stack: C++, Python, SQL, JavaScript, TypeScript, React, Node.js, Flask, Tailwind CSS, GCP, Git, and Groq LLMs.",
      contact: "You can reach Vansh via email at vansharmaweb@gmail.com, GitHub @vansharmaweb, or LinkedIn @vansharmaweb."
    };

    function appendMessage(sender, text, isAi = false) {
      const line = document.createElement('div');
      line.style.marginBottom = '8px';
      line.style.lineHeight = '1.45';

      if (isAi) {
        line.innerHTML = `<span style="color:var(--color-primary);font-weight:600;">vansh_ai ></span> ${text}`;
      } else {
        line.innerHTML = `<span style="color:var(--color-text-muted);font-weight:600;">guest ></span> ${text}`;
      }

      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    async function handleSend() {
      const prompt = input.value.trim();
      if (!prompt) return;

      appendMessage('guest', prompt, false);
      input.value = '';

      // Try Groq API if key exists, otherwise use intelligent local knowledge base
      if (apiKey) {
        appendMessage('vansh_ai', 'Thinking...', true);
        const lastMsg = terminalBody.lastElementChild;

        try {
          const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: window.AI_MODEL || 'llama-3.3-70b-versatile',
              messages: [
                {
                  role: 'system',
                  content: window.AI_SYSTEM_PROMPT || 'You are Vansh AI, the official personal AI avatar for Vansh Sharma. Keep replies short (1-3 sentences maximum!), direct, friendly, and energetic.'
                },
                { role: 'user', content: prompt }
              ],
              temperature: 0.7,
              max_tokens: 150
            })
          });

          if (resp.ok) {
            const data = await resp.json();
            const reply = data.choices[0]?.message?.content || 'Thanks for reaching out! Feel free to connect via email: vansharmaweb@gmail.com';
            lastMsg.innerHTML = `<span style="color:var(--color-primary);font-weight:600;">vansh_ai ></span> ${reply}`;
            return;
          }
        } catch (err) {
          console.warn('Groq API call error, falling back to local KB', err);
        }
      }

      // Offline / Local Knowledge Base Fallback
      setTimeout(() => {
        const lower = prompt.toLowerCase();
        let reply = "Hello! I'm Vansh's digital avatar. Feel free to explore his projects above or reach out directly at vansharmaweb@gmail.com!";

        if (lower.includes('intern') || lower.includes('hire') || lower.includes('job') || lower.includes('summer')) {
          reply = KNOWLEDGE_BASE.internship;
        } else if (lower.includes('who') || lower.includes('about') || lower.includes('vansh')) {
          reply = KNOWLEDGE_BASE.who;
        } else if (lower.includes('project') || lower.includes('work') || lower.includes('built')) {
          reply = KNOWLEDGE_BASE.projects;
        } else if (lower.includes('campus') || lower.includes('confession')) {
          reply = KNOWLEDGE_BASE.campusconfessions;
        } else if (lower.includes('stack') || lower.includes('tech') || lower.includes('skill') || lower.includes('languages')) {
          reply = KNOWLEDGE_BASE.skills;
        } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
          reply = KNOWLEDGE_BASE.contact;
        }

        appendMessage('vansh_ai', reply, true);
      }, 350);
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    // Quick prompt buttons
    document.querySelectorAll('[data-quick-prompt]').forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.getAttribute('data-quick-prompt');
        handleSend();
      });
    });
  }

  // ─── INITIALIZATION ON DOM READY ──────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    // Theme toggle buttons (sun/moon)
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Accent color cycler buttons
    document.querySelectorAll('.accent-cycler-btn').forEach(btn => {
      btn.addEventListener('click', cycleAccentColor);
    });

    setupMobileSidebar();
    setupFieldNotesModal();
    setupClipboard();
    setupVanshAI();
  });
})();
