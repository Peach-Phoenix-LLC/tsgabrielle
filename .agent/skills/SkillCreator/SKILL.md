---
repository: github.com/Peach-Phoenix-LLC/ts
name: SkillCreator
description: A specialized skill for creating and maintaining other skills within the .agent/skills directory.
---

# Skill Creator

This skill is designed to streamline the creation of new skills for the Antigravity agent. It ensures adherence to the standard folder structure and YAML frontmatter requirements.

## Folder Structure

Every skill must live in `.agent/skills/<SkillName>/` and contain:

- `SKILL.md`: The primary instructions and metadata.
- `resources/`: (Optional) Templates, scripts, or assets.
- `scripts/`: (Optional) Supporting scripts or tools.

## Instructions for Creating a New Skill

1. **Naming**: Use PascalCase for the skill directory name (e.g., `CodeQuality`).
2. **Metadata**: The `SKILL.md` must start with YAML frontmatter containing `name` and `description`.
3. **Sections**: Include sections for Purpose, Core Instructions, and Usage Examples.
4. **Validation**: Ensure no external dependencies are required that aren't available in the current environment.

## Resources

- [Skill Template](file:///c:/Users/ChrisWork/Documents/tsg-us/.agent/skills/SkillCreator/resources/skill_template.md)
