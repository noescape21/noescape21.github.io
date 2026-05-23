---
title: /blog
layout: page
permalink: /blog/
---

# // Intel Feed

Write-ups on threat hunting, detection engineering, and incident response.

{%- if site.posts.size > 0 -%}
<ul>
  {%- for post in site.posts -%}
  <li>
    {%- assign date_format = "%Y.%m.%d" -%}
    [ {{ post.date | date: date_format }} ] <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
  </li>
  {%- endfor -%}
</ul>
{%- else -%}
<p>No posts yet — first write-up coming soon.</p>
{%- endif -%}
