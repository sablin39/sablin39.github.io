---
title: test_formula
comments: true
toc: true
donate: true
share: true
mathjax: true
date: 1970-01-01 00:00:01
categories:
tags:
---

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
More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

