# Document Types and Structures

Establish the intended readers, reader goal, and through-line before selecting a primary structure. Do not stack templates in pursuit of completeness. Bracketed text is a placeholder; adapt headings to project conventions and delete optional sections with no real content. Templates provide minimum structures, not expansion checklists. Never add unneeded background, risks, examples, or appendices merely to fill a template.

## Contents

1. [Tutorials and quickstarts](#1-tutorials-and-quickstarts)
2. [How-to guides, deployment manuals, and SOPs](#2-how-to-guides-deployment-manuals-and-sops)
3. [API, SDK, and configuration references](#3-api-sdk-and-configuration-references)
4. [Concepts, architecture, and design decisions](#4-concepts-architecture-and-design-decisions)
5. [Troubleshooting](#5-troubleshooting)
6. [Release notes and migration guides](#6-release-notes-and-migration-guides)
7. [READMEs and project entry points](#7-readmes-and-project-entry-points)
8. [Technical and evaluation reports](#8-technical-and-evaluation-reports)

## 1. Tutorials and quickstarts

**Use when**: Beginners need one complete path to a concrete result. Optimize for learning and first success, not coverage of every option.

````markdown
# Achieve [specific outcome] with [tool]

[One paragraph describing what the reader will build, deploy, or verify.]

## Outcome
- [Observable, acceptance-ready result]

## Scope
- Product or component version: [version]
- Supported environment: [OS, runtime, platform]
- Excluded: [important boundary, only if needed to prevent a wrong assumption]

## Prerequisites
- [Installed software and versions]
- [Accounts, permissions, network, or resources]
- [Required background knowledge]

## 1. [Perform the first action]
[Explain the purpose of the action.]

```[language]
[Copyable command or minimal code]
```

Expected result:
```text
[Real output or output clearly labeled as an example]
```

## 2. [Perform the next action]
[Continue the single main path; verify at critical points.]

## Verify the complete result
[End-to-end check, test, or UI state.]

## Clean up
[How to remove tutorial resources; optional when there is no cost or resource impact.]

## Next steps
[At most three links or tasks directly related to the current result.]
````

**Check**: Can a reader execute the steps in order from a clean environment? Does the tutorial teach only one main path? Are optional branches outside the quickstart? Are example inputs, files, and names consistent?

## 2. How-to guides, deployment manuals, and SOPs

**Use when**: Readers understand the basic concepts and need to complete a specific task safely and reliably. An SOP also needs roles, triggers, execution frequency, and handoff requirements.

````markdown
# [Perform a specific operation]

## Goal and result
[Describe the system state after completion.]

## Scope
[Version, environment, cluster, region, tenant, or other boundary.]

## Prerequisites
| Item | Requirement | Check |
|---|---|---|
| [Permission or dependency] | [Specific requirement] | [Command or UI location] |

## Impact and risks
[Downtime, data, cost, security, or compatibility impact; any claim of no impact also needs a basis.]

## Procedure
### 1. [Action]
[Command, configuration, or UI operation.]

Expected result: [Observable state].

### 2. [Action]
[Continue; verify critical steps in place.]

## Verification
[Functional, monitoring, log, or test checks.]

## Rollback
[Triggers, steps, and post-rollback verification; state clearly if rollback is impossible.]

## Failure handling
| Symptom or error | Likely cause | Action |
|---|---|---|

## Execution record (optional for SOPs)
[Operator, time, environment, result, exceptions, and handoff.]
````

**Check**: Do high-risk commands follow warnings and backup requirements? Is the actor clear for each step? Are verification and rollback specified? Is unrelated product history or conceptual teaching omitted?

## 3. API, SDK, and configuration references

**Use when**: Readers need exact fields, parameters, return values, defaults, limits, and errors. Use a consistent, scannable structure rather than forcing reference material into narrative.

````markdown
# [Interface, method, or configuration item]

[One sentence describing its purpose and principal behavior.]

## Calling convention
- Method or import: [value]
- Path or signature: [value]
- Authentication and permissions: [requirements]
- Supported versions: [range]

## Parameters
| Name | Type | Required | Default | Constraints and description |
|---|---|---|---|---|
| [field] | [type] | [yes/no] | [value or none] | [units, enum, range, mutual exclusion] |

## Request example
```[language]
[Complete, minimal request]
```

## Response
| Field | Type | Description |
|---|---|---|

```json
[Response clearly labeled as an example]
```

## Errors and limits
| Error code or exception | Trigger | Handling |
|---|---|---|

- Timeout: [value and retry semantics]
- Rate limit or quota: [value and scope]
- Idempotency, pagination, ordering, or concurrency: [constraints]
````

**Check**: Do field names, types, and capitalization match their definitions? Do examples satisfy required-field and type constraints? Does the document distinguish “no default” from “default is empty”? Are version differences recorded? Are unknown fields marked for confirmation rather than guessed?

## 4. Concepts, architecture, and design decisions

**Use when**: Readers need to understand why a system is designed this way, how components cooperate, and what constraints and costs a choice entails. An architecture decision record (ADR) also needs status, date, and decision context.

````markdown
# [Concept, architecture, or decision]

## Problem
[Specific scenario, requirements, constraints, and measurable goals.]

## Scope and boundaries
[State positively what is included and where the design applies. Add explicit non-goals only to prevent likely reader misjudgment.]

## Core concepts
| Term | Definition | Distinction from related concepts |
|---|---|---|

## Structure and workflow
[Component responsibilities, dependency direction, and data or control flow; accompany figures with explanatory text.]

## Key decisions
### [Decision point]
- Choice: [option]
- Basis: [requirements, constraints, evidence]
- Cost: [complexity, cost, performance, security, or operational impact]

## Alternatives
[Alternatives and reasons they were not chosen; retain only when needed.]

## Constraints, failure modes, and safety boundaries
[Capacity, consistency, availability, permissions, data, and degradation behavior.]

## Verification and follow-up metrics
[How to demonstrate that the design meets its goals and what to observe after release.]
````

**Check**: Does the document distinguish facts, assumptions, and decisions? Does it explain trade-offs rather than merely list components? Does it avoid becoming an installation tutorial? Do figures and text agree? Are relevant failure modes and boundaries included without a generic limitations catalogue?

## 5. Troubleshooting

**Use when**: Readers need to recover a system from a symptom or error. Organize by observable symptoms and diagnostic paths, not internal teams or product modules.

````markdown
# [Symptom, error code, or failure scenario]

## Symptoms and impact
[Exact error text, triggering conditions, and affected scope; put exact error text in a code block.]

## Check first
| Check | Command or location | Normal result | Where to go if abnormal |
|---|---|---|---|

## Cause A: [specific cause]
- Evidence: [log, state, or test]
- Remediation: [steps]
- Verification: [recovery criterion]
- Rollback or containment: [when necessary]

## Cause B: [specific cause]
[Use the same structure.]

## If the problem persists
[Diagnostic information to collect, redaction requirements, escalation path, or support channel.]
````

**Check**: Can readers move from symptoms to diagnosis rather than merely read a list of possible causes? Does the document distinguish temporary recovery from root-cause repair? Does it avoid “try restarting” as a universal answer? Are logs redacted? Is recovery verified?

## 6. Release notes and migration guides

**Use when**: Readers need to assess the impact of version changes and complete an upgrade or migration.

````markdown
# [Product or component] [version] release notes

Release date: [confirmed date]

## Change summary
| Type | Change | Impact | Required action |
|---|---|---|---|
| Added/fixed/changed/deprecated/removed | [specific change] | [readers and environments] | [none or specific action] |

## Breaking changes
[Old behavior, new behavior, affected scope, and migration method.]

## Upgrade or migration
### Pre-checks
[Current version, backups, dependencies, and compatibility.]
### Procedure
[Ordered steps and expected results.]
### Verification
[Version, functional, and data checks.]
### Rollback
[Conditions, steps, and constraints.]

## Known issues
[Symptoms, affected versions, workarounds, and status; do not invent content when none is confirmed.]
````

**Check**: Are features, fixes, breaking changes, and deprecations distinguished? Are affected versions explicit? Can upgrade steps be rolled back, or are their constraints clear? Are dates and status supported by evidence?

## 7. READMEs and project entry points

**Use when**: Readers need to determine what a project does and whether it is usable, then enter a run, development, or contribution path. Keep the entry point concise and link long tutorials and reference details to dedicated documents.

````markdown
# [Project name]

[One paragraph describing the problem solved, primary users, and current status.]

## Capabilities and boundaries
- [Core capability]
- [Important limitation or supported platform, only when relevant to adoption]

## Requirements
[Runtime, dependencies, and permissions.]

## Quickstart
[Minimal installation, configuration, execution, and verification.]

## Common commands
| Command | Purpose | Expected result |
|---|---|---|

## Configuration
[Minimum necessary configuration; link to a reference for complete parameters.]

## Tests and troubleshooting
[Test commands, common issues, and links to detailed documents.]

## Documentation and contributing
[Documentation, code of conduct, and contribution paths; retain only real entry points.]

## License
[Confirmed license information.]
````

**Check**: Does the first paragraph answer “what is it and who is it for”? Does the quickstart produce a result? Are badges, links, and commands real and valid? Are project history, complete APIs, and long design discussions kept out of the README?

## 8. Technical and evaluation reports

**Use when**: Readers need to make judgments and take action based on research, tests, or analysis. Organize the main text around conclusions and their evidence, not the author's research chronology, and do not present every observation as equally important.

````markdown
# [Topic] technical report

> Evidence cutoff: [date]
> Verification status: [static review, partial execution, end-to-end reproduction, or unverified; match the actual scope]

## Conclusion summary
[List principal conclusions for the intended readers; distinguish facts, judgments, and unresolved items without narrating the research process.]

## Recommended actions
[List required reader actions, applicability conditions, and verification methods; delete this section when no action is needed.]

## Scope and evaluation questions
[Identify the intended readers, evaluated objects, versions, environment, and through-line questions. Define scope positively; add explicit exclusions only to prevent misjudgment.]

## Method
[Summarize only enough method to assess evidence credibility; put complete steps, tools, and raw records in an appendix or linked source.]

## Key findings
### [Self-explanatory finding title]
- Conclusion: [finding]
- Core mechanism: [design or cause producing the result; only the part needed to understand the conclusion]
- Key evidence: [data, configuration, log summary, or test directly supporting the conclusion]
- Impact: [affected objects, scope, and conditions]
- Conditions of validity: [conditions that change choices, actions, or interpretation; omit if positive scope is already clear or there is no new information]

[For comparative findings, state the baseline, workload, metric and aggregation, and comparison boundary. State relevant non-benefit, plateau, or regression conditions once near the result.]
[Order findings by importance to reader decisions, not discovery time.]

## Overall judgment and trade-offs
[Retain when cross-finding trade-offs are needed; explain options, basis, and costs.]

## Appendix
[Provide detailed methods, raw data, redacted logs, and secondary observations only when readers need traceability.]
````

**Check**: Does the report promptly answer “what is the conclusion, what supports it, what is the impact, and what happens next”? Are author work logs and self-justification removed? Does load-bearing evidence receive the main share of attention? Are raw material and secondary observations outside the through-line? Does the report avoid mechanically adding identical limitations, risks, and recommendations to every finding? Is there one primary conclusion summary rather than several redundant ones? Are versions, hardware, dependencies, configuration boundaries, and verification status preserved? If the material serves implementers, beginners, and auditors, has it been split into a main report, mechanism tutorial, and evidence appendix?
