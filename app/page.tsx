import React from "react";
import { getHomePageSections, HeroBannerSection } from "@/lib/wordpress";

export default async function Home() {
  // Fetch flexible content sections from WordPress
  const sections = await getHomePageSections();

  // Find the hero_banner layout
  const heroData = sections.find(
    (s) => s.acf_fc_layout === "hero_banner"
  ) as HeroBannerSection | undefined;

  // Clean description string from potential HTML tags returned by WP WYSIWYG
  const heroDescription = heroData?.banner_description
    ? heroData.banner_description.replace(/<[^>]*>?/gm, "").trim()
    : "Hi, I'm Alex — a passionate Full Stack Developer crafting scalable architectures, fluid user interfaces, and reliable modern web applications.";

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Header Section */}
      <header className="w-full border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <a href="#" className="text-xl font-bold tracking-wider hover:opacity-80 transition-opacity">
            Alex<span className="text-violet-500">.</span>
          </a>

          {/* Navigation Links */}
          <nav className="flex gap-6 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

        </div>
      </header>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-600/20 via-indigo-500/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />

        <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28 flex flex-col items-start text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium backdrop-blur-sm mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>Available for new projects & opportunities</span>
          </div>

          {/* Headline (Dynamic from WordPress hero_banner layout) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-3xl">
            {heroData?.banner_title ? (
              <span>
                {heroData.banner_title}{" "}
                <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  
                </span>
                .
              </span>
            ) : (
              <span>
                Build the project from scratch{" "}
                <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  and its ready to deply.
                </span>
                .
              </span>
            )}
          </h1>

          {/* Subheading (Dynamic from WordPress) */}
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
            {heroDescription}
          </p>

          {/* Action CTAs (Dynamic from WordPress button_list) */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {heroData?.button_list && heroData.button_list.length > 0 ? (
              heroData.button_list.map((item, idx) => {
                const btn = item.banner_button;
                const isPrimary = idx === 0;

                return (
                  <a
                    key={idx}
                    href={btn.url || "#"}
                    target={btn.target || undefined}
                    className={
                      isPrimary
                        ? "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 active:translate-y-0"
                        : "inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/70 hover:border-zinc-700 text-zinc-200 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
                    }
                  >
                    <span>{btn.title}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                );
              })
            ) : (
              <>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>View Projects</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/70 hover:border-zinc-700 text-zinc-200 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
                >
                  <span>Get In Touch</span>
                </a>
              </>
            )}
          </div>

          {/* Quick Tech Highlights Strip */}
          <div className="mt-14 pt-8 border-t border-zinc-800/80 w-full">
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-4">
              Core Tech Stack & Technologies
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                "TypeScript",
                "React 19",
                "Next.js",
                "Node.js",
                "Tailwind CSS",
                "PostgreSQL",
                "REST / GraphQL",
                "Docker",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* About & Skills Section */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-20 border-t border-zinc-900">
          {/* Section Subtitle Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">About Me</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            Bridging creative design with <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">robust engineering</span>.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
            {/* Left Column: Bio & Core Values */}
            <div className="lg:col-span-6 space-y-6 text-zinc-400 text-base leading-relaxed">
              <p>
                I&apos;m a Full Stack Developer dedicated to transforming complex challenges into elegant, intuitive, and performant web products. Whether architecting microservices or fine-tuning micro-interactions, I focus on shipping code that scales cleanly.
              </p>
              <p>
                My development workflow centers around modern toolchains: <span className="text-zinc-200 font-medium">React 19, Next.js, TypeScript</span>, and cloud-native databases. I enjoy working across the whole stack—from database schema design to pixel-perfect responsive frontends.
              </p>

              {/* Mini Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <div className="text-violet-400 font-bold text-xl mb-1">Clean Code</div>
                  <p className="text-xs text-zinc-400">Modular, readable, and type-safe architecture.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <div className="text-indigo-400 font-bold text-xl mb-1">Performance</div>
                  <p className="text-xs text-zinc-400">Fast load times, SEO-optimized, and accessible.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Categorized Skill Cards */}
            <div className="lg:col-span-6 space-y-4">
              {/* Frontend Card */}
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-white">Frontend & UI</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["React 19", "Next.js (App Router)", "TypeScript", "Tailwind CSS v4", "HTML5/CSS3", "Responsive UI"].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Card */}
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-white">Backend & APIs</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "REST APIs", "Server Actions", "GraphQL", "Authentication (JWT/OAuth)", "Next.js Route Handlers"].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Databases & Tooling Card */}
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 3 3 8 3s8-1 8-3V7M4 7c0 2 3 3 8 3s8-1 8-3M4 7c0-2 3-3 8-3s8 1 8 3m0 5c0 2-3 3-8 3s-8-1-8-3" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-white">Databases & DevOps</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["PostgreSQL", "MongoDB", "Prisma / ORMs", "Docker", "Git & GitHub", "Vercel / Cloud"].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-20 border-t border-zinc-900">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">Featured Work</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Crafted with passion, <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">engineered for scale</span>.
              </h2>
              <p className="mt-3 text-zinc-400 text-base max-w-xl">
                A selection of full-stack projects showcasing clean architecture, modern frameworks, and responsive user experiences.
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "CloudPulse",
                category: "Full Stack & DevOps",
                description:
                  "Real-time monitoring platform for tracking microservice health, latency metrics, and automated alert delivery via WebSockets.",
                tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "WebSockets"],
                demoUrl: "#",
                githubUrl: "#",
                gradient: "from-violet-500/20 via-indigo-500/10 to-transparent",
              },
              {
                title: "Nova AI Workspace",
                category: "AI & Full Stack",
                description:
                  "Intelligent documentation copilot that parses technical documents, extracts key insights, and automates team workflows with LLMs.",
                tags: ["React 19", "Next.js", "Tailwind CSS", "FastAPI", "Vector DB", "TypeScript"],
                demoUrl: "#",
                githubUrl: "#",
                gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
              },
              {
                title: "Nexus Commerce",
                category: "Headless E-Commerce",
                description:
                  "Ultra-fast headless storefront with sub-100ms transitions, optimistic cart management, and seamless Stripe checkout integration.",
                tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Zustand", "Redis"],
                demoUrl: "#",
                githubUrl: "#",
                gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="group relative flex flex-col justify-between rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-950/20 hover:-translate-y-1 overflow-hidden"
              >
                {/* Visual Header / Mock Graphic */}
                <div className={`h-44 w-full bg-gradient-to-br ${project.gradient} border-b border-zinc-800/60 p-5 flex flex-col justify-between relative`}>
                  {/* Mock Window Controls */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 group-hover:bg-rose-500/80 transition-colors" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 group-hover:bg-amber-500/80 transition-colors" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 group-hover:bg-emerald-500/80 transition-colors" />
                  </div>

                  {/* Category Pill */}
                  <div className="self-start">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-950/70 border border-zinc-800 text-zinc-300 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-zinc-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-6 pt-5 border-t border-zinc-800/60">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[11px] rounded bg-zinc-800/50 text-zinc-400 border border-zinc-700/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3">
                      <a
                        href={project.demoUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-violet-600/90 hover:bg-violet-600 px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                      >
                        <span>Live Demo</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <a
                        href={project.githubUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 px-3.5 py-2 rounded-lg border border-zinc-700/50 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-900">
          <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 border border-zinc-800/80 overflow-hidden text-center">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-violet-600/15 blur-3xl -z-10 pointer-events-none rounded-full" />

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
              Let&apos;s build something <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">extraordinary together</span>.
            </h2>

            <p className="mt-4 text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Whether you have an upcoming project, an exciting job opportunity, or just want to connect over technology, my inbox is always open.
            </p>

            {/* Main Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:alex@example.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Say Hello (alex@example.com)</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/70 hover:border-zinc-700 text-zinc-300 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Browse Work Again</span>
              </a>
            </div>

            {/* Social Links Grid */}
            <div className="mt-12 pt-8 border-t border-zinc-800/60 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter / X</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-wider text-white">
              Alex<span className="text-violet-500">.</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs text-zinc-500">Full Stack Developer</span>
          </div>

          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Alex. Built with Next.js 16, React 19 & Tailwind CSS v4.
          </p>

          <a
            href="#"
            className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Back to top</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
