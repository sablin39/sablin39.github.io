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
cover: se3.png
---

In this blog post we proved that With $n$ features and $p$ position coordinates, nontrivial orthogonal RoPE supports between $1$ and $\min(p,\lfloor n/2\rfloor)$ independent position directions. After reviewing the relative-position law and matrix exponential, the post shows why quaternion rotations fail to compose, how axial RoPE restores commutativity, and why common rotation planes bound the Lie algebra rank by $\lfloor n/2\rfloor$.

<!-- more -->

## A quick review of RoPE and orthogonal matrices

### The relative-position law

Standard RoPE rotates each pair of query and key features through an angle $\omega x$. Here $x\in\mathbb{R}$ is the scalar position and $\omega\in\mathbb{R}$ is the frequency assigned to that pair. The full encoding matrix arranges these rotations in diagonal blocks, as in [苏剑林. (Mar. 23, 2021). 《Transformer升级之路：2、博采众长的旋转式位置编码 》](https://kexue.fm/archives/8265).

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

<figure class="rope-scene" data-rope-scene="relative-position">
  <figcaption>Move both positions together to see that the encoded dot product is invariant; change their displacement to see it vary.</figcaption>
</figure>

The Lie algebra describes the infinitesimal rotations at the identity. Let $Q(t)\in SO(n)$ be a smooth matrix curve with real parameter $t$ and $Q(0)=I_n$. Its derivative at the identity is the matrix $J=Q'(0)\in\mathbb{R}^{n\times n}$. Differentiating orthogonality at zero gives
$$
Q(t)^TQ(t)=I_n
\quad\Longrightarrow\quad
J^T+J=0.
$$
The real skew-symmetric matrices form $\mathfrak{so}(n)$, the [Lie algebra of the rotation group](https://arxiv.org/pdf/math-ph/0005032#page=43). A curve in $O(n)$ through $I_n$ also stays in $SO(n)$ near $I_n$, so the two groups have the same Lie algebra. In the plane, every skew-symmetric matrix is a scalar multiple of one generator.

### The exponential map in the plane

For a square matrix $A$, the [matrix exponential](https://nhigham.com/2020/05/28/what-is-the-matrix-exponential/) is defined by the power series
$$
e^A=I+A+\frac{A^2}{2!}+\frac{A^3}{3!}+\cdots.
$$
Term-by-term transposition gives $(e^A)^T=e^{A^T}$. When $[A,B]=AB-BA=0$, multiplying the series gives $e^{A+B}=e^Ae^B$. Taking the product of the exponentials of the eigenvalues gives $\det e^A=e^{\operatorname{tr}A}$. These identities supply all the matrix-function rules used below.

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
Since $K^2=-I_2$, the even and odd terms in the matrix exponential series give $e^{\theta K}=(\cos\theta)I_2+(\sin\theta)K$. Identifying a planar vector with a complex scalar $z\in\mathbb{C}$ makes $K$ act as multiplication by $i$, so the same rotation is $z\mapsto e^{i\theta}z=(\cos\theta+i\sin\theta)z$.

A planar RoPE block with frequency $\omega$ uses $\theta=\omega x$, so its encoding at position $x$ is $e^{x(\omega K)}$.

<figure class="rope-scene" data-rope-scene="algebra">
  <figcaption>The point on the axis stays fixed. Follow the two off-axis arrows as the turn increment shrinks to zero.</figcaption>
</figure>

{% collapse "Optional: the same exponential structure in quantum evolution" %}
This optional section is included for interest rather than as a prerequisite for the RoPE proof. Its central analogy is that a position displacement multiplies a rotation generator, just as elapsed time multiplies a quantum-evolution generator. The matrix exponential identities above are sufficient for the calculations here; the physical notation is only needed to interpret the analogy.

For a complex matrix $W\in\mathbb{C}^{n\times n}$, the adjoint $W^*$ is its conjugate transpose.
$$
SU(n)\subset U(n), \\

U(n)=\{W\in\mathbb{C}^{n\times n}:W^*W=I_n\}, \\

SU(n)=\{W\in U(n):\det W=1\}.
$$
The generator $Z\in\mathbb{C}^{n\times n}$ is anti-Hermitian. For special unitary generators, the trace $\operatorname{tr}Z$, the sum of the diagonal entries, also vanishes.
$$
\mathfrak{u}(n)=\{Z\in\mathbb{C}^{n\times n}:Z^*=-Z\}, \\

\mathfrak{su}(n)=\{Z\in\mathfrak{u}(n):\operatorname{tr}Z=0\}.
$$
The [苏剑林. (Feb. 18, 2019). 《恒等式 det(exp(A)) = exp(Tr(A)) 赏析 》](https://spaces.ac.cn/archives/6377) gives $\det(e^{tZ})=e^{t\operatorname{tr}Z}$, so the determinant stays at $1$ for all $t$ exactly when $\operatorname{tr}Z=0$.

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
U_t^*U_t=e^{itH/\hbar}e^{-itH/\hbar}=I_n, \\

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

### Why a direct quaternion generalization fails

Write a two-dimensional position as $(\xi,\eta)\in\mathbb{R}^2$, with real coordinates $\xi$ and $\eta$. Let $\mathbf{i},\mathbf{j},\mathbf{k}$ be the imaginary basis units of the quaternions $\mathbb{H}$. The planar unit complex number $e^{i\theta}$ suggests the unit quaternion $\rho(\xi,\eta)=e^{\xi\mathbf{i}+\eta\mathbf{j}}\in\mathbb{H}$ considered in [苏剑林. (May. 10, 2021). 《Transformer升级之路：4、二维位置的旋转式位置编码 》](https://kexue.fm/archives/8397).

For a pure imaginary quaternion $v$, the quaternion exponential is
$$
e^v=\cos|v|+\frac{v}{|v|}\sin|v|,
$$
with $e^0=1$. For pure imaginary quaternions $a,b$, multiplication splits into scalar and vector parts:
$$
ab=-a\cdot b+a\times b.
$$
In particular, $ab-ba=2a\times b$. These formulas make the composition calculation below explicit rather than an appeal to a special quaternion identity.

Left multiplication by this unit quaternion preserves length in the four real components, so it acts on the feature vector as an orthogonal $4\times4$ matrix. The question is whether these transformations compose according to position addition.

The steps $(\xi,0)$ and $(0,\eta)$ add to the same position in either order. For the quaternion encoding to preserve relative positions, both products would have to give $\rho(\xi,\eta)$. But $\mathbf{i}\mathbf{j}=\mathbf{k}$ and $\mathbf{j}\mathbf{i}=-\mathbf{k}$, so expanding the exponentials gives
$$
\begin{aligned}
e^{\xi\mathbf{i}}e^{\eta\mathbf{j}}
&=(\cos\xi+\mathbf i\sin\xi)(\cos\eta+\mathbf j\sin\eta)\\
&=\cos\xi\cos\eta+\mathbf i\sin\xi\cos\eta
+\mathbf j\cos\xi\sin\eta+\mathbf k\sin\xi\sin\eta,\\
e^{\eta\mathbf{j}}e^{\xi\mathbf{i}}
&=\cos\xi\cos\eta+\mathbf i\sin\xi\cos\eta
+\mathbf j\cos\xi\sin\eta-\mathbf k\sin\xi\sin\eta.
\end{aligned}
$$
Subtracting them yields
$$
e^{\xi\mathbf{i}}e^{\eta\mathbf{j}}-e^{\eta\mathbf{j}}e^{\xi\mathbf{i}}
=2\sin\xi\sin\eta\,\mathbf{k}.
$$
For general $\xi$ and $\eta$, the order changes the result, so the encoding fails the relative-position law.

<figure class="rope-scene" data-rope-scene="quaternion-failure">
  <figcaption>Compare the two quaternion products component by component. Their difference is nonzero only in the $\mathbf{k}$ direction and equals $2\sin\xi\sin\eta$.</figcaption>
</figure>

The same limitation applies to any smooth encoding that uses multiplication of unit quaternions to satisfy the relative-position law. At the identity, its coordinate generators are pure imaginary because differentiating $\rho\overline{\rho}=1$ gives $a+\bar a=0$. For two pure imaginary quaternion generators $a,b\in\mathbb{H}$, the infinitesimal difference between the two composition orders is governed by $ab-ba=2a\times b$, where the cross product identifies $a$ and $b$ with their vectors in $\mathbb{R}^3$. The cross product vanishes only when the generators are linearly dependent. All the coordinate generators therefore lie along one imaginary axis, giving at most one independent direction.

### Axial RoPE

The quaternion construction fails because rotations associated with independent position coordinates do not compose consistently. We therefore need coordinate rotations that commute. The simplest repair assigns each coordinate to its own feature plane, which is exactly the coordinate-aligned construction used by axial RoPE.

Let $\xi$ rotate the first pair of real features and $\eta$ rotate the second. Each planar rotation belongs to $SO(2)$, so the precise group inclusion is
$$
\mathcal{R}_{(\xi,\eta)}
=\operatorname{diag}\!\left(e^{\xi K},e^{\eta K}\right)
\in SO(2)\times SO(2)\subset SO(4).
$$
Thus $\mathcal R_{(\xi,\eta)}$ is a rotation in $SO(4)$, but it is not an arbitrary four-dimensional rotation: it uses only two independent planar rotations. This forms a two-dimensional subgroup of the six-dimensional group $SO(4)$. See [maximal torus](https://en.wikipedia.org/wiki/Maximal_torus) for the general group-theoretic description of this subgroup.

The distinction becomes explicit by writing the coordinate generators, which are infinitesimal rotations rather than the position-dependent rotation itself:
$$
J_\xi=
\begin{pmatrix}
K&0\\
0&0
\end{pmatrix},
\qquad
J_\eta=
\begin{pmatrix}
0&0\\
0&K
\end{pmatrix},
\qquad
J_\xi,J_\eta\in\mathfrak{so}(4).
$$
Here $\mathfrak{so}(4)$ is the Lie algebra of real skew-symmetric matrices, whereas $SO(4)$ is the group of determinant-one orthogonal matrices. Exponentiating an infinitesimal generator produces an actual rotation:
$$
\mathcal R_{(\xi,\eta)}
=e^{\xi J_\xi+\eta J_\eta}
=e^{\xi J_\xi}e^{\eta J_\eta}
=e^{\eta J_\eta}e^{\xi J_\xi}
\in SO(2)\times SO(2).
$$
For a matrix Lie algebra, the [Lie bracket](https://en.wikipedia.org/wiki/Lie_bracket_of_vector_fields) is the matrix commutator $[A,B]=AB-BA$. Here $A$ and $B$ are skew-symmetric infinitesimal generators. Since $J_\xi$ and $J_\eta$ act on disjoint feature planes, each product vanishes blockwise:
$$
[J_\xi,J_\eta]
=J_\xi J_\eta-J_\eta J_\xi
=0-0=0.
$$
It is this vanishing commutator that lets the exponentials compose in either order, not orthogonality alone.

<figure class="rope-scene" data-rope-scene="angle-map">
  <figcaption>Switch between independent axial angles and a shared generator. Move along $\ker\Omega$ to see that a position vector can change while the encoding stays fixed.</figcaption>
</figure>

Axial RoPE assigns each feature pair to one position axis, with a frequency for that pair. Qwen2-VL's multimodal RoPE (M-RoPE) uses this idea for time, height, and width.[^1] Qwen3-VL interleaves the axis assignments across frequency bands, with each rotary pair still using one coordinate.[^2] Cosmos 3 likewise divides the rotary channels of each attention head among temporal, height, and width coordinates. [^3]

This coordinate-aligned construction is only one way to satisfy the commuting-generator condition. The next step is to isolate that condition and derive the general encoding without requiring the feature planes to align with coordinate axes.

### Composing infinitesimal rotations

In the planar case, the infinitesimal rotation at the identity determined the whole family $R_\theta$. A fixed generator also determines quantum time evolution, as noted in the optional section above. For a vector position, we have one such derivative for each coordinate. Can these derivatives determine an encoding that composes correctly even when several coordinates change at once?

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
Differentiating once in $t$ and once in $s$ at $(0,0)$ gives $J_iJ_j$; differentiating in the opposite order gives $J_jJ_i$. Equality therefore requires $[J_i,J_j]=J_iJ_j-J_jJ_i=0$. This is the condition on the generators imposed by the composition law. Since $\mathsf{x}=\sum_i x_i e_i$, the same law reconstructs the full encoding:
$$
\mathcal R_{\mathsf x}
=\prod_{i=1}^{p}\mathcal R_{x_ie_i}
=\prod_{i=1}^{p}e^{x_iJ_i}
=\exp\!\left(\sum_{i=1}^{p}x_iJ_i\right).
$$
Conversely, pairwise commuting skew-symmetric generators give an orthogonal encoding with the required composition law. For the matrix $A=\sum_i x_iJ_i\in\mathfrak{so}(n)$, skew-symmetry and $(e^A)^T=e^{A^T}$ give $(e^A)^Te^A=e^{A^T}e^A=e^{-A}e^A=I_n$. Since any two such exponents commute, their exponentials compose by adding the exponents.

The geometric statement is that $(\mathbb R^p,+)$ is abelian, so the image of $\mathcal R$ must also be abelian. The coordinate generators therefore commute, and the whole encoding lies in a common commuting family of rotations. The next step is to identify that family's shared rotation planes.

### From coordinate generators to a commuting subalgebra

The relative-position law constrains not only each individual $J_i$, but every infinitesimal rotation available through the encoding. Collect all real linear combinations of the coordinate generators into
$$
\mathfrak h=\operatorname{span}_{\mathbb R}\{J_1,\ldots,J_p\}
=\left\{\sum_{i=1}^{p}a_iJ_i\;\middle|\;a_1,\ldots,a_p\in\mathbb R\right\}
\subseteq\mathfrak{so}(n).
$$
Every nonzero $A\in\mathfrak h$ describes an allowed direction of infinitesimal rotation. Because every pair of coordinate generators commutes, $\mathfrak h$ is an **[abelian](https://en.wikipedia.org/wiki/Abelian_group) subalgebra**: its bracket vanishes identically. It need not contain all infinitesimal rotations available in $\mathfrak{so}(n)$; it contains only those spanned by the position coordinates.

If some coordinate generators are linearly dependent, their number $p$ need not equal $\dim\mathfrak h$. For example, $J_2=2J_1$ would let two coordinates select different frequencies along the same rotation direction without adding another independent direction to $\mathfrak h$.

### Common planes for commuting generators

Let $\mathfrak a\subseteq\mathfrak{so}(n)$ be any abelian subalgebra of infinitesimal rotations. Every $A\in\mathfrak a$ is normal because $A^T=-A$. The [spectral theorem for normal matrices](https://ocw.mit.edu/courses/18-700-linear-algebra-fall-2013/resources/mit18_700f13_spctrl_thrm/) supplies a unitary eigenbasis for each individual matrix; the [commuting-matrix extension](https://en.wikipedia.org/wiki/Diagonalizable_matrix#Simultaneous_diagonalization) supplies a common orthonormal eigenbasis for the whole abelian subspace. To see the basic mechanism behind the extension, if $Av=\lambda v$, then for another $B\in\mathfrak a$,
$$
A(Bv)=B(Av)=\lambda(Bv),
$$
so $B$ preserves each eigenspace of $A$. The restriction to such a subspace is still a commuting normal family, so induction on the dimension gives a common orthonormal eigenbasis.

Write the eigenvalues of $A$ as $\lambda_j(A)$. Since $A$ is real and skew-symmetric, its eigenvalues are purely imaginary and occur in conjugate pairs. The abelian subspace $\mathfrak a$ is also closed under complex conjugation, so its joint eigenspaces can be grouped into conjugate pairs. Order the common orthonormal eigenspaces into these pairs, using the common kernel for any remaining directions. With $m=\lfloor n/2\rfloor$, every $A\in\mathfrak a$ then has the form
$$
U^*AU=
\operatorname{diag}\!\left(
i\theta_1(A),-i\theta_1(A),\ldots,
i\theta_m(A),-i\theta_m(A),[0]
\right),
$$
where the final scalar block appears only when $n$ is odd, and each $\theta_\ell(A)$ is real.

This gives an immediate upper bound on the dimension of $\mathfrak a$. Define
$$
\Phi:\mathfrak a\longrightarrow\mathbb R^m,
\qquad
\Phi(A)=
\begin{pmatrix}
\theta_1(A)&\cdots&\theta_m(A)
\end{pmatrix}^{T}.
$$
The map $\Phi$ is linear because eigenvalues on a common eigenspace add under matrix addition, and it is injective because $\Phi(A)=0$ implies $U^*AU=0$, hence $A=0$. Therefore,
$$
\dim\mathfrak a\le m.
$$

The same eigenvectors also supply the real rotation planes. Choose a unit eigenvector $z=u+iv$ and its conjugate $\bar z=u-iv$ from the common orthonormal basis. Their orthogonality gives
$$
0=z^*\bar z
=u^Tu-v^Tv+2iu^Tv,
$$
so $u^Tv=0$ and $\|u\|=\|v\|$. Since $\|z\|=1$, each of $u$ and $v$ has norm $1/\sqrt2$. Normalize them separately to obtain unit vectors $\hat u=\sqrt2\,u$ and $\hat v=\sqrt2\,v$, which are orthonormal. If $z$ satisfies $Az=i\theta z$, separating real and imaginary parts gives
$$
Au=-\theta v,\qquad Av=\theta u.
$$
Thus, in the ordered orthonormal basis $(\hat u,\hat v)$, $A$ acts as $\theta K$ on that plane. Applying this to every conjugate pair gives an orthogonal matrix $P$ and real linear functionals $\theta_\ell:\mathfrak a\to\mathbb R$ such that
$$
A=P\,\operatorname{diag}\!\left(
\theta_1(A)K,\ldots,\theta_m(A)K,[0]
\right)P^T
\qquad\text{for every }A\in\mathfrak a.
$$
We call this result the **common-plane decomposition**. The supporting spectral and simultaneous-diagonalization results are linked above; the conversion from complex conjugate eigenspaces to real rotation planes is shown directly.

<figure class="rope-scene" data-rope-scene="common-plane">
  <figcaption>Compare $A(\theta)$ with $P^TA(\theta)P$ for varying $\theta$. The basis stays fixed while the off-diagonal blocks remain zero.</figcaption>
</figure>

### Lie algebra rank from the common-plane decomposition

The standard coordinate-aligned family already realizes $m$ independent planes:
$$
\mathfrak h_{\mathrm{std}}
=
\left\{
\operatorname{diag}(a_1K,\ldots,a_mK,[0])
:a_1,\ldots,a_m\in\mathbb R
\right\}.
$$
Its members commute, and its dimension is $m$. Since every abelian subspace has dimension at most $m$, no abelian subspace properly contains $\mathfrak h_{\mathrm{std}}$. It is therefore a maximal abelian subalgebra of $\mathfrak{so}(n)$.

For the compact Lie algebra $\mathfrak{so}(n)$, such a maximal abelian subalgebra of infinitesimal rotations is a [Cartan subalgebra](https://math.mit.edu/~etingof/lnlg.pdf#page=80), and its dimension is the **rank of the Lie algebra**. Hence
$$
\boxed{\operatorname{rank}\mathfrak{so}(n)
=m=\left\lfloor\frac n2\right\rfloor.}
$$
This rank counts the maximum number of independent infinitesimal rotation planes available to a commuting encoding. It is neither the dimension of $\mathfrak{so}(n)$ nor the matrix rank of any individual generator. In particular, $\mathfrak{so}(3)$ has rank one, while $\mathfrak{so}(4)$ has rank two.

<figure class="rope-scene" data-rope-scene="feature-slots">
  <figcaption>Assign independent position directions to the available feature planes. Once every plane is occupied, another direction must share an existing angle.</figcaption>
</figure>

### The position-angle map and its rank

For a single position coordinate, the planar rotation blocks follow from the decomposition of one skew-symmetric generator, as shown in [苏剑林. (Dec. 28, 2022). 《Transformer升级之路：6、旋转位置编码的完备性分析 》](https://kexue.fm/archives/9403).

Apply the common-plane decomposition to the subalgebra generated by the coordinate derivatives,
$$
\mathfrak h=\operatorname{span}_{\mathbb R}\{J_1,\ldots,J_p\}.
$$
Each coefficient functional $\theta_\ell$ is determined by its values on the coordinate generators. Define $\omega_{\ell i}=\theta_\ell(J_i)$ and let
$$
\Omega=(\omega_{\ell i})\in\mathbb R^{m\times p}.
$$
For $\mathsf x=(x_1,\ldots,x_p)$, the combined generator is $A_{\mathsf x}=\sum_i x_iJ_i$, so the angle in plane $\ell$ is
$$
\theta_\ell(A_{\mathsf x})
=\sum_{i=1}^{p}\omega_{\ell i}x_i.
$$
The encoding therefore takes the block-rotation form
$$
\mathcal R_{\mathsf x}
=P\,\operatorname{diag}\!\left(
e^{\theta_1(A_{\mathsf x})K},\ldots,
e^{\theta_m(A_{\mathsf x})K},[1]
\right)P^T,
$$
where the final scalar block $[1]$ appears only when $n$ is odd.

A displacement $\mathsf v\in\mathbb R^p$ leaves every rotation angle unchanged exactly when $\Omega\mathsf v=0$. Consequently, the number of independent position directions is $\operatorname{rank}\Omega$. Since $\Omega\in\mathbb R^{m\times p}$,
$$
0\le\operatorname{rank}\Omega\le\min(p,m).
$$
The lower endpoint $\operatorname{rank}\Omega=0$ means that every rotation angle vanishes, so the encoding is the identity matrix at every position and carries no positional information. Excluding that degenerate case gives
$$
\boxed{1\le\operatorname{rank}\Omega
\le\min\!\left(p,\left\lfloor\frac n2\right\rfloor\right).}
$$
The lower bound agrees with Su's one-dimensional construction: if $J\ne0$, then $J$ has a nonzero conjugate eigenvalue pair $\pm i\omega$, so at least one real plane undergoes a nontrivial rotation. The upper bound requires the commuting-family argument above. Assigning an independent coordinate to each plane, as axial RoPE does, gives $\operatorname{rank}\Omega=m$ when $p\ge m$ and attains the feature-space bound.

The columns of $\Omega$ are $\Phi(J_i)$, so $\Omega\mathsf x=\Phi(A_{\mathsf x})$ and
$$
\operatorname{rank}\Omega
=\dim\Phi(\mathfrak h)
=\dim\mathfrak h,
$$
because $\Phi$ is injective on $\mathfrak h$. This equality does not imply that every available plane receives an independent position direction. Different coordinate generators may control several planes through the same position-angle direction, so $\operatorname{rank}\Omega$ can be smaller than the number $m$ of available commuting planes even though $\operatorname{rank}\Omega=\dim\mathfrak h$.

For example, take $J=\operatorname{diag}(K,K)$ in four feature dimensions. The two planes share the same generator and therefore the same position-angle direction. Here $m=2$, while $\mathfrak h=\operatorname{span}\{J\}$ and $\operatorname{rank}\Omega=1$. The dimension of the available commuting-plane family exceeds the number of independent position directions, without contradicting the equality $\operatorname{rank}\Omega=\dim\mathfrak h$.

For axial RoPE, each row of $\Omega$ uses a single coordinate. The general form allows each plane to use a linear combination of the position coordinates in the shared rotation basis.

<link rel="stylesheet" href="{% asset_path animations.css %}">
<script type="module" src="{% asset_path animations.js %}"></script>

[^1]: Peng Wang et al. (2024). [Qwen2-VL: Enhancing Vision-Language Model's Perception of the World at Any Resolution](https://arxiv.org/html/2409.12191). arXiv preprint.
[^2]: Shuai Bai et al. (2025). [Qwen3-VL Technical Report](https://arxiv.org/html/2511.21631v1). arXiv preprint, §2.1.
[^3]: NVIDIA (2026). Interactive World Simulation with Cosmos for Physical AI, §2.1, Multimodal positional embedding. <https://research.nvidia.com/labs/cosmos-lab/cosmos-simulation/technical-report.pdf>
