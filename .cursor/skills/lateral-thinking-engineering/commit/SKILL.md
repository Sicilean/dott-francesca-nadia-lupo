---
name: commit
description: >-
  Runs the Sicilean monorepo ship workflow: inventory uncommitted files, update
  documentation in depth across the repo for those changes, create logically
  grouped commits (short subject plus specific body), then push using the
  default Git identity for all commits except the tip, which uses Sicilean
  author/committer and a configurable [Name] | subject prefix. On first use
  per machine, asks once for the prefix label and stores it in a gitignored
  local file. Use when the user invokes /commit or wants doc-plus-commit-plus-push
  with a Sicilean tip commit.
disable-model-invocation: true
---

# /commit — Doc refresh, grouped commits, dual-identity tip push

This skill is **manual-only** (`disable-model-invocation: true`). The human invokes it from **Agent** chat by typing **`/commit`** (or choosing the **commit** skill from the slash menu).

**Scope:** Loaded from this repository’s [`.cursor/skills/commit/`](.). It applies when the Cursor workspace root is **`sicilean-platform`**. For other repositories, copy this folder to `~/.cursor/skills/commit/` (same `name` and folder name `commit`) if you want the same slash command globally on that machine.

---

## `COMMIT_SUBJECT_PREFIX` (per machine, ask once)

The short label used in the tip commit subject as **`[<COMMIT_SUBJECT_PREFIX>] | `** (literal brackets and pipe; space after `|`).

| Source           | Behavior                                                                                                                                                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Local file**   | Path: **`.cursor/skills/commit/commit-prefix.local`** (repo root–relative). **UTF-8, exactly one line**, trimmed. If it exists and the line is non-empty after trim, use it as `COMMIT_SUBJECT_PREFIX` and **do not ask** the user.                                                                           |
| **First run**    | If the file is **missing** or the line is **empty**, ask **once** (same Agent session, **before** inventory): \*"This machine has no saved tip commit label yet. What short name should appear as `[<name>]                                                                                                   | `on Sicilean tip commits? (e.g. your first name). **Press Enter or reply`Sicilean`to use the default`Sicilean`.** This is stored only on this computer in `.cursor/skills/commit/commit-prefix.local` (gitignored)."\* |
| **Saving**       | Trim the reply. If empty after trim, use **`Sicilean`**. Strip surrounding `[` `]` if the user pasted a full token like `[Dany]`. Use **only the first line** if multiple lines were sent. Write **only that single line** to `commit-prefix.local` (create the directory if needed). Never commit this file. |
| **Change later** | The human may delete `commit-prefix.local` to be prompted again, or edit the file manually (one line).                                                                                                                                                                                                        |

**Default when no file exists yet:** **`Sicilean`** (used after Enter / empty reply).

---

## Shared defaults in this `SKILL.md` (tip Git identity)

The agent MUST read these for the **tip** commit only (Git author/committer, not the subject prefix):

| Variable           | Meaning                                                     | Value               |
| ------------------ | ----------------------------------------------------------- | ------------------- |
| `TIP_AUTHOR_NAME`  | Git author/committer **name** for the **last** commit only  | `Sicilean`          |
| `TIP_AUTHOR_EMAIL` | Git author/committer **email** for the **last** commit only | `dev@sicilean.tech` |

All commits **before** the tip use the repository’s normal `git config` identity (typically personal — do not override unless the user asks).

---

## Verbatim workflow (execute in order)

When this skill is active, perform **exactly** this sequence unless the user explicitly narrows scope in the same turn.

0. **`COMMIT_SUBJECT_PREFIX` (mandatory first):** Resolve using the section **COMMIT_SUBJECT_PREFIX (per machine, ask once)** at the top of this file. Do not skip: if the local file is missing, **stop and ask** the user for the label (or Enter for **Sicilean**), then write `commit-prefix.local`, then continue.

1. **Look at all the uncommitted files** (`git status -sb`, `git diff`, `git diff --cached`). Summarize what changed and why it hangs together.

1.bis **Scoped pre-commit deep-audit (feature commits only).** Decide whether this batch is a **feature commit** — i.e. it changes product/source behavior (`feat`/`fix`/`refactor` touching `apps/*/src`, `packages/*/src`, `websites/*/src`, `services/*`, migrations, or server logic). **Skip this step entirely** for purely **internal/mechanical** changes — the same class defined in step 2.bis (chore, lockfile, generated artifact, copy/doc-only edit, dependency bump with no behavior change, devx script, agent-config under `.cursor`/`.claude`/`.opencode`). When it is a feature commit:

- Run **`/deep-audit --changed --light`** (the lightweight diff-scoped mode in [`.cursor/skills/deep-audit/SKILL.md`](../deep-audit/SKILL.md)). It scopes itself to **only the workspaces this diff touches** (mapped from `git diff --name-only`), never the whole monorepo, and runs a single reduced wave weighted to the changed files — no macro-loop, no web benchmark.
- **P1/P2/P3 findings are advisory:** summarize them in chat and fold a short **`audit notes:`** trailer into the relevant commit body (and/or spawn task chips). They do **not** block — continue to step 2.
- **A confirmed P0 blocks:** if the audit adversarially confirms a P0 (leaked secret, `SUPABASE_SERVICE_ROLE_KEY`/service-role reachable from a client bundle or missing `server-only`, a missing-RLS mutation, an auth/MFA bypass, a payment double-charge path), **stop and surface it to the human before committing anything.** Offer to fix it first, or proceed only on explicit confirmation. Never auto-commit over a confirmed P0.
- Escalate scope only if the human passes `--audit=full` in the same `/commit` turn (then run the full `/deep-audit` on the touched workspaces instead of the light pass).

2. **Update the documentation** related to **all** uncommitted files **in depth**; documentation must **cover the modified feature across the entire project** (root `README.md`, `AGENTS.md`, `docs/`, per-app `README.md` / `AGENTS.md` when those areas changed). Respect [`.cursor/skills/sicilean-i18n/SKILL.md`](../sicilean-i18n/SKILL.md) whenever you touch **user-visible** UI copy; prose in README/docs may follow repo language conventions.

2.bis **Update the `knowledge/` wiki** (Sicilean Obsidian vault) — **before** staging anything. If the uncommitted changes introduce or alter an **architectural concept**, **entity** (product, package, service, model, funding program, person/org), **decision**, or **product capability**, invoke [`.cursor/skills/knowledge-bridge/SKILL.md`](../knowledge-bridge/SKILL.md) to **synthesize and link** the relevant `knowledge/` page (governance-first: never bulk-copy existing repo docs — point `canonical_source` at them). Then:

- Update or create the atomic page per `knowledge/SCHEMA.md` (one concept per page, BLUF, ≥2 `[[wikilinks]]`, mandatory `summary` + `canonical_source`).
- Add the one-line `summary` to `knowledge/index.md` (bump the count) and append an entry to `knowledge/log.md`.
- Run a lint pass with [`.cursor/skills/sicilean-wiki/SKILL.md`](../sicilean-wiki/SKILL.md) (orphan pages, broken `[[wikilinks]]`, frontmatter validity, stale `updated`, size > 200 lines). Fix any **blocking** issues before continuing to step 3.
- If the change is purely **internal/mechanical** (chore, lockfile, generated artifact, copy fix, dependency bump with no behavior change, devx script) and does **not** introduce or move a concept/entity/decision/capability, **skip 2.bis** and note the reason in the commit body (e.g. `no knowledge/ update: mechanical bump`).

3. **Prepare logically structured commits** (group files sensibly). For **each** commit use:
   - **First line:** descriptive but **short** commit message (Conventional Commit style encouraged, e.g. `docs: …`, `feat(foodli): …`).
   - **Following lines:** short but **very specific** description of what changed (body).
   - **Do not** use asterisks or placeholder stars in real commit messages; the user’s `** … **` markers were only examples.

3.bis **Deploy intent — Full Agentic Vercel gating (mandatory before push).** Vercel is **default-deny on every branch** ([`scripts/vercel-ignore-build-step.sh`](../../../scripts/vercel-ignore-build-step.sh)): a project builds ONLY when the tip commit carries an explicit deploy tag. The agent owns that decision entirely:

- Run `bash scripts/commit-deploy-intent.sh`. Stdout = candidate Turbo workspace names with certain app/website hits; stderr `shared/root paths touched` = fan-out risk, never auto-tag.
- **Certainty rule:** append `[vercel deploy <workspace>]` (workspace `name` from the helper, or its slug alias from [`scripts/vercel-projects.json`](../../../scripts/vercel-projects.json)) to the **tip commit body** — one tag per app that must go live — ONLY when **100% certain** this push must deploy now (user explicitly asked for a deploy/preview, or a user-facing prod fix destined for `main` in this push). Default is **NO tag** (docs-only, chore, lockfile-only, internal tooling, uncertain cases). When no tag: record `no vercel tag: <reason>` in the tip body so the skip is auditable.
- **NEVER** emit bare `[vercel deploy]` (fleet-wide build = the cost problem this policy kills); break-glass only on explicit human order. `packages/*`-only changes fan out across the Turbo graph — do not tag, surface to the human instead.
- Tags live on the **tip commit** (Vercel reads `git log -1`). **Squash-merge warning:** GitHub squash uses the PR title as the merge message and drops branch tags — when announcing the push, restate the tags so the human copies them into the PR title/body (e.g. `… [vercel deploy foodli-web]`).
- **A merge commit or an empty commit carrying the tag does NOT build** (observed 2026-09-10: `e82cf4e3a`). `git merge` and `git commit --allow-empty` produce no file diff for `turbo-ignore`/`vercel-ignore-build-step.sh` to key on, so the deploy shows **"Skipped - Not affected"** even with `[vercel deploy <workspace>]` in the message. When a merge must trigger a deploy, put the tag on a commit that also touches a real file under the app's root (a doc bump, a trivial version-stamp file, or fold the merge's payload into a follow-up commit that changes something) — never rely on the tag alone surviving a no-diff commit.

## Pre-PR checklist (dev → main promotion)

Before opening or updating a PR that promotes `dev` into `main` (or any long-lived branch merge), run both of these — cheap, and they catch the two landmines that have bitten this repo:

1. **Dry-run the merge for real conflicts:** `git merge-tree --write-tree <base> <branch>` (or `git merge-tree $(git merge-base main dev) main dev` for a three-way preview) before assuming a fast-forward or clean auto-merge — surfaces conflicts without touching the working tree.
2. **Duplicate migration version check:** two branches can each add a `supabase/migrations/` file with the _same_ 14-digit version prefix under different filenames (identical or near-identical SQL) — `supabase db push` keys off `schema_migrations.name`, so carrying both breaks reconciliation. Run: `ls supabase/migrations | sed -E 's/^([0-9]{14})_.*/\1/' | sort | uniq -d` on the merged tree; any output means resolve to a single filename (keep whichever name is already recorded in `schema_migrations` on DEV/PROD — see `docs/supabase-migrations.md` §6) before merging. Full 2026-09-10 incident: `.claude/memory/github-actions-billing-block-and-dup-migration-version.md`.
3. **GitHub Actions billing block — check annotations before debugging CI.** If every workflow job on a PR fails in ~3 seconds with no useful log, open the failed check's **annotations** (not the raw log) first — an org-wide billing hold shows as _"The job was not started because recent account payments have failed or your spending limit needs to be increased"_ and no code ran. Do not start bisecting the diff for a CI regression until you've ruled this out.

4. **Push:** After commits are created, **push** them to the configured upstream (e.g. `git push` or `git push origin <branch>` as appropriate).

5. **Git identity rule for the batch:**
   - **All commits except the last** must use the **default** Git author/committer (whatever `git config` resolves for this repo — typically the user’s **personal** account). Do **not** set `GIT_*` env vars for those commits.
   - The **very last** commit (tip) must be created with **author and committer** set to `TIP_AUTHOR_NAME` / `TIP_AUTHOR_EMAIL`, and its **subject** must **start with** **`[<COMMIT_SUBJECT_PREFIX>] | `** (use the value resolved in step 0). Example: `[Sicilean] | docs: align AGENTS` or `[Dany] | fix(foodli): …` depending on the saved prefix.
   - Then **push** (one push after all commits is fine, or push after tip only if commits were already pushed — prefer a single batch push when possible).

**Ordering note:** If there is only **one** commit in the batch, that commit **is** the tip: use Sicilean identity + **`[<COMMIT_SUBJECT_PREFIX>] | `** on its subject, then push.

6. **Post-push Vercel deploy verification (tagged apps only):** Read the deploy tags from the tip commit message (`[vercel deploy <workspace>]` / `[vercel build <workspace>]` / `[vercel only <workspace>]`). If **none**, skip this step with a one-line note (`no vercel tag — all projects skipped by default-deny`). Otherwise spawn **`@.cursor/agents/vercel-deploy-guardian.md`** (or invoke manually) **only for the tagged workspaces**:
   - Checks the latest Vercel deployment status for the affected app.
   - If `ERROR` → reports the build log errors, spawns `@.cursor/agents/debugger.md` for root-cause, then **fix and re-push** before declaring done.
   - If `BUILDING` → polls up to 120s, reports when ready/failed.
   - If `READY` → validates the deployed URL returns HTTP 200 and has no client-error patterns.
   - Reports the final status and deployed URL.
   - **SHORTCUT for counselhelp-web dev deploys:** the deployed dev URL is `https://counsel-help-git-dev-sicileans-projects.vercel.app` — fetch it directly to validate the deployment landed.
   - If Vercel CLI token is unavailable, fall back to `curl`/`WebFetch` on the known deployed URL, checking for HTTP 200 and absence of build-error markers in the HTML.

---

## Tip commit: shell commands (copy-paste patterns)

Replace `<PREFIX>` with the resolved `COMMIT_SUBJECT_PREFIX` (no brackets in the variable). Replace Sicilean email/name only if `SKILL.md` table above was changed.

### PowerShell (Windows)

Run from repo root **only for the tip commit** (after staging files for that commit only):

```powershell
$env:GIT_AUTHOR_NAME = "Sicilean"
$env:GIT_AUTHOR_EMAIL = "dev@sicilean.tech"
$env:GIT_COMMITTER_NAME = "Sicilean"
$env:GIT_COMMITTER_EMAIL = "dev@sicilean.tech"
git commit -m "[<PREFIX>] | type(scope): short subject here" -m "Specific body: what changed and where."
Remove-Item Env:GIT_AUTHOR_NAME, Env:GIT_AUTHOR_EMAIL, Env:GIT_COMMITTER_NAME, Env:GIT_COMMITTER_EMAIL -ErrorAction SilentlyContinue
```

### Bash (macOS / Linux)

```bash
export GIT_AUTHOR_NAME="Sicilean"
export GIT_AUTHOR_EMAIL="dev@sicilean.tech"
export GIT_COMMITTER_NAME="Sicilean"
export GIT_COMMITTER_EMAIL="dev@sicilean.tech"
git commit -m "[<PREFIX>] | type(scope): short subject here" -m "Specific body: what changed and where."
unset GIT_AUTHOR_NAME GIT_AUTHOR_EMAIL GIT_COMMITTER_NAME GIT_COMMITTER_EMAIL
```

---

## Safety (non-negotiable)

- Never stage or commit `.env`, `.env.local`, keys, PEMs, or credential files.
- Never stage **`commit-prefix.local`** (it must remain untracked; it is gitignored).
- Never `git push --force` to `main`, `master`, or `develop`.
- Do not use `git add -i` or `git rebase -i` from agent automation (interactive; breaks in agent shells). Use explicit paths: `git add path/to/file …`.
- If `git push` fails, report the error; do not rewrite published history without explicit user consent.

---

## Git / SSH reminder

This skill does **not** configure SSH remotes or GitHub accounts. Machine setup for `github-work` vs `github.com` lives in [`docs/cursor-prompt-bootstrap-git-ssh-dual-github.md`](../../../docs/cursor-prompt-bootstrap-git-ssh-dual-github.md).

---

## How the human invokes this skill

1. Open Cursor with the **workspace folder** = **`sicilean-platform` repo root** (the directory that contains `.cursor/`).
2. Open **Agent** chat (not only Ask).
3. Type **`/commit`**. Cursor may resolve the **commit** skill (`.cursor/skills/commit/`) or the **commit** command ([`.cursor/commands/commit.md`](../commands/commit.md)); both reference this `SKILL.md`. You can also type: `Run the /commit skill on my current uncommitted changes.`
4. **First time on this computer:** answer the one-time prompt for **`[<name>] |`** or press Enter to keep **Sicilean**.
5. Confirm branch and that no secrets are included if the agent asks.

After pulling this repo on another machine, the skill is already present under `.cursor/skills/commit/` — each machine gets its own `commit-prefix.local` after the first run.
