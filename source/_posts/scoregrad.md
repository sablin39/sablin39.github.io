---
title: "Notes on ScoreGrad"
date: 2024-08-07 23:22:01
tags: ["diffusion", "time series"]
pic:
categories: diffusion
mathjax: true
toc: true
---

ScoreGrad is a EBM make use of iterative conditional SDE sampling via diffusion to perform multi-variate probabilistic time series prediction. Basically it uses RNN/LSTM/GRU to encode past time series as a condition and sample a probability distribution of predicting time series based on this.

<!-- more -->

- Paper link: https://arxiv.org/abs/2106.10121
- Code release: https://github.com/yantijin/ScoreGradPred



# Architecture

## Conditioner

As a conditional generation task, it use an RNN/LSTM and extracts last hidden state as feature. For a time 

## Score Function

