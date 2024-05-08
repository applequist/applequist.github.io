+++
title = 'Beware the Mermaid!'
author = 'Brieuc Desoutter'
date = 2024-05-08T09:47:17+03:00
draft = true
tags = ["web", "diagram"]
+++

## What are you talking about ? 

I am talking about the [mermaid](https://mermaid.js.org), the javascript diagramming framework!

Here is an example:

```mermaid
graph TD
    A[Enter Chart Definition] --> B(Preview)
    B --> C{decide}
    C --> D[Keep]
    C --> E[Edit Definition]
    E --> B
    D --> F[Save Image and Code]
    F --> B
```

