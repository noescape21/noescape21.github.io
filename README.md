# Your Name — Defensive Security

Personal site / blog built with [Jekyll](https://jekyllrb.com/) using the
[`jekyll-theme-console`](https://github.com/b2a3e8/jekyll-theme-console)
remote theme. Designed to be hosted on **GitHub Pages**.

## Structure

```
.
├── _config.yml         # site config (title, theme, social handles, footer)
├── CNAME               # custom domain
├── index.md            # landing page (whoami, currently, experience, stack, projects, connectivity)
├── blog.md             # writeups index
├── contact.md          # contact form / email
├── 404.md              # 404 page
├── _posts/             # blog posts (YYYY-MM-DD-slug.md)
└── assets/             # custom CSS overrides (Midnight Indigo palette)
```

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000

## Deploy on GitHub Pages

1. Create a repo named `<your-github-username>.github.io`.
2. Push these files to the `main` branch.
3. In **Settings → Pages**, set source to `main` / root.
4. If using a custom domain, edit `CNAME` and point your DNS A records to
   GitHub Pages IPs:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

## Editing

- New writeup: drop a file in `_posts/` named `YYYY-MM-DD-title.md` with the
  same front-matter as the example post.
- Change colors / fonts: edit `assets/main.scss`.
- Change links / handles: edit `_config.yml`.
