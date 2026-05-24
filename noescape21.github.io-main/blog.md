---
title: /blog
layout: page
permalink: /blog/
---

<h1> Writeups </h1>
{%- if site.posts.size > 0 -%}
  <ul>
    {%- for post in site.posts -%}
      {%- if post.categories contains "Bug-Bounty" -%}
      <li>
        {%- assign date_format = "%m-%d-%Y" -%}
        [ {{ post.date | date: date_format }} ] <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
      {%- endif -%}
    {%- endfor -%}
  </ul>
{%- endif -%}
