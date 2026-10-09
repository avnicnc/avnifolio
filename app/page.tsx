import React from "react";
import {
  getHomePageSections,
  HeroBannerSection,
  ServicesSection,
  ProjectGallerySection,
  TestimonialSection,
} from "@/lib/wordpress";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
  // Fetch flexible content sections from WordPress
  const sections = await getHomePageSections();

  // Extract sections by layout type
  const heroData = sections.find(
    (s) => s.acf_fc_layout === "hero_banner"
  ) as HeroBannerSection | undefined;

  const servicesData = sections.find(
    (s) => s.acf_fc_layout === "services"
  ) as ServicesSection | undefined;

  const galleryData = sections.find(
    (s) => s.acf_fc_layout === "project_gallery"
  ) as ProjectGallerySection | undefined;

  const testimonialData = sections.find(
    (s) => s.acf_fc_layout === "testimonial"
  ) as TestimonialSection | undefined;

  // Clean description string from potential HTML tags returned by WP WYSIWYG
  const heroDescription = heroData?.banner_description
    ? heroData.banner_description.replace(/<[^>]*>?/gm, "").trim()
    : "Hi, I'm Alex — a passionate Full Stack Developer specializing in high-performance web applications, headless architectures, and fluid user experiences.";

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-violet-500/30 selection:text-white">
      {/* Background Decorative Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-20" />

      {/* Header Section */}
      <header className="w-full border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#"
            className="flex items-center gap-2 group text-lg font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-violet-600/30">
              A
            </span>
            <span>
              Alex<span className="text-violet-500">.</span>
            </span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a href="#testimonials" className="hover:text-white transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Action CTA */}
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600/90 hover:bg-violet-600 text-white transition-all shadow-md shadow-violet-600/20 hover:shadow-violet-600/40 hover:-translate-y-0.5"
          >
            Let&apos;s Talk
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-violet-600/20 via-indigo-500/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />

        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24 flex flex-col items-start text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium backdrop-blur-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for new projects & freelance contracts</span>
          </div>

          {/* Headline (Dynamic from WordPress hero_banner layout) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] max-w-4xl">
            {heroData?.banner_title ? (
              <span>{heroData.banner_title}</span>
            ) : (
              <span>
                Building modern web applications from{" "}
                <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  concept to production
                </span>
                .
              </span>
            )}
          </h1>

          {/* Subheading (Dynamic from WordPress) */}
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
            {heroDescription}
          </p>

          {/* Action CTAs (Dynamic from WordPress button_list or rich defaults) */}
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
                        ? "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 active:translate-y-0"
                        : "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-zinc-700 text-zinc-200 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Featured Work</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-zinc-700 text-zinc-200 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
                >
                  <span>Start a Conversation</span>
                </a>
              </>
            )}
          </div>

          {/* Metric Stats Strip */}
          <div className="mt-14 pt-10 border-t border-zinc-800/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">5+</div>
              <p className="text-xs text-zinc-400 mt-1">Years Building for Web</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-violet-400">30+</div>
              <p className="text-xs text-zinc-400 mt-1">Projects Shipped</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">99.9%</div>
              <p className="text-xs text-zinc-400 mt-1">Uptime & Reliability</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">100%</div>
              <p className="text-xs text-zinc-400 mt-1">Modern TypeScript & React</p>
            </div>
          </div>
        </section>

        {/* Services & Capabilities Section */}
        <section id="services" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
              Services & Expertise
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {servicesData?.service_main_title || "High-Impact Engineering for Fast-Growing Teams"}
          </h2>
          <p className="text-zinc-400 text-base max-w-2xl mb-12">
            {servicesData?.services_description ||
              "Specialized in full-stack product development, headless CMS integrations, and cloud infrastructure."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Full-Stack Web Apps",
                description:
                  "End-to-end web applications built with Next.js 16, React 19, and scalable relational databases.",
                tags: ["Next.js", "React 19", "Node.js", "PostgreSQL"],
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                ),
              },
              {
                title: "Headless CMS & APIs",
                description:
                  "Decoupled WordPress with ACF Flexible Content, GraphQL, and modern REST APIs for ultra-fast frontends.",
                tags: ["Headless WP", "ACF Pro", "REST / GraphQL", "SSR / ISR"],
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 3 3 8 3s8-1 8-3V7M4 7c0 2 3 3 8 3s8-1 8-3M4 7c0-2 3-3 8-3s8 1 8 3m0 5c0 2-3 3-8 3s-8-1-8-3" />
                ),
              },
              {
                title: "CI/CD & Cloud Deployment",
                description:
                  "Automated GitHub Actions pipelines, zero-downtime Vercel deployments, and type-safe lint checks.",
                tags: ["GitHub Actions", "Vercel", "Docker", "DevOps"],
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
              },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-violet-500/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/20 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-5 border border-violet-500/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {srv.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{srv.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/60">
                  {srv.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] rounded bg-zinc-800/60 text-zinc-300 border border-zinc-700/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
              {galleryData?.gallery_title || "Featured Work"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Crafted with precision,{" "}
                <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                  engineered for scale
                </span>
                .
              </h2>
              <p className="mt-3 text-zinc-400 text-base max-w-xl">
                {galleryData?.gallery_subtitle ||
                  "A showcase of modern web solutions built with high performance, scalability, and UX in mind."}
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "CloudPulse Analytics",
                category: "Full Stack & Monitoring",
                description:
                  "Real-time microservice latency telemetry platform with WebSockets, interactive metric visualizers, and instant Slack notifications.",
                tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "WebSockets"],
                demoUrl: "#",
                githubUrl: "https://github.com/avnicnc/avnifolio",
                gradient: "from-violet-500/20 via-indigo-500/10 to-transparent",
                metric: "99.98% Latency Reliability",
              },
              {
                title: "Nova AI Studio",
                category: "AI & Full Stack",
                description:
                  "Collaborative documentation copilot that parses complex APIs, extracts actionable schemas, and integrates LLM-guided auto-completion.",
                tags: ["React 19", "Tailwind CSS", "FastAPI", "Vector DB", "TypeScript"],
                demoUrl: "#",
                githubUrl: "https://github.com/avnicnc/avnifolio",
                gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
                metric: "3.4x Workflow Speedup",
              },
              {
                title: "Nexus Commerce",
                category: "Headless E-Commerce",
                description:
                  "Sub-100ms headless storefront with optimistic carts, dynamic multi-currency conversions, and Stripe checkout integration.",
                tags: ["Next.js", "Tailwind CSS", "Stripe", "Redis", "Zustand"],
                demoUrl: "#",
                githubUrl: "https://github.com/avnicnc/avnifolio",
                gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
                metric: "100 Lighthouse Performance",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="group relative flex flex-col justify-between rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-950/20 hover:-translate-y-1 overflow-hidden"
              >
                {/* Visual Header / Mock Graphic */}
                <div
                  className={`h-48 w-full bg-gradient-to-br ${project.gradient} border-b border-zinc-800/60 p-5 flex flex-col justify-between relative`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 group-hover:bg-rose-500/80 transition-colors" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 group-hover:bg-amber-500/80 transition-colors" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 group-hover:bg-emerald-500/80 transition-colors" />
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {project.metric}
                    </span>
                  </div>

                  <div className="self-start">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-950/80 border border-zinc-800 text-zinc-300 backdrop-blur-sm">
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
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 px-3.5 py-2 rounded-lg border border-zinc-700/50 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>Source</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
              {testimonialData?.testimonial_title || "Client Testimonials"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-12">
            Trusted by founders, tech leads & engineers.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "Alex completely transformed our frontend experience. The transition to Next.js App Router and headless WordPress cut our page loads by over 60%, and their attention to design detail is unmatched.",
                author: "Sarah Jenkins",
                role: "VP of Product, CloudTech",
              },
              {
                quote:
                  "Rare combination of deep architectural competence and aesthetic instinct. Alex delivered clean, type-safe code that our internal engineering team was thrilled to build upon.",
                author: "David Chen",
                role: "Engineering Director, Nova Labs",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between"
              >
                <p className="text-zinc-300 text-base leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center font-bold text-xs text-white">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{t.author}</h4>
                    <p className="text-xs text-zinc-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section with Interactive Form */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-24 border-t border-zinc-900">
          <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-zinc-900/70 to-zinc-950/90 border border-zinc-800/80 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-violet-600/15 blur-3xl -z-10 pointer-events-none rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Info */}
              <div className="lg:col-span-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>Get In Touch</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Let&apos;s build something{" "}
                  <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    extraordinary
                  </span>
                  .
                </h2>

                <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Have a new project idea, an open role, or need architectural consulting? Fill out the form or reach out directly.
                </p>

                <div className="mt-8 space-y-4 text-sm text-zinc-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-800/70 text-violet-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>alex@example.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-800/70 text-indigo-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>Fast Response (&lt; 24 hours)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-800/70 text-purple-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span>Remote / Worldwide</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Form */}
              <div className="lg:col-span-7 bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">
              Alex<span className="text-violet-500">.</span>
            </span>
            <span className="text-zinc-700">|</span>
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
