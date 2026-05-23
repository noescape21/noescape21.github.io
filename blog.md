---
title: /blog
layout: page
permalink: /blog/
---

# Writeups

{%- if site.posts.size > 0 -%}
<ul>
{%- for post in site.posts -%}
  <li>
    {%- assign date_format = "%Y-%m-%d" -%}
    [ {{ post.date | date: date_format }} ]
    <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    {%- if post.tags.size > 0 %} —
      {%- for tag in post.tags %} <code>#{{ tag }}</code>{%- endfor -%}
    {%- endif %}
  </li>
{%- endfor -%}
</ul>
{%- else -%}
<p><em>No posts yet. Drop a Markdown file in <code>_posts/</code>.</em></p>
{%- endif -%}
