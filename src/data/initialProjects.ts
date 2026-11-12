import { Project } from '../types/project';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-ethiore-hrms',
    name: 'Ethiore HRMS',
    slug: 'ethiore-hrms',
    tagline: 'Enterprise Human Resource & Payroll Simulation System',
    description: 'Comprehensive human resource administration prototype featuring employee directory, department administration, leave workflow, attendance tracking, and simulated payroll processing.',
    detailedDescription: 'Ethiore HRMS is an enterprise-scale software prototype engineered to streamline employee lifecycles and administrative tasks. The system showcases department hierarchies, role-based access, interactive leave application and approval pipelines, simulated punch-clock biometric attendance, and one-click demo payroll slip calculation with automated tax and pension deductions.',
    category: 'Web Applications',
    thumbnail: '/src/assets/images/ethiore_hrms_mockup_1794468184989.jpg',
    screenshots: [
      '/src/assets/images/ethiore_hrms_mockup_1794468184989.jpg',
      '/src/assets/images/hero_tech_workspace_1794468183248.jpg'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL Schema', 'Express API'],
    features: [
      'Employee directory with profiles, roles, and status management',
      'Department administrative hierarchy & reporting lines',
      'Leave request lifecycle with simulated manager approval',
      'Daily attendance logs & biometric punch simulation',
      'Interactive payroll slip generator with tax breakdown',
      'Employee self-service simulated dashboard'
    ],
    previewType: 'internal',
    previewUrl: 'https://demo.eruknehademe.com/ethiore-hrms',
    projectStatus: 'Completed',
    isPublished: true,
    isFeatured: true,
    order: 1,
    createdAt: '2026-02-15',
    demoCredentials: [
      { role: 'HR Executive', username: 'admin@ethiore-demo.com', pinOrPassword: 'demo-admin-hrms' },
      { role: 'Staff Member', username: 'staff@ethiore-demo.com', pinOrPassword: 'demo-staff-hrms' }
    ],
    specifications: {
      'Architecture': 'Single Page Application (SPA) with REST endpoints',
      'Data Integrity': 'Sample Sandbox in-memory store',
      'Compliance': 'Standard Ethiopian Tax & Labor Law Mock Formulas',
      'Security Mode': 'Demonstration Sandbox – No live PII stored'
    }
  },
  {
    id: 'proj-inventory-system',
    name: 'Inventory Management System',
    slug: 'inventory',
    tagline: 'Multi-Warehouse Stock Ledger & FIFO Asset Tracking Prototype',
    description: 'Precision inventory management solution featuring real-time stock levels, automated FIFO bin cards, supplier tracking, inbound/outbound logging, and valuation analytics.',
    detailedDescription: 'Designed for distribution centers and retail warehouses, this software prototype demonstrates modern supply chain management. It includes automated First-In First-Out (FIFO) stock valuation, warehouse bin card audits, item transfer workflows between facilities, supplier directory management, and instant stock-out alerts.',
    category: 'Web Applications',
    thumbnail: '/src/assets/images/inventory_system_mockup_1794468185822.jpg',
    screenshots: [
      '/src/assets/images/inventory_system_mockup_1794468185822.jpg',
      '/src/assets/images/hero_tech_workspace_1794468183248.jpg'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Tabular Ledger', 'Chart.js Simulation', 'REST API'],
    features: [
      'Comprehensive inventory items ledger with SKU codes',
      'Item classification across custom categories and units',
      'Supplier relationship management directory',
      'Stock In & Stock Out receipt logging with audit notes',
      'Inter-warehouse item transfer and return simulation',
      'Automated FIFO (First-In, First-Out) inventory valuation',
      'Real-time Bin Card history reports & low-stock alerts'
    ],
    previewType: 'internal',
    previewUrl: 'https://demo.eruknehademe.com/inventory',
    projectStatus: 'Completed',
    isPublished: true,
    isFeatured: true,
    order: 2,
    createdAt: '2026-03-01',
    demoCredentials: [
      { role: 'Warehouse Controller', username: 'logistics@demo.eruknehademe.com', pinOrPassword: 'warehouse-demo-123' },
      { role: 'Auditor', username: 'audit@demo.eruknehademe.com', pinOrPassword: 'audit-demo-123' }
    ],
    specifications: {
      'Valuation Method': 'First-In First-Out (FIFO) Ledger',
      'Ledger Type': 'Bin Card double-entry ledger simulation',
      'Tracking': 'SKU, Batch ID, and Reorder Point thresholds',
      'Security Mode': 'Demo Prototype – Mock Stock Data'
    }
  },
  {
    id: 'proj-corporate-website',
    name: 'Corporate Website',
    slug: 'corporate',
    tagline: 'High-Performance Enterprise Digital Presence Platform',
    description: 'Sophisticated corporate portal prototype featuring institutional vision, multi-service catalogues, executive management directory, corporate newsroom, and client engagement hubs.',
    detailedDescription: 'A modern, accessible, and high-performance website architecture developed for corporate institutions and technology enterprises. Featuring modular component blocks, leadership executive profiles, dynamic press releases, downloadable resources, and interactive consultation scheduling.',
    category: 'Website Projects',
    thumbnail: '/src/assets/images/corporate_web_mockup_1794468185286.jpg',
    screenshots: [
      '/src/assets/images/corporate_web_mockup_1794468185286.jpg',
      '/src/assets/images/hero_tech_workspace_1794468183248.jpg'
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Accessible Semantic HTML5', 'SEO Structured Data'],
    features: [
      'Modular corporate homepage with mission & impact metrics',
      'Organization history and strategic vision statement',
      'Multi-tier enterprise services and solutions showcase',
      'Executive management & board of directors profiles',
      'Newsroom with press releases and company announcements',
      'Interactive business inquiry contact & scheduling portal'
    ],
    previewType: 'internal',
    previewUrl: 'https://demo.eruknehademe.com/corporate',
    projectStatus: 'Completed',
    isPublished: true,
    isFeatured: true,
    order: 3,
    createdAt: '2026-01-20',
    specifications: {
      'SEO Performance': '100/100 Lighthouse Benchmark Design',
      'Accessibility': 'WCAG 2.1 AA Compliant Color & Structure',
      'Content Model': 'JSON-LD Schema & Semantic Microdata',
      'Security Mode': 'Demo Prototype Sandbox'
    }
  },
  {
    id: 'proj-mobile-app',
    name: 'Mobile Application Prototype',
    slug: 'mobile-app',
    tagline: 'Cross-Platform Mobile FinTech & Task Experience',
    description: 'Touch-optimized mobile application prototype featuring biometric login simulation, account portfolio cards, rapid micro-transactions, and smooth gesture transitions.',
    detailedDescription: 'Engineered as a mobile-first digital experience, this prototype demonstrates fluid touch navigation, card-based portfolio dashboards, secure user profile onboarding, simulated payment transfers with confirmation haptics, and instant account statistics within an authentic mobile smartphone frame.',
    category: 'Mobile Applications',
    thumbnail: '/src/assets/images/mobile_app_mockup_1794468185597.jpg',
    screenshots: [
      '/src/assets/images/mobile_app_mockup_1794468185597.jpg',
      '/src/assets/images/hero_tech_workspace_1794468183248.jpg'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind Mobile Utility', 'Motion Transitions', 'Touch Gesture Sandbox'],
    features: [
      'Adaptive mobile viewport with smartphone frame simulator',
      'Interactive simulated user registration & onboarding',
      'Fintech portfolio dashboard with live sample balances',
      'Simulated peer-to-peer money transfer workflow',
      'User profile management & security preferences',
      'Touch-friendly bottom navigation dock'
    ],
    previewType: 'internal',
    previewUrl: 'https://demo.eruknehademe.com/mobile-app',
    projectStatus: 'Completed',
    isPublished: true,
    isFeatured: true,
    order: 4,
    createdAt: '2026-02-28',
    demoCredentials: [
      { role: 'Mobile App User', username: 'alex.t@mobile-demo.com', pinOrPassword: 'passcode: 4892' }
    ],
    specifications: {
      'Target Platform': 'iOS & Android Responsive Hybrid Layout',
      'Form Factor': 'Touch-first 390x844px Mobile Viewport Simulator',
      'Animation Engine': 'Compositor CSS transitions (sub-200ms)',
      'Security Mode': 'Simulated Sandbox – Zero Real Money Movement'
    }
  },
  {
    id: 'proj-telecom-crm-design',
    name: 'Nova Telco Design System & UI',
    slug: 'nova-telco-ui',
    tagline: 'High-Density Customer Operations & Plan Management UI/UX',
    description: 'Modern design system exploration for telecommunication operators, featuring customer journey mapping, subscription tier configurators, and network usage telemetry.',
    detailedDescription: 'A comprehensive UI/UX design prototype focused on minimizing cognitive load for support agents and customers alike. It features custom design tokens, dark and light theme consistency, high-density subscriber data tables, and an interactive data bundle builder.',
    category: 'UI/UX Designs',
    thumbnail: '/src/assets/images/hero_tech_workspace_1794468183248.jpg',
    screenshots: [
      '/src/assets/images/hero_tech_workspace_1794468183248.jpg',
      '/src/assets/images/ethiore_hrms_mockup_1794468184989.jpg'
    ],
    techStack: ['Figma Design System', 'Tailwind CSS Tokens', 'React Prototyping', 'WCAG AAA Color Geometry'],
    features: [
      'Comprehensive UI Component Library and Token System',
      'Interactive subscriber plan comparison and pricing slider',
      'Customer support timeline ticket viewer',
      'Accessibility-first typography scale and focus rings'
    ],
    previewType: 'internal',
    previewUrl: 'https://demo.eruknehademe.com/nova-telco-ui',
    projectStatus: 'In Development',
    isPublished: true,
    isFeatured: false,
    order: 5,
    createdAt: '2026-03-08'
  }
];
