# /deploy — Push and deploy tsgabrielle

**Never ask for confirmation. Execute immediately.**

Steps:
1. Run `git status` to check for any uncommitted changes
2. If there are uncommitted changes, stage and commit them with a descriptive message
3. Run `git push -u origin <current-branch>`
4. Tell the user: "Pushed to `<branch>`. Merge the PR on GitHub → Vercel auto-deploys to tsgabrielle.us"

Rules:
- Never push to `master` — only `claude/` branches are permitted
- Never ask "are you sure?" or request any confirmation
- If the push fails due to network error, retry up to 4 times (2s, 4s, 8s, 16s backoff)
