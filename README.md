# oh-my-fpga

> Don't memorize 500 tools. Describe the chip outcome you want.

A **free, open** companion skill pack for the [SynthPilot](https://synthpilot.dev) MCP
server. SynthPilot gives your AI ~500 atomic tools to drive an FPGA toolchain; **oh-my-fpga**
gives it **methodology** — named, opinionated workflows that turn those primitives into
one-sentence outcomes ("close timing", "audit CDC", "bring up a Zynq SoC").

It's the same idea that makes [oh-my-zsh](https://ohmyz.sh) great: a thin, markdown-only
**strategy layer** on top of a deep capability surface. The MCP is the orchestra; these
skills are the conductor. (The name is vendor-neutral on purpose — no EDA trademark.)

---

## Why this exists

An AI staring at 500 flat tool names has **capability but no strategy**. Ask it to "close
timing" and it doesn't know that means: synth → read WNS → diagnose critical paths →
classify the failure → apply the *safe* fix → re-run → repeat. oh-my-fpga encodes that
FPGA methodology once, in markdown, so every user gets an expert's playbook for free.

Bonus: each skill is also a **demo**. Recording an AI running `/timing-closure` end-to-end
is exactly the hero asset the website and GitHub page are missing.

## Prerequisites

- The **SynthPilot MCP** configured in your AI client (`pip install synthpilot` → `synthpilot install`)
- Vivado open with the SynthPilot Tcl server running (port 9999)
- A Claude Code client (skills are a Claude Code feature; see *Other clients* below)

## Install

**Per-project:** copy a skill folder into your project's `.claude/skills/`:
```
your-project/.claude/skills/timing-closure/SKILL.md
```
Then just say *"close timing"* or invoke `/timing-closure`.

**Global:** drop the folders into `~/.claude/skills/` to use them everywhere.

**Plugin (recommended):** install the whole pack as a Claude Code plugin —

```
/plugin marketplace add LNC0831/oh-my-fpga
/plugin install oh-my-fpga
```

## The skills (v1 — 13)

| Skill | Say… | What it orchestrates |
|---|---|---|
| **`timing-closure`** | "close timing", "fix WNS" | synth/impl → metrics → `analyze_critical_paths` → classify → safe constraint/strategy fix → loop until WNS ≥ 0 |
| **`cdc-audit`** | "check clock domain crossings" | `report_clock_interaction` → `check_cdc_lint`/`report_cdc` → classify each crossing → synchronizer / `set_clock_groups` / `set_bus_skew` (never waive a real crossing) |
| **`constraints-authoring`** | "write my XDC", "no constraints yet" | author primary/generated clocks, I/O delays, and exceptions from scratch; verify with `check_timing` |
| **`full-flow-demo`** | "rtl to bitstream", "end to end" | project → lint → sim → synth → impl → `generate_bitstream`, with a checkpoint gate at each stage |
| **`sim-bringup`** | "simulate this", "run the testbench" | `sim_compile` → `sim_run` → diagnose failures from captured output |
| **`coverage-closure`** | "code coverage" | `sim_compile(coverage_types=…)` → `sim_get_coverage` → target gaps |
| **`lint-triage`** | "lint my rtl", "code quality" | `run_full_lint_check` → triage by severity → fix or **justified** waiver |
| **`qor-report`** | "design health", "qor" | utilization + timing + power + congestion + `report_qor_suggestions` → one-page scorecard |
| **`utilization-reduction`** | "running out of LUTs", "too big" | hierarchical utilization → worst offenders → IP/strategy/RTL levers |
| **`power-optimization`** | "reduce power" | `report_power` breakdown → clock-gating / strategy / activity levers |
| **`zynq-bringup`** | "build a zynq soc", "ps7" | PS7 BD → automation → AXI peripherals → address map → validate → wrapper |
| **`ila-hw-debug`** | "debug on hardware", "capture waveform" | insert/connect ILA → program → trigger → `hw_ila_read_data` |
| **`bitstream-program`** | "program the board", "flash" | `generate_bitstream` → `program_device` / `program_flash` |

## How these were built (and how to extend them)

Every skill is **machine-generated, then adversarially audited**. The generator (a
multi-agent skill factory) runs each topic through
**author → adversarial verify (hallucinated-tool + methodology + safety check) →
revise → independent final-audit**, where a *separate* reviewer must sign off. Tool names
are validated against the real SynthPilot catalog, so skills never reference a tool that
doesn't exist.

The factory already caught a real hardware bug during this build: a `zynq-bringup` draft
told the agent to fix a `proc_sys_reset` `ext_reset_in` polarity mismatch with
`set_polarity`, which only controls the *auxiliary* reset — corrected before shipping.

To add skills: append topics to the factory's catalog and re-run. The pack is meant to
grow continuously.

## Design principles (enforced by the audit gate)

1. **Verification-first.** Never claim "timing closed" / "CDC clean" without fresh tool
   output proving it (post-implementation evidence for sign-off claims).
2. **Never fake-pass.** Don't silence or waive a real violation/DRC/lint/CDC just to make
   a number go green. Exceptions require a stated assumption and asking first.
3. **Smallest safe change first.** Constraints/strategy before RTL; recommend RTL edits,
   don't silently make them.
4. **Surface trade-offs, then stop.** When safe options are exhausted, report options and
   costs and hand back to the human — don't thrash.

## Other clients (Cursor / Cline / Claude Desktop)

Skills are a Claude Code mechanism. For other MCP clients, the same workflows can ship as
**MCP prompts** (`@mcp.prompt()` in the SynthPilot server) — client-agnostic slash-command
templates. Candidate follow-up so the methodology layer isn't Claude-Code-only.

## License

Open source (MIT proposed) — free forever. This pack is top-of-funnel for the SynthPilot
MCP; keeping it open and ungated is the point.
