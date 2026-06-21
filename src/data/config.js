/**
 * ============================================================================
 * PORTFOLIO CONFIGURATION DATA
 * ============================================================================
 * This file acts as the SINGLE SOURCE OF TRUTH for your entire portfolio.
 * Since the admin panel was removed, you can simply edit this file to update 
 * your site content. The React app and the Developer Terminal will both 
 * instantly reflect any changes you make here.
 * 
 * INSTRUCTIONS:
 * - Make sure to keep the quotes around strings.
 * - For URLs, use absolute URLs (starting with http:// or https://) or relative 
 *   paths (like /images/my-project.png) if you store images in the /public folder.
 * - 'sort_order' helps arrange items in some views, but mostly arrays render in order.
 * - DO NOT remove the `window.STATE` export at the bottom, as it powers the terminal.
 * ============================================================================
 */

export const portfolioConfig = {

  // --------------------------------------------------------------------------
  // 1. PERSONAL INFORMATION (Hero section, About, Contact, Terminal Whoami)
  // --------------------------------------------------------------------------
  personal: {
    id: null,
    name: "Apoorv Mehrotra",
    title: "AIML Enthusiast & MERN Stack Developer", // Displays under your name
    bio: "Building at the intersection of Artificial Intelligence, Automation, and Digital Innovation. Passionate about creating intelligent systems, scalable products, and impactful experiences that transform ideas into meaningful solutions for the real world.",
    email: "apoorv.mehrotra.work@gmail.com",
    location: "India · Open to Remote",
    available: true, // Changes the green/red dot status
    photo_url: "/profile.jpg", // Add a URL to your photo if needed

    // Social links used by terminal and general site headers
    github_url: "https://github.com/programmerbeast2004",
    linkedin_url: "https://www.linkedin.com/in/its-apoorv-/",
    twitter_url: "https://x.com/Xandros07",
    resume_url: "https://drive.google.com/file/d/10Q-oJ4Kwh-JT8d7Ubk1-q977wbFCDk5s/view?usp=sharing",

    // Specific arc-links (the curved links around the hero image)
    socials: {
      github: "https://github.com/programmerbeast2004",
      linkedin: "https://www.linkedin.com/in/its-apoorv-/",
      twitter: "https://x.com/Xandros07",
      resume: "https://drive.google.com/file/d/10Q-oJ4Kwh-JT8d7Ubk1-q977wbFCDk5s/view?usp=sharing",
      leetcode: "https://leetcode.com/u/programmer_exe/",
      codeforces: "https://codeforces.com/profile/The_Better_Coder"
    }
  },

  // Fallback social object (kept for backward compatibility with some components)
  social: {
    github: "https://github.com/programmerbeast2004",
    linkedin: "https://www.linkedin.com/in/its-apoorv-/",
    twitter: "https://x.com/Xandros07",
    resume: "https://drive.google.com/file/d/10Q-oJ4Kwh-JT8d7Ubk1-q977wbFCDk5s/view?usp=sharing",
    leetcode: "https://leetcode.com/u/programmer_exe/",
    codeforces: "https://codeforces.com/profile/The_Better_Coder"
  },

  // --------------------------------------------------------------------------
  // 2. QUICK STATS (Displayed in the About Section)
  // --------------------------------------------------------------------------
  stats: [
    { id: "s1", value: "15+", label: "Projects Shipped", sort_order: 1 },
    { id: "s2", value: "3+", label: "Years Coding", sort_order: 2 },
    { id: "s3", value: "5+", label: "ML Models Deployed", sort_order: 3 },
    { id: "s4", value: "200+", label: "GitHub Stars", sort_order: 4 },
  ],

  // --------------------------------------------------------------------------
  // 3. SKILLS & TECHNOLOGIES
  // --------------------------------------------------------------------------
  // Grouped by category. 'item' is the actual string rendered.
  skills: [
    {
      id: "sk1", category: "Frontend", sort_order: 1, items: [
        { id: "ski1", item: "React.js" }, { id: "ski2", item: "Next.js" },
        { id: "ski3", item: "TypeScript" }, { id: "ski4", item: "Tailwind CSS" }, { id: "ski5", item: "Redux" }
      ]
    },
    {
      id: "sk2", category: "Backend", sort_order: 2, items: [
        { id: "ski6", item: "Node.js" }, { id: "ski7", item: "Express.js" },
        { id: "ski8", item: "REST APIs" }, { id: "ski9", item: "GraphQL" }, { id: "ski10", item: "Socket.io" }
      ]
    },
    {
      id: "sk3", category: "AI / ML Engineering", sort_order: 3, items: [
        { id: "ski11", item: "Python & Scikit-learn" }, { id: "ski12", item: "PyTorch & TensorFlow" },
        { id: "ski13", item: "Agentic AI & LangChain" }, { id: "ski14", item: "RAG Architectures" }, { id: "ski15", item: "LLM Fine-Tuning" }
      ]
    },
    {
      id: "sk4", category: "Database & BaaS", sort_order: 4, items: [
        { id: "ski16", item: "PostgreSQL" }, { id: "ski17", item: "MongoDB" },
        { id: "ski18", item: "Supabase & Firebase" }, { id: "ski19", item: "Vector DBs (Pinecone)" }, { id: "ski20", item: "Redis" }
      ]
    },
    {
      id: "sk5", category: "DevOps & Automation", sort_order: 5, items: [
        { id: "ski21", item: "Docker" }, { id: "ski22", item: "AWS EC2" },
        { id: "ski23", item: "Git & CI/CD" }, { id: "ski24", item: "n8n Automation" }, { id: "ski25", item: "Linux" }
      ]
    },
  ],

  // --------------------------------------------------------------------------
  // 4. WORK EXPERIENCE
  // --------------------------------------------------------------------------
  experience: [
    { id: "e1", company: "Sanixor AI", role: "GEN AI & Full Stack Developer", duration: "Jun 2026 – Present", description: "Building generative AI solutions and developing full-stack applications integrating modern AI workflows.", sort_order: 1 },
    { id: "e2", company: "Builder Base", role: "Mentor", duration: "Jul 2025 – Present", description: "Mentor and community builder at Builder Base, helping students learn, build, and grow in Web3. I actively guide developers and contribute to a collaborative builder-first environment.", sort_order: 2 },
    { id: "e3", company: "Open Source", role: "Open Source Contributor", duration: "2022 – Present", description: "Actively contributed in various open source projects.", sort_order: 3 },
    { id: "e4", company: "VAP'D DashSteam Pvt. Ltd", role: "Content Writer", duration: "Jun 2025 – Jul 2025", description: "Contributed as a content writer and wrote fabulous scripts for their ad campaign.", sort_order: 4 },
    { id: "e5", company: "Baoiam Innovations Pvt Ltd", role: "Web Developer & Software Tester", duration: "Jun 2024 – Aug 2024", description: "Contributed and developed various webpages based on the tasks assigned to us. Also was responsible for manual testing the overall functionalities and features of the websites.", sort_order: 5 },
  ],

  // --------------------------------------------------------------------------
  // 5. PROJECTS
  // --------------------------------------------------------------------------
  // featured: true -> Shows on the homepage grid.
  // long_description & screenshot_url -> Rendered on the single project details page (/projects/:id)
  projects: [
    {
      id: "32db7052-329c-49ad-ab47-448493972628",
      title: "Text to Image Generator",
      featured: true,
      type: "web",
      description: "A simple web-based tool that converts custom text into downloadable images with configurable fonts, styles, and colors.",
      long_description: "This project is a lightweight and user-friendly text-to-image generator built using React and Tailwind CSS. It allows users to convert plain text into visually styled images with real-time preview functionality. Users can customize font family, size, style (bold, italic, underline), text color, and background color, along with the ability to upload custom fonts for enhanced personalization. The application dynamically renders the text onto a canvas and enables users to export the final output as an image. It focuses on simplicity, performance, and an intuitive UI, making it useful for creating social media content, banners, and quick design assets without relying on heavy design tools.",
      tech: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML5 Canvas"],
      github_url: "https://github.com/programmerbeast2004/text-image.conv",
      live_url: "https://text-image-conv.vercel.app/",
      image_url: "/assets/projects/proj1.jpg",
      screenshot_url: "/assets/projects/proj1.jpg",
      sort_order: 3
    },
    {
      id: "5391a3f9-6d73-4a43-92ff-48888303fb9e",
      title: "Mechanical Elevator Clock",
      featured: false,
      type: "web",
      description: "A visually engaging elevator-style digital clock that simulates moving number towers using smooth animations.",
      long_description: "This project is a unique digital clock inspired by mechanical elevator display systems. Built using React and Tailwind CSS, it visually represents time through vertically scrolling number towers that mimic elevator movements behind fixed viewing windows. The clock updates in real time and provides both 12-hour and 24-hour formats for better usability. The focus of this project is on smooth animations, creative UI design, and performance optimization. It demonstrates strong frontend skills including state management, animation handling, and responsive design while delivering an interactive and visually appealing user experience.",
      tech: ["React", "Tailwind CSS", "JavaScript", "CSS Animations"],
      github_url: "https://github.com/programmerbeast2004/Digital_Clock",
      live_url: "https://digital-clock-one-ochre.vercel.app/",
      image_url: "/assets/projects/proj2.jpg",
      screenshot_url: "/assets/projects/proj2.jpg",
      sort_order: 4
    },
    {
      id: "a7832175-3b44-4cad-ad19-7f604a514d23",
      title: "E-Commerce Product Store (React + Tailwind)",
      featured: false,
      type: "web",
      description: "A responsive e-commerce product store built with React and Tailwind CSS that fetches product data from an external API and displays it in a clean card-based interface.",
      long_description: "This project is a practice-based e-commerce store built using React and Tailwind CSS. The application fetches product data from an external API and displays the products in a clean, modern card-based layout. Users can browse different items, view product details, and explore product categories through a responsive and user-friendly interface.\n\nThe main goal of this project was to practice modern frontend development concepts such as component-based architecture in React, API integration, and responsive UI design using Tailwind CSS. The project focuses on creating reusable components, maintaining a clean UI structure, and ensuring a smooth user experience across different screen sizes.\n\nThe application uses a fast development environment powered by Vite, allowing efficient builds and quick updates during development. Overall, this project demonstrates practical experience in building responsive web applications, handling API data, and implementing modern frontend design techniques using React and Tailwind CSS.",
      tech: ["React", "Tailwind CSS", "JavaScript", "Vite", "REST API", "HTML", "CSS"],
      github_url: "https://github.com/programmerbeast2004/WEB_dev_1",
      live_url: "https://web-dev-1-three.vercel.app/",
      image_url: "/assets/projects/proj3.jpg",
      screenshot_url: "/assets/projects/proj3.jpg",
      sort_order: 2
    },
    {
      id: "b0a35aed-8939-41c2-9a08-2662be5c5b5e",
      title: "Shotzi",
      featured: true,
      type: "web",
      description: "A social web application for sharing images, messaging, and connecting with others, built with a focus on smooth user experience, secure authentication, and real-time interactions.",
      long_description: "SHOTZI is a full-stack social web application I designed, built, and deployed end-to-end. The platform focuses on creating a smooth and calm experience for sharing content and connecting with others while maintaining secure and scalable backend architecture.\n\nKey Features\n• Image posting system with admin moderation workflow (pending → approved)\n• Notification system for approvals and admin messages\n• Secure 1-to-1 messaging and global chat\n• Follow / followers system\n• Custom user profiles\n• Authentication-protected routes with role-based access control\n\nEngineering Highlights\n• Relational database schema design\n• Row Level Security (RLS) implementation\n• Secure authentication and permission handling\n• Real-time messaging and notifications\n• Admin moderation workflows\n• Production deployment and performance optimization\n\nThis project reflects my approach to building products: thoughtful design combined with reliable backend engineering.",
      tech: ["Next.js", "React", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel"],
      github_url: "https://github.com/programmerbeast2004/shotzi",
      live_url: "https://shotzi.vercel.app",
      image_url: "/assets/projects/proj4.jpg",
      screenshot_url: "/assets/projects/proj4.jpg",
      sort_order: 1
    },
    {
      id: "proj_space_3d",
      title: "Space",
      featured: false,
      type: "web",
      description: "Interactive 3D particle visualization with interactive controls, responsive design, and ambient music.",
      long_description: "Particle Field — Interactive 3D. An immersive, real-time 3D particle visualization with interactive controls, responsive design, and ambient music. Watch thousands of particles dance and respond to your cursor as they orbit in an infinite cosmic field.",
      tech: ["HTML5", "CSS3", "JavaScript", "3D Rendering"],
      github_url: "https://github.com/programmerbeast2004/Space",
      live_url: "https://space-3d-seven.vercel.app/",
      image_url: "/assets/projects/proj5.jpg",
      screenshot_url: "/assets/projects/proj5.jpg",
      sort_order: 5
    },
    {
      id: "proj_svg_snake",
      title: "SVG Snake Game (Backend Rendered)",
      featured: true,
      type: "web",
      description: "A Snake game rendered entirely using SVG, where both game logic and rendering are handled on the backend.",
      long_description: "This project implements a Snake game rendered entirely using SVG, where both game logic and rendering are handled on the backend using Node.js and Express. Instead of relying on frontend rendering (Canvas, DOM, or JavaScript game engines), the server computes the game state and generates a new SVG image for each frame, which is returned as an image response. The client only displays the SVG and does not execute any game logic.",
      tech: ["JavaScript", "Node.js", "Express", "SVG"],
      github_url: "https://github.com/programmerbeast2004/svg-snake-game",
      live_url: "https://svg-snake-readme.onrender.com/api/snake",
      image_url: "https://svg-snake-readme.onrender.com/api/snake",
      screenshot_url: "https://svg-snake-readme.onrender.com/api/snake",
      sort_order: 6
    },
    {
      id: "proj_pico_photobooth",
      title: "Comic Café Photobooth Studio",
      featured: true,
      type: "web",
      description: "A beautiful 2D black-and-white comic-styled photobooth app. Snap photos, build a cute strip, add stickers, and download it — all in the browser.",
      long_description: "A beautiful 2D black-and-white comic-styled photobooth app built with React + Tailwind CSS. Snap photos, build a cute strip, add stickers, and download it — all in the browser. No backend needed.\n\nFeatures include a live camera booth with countdown timers, 9 photo filters (Clear, B&W, Manga, Vintage, Dreamy, Sketch, Rosé, Fade, Comic), brightness and contrast adjustments, and a robust strip studio with 2/3/4-photo layouts. It also comes with 8 frame styles, 10 backgrounds, 40 draggable/resizable stickers, and a high-quality JPEG export feature.",
      tech: ["React", "Tailwind CSS", "JavaScript", "html2canvas"],
      github_url: "https://github.com/programmerbeast2004/PICO",
      live_url: "https://pico-photobooth.vercel.app/",
      image_url: "/assets/projects/proj7.jpg",
      screenshot_url: "/assets/projects/proj7.jpg",
      sort_order: 7
    },
    {
      id: "proj_cis7",
      title: "CIS-7 · Cosmic Intelligence System",
      featured: true,
      type: "web",
      description: "Galactic Classification Challenge · Planet Survival AI. Runs an ML pipeline via FastAPI with a 3D galaxy scene using Three.js.",
      long_description: "Built for the Galactic Classification Challenge (GCC). It runs a machine learning pipeline, dynamically loading a num_pipeline.pkl and best_svc_Model.pkl. It trains 9 background models (LR, DT, RF, KNN, XGB, GB, ADA, NB, ET) and visually represents classification via a live 3D galaxy scene using Three.js.",
      tech: ["HTML/CSS", "Three.js", "FastAPI", "Uvicorn", "scikit-learn", "XGBoost", "Python"],
      github_url: "https://github.com/programmerbeast2004/CIS-7",
      live_url: "https://cis-7.onrender.com/",
      image_url: "/assets/projects/proj8.jpg",
      screenshot_url: "/assets/projects/proj8.jpg",
      sort_order: 8
    }
  ],

  // --------------------------------------------------------------------------
  // 6. FREELANCE SERVICES
  // --------------------------------------------------------------------------
  services: [
    {
      id: "s1",
      title: "Full-Stack Web Development",
      description: "End-to-end web application development using modern frameworks. From responsive, pixel-perfect frontends to robust, scalable backends.",
      icon: "Code"
    },
    {
      id: "s2",
      title: "Agentic AI Systems",
      description: "Building autonomous AI agents and complex reasoning pipelines that can execute tasks, use tools, and make decisions without human intervention.",
      icon: "Cpu"
    },
    {
      id: "s3",
      title: "Cloud & DevOps",
      description: "Designing resilient cloud architectures, CI/CD pipelines, and containerized deployments to ensure your applications scale effortlessly.",
      icon: "Cloud"
    },
    {
      id: "s4",
      title: "Custom Automations",
      description: "Streamlining your business workflows with intelligent scripts and deep API integrations to eliminate repetitive manual tasks.",
      icon: "Terminal"
    }
  ],

  // --------------------------------------------------------------------------
  // 7. BLOG POSTS
  // --------------------------------------------------------------------------
  // content: Supports basic markdown (## for headings, double newlines for paragraphs).
  blogs: [
    {
      id: "b1",
      featured: true,
      title: "The Zen of Programming: Finding Stillness in the Logic",
      excerpt: "Programming is often perceived as a purely logical endeavor. Yet, there is profound spirituality hidden in the architecture of software.",
      content: "Programming is often perceived as a mechanical, purely logical endeavor. Yet, there is a profound spirituality hidden in the architecture of software. Just as meditation requires focusing the mind to observe passing thoughts, debugging requires observing the flow of execution without attachment or frustration. \n\n## The State of Flow\n\nWhen you write code, you are breathing life into abstract logic. The state of 'flow' that developers experience—where hours pass in seconds and the world fades away—is fundamentally a meditative state. It is a moment of deep, unshakeable presence.\n\n## Code as a Zen Garden\n\nBy approaching code as a craft of mindfulness, we stop fighting errors and start listening to the system. A well-architected system is like a Zen garden: minimalist, purposeful, and harmoniously balanced. Let your code reflect your inner stillness, and you will find peace even in the most complex systems.",
      date: "Jun 20, 2026",
      read_time: "5 min",
      tags: ["Spirituality", "Mindfulness", "Philosophy"],
      image_url: "",
      sort_order: 1
    },
    {
      id: "b2",
      featured: true,
      title: "MLOps vs DevOps: Why Production AI is a Different Beast",
      excerpt: "The transition from traditional software engineering to AI engineering is not just a change in tools; it’s a paradigm shift in lifecycle management.",
      content: "The transition from traditional software engineering to AI engineering is not just a change in tools; it’s a massive paradigm shift in lifecycle management. DevOps is fundamentally deterministic. You write a unit test, you compile the code, and it behaves exactly as it did locally in your staging environment.\n\n## The Probabilistic Nature of AI\n\nAI, however, is inherently probabilistic. When we discuss AI DevOps (or MLOps), we are managing models that drift, data pipelines that skew over time, and prompts that break unexpectedly due to upstream API updates or subtle distribution shifts.\n\n## Continuous Everything\n\nContinuous Integration and Continuous Deployment (CI/CD) in AI must now include Continuous Training (CT). You aren't just versioning code anymore; you are versioning massive datasets, model weights, and hyperparameter configurations. To truly scale AI safely, we must stop treating models like static binaries and start treating them like living, breathing, evolving systems.",
      date: "May 14, 2026",
      read_time: "8 min",
      tags: ["DevOps", "MLOps", "AI Infrastructure"],
      image_url: "",
      sort_order: 2
    },
    {
      id: "b3",
      featured: true,
      title: "The Dawn of Agentic AGI: When AI Learns to Act",
      excerpt: "For years, AI was an oracle—you asked a question, and it generated an answer. The next frontier is Agentic AGI.",
      content: "We are standing at the precipice of a new era in artificial intelligence. For years, AI was an oracle—you asked a question, and it generated a text response. But the next frontier is not just conversational AI; it is Agentic AGI. \n\n## Digital Workers\n\nAgentic AI systems don't just talk; they *do*. By combining Large Language Models with tool use, long-term memory, and autonomous reasoning loops, we are creating digital workers capable of executing complex, multi-step workflows. An agent can research a topic, write code, run it in a sandbox, debug its own errors, and deploy the solution, all without human intervention.\n\n## The Shift in Human Roles\n\nAs these agents grow more robust and reliable, the role of human developers will pivot dramatically from writing syntax to orchestrating fleets of autonomous systems. We are no longer just programmers; we are rapidly becoming architects of synthetic intelligence.",
      date: "Apr 02, 2026",
      read_time: "7 min",
      tags: ["AGI", "Agents", "Future Tech"],
      image_url: "",
      sort_order: 3
    },
  ],

  // --------------------------------------------------------------------------
  // 8. CERTIFICATIONS & LEARNING PLATFORMS
  // --------------------------------------------------------------------------
  // Platforms definition
  certSources: [
    { id: "cs1", name: "Udemy", logo_emoji: "", color: "#a435f0", sort_order: 1 },
    { id: "cs2", name: "Coursera", logo_emoji: "", color: "#0056d3", sort_order: 2 },
    { id: "cs3", name: "Google", logo_emoji: "", color: "#b20000ff", sort_order: 3 },
    { id: "cs4", name: "freeCodeCamp", logo_emoji: "", color: "#0a0a23", sort_order: 4 },
  ],

  // Individual certificates linked to source_id from above
  certifications: [
    { id: "c1", source_id: "cs1", title: "The Complete Machine Learning & Data Science Bootcamp", instructor: "Andrei Neagoie", issued_date: "Mar 2024", credential_id: "UC-abc123", credential_url: "https://udemy.com/certificate/UC-abc123", skills: ["Python", "Pandas", "Scikit-learn", "TensorFlow"], hours: "43.5", image_url: "", sort_order: 1 },
    { id: "c2", source_id: "cs1", title: "React - The Complete Guide 2024", instructor: "Maximilian Schwarzmüller", issued_date: "Jan 2024", credential_id: "UC-def456", credential_url: "https://udemy.com/certificate/UC-def456", skills: ["React", "Redux", "Hooks", "Next.js"], hours: "68", image_url: "", sort_order: 2 },
    { id: "c3", source_id: "cs1", title: "NodeJS - The Complete Guide", instructor: "Maximilian Schwarzmüller", issued_date: "Nov 2023", credential_id: "UC-ghi789", credential_url: "https://udemy.com/certificate/UC-ghi789", skills: ["Node.js", "Express", "MongoDB", "REST APIs"], hours: "40.5", image_url: "", sort_order: 3 },
    { id: "c4", source_id: "cs2", title: "Deep Learning Specialization", instructor: "Andrew Ng (deeplearning.ai)", issued_date: "Jun 2024", credential_id: "COU-jkl012", credential_url: "https://coursera.org/verify/COU-jkl012", skills: ["Neural Networks", "CNNs", "RNNs", "TensorFlow"], hours: null, image_url: "", sort_order: 4 },
    { id: "c5", source_id: "cs2", title: "IBM Data Science Professional Certificate", instructor: "IBM", issued_date: "Aug 2023", credential_id: "COU-mno345", credential_url: "https://coursera.org/verify/COU-mno345", skills: ["Python", "SQL", "Machine Learning", "Data Visualization"], hours: null, image_url: "", sort_order: 5 },
    { id: "c6", source_id: "cs3", title: "Google Data Analytics Professional Certificate", instructor: "Google", issued_date: "Dec 2023", credential_id: "GCC-pqr678", credential_url: "https://coursera.org/verify/GCC-pqr678", skills: ["SQL", "R", "Tableau", "Data Analysis"], hours: null, image_url: "", sort_order: 6 },
    { id: "c7", source_id: "cs4", title: "JavaScript Algorithms and Data Structures", instructor: "freeCodeCamp", issued_date: "Sep 2022", credential_id: "FCC-stu901", credential_url: "https://freecodecamp.org/certification/FCC-stu901", skills: ["JavaScript", "Algorithms", "Data Structures"], hours: "300", image_url: "", sort_order: 7 },
    { id: "c8", source_id: "cs4", title: "Responsive Web Design", instructor: "freeCodeCamp", issued_date: "Jul 2022", credential_id: "FCC-vwx234", credential_url: "https://freecodecamp.org/certification/FCC-vwx234", skills: ["HTML", "CSS", "Flexbox", "Grid"], hours: "300", image_url: "", sort_order: 8 },
  ],
};
