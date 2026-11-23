---
name: technical-documentation-writer-en
description: Create, rewrite, condense, consolidate, compare, and review clear, accurate, actionable, verifiable, and appropriately detailed technical documents and reports in English. Use for developer guides, READMEs, API and SDK documentation, deployment and operations manuals, troubleshooting guides, SOPs, design proposals, technical or evaluation reports, release notes, and migration guides. Trigger when the user asks to write developer documentation, turn code, interfaces, workflows, or research into documentation, shorten or merge technical reports, compare two documents, or improve the audience fit, argument, terminology, style, structure, information density, examples, or Markdown formatting of technical content. Do not use for fiction, marketing copy, or other purely literary writing.
---

# Technical Documentation Writing and Review

## Core objective

Enable the intended reader to perform a task, find accurate information, understand a design, or make a decision with the minimum necessary context. Resolve conflicts in this order:

1. **Factual accuracy**: Never invent commands, parameters, defaults, paths, versions, outputs, interface behavior, performance data, or verification results.
2. **Reader relevance**: Include only what the reader needs to understand, act, decide, or verify. Do not equate the author's request with the reader's information needs.
3. **Task completion**: State applicability, prerequisites, steps, expected results, relevant failures, and necessary rollback.
4. **Verifiability**: Support operational claims with inputs, outputs, logs, states, tests, or checks.
5. **Unambiguous expression**: Use consistent terminology and make actors, objects, conditions, units, and timing explicit.
6. **Retrievable structure**: Help readers locate information through headings, contents, steps, tables, and error messages.
7. **Proportionate detail**: Restrain coverage by default. Concentrate detail on the main path, load-bearing evidence, high-risk actions, and non-obvious constraints.

## Workflow

### 1. Establish the audience and through-line

Treat the author as the client and source of facts, not necessarily as a member of the document's audience. Before creating or substantially rewriting a document, ask the author to establish the following four items; if the material already answers them, extract and restate them without asking again:

- **Intended readers**: Who will use the document, and what knowledge, permissions, and environment do they have?
- **Reader goal**: What should readers do, understand, or decide after reading?
- **Through-line**: What single task chain, problem chain, or argument connects the document?
- **Content boundary**: Which background, process notes, branches, and details should stay out of the main text?

Ask when the audience or through-line is missing and would materially affect the structure. Do not invent broad audiences such as “all developers” or “all users.”

- Keep the audience model consistent. Do not repeat standard definitions for experts or assume later that beginners already understand a core concept.
- Deliver on the title and opening promptly. If they promise implementation choices, comparisons, or open-source alternatives, do not postpone them behind generic tutorials.
- When one source serves implementers, beginners, and auditors, prefer separate **main report, mechanism tutorial, and evidence appendix** documents rather than forcing everyone through one long path.

Filter every paragraph with this question: **If it were removed, what would readers do incorrectly, misjudge, miss as a necessary constraint, or be unable to verify?** If there is no clear answer, remove it, move it to an appendix, or keep it in delivery notes rather than the main text.

In particular, do not automatically include:

- The author's question history, internal discussions, review comments, emotions, preferences, or fear of criticism.
- The agent's searches, analysis, tool use, false starts, or writing process.
- Raw logs, complete command output, duplicate evidence, every rejected option, or trivial background that readers do not need.

Keep alternatives that affect design decisions and historical behavior needed for migration. Material needed for traceability but outside the through-line belongs in an appendix or linked source, not as a complete work log in the main text.

### 2. Establish factual and delivery boundaries

- Identify the document type, use case, delivery format, product or component version, runtime environment, and scope from the request and materials.
- For research and technical reports, state the evidence cutoff, pinned versions, and actual verification scope as needed. Distinguish static source review, partial execution, end-to-end reproduction, and unverified claims. Keep detailed section or line references in an evidence appendix and direct links near key assertions.
- Prefer user-supplied code, configuration, interface definitions, command output, logs, and existing documents. Verify external facts before using them.
- Distinguish **confirmed facts, reasoned inferences, illustrative examples, and unresolved information**. Use conspicuously fictional and internally consistent examples; never present them as real environmental results.
- Ask when missing information would materially change the structure or steps. Otherwise, use a conservative default and state the assumption explicitly.
- Mark unresolved key items as `[TO CONFIRM: specific item]` and summarize them in delivery notes. Do not hide factual gaps behind vague language.
- Preserve technical meaning during rewriting. If the source appears wrong, identify and verify the issue rather than silently replacing it with unconfirmed behavior.

**Avoid defensiveness**: Do not turn the document into self-justification because the author repeatedly raises risk, liability, compliance, or completeness. Include real risks only when they affect reader action, and state them once before the relevant operation. Do not repeat generic warnings such as “please note,” “results may vary,” or “no guarantee is provided” in every section. Resolve or explicitly mark factual gaps instead of substituting disclaimers.

**State limitations only at critical points**: When a boundary changes a choice, operational outcome, or interpretation of a conclusion, state it at the relevant decision, comparison, or verification point. Prefer positive scope, prerequisites, and test conditions. Use explicit exclusions such as “not supported,” “does not imply,” or “cannot be generalized” only when readers are likely to make a harmful default assumption. Do not repeat exclusions already clear from the title, scope, configuration table, or earlier text. Omit branches that no reader needs and that do not affect the current task. Do not add a standalone “Limitations” section by default. Summarize genuine delivery-relevant unknowns in delivery notes rather than repeating them throughout the document.

### 3. Choose a structure and control detail

When creating or restructuring a document, read [Document types and structures](references/document-patterns.md) and choose one primary structure; combine structures only when readers need them. When condensing, consolidating, or comparing technical reports, also read [Report restructuring](references/report-restructuring.md). Templates and checklists support selection and diagnosis; they are not mandates to create every section.

- Open with **the problem addressed, intended audience, and outcome**, followed only by necessary versions, scope, and prerequisites.
- Draft the smallest complete version of the through-line, then add details whose absence would cause errors, misjudgment, or failed verification. Prevent over-writing by default rather than treating every passage as insufficiently detailed.
- Organize by reader cognition: goal and constraints, main path, verification, then exceptions, advanced material, and appendices.
- Assign each section one question that serves the through-line. Merge or remove sections that add no fact, step, constraint, evidence, or decision basis.
- Do not allocate equal background, examples, risks, alternatives, and summaries to every topic. Make the difference in emphasis visible through length and placement.
- Organize technical reports around **conclusion, key evidence, impact, and recommended action**. Move methods, raw data, complete logs, and secondary observations to appendices or links. Do not follow the author's research chronology merely to demonstrate effort.
- Give each key claim a **problem gap, core mechanism, load-bearing evidence, and conditions of validity**. Use the same claim or mechanism names in the opening, design, and verification sections. If a mechanism lacks evidence, a result lacks a claim, or a claim lacks decision-relevant conditions, supply the missing link, downgrade the statement, or remove it; do not hide the gap with generic background.
- Make comparative results answer **compared with what, under which versions, hardware, and workload, using which metric and aggregation, and when the benefit disappears or regresses**. State shared environments once; keep only result-critical conditions beside each result. Place relevant negative or plateau results near the corresponding positive claim rather than burying them in an appendix. When evaluating a baseline, first state what it solves and when it remains effective, then identify the residual gap; do not build a straw man.
- When condensing, do not optimize only for shorter text. Protect key conclusions, actions, load-bearing evidence, version and hardware requirements, dependencies, configuration boundaries, object lifetimes, failure conditions, unknowns, and source locations before removing generic background. Retaining elementary derivations is not a substitute for retaining engineering constraints.
- Do not repeat the same concept through formulas, numerical examples, code, figures, and summaries without new information. Choose the minimum sufficient representation for the reader's goal: a selection table for lookup, one example or figure for intuition, minimal code or configuration for implementation, and source mapping for audit; move the rest to an appendix.
- Keep one primary location for the conclusion summary. Do not restate the same conclusions in “executive summary,” “design lessons,” and “shareable summary” sections; later sections must add evidence, decisions, or actions.
- Place details where they are used. Maintain one canonical location for rules used across sections and link to it elsewhere.
- Use task progress, dependencies, information gain, and verification to control pace, not suspense, emotion, or conflict.

### 4. Write actionable, verifiable content

#### Preserve accuracy

- Use consistent product names, component names, terminology, abbreviations, identifiers, and capitalization. Expand or define specialized abbreviations on first use.
- Make the actor in each sentence clear. If “it,” “this,” “that,” or “the former” could refer to multiple objects, repeat the specific noun.
- Do not use undefined internal labels such as `T1`, `T2`, `P0`, or `P1` for topics, phases, objects, or severity. Replace them with specific names or self-explanatory labels such as “blocker,” “important,” and “suggestion.” Retain labels only when the project defines them and the intended audience understands them. Defined technical metrics such as `P99` latency are exempt.
- Split sentences containing multiple conditions, actions, and conclusions. Prefer one principal logical relationship per sentence.
- Use exact values, units, comparison scopes, and conditions. Do not substitute vague quantifiers such as “usually,” “fast,” or “nearly lossless” for unavailable facts.
- Distinguish “must,” “should,” “may,” and “might”; do not conflate requirements, recommendations, options, and possibilities.

#### Provide necessary rather than maximal detail

- Give each operational step one principal action. Merge routine consecutive actions that require no intermediate judgment, and verify the group afterward.
- After critical, high-risk, or non-obvious steps, state the expected result and verification method. Do not mechanically repeat identical results, warnings, or failure notes after every step.
- For failures that affect the main path, provide symptoms, causes, remediation, and necessary rollback. Link rare branches irrelevant to the current reader's task to a dedicated document.
- Replace abstract praise with complete but restrained examples. Include only the inputs, key configuration or code, expected output, and placeholder explanations needed to understand or use the current feature.
- Before deletion, overwrite, authorization, production changes, network exposure, or secret handling, state the impact and backup or rollback requirements before giving commands.
- Expand the main path, key evidence, high-risk actions, non-obvious constraints, and common failures. Omit trivial processes that do not affect the result. Brevity never justifies omitting necessary risks or factual gaps.

#### Avoid mechanical, repetitive, and fragmented prose

- Remove non-informative text such as “with the rapid development of technology,” “as is well known,” “this document will explore in detail,” and “in summary.”
- Avoid stacked evaluative terms such as “powerful,” “efficient,” “seamless,” and “ultimate,” as well as excessive adjectives, metaphors, and false precision. Replace them with observable behavior, explicit constraints, or verified data.
- Merge tautologies and repeated conclusions. Reduce mechanical sequences of “first, then, next, finally.”
- Avoid repeated formulas such as “not X but Y” and “not only X but also Y,” and avoid parallel structures used only for symmetry. Consistent structure aids retrieval; repetitive syntax without information gain does not.
- Do not split related ideas into a series of similar short sentences or three-line fragments. Combine complete semantic units and vary sentence length naturally.
- Do not use consecutive short questions or an author-question/author-answer pattern to drive the main text. Convert useful content into direct explanation, operational steps, or a diagnostic or decision table.
- Do not vary established terminology merely for stylistic variety. Use numbered steps, parameter tables, checklists, and error tables where appropriate; remove only duplication, mixed hierarchy, or lists that impede retrieval.

### 5. Format Markdown and code consistently

- Unless another format is requested, deliver Markdown. Preserve useful structure and style in existing documents unless restructuring is requested.
- Use one top-level heading and no skipped heading levels. Keep necessary blank lines around headings, lists, tables, and code blocks.
- Break paragraphs at complete semantic units. Do not insert arbitrary line or section breaks within sentences. Use ordered lists for multi-step procedures rather than long narrative paragraphs.
- Put code, commands, and output in fenced blocks with language identifiers. Separate commands from expected output and keep explanatory prose out of copyable commands.
- Use consistent, safe placeholders such as `${PROJECT_ID}` and explain them on first use. Prevent shells from interpreting placeholders as redirection.
- Use em dashes, ellipses, exclamation marks, bold text, blockquotes, and warning boxes only when they serve a purpose. Do not decorate the text with symbols or use punctuation clusters for emphasis.
- Use tables for homogeneous fields, comparison, and lookup. Do not put long procedures or large code blocks into wide tables, or force ordinary prose into tables for symmetry.

### 6. Verify, review, and deliver

Before delivery, read the [Pre-publication checklist](references/quality-checklist.md) and perform at least five passes:

1. **Audience and through-line**: Check the intended readers, goals, and content boundary. Remove author-process material, defensiveness, and off-topic content.
2. **Facts, argument, and consistency**: Check versions, terms, names, parameters, paths, units, examples, and conclusions. Ensure each key claim has its mechanism, load-bearing evidence, and necessary conditions, and that comparison boundaries and evidence levels are compatible.
3. **Task and proportion**: Walk through the task as the intended reader. Keep key detail sufficient and secondary material restrained. State limitations only where they affect choices, actions, or interpretation; do not repeat exclusions already conveyed by positive scope. For condensed drafts, use the load-bearing content checklist to ensure engineering constraints and evidence were not sacrificed to generic tutorials.
4. **Language and information density**: Check long sentences, ambiguous references, typographical errors, filler, mechanical patterns, fragmented paragraphs, and repetition.
5. **Format and copyability**: Check headings, lists, tables, code blocks, punctuation, placeholders, and links.

- When safe and feasible, verify commands, code, configuration, or links. Never run potentially destructive commands merely to validate documentation.
- If execution was not performed, do not write “tested,” “verified,” or “guaranteed to work.” Record unverified items accurately in delivery notes instead of placing disclaimers throughout the main text.
- For new or fully rewritten documents, add only necessary assumptions, unresolved items, and unverified scope after the main text; do not append a writing-process narrative.
- For review-only requests, report issues as “blocker,” “important,” or “suggestion,” each with location, problem, reason, and recommended change. Do not rewrite the entire document unless asked.

Read [Technical documentation rewrite examples](references/rewrite-examples.md) when calibrating the extent of edits or when positive and negative examples would help.
