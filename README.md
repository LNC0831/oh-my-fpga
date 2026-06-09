<div align="center">

# oh-my-fpga

**Don't memorize 500 tools. Describe the chip outcome you want.**

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Claude Code plugin](https://img.shields.io/badge/Claude%20Code-plugin-8A2BE2)](#install)
[![Powered by SynthPilot](https://img.shields.io/badge/powered%20by-SynthPilot-blue)](https://synthpilot.dev)

[SynthPilot MCP](https://github.com/LNC0831/SynthPilot) · [Website](https://synthpilot.dev) · [PyPI](https://pypi.org/project/synthpilot/)

</div>

> **English** | [简体中文](#简体中文)

A **free, open** companion skill pack for the [SynthPilot](https://synthpilot.dev) MCP
server. SynthPilot gives your AI ~500 atomic tools to drive an FPGA toolchain; **oh-my-fpga**
gives it **methodology** — named, opinionated workflows that turn those primitives into
one-sentence outcomes ("close timing", "audit CDC", "bring up a Zynq SoC").

It's the same idea that makes [oh-my-zsh](https://ohmyz.sh) great: a thin, markdown-only
**strategy layer** on top of a deep capability surface. The MCP is the orchestra; these
skills are the conductor. (The name is vendor-neutral on purpose — no EDA trademark.)

## Why this exists

An AI staring at 500 flat tool names has **capability but no strategy**. Ask it to "close
timing" and it doesn't know that means: synth → read WNS → diagnose critical paths →
classify the failure → apply the *safe* fix → re-run → repeat. oh-my-fpga encodes that
FPGA methodology once, in markdown, so every user gets an expert's playbook for free.

## Requires the SynthPilot MCP

These skills orchestrate the [**SynthPilot**](https://github.com/LNC0831/SynthPilot) MCP
server — install it first:

- `uv tool install synthpilot` → `synthpilot setup` (one guided command: Vivado + license + MCP — see [synthpilot.dev](https://synthpilot.dev))
- Vivado open with the SynthPilot Tcl server running (port 9999)
- A Claude Code client (skills are a Claude Code feature; see *Other clients* below)

## Install

**Plugin (recommended):** install the whole pack as a Claude Code plugin —

```
/plugin marketplace add LNC0831/oh-my-fpga
/plugin install oh-my-fpga
```

**Per-project:** copy a skill folder into your project's `.claude/skills/`:
```
your-project/.claude/skills/timing-closure/SKILL.md
```
Then just say *"close timing"* or invoke `/timing-closure`.

**Global:** drop the folders into `~/.claude/skills/` to use them everywhere.

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
revise → independent final-audit**, where a *separate* reviewer must sign off. A
deterministic check (zero-LLM) also validates each skill's required sections and cross-checks
every tool name against a freshly-introspected catalog of the live SynthPilot tools — so a
skill can never reference a tool that doesn't exist.

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

Skills are a Claude Code mechanism. For every other MCP client, the **same 13 workflows
ship as MCP prompts** built into the SynthPilot server (1.3.0+) — the prompt body *is* the
skill body (one source, no drift), so Cursor / Codex / Claude Desktop get the methodology
layer too. Pick them from your client's prompt (`/`) menu.

## License

[MIT](LICENSE) — free forever. oh-my-fpga is the open companion to the
[SynthPilot](https://synthpilot.dev) MCP; keeping it open and ungated is the point.

---

<a name="简体中文"></a>

## 简体中文

**别去记 500 个工具,直接说出你想要的芯片结果。**

这是 [SynthPilot](https://synthpilot.dev) MCP 服务器的一个**免费开源**配套 skill 包。
SynthPilot 给你的 AI 约 500 个原子工具来驱动 FPGA 工具链;**oh-my-fpga** 给它**方法论**
——一组命名的、有主见的工作流,把这些原子能力变成一句话的结果("收敛时序""审查 CDC"
"搭一个 Zynq SoC")。

这正是 [oh-my-zsh](https://ohmyz.sh) 之所以好用的思路:在深厚的能力面之上,叠一层薄薄的、
纯 markdown 的**策略层**。MCP 是乐队,这些 skill 是指挥。(名字刻意不含 EDA 厂商商标。)

### 为什么需要它

一个 AI 面对 500 个扁平的工具名,**有能力却没策略**。让它"收敛时序",它并不知道这意味着:
综合 → 读 WNS → 诊断关键路径 → 给违例分类 → 施加*安全*的修复 → 重跑 → 循环。oh-my-fpga
把这套 FPGA 方法论用 markdown 编码一次,于是每个用户都免费拿到一份专家级 playbook。

### 需要 SynthPilot MCP

这些 skill 编排的是 [**SynthPilot**](https://github.com/LNC0831/SynthPilot) MCP 服务器,
请先安装它:

- `uv tool install synthpilot` → `synthpilot setup`(一条命令搞定 Vivado + 授权 + MCP——见 [synthpilot.dev](https://synthpilot.dev))
- Vivado 打开,且 SynthPilot Tcl 服务器在运行(端口 9999)
- 一个 Claude Code 客户端(skill 是 Claude Code 的特性;其他客户端见下方)

### 安装

**插件(推荐)**:把整包作为 Claude Code 插件安装——

```
/plugin marketplace add LNC0831/oh-my-fpga
/plugin install oh-my-fpga
```

**按项目**:把某个 skill 文件夹复制进项目的 `.claude/skills/`:
```
your-project/.claude/skills/timing-closure/SKILL.md
```
然后直接说*"收敛时序"*或调用 `/timing-closure`。

**全局**:把文件夹放进 `~/.claude/skills/`,所有项目可用。

### 包含的 skill(v1 — 13 个)

| Skill | 说一句… | 作用 |
|---|---|---|
| **`timing-closure`** | "收敛时序""修 WNS" | 综合/实现 → 取指标 → 分析关键路径 → 分类 → 最小安全的约束/策略修复 → 循环到 WNS≥0 |
| **`cdc-audit`** | "查跨时钟域" | 枚举每个时钟交叉 → 结构分类 → 同步器 / `set_clock_groups` / `set_bus_skew`(绝不把真实交叉一笔勾销) |
| **`constraints-authoring`** | "写 XDC""还没有约束" | 从零写主时钟/生成时钟、I/O 延迟、例外,并用 `check_timing` 验证 |
| **`full-flow-demo`** | "RTL 到 bitstream""端到端" | 工程 → lint → 仿真 → 综合 → 实现 → 出 bitstream,每阶段设检查点 |
| **`sim-bringup`** | "跑仿真""跑 testbench" | `sim_compile` → `sim_run` → 从输出定位失败 |
| **`coverage-closure`** | "代码覆盖率" | 带覆盖率编译 → `sim_get_coverage` → 针对性补盲区 |
| **`lint-triage`** | "查 RTL""代码质量" | 全量 lint → 按严重度分类 → 修复或**有理由的** waiver |
| **`qor-report`** | "设计健康度""QoR" | 利用率+时序+功耗+拥塞+建议 → 一页评分卡 |
| **`utilization-reduction`** | "LUT 不够了""塞不下" | 层级利用率 → 找最大占用 → IP/策略/RTL 杠杆 |
| **`power-optimization`** | "降功耗" | 功耗拆解 → 时钟门控/策略/活动率杠杆 |
| **`zynq-bringup`** | "搭 Zynq SoC""PS7" | PS7 框图 → 自动化 → AXI 外设 → 地址映射 → 验证 → wrapper |
| **`ila-hw-debug`** | "上板调试""抓波形" | 插入/连接 ILA → 烧录 → 触发 → 读回波形 |
| **`bitstream-program`** | "烧板子""刷 flash" | 出 bitstream → 烧录器件 / SPI flash |

### 它们是怎么造出来的(以及如何扩展)

每个 skill 都是**机器生成、再经对抗式审查**的。生成器(一个多 agent 的 skill 工厂)把每个
主题送过 **author → 对抗式 verify(查幻觉工具名 + 方法论 + 安全) → revise → 独立终审**,
由一个*独立*的审查者签字放行。还有一道确定性检查(零 LLM)校验每个 skill 的必需小节,并把
每个工具名对照一份**实时 introspect 出来的** SynthPilot 工具目录核对——所以 skill 绝不会
引用一个不存在的工具。

工厂在这次构建中就抓到了一个真实硬件 bug:`zynq-bringup` 的草稿让 agent 用 `set_polarity`
去修 `proc_sys_reset` 的 `ext_reset_in` 极性不匹配,但该工具只控制*辅助*复位——发布前已修正。

要加 skill:往工厂的目录里追加主题再重跑。这个包就是用来持续生长的。

### 设计原则(由终审 gate 强制)

1. **先验证**。没有新鲜的工具输出做证据,绝不声称"时序已收敛""CDC 干净"(签核类声明需 post-impl 证据)。
2. **绝不假装通过**。不为了让数字变绿而消音/waive 真实的违例/DRC/lint/CDC。施加例外必须先声明假设并征求确认。
3. **最小安全改动优先**。约束/策略先于 RTL;RTL 改动只建议、不偷偷做。
4. **暴露权衡后停手**。安全选项用尽时,列出各选项及代价交还人类,不空转。

### 其他客户端(Cursor / Cline / Claude Desktop)

skill 是 Claude Code 的机制。对其他每一个 MCP 客户端,**这 13 个工作流会作为 MCP prompts
内置在 SynthPilot 服务端(1.3.0+)**——prompt 正文就是 skill 正文(同一份源、不漂移),
于是 Cursor / Codex / Claude Desktop 也能拿到方法论层。在客户端的提示(`/`)菜单里选用。

### 授权

[MIT](LICENSE) —— 永久免费。oh-my-fpga 是 [SynthPilot](https://synthpilot.dev) MCP 的开源
配套;保持开源、不设门槛,正是它的意义。
