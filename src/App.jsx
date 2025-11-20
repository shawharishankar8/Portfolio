import React, { useState, useEffect, useRef } from "react";

// Scroll reveal wrapper (with sequential delay support)
const Reveal = ({ children, className = "", delayOrder = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // how far apart each section "step" is (in ms)
  const stepDelay = 180;
  const delayMs = delayOrder * stepDelay;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const year = new Date().getFullYear();

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a
            href="#home"
            className="font-semibold text-lg tracking-tight"
            onClick={closeMobileNav}
          >
            <span className="text-indigo-400">Hari</span> Shankar Shaw
          </a>

          <button
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md border border-slate-700"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            ☰
          </button>

          <ul className="hidden sm:flex space-x-6 text-sm font-medium text-slate-300">
            <li>
              <a href="#home" className="hover:text-indigo-400">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-indigo-400">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-indigo-400">
                Projects
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-indigo-400">
                Skills
              </a>
            </li>
            <li>
              <a href="#experience" className="hover:text-indigo-400">
                Experience
              </a>
            </li>
            <li>
              <a href="#education" className="hover:text-indigo-400">
                Education
              </a>
            </li>
            <li>
              <a href="#certifications" className="hover:text-indigo-400">
                Certifications
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-400">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu */}
        {mobileNavOpen && (
          <div className="sm:hidden border-t border-slate-800 bg-slate-950/95">
            <ul className="px-4 py-2 space-y-2 text-sm font-medium text-slate-300">
              {[
                "home",
                "about",
                "projects",
                "skills",
                "experience",
                "education",
                "certifications",
                "contact",
              ].map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="block hover:text-indigo-400"
                    onClick={closeMobileNav}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero / Home */}
        <section id="home" className="min-h-[80vh] flex items-center py-16">
          <Reveal delayOrder={0}>
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-400 mb-3">
                Backend Java Developer • 2025 CSE Fresher
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                Hi, I&apos;m{" "}
                <span className="gradient-text">Hari Shankar Shaw</span>.
              </h1>
              <p className="text-lg text-slate-300 mb-4">
                I build scalable backend systems using{" "}
                <span className="font-semibold">Java, Spring Boot, and SQL</span>
                , with experience in microservices, RESTful APIs, and cloud
                deployments on <span className="font-semibold">AWS</span> and{" "}
                <span className="font-semibold">Docker</span>.
              </p>
              <p className="text-slate-400 mb-6">
                Through internships at Gleam-AI, Bluestocks Fintech, and Rooman
                Technologies, I&apos;ve worked on production-grade systems that
                power real users, from fintech transaction APIs to data pipelines
                and scraping platforms.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/Hari_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-600 hover:border-indigo-400 hover:text-indigo-300 hover:-translate-y-0.5 transition-all"
                >
                  Contact Me
                </a>
              </div>

              {/* Stats row */}
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-sm">
                <StatBlock label="Projects" end={10} suffix="+" />
                <StatBlock label="Internships" end={3} />
                <StatBlock
                  label="CGPA"
                  end={85}
                  suffix="/10"
                  display={(v) => (v / 10).toFixed(1)}
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="font-medium text-slate-300">Currently in:</span>{" "}
                Bengaluru, Karnataka
              </div>
            </div>
          </Reveal>
        </section>

        {/* About */}
        <section id="about" className="py-20 border-t border-slate-900/70">
          <Reveal delayOrder={1}>
            {/* Gradient divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent mb-10" />

            {/* Section label + heading */}
            <div className="mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/40">
                ABOUT
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
                About <span className="text-indigo-400">Me</span>
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                A quick snapshot of who I am and what I love working on.
              </p>
            </div>

            {/* Main card */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
              <div className="grid md:grid-cols-3 gap-10">
                {/* Left: story */}
                <div className="md:col-span-2 space-y-5 text-slate-200">
                  <p className="leading-relaxed">
                    I&apos;m a{" "}
                    <span className="font-semibold text-indigo-300">
                      2025 Computer Science Engineering fresher
                    </span>{" "}
                    and an enthusiastic{" "}
                    <span className="font-semibold text-indigo-300">
                      Backend Java Developer
                    </span>
                    . I enjoy building systems that are not just functional, but
                    also{" "}
                    <span className="font-semibold text-sky-300">
                      robust, scalable, and maintainable
                    </span>
                    .
                  </p>

                  <p className="leading-relaxed">
                    During my internships at{" "}
                    <span className="font-semibold text-indigo-200">
                      Gleam-AI
                    </span>
                    ,{" "}
                    <span className="font-semibold text-indigo-200">
                      Bluestocks Fintech
                    </span>
                    , and{" "}
                    <span className="font-semibold text-indigo-200">
                      Rooman Technologies (IBM Cloud)
                    </span>
                    , I&apos;ve worked on real-world use cases: automated data
                    scraping, payment transaction APIs, and cloud data pipelines.
                    These experiences trained me to think in terms of{" "}
                    <span className="font-semibold text-sky-300">
                      production constraints, API performance
                    </span>
                    , and{" "}
                    <span className="font-semibold text-sky-300">
                      collaborative workflows
                    </span>
                    .
                  </p>

                  <p className="leading-relaxed">
                    I&apos;m particularly interested in{" "}
                    <span className="font-semibold text-indigo-300">
                      backend architecture, API optimization, and distributed
                      systems
                    </span>
                    , and in bringing together{" "}
                    <span className="font-semibold text-slate-100">
                      clean code, good design patterns, and solid DevOps
                      practices
                    </span>
                    .
                  </p>

                  {/* Focus chips */}
                  <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-800">
                    <span className="px-3 py-1 rounded-full text-xs bg-slate-800/80 border border-slate-700 text-slate-200">
                      ✅ Production-ready APIs
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-slate-800/80 border border-slate-700 text-slate-200">
                      ⚙️ Microservices &amp; Scalability
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-slate-800/80 border border-slate-700 text-slate-200">
                      ☁️ Cloud-native thinking
                    </span>
                  </div>
                </div>

                {/* Right: quick facts card */}
                <aside className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
                    Quick facts
                  </h3>
                  <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <FactRow
                      label="Current focus"
                      value="Backend & microservices"
                    />
                    <FactRow
                      label="Strongest stack"
                      value="Java • Spring Boot • PostgreSQL"
                    />
                    <FactRow
                      label="Comfort zone"
                      value="REST APIs • Cloud • Docker"
                    />
                    <FactRow
                      label="Looking for"
                      value="Backend / Java Developer roles"
                    />
                  </div>

                  <div className="text-xs text-slate-400">
                    <p className="font-semibold text-slate-300 mb-1">
                      What it&apos;s like to work with me:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Clear, concise communication</li>
                      <li>Ownership mindset over features</li>
                      <li>Curious about performance & edge cases</li>
                    </ul>
                  </div>
                </aside>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 border-t border-slate-900/70">
          <Reveal delayOrder={2}>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent mb-10" />
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 shadow-[0_0_35px_rgba(15,23,42,0.85)]">
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold">Projects</h2>
                <a
                  href="https://github.com/shawharishankar8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-indigo-400 hover:underline"
                >
                  View all on GitHub →
                </a>
              </div>

              <div className="space-y-8">
                {/* Project 1 */}
                <article className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 hover:-translate-y-1 hover:border-indigo-500/70 hover:shadow-xl transition-all">
                  <div className="flex flex-wrap justify-between gap-2 mb-3">
                    <h3 className="text-xl font-semibold">
                      Gaming Tournament Platform
                    </h3>
                    <a
                      href="https://github.com/shawharishankar8"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-400 hover:underline"
                    >
                      GitHub Repo
                    </a>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">
                    An end-to-end tournament management system handling{" "}
                    <span className="font-semibold">
                      1000+ concurrent users
                    </span>{" "}
                    with automated bracket generation, payment processing, and
                    real-time notifications.
                  </p>
                  <p className="text-sm text-slate-300 mb-3">
                    Implemented resilience patterns such as circuit breakers and
                    retries for third-party APIs, along with Redis caching to
                    improve performance and reliability under load.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <TechPill>Java</TechPill>
                    <TechPill>Spring Boot</TechPill>
                    <TechPill>Redis</TechPill>
                    <TechPill>PostgreSQL</TechPill>
                    <TechPill>Docker</TechPill>
                    <TechPill>Swagger</TechPill>
                  </div>
                </article>

                {/* Project 2 */}
                <article className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 hover:-translate-y-1 hover:border-indigo-500/70 hover:shadow-xl transition-all">
                  <div className="flex flex-wrap justify-between gap-2 mb-3">
                    <h3 className="text-xl font-semibold">Real-Time Chat App</h3>
                    <a
                      href="https://github.com/shawharishankar8"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-400 hover:underline"
                    >
                      GitHub Repo
                    </a>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">
                    A microservices-based real-time chat application built with{" "}
                    <span className="font-semibold">Spring Boot</span> and
                    WebSockets, enabling smooth messaging and extensible service
                    boundaries.
                  </p>
                  <p className="text-sm text-slate-300 mb-3">
                    Containerized using Docker and Docker Compose for scalable
                    deployments, with full version control and collaboration
                    through GitHub.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <TechPill>Java</TechPill>
                    <TechPill>Spring Boot</TechPill>
                    <TechPill>Microservices</TechPill>
                    <TechPill>WebSockets</TechPill>
                    <TechPill>Docker</TechPill>
                  </div>
                </article>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 border-t border-slate-900/70">
          <Reveal delayOrder={3}>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent mb-10" />
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 shadow-[0_0_35px_rgba(15,23,42,0.85)]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Skills</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                <SkillCard title="Languages" items={["Java", "SQL"]} />
                <SkillCard
                  title="Frameworks"
                  items={["Spring Boot", "Hibernate", "AngularJS"]}
                />
                <SkillCard
                  title="Databases"
                  items={["PostgreSQL", "JDBC", "Redis"]}
                />
                <SkillCard
                  title="Cloud & DevOps"
                  items={["AWS (S3, EC2)", "Docker", "Git & Bitbucket"]}
                />
                <SkillCard
                  title="Core Concepts"
                  items={[
                    "Object-Oriented Programming (OOP)",
                    "Data Structures & Algorithms",
                  ]}
                />
                <SkillCard
                  title="Soft Skills"
                  items={[
                    "Communication",
                    "Problem-Solving",
                    "Teamwork",
                    "Adaptability",
                  ]}
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20 border-t border-slate-900/70">
          <Reveal delayOrder={4}>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent mb-10" />
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 shadow-[0_0_35px_rgba(15,23,42,0.85)]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Experience</h2>
              <div className="space-y-8">
                <ExperienceItem
                  role="Software Developer Intern"
                  company="Gleam-AI"
                  period="May 2025 – Present"
                  location="Bengaluru"
                  bullets={[
                    "Engineered a modular backend using Java, Spring Boot, and AngularJS for automated data scraping, storage, and RESTful APIs.",
                    "Integrated AWS S3 for scalable file storage and PostgreSQL for persistent data management.",
                    "Improved deployment efficiency by ~30% using CI/CD pipelines and collaborative workflows in Bitbucket and Jira.",
                  ]}
                />
                <ExperienceItem
                  role="Software Development Engineer Intern"
                  company="BlueStocks Fintech"
                  period="Apr 2025 – Jun 2025"
                  location="Remote"
                  bullets={[
                    "Designed transaction APIs in Spring Boot for fintech use cases serving 1K+ active users.",
                    "Optimized database queries and middleware to enhance API response times.",
                  ]}
                />
                <ExperienceItem
                  role="Cloud Application Developer Intern"
                  company="Rooman Technologies"
                  period="Nov 2024 – Mar 2025"
                  location="Bengaluru"
                  bullets={[
                    "Built real-time and batch processing pipelines using Apache Spark (MLlib) in IBM Watson Studio.",
                    "Deployed solutions on IBM Cloud with robust storage and error-handling for scalability and reliability.",
                  ]}
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Education */}
        <section id="education" className="py-20 border-t border-slate-900/70">
          <Reveal delayOrder={5}>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent mb-10" />
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[0_0_30px_rgba(15,23,42,0.85)]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Education</h2>
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 hover:-translate-y-1 hover:border-indigo-500/70 transition-all">
                <h3 className="text-lg font-semibold">
                  HKBK College of Engineering, VTU
                </h3>
                <p className="text-sm text-slate-400 mb-2">
                  Bachelor of Engineering in Computer Science • May 2021 – July
                  2025 • Bengaluru, Karnataka
                </p>
                <p className="text-sm text-slate-300">
                  GPA: <span className="font-semibold">8.5 / 10</span>
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Certifications & Publications */}
        <section
          id="certifications"
          className="py-20 border-t border-slate-900/70"
        >
          <Reveal delayOrder={6}>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent mb-10" />
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 shadow-[0_0_35px_rgba(15,23,42,0.85)]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Certifications &amp; Publications
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 hover:-translate-y-1 hover:border-indigo-500/70 transition-all">
                  <h3 className="font-semibold mb-3">Certifications</h3>
                  <ul className="space-y-1.5 text-slate-300">
                    <li>
                      • Getting Started with Competitive Programming – Swayam
                      NPTEL
                    </li>
                    <li>• Programming in Java – Swayam NPTEL</li>
                    <li>• Database Management System – Swayam NPTEL</li>
                    <li>
                      • Spring and Hibernate, including Spring Boot – Udemy
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 hover:-translate-y-1 hover:border-indigo-500/70 transition-all">
                  <h3 className="font-semibold mb-3">Publications</h3>
                  <ul className="space-y-1.5 text-slate-300">
                    <li>
                      •{" "}
                      <span className="font-semibold">
                        Performance Analysis on Food Supply Chain Using
                        Blockchain Technology
                      </span>
                      , IEEE
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 border-t border-slate-900/70">
          <Reveal delayOrder={7}>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent mb-10" />
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 shadow-[0_0_35px_rgba(15,23,42,0.85)]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Contact</h2>
              <div className="grid md:grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="text-slate-300 mb-4">
                    Whether you&apos;re looking to hire a{" "}
                    <span className="font-semibold">Backend Java Developer</span>
                    , collaborate on a project, or discuss backend systems and
                    microservices, feel free to reach out. I&apos;d love to
                    connect.
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    <li>
                      📧 Email:{" "}
                      <a
                        href="mailto:shawharishankar8@gmail.com"
                        className="text-indigo-400 hover:underline"
                      >
                        shawharishankar8@gmail.com
                      </a>
                    </li>
                    <li>
                      📞 Phone:{" "}
                      <a
                        href="tel:+917470800271"
                        className="text-indigo-400 hover:underline"
                      >
                        +91-7470800271
                      </a>
                    </li>
                    <li>
                      💼 LinkedIn:{" "}
                      <a
                        href="https://linkedin.com/in/hari-shankar-shaw"
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        linkedin.com/in/hari-shankar-shaw
                      </a>
                    </li>
                    <li>
                      🧑‍💻 GitHub:{" "}
                      <a
                        href="https://github.com/shawharishankar8"
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        github.com/shawharishankar8
                      </a>
                    </li>
                    <li>📍 Bengaluru, Karnataka</li>
                  </ul>
                </div>

                {/* CTA Card */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl hover:-translate-y-1 hover:border-indigo-500/70 transition-all">
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">
                    📬 Let&apos;s Connect
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    I&apos;m open to opportunities in{" "}
                    <span className="font-semibold text-indigo-300">
                      Backend Engineering, Java Development, and Cloud-based
                      roles
                    </span>
                    . If my work aligns with what you&apos;re building, I&apos;d
                    be excited to talk.
                  </p>

                  <div className="space-y-3">
                    <a
                      href="mailto:shawharishankar8@gmail.com"
                      className="block text-center w-full px-5 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-sm font-semibold text-white transition-all"
                    >
                      📧 Send Email
                    </a>

                    <a
                      href="https://linkedin.com/in/hari-shankar-shaw"
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center w-full px-5 py-2.5 rounded-full border border-slate-600 hover:border-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-all"
                    >
                      🔗 Connect on LinkedIn
                    </a>

                    <a
                      href="/Hari_Resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center w-full px-5 py-2.5 rounded-full border border-slate-700 bg-slate-800 hover:border-indigo-500 hover:-translate-y-[2px] hover:shadow-lg text-sm font-semibold transition-all"
                    >
                      📄 Download Resume
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 mt-8 text-center text-xs text-slate-500">
        © {year} Hari Shankar Shaw. Built with React &amp; Tailwind CSS.
      </footer>
    </div>
  );
};

// Small reusable components
const TechPill = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
    {children}
  </span>
);

const SkillCard = ({ title, items }) => (
  <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 hover:-translate-y-1 hover:border-indigo-500/70 transition-all">
    <h3 className="font-semibold mb-2">{title}</h3>
    <ul className="space-y-1 text-slate-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const FactRow = ({ label, value }) => (
  <div className="text-xs">
    <p className="text-slate-400">{label}</p>
    <p className="font-medium text-slate-100">{value}</p>
  </div>
);

const ExperienceItem = ({ role, company, period, location, bullets }) => (
  <article className="relative pl-6 border-l border-slate-800">
    <div className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-indigo-400" />
    <h3 className="text-lg font-semibold">{role}</h3>
    <p className="text-sm text-slate-400">
      {company} • {period} • {location}
    </p>
    <ul className="mt-2 text-sm text-slate-300 space-y-1.5">
      {bullets.map((b, idx) => (
        <li key={idx}>• {b}</li>
      ))}
    </ul>
  </article>
);

// Counter + stats components
const Counter = ({ end, duration = 1200, display }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * end);
      setValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  const shown = display ? display(value) : value;

  return <span>{shown}</span>;
};

const StatBlock = ({ label, end, prefix = "", suffix = "", display }) => (
  <div className="border border-slate-800 rounded-2xl px-4 py-3 bg-slate-900/70">
    <div className="text-lg font-semibold text-slate-100">
      {prefix}
      <Counter end={end} display={display} />
      {suffix}
    </div>
    <div className="text-xs text-slate-400 mt-1">{label}</div>
  </div>
);

export default App;
