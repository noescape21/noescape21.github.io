import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getPostBySlug } from "@/data/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Intel Feed` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Post not found" }],
  }),
  notFoundComponent: () => {
    const { slug } = Route.useParams();
    return (
      <div className="min-h-screen bg-base text-slate-300">
        <SiteHeader />
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-indigo">
            404 / NO_MATCH
          </p>
          <h1 className="mt-4 font-mono text-3xl text-white">
            Post "{slug}" not found
          </h1>
          <Link
            to="/blog"
            className="mt-8 inline-block font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white"
          >
            ← back to /blog
          </Link>
        </div>
      </div>
    );
  },
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-base p-12 text-center text-slate-300">
      <p className="font-mono text-destructive">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 font-mono text-sm text-indigo hover:underline"
      >
        retry
      </button>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const paragraphs = post.content.split(/\n\n+/);

  return (
    <div className="min-h-screen bg-base text-slate-300">
      <SiteHeader />

      <article className="mx-auto max-w-2xl px-6 py-20">
        <Link
          to="/blog"
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-white"
        >
          ← /blog
        </Link>

        <header className="mt-12 space-y-6 border-b border-indigo-dim/60 pb-10">
          <time
            dateTime={post.date}
            className="block font-mono text-[10px] font-bold tracking-widest text-indigo"
          >
            {post.date.replace(/-/g, ".")} · {post.readingTime}
          </time>
          <h1 className="font-mono text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {post.tags.map((tag: string) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </header>

        <div className="mt-12 space-y-6 text-lg font-light leading-relaxed text-slate-300">
          {paragraphs.map((p: string, i: number) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
