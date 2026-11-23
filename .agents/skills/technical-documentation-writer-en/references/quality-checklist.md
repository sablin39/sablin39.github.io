# Technical Documentation Pre-Publication Checklist

Use this checklist to diagnose and remove defects, not to expand a document or generate sections. Check every item and mark inapplicable items as “N/A.” Never add unneeded background, warnings, examples, failure tables, rollback, summaries, or appendices merely to obtain a check mark. In review reports, cite the specific location and original sentence rather than writing only “unclear” or “improve the wording.”

## 1. Blockers: do not deliver as reliable documentation until resolved

### Facts and consistency

- [ ] Product names, component names, versions, interface names, parameter names, paths, extensions, and capitalization are consistent and match confirmed material.
- [ ] No commands, parameters, defaults, supported platforms, error codes, outputs, links, performance figures, release dates, or licenses were invented.
- [ ] Assumptions, examples, inferences, and unresolved information are explicitly identified and not presented as confirmed facts.
- [ ] Required fields, types, enums, units, and dependencies in examples satisfy the document's own constraints.
- [ ] Commands, code, configuration, or tests that were not executed are not described as “verified” or “tested.”
- [ ] Research and technical reports state the evidence cutoff, pinned versions, actual verification scope, and source locations as needed, distinguishing static source review, partial execution, end-to-end reproduction, and unverified content.

### Operations and safety

- [ ] Declared versions, environment, permissions, and prerequisites are sufficient to determine whether the operation applies.
- [ ] Steps follow dependency order and omit no critical action that would produce a different result.
- [ ] The core task includes an observable expected result and verification method.
- [ ] Deletion, overwrite, authorization, production changes, network exposure, and secret handling include impact, backup, containment, or rollback requirements.
- [ ] Example keys, tokens, personal information, internal addresses, and logs use fictional values or have been redacted.
- [ ] Irreversibility, data loss, service interruption, and similar constraints are not hidden behind words such as “simple,” “safe,” or “lossless.”

## 2. Important: materially affects understanding, execution, or maintenance

### Audience, through-line, and proportion

- [ ] The intended readers and their background, reader goal, through-line, and exclusions are explicit; the author is not assumed to be the reader.
- [ ] Knowledge assumptions match the audience: no repeated elementary derivations for experts and no missing core concepts for beginners.
- [ ] Material serving implementers, beginners, and auditors has been split as needed into a main report, mechanism tutorial, and evidence appendix rather than forcing all readers through one long path.
- [ ] Every section serves the through-line. If removing it would not affect reader action, judgment, or verification, it has been deleted, moved to an appendix, or retained only in delivery notes.
- [ ] The main text contains no author question history, internal discussions, review anxiety, agent work process, or raw material readers do not need.
- [ ] The document does not respond to author concerns about liability, risk, or completeness with repeated disclaimers, self-justification, or low-probability scenarios.
- [ ] Risk notes are proportionate to actual operational risk and appear once at the relevant location; the same warning is not repeated across paragraphs.
- [ ] Limitations appear only where they change solution choice, operational outcome, or interpretation. Positive scope is preferred; exclusions already clear from the title, configuration table, or earlier text are not repeated as “not supported,” “does not imply,” or “no guarantee.”
- [ ] No standalone “Limitations” section was added merely for formal completeness; genuine delivery-relevant unknowns are summarized in delivery notes.
- [ ] Reports follow conclusions, key evidence, impact, and recommended actions; research process, raw data, and secondary observations do not crowd out the main text.
- [ ] Emphasis is differentiated: the main path, key evidence, high-risk actions, and non-obvious constraints receive detail; routine processes and secondary background remain concise.
- [ ] Condensation and consolidation preserve key conclusions, actions, evidence, version and hardware requirements, dependencies, configuration boundaries, object lifetimes, failure conditions, unknowns, and source locations.
- [ ] Topics are not mechanically assigned equal amounts of background, examples, risks, alternatives, and summaries.
- [ ] The same concept is not redundantly stacked across formulas, numerical examples, code, figures, and summaries; one primary conclusion summary remains, and later sections add information.
- [ ] Routine consecutive steps are appropriately merged; identical expected results, verification, warnings, and failure notes are not repeated after every step.
- [ ] Concision has not removed necessary risks, prerequisites, key evidence, or verification methods.

### Structure and information gain

- [ ] The opening identifies the reader goal, intended audience, outcome, and scope.
- [ ] Headings identify specific tasks, concepts, or problems and do not rely on low-information labels such as “Other” or “Related information.”
- [ ] Implementation choices, comparisons, or open-source alternatives promised by the title and opening appear prominently rather than behind extensive generic teaching.
- [ ] Every section adds a fact, step, constraint, evidence, or decision basis; repeated content is merged or replaced by a link.
- [ ] Every key claim maps to a problem gap, core mechanism, load-bearing evidence, and necessary conditions; the opening, design, and verification sections use the same claim or mechanism names.
- [ ] Comparisons distinguish end-to-end systems from subsystems, algorithms from implementations, and measurements from simulations or estimates; different boundaries or evidence levels are not mixed into one ranking.
- [ ] Baselines receive a fair account of what they do well and where they apply; the document does not build a straw man to promote a new approach.
- [ ] Empirical observations, hypotheses, derivations, design choices, and proven properties are distinct; observations are not generalized into universal conclusions.
- [ ] The main path, verification, exception handling, and advanced content follow reader needs without back-and-forth jumps.
- [ ] Terminology and fields remain consistent; multiple names are not introduced for the same object merely to vary sentences.
- [ ] Lists, tables, code blocks, and figures are selected by purpose. Core figures explain before-and-after differences, bottlenecks, or mechanisms; captions state the takeaway, and figures without information gain are removed.
- [ ] Technical reference information has not been converted into difficult-to-scan prose for the sake of sounding “natural.”

### Language and readability

- [ ] No typographical errors, homophone substitutions, punctuation errors, or incorrectly replaced identifiers remain.
- [ ] Long sentences are split by action, condition, and conclusion, with clear internal logic.
- [ ] References such as “it,” “this,” “that,” “the former,” and “the latter” have unique antecedents; ambiguous references are replaced with specific nouns.
- [ ] Undefined labels such as `T1` and `P0` are not used for topics, phases, objects, or severity; retained abbreviations and technical metrics are defined.
- [ ] Each step has a clear actor, object, location, and timing.
- [ ] “Must,” “should,” “may,” and “might” accurately distinguish requirements, recommendations, options, and predictions.
- [ ] Values include units, scope, and conditions; comparative conclusions include an explicit baseline, necessary workload, metric and aggregation, and a supported explanation of the mechanism producing the result.
- [ ] Shared test conditions are stated once rather than repeated in every result; relevant non-benefit, plateau, or regression results are not lost by retaining only positive figures.
- [ ] Industry filler, empty summaries, marketing adjectives, ineffective metaphors, false precision, and tautologies are removed.
- [ ] Mechanical sequences such as “first, then, next” and repeated “not X but Y” constructions are absent, as is parallelism used only for symmetry.
- [ ] Related ideas are not fragmented into similar short sentences or three-line paragraphs; consecutive short questions do not replace direct explanation, steps, or tables.

### Examples and troubleshooting

- [ ] Examples contain the relevant inputs, key configuration or code, expected output, and placeholder explanations required by the current task, without unrelated expansion.
- [ ] Placeholder syntax is consistent and introduces no additional grammar errors; readers can copy commands without guessing substitution rules.
- [ ] Commands and output are separate, and explanatory text is not mixed into copyable code.
- [ ] Troubleshooting starts from a specific symptom or exact error and provides diagnostic evidence, remediation, and recovery verification.
- [ ] Temporary recovery and root-cause repair are distinguished; information to collect and redaction requirements before escalation are clear.

## 3. Suggestions: improve retrieval, reading, and maintenance

### Markdown and layout

- [ ] The document has one top-level heading, continuous heading levels, and no skipped levels.
- [ ] Paragraphs follow complete semantic units; there are no unbroken walls of text, forced fragments of a few words, arbitrary line breaks within sentences, or mid-sentence section breaks.
- [ ] Ordered procedures use ordered lists; parallel items use unordered lists; homogeneous parameters or errors use tables.
- [ ] Code blocks have language identifiers; code and continuation lines within lists are correctly indented; fences are paired and closed.
- [ ] Punctuation follows the language of the document, while code, commands, paths, URLs, and identifiers preserve their required syntax.
- [ ] Em dashes, ellipses, exclamation marks, bold text, blockquotes, and warning boxes are restrained and free of decorative symbols or punctuation clusters.
- [ ] Tables have matching column counts and separator rows; wide tables do not contain long procedures or large code blocks, and ordinary prose is not forced into tables for symmetry.
- [ ] Notes, cautions, and warnings use a consistent format only when necessary, without decorative symbols or emoji interfering with reading.
- [ ] Link text identifies the destination; internal anchors and external links have been checked; inaccessible targets are noted.

## 4. Delivery gate

- [ ] All blockers pass; unresolved important issues are explicitly listed rather than hidden in the main text.
- [ ] A walkthrough from the intended reader's perspective confirms the through-line and removes author-process concerns and defensiveness.
- [ ] Operational documents answer “What do I do, what comes next, how do I know it worked, and what if it fails?” Reports answer “What is the conclusion, what supports it, what is the impact, and what happens next?”
- [ ] Commands, code, links, and facts not executed or verified are listed as unverified in delivery notes rather than repeatedly disclaimed in the main text.
- [ ] The deliverable uses the requested format, defaulting to Markdown when none is specified.
- [ ] Review-only tasks report location, problem, reason, and recommendation under “blocker,” “important,” and “suggestion”; meaningless labels are absent, and writing tasks contain no redundant creative-process narrative.
