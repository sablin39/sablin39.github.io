# Report Condensation, Consolidation, and Comparison

Use this reference when condensing a long report, merging multiple versions, or comparing two technical documents. The goal is a better fit for the intended readers and through-line, not simply shorter text; never equate length with rigor.

## Contents

1. [Determine the document's role](#1-determine-the-documents-role)
2. [Build a load-bearing content inventory](#2-build-a-load-bearing-content-inventory)
3. [Assign a destination to each content block](#3-assign-a-destination-to-each-content-block)
4. [Rebuild the through-line around reader decisions](#4-rebuild-the-through-line-around-reader-decisions)
5. [Choose the minimum sufficient representation](#5-choose-the-minimum-sufficient-representation)
6. [Compare two documents](#6-compare-two-documents)
7. [Check coverage after condensation](#7-check-coverage-after-condensation)

## 1. Determine the document's role

Establish the intended readers, reader goal, through-line, and use case before deciding which draft is ready for delivery and which should serve as source material. Distinguish these roles:

- **Main report**: Helps readers understand conclusions, choose an approach, or act.
- **Mechanism tutorial**: Helps readers with different background knowledge understand concepts, formulas, and examples.
- **Evidence appendix**: Helps readers with traceability needs inspect sources, versions, methods, and raw material.
- **Mixed draft**: Serves several roles at once. It may be complete but is often unsuitable as one reading path for a single audience.

Do not judge a document better merely because it is shorter, or more accurate merely because it contains more formulas and links. Compare facts and coverage before structural fit.

When comparing documents only, distinguish **internal consistency between the two texts** from **independent verification of external facts**. Do not substitute textual consistency for factual verification or launch a comprehensive external review when only a structural comparison was requested.

## 2. Build a load-bearing content inventory

Before condensing or merging, extract the following content. It supports reader action, judgment, or verification and must not be lost in pursuit of brevity.

| Category | Content to preserve |
|---|---|
| Core conclusions | Which questions the document answers and to which objects and scope its conclusions apply |
| Decisions and actions | Which path readers should choose, what they should do, and how they should verify the result |
| Load-bearing evidence | Which tests, configurations, logs, data, or source code directly support key conclusions, and which mechanism produces each result |
| Comparison frame | Baselines and their conditions of effectiveness, versions, hardware, workloads, metric definitions, and non-benefit, plateau, or regression conditions |
| Engineering constraints | Versions, hardware, dependencies, permissions, compatibility, minimum requirements, and performance prerequisites |
| Configuration and ownership boundaries | Which options are independent, which conclusions cannot be inferred from one another, and who creates, stores, releases, and restores data or objects |
| Failure conditions and unknowns | When conclusions cease to hold, what remains undisclosed or unverified, and which variables require confirmation |
| Traceability | Evidence cutoff, pinned versions, source sections or lines, and actual verification scope |

“Load-bearing” is determined by the reader's task, not the author's original length. Standard mathematical definitions, industry background, and generic derivations do not belong in the main report merely because they are long; retain them only when they change the current reader's choices or actions.

## 3. Assign a destination to each content block

| Destination | Inclusion condition | Typical content |
|---|---|---|
| Main report | Removal would change reader action, judgment, or verification | Conclusions, key evidence, actions, engineering constraints, material limitations |
| Evidence appendix | The through-line does not need the detail, but the same readers may use it for verification | Detailed methods, raw data, complete logs, source sections and line references |
| Separate mechanism tutorial | It primarily serves a different audience with different background knowledge | Basic concepts, standard derivations, instructional examples, introductory exercises |
| Delivery notes | The author or client needs it, but document readers do not need to encounter it repeatedly | Assumptions, unresolved items, unverified scope, version trade-offs |
| Delete | It adds no information or merely records author process and self-justification | Repeated summaries, search history, review anxiety, generic disclaimers, duplicate examples |

**An appendix is not a dumping ground for deleted content.** Retain material only when it has clear traceability or on-demand lookup value. Tutorials and appendices differ: a tutorial serves another audience; an appendix serves the same audience's deeper verification.

A conclusion may receive one necessary summary and one concrete expansion across the abstract, main text, and ending. Do not repeat it in multiple sections such as “conclusion summary,” “design lessons,” and “shareable summary” without new evidence, decisions, or actions.

## 4. Rebuild the through-line around reader decisions

1. Open with the audience, task, scope, and conclusions, followed immediately by necessary action recommendations.
2. Order findings by importance to reader decisions, not by the author's research chronology.
3. If the title promises implementation choices, comparisons, or open-source alternatives, provide the corresponding matrix, differences, and action implications promptly.
4. Place key evidence near the relevant assertion and complete source locations in an evidence appendix; link the two.
5. End with verification or next steps rather than another repetition of the whole document.

Preserve technical meaning during condensation. If an earlier draft removed versions, applicability conditions, or failure conditions that change a conclusion, restore them rather than accepting information loss for structural neatness.

**Typical imbalance**: An implementation comparison retains pages of standard operator derivations but omits the backend's minimum version, independently configurable compute and communication settings, and cache-object lifetime. Move the derivations to a mechanism tutorial and keep those constraints in the main report.

### Build a claim-to-evidence map

Before writing or restructuring, create an internal map for major claims. This is a working tool; include it in the delivered document only when readers need it.

| Key claim | Problem gap and core mechanism | Load-bearing evidence | Necessary conditions |
|---|---|---|---|
| [Conclusion readers need to judge] | [Residual gap in existing approaches and mechanism producing the effect] | [Test, data, or source directly supporting the claim] | [Version, workload, or boundary that changes the conclusion] |

- Use the same claim or mechanism names in the opening, design, and verification sections so readers need not reconstruct the mapping.
- A mechanism without evidence is not a verified result. If a result has no corresponding claim, decide whether it serves the through-line; move it out if it does not.
- Distinguish empirical observations, hypotheses, derivations, design choices, and proven properties. An observation holds only for its tested scope, and a design choice is not the only possible solution.
- Include only load-bearing conditions, not every possible exception. When positive scope is already clear, do not add “this does not represent other scenarios.”

### Check comparison boundaries

- State what a baseline solves and where it remains effective before identifying the residual gap. Do not describe an existing approach as universally ineffective.
- Distinguish end-to-end systems from subsystems, algorithms from implementations, and measurements from simulations or estimates. Do not rank results with different boundaries or evidence levels in one table.
- When like-for-like comparison is impossible, compare groups separately and explain the differences rather than manufacturing a superficially complete table.
- State shared test environments once. Near each result, retain only the baseline, workload, metric, and aggregation needed to interpret it.
- Place non-benefit, plateau, and regression results near the corresponding positive conclusion. Include them only when they affect choices, actions, or interpretation; do not mechanically attach limitations to every finding.

### Make figures carry an argument

Use before-and-after comparisons, concrete counterexamples, bottleneck attribution, or mechanism chains to explain why an existing approach is insufficient and what the new mechanism changes. Captions should state the intended takeaway, not merely “system architecture” or “experimental results.” Do not add figures without information gain; one effective comparison can replace several repetitive paragraphs.

## 5. Choose the minimum sufficient representation

| Reader need | Preferred representation | Repetition usually moved out |
|---|---|---|
| Fast lookup and cross-comparison | Concise table, decision matrix, like-for-like baselines | Multiple synonymous explanations, mixed rankings across boundaries |
| Evaluating an approach or performance | Baseline, operating conditions, metric definition, mechanism producing the result, and necessary boundaries | Isolated speedups, straw-man comparisons, repeated exclusions of unrelated scenarios |
| Building mechanism intuition | One numerical example or one conceptual figure carrying an argument | Stacking synonymous formulas, code, and repeated explanations |
| Implementation | Minimal configuration or code, key constraints, expected result | Generic history unrelated to implementation |
| Understanding necessary mathematics | Formulas and symbol definitions directly relevant to a decision | Standard derivations the audience already knows |
| Evidence audit | Pinned versions, source mapping, verification status | Repeated statements of the same evidence boundary across chapters |

Do not impose a mechanical rule of “only one form per section.” Combine forms when they contribute different information: a formula may define behavior, code may explain implementation, and a test may establish the result. If all three repeat the same intuition, retain the one that best serves the task.

## 6. Compare two documents

Compare in this order to avoid focusing only on style and length:

1. **Conclusion coverage**: Are the core conclusions consistent, and are there substantive conflicts? Distinguish factual differences from differences in detail.
2. **Audience fit**: Is the intended audience explicit, and are knowledge assumptions consistent throughout?
3. **Through-line delivery**: Does the document promptly answer what its title and opening promise, or are key comparisons delayed by generic teaching?
4. **Load-bearing content**: Which draft retains more engineering constraints, failure conditions, unknowns, and traceability?
5. **Action value**: Which draft better supports selection, implementation, and verification rather than merely restating principles?
6. **Duplication and routing**: What should be merged, moved to a tutorial or evidence appendix, or deleted?

Express the result as **primary document base + content to restore + content to move out**. Do not assign undefined composite scores or use length itself as the criterion for winning.

Recommended output structure:

```markdown
## Overall judgment
[For which audience and task one document works as the primary draft, and which should serve as source material or an appendix.]

## Category comparison
[Audience, through-line, coverage, evidence, action value, proportion, and format.]

## Remaining changes to the primary document
[Specific sections, missing load-bearing content, and instructional material to move out.]

## Merge or split recommendations
[Specify what to retain, restore, move, or delete.]
```

## 7. Check coverage after condensation

- [ ] Core conclusions, actions, and load-bearing evidence remain, or were deliberately moved to a clearly accessible appendix.
- [ ] Every key claim still maps to its mechanism, direct evidence, and necessary conditions; no mechanism-only or isolated-result gaps remain.
- [ ] Versions, hardware, dependencies, configuration independence, object lifetimes, failure conditions, and unknowns survived condensation.
- [ ] Comparison baselines and their conditions of effectiveness, workloads, metric definitions, comparison boundaries, and necessary non-benefit or regression conditions remain available.
- [ ] Evidence cutoff, pinned versions, actual verification scope, and necessary source locations remain available.
- [ ] Limitations appear only at points where they affect choices, actions, or interpretation; content already conveyed through positive scope is not repeated as “does not represent” or “no guarantee.”
- [ ] Audience knowledge assumptions are consistent, and the title's promise is answered in a prominent location.
- [ ] Generic teaching does not crowd out the main report, and material for multiple audiences has been appropriately split.
- [ ] The same concept is not repeated without new information through formulas, examples, code, figures, and multiple summary sections.
- [ ] The condensed text improves reader action, judgment, or verification rather than merely reducing word count.
