import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-indigo-dim/60 bg-base/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
        <Link to="/" className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-white">
          <span className="text-indigo">//</span> whoami
        </Link>
        <nav className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] font-bold">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-indigo" }}
            className="text-slate-500 transition-colors hover:text-white"
          >
            home
          </Link>
          <Link
            to="/blog"
            activeProps={{ className: "text-indigo" }}
            className="text-slate-500 transition-colors hover:text-white"
          >
            blog
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 max-w-2xl border-t border-indigo-dim/60 px-6">
      <div className="flex items-center justify-between py-8 font-mono text-[10px] uppercase tracking-widest font-bold text-slate-500">
        <p>&copy; {new Date().getFullYear()} Built for Defense</p>
        <div className="flex gap-6">
          <a href="/rss.xml" className="hover:text-white">RSS</a>
          <a href="#pgp" className="hover:text-white">PGP</a>
        </div>
      </div>
    </footer>
  );
}
