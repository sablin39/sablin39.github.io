---
title: "From MPC to Diffusion Policy"
date: 2024-10-05 13:16:21
tags: ["EBM", "diffusion", "robotics"]
cover: 
categories: EBM
mathjax: true
toc: true
---

In this post, we will try to connect Energy-Based Model with classical optimal control frameworks like Model-Predictive Control from the perspective of Lagrangian optimization. 

<!-- more -->

> This is one part of the series about energy-based learning and optimal control. A recommended reading order is: 
>
> 1. [Notes on "The Energy-Based Learning Model" by Yann LeCun, 2021](./lecun-ebm-2021.html)
> 2. Learning Data Distribution Via Gradient Estimation
> 3. [From MPC to Energy-Based Policy]
> 4. [How Would Diffusion Model Help Robot Imitation](../../robotics/diffusion-robot-imitation.html)
> 5. Causality hidden in EBM

# Review of EKF and MPC

Consider a state-space model with process noise and measurement noise as:

$$\left\{ \begin{aligned} x[k] &= f(x[k-1], u[k-1], w[k-1]),\quad &w \sim \mathcal{N}(0, Q_w) \\\\ z[k] &= h(x[k], v[k]),\quad &v \sim \mathcal{N}(0, Q_v) \end{aligned} \right.$$

With a state $x$ and observation $z$. 

To perform optimal control on such system, we first predict and update our observation with Extended Kalman Filter:

- **Prediction Step**

  - **Priori Estimation**:

    $\hat{x}^{-}[k] = f(\hat{x}[k-1], u[k-1], 0)$


  - **Jacobian of the State Transition Function**:

    $A[k] = \frac{\partial f}{\partial x} (\hat{x}[k-1], u[k-1], 0)$

    $W[k]=\frac{\partial f}{\partial w} (\hat{x}[k-1], u[k-1], 0)$

  - **Error Covariance Prediction**:

    $P^{-}[k] = A[k]P[k-1]A^T[k-1]+W[k]Q_wW^T[k]$

- **Update Step**

  - **Jacobian of the Measurement Function**:

    $H[k] = \frac{\partial h}{\partial x} (\hat{x}^{-}[k], 0)$

    $V[k] = \frac{\partial h}{\partial v} (\hat{x}^{-}[k], 0)$

  - **Kalman Gain**:

    $K[k] = \frac{P^{-}[k] H^{\top}[k]}  { H[k] P^{-}[k] H^{\top}[k] + V[k]Q_vV^T[k] }$


  - **Posterior Estimation**:

    $\hat{x}[k] = \hat{x}^{-}[k] + K[k] \left( z[k] - h(\hat{x}^{-}[k],0) \right)$


  - **Error Covariance Update**:

    $P[k] = \left( I - K[k] H[k] \right) P^{-}[k]$

With the estimated state we can perform Model-Based Control with the following condition:

$$\begin{aligned} \min_{\mathbf{u}} \quad J &= \sum_{i=0}^{N-1} \ell(x[k+i], u[k+i]) + \ell_f(x[k+N]) \\\\ \ell(x, u) &= (x - x_{\text{ref}})^{\top} Q (x - x_{\text{ref}}) + u^{\top} R u \\\\ \text{s.t.} \quad & x[k+i+1] = f(x[k+i], u[k+i]) \quad \forall i = 0, \dots, N-1 \\\\ & x[k] = \hat{x}[k] \\\\ & x_{\text{min}} \leq x[k+i] \leq x_{\text{max}} \quad \forall i \\\\ & u_{\text{min}} \leq u[k+i] \leq u_{\text{max}} \quad \forall i \end{aligned}$$

- $ \mathbf{u} = \{ u[k], u[k+1], \dots, u[k+N-1] \} $: Control input sequence.
- $ N $: Prediction horizon.
- $ \ell(x, u) $: Stage cost function.
- $ \ell_f(x) $: Terminal cost function.
- $ x_{\text{min}}, x_{\text{max}} $: State constraints.
- $ u_{\text{min}}, u_{\text{max}} $: Control constraints.



# Introducing Energy Based Model

We can replace the state transition function $f$ in the formulated state space model with EBM as:

$$
p(x[k]∣x[k−1],u[k−1])=\frac{e^{−E(x[k],x[k−1],u[k−1])}}{Z(x[k−1],u[k−1])}
$$

## Supervised Training

Since $Z$ is often intractable, we will use score matching to learn the EBM in the following content. 

Here we have the score function as:

$$
s_\theta (x[k],x[k−1],u[k−1])=s_\theta(\mathbf x) = \nabla_{\mathbf x} \log p_\theta(\mathbf x)=-\nabla_{\mathbf x} E_\theta(\mathbf x)
$$

-  **Dataset**: A set of transitions $\{(x_i[k-1], u_i[k-1], x_i[k])\}^N_{i=1}$  with "independently and identically distributed (i.i.d.)" assumption.

- The training objective is to minimize the difference between data landscape $s_{data}(\mathbf x)$ and model landscape $s_\theta(\mathbf x)$, and the  objective function is defined as follows, where loss $\mathcal L$ is commonly defined as MSELoss:

  $$
  J(\theta)=\frac{1}{2}\mathbb{E}_{p_{data}}[\mathcal L(s_{data}(\mathbf x), s_{\theta}(\mathbf x))] \
  =\frac{1}{2}\mathbb{E}_{p_{data}}[||s_{data}(\mathbf x)- s_{\theta}(\mathbf x)||^2]
  $$

HOWEVER, we cannot get access to full data distribution. According to (Hyvärinen, et.al , 2005)[^1] we may use the following procedures. (More in Appendix A of original paper)


$$\begin{aligned}
J(\theta)&=\frac{1}{2}\mathbb{E}_{p_{data}}[\left\| s_\theta(\mathbf x) \right\|^2 - 2 s_\theta(\mathbf x)^\top s_{\text{data}}(\mathbf x) + \left\| s_{\text{data}}(\mathbf x) \right\|^2] \\
&=\frac{1}{2} \mathbb{E}_{p_{\text{data}}} \left[ \left\| s_\theta(\mathbf x) \right\|^2 \right] - \mathbb{E}_{p_{\text{data}}} \left[ s_\theta(\mathbf x)^\top s_{\text{data}}(\mathbf x) \right] + \overbrace{\frac{1}{2} \mathbb{E}_{p_{\text{data}}} \left[ \left\| s_{\text{data}}(\mathbf x) \right\|^2 \right]}^{\text{constant}} \\
J'(\theta)&=\frac{1}{2} \mathbb{E}_{p_{\text{data}}} \left[ \left\| s_\theta(\mathbf x) \right\|^2 \right] - \mathbb{E}_{p_{\text{data}}} \left[ s_\theta(\mathbf x)^\top s_{\text{data}}(\mathbf x) \right] 
\end{aligned}$$


$$
\mathbb{E}_{p_{\text{data}}} \left[ s_\theta(\mathbf x)^\top s_{\text{data}}(\mathbf x) \right] = \int p_{\text{data}}(\mathbf x) s_\theta(\mathbf x)^\top s_{\text{data}}(\mathbf x) d\mathbf x \
= \int s_\theta(\mathbf x)^\top \nabla_{\mathbf x} p_{\text{data}}(\mathbf x) d\mathbf x
$$



By integrating by parts, we move the derivative from $ p_{\text{data}}(x) $ to $ s_\theta(x) $:

$$
\int s_\theta(\mathbf x)^\top \nabla_{\mathbf x} p_{\text{data}}(\mathbf x) d\mathbf x = -\int p_{\text{data}}(\mathbf x) \text{div}_{\mathbf x} s_\theta(\mathbf x) d\mathbf x \\

\text{div}_{\mathbf x} s_\theta(\mathbf x) = \text{div}_{\mathbf x} \left( -\nabla_{\mathbf x} E_\theta(\mathbf x) \right) = -\text{div}_{\mathbf x} \nabla_{\mathbf x} E_\theta(\mathbf x) = -\Delta_{\mathbf x} E_\theta(\mathbf x)\\

\mathbb{E}_{p_{\text{data}}} \left[ s_\theta(\mathbf x)^\top s_{\text{data}}(\mathbf x) \right] = -\mathbb{E}_{p_{\text{data}}} \left[ \text{div}_{\mathbf x} s_\theta(\mathbf x) \right]
$$

Eventually we obtain the updated objective function

$$
\begin{aligned}
J(\theta) &= \frac{1}{2} \mathbb{E}_{p_{\text{data}}} \left[ \left\| \nabla_{\mathbf x} E_\theta(\mathbf x) \right\|^2 \right] + \mathbb{E}_{p_{\text{data}}} \left[ \Delta_{\mathbf x} E_\theta(\mathbf x) \right] \\

J_k(\theta) &= \text{Tr} \left( \nabla_{\mathbf x[k]}^2 E(\mathbf x[k]) \right) + \frac{1}{2} \left\| \nabla_{\mathbf x[k]} E(\mathbf x[k]) \right\|^2
\end{aligned}
$$

$\text{Tr} \left( \nabla_{\mathbf x[k]}^2 E(\mathbf x[k]) \right)$ denotes the trace of Hessian matrix (or Jacobian) of score function w.r.t. $\mathbf x[k]$ .

> If you haven't seen such formulation in diffusion models and feel strange:
>
> - The training objective is to learn the distribution of $q(x_{t-1}|x_t, x_0)$, which is a known Gaussian distribution since the noise level is provided. This is also why q-sampling requires $x_0$ .



## Optimization Based Inferencing

Langevin Dynamics can produce samples from a probability density $p(\mathbf x)$ using only the score function $\nabla_{\mathbf x}\log p(\mathbf x)$. Given a fixed step size $\epsilon >0$, and an initial value $\tilde{\mathbf x} \sim \pi(\mathbf x)$ with $\pi$ being a prior distribution, the Langevin method recursively computes the following

$$
\tilde{\mathbf x}_t=\tilde{\mathbf x}_{t-1}+\frac{\epsilon}{2}\nabla_{\mathbf x}\log p(\tilde{\mathbf x}_{t-1})+\sqrt{\epsilon}\mathbf z_t
$$

where $\mathbf z_t \sim \mathcal N(0,I)$ . The distribution of $\tilde{\mathbf x}_t$ equals $p(\mathbf x)$ when $\epsilon \rightarrow 0$ and $T \rightarrow \infty$ , or else a Metropolis-Hastings update is needed to correct the error.





[^1]: Hyvärinen, A., & Dayan, P. (2005). Estimation of non-normalized statistical models by score matching. *Journal of Machine Learning Research*, *6*(4). https://jmlr.org/papers/volume6/hyvarinen05a/hyvarinen05a.pdf
