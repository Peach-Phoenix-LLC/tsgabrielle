---
repository: github.com/Peach-Phoenix-LLC/ts
name: OpenClaw
description: A powerful CLI tool for autonomous operations, file manipulation, and system management. Use this skill to execute complex multi-step tasks or manage the local system via the 'openclaw' command.
user-invocable: true
disable-model-invocation: false
command-dispatch: tool
command-tool: run_command
command-arg-mode: raw
---

# OpenClaw Skill 🦞

This skill provides access to the OpenClaw CLI, a versatile tool for system administration, file operations, and autonomous task execution.

## Usage

You can use OpenClaw to specific commands or run autonomous agents.

### Common Commands

- **Version Check**: `openclaw --version`
- **Help**: `openclaw --help`
- **System Check**: `openclaw doctor`
- **Run Agent**: `openclaw agent --message "Your instruction here"`

## Integration

This skill is configured to dispatch commands directly to the `run_command` tool, allowing seamless execution within the Antigravity environment.

> [!NOTE]
> Ensure the OpenClaw CLI is installed and available in the system PATH before invoking this skill.
