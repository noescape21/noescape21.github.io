import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { blogPosts } from "@/data/blog-posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Intel Feed — Defensive Security Notes" },
      {
        name: "description",
        content:
          "Write-ups on threat hunting, detection engineering, incident response, and SOC architecture.",
      },
      { property: "og:title", content: "Intel Feed — Defensive Security Notes" },
      {
        property: "og:description",
        content:
          "Write-ups on threat hunting, detection engineering, and SOC architecture.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const sorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="min-h-screen bg-base text-slate-300">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <header className="mb-24 space-y-6">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-indigo">
            // Intel Feed
          </p>
          <h1 className="font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Notes from the lab
          </h1>
          <p className="text-lg font-light leading-relaxed text-slate-400">
            Write-ups, detection logic, OSINT experiments, and the occasional
            postmortem. Long-form when the topic deserves it, short when it doesn't.
          </p>
        </header>

        <div className="space-y-16">
          {sorted.map((post) => (
            <article key={post.slug} className="group">
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block"
              >
                <time
                  dateTime={post.date}
                  className="mb-4 block font-mono text-[10px] font-bold tracking-widest text-indigo"
                >
                  {post.date.replace(/-/g, ".")}
                </time>
                <h2 className="mb-3 text-2xl font-medium tracking-tight text-white transition-colors group-hover:text-indigo">
                  {post.title}
                </h2>
                <p className="font-light leading-relaxed text-slate-400">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest font-bold text-slate-500">
                  <span>{post.readingTime}</span>
                  <span className="text-indigo-dim">·</span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-slate-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
