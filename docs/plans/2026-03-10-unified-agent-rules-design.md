# Design: Unified Deployment Rules & File Audit

**Date:** 2026-03-10  
**Branch:** gemini/printful-import

---

## Problem

Three AI agent instruction files (CLAUDE.md, GEMINI.md, AGENTS.md) have inconsistent deployment rules:
- CLAUDE.md: push immediately, no verification step
- GEMINI.md: push immediately + separate verification section
- AGENTS.md: no deployment rules at all

Also: ~20+ temporary files, old JSX duplicates, and build artifacts have accumulated in the repo.

---

## Deployment Rule Standardization

### Canonical Template (all three files)

1. On "deploy"/"push"/"ship"/"go live": immediately `git push -u origin <branch>`
2. Tell user: "Pushed. Merge the PR on GitHub → Vercel auto-deploys."
3. Verify: use Vercel MCP to check latest deployment status
4. Never ask for confirmation
5. Never push to main/master — only agent-prefixed branches

Branch prefixes:
- `CLAUDE.md`: `claude/*`
- `GEMINI.md`: `gemini/*`
- `AGENTS.md`: `<agent>/<feature>` (any non-protected branch)

Also standardize a **Verification** section (already in GEMINI.md, add to all):
- Never use local dev server to verify — always check live Vercel URL
- Never claim a fix works without verifying online

---

## File Audit

### Remove from git (git rm) + delete

| File | Reason |
|---|---|
| `src/components/Header.jsx` | Old JSX duplicate of `components/Header.tsx` |
| `src/components/Footer.jsx` | Old JSX duplicate of `components/Footer.tsx` |
| `content/legal-hub.md` | Not referenced anywhere in the app |
| `tmp_*.js` (10 files) | One-off debug scripts |
| `out.txt`, `page_content.txt`, `playwright_output.txt`, `users.txt` | Debug output |
| `refresh_printful.js`, `test_printful.js` | Loose test scripts (not in scripts/) |
| `tsconfig.tsbuildinfo` | Build cache, should never be in git |

### Delete untracked artifacts

- `gateway_restart.log`, `gateway_startup.log`, `pw_err.log`, `vercel_domain_fix.log`
- `C:UsersChrisWorkDocumentstsgabrielledocsplans/` (accidentally created empty dir)

### Update .gitignore

Add: `tsconfig.tsbuildinfo`, `tmp_*.js`, `.env.vercel`, `playwright-report/`, `test-results/`

### Empty dirs removed after cleanup

- `src/` (only contained the two old JSX files)
- `content/` (only contained the unused markdown file)
