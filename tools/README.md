# Skill factory

`skill-factory.workflow.js` is the multi-agent workflow that generates the skills in
this pack. It is **not** a standalone Node script — it runs inside the Claude Code
`Workflow` runtime (it uses the `agent()` / `pipeline()` / `log()` globals).

## What it does

For every topic in its `CATALOG`, it runs a pipeline:

```
author → adversarial verify → revise → independent final-audit
```

- **author** writes a complete `SKILL.md` using ONLY real SynthPilot tool names (the
  authoritative tool catalog is embedded as `TOOLS`).
- **verify** is a skeptical FPGA-methodology + tool-name auditor (flags hallucinated
  tools, unsound methodology, fake-pass paths, schema gaps).
- **revise** applies the required fixes.
- **final-audit** is a *separate* reviewer that must sign off (`pass` /
  `needs-human-review`). Authoring and review never share an agent.

It returns `{ total, pass, needsReview, skills:[{name, status, confidence, residual_issues, content}] }`.

## Run / extend it

From a Claude Code session (it needs the SynthPilot MCP connected so agents can
`ToolSearch`-verify tool signatures):

1. To **add skills**, append entries to `CATALOG` (`{ name, purpose, triggers }`).
2. Re-run with the `Workflow` tool:
   `Workflow({ scriptPath: "…/oh-my-fpga/tools/skill-factory.workflow.js" })`
3. Write each returned `skills[].content` to `skills/<name>/SKILL.md`, and human-review
   any `status: needs-human-review`.

Keep the `TOOLS` catalog in sync with the SynthPilot MCP as new tools ship — it is the
ground truth the author/verify/audit agents validate against.
