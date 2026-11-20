---
title: 'Orthogonal Matrix can Work as up to $\lfloor n/2 \rfloor$ Generalized RoPE'
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

In this post we will prove that an orthogonal matrix can work as a "Generalized RoPE" of at least 1D and up to $\lfloor n/2 \rfloor$ dimensions. We will first revisit the basic properties of RoPE and the failure of deriving 2D RoPE from quaternion and explain beyond the "non-commutative" statement. We then construct the higher-dimensional form and recover standard axial RoPE as a special case. Readers are only required to have basic knowledge about Lie Group and Lie Algebra from 《视觉SLAM十四讲(第二版)》Chapter 4. 

<!-- more -->

## A Quick Review of RoPE, Orthogonal Matrix, Lie Group and Lie Algebra

Consider positions $\mathsf{x},\mathsf{y}\in\mathbb{R}^p$, where $p=1$ recovers scalar positions, and query and key vectors $q,k\in\mathbb{R}^n$. RoPE encodes them as $\mathcal{R}_{\mathsf{x}}q$ and $\mathcal{R}_{\mathsf{y}}k$, respectively, where $\mathcal{R}_{\mathsf{x}}\in\mathbb{R}^{n\times n}$. The encoding should make attention depend on the relative position while preserving vector lengths. We separate the position-addition structure RoPE needs from the orthogonality available for its rotation matrices:
$$
\underbrace{
\left\{
\begin{aligned}
\mathcal{R}_{\mathsf{x}}^{T}\mathcal{R}_{\mathsf{y}}
    &=\mathcal{R}_{\mathsf{y}-\mathsf{x}},
    &&\text{relative position},\\
\mathcal{R}_{\mathsf{0}}&=I,
    &&\text{identity},\\
\mathcal{R}_{\mathsf{x}}\mathcal{R}_{\mathsf{y}}
    &=\mathcal{R}_{\mathsf{x}+\mathsf{y}}
     =\mathcal{R}_{\mathsf{y}}\mathcal{R}_{\mathsf{x}},
    &&\text{closure and commutativity},
\end{aligned}
\right.
}_{\text{additive position structure required by RoPE}}
\qquad
\underbrace{
\left\{
\begin{aligned}
\mathcal{R}_{\mathsf{x}}^{T}\mathcal{R}_{\mathsf{x}}&=I,
    &&\text{orthogonality},\\
\mathcal{R}_{\mathsf{x}}^{-1}&=\mathcal{R}_{\mathsf{x}}^{T},
    &&\text{inverse},\\
\|\mathcal{R}_{\mathsf{x}}v\|_2&=\|v\|_2,
    &&\text{length preservation}
\end{aligned}
\right.
}_{\text{provided by orthogonal transformations}}
$$

The relative-position requirement follows from these properties:
$$
\mathcal{R}_{\mathsf{x}}^{T}\mathcal{R}_{\mathsf{y}}
=\mathcal{R}_{-\mathsf{x}}\mathcal{R}_{\mathsf{y}}
=\mathcal{R}_{\mathsf{y}-\mathsf{x}}.
$$
Consequently, the attention score depends only on the displacement $\mathsf{y}-\mathsf{x}$:
$$
(\mathcal{R}_{\mathsf{x}}q)^{T}(\mathcal{R}_{\mathsf{y}}k)
=q^{T}\mathcal{R}_{\mathsf{x}}^{T}\mathcal{R}_{\mathsf{y}}k
=q^{T}\mathcal{R}_{\mathsf{y}-\mathsf{x}}k.
$$
Vector positions do not change these equations: $\mathsf{x}+\mathsf{y}$ and $\mathsf{y}-\mathsf{x}$ are now vector operations in $\mathbb{R}^p$. What changes is the map from a position to a matrix. For ordinary planar RoPE, $p=1$ and $\mathcal{R}_{\mathsf{x}}=e^{\mathsf{x}J}$, where $J$ is a fixed planar-rotation generator. For multidimensional RoPE, $\mathcal{R}_{\mathsf{x}}$ must combine rotations associated with the different position coordinates while preserving the additive law.

### Generators and the exponential map

Start with an arbitrary complex number $z=u+iv$, rather than a special coordinate point. The key calculus observation is that multiplication by $i$ is perpendicular to $z$:
$$
iz=i(u+iv)=-v+iu,
\qquad
\langle z,iz\rangle
=\operatorname{Re}(\overline{z}\,iz)
=\operatorname{Re}(i|z|^2)=0.
$$
If $z$ moves along a circle centered at the origin, $iz$ is precisely its instantaneous direction of motion. This suggests viewing $i$ not as a matrix entry pattern, but as the **generator of a flow**:
$$
\frac{dz(\theta)}{d\theta}=i\,z(\theta),
\qquad z(0)=z_0
\quad\Longrightarrow\quad
z(\theta)=e^{i\theta}z_0.
$$
The differential equation contains the local generator $i$; its solution contains the finite motion $e^{i\theta}$. Writing $z_0=u_0+iv_0$, Euler's formula gives
$$
z(\theta)
=(\cos\theta+i\sin\theta)(u_0+iv_0)
=(u_0\cos\theta-v_0\sin\theta)
+i(u_0\sin\theta+v_0\cos\theta).
$$
This is exactly the RoPE picture: the phase $e^{i\theta}$ is a point on the unit circle, but $z_0\mapsto e^{i\theta}z_0$ is an **action** on a query or key vector.

To express the same action on real coordinates, identify $z=u+iv$ with the vector $ue_u+ve_v$. Multiplication by $i$ becomes the linear operator $K$ defined by
$$
z=u+iv\longleftrightarrow ue_u+ve_v,
\qquad
K(ue_u+ve_v)=-ve_u+ue_v.
$$
In basis notation,
$$
K=e_u\otimes e_v^T-e_v\otimes e_u^T,
\qquad
Ke_u=e_v,\qquad Ke_v=-e_u.
$$
Thus $K$ is simply the real version of multiplication by $i$: it takes the $v$-component into the $u$-direction with a minus sign, and the $u$-component into the $v$-direction. Moreover,
$$
K^T=-K,\qquad K^2=-I,
$$
so $K$ has the same algebraic rule as $i^2=-1$. The real flow corresponding to $z'=iz$ is therefore
$$
\frac{d\mathcal{R}_{\theta}}{d\theta}
=K\mathcal{R}_{\theta},
\qquad
\mathcal{R}_0=I
\quad\Longrightarrow\quad
\mathcal{R}_{\theta}=e^{\theta K}.
$$
Expanding the exponential gives the matrix form of Euler's formula:
$$
\begin{aligned}
e^{\theta K}
&=I+\theta K+\frac{\theta^2K^2}{2!}+\frac{\theta^3K^3}{3!}+\cdots\\
&=\left(1-\frac{\theta^2}{2!}+\cdots\right)I
 +\left(\theta-\frac{\theta^3}{3!}+\cdots\right)K\\
&=(\cos\theta)I+(\sin\theta)K.
\end{aligned}
$$
Applying this operator to $u_0e_u+v_0e_v$ recovers the real and imaginary parts of $e^{i\theta}z_0$ exactly. Differentiating at the identity recovers the generator, and the exponential supplies the additive law required by scalar-position RoPE:
$$
\left.\frac{d}{d\theta}e^{\theta K}\right|_{\theta=0}=K,
\qquad
e^{\theta K}e^{\phi K}=e^{(\theta+\phi)K}.
$$

Why must the higher-dimensional generator be an $n\times n$ matrix rather than an $n$-dimensional vector? Because the scalar $\theta$ controls a **parameter** of the transformation, not the number of entries in the object being transformed. A rotation must act linearly on every $q,k\in\mathbb{R}^n$, so its matrix belongs to $\mathbb{R}^{n\times n}$. The generator describes how that matrix changes infinitesimally:
$$
\mathcal{R}_{\theta}=I+\theta J+O(\theta^2)
\quad\Longrightarrow\quad
J\in\mathbb{R}^{n\times n},
\qquad
\mathcal{R}_{\theta}v=v+\theta Jv+O(\theta^2).
$$
An $n$-dimensional vector can specify an initial state or an axis in $\mathbb{R}^3$, but it cannot, by itself, specify the linear transformation applied to every other vector.

Matrix form also makes composition possible: $J_iJ_j$ represents applying one infinitesimal transformation after another. The commutator $[J_i,J_j]=J_iJ_j-J_jJ_i$ measures whether the two orders differ; no analogous multiplication is built into ordinary vectors in $\mathbb{R}^n$.

There is a separate counting argument. For $i<j$, define the generator of the coordinate plane $(i,j)$ by
$$
J_{ij}=\begin{cases}
-1,&\text{entry }(i,j),\\
+1,&\text{entry }(j,i),\\
0,&\text{otherwise}.
\end{cases}
$$
The opposite signs in the transposed entries make $J_{ij}^T=-J_{ij}$, so each matrix generates rotation in one coordinate plane. These planes account for every independent infinitesimal rotation. Hence
$$
\dim\mathfrak{so}(n)=\binom{n}{2}=\frac{n(n-1)}{2},
$$
which generally exceeds $n$. A single $n$-dimensional vector cannot hold all these independent rotational directions. For example, $\mathfrak{so}(3)$ happens to be three-dimensional, which permits an axis-vector parametrization, but $\mathfrak{so}(4)$ is six-dimensional.

This construction extends to other matrix Lie groups: smooth groups whose multiplication and inversion are smooth. The associated **Lie algebra** $\mathfrak{g}$ collects the possible generators, obtained by differentiating group curves $\gamma(t)$ at $\gamma(0)=I$:
$$
X=\dot\gamma(0)\in\mathfrak{g},
\qquad
\exp:\mathfrak{g}\to G,\qquad X\mapsto e^X.
$$

For real RoPE, the entire relationship can be summarized by
$$
\operatorname{im}\mathcal R\subset SO(n)\subset O(n).
$$
The orthogonal group $O(n)$ consists of matrices satisfying $R^TR=I$, which already gives the length preservation we need. The determinant then selects the rotation subgroup $SO(n)$, while the additive position law selects the RoPE family inside it. Orthogonality implies
$$
1=\det(R^TR)=(\det R)^2
\quad\Longrightarrow\quad
\det R=\pm1.
$$
Thus $O(n)$ contains both rotations ($\det R=1$) and reflections ($\det R=-1$). Selecting $\det R=1$ gives $SO(n)$. In particular, our planar generator satisfies $K^2=-I$. Therefore
$$
0=\det(-K^2)=\det(-I_2)\det(K^2)=(\det K)^2,
$$
and $K$ is invertible because $K(-K)=I$. Since $\det K$ is real and nonzero, $\det K=1$. Hence $K$ is a quarter-turn, not a reflection. The determinant alone, however, does not imply orthogonality: $\det R=1$ describes the larger group $SL(n,\mathbb{R})$, which also contains non-orthogonal matrices.

To find the generators, differentiate a curve $\gamma(t)$ in $O(n)$ with $\gamma(0)=I$:
$$
\gamma(t)^T\gamma(t)=I
\quad\Longrightarrow\quad
X^T+X=0
\quad\text{at }t=0.
$$
Therefore
$$
\mathfrak{so}(n)=\{X\in\mathbb{R}^{n\times n}:X^T=-X\}.
$$
Since $SO(n)$ merely selects the component of $O(n)$ containing $I$, it has the same Lie algebra. Conversely, a skew-symmetric $X$ produces
$$
(e^X)^Te^X=e^{X^T}e^X=e^{-X}e^X=I,
\qquad
\det e^X=e^{\operatorname{tr}X}=1.
$$
Hence exponentials generate rotations, never reflections. For RoPE, this is exactly the required bridge: skew-symmetric generators live in $\mathfrak{so}(n)$, their exponentials live in $SO(n)$, and the position-addition law chooses a commutative family within that rotation group.

### Returning to vector-position RoPE

We now seek a smooth map $\mathcal{R}:\mathbb{R}^p\to SO(n)$ that turns vector addition into matrix multiplication:
$$
\mathcal{R}_{\mathsf{x}}\mathcal{R}_{\mathsf{y}}
=\mathcal{R}_{\mathsf{x}+\mathsf{y}},
\qquad
\mathcal{R}_{\mathsf{0}}=I.
$$
This is a group homomorphism from the additive position group $(\mathbb{R}^p,+)$ to $SO(n)$; it need not be injective because rotations are periodic. Its image is commutative even though $SO(n)$ itself is generally noncommutative for $n\geq3$.

Introduce one generator for each position coordinate:
$$
J_i=\left.\frac{\partial\mathcal{R}_{\mathsf{x}}}{\partial x_i}\right|_{\mathsf{x}=\mathsf{0}}
\in\mathfrak{so}(n),
\qquad i=1,\ldots,p.
$$
Since $\mathcal{R}_{\mathsf{x}}^{-1}=\mathcal{R}_{-\mathsf{x}}=\mathcal{R}_{\mathsf{x}}^T$, orthogonality also guarantees the relative-position form. Differentiating
$$
\mathcal{R}_{\mathsf{x}+t\mathsf{y}}
=\mathcal{R}_{\mathsf{x}}\mathcal{R}_{t\mathsf{y}}
$$
at $t=0$ and multiplying on the left by $\mathcal{R}_{\mathsf{x}}^T$ gives
$$
\mathcal{R}_{\mathsf{x}}^T\frac{d}{dt}\mathcal{R}_{\mathsf{x}+t\mathsf{y}}
=\sum_{i=1}^{p}y_iJ_i.
$$
Commuting the position order therefore requires $[J_i,J_j]=J_iJ_j-J_jJ_i=0$. The generators are simultaneously orthogonally block-diagonalizable into $2\times2$ rotation blocks, possibly with a $1\times1$ zero block. Writing $\theta_k(\mathsf{x})=\sum_i x_i\omega_{ki}$, we obtain
$$
\mathcal{R}_{\mathsf{x}}
=\exp\!\left(\sum_{i=1}^{p}x_iJ_i\right)
=P\,\operatorname{diag}\!\left(
e^{\theta_1(\mathsf{x})K},\ldots,
e^{\theta_{\lfloor n/2\rfloor}(\mathsf{x})K},[1]
\right)P^T,
$$
where $K=e_u\otimes e_v^T-e_v\otimes e_u^T$ is the planar generator introduced above, $P\in O(n)$, and $[1]$ occurs only when $n$ is odd. Hence there are at most $\lfloor n/2\rfloor$ independent rotational frequencies. In the language of the opening, $p$ counts the position coordinates used to parameterize these frequencies, whereas $n$ is the dimension of the vectors being rotated.

The derivative at the identity already forces each $J_i$ to be skew-symmetric. Conversely, exponentials of commuting skew-symmetric generators produce rotations: for $A_i=x_iJ_i$,
$$
\mathcal{R}_{\mathsf{x}}^T\mathcal{R}_{\mathsf{x}}
=e^{-A_1-\cdots-A_p}e^{A_1+\cdots+A_p}=I,
\qquad
\det\mathcal{R}_{\mathsf{x}}
=e^{\operatorname{tr}(A_1+\cdots+A_p)}=1.
$$
The problem is now reduced to constructing these commuting skew-symmetric generators and determining how many independent position coordinates they can support.

{% collapse Aside: quantum evolution and RoPE in bra-ket notation %}
For the complex analogue, replace the real transpose by the conjugate transpose $U^*$:
$$
SU(n)\subset U(n),
\qquad
U(n)=\{U:U^*U=I\},
\qquad
SU(n)=\{U\in U(n):\det U=1\}.
$$
Their generators are anti-Hermitian, with trace zero in the special unitary case:
$$
\mathfrak{u}(n)=\{Z:Z^*=-Z\},
\qquad
\mathfrak{su}(n)=\{Z:Z^*=-Z,\ \operatorname{tr}Z=0\}.
$$
Unlike $O(n)$ and $SO(n)$, these groups do not share a Lie algebra: $\det e^Z=e^{\operatorname{tr}Z}$, so $\det U=1$ imposes an additional trace constraint on the generator.

The exponential map also appears in quantum mechanics, with a factor of $i$ that converts a Hermitian observable into an anti-Hermitian generator. For an $n$-dimensional system with a time-independent Hamiltonian $H=H^*$, the Schrödinger equation and its solution are
$$
i\hbar\frac{d}{dt}\lvert\psi(t)\rangle
=H\lvert\psi(t)\rangle,
\qquad
\lvert\psi(t)\rangle=U(t)\lvert\psi(0)\rangle,
\qquad
U(t)=e^{-itH/\hbar}.
$$
The **unitary time-evolution operator** $U(t)$ has generator $-iH/\hbar\in\mathfrak{u}(n)$. Unitarity and the additive evolution law follow immediately:
$$
U(t)^*U(t)=e^{itH/\hbar}e^{-itH/\hbar}=I,
\qquad
U(t)U(s)=U(t+s).
$$
Its determinant need not equal $1$:
$$
\det U(t)=e^{-it\operatorname{tr}(H)/\hbar}.
$$
Imposing $\operatorname{tr}H=0$ makes the evolution special unitary for all $t$; at one particular time, $\operatorname{tr}H\in(2\pi\hbar/t)\mathbb{Z}$ suffices. Thus real rotations use $e^{\theta J}$ with $J^T=-J$, whereas quantum evolution uses $e^{-itH/\hbar}$ with $H^*=H$.

Bra-ket notation also provides a compact way to write RoPE. Regard $q$ and $k$ as kets $\lvert q\rangle$ and $\lvert k\rangle$, so positional encoding becomes
$$
\lvert q_{\mathsf{x}}\rangle
=\mathcal{R}_{\mathsf{x}}\lvert q\rangle,
\qquad
\lvert k_{\mathsf{y}}\rangle
=\mathcal{R}_{\mathsf{y}}\lvert k\rangle.
$$
The bra of an encoded query is obtained from its adjoint. For real vectors, the adjoint is the transpose, so
$$
\langle q_{\mathsf{x}}\rvert
=\langle q\rvert\mathcal{R}_{\mathsf{x}}^T
=\langle q\rvert\mathcal{R}_{-\mathsf{x}},
$$
where orthogonality supplies the last equality. The unnormalized attention score is therefore
$$
\langle q_{\mathsf{x}}\mid k_{\mathsf{y}}\rangle
=\langle q\rvert\mathcal{R}_{\mathsf{y}-\mathsf{x}}\lvert k\rangle.
$$
Using the rotation basis $P^T\lvert q\rangle$ and $P^T\lvert k\rangle$ from above, we can expose the frequencies explicitly:
$$
\langle q_{\mathsf{x}}\mid k_{\mathsf{y}}\rangle
=\langle q\rvert P
\exp\!\left(\sum_{\ell=1}^{\lfloor n/2\rfloor}
\theta_{\ell}(\mathsf{y}-\mathsf{x})K_{\ell}\right)
P^T\lvert k\rangle.
$$
Here $K_{\ell}$ is the planar generator in the $\ell$th rotation block, and $\theta_{\ell}(\mathsf{z})=\sum_i z_i\omega_{\ell i}$. This is only a change of notation for ordinary RoPE; no quantum dynamics is implied.
{% endcollapse %}


