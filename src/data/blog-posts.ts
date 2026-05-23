export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO
  readingTime: string;
  tags: string[];
  excerpt: string;
  content: string; // simple markdown-ish; rendered as paragraphs
};

// Add new posts by appending to this array.
export const blogPosts: BlogPost[] = [
  {
    slug: "hello-world",
    title: "Hello, world — and welcome to my notebook",
    date: "2026-05-20",
    readingTime: "2 min",
    tags: ["intro", "meta"],
    excerpt:
      "A short intro to who I am, what I'm researching, and what you can expect from this blog.",
    content: `Welcome. This corner of the internet is where I dump notes from CTFs, write-ups for retired boxes, and the occasional rant about detection engineering.

Expect short, technical posts: payloads, queries, mistakes I made, and how I fixed them. No fluff.

If you want to chat, the links on the homepage are the fastest way to reach me.`,
  },
  {
    slug: "thm-advent-of-cyber-notes",
    title: "Advent of Cyber — notes from the trenches",
    date: "2026-05-12",
    readingTime: "6 min",
    tags: ["tryhackme", "writeup", "blue-team"],
    excerpt:
      "Lessons learned working through TryHackMe's Advent of Cyber: tooling, common pitfalls, and the queries I keep reusing.",
    content: `Advent of Cyber is one of the better free intros to defensive work. A few takeaways:

1. Get fluent with Splunk SPL and KQL early — they pay dividends.
2. Build a personal cheatsheet of detection queries. Mine lives in a private repo.
3. Don't skip the OSINT days. Most real incidents start with one weird email.

I'll be expanding each section into its own post over the next few weeks.`,
  },
  {
    slug: "kc7-investigation-mindset",
    title: "KC7 and the investigation mindset",
    date: "2026-04-28",
    readingTime: "4 min",
    tags: ["kc7", "threat-hunting"],
    excerpt:
      "KC7 isn't just a CTF — it's a forcing function for thinking like an analyst. Here's how I approach it.",
    content: `The trick with KC7 is to resist the urge to pivot randomly. Start with a hypothesis, write it down, then query.

My loop:
- Identify the suspicious indicator
- Pivot on time, then on identity
- Confirm impact before declaring scope

It's slow at first. It gets fast.`,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
