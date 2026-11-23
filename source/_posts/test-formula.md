---
title: 'Inline math: $E = mc^2$'
title_text: 'Inline math: E = mc²'
description: 'Inline formulas in titles and abstracts: $E = mc^2$ and $\alpha_i + \beta_j$.'
comments: true
toc: true
donate: true
share: true
date: 1970-01-01 00:00:01
categories:
tags:
---

This home-page abstract contains inline math $\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}$ and $\alpha_i + \beta_j$.

<!-- more -->

### Latex tests

Here are various LaTeX formulas to test rendering capabilities:

#### Inline Formulas

Einstein's famous equation: $E = mc^2$ shows the relationship between energy and mass.

The quadratic formula $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ solves $ax^2 + bx + c = 0$.

The Pythagorean theorem states that $ a^2 + b^2 = c^2 $ for right triangles.

#### Centered Equations

Newton's second law of motion:

$$
F = m \cdot a
$$

Euler's identity, often considered the most beautiful equation in mathematics:

$$
e^{i\pi} + 1 = 0
$$

The Gaussian integral:

$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

#### Begin/End Blocks

A matrix representation:

$$
\begin{array}{ccc}
  a & b & c \\
  d & e & f \\
  g & h & i
\end{array}
$$

A system of linear equations:

$$
\begin{aligned}
  3x + 2y - z &= 1 \\
  2x - 2y + 4z &= -2 \\
  -x + \frac{1}{2}y - z &= 0
\end{aligned}
$$

A piecewise function definition:

$$
\begin{cases}
  x^2 & \text{if } x \geq 0 \\
  -x^2 & \text{if } x < 0
\end{cases}
$$

#### Left/Right Delimiters

The expectation value in quantum mechanics:

$$\left\langle \psi \right| \hat{A} \left| \psi \right\rangle$$

A binomial coefficient:

$$\binom{n}{k} = \left( \begin{array}{c} n \\ k \end{array} \right) = \frac{n!}{k!(n-k)!}$$

The Legendre symbol:

$$
\left( \frac{a}{p} \right) = \begin{cases}
  1 & \text{if } a \text{ is a quadratic residue modulo } p \text{ and } a \not\equiv 0 \pmod{p} \\
  -1 & \text{if } a \text{ is a quadratic non-residue modulo } p \\
  0 & \text{if } a \equiv 0 \pmod{p}
\end{cases}
$$

#### Complex Expressions

The Fourier transform:

$$\mathcal{F}[f(t)] = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt$$

Schrödinger's equation:

$$i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left [ -\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right ] \Psi(\mathbf{r},t)$$

Maxwell's equations in differential form:

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial\mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
\end{aligned}
$$
### Formula Stress Tests

#### Dense Inline Expressions

Nested fractions, roots, superscripts, and subscripts: $\displaystyle x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} = \sqrt[3]{1 + \sqrt{\frac{a_1^2 + b_1^2}{1 - \gamma_{ij}^{(k)}}}}$.

Accents, tensors, and operators: $\tilde{\nabla}_{\mu} T^{\mu\nu}{}_{\lambda} = \ddot{\mathcal{Q}}^{\nu}{}_{\lambda} + \widehat{\mathbf{R}}^{\alpha\beta}$ and $\operatorname*{arg\,min}_{\theta \in \Theta} \sum_{i=1}^{n} \mathcal{L}_i(\theta)$.

Text and escaped delimiters inside math: $\mathcal{S} = \left\{ x \in \mathbb{R} \mid |x| \leq 1,\ \text{and } x \neq 0 \right\}$.

Symbols that otherwise matter to Markdown: $\alpha_i^{*} + \beta_j^{**} + \gamma_{k\_\ell} \quad \text{and} \quad \mathbf{x}^{\mathsf{T}} \mathbf{A} \mathbf{x}$.

#### Delimiters and Arrays

Scaled delimiters around a tall nested expression:

$$
\left\| \frac{\mathbf{A}^{-1}\mathbf{x}}{1 + \left\langle \mathbf{u}, \mathbf{v} \right\rangle} \right\|_2
\leq
\left[ \frac{\sum_{i=1}^{n} |x_i|^p}{\prod_{j=1}^{m} (1 + y_j^2)} \right]^{1/p}
$$

A matrix with nested fractions, dots, and aligned entries:

$$
\mathbf{M} =
\begin{bmatrix}
\frac{1}{\sqrt{2}} & \alpha_{12} & \cdots & \beta_1 \\
0 & \mathbf{I}_{n \times n} & \ddots & \vdots \\
\gamma_1 & \cdots & \frac{a+b}{c+d} & \omega_n
\end{bmatrix}
$$

#### Alignment and Line Breaks

A derivation with alignment markers, text annotations, and ordinary LaTeX row breaks:

$$
\begin{aligned}
\mathcal{L}(\theta)
&= \mathbb{E}_{x \sim p(x)}\left[\log p_\theta(x)\right] \\
&= \sum_{i=1}^{n} \left( \frac{1}{2}\|f_\theta(x_i)\|^2 - \lambda_i x_i \right)
  && \text{objective} \\
&= \sum_{i=1}^{n} \left( \frac{\alpha_i^2 + \beta_i^2}{2} \right)
  && \text{quadratic form} \\
&\leq \sum_{i=1}^{n} \left( \frac{\alpha_i^2 + \beta_i^2}{2} \right)
  && \text{upper bound}
\end{aligned}
$$

An aligned system mixing matrices and cases:

$$
\begin{aligned}
\dot{\mathbf{x}} &= \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}, \\
\mathbf{y} &= \mathbf{C}\mathbf{x}, \\
u(t) &=
\begin{cases}
-1 & t < 0, \\
0 & t = 0, \\
1 & t > 0.
\end{cases}
\end{aligned}
$$

#### Long Expressions

A continued fraction with deep nesting:

$$
\cfrac{1}{1 + \cfrac{1}{2 + \cfrac{1}{3 + \cfrac{1}{4 + \cfrac{1}{5 + \cfrac{1}{6 + \cdots}}}}}}
$$

A probability expression combining products, sums, integrals, and limits:

$$
\lim_{N \to \infty}
\frac{1}{N}
\log \left[
\prod_{k=1}^{N}
\int_{-\infty}^{\infty}
\exp\left(-\frac{(x-\mu_k)^2}{2\sigma_k^2}\right)
\,\mathrm{d}x
\right]
=
-\sum_{k=1}^{\infty} p_k \log p_k
$$

### Mermaid Diagrams

#### Flowchart

```mermaid
flowchart LR
    A[Source] --> B{Valid?}
    B -->|Yes| C[Render]
    B -->|No| D[Show source]
```

#### Sequence

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant S as Server
    C->>S: Request
    S-->>C: Response
```

#### Class

```mermaid
classDiagram
    class Shape {
        +area() float
    }
    class Circle {
        +radius: float
        +area() float
    }
    Shape <|-- Circle
```

#### State

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Published: publish
    Published --> Archived: archive
    Archived --> [*]
```

#### Entity Relationship

```mermaid
erDiagram
    AUTHOR ||--o{ POST : writes
    POST ||--|{ TAG : has
```

#### User Journey

```mermaid
journey
    title Publishing a post
    section Write
      Draft: 4: Author
      Review: 3: Editor
    section Publish
      Deploy: 5: Author
```

#### Gantt

```mermaid
gantt
    title Project schedule
    dateFormat YYYY-MM-DD
    section Research
    Survey           :a1, 2026-01-01, 7d
    section Implementation
    Prototype        :a2, after a1, 5d
```

#### Pie

```mermaid
pie showData
    title Diagram allocation
    "Flowchart" : 40
    "Sequence" : 35
    "Other" : 25
```

#### Quadrant Chart

```mermaid
quadrantChart
    title Reach and engagement
    x-axis Low reach --> High reach
    y-axis Low engagement --> High engagement
    quadrant-1 Expand
    quadrant-2 Promote
    quadrant-3 Reevaluate
    quadrant-4 Maintain
    Post A: [0.3, 0.6]
    Post B: [0.7, 0.8]
```

#### Requirement

```mermaid
requirementDiagram
    requirement Blog {
        id: 1
        text: Render diagrams
        risk: low
        verifymethod: test
    }
    element Markdown {
        type: interface
    }
    Markdown - satisfies -> Blog
```

#### Git Graph

```mermaid
gitGraph
    commit id: "Initial"
    branch feature
    checkout feature
    commit id: "Diagram"
    checkout main
    merge feature
```

#### C4 Context

```mermaid
C4Context
    title Blog system context
    Person(reader, "Reader")
    System(blog, "Static blog")
    System_Ext(cdn, "Asset host")
    Rel(reader, blog, "Reads")
    Rel(blog, cdn, "Loads assets")
```

#### Mindmap

```mermaid
mindmap
  root((Blog))
    Content
      Markdown
      KaTeX
    Presentation
      Mermaid
      Themes
```

#### Timeline

```mermaid
timeline
    title Blog milestones
    2022 : First post
    2024 : KaTeX
    2026 : Mermaid
```

#### ZenUML

```mermaid
zenuml
    title Rendering
    Client.request() {
        Server.render()
        return svg
    }
    return response
```

#### Sankey

```mermaid
sankey-beta
Markdown,Blog,70
Markdown,Archive,20
KaTeX,Blog,10
Blog,Reader,80
Archive,Reader,20
```

#### XY Chart

```mermaid
xychart-beta
    title "Formula tests"
    x-axis [Inline, Matrix, Aligned]
    y-axis "Count" 0 --> 40
    bar [10, 8, 12]
    line [10, 8, 12]
```

#### Block

```mermaid
block-beta
    columns 3
    A["Markdown"] B["Mermaid"] C["Browser"]
    A --> B
    B --> C
```

#### Packet

```mermaid
packet-beta
    0-15: "Source port"
    16-31: "Destination port"
    32-63: "Sequence number"
    64-95: "Acknowledgment number"
```

#### Kanban

```mermaid
kanban
    Todo
        [Draft diagram]
    Doing
        [Test renderer]
    Done
        [Publish post]
```

#### Architecture

```mermaid
architecture-beta
    group site(cloud)[Static Site]
    service browser(internet)[Browser]
    service assets(disk)[Assets] in site
    browser:R --> L:assets
```

#### Radar

```mermaid
radar-beta
    title Diagram coverage
    axis m["Markdown"], k["KaTeX"], d["Diagrams"]
    curve a["Current"]{90, 90, 80}
    max 100
    min 0
```

#### Treemap

```mermaid
treemap-beta
    "Blog"
        "Posts"
            "Markdown"
            "Formulas"
        "Assets"
            "Mermaid"
```

#### Frontmatter and Directives

```mermaid
---
title: Configured flowchart
config:
  theme: neutral
  look: classic
  layout: dagre
---
%%{init: {"flowchart": {"curve": "linear"}}}%%
flowchart LR
    A[Directive] --> B[Frontmatter]
```

### Theme-specific Widgets

#### Alert Bars

{% alertbar primary Primary notice with inline math $\alpha + \beta$. %}

{% alertbar success Success notice with **bold text** and a [link](https://hexo.io/). %}

{% alertbar info Information notice with `inline code`. %}

{% alertbar warning Warning notice: check the formula $\lim_{x \to 0} \frac{\sin x}{x} = 1$. %}

{% alertbar danger Danger notice with _emphasized text_. %}

#### Alert Panels

{% alertpanel info Information panel %}
This panel contains **Markdown** and inline math $\int_0^1 x^2\,dx = \frac{1}{3}$.
{% endalertpanel %}

{% alertpanel warning Warning panel %}
Check the following derivation:

$$
\begin{aligned}
a + b &= c, \\
x + y &= z.
\end{aligned}
$$
{% endalertpanel %}

{% alertpanel danger Diagram panel %}
The panel also contains a Mermaid diagram:

```mermaid
flowchart LR
    A[Panel] --> B[Mermaid]
```
{% endalertpanel %}

#### Collapsible Blocks

{% collapse Closed by default %}
This hidden block contains inline math $\mathbf{x}^{\mathsf{T}}\mathbf{A}\mathbf{x}$ and **bold Markdown**.
{% endcollapse %}

{% collapse Open by default,open %}
This block starts open with a multi-row derivation:

$$
\begin{aligned}
\left\lfloor \frac{n}{2} \right\rfloor + \sqrt{a^2 + b^2} &= c, \\
a + b &= c, \\
x + y &= z.
\end{aligned}
$$
{% endcollapse %}

{% collapse Mermaid inside a collapse %}
A collapsed Mermaid diagram must also render when revealed:

```mermaid
flowchart TB
    Start[Collapsed] --> Visible[Visible diagram]
```
{% endcollapse %}

A blurred inline spoiler: {% blur hidden text %}.

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

