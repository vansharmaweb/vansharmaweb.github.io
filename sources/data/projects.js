export default [
    {
        title: 'CampusConfessions',
        titleSmall: [ 'Campus', 'Confessions' ],
        url: 'https://campusconfessions.in',
        attributes:
        {
            role: [ 'Full-Stack', 'AI Safety' ],
            at: 'Live Production PWA',
            with: [ 'React', 'Node.js', 'MySQL', 'Groq AI' ]
        },
        distinctions: [],
        accent: '#ffb800',
        slides: [
            {
                badge: '2025 // PRODUCTION PWA',
                headline: 'CampusConfessions.in',
                summary: 'Anonymous college social platform with real-time feeds, voice posts, interactive polls & push alerts.',
                bullets: [
                    'Sub-200ms AI safety moderation via Groq Llama-3.3',
                    'High-concurrency MySQL schema with zero identity telemetry',
                    'Installable PWA with offline fallback & instant notifications'
                ],
                tags: ['React', 'Node.js', 'MySQL', 'Groq Llama-3.3', 'PWA']
            },
            {
                badge: 'MODERATION PIPELINE',
                headline: 'Sub-200ms AI Safety Gate',
                summary: 'Every confession & voice transcript passes an automated Groq inference safety check before hitting the feed.',
                bullets: [
                    'Blocks toxicity, doxxing & PII before DB commit',
                    'Zero user tracking tokens or IP logs retained',
                    'Handles live campus traffic bursts cleanly'
                ],
                tags: ['Groq LPUs', 'Zero-PII', 'Real-time Feeds']
            }
        ],
        images: [
            'campusconfessions-1',
            'campusconfessions-2'
        ]
    },
    {
        title: 'GitGrind',
        titleSmall: [ 'GitGrind' ],
        url: 'https://github.com/vansharmaweb',
        attributes:
        {
            role: [ 'Creator', 'Systems' ],
            at: 'Open Source',
            with: [ 'TypeScript', 'Node.js', 'GitHub API' ]
        },
        distinctions: [],
        accent: '#38bdf8',
        slides: [
            {
                badge: '2025 // DEVELOPER PRODUCTIVITY',
                headline: 'GitGrind Habit Sync',
                summary: 'Organizes LeetCode, GeeksforGeeks & HackerRank solutions straight to GitHub with AI-written notes.',
                bullets: [
                    'Automatic complexity analysis & clean Markdown docs',
                    'Structured repo hierarchy by topic, difficulty & language',
                    'Daily streak tracking to build visible engineering proof'
                ],
                tags: ['TypeScript', 'Node.js', 'GitHub REST', 'AI Docs']
            },
            {
                badge: 'WORKFLOW AUTOMATION',
                headline: 'Zero-Friction Commits',
                summary: 'Turns daily problem-solving into clean, recruiter-readable GitHub commit history automatically.',
                bullets: [
                    'Deduplicates retries & preserves optimal runtime stats',
                    'Customizable commit message & folder templates'
                ],
                tags: ['Automation', 'DSA Archive', 'CLI']
            }
        ],
        images: [
            'gitgrind-1',
            'gitgrind-2'
        ]
    },
    {
        title: 'VajraNet',
        titleSmall: [ 'VajraNet', 'AgentForge' ],
        url: 'https://github.com/vansharmaweb',
        attributes:
        {
            role: [ 'AI Systems', 'Architect' ],
            at: 'R&D Agents',
            with: [ 'Python', 'Groq LPUs', 'Tool Calling' ]
        },
        distinctions: [],
        accent: '#a855f7',
        slides: [
            {
                badge: '2025 // AUTONOMOUS AGENTS',
                headline: 'VajraNet & AgentForge',
                summary: 'Multi-agent orchestration engine built for deterministic tool-calling and customized assistant workflows.',
                bullets: [
                    'Strict JSON tool schemas with validation retries',
                    'Sub-second step execution powered by Groq LPUs',
                    'Composable workflows for research & automation tasks'
                ],
                tags: ['Python', 'Multi-Agent', 'Tool Calling', 'Groq']
            }
        ],
        images: [
            'vajranet-1'
        ]
    },
    {
        title: 'Portfolio Gen',
        titleSmall: [ 'Portfolio', 'Generator' ],
        url: 'https://github.com/vansharmaweb/Portfolio-Generator',
        attributes:
        {
            role: [ 'Full-Stack', 'AI SaaS' ],
            at: 'Developer Tool',
            with: [ 'JavaScript', 'AI Templates', 'Static Gen' ]
        },
        distinctions: [],
        accent: '#10b981',
        slides: [
            {
                badge: '2025 // SAAS BUILDER',
                headline: 'AI Portfolio Generator',
                summary: 'Converts developer repos, skills & experience into clean static portfolio sites in seconds.',
                bullets: [
                    'Structured JSON-to-HTML static pipeline',
                    'Zero-dependency responsive themes ready for GitHub Pages'
                ],
                tags: ['JavaScript', 'HTML5', 'CSS3', 'AI Gen']
            }
        ],
        images: [
            'portfoliogen-1'
        ]
    },
    {
        title: 'UtilityX',
        titleSmall: [ 'UtilityX' ],
        url: 'https://github.com/vansharmaweb',
        attributes:
        {
            role: [ 'Frontend', 'Tooling' ],
            at: 'Offline Suite',
            with: [ 'TypeScript', 'Web APIs', 'Zero Telemetry' ]
        },
        distinctions: [],
        accent: '#06b6d4',
        slides: [
            {
                badge: '2024 // OFFLINE DEV SUITE',
                headline: 'UtilityX Browser Toolkit',
                summary: '100% client-side developer utilities for JSON formatting, JWT decoding, Base64 & live regex testing.',
                bullets: [
                    'Zero server calls — secrets & tokens never leave browser RAM',
                    'Keyboard-first workflow with instant clipboard feedback'
                ],
                tags: ['TypeScript', 'Client-Side', 'Privacy First']
            }
        ],
        images: [
            'utilityx-1'
        ]
    },
    {
        title: 'Hospital DB',
        titleSmall: [ 'Hospital', 'System' ],
        url: 'https://github.com/vansharmaweb',
        attributes:
        {
            role: [ 'Backend', 'Database' ],
            at: 'Systems Core',
            with: [ 'OOP', 'SQL', 'ACID Transactions' ]
        },
        distinctions: [],
        accent: '#f43f5e',
        slides: [
            {
                badge: '2024 // RELATIONAL SYSTEMS',
                headline: 'Hospital Management System',
                summary: 'Strict Object-Oriented application backed by normalized SQL schemas & atomic billing transactions.',
                bullets: [
                    'Patient admissions, doctor shift scheduling & billing integrity',
                    'Foreign-key relational constraints & audit-ready queries'
                ],
                tags: ['SQL', 'OOP', 'ACID', 'System Design']
            }
        ],
        images: [
            'hospital-1'
        ]
    }
]
