import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { socialLinks } from "@/data/social-links";
import { blogPosts } from "@/data/blog-posts";
import { stack, nowFocus, experience, projects } from "@/data/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Your Name",
  jobTitle: nowFocus.role,
  description:
    "Defensive security professional specializing in threat hunting and detection engineering.",
  sameAs: [
    "https://github.com/yourhandle",
    "https://linkedin.com/in/yourhandle",
    "https://tryhackme.com/p/yourhandle",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Name — Defensive Security Analyst" },
      {
        name: "description",
        content:
          "Defensive security professional — threat hunting, detection engineering, incident response. Write-ups, tools, and profiles across TryHackMe, HTB, KC7, and GitHub.",
      },
      { property: "og:title", content: "Your Name — Defensive Security Analyst" },
      {
        property: "og:description",
        content:
          "Threat hunting, detection engineering, and incident response — write-ups, tools, and profiles in one place.",
      },
      { property: "og:type", content: "profile" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personJsonLd),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const recent = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-base text-slate-300">
      <SiteHeader />

      <main className="mx-auto flex max-w-2xl flex-col gap-28 px-6 py-20 sm:py-28">
        {/* Hero */}
        <section className="space-y-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo shadow-[0_0_8px_#58a6ff]" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {nowFocus.availability}
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
              {nowFocus.location}
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="font-mono text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Your Name
            </h1>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-indigo">
              {nowFocus.role}
            </p>
            <p className="text-xl font-light leading-relaxed text-slate-400">
              Defensive security professional specializing in{" "}
              <span className="border-b border-indigo-dim text-white">threat hunting</span>{" "}
              and{" "}
              <span className="border-b border-indigo-dim text-white">detection engineering</span>.
              I build instrumentation to turn noise into actionable signals.
            </p>
          </div>
        </section>

        {/* Currently */}
        <section className="space-y-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            // Currently
          </h2>
          <ul className="space-y-3 border-l border-indigo-dim pl-6">
            {nowFocus.current.map((item, i) => (
              <li key={i} className="relative font-light leading-relaxed text-slate-300">
                <span className="absolute -left-[27px] top-2.5 h-1.5 w-1.5 rounded-full bg-indigo" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section className="space-y-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            // Experience
          </h2>
          <ul className="space-y-4">
            {experience.map((e, i) => (
              <li
                key={i}
                className="grid grid-cols-[80px_1fr] items-baseline gap-4 border-t border-indigo-dim/60 pt-4"
              >
                <span
                  className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                    e.status === "present" ? "text-indigo" : "text-slate-600"
                  }`}
                >
                  {e.status === "present" ? "● Present" : "○ Past"}
                </span>
                <div>
                  <p className="text-sm text-white">{e.role}</p>
                  <p className="font-mono text-[11px] text-slate-500">@ {e.org}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Profiles — icon row */}
        <section className="space-y-8">

          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            // Connectivity
          </h2>
          <ul className="flex flex-wrap items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.label}
                    title={link.label}
                    className="group relative flex h-11 w-11 items-center justify-center rounded-sm border border-indigo-dim bg-base text-slate-400 transition-all hover:-translate-y-0.5 hover:border-indigo hover:bg-surface hover:text-indigo hover:shadow-[0_0_12px_rgba(88,166,255,0.25)]"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-indigo-dim bg-surface px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-300 opacity-0 transition-opacity group-hover:opacity-100">
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Stack */}
        <section className="space-y-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            // Stack
          </h2>
          <div className="space-y-6">
            {stack.map((group) => (
              <div
                key={group.category}
                className="grid grid-cols-1 gap-2 border-t border-indigo-dim/60 pt-4 sm:grid-cols-[160px_1fr]"
              >
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  {group.category}
                </p>
                <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-300">
                  {group.items.map((tool, i) => (
                    <span key={tool} className="inline-flex items-center gap-3">
                      {i > 0 && <span className="text-indigo-dim">·</span>}
                      {tool}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects & Tooling */}
        <section className="space-y-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            // Projects & Tooling
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((p) => {
              const Wrapper = p.url ? "a" : "div";
              const wrapperProps = p.url
                ? { href: p.url, target: "_blank", rel: "noreferrer noopener" }
                : {};
              return (
                <Wrapper
                  key={p.name}
                  {...wrapperProps}
                  className="group flex flex-col gap-3 rounded-sm border border-dashed border-indigo-dim p-5 transition-all hover:border-indigo hover:bg-surface/40"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-mono text-sm font-bold text-white transition-colors group-hover:text-indigo">
                      {p.name}
                    </h3>
                    {p.url && (
                      <span className="font-mono text-[10px] text-slate-500 transition-colors group-hover:text-indigo">
                        ↗
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-light leading-relaxed text-slate-400">
                    {p.description}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    {p.tags.map((t) => (
                      <li key={t}>#{t}</li>
                    ))}
                  </ul>
                </Wrapper>
              );
            })}
          </div>
        </section>




        {/* Intel feed */}
        <section className="space-y-12">
          <div className="flex items-baseline justify-between">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
              // Intel Feed
            </h2>
            <Link
              to="/blog"
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-white"
            >
              All →
            </Link>
          </div>

          <div className="space-y-12">
            {recent.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block cursor-pointer"
              >
                <time
                  dateTime={post.date}
                  className="mb-3 block font-mono text-[10px] font-bold tracking-widest text-indigo"
                >
                  {post.date.replace(/-/g, ".")}
                </time>
                <h3 className="mb-2 text-xl font-medium tracking-tight text-white transition-colors group-hover:text-indigo">
                  {post.title}
                </h3>
                <p className="font-light leading-relaxed text-slate-400">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
