---
title: 'Why Orthogonal RoPE Supports at Most $\lfloor n/2 \rfloor$ Independent Position Directions'
title_text: 'Why Orthogonal RoPE Supports at Most ⌊n/2⌋ Independent Position Directions'
comments: false
toc: true
donate: false
share: true
show_copyright: false
date: 2026-11-20 17:27:28
categories: Algebra
tags: [algebra,"lie group and lie algebra"]
cover: 
---

With $n$ real features, a smooth family of orthogonal transformations can encode at most $\lfloor n/2\rfloor$ independent position directions. The limiting factor is how rotations compose when a position has more than one coordinate. A quaternion attempt and the axial RoPE used in vision-language models illustrate what this composition requires.

<!-- more -->

## A quick review of RoPE and orthogonal matrices

### The relative-position law

Standard RoPE rotates each pair of query and key features through an angle $\omega x$. Here $x\in\mathbb{R}$ is the scalar position and $\omega\in\mathbb{R}$ is the frequency assigned to that pair. The full encoding matrix arranges these rotations in diagonal blocks, as in [Su's original derivation of RoPE](https://kexue.fm/archives/8265).

Let $\mathcal{R}_x\in\mathbb{R}^{n\times n}$ be an orthogonal encoding matrix at position $x$. Orthogonality gives $\mathcal{R}_x^T\mathcal{R}_x=I_n$, where $I_n$ is the $n\times n$ identity, so the encoding preserves vector lengths. For query and key column vectors $q,k\in\mathbb{R}^n$ at scalar positions $x,y\in\mathbb{R}$, their encoded dot product is the scalar
$$
(\mathcal{R}_xq)^T(\mathcal{R}_yk)=q^T\mathcal{R}_x^T\mathcal{R}_yk.
$$
We recover the relative-position behavior of RoPE by requiring
$$
\mathcal{R}_x^T\mathcal{R}_y=\mathcal{R}_{y-x}.
$$
Setting $y=x$ gives $\mathcal{R}_0=I_n$. To obtain the addition law, take a scalar step $\delta\in\mathbb{R}$, set $y=x+\delta$, and multiply on the left by $\mathcal{R}_x$. This gives $\mathcal{R}_{x+\delta}=\mathcal{R}_x\mathcal{R}_\delta$. Conversely, given the addition law and $\mathcal{R}_0=I_n$, we have
$$
\mathcal{R}_{-x}=\mathcal{R}_x^{-1}=\mathcal{R}_x^T,\qquad
\mathcal{R}_x^T\mathcal{R}_y=\mathcal{R}_{-x}\mathcal{R}_y=\mathcal{R}_{y-x}.
$$
Each block of standard RoPE satisfies the addition law because applying two planar rotations adds their angles, and $\omega(x+\delta)=\omega x+\omega\delta$.

### The group of orthogonal transformations

The real $n\times n$ orthogonal matrices form the group $O(n)$ under multiplication. Its identity is $I_n$. For $R\in O(n)$, the inverse is $R^T$, and $R^TR=I_n$ gives $\det R=\pm1$. The determinant-$+1$ component is the rotation subgroup $SO(n)$. The determinant-$-1$ component consists of orientation-reversing transformations. Composing two such transformations gives determinant $+1$ and lands back in $SO(n)$.

Every eigenvalue $\lambda\in\mathbb{C}$ of a real orthogonal matrix $R$ has modulus one. A nonreal eigenvalue and its conjugate contribute $\lambda\overline{\lambda}=1$ to the determinant. The only possible real eigenvalues are $+1$ and $-1$, so $\det R=(-1)^{r_-}$, where $r_-$ counts the eigenvalues equal to $-1$, with multiplicity. An even count puts $R$ in $SO(n)$, and an odd count puts it in the orientation-reversing component of $O(n)$.

In the plane, $\operatorname{diag}(-1,1)$ reflects across the second coordinate axis and has determinant $-1$. The half-turn $\operatorname{diag}(-1,-1)$ reverses both coordinates. As the rotation angle goes from zero to $\pi$, the eigenvalues move around the unit circle as a conjugate pair and arrive at $-1$ together, with product $+1$ throughout.

For RoPE, the smooth family starts at $\mathcal{R}_0=I_n$, where the determinant is $+1$. Since $\det\mathcal{R}_x$ is continuous in $x$ and takes values in $\{+1,-1\}$, every encoding matrix $\mathcal{R}_x$ has determinant $+1$ and belongs to $SO(n)$.

With the addition law, $\mathcal{R}:(\mathbb{R},+)\to SO(n)$ is a group homomorphism.

<figure class="rope-scene" data-rope-scene="group">
  <figcaption>Compare both orders with a shared world axis, then with B turning about a perpendicular axis.</figcaption>
</figure>

The Lie algebra describes the infinitesimal rotations at the identity. Let $Q(t)\in SO(n)$ be a smooth matrix curve with real parameter $t$ and $Q(0)=I_n$. Its derivative at the identity is the matrix $J=Q'(0)\in\mathbb{R}^{n\times n}$. Differentiating orthogonality at zero gives
$$
Q(t)^TQ(t)=I_n
\quad\Longrightarrow\quad
J^T+J=0.
$$
The real skew-symmetric matrices form $\mathfrak{so}(n)$, the [Lie algebra of the rotation group](https://arxiv.org/pdf/math-ph/0005032#page=43). A curve in $O(n)$ through $I_n$ also stays in $SO(n)$ near $I_n$, so the two groups have the same Lie algebra. In the plane, every skew-symmetric matrix is a scalar multiple of one generator.

### The exponential map in the plane

For an angle $\theta\in\mathbb{R}$, the planar rotation $R_\theta\in SO(2)$ is a $2\times2$ matrix. Its derivative at $\theta=0$ gives the generator matrix $K\in\mathbb{R}^{2\times2}$.
$$
R_\theta=
\begin{pmatrix}
\cos\theta & -\sin\theta\\
\sin\theta & \cos\theta
\end{pmatrix},
\qquad
K=\left.\frac{d R_\theta}{d\theta}\right|_{\theta=0}
=\begin{pmatrix}
0 & -1\\
1 & 0
\end{pmatrix}.
$$
For any real increment $h$, the addition law $R_{\theta+h}=R_hR_\theta$ determines the derivative everywhere. Differentiate with respect to $h$ at zero to get
$$
\frac{dR_\theta}{d\theta}=KR_\theta,
\qquad
R_0=I_2
\quad\Longrightarrow\quad
R_\theta=e^{\theta K}.
$$
Since $K^2=-I_2$, the even and odd terms in the [matrix exponential](https://nhigham.com/2020/05/28/what-is-the-matrix-exponential/) series give $e^{\theta K}=(\cos\theta)I_2+(\sin\theta)K$. Identifying a planar vector with a complex scalar $z\in\mathbb{C}$ makes $K$ act as multiplication by $i$, so the same rotation is $z\mapsto e^{i\theta}z=(\cos\theta+i\sin\theta)z$.

A planar RoPE block with frequency $\omega$ uses $\theta=\omega x$, so its encoding at position $x$ is $e^{x(\omega K)}$.

<figure class="rope-scene" data-rope-scene="algebra">
  <figcaption>The point on the axis stays fixed. Follow the two off-axis arrows as the turn increment shrinks to zero.</figcaption>
</figure>

{% collapse "Quantum evolution and RoPE in bra-ket notation" %}
For a complex matrix $W\in\mathbb{C}^{n\times n}$, the adjoint $W^*$ is its conjugate transpose.
$$
SU(n)\subset U(n),
\qquad
U(n)=\{W\in\mathbb{C}^{n\times n}:W^*W=I_n\},
\qquad
SU(n)=\{W\in U(n):\det W=1\}.
$$
The generator $Z\in\mathbb{C}^{n\times n}$ is anti-Hermitian. For special unitary generators, the trace $\operatorname{tr}Z$, the sum of the diagonal entries, also vanishes.
$$
\mathfrak{u}(n)=\{Z\in\mathbb{C}^{n\times n}:Z^*=-Z\},
\qquad
\mathfrak{su}(n)=\{Z\in\mathfrak{u}(n):\operatorname{tr}Z=0\}.
$$
The [determinant–exponential identity](https://spaces.ac.cn/archives/6377) gives $\det(e^{tZ})=e^{t\operatorname{tr}Z}$, so the determinant stays at $1$ for all $t$ exactly when $\operatorname{tr}Z=0$.

The exponential map also appears in quantum mechanics, with a factor of $i$ that converts a Hermitian observable into an anti-Hermitian generator. Let $H\in\mathbb{C}^{n\times n}$ be the time-independent Hermitian Hamiltonian and $\hbar>0$ the reduced Planck constant. At time $t\in\mathbb{R}$, the state ket $\lvert\psi(t)\rangle\in\mathbb{C}^n$ is a column vector, and $U_t\in U(n)$ is its time-evolution matrix. The Schrödinger equation and its solution are
$$
i\hbar\frac{d}{dt}\lvert\psi(t)\rangle
=H\lvert\psi(t)\rangle,
\qquad
\lvert\psi(t)\rangle=U_t\lvert\psi(0)\rangle,
\qquad
U_t=e^{-itH/\hbar}.
$$
The generator of $U_t$ is $-iH/\hbar\in\mathfrak{u}(n)$. For real time increments $t,s$, the evolution matrices are unitary and compose by adding the increments.
$$
U_t^*U_t=e^{itH/\hbar}e^{-itH/\hbar}=I_n,
\qquad
U_tU_s=U_{t+s}.
$$
Its determinant need not equal $1$:
$$
\det U_t=e^{-it\operatorname{tr}(H)/\hbar}.
$$
Imposing $\operatorname{tr}H=0$ makes the evolution special unitary for all $t$; at a particular time $t\ne0$, $\operatorname{tr}H\in(2\pi\hbar/t)\mathbb{Z}$ suffices. Thus real rotations use $e^{\theta J}$ with $J^T=-J$, whereas quantum evolution uses $e^{-itH/\hbar}$ with $H^*=H$.

In [bra-ket notation](https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/quantum-circuits/inner-products-and-projections), a ket $\lvert v\rangle\in\mathbb{C}^n$ is a column vector, and its bra $\langle v\rvert$ is the conjugate-transpose row vector. The encoded query and key are then
$$
\lvert q_{x}\rangle
=\mathcal{R}_{x}\lvert q\rangle,
\qquad
\lvert k_{y}\rangle
=\mathcal{R}_{y}\lvert k\rangle.
$$
The bra of an encoded query is obtained from its adjoint. For real vectors, the adjoint is the transpose, so
$$
\langle q_{x}\rvert
=\langle q\rvert\mathcal{R}_{x}^T
=\langle q\rvert\mathcal{R}_{-x},
$$
where orthogonality and the addition law give the last equality. The unnormalized attention score is therefore
$$
\langle q_{x}\mid k_{y}\rangle
=\langle q\rvert\mathcal{R}_{y-x}\lvert k\rangle.
$$
For a planar RoPE block with frequency $\omega$, the operator inside this overlap is $e^{(y-x)\omega K}$. The displacement multiplies the rotation generator $\omega K$ in the exponent, just as elapsed time multiplies the generator in $U_t$.
{% endcollapse %}

## Generalizing RoPE to vector positions

### Trying two quaternion phases

Write a two-dimensional position as $(\xi,\eta)\in\mathbb{R}^2$, with real coordinates $\xi$ and $\eta$. Let $\mathbf{i},\mathbf{j},\mathbf{k}$ be the imaginary basis units of the quaternions $\mathbb{H}$. The planar phase $e^{i\theta}$ suggests the unit-quaternion phase $\rho(\xi,\eta)=e^{\xi\mathbf{i}+\eta\mathbf{j}}\in\mathbb{H}$ considered in [Su's derivation of 2D RoPE](https://kexue.fm/archives/8397).

Left multiplication by this unit quaternion preserves length in the four real components, so it acts on the feature vector as an orthogonal $4\times4$ matrix. The question is whether these transformations compose according to position addition.

The steps $(\xi,0)$ and $(0,\eta)$ add to the same position in either order. For the quaternion encoding to preserve relative positions, both products would have to give $\rho(\xi,\eta)$. But $\mathbf{i}\mathbf{j}=\mathbf{k}$ and $\mathbf{j}\mathbf{i}=-\mathbf{k}$, so
$$
e^{\xi\mathbf{i}}e^{\eta\mathbf{j}}-e^{\eta\mathbf{j}}e^{\xi\mathbf{i}}
=2\sin\xi\sin\eta\,\mathbf{k}.
$$
For general $\xi$ and $\eta$, the order changes the result, so the encoding fails the relative-position law.

This also limits any smooth encoding that composes by multiplying unit quaternions. At the identity, its coordinate generators are pure imaginary because differentiating $\rho\overline{\rho}=1$ gives $a+\bar a=0$. For two pure imaginary quaternion generators $a,b\in\mathbb{H}$, the difference between the two orders is governed by $ab-ba=2a\times b$, where the cross product identifies $a$ and $b$ with their vectors in $\mathbb{R}^3$. The cross product vanishes only when the generators are linearly dependent. All the coordinate generators therefore lie along one imaginary axis, giving at most one independent direction.

### Axial RoPE

Four real features already give us room for two separate planar rotations. Let the scalar coordinate $\xi$ rotate the first pair of features and $\eta$ the second. This gives the [block-diagonal encoding matrix](https://www.cfm.brown.edu/people/dobrush/cs52/Mathematica/Part2/partition.html) $\mathcal{R}_{(\xi,\eta)}\in SO(4)$
$$
\mathcal{R}_{(\xi,\eta)}
=\operatorname{diag}\!\left(e^{\xi K},e^{\eta K}\right).
$$
A step in $\xi$ acts only on the first pair, and a step in $\eta$ acts only on the second, so their order makes no difference. Within each plane, angles add as in standard RoPE.

<figure class="rope-scene" data-rope-scene="rank">
  <figcaption>The cube shows order dependence through the 3D action of unit quaternions. The wheels assign the two position coordinates to disjoint feature planes.</figcaption>
</figure>

Axial RoPE assigns each feature pair to one position axis, with a frequency for that pair. Qwen2-VL's multimodal RoPE (M-RoPE) uses this idea for time, height, and width.[^1] Qwen3-VL interleaves the axis assignments across frequency bands, with each rotary pair still using one coordinate.[^2]

### Composing infinitesimal rotations

In the planar case, the infinitesimal rotation at the identity determined the whole family $R_\theta$. That is also how a fixed generator determines quantum time evolution. For a vector position, we have one such derivative for each coordinate. Can these derivatives determine an encoding that composes correctly even when several coordinates change at once?

Let $\mathsf{x}=(x_1,\ldots,x_p)\in\mathbb{R}^p$ be a position vector, with scalar coordinates $x_i\in\mathbb{R}$. Its encoding $\mathcal{R}_{\mathsf{x}}\in SO(n)$ acts on the $n$-dimensional feature vectors. Write $e_i\in\mathbb{R}^p$ for the $i$th coordinate basis vector, and take real step sizes $t$ and $h$. Differentiating $\mathcal{R}_{(t+h)e_i}=\mathcal{R}_{he_i}\mathcal{R}_{te_i}$ in $h$ at zero gives
$$
\frac{d}{dt}\mathcal{R}_{te_i}=J_i\mathcal{R}_{te_i},
\qquad
J_i=\left.\frac{d}{dt}\mathcal{R}_{te_i}\right|_{t=0}\in\mathfrak{so}(n).
$$
With $\mathcal{R}_{\mathsf{0}}=I_n$, this yields $\mathcal{R}_{te_i}=e^{tJ_i}$. The coordinate steps $te_i$ and $se_j$, with $t,s\in\mathbb{R}$, sum to the same displacement in either order. Their rotations therefore satisfy
$$
e^{tJ_i}e^{sJ_j}=e^{sJ_j}e^{tJ_i}.
$$
Differentiating once in $t$ and once in $s$ at $(0,0)$ gives $[J_i,J_j]=J_iJ_j-J_jJ_i=0$. This is the condition on the generators imposed by the composition law. Applying that law to $\mathsf{x}=\sum_i x_i e_i$ reconstructs the full encoding.
$$
\mathcal{R}_{\mathsf{x}}
=\prod_{i=1}^{p}e^{x_iJ_i}
=\exp\!\left(\sum_{i=1}^{p}x_iJ_i\right).
$$
Conversely, pairwise commuting skew-symmetric generators give an orthogonal encoding with the required composition law. For the matrix $A=\sum_i x_iJ_i\in\mathfrak{so}(n)$, skew-symmetry gives $(e^A)^Te^A=e^{-A}e^A=I_n$. Since any two such exponents commute, their exponentials compose by adding the exponents.

### How many independent directions can RoPE encode?

For a single position coordinate, the planar rotation blocks follow from the decomposition of one skew-symmetric generator, as shown in [Su's completeness analysis of RoPE](https://kexue.fm/archives/9403).

For vector positions, the condition $[J_i,J_j]=0$ forces all generators to share the same mutually orthogonal rotation planes. To see why, view the $J_i$ over $\mathbb{C}$. These matrices are normal and commute, so [simultaneous unitary diagonalization](https://home.iitk.ac.in/~rksr/html/06TRIA.htm) gives them a common orthonormal eigenbasis. Their eigenvalues are purely imaginary and, because the matrices are real, every nonzero tuple of joint eigenvalues pairs with its complex conjugate. Choose an orthonormal basis for one joint eigenspace of each pair and take its conjugate basis for the other. The real and imaginary parts of each such eigenvector span one real plane where every $J_i$ acts as a scalar multiple of $K$. The common zero eigenspace supplies the directions fixed by all the rotations.

Write $m=\lfloor n/2\rfloor$. Pair any spare fixed directions into planes with zero coefficients, leaving one fixed coordinate when $n$ is odd. Let $P\in O(n)$ be the orthogonal matrix whose columns give this basis, and let $\Omega=(\omega_{\ell i})\in\mathbb{R}^{m\times p}$ map the position vector to the vector of plane angles. Its entry $\omega_{\ell i}\in\mathbb{R}$ is the coefficient of $x_i$ in the scalar angle $\theta_\ell(\mathsf{x})\in\mathbb{R}$ of plane $\ell$. The encoding is
$$
\begin{aligned}
\theta_\ell(\mathsf{x})&=\sum_{i=1}^{p}\omega_{\ell i}x_i,
\qquad \ell=1,\ldots,m,\\
\mathcal{R}_{\mathsf{x}}
&=P\,\operatorname{diag}\!\left(
e^{\theta_1(\mathsf{x})K},\ldots,
e^{\theta_m(\mathsf{x})K},[1]
\right)P^T,
\end{aligned}
$$
where the final scalar block $[1]$ appears only when $n$ is odd.

A displacement vector $\mathsf{v}\in\mathbb{R}^p$ leaves the encoding unchanged along the entire line $\mathsf{x}+t\mathsf{v}$, $t\in\mathbb{R}$, exactly when $\Omega\mathsf{v}=0$. Thus the number of independent position directions is $\operatorname{rank}\Omega\le m$.

Assigning a separate plane to each of $m$ coordinates attains the bound. For axial RoPE, each row of $\Omega$ uses a single coordinate. The general form allows each plane to use a linear combination of the position coordinates in the shared rotation basis.

<link rel="stylesheet" href="{% asset_path animations.css %}">
<script defer src="{% asset_path animations.js %}"></script>

[^1]: Peng Wang et al. (2024). [Qwen2-VL: Enhancing Vision-Language Model's Perception of the World at Any Resolution](https://arxiv.org/html/2409.12191). arXiv preprint.
[^2]: Shuai Bai et al. (2025). [Qwen3-VL Technical Report](https://arxiv.org/html/2511.21631v1). arXiv preprint, §2.1.
