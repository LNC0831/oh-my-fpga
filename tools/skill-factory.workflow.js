export const meta = {
  name: 'oh-my-fpga-skill-factory',
  description: 'Mass-produce rigorous, verified FPGA-development skills for the oh-my-fpga pack (author -> adversarial verify -> revise -> independent audit)',
  phases: [
    { title: 'Author', detail: 'Draft each SKILL.md from real SynthPilot tools' },
    { title: 'Verify', detail: 'Adversarial review: hallucinated tools, methodology, safety' },
    { title: 'Revise', detail: 'Apply required fixes' },
    { title: 'Audit', detail: 'Independent final QA gate' },
  ],
}

// ---- Authoritative SynthPilot MCP tool catalog (skills may reference ONLY these names) ----
const TOOLS = `
PROJECT: create_project, open_project, close_project, get_project_info, add_source_file, add_constraint_file, add_simulation_file, create_source_file, create_constraint_file, create_testbench_file, set_top_module, list_source_files, list_constraint_files, list_simulation_files, list_all_files, remove_file, reorder_files, read_file, read_file_lines, update_file, replace_in_file, append_to_file, delete_file, add_verilog_define, set_verilog_defines, get_verilog_defines
SYNTH: run_synthesis, run_synthesis_async, get_synthesis_report, get_synthesis_warnings, set_synthesis_strategy, open_synthesized_design, check_synthesis_issues, check_synthesis_settings
IMPL: run_implementation, run_implementation_async, set_implementation_strategy, open_implemented_design, get_implementation_warnings, get_run_status, run_full_flow
REPORTS_TIMING: report_timing_summary, report_timing_detail, report_timing_path, report_timing_filtered, report_worst_timing_paths, extract_timing_metrics, analyze_critical_paths, analyze_clock_domain_timing, report_datapath_delay, report_high_fanout_nets, report_clock_networks, report_clock_interaction, report_clock_utilization, report_design_analysis, report_qor_suggestions, report_congestion, report_utilization, report_utilization_hierarchical, report_power, report_drc, report_methodology, report_io, report_pulse_width, report_route_status, report_ip_status, check_timing, get_all_clocks, get_clock_info
CONSTRAINTS: create_clock_constraint, create_generated_clock, create_io_constraint, set_input_delay, set_output_delay, set_false_path, set_multicycle_path, set_max_delay, set_min_delay, set_clock_groups, set_clock_uncertainty, set_bus_skew, set_data_check, save_constraints
CDC: report_cdc, report_cdc_details, report_cdc_filtered, check_cdc_lint
LINTER: run_linter, run_linter_to_file, run_full_lint_check, run_quick_lint, get_lint_violations, get_lint_rules, report_lint_violation_detail, set_lint_severity, enable_lint_rule, disable_lint_rule, waive_lint_violation, list_waivers, remove_waiver, export_lint_config, import_lint_config, check_syntax, check_syntax_file, check_latches, check_fsm, check_async_reset, check_coding_style, check_compile_order, check_port_width_mismatch, check_unconnected_ports, check_black_box, check_simulation_mismatch
SIM: sim_compile, sim_run, sim_run_async, sim_get_sim_status, sim_stop, sim_get_report, sim_get_compile_log, sim_probe, sim_list_signals, sim_get_coverage, sim_setup_report, set_simulation_top
BLOCK_DESIGN: create_block_design, open_block_design, close_block_design, save_block_design, list_block_designs, bd_add_ip, bd_create_ps7, bd_apply_ps7_preset, bd_configure_ps7, bd_get_ps7_config, bd_list_ps7_presets, bd_ps7_enable_uart, bd_ps7_enable_gpio, bd_ps7_enable_axi_port, bd_ps7_set_fclk, bd_create_mpsoc, bd_apply_mpsoc_preset, bd_configure_mpsoc, bd_get_mpsoc_config, bd_list_mpsoc_presets, bd_run_automation, bd_run_block_automation, bd_assign_addresses, bd_get_address_map, bd_validate_design, bd_generate_wrapper, bd_generate_output, bd_generate_output_and_wrapper, bd_wait_on_output_generation, bd_check_output_status, bd_connect_pins, bd_connect_interfaces, bd_make_pin_external, bd_make_intf_pin_external, bd_create_port, bd_create_clock_port, bd_create_reset_port, bd_list_ips, bd_list_ports, bd_list_nets, bd_get_info, bd_get_unconnected_pins, bd_create_proc_sys_reset, bd_create_clk_wiz, bd_create_axi_interconnect, bd_create_smartconnect, bd_create_axi_gpio, bd_create_axi_uartlite, bd_export_tcl (NOTE: many more bd_* IP-specific tools exist, e.g. bd_create_axi_*, bd_*_get_config, bd_*_set_*; ToolSearch to confirm exact names before using)
IP: configure_clocking_wizard, create_clocking_wizard, create_clocking_wizard_advanced, create_clocking_wizard_multi, get_clocking_wizard_config, configure_fifo, create_fifo, create_fifo_advanced, create_axi_stream_fifo, get_fifo_config, configure_memory, create_block_memory, create_block_memory_advanced, create_distributed_memory, get_memory_config, create_ip, list_available_ips, list_project_ips, search_ip, get_ip_config, get_ip_properties, set_ip_property, generate_ip_outputs, upgrade_ip, delete_ip
HW_DEBUG: open_hardware_manager, connect_hardware_server, list_hardware_targets, open_hardware_target, list_hardware_devices, refresh_hardware_device, disconnect_hardware, program_device, create_ila, create_vio, setup_debug, mark_debug_signal, write_debug_probes, implement_debug_core, list_debug_cores, list_debug_signals, hw_ila_list, hw_ila_set_trigger, hw_ila_set_trigger_condition, hw_ila_clear_trigger, hw_ila_run, hw_ila_wait, hw_ila_get_status, hw_ila_read_data, hw_vio_list, hw_vio_read, hw_vio_write, hw_vio_get_probes, hw_axi_read, hw_axi_write, hw_axi_burst_read, hw_axi_burst_write, hw_axi_list
PROGRAM: generate_bitstream, program_device, program_flash, generate_mcs, quick_program, add_flash_configuration, export_hardware
COVERAGE: sim_compile (coverage_types arg), sim_get_coverage
MISC: test_connection, vivado_version, get_help, get_license_status, list_templates, search_templates, get_template_info, get_template_example
`.trim()

// ---- Quality bar / exemplar (the timing-closure flagship, condensed) ----
const EXEMPLAR = `
The gold-standard skill (timing-closure) has this shape and discipline:
- YAML frontmatter: name + a trigger-rich multi-line description naming the situations that invoke it and that it requires the SynthPilot MCP.
- Sections: "When to use" / "When NOT to use" / "Prerequisites (verify first)" / a numbered METHODOLOGY with REAL tool calls / a CLASSIFICATION table mapping symptom->cause->safe fix where the task has decision logic / a measure->fix->re-measure LOOP with explicit STOP conditions / "Safety rails (do not violate)" / an "Output" format.
- Discipline baked into every step: measure with a tool before acting; classify before fixing; apply the SMALLEST SAFE change first (constraints/strategy before RTL); recommend RTL edits, never silently make them; ONE change-class per iteration so cause->effect is attributable.
- Safety rails example: "No fake-pass" (never apply set_false_path/set_multicycle_path/waivers to a path that could be real just to clear a violation; ask if unsure); "Evidence before claims" (a success claim REQUIRES fresh post-implementation tool output, never inferred); "Show your work" (before/after metrics each iteration).
`.trim()

const PRINCIPLES = `
RIGOR REQUIREMENTS (non-negotiable for every skill):
1. Verification-first: never claim success (timing met / CDC clean / lint clean / bitstream valid) without FRESH tool output proving it. Post-implementation evidence for signoff claims; synthesis numbers are necessary-not-sufficient.
2. Never fake-pass: do NOT silence/waive real violations, DRC, lint, or CDC just to make a number go green. Exceptions (set_false_path/set_multicycle_path/waive_lint_violation) require an explicit stated assumption and, if the item could be real, asking the user first.
3. Smallest safe change first: constraints/strategy before RTL; recommend RTL/architectural edits rather than silently applying them.
4. Surface trade-offs then stop: when safe options are exhausted, present options+costs and hand back to the human; do not thrash.
5. Real tools only: reference ONLY tool names from the TOOL CATALOG (exact names). Never invent a tool. If a needed capability is missing, say so.
6. Long flows: prefer the *_async + get_run_status / sim_get_sim_status pattern for multi-minute operations.
`.trim()

const SKILL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string', description: 'kebab-case skill name' },
    description: { type: 'string', description: 'the frontmatter description line(s)' },
    content: { type: 'string', description: 'the COMPLETE SKILL.md including YAML frontmatter and all sections' },
  },
  required: ['name', 'description', 'content'],
}

const REVIEW_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    verdict: { type: 'string', enum: ['pass', 'revise', 'reject'] },
    hallucinated_tools: { type: 'array', items: { type: 'string' }, description: 'referenced tool names NOT in the catalog' },
    methodology_issues: { type: 'array', items: { type: 'string' } },
    safety_issues: { type: 'array', items: { type: 'string' } },
    schema_issues: { type: 'array', items: { type: 'string' } },
    required_fixes: { type: 'array', items: { type: 'string' } },
  },
  required: ['verdict', 'hallucinated_tools', 'required_fixes'],
}

const AUDIT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    status: { type: 'string', enum: ['pass', 'needs-human-review'] },
    confidence: { type: 'number' },
    residual_issues: { type: 'array', items: { type: 'string' } },
  },
  required: ['status', 'confidence', 'residual_issues'],
}

// ---- Seed catalog of FPGA-development skills to produce ----
const CATALOG = [
  { name: 'cdc-audit', purpose: 'Audit and resolve clock-domain-crossing risks on a design', triggers: 'cdc analysis, check clock domain crossings, metastability review' },
  { name: 'full-flow-demo', purpose: 'Drive a design end-to-end RTL -> sim -> synth -> impl -> bitstream with checkpoints', triggers: 'rtl to bitstream, end to end, full flow, run everything' },
  { name: 'zynq-bringup', purpose: 'Stand up a Zynq-7000 PS7-based SoC block design', triggers: 'build a zynq soc, ps7, zynq bring up' },
  { name: 'lint-triage', purpose: 'Run RTL lint and triage violations into fixes vs justified waivers', triggers: 'lint my rtl, code quality, review my rtl' },
  { name: 'qor-report', purpose: 'Produce a one-page design-health scorecard (timing/area/power/congestion)', triggers: 'design health, qor, quality of results' },
  { name: 'utilization-reduction', purpose: 'Diagnose and reduce resource/area pressure when a design is too big for the part', triggers: 'running out of luts, too big for the part, reduce utilization, area' },
  { name: 'power-optimization', purpose: 'Analyze and reduce dynamic/static power on a design', triggers: 'reduce power, power optimization, power report' },
  { name: 'constraints-authoring', purpose: 'Author a correct XDC from scratch: primary clocks, generated clocks, I/O delays, and exceptions', triggers: 'write constraints, author xdc, set up timing constraints, no constraints yet' },
  { name: 'sim-bringup', purpose: 'Bring up a behavioral simulation: testbench -> compile -> run -> diagnose failures', triggers: 'simulate this, run the testbench, set up simulation' },
  { name: 'coverage-closure', purpose: 'Measure and improve simulation code coverage toward a target', triggers: 'code coverage, coverage closure, how much is covered' },
  { name: 'ila-hw-debug', purpose: 'Insert/connect an ILA, program the board, trigger, and read back waveforms', triggers: 'debug on hardware, insert ila, capture waveform on the board' },
  { name: 'bitstream-program', purpose: 'Generate a bitstream and program the device / SPI flash', triggers: 'program the board, generate bitstream, flash the device' },
]

function authorPrompt(item) {
  return [
    'You are a senior FPGA engineer AND a Claude Code skill author. Write a COMPLETE, rigorous SKILL.md for the open-source "oh-my-fpga" pack.',
    '',
    'These skills are a markdown strategy layer on top of the SynthPilot MCP server (an AI controls Xilinx Vivado through ~500 tools). The skill tells the AI which real tools to call, in what order, with what decision logic. It is a methodology PLAYBOOK, not code.',
    '',
    'TOPIC: ' + item.name + ' -- ' + item.purpose,
    'TRIGGER PHRASES (user might say): ' + item.triggers,
    '',
    'Write the SKILL.md to match the EXEMPLAR structure and discipline, fully tailored to this topic. Include: YAML frontmatter (name + a trigger-rich multi-line description that names the invoking situations and notes it requires the SynthPilot MCP / Vivado + Tcl server); "When to use"; "When NOT to use"; "Prerequisites (verify first)"; a numbered METHODOLOGY of REAL tool calls; a classification/decision table IF the task has branching logic; a loop + explicit STOP conditions IF iterative; "Safety rails (do not violate)"; an "Output" format. Make the methodology genuinely correct FPGA engineering for this specific topic.',
    '',
    PRINCIPLES,
    '',
    'TOOL CATALOG (use ONLY these exact names):',
    TOOLS,
    '',
    'EXEMPLAR (match the rigor & shape; do NOT copy its timing content):',
    EXEMPLAR,
    '',
    'Return: name (kebab), description (the frontmatter description text), content (the full SKILL.md including frontmatter).',
  ].join('\n')
}

function verifyPrompt(draft) {
  return [
    'You are a SKEPTICAL senior FPGA methodology engineer and a tool-catalog auditor. Adversarially review this SKILL.md for the "oh-my-fpga" pack. Be strict and assume it is flawed until proven otherwise.',
    '',
    'Report precisely:',
    '1. hallucinated_tools: EVERY MCP tool the skill references whose exact name is NOT in the TOOL CATALOG. (Cross-check every tool name token in the content.)',
    '2. methodology_issues: unsound/dangerous FPGA methodology -- wrong order of operations, treating synthesis timing as signoff, ignoring hold/min-delay, recommending false_path/multicycle/clock_groups to "fix" genuinely real paths, missing post-implementation evidence, incorrect Vivado/BD/IP sequencing, etc.',
    '3. safety_issues: missing/weak safety rails -- does it allow FAKE-PASSING (silencing or waiving real violations/DRC/lint/CDC without a stated, asked-for justification)? does it claim success without FRESH tool evidence? does it edit RTL without user approval?',
    '4. schema_issues: missing frontmatter name/description, missing required sections, weak/absent trigger phrases, no stop conditions for an iterative task.',
    '5. required_fixes: concrete, ordered fixes the author MUST make.',
    'verdict: pass (ship as-is) / revise (fixable) / reject (fundamentally wrong methodology).',
    '',
    'TOOL CATALOG (the ONLY valid tool names):',
    TOOLS,
    '',
    'SKILL UNDER REVIEW (name=' + draft.name + '):',
    draft.content,
  ].join('\n')
}

function revisePrompt(draft, review) {
  return [
    'Revise this SKILL.md to FULLY address the reviewer findings. Keep everything that is correct; change only what the review requires. Use ONLY real tool names from the catalog. Preserve the rigor (verification-first, never fake-pass, smallest safe change first).',
    '',
    'REVIEWER VERDICT: ' + review.verdict,
    'HALLUCINATED TOOLS TO REMOVE/REPLACE: ' + JSON.stringify(review.hallucinated_tools || []),
    'METHODOLOGY ISSUES: ' + JSON.stringify(review.methodology_issues || []),
    'SAFETY ISSUES: ' + JSON.stringify(review.safety_issues || []),
    'SCHEMA ISSUES: ' + JSON.stringify(review.schema_issues || []),
    'REQUIRED FIXES: ' + JSON.stringify(review.required_fixes || []),
    '',
    'TOOL CATALOG (the ONLY valid tool names):',
    TOOLS,
    '',
    'ORIGINAL SKILL.md:',
    draft.content,
    '',
    'Return: name, description, content (the corrected full SKILL.md).',
  ].join('\n')
}

function auditPrompt(revised) {
  return [
    'You are an INDEPENDENT final QA gate -- a different reviewer who did not write or revise this. Audit the revised SKILL.md one last time. Pass it ONLY if it is genuinely ship-ready.',
    '',
    'Verify:',
    '- Tool names: confirm NO referenced tool is outside the TOOL CATALOG (list any in residual_issues).',
    '- Methodology: sound, correct FPGA engineering for its topic; STRICT (no path to fake-pass; success demands fresh evidence; hold/signoff handled where relevant).',
    '- Safety rails present and real.',
    '- Schema complete (frontmatter name+description, sections, triggers, stop conditions if iterative).',
    '',
    'status: "pass" (ready to ship) or "needs-human-review" (any residual problem). confidence 0-1. residual_issues: specific remaining problems (empty if pass).',
    '',
    'TOOL CATALOG (the ONLY valid tool names):',
    TOOLS,
    '',
    'REVISED SKILL.md (name=' + revised.name + '):',
    revised.content,
  ].join('\n')
}

log('oh-my-fpga skill factory: producing ' + CATALOG.length + ' rigorous skills (author -> verify -> revise -> audit)')

const results = await pipeline(
  CATALOG,
  (item) => agent(authorPrompt(item), { label: 'author:' + item.name, phase: 'Author', schema: SKILL_SCHEMA }),
  (draft, item) => agent(verifyPrompt(draft), { label: 'verify:' + item.name, phase: 'Verify', schema: REVIEW_SCHEMA }).then((review) => ({ draft, review })),
  (vr, item) => (vr.review.verdict === 'pass'
    ? vr.draft
    : agent(revisePrompt(vr.draft, vr.review), { label: 'revise:' + item.name, phase: 'Revise', schema: SKILL_SCHEMA })),
  (revised, item) => agent(auditPrompt(revised), { label: 'audit:' + item.name, phase: 'Audit', schema: AUDIT_SCHEMA })
    .then((audit) => ({ name: revised.name || item.name, description: revised.description || '', content: revised.content, audit })),
)

const clean = results.filter(Boolean)
const pass = clean.filter((r) => r.audit && r.audit.status === 'pass')
const review = clean.filter((r) => !r.audit || r.audit.status !== 'pass')
log('Done: ' + pass.length + ' pass, ' + review.length + ' need human review, of ' + CATALOG.length)

return {
  total: CATALOG.length,
  produced: clean.length,
  pass: pass.length,
  needsReview: review.length,
  skills: clean.map((r) => ({
    name: r.name,
    status: r.audit ? r.audit.status : 'unknown',
    confidence: r.audit ? r.audit.confidence : null,
    residual_issues: r.audit ? r.audit.residual_issues : [],
    description: r.description,
    content: r.content,
  })),
}
