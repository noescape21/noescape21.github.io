import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Terminal } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { socialLinks } from "@/data/social-links";
import { blogPosts } from "@/data/blog-posts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "whoami — Cybersecurity Researcher & Blogger" },
      {
        name: "description",
        content:
          "Personal site of a cybersecurity professional. CTF write-ups, threat-hunting notes, and links to TryHackMe, HTB, KC7, GitHub and more.",
      },
      { property: "og:title", content: "whoami — Cybersecurity Researcher" },
      {
        property: "og:description",
        content:
          "CTF write-ups, threat-hunting notes, and all my profiles in one place.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const recent = blogPosts.slice(0, 3);
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32">
          <div className="flex items-center gap-2 font-mono text-xs text-terminal">
            <Terminal className="h-3.5 w-3.5" />
            <span>~/portfolio</span>
            <span className="text-muted-foreground">$ ./run.sh</span>
          </div>
          <h1 className="mt-6 font-mono text-4xl font-medium tracking-tight text-foreground sm:text-6xl">
            <span className="text-muted-foreground">&gt;</span> Your Name
            <span className="terminal-cursor" />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cybersecurity professional focused on{" "}
            <span className="text-foreground">offensive security</span>,{" "}
            <span className="text-foreground">threat hunting</span>, and{" "}
            <span className="text-foreground">detection engineering</span>. I break things,
            write about it, and occasionally fix them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
            <span className="rounded border border-border bg-card px-2.5 py-1 text-muted-foreground">
              <span className="text-terminal">●</span> Open to collaboration
            </span>
            <span className="rounded border border-border bg-card px-2.5 py-1 text-muted-foreground">
              Based: Remote
            </span>
          </div>
        </div>
      </section>

      {/* Links grid */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            // profiles
          </h2>
          <span className="font-mono text-xs text-terminal-dim">
            {socialLinks.length} links
          </span>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 rounded-md border border-border bg-card px-4 py-3.5 transition-colors hover:border-terminal/60 hover:bg-secondary"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-border bg-background text-muted-foreground transition-colors group-hover:border-terminal/40 group-hover:text-terminal">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-foreground">
                      {link.label}
                    </span>
                    <span className="block truncate font-mono text-xs text-muted-foreground">
                      {link.handle}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terminal" />
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Recent posts */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            // recent_posts
          </h2>
          <Link
            to="/blog"
            className="font-mono text-xs text-terminal hover:opacity-80"
          >
            view all →
          </Link>
        </div>
        <ul className="divide-y divide-border/60 border-y border-border/60">
          {recent.map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col gap-1 py-5 transition-colors hover:bg-card/40 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-medium text-foreground group-hover:text-terminal">
                    {post.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {post.excerpt}
                  </span>
                </span>
                <time
                  dateTime={post.date}
                  className="shrink-0 font-mono text-xs text-muted-foreground"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </div>
  );
}
