# Technical Documentation Rewrite Examples

These examples use the fictional `acme-cli` and illustrative values to demonstrate writing and review methods; they do not describe real product behavior. Replace example content with verified facts when editing actual documents.

## Contents

1. [Remove a generic opening and state the task](#1-remove-a-generic-opening-and-state-the-task)
2. [Resolve ambiguous references](#2-resolve-ambiguous-references)
3. [Split long sentences without losing conditions](#3-split-long-sentences-without-losing-conditions)
4. [Turn a broad instruction into an actionable loop](#4-turn-a-broad-instruction-into-an-actionable-loop)
5. [Replace rhetoric with technical facts](#5-replace-rhetoric-with-technical-facts)
6. [Turn scattered statements into a searchable reference](#6-turn-scattered-statements-into-a-searchable-reference)
7. [Turn short questions into a diagnostic path](#7-turn-short-questions-into-a-diagnostic-path)
8. [Remove repetition without losing necessary consistency](#8-remove-repetition-without-losing-necessary-consistency)
9. [Keep code syntax out of quoted prose](#9-keep-code-syntax-out-of-quoted-prose)
10. [Replace an empty ending with a concrete next action](#10-replace-an-empty-ending-with-a-concrete-next-action)
11. [Keep author-process concerns out of the main text](#11-keep-author-process-concerns-out-of-the-main-text)
12. [Organize a report around conclusions rather than research activity](#12-organize-a-report-around-conclusions-rather-than-research-activity)
13. [Repair mechanical syntax, fragments, and punctuation clusters](#13-repair-mechanical-syntax-fragments-and-punctuation-clusters)
14. [Add the baseline, conditions, and mechanism to a comparative result](#14-add-the-baseline-conditions-and-mechanism-to-a-comparative-result)
15. [Describe a baseline's effective scope fairly](#15-describe-a-baselines-effective-scope-fairly)
16. [Distinguish observations, design choices, and proven properties](#16-distinguish-observations-design-choices-and-proven-properties)
17. [State limitations only at critical points](#17-state-limitations-only-at-critical-points)

## 1. Remove a generic opening and state the task

**Before**

> With the rapid development of cloud-native technology, deployment has become increasingly important. This document explores deployment from several perspectives in depth.

**After**

> This guide explains how to deploy a containerized application managed by `acme-cli` to a test environment and verify the deployment with a health check. It applies to `acme-cli 2.x` on Linux x86_64; production deployment is outside its scope.

**Why**: State the task, result, version, and boundary. Remove industry background that adds no information.

## 2. Resolve ambiguous references

**Before**

> After the gateway connects to the service, it restarts it, which may affect it.

**After**

> A configuration change restarts the gateway but not the service process. New connections may fail while the gateway restarts. Whether existing connections are interrupted depends on the connection-draining configuration.

**Why**: Name the actor and object and describe each component separately. Verify actual behavior rather than copying the example's conclusion into another document.

## 3. Split long sentences without losing conditions

**Before**

> When a request times out and still fails after three retries the system writes it to the dead-letter queue but if the queue is unavailable the request is dropped and logged so an alert is needed.

**After**

> After a request times out, the client retries it at most three times. If all retries fail, the system writes the request to the dead-letter queue.
>
> If the queue is unavailable, the system drops the request and records `DLQ_WRITE_FAILED`. Configure an alert for this log event to prevent silent request loss.

**Why**: Split the main path, failure path, and remediation. Preserve conditions, retry counts, log names, and consequences.

## 4. Turn a broad instruction into an actionable loop

**Before**

> Install and start the client, then check whether the service is healthy.

**After**

> 1. Install `acme-cli 2.x`:
>
>    ```bash
>    python -m pip install "acme-cli>=2,<3"
>    ```
>
>    After installation, confirm that the command is on the current environment's executable search path.
>
> 2. Check the version:
>
>    ```bash
>    acme-cli version
>    ```
>
>    The `Client` field should start with `2.`.
>
> 3. Start the service and check its state:
>
>    ```bash
>    acme-cli start
>    acme-cli status
>    ```
>
>    Startup is complete when `Ready` is `true`. If it is `false`, inspect `acme-cli logs --level error` and handle the reported error code.

**Why**: Turn “install, start, check” into commands, expected results, and a failure branch. Do not omit verification for the sake of brevity.

## 5. Replace rhetoric with technical facts

**Before**

> The system delivers ultimate, powerful, unrivaled performance and elegantly processes massive request volumes at lightning speed.

**After, when measurements exist**

> Under [confirmed hardware, dataset, and concurrency conditions], the system achieved a median throughput of [measured value] and a P99 latency of [measured value] for [request type]. See [benchmark location] for the complete method and raw results.

**After, when no measurements exist**

> The system uses [confirmed batching, caching, or asynchronous mechanism] to reduce [specific overhead]. No citable performance measurements are currently available, so this document makes no throughput or latency claim.

**Why**: When data exists, provide its conditions and metric definitions. Otherwise, describe the confirmed mechanism and evidence boundary without inventing numbers.

## 6. Turn scattered statements into a searchable reference

**Before**

> Timeout is important and defaults to 30. Retries default to 3 and can go up to 10. The region defaults to Beijing. Timeout ranges from 1 to 300, retries of 0 means no retries, and region must be a string.

**After**

| Setting | Type | Default | Allowed values | Description |
|---|---|---|---|---|
| `timeout` | Integer | `30` | `1–300` | Timeout for one request, in seconds |
| `retries` | Integer | `3` | `0–10` | Maximum retries after failure; `0` disables retries |
| `region` | String | `cn-beijing` | [confirmed region list] | Service region identifier |

**Why**: Tables suit technical reference information. Keep units, types, defaults, and boundaries beside their fields rather than turning them into prose for a more “natural” style.

## 7. Turn short questions into a diagnostic path

**Before**

> What if startup fails?
>
> Check the logs.
>
> Where are the logs?
>
> In the log directory.
>
> What if it still fails?
>
> Restart.

**After**

| Order | Symptom or check | Evidence | Action and verification |
|---|---|---|---|
| 1 | `acme-cli status` returns `false` | The service is not ready; this does not identify the root cause | Run `acme-cli logs --level error` and continue with the specific error |
| 2 | Logs contain `PORT_IN_USE` | The configured port is occupied | Change `port` or stop the occupying process, restart, and confirm `Ready=true` |
| 3 | Logs contain `CONFIG_INVALID` | Configuration validation failed | Correct the fields identified in the log, run `acme-cli config validate`, and restart |
| 4 | No error logs appear and the abnormal state persists | Current information is insufficient | Collect redacted configuration, version, and recent logs, then escalate to support |

**Why**: Replace context-free questions with symptoms, evidence, and action. Do not hide problems behind an unjustified restart.

## 8. Remove repetition without losing necessary consistency

**Before**

> First create the project. Then create the project directory. Next enter the project directory. Finally confirm that the project directory has been created.
>
> After creating the project, configure credentials. Before configuring credentials, create the project. Therefore, create the project before configuring credentials.

**After**

> 1. Create and enter the project directory:
>
>    ```bash
>    mkdir acme-demo
>    cd acme-demo
>    ```
>
> 2. Configure credentials. `ACME_ACCESS_KEY_ID` and `ACME_ACCESS_KEY_SECRET` must belong to an account with write access to the current project; do not commit secrets to version control.

**Why**: Merge tautologies while preserving actual dependencies and security constraints. Keep step numbering and field names consistent.

## 9. Keep code syntax out of quoted prose

**Before**

> In the terminal, enter “acme-cli config set region cn-beijing,” then enter “acme-cli status.” If it returns “ready,” that means success.

**After**

> Set the region:
>
> ```bash
> acme-cli config set region cn-beijing
> ```
>
> Check the status:
>
> ```bash
> acme-cli status
> ```
>
> The status check passes when the output contains `"ready": true`. Other values mean the service is not ready; inspect the error logs.

**Why**: Do not bury commands in prose quotation marks. Preserve code syntax and state an exact expected result rather than the conversational “that means success.”

## 10. Replace an empty ending with a concrete next action

**Before**

> In summary, proper configuration is very important. Only through full understanding and continuous optimization can the system remain stable over the long term.

**After**

> After configuration, run `acme-cli config validate` and `acme-cli status`. Once both checks pass, follow “Deploy to the test environment.” If validation fails, use the field name in the output to locate and correct the corresponding setting.

**Why**: End with verification, next steps, and a failure loop rather than a generic statement that could fit any document.

## 11. Keep author-process concerns out of the main text

**Task context**

> The author commissioned an upgrade guide and identified the readers as Linux-experienced operators and the through-line as “upgrade, verify, roll back if needed.” During the work, the author also discussed search methods, feared criticism for incomplete coverage, and requested every imaginable low-probability issue and liability statement.

**Before**

> Before writing this guide, the author searched multiple sources and repeatedly discussed every situation an upgrade might involve. Because environments may differ, this guide cannot guarantee coverage of every issue and accepts no responsibility for any operational result. To avoid misunderstanding, readers should exercise caution at every step; the author has considered as many potential criticisms as possible.

**After**

> This guide is for Linux-experienced operators and explains how to upgrade `acme-cli` from `2.x` to the currently supported `2.y` release and verify the result. Other major versions and bulk production upgrades are outside its scope.
>
> The upgrade restarts the local service. Perform it during a maintenance window and back up the configuration first. If it fails, follow the “Rollback” section.
>
> [Continue with only the upgrade, verification, and rollback steps. Keep search history, author concerns, and irrelevant low-probability scenarios out of the main text. List genuine unresolved items separately in delivery notes.]

**Why**: Use the author's audience and through-line information without turning the author's writing process or review anxiety into document content. Retain real operational risks once; delete generic disclaimers and self-justification.

## 12. Organize a report around conclusions rather than research activity

**Before**

> We first searched relevant material, then read the configuration, and finally inspected logs. During the search, we found setting A and then setting B. The configuration contained several historical versions, and the logs contained repeated records. The report lists every operation, output, and possible cause in the order encountered to show the analysis process.

**After**

> ## Conclusions
>
> [List the few conclusions most important to reader decisions and distinguish confirmed facts from unresolved judgments.]
>
> ## Key evidence
>
> [Present only the configuration, log summaries, or test results that support the main conclusions. Explain their relationship to the conclusions rather than listing every observation in discovery order.]
>
> ## Impact
>
> [State affected objects, scope, and conditions. Do not broaden impact without evidence.]
>
> ## Recommended actions
>
> [List concrete actions, responsible parties, and verification methods as needed; do not replace action names with meaningless labels.]
>
> ## Appendix
>
> [Provide methods, raw data, redacted logs, and secondary observations only when readers need traceability; otherwise omit the appendix.]

**Why**: Let conclusions and decisions determine detail, not the amount of work the author performed. Expand key evidence and keep process logs and duplicate evidence out of the through-line.

## 13. Repair mechanical syntax, fragments, and punctuation clusters

**Before**

> More parameters are not better; more detailed parameters are better. More warnings are not better; more prominent warnings are better.
>
> Check the version first.
>
> Check permissions first.
>
> Check disk space first.
>
> Warning—do not operate blindly—or the operation may fail!!!

**After**

> Parameter descriptions should cover type, default, constraints, and impact without listing irrelevant settings. Use warnings only for real risks that require readers to change an operation.
>
> Before proceeding, check the version, permissions, and available disk space. If any check fails, stop the upgrade, correct the issue, and repeat the checks.

**Why**: Remove repeated syntax and empty parallelism, combine related fragments into complete semantic units, and retain necessary order and conditions without using dashes, exclamation marks, or fragments for emphasis.

## 14. Add the baseline, conditions, and mechanism to a comparative result

**Before**

> The new approach improves performance by `2.3×` and generalizes well.

**After**

> Under [confirmed version, hardware, and workload], the new approach changed [metric] from [old value] to [new value] relative to [explicit baseline and version], using [mean, median, P99, or another aggregation]. The benefit primarily comes from [mechanism supported by evidence]. No benefit or a regression occurred under [relevant condition], so do not extrapolate this result to [scope where readers would otherwise misjudge it].

**Why**: State shared test conditions once at the start of the evaluation and keep only the necessary baseline, workload, and metric beside each result. Place non-benefit or regression results near the corresponding positive claim. Do not guess a mechanism when evidence is unavailable.

## 15. Describe a baseline's effective scope fairly

**Before**

> Traditional caching cannot handle dynamic input; the new approach completely solves this problem.

**After**

> Prefix caching can reuse computation effectively when the shared prefix remains unchanged. When text blocks are combined in different orders, it must still recompute the non-prefix portions. The new approach addresses only the latter case and does not claim to replace prefix caching for every workload.

**Why**: State what the baseline solves and where it remains effective before identifying the residual gap. Narrow the comparison to the actual difference rather than using a straw man to promote the new approach.

## 16. Distinguish observations, design choices, and proven properties

**Before**

> A small number of channels determine model accuracy, so scaling these channels is the necessary and only way to preserve accuracy.

**After**

> In [confirmed models, datasets, and quantization settings], experiments showed that a small number of high-activation channels had a large effect on quantization error. Based on this observation, the authors chose to scale the corresponding channels before quantization and evaluated the effect within [evaluation scope]. This is empirical evidence within that scope, not a universal exclusion of other models or methods.

**Why**: Connect the argument as “observed, therefore chose, evaluated within this scope.” Do not turn empirical observations into theorems or design choices into the only possible solution. Use “guarantee,” “necessary,” or “sufficient” only when an actual proof supports them.

## 17. State limitations only at critical points

**Before**

> This document does not discuss Windows, cover distributed deployment, represent production performance, or guarantee identical results for other versions. Although the supported platform and test environment were already stated, all uncovered scenarios are listed again here.

**After, when the boundary affects use and has not already been defined**

> This guide applies to single-node deployment on Linux x86_64. Performance results are based on version `2.3` and [test workload]. Revalidate other versions or deployment models.

**After, when the title, scope, or configuration table already makes the boundary clear**

> Do not repeat exclusions here. Add only new conditions that change reader action near the specific decision, comparison, or operation.

**Why**: Prefer positive scope and do not add a standalone “Limitations” section by default. Use explicit “not supported” or “does not imply” statements only when readers are likely to make a harmful default assumption. Delete irrelevant branches and repeated disclaimers.
