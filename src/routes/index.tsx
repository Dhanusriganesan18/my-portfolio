import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Download,
  ExternalLink,
  Code2,
  Database,
  Server,
  Wrench,
  Sparkles,
  GraduationCap,
  Briefcase,
  Award,
  Send,
  ArrowUpRight,
  Cpu,
  Layers,
  Globe,
} from "lucide-react";
import profileAsset from "@/assets/dhanusri.jpg.asset.json";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "journey", label: "Journey" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certs", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhanusri Ganesan — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Dhanusri Ganesan, aspiring Full Stack Developer with experience in MERN stack, REST APIs, and modern web applications.",
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen text-foreground">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-cyan via-blue to-purple"
      />

      {/* glow orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-blue/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-purple/20 blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-cyan/15 blur-[120px] animate-pulse-glow" />
      </div>

      <Nav active={active} />
      <Hero />
      <About />
      <Education />
      <Journey />
      <Experience />
      <Skills />
      <Stats />
      <Projects />
      <Certs />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 sm:px-6">
          <a href="#home" className="font-display text-lg font-bold tracking-tight">
            <span className="text-gradient">DhanusriStack</span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === n.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full btn-ghost lg:hidden"
            >
              <span className="flex flex-col gap-1">
                <span className="h-0.5 w-4 bg-foreground" />
                <span className="h-0.5 w-4 bg-foreground" />
              </span>
            </button>
          </div>
        </div>
        {open && (
          <div className="glass mt-2 rounded-2xl p-3 lg:hidden">
            <div className="grid grid-cols-3 gap-1.5">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2 text-center text-xs text-muted-foreground hover:bg-white/10 hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const phrases = [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "Problem Solver",
    "AI/ML Student",
  ];
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = phrases[i];
    const t = setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), 1400);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDeleting(false);
            setI((p) => (p + 1) % phrases.length);
          }
        }
      },
      deleting ? 40 : 80
    );
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <section id="home" className="relative pt-32 sm:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="min-w-0"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-emerald-400" />
            Available for opportunities
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Hi, I'm <span className="text-gradient">Dhanusri Ganesan</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            <span className="text-gradient font-semibold">{text}</span>
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 bg-foreground animate-pulse-glow" />
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Aspiring Full Stack Developer with hands-on experience in React.js, Node.js,
            MongoDB, and MySQL. Skilled in building responsive web applications, REST
            APIs, and database-driven solutions — passionate about scalable software and
            exceptional user experiences.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#resume"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold btn-primary"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold btn-ghost"
            >
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            {[
              { Icon: Linkedin, href: "https://linkedin.com/in/dhanusri-ganesan", label: "LinkedIn" },
              { Icon: Github, href: "https://github.com/Dhanusriganesan18", label: "GitHub" },
              { Icon: Mail, href: "mailto:dhanusrig90@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass grid h-11 w-11 place-items-center rounded-full transition-transform hover:-translate-y-1 hover:text-cyan"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          {/* floating tech icons */}
          {[
            { Icon: Code2, c: "top-0 left-4", d: "0s" },
            { Icon: Database, c: "top-10 -right-2", d: "1.2s" },
            { Icon: Server, c: "bottom-12 -left-4", d: "0.6s" },
            { Icon: Cpu, c: "bottom-0 right-8", d: "1.8s" },
            { Icon: Layers, c: "top-1/2 -right-6", d: "2.4s" },
            { Icon: Globe, c: "top-1/3 -left-6", d: "0.9s" },
          ].map(({ Icon, c, d }, idx) => (
            <div
              key={idx}
              style={{ animationDelay: d }}
              className={`glass absolute z-10 grid h-12 w-12 place-items-center rounded-2xl text-cyan animate-float ${c}`}
            >
              <Icon className="h-5 w-5" />
            </div>
          ))}

          <motion.div
            className="absolute bottom-6 left-6 hidden md:block"
            whileHover={{ rotateY: 180 }}
            style={{ perspective: 900 }}
          >
            <motion.div
              className="relative h-36 w-40 rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-4 shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 rounded-[1.5rem] bg-slate-950/95 p-4"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                  Hi!
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Dhanusri here
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nice to meet you — explore my work.
                </p>
              </div>

              <div
                className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-cyan/20 to-blue/20 p-4 text-slate-950"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <span className="text-xs uppercase tracking-[0.35em] text-slate-700">
                  Flip card
                </span>
                <h3 className="mt-4 text-lg font-semibold">
                  Hello again!
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  I'm a Full Stack Developer with a passion for building clean UI.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="glass-strong glow-ring relative h-full w-full overflow-hidden rounded-[2rem] p-2">
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-blue/30 via-purple/20 to-cyan/30">
              <img
                src={profileAsset.url}
                alt="Dhanusri Ganesan"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Section primitives ---------- */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <span className="glass inline-block rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
    </motion.div>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  const highlights = [
    "Full Stack Development Enthusiast",
    "MERN Stack Developer",
    "Problem Solver",
    "Team Collaborator",
    "Continuous Learner",
  ];
  return (
    <Section id="about">
      <SectionHeader eyebrow="About Me" title="A glimpse of who I am" />
      <div className="grid items-start gap-6 lg:grid-cols-5 lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 sm:p-8 lg:col-span-3 lg:h-full"
        >
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            I am a <span className="text-foreground font-medium">B.Tech AIML student at
            SNS College of Technology</span> with a CGPA of{" "}
            <span className="text-gradient font-semibold">8.91</span>. Although pursuing
            AIML, my true passion lies in Full Stack Development. I enjoy building modern
            web applications, solving real-world problems, and continuously learning new
            technologies.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Through internships and project-based learning, I've gained experience in
            frontend, backend, databases, REST APIs, and software engineering practices.
            My goal is to contribute to innovative software products while continuously
            improving my technical and problem-solving skills.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <span
                key={h}
                className="glass rounded-full px-3 py-1.5 text-xs text-foreground/90"
              >
                {h}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4 lg:col-span-2 lg:h-full">
          {[
            { Icon: Sparkles, label: "CGPA", value: "8.91 / 10" },
            { Icon: Briefcase, label: "Internships", value: "3 Completed" },
            { Icon: Code2, label: "Focus", value: "MERN Full Stack" },
          ].map(({ Icon, label, value }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass flex h-full items-center gap-4 rounded-2xl p-5"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue/40 to-purple/40">
                <Icon className="h-5 w-5 text-cyan" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {label}
                </div>
                <div className="font-display text-lg font-semibold">{value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- EDUCATION ---------- */
function Education() {
  const items = [
    {
      school: "SNS College of Technology",
      degree: "B.Tech — Artificial Intelligence and Machine Learning",
      years: "2023 – 2027",
      score: "CGPA: 8.91",
    },
    {
      school: "Sree Dharmasatha Matriculation Hr. Sec. School",
      degree: "Higher Secondary Education",
      years: "2022 – 2023",
      score: "Score: 85%",
    },
    {
      school: "Sree Dharmasatha Matriculation Hr. Sec. School",
      degree: "Secondary Education",
      years: "2020 – 2021",
      score: "Result: All Pass",
    },
  ];

  return (
    <Section id="education">
      <SectionHeader eyebrow="Education" title="Academic Journey" />

      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan/60 via-blue/40 to-purple/0 sm:left-1/2" />
        <div className="space-y-8">
          {items.map((it, idx) => (
            <div
              key={idx}
              className={`relative grid grid-cols-[2rem_1fr] gap-4 sm:grid-cols-2 sm:gap-12 ${
                idx % 2 === 1 ? "sm:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative sm:flex sm:items-center sm:justify-end">
                <div className="absolute left-4 top-2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-1/2">
                  <div className="glass grid h-8 w-8 place-items-center rounded-full">
                    <GraduationCap className="h-4 w-4 text-cyan" />
                  </div>
                </div>
                <div className="hidden text-right text-sm text-muted-foreground sm:block sm:pr-8">
                  {it.years}
                </div>
              </div>
              <div className="glass rounded-2xl p-5 sm:p-6">
                <div className="text-xs text-muted-foreground sm:hidden">{it.years}</div>
                <h3 className="font-display text-base font-semibold sm:text-lg">
                  {it.school}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{it.degree}</p>
                <p className="mt-3 inline-block rounded-full bg-white/8 px-3 py-1 text-xs text-cyan">
                  {it.score}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- JOURNEY ---------- */
function Journey() {
  const items = [
    { y: "2023", t: "Started B.Tech AIML at SNS College of Technology." },
    { y: "2024", t: "Completed Python Internship at Live Stream Technologies." },
    { y: "2025", t: "Completed MERN Stack Internship at AMYPO." },
    { y: "2026", t: "Completed Web Development Internship at Pumo Technovation." },
    { y: "Present", t: "Building Full Stack Projects & preparing for Software Developer roles." },
  ];
  return (
    <Section id="journey">
      <SectionHeader eyebrow="My Journey" title="A roadmap of growth" />
      <div className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible">
        {items.map((it, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08, type: "spring", stiffness: 150 }}
            className="glass min-w-[78%] snap-start rounded-2xl border border-white/10 p-5 shadow-xl shadow-cyan/10 transition-all duration-300 hover:border-cyan/40 md:min-w-0"
          >
            <div className="font-display text-2xl font-bold text-gradient">{it.y}</div>
            <div className="mt-1 h-px w-10 bg-cyan/60" />
            <p className="mt-3 text-sm text-muted-foreground">{it.t}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- EXPERIENCE ---------- */
function Experience() {
  const items = [
    {
      company: "Pumo Technovation",
      role: "Web Development Intern",
      date: "January 2026",
      points: [
        "Worked with HTML, CSS, JavaScript, Bootstrap, and Java Servlets.",
        "Developed responsive web applications.",
        "Integrated frontend and backend functionalities.",
        "Enhanced software development and debugging skills.",
      ],
    },
    {
      company: "AMYPO",
      role: "MERN Stack Intern",
      date: "September 2025",
      points: [
        "Developed modules using MongoDB, Express.js, React.js, Node.js.",
        "Built REST APIs and integrated services.",
        "Collaborated with the team using Git & GitHub.",
      ],
    },
    {
      company: "Live Stream Technologies",
      role: "Python Intern",
      date: "August 2024",
      points: [
        "Worked on data analysis and preprocessing using Python.",
        "Assisted in project development and testing.",
        "Participated in software documentation.",
      ],
    },
  ];
  return (
    <Section id="experience">
      <SectionHeader eyebrow="Experience" title="Internships & Roles" />
      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((it, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass group relative flex flex-col rounded-3xl p-6 transition-transform hover:-translate-y-1.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan/30 to-blue/40">
                <Briefcase className="h-5 w-5 text-cyan" />
              </div>
              <span className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] text-muted-foreground">
                {it.date}
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{it.company}</h3>
            <p className="text-sm text-cyan">{it.role}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {it.points.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- SKILLS ---------- */
function Skills() {
  const groups = [
    { Icon: Code2, title: "Programming Languages", items: ["Java", "JavaScript", "Python", "C"] },
    { Icon: Layers, title: "Frontend Development", items: ["HTML5", "CSS3", "Bootstrap", "React.js"] },
    { Icon: Server, title: "Backend Development", items: ["Node.js", "Express.js"] },
    { Icon: Database, title: "Databases", items: ["MongoDB", "MySQL"] },
    { Icon: Wrench, title: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Canva", "MS Excel"] },
    { Icon: Cpu, title: "Core Concepts", items: ["REST APIs", "OOP", "Data Structures", "Problem Solving"] },
  ];
  return (
    <Section id="skills">
      <SectionHeader eyebrow="Skills" title="My Tech Toolkit" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ Icon, title, items }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            className="glass rounded-2xl p-6 transition hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue/40 to-purple/40">
                <Icon className="h-5 w-5 text-cyan" />
              </div>
              <h3 className="font-display text-base font-semibold">{title}</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {items.map((it) => (
                <span
                  key={it}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-foreground/90 transition hover:border-cyan/50 hover:bg-cyan/10 hover:text-cyan"
                >
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- STATS ---------- */
function Stats() {
  const stats = [
    { v: "3", l: "Internships Completed" },
    { v: "3+", l: "Full Stack Projects" },
    { v: "MERN", l: "Stack Experience" },
    { v: "8.91", l: "Current CGPA" },
  ];
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass-strong grid grid-cols-2 gap-4 rounded-3xl p-6 sm:p-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">
                {s.v}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROJECTS ---------- */
function Projects() {
  const projects = [
    {
      name: "Tamil Nadu Election Campaign Assistant",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
      desc: "Full-stack web application for voter query management, NLP-powered automated responses, and campaign data management. Designed RESTful APIs and integrated frontend/backend efficiently.",
      tag: "Full Stack",
      image: "https://i.postimg.cc/xTpkS00y/electioncampagin.png",
    },
    {
      name: "Focus Master",
      stack: ["React.js", "JavaScript", "CSS"],
      desc: "Productivity web application that helps users stay focused during study sessions through timer-based tracking, task management, and concentration-enhancing features.",
      tag: "Frontend",
      image: "https://i.postimg.cc/yxkHhC2P/Focus-master.png",
    },
    {
      name: "AI Recipe Generator",
      stack: ["React.js", "JavaScript"],
      desc: "AI-powered recipe recommendation platform that generates personalized recipes based on ingredients and user preferences.",
      tag: "AI",
      image: "https://i.postimg.cc/W42x6PkG/Ai-Receipe-Generator.png",
    },
  ];
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", "Full Stack", "Frontend", "AI"];
  const visible = projects.filter((p) => filter === "All" || p.tag === filter);

  return (
    <Section id="projects">
      <SectionHeader eyebrow="Projects" title="Things I've Built" />
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === f
                ? "btn-primary"
                : "btn-ghost text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, idx) => (
          <motion.div
            key={p.name}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="glass group flex flex-col overflow-hidden rounded-3xl transition hover:-translate-y-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 rounded-full bg-black/30 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                {p.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CERTS ---------- */
function Certs() {
  const certs = [
    { name: "Microsoft Azure AI Fundamentals", issuer: "Microsoft" },
    { name: "Java Certification", issuer: "Infosys Springboard" },
    { name: "Introduction to IoT", issuer: "NPTEL" },
    { name: "C Programming", issuer: "PrepInsta" },
  ];
  return (
    <Section id="certs">
      <SectionHeader eyebrow="Certifications" title="Continuous Learning" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certs.map((c, idx) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="glass relative flex flex-col rounded-2xl p-5 transition hover:-translate-y-1"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan/30 to-purple/30">
              <Award className="h-5 w-5 text-cyan" />
            </div>
            <h3 className="mt-4 font-display text-sm font-semibold leading-snug">
              {c.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{c.issuer}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- RESUME ---------- */
function Resume() {
  return (
    <Section id="resume">
      <div className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
        <div className="absolute -top-20 left-1/2 -z-10 h-60 w-60 -translate-x-1/2 rounded-full bg-blue/30 blur-3xl" />
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          <span className="text-gradient">Download My Resume</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Want the full picture? Grab a copy of my resume or preview it online.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="/resume/Dhanusri_Ganesan_Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold btn-primary"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
          <a
            href="/resume/Dhanusri_Ganesan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold btn-ghost"
          >
            <ExternalLink className="h-4 w-4" /> View Resume
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        "service_6z7j6ke",
        "template_5u8supn",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: "dhanusrig90@gmail.com",
          reply_to: form.email,
        },
        { publicKey: "w-x-ZFGEvp4GwRVDs" }
      );
      const { toast } = await import("sonner");
      toast.success("Thank you! Your message has been sent successfully.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const { toast } = await import("sonner");
      toast.error("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact">
      <SectionHeader eyebrow="Contact" title="Let's build something together" />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {[
            { Icon: Mail, l: "Email", v: "dhanusrig90@gmail.com", h: "mailto:dhanusrig90@gmail.com" },
            { Icon: Phone, l: "Phone", v: "+91 9150758411", h: "tel:+919150758411" },
            { Icon: MapPin, l: "Location", v: "Coimbatore, Tamil Nadu" },
            { Icon: Linkedin, l: "LinkedIn", v: "linkedin.com/in/dhanusri-ganesan", h: "https://linkedin.com/in/dhanusri-ganesan" },
            { Icon: Github, l: "GitHub", v: "github.com/Dhanusriganesan18", h: "https://github.com/Dhanusriganesan18" },
          ].map(({ Icon, l, v, h }) => {
            const inner = (
              <>
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue/40 to-purple/40">
                  <Icon className="h-4.5 w-4.5 text-cyan" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {l}
                  </div>
                  <div className="truncate text-sm">{v}</div>
                </div>
              </>
            );
            return h ? (
              <a
                key={l}
                href={h}
                target={h.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:text-cyan"
              >
                {inner}
              </a>
            ) : (
              <div key={l} className="glass flex items-center gap-3 rounded-2xl p-4">
                {inner}
              </div>
            );
          })}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={onSubmit}
          noValidate
          className="glass space-y-4 rounded-3xl p-6 sm:p-8 lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" value={form.name} onChange={onChange} error={errors.name} />
            <Field label="Email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} error={errors.email} />
          </div>
          <Field label="Subject" name="subject" placeholder="What's this about?" value={form.subject} onChange={onChange} error={errors.subject} />
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={5}
              placeholder="Write your message..."
              className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-cyan/60 focus:bg-white/8"
            />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold btn-primary sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" /> {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-cyan/60 focus:bg-white/8"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}


/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="relative pb-10 pt-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="font-display text-xl font-bold">
                <span className="text-gradient">DhanusriStack</span>
              </div>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Transforming ideas into responsive web experiences.
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Quick Links
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {NAV.slice(0, 6).map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      className="text-muted-foreground transition hover:text-cyan"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Connect
              </div>
              <div className="mt-3 flex gap-2">
                {[
                  { Icon: Linkedin, href: "https://linkedin.com/in/dhanusri-ganesan" },
                  { Icon: Github, href: "https://github.com/Dhanusriganesan18" },
                  { Icon: Mail, href: "mailto:dhanusrig90@gmail.com" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass grid h-10 w-10 place-items-center rounded-full transition hover:-translate-y-1 hover:text-cyan"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-muted-foreground">
            © 2026 Dhanusri Ganesan. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
