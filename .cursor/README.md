# Cursor Architecture Bridge

Questa cartella implementa il bridge `.agent/` -> `.cursor/` senza modificare `.agent/`.

## Obiettivo

Rendere l'architettura Antigravity utilizzabile nativamente in Cursor mantenendo retrocompatibilita, riuso della conoscenza e governance uniforme.

## Copertura della feature

La feature bridge copre tutto il flusso operativo agentico a livello repository:

- definizione comportamenti always-on (`rules/`)
- specializzazione runtime (`agents/`)
- orchestrazione workflow slash (`commands/`)
- selezione modalità operative (`modes.json`)
- riuso base conoscenza (`skills/` via junction su `.agent/skills/`)
- configurazione integrazioni MCP (`mcp.example.json` + `mcp.json` locale non versionato)

## Struttura aggiornata

- `rules/`: 10 regole always-on in formato `.mdc`
- `agents/`: 20 subagenti Cursor con frontmatter nativo
- `commands/`: 38 comandi slash (workflow + shortcut specialisti)
- `skills/`: junction verso `.agent/skills/` (single source of truth)
- `modes.json`: catalogo 8 custom modes essenziali
- `mcp.example.json`: template pubblico per MCP server senza segreti

## Mapping operativo

- `.agent/agents/*.md` -> `.cursor/agents/*.md`
- `.agent/workflows/*.md` -> `.cursor/commands/*.md`
- `.agent/rules/*.md` -> `.cursor/rules/*.mdc`
- `.agent/skills/*` -> `.cursor/skills/*` (junction)
- `.agent/memory/*` -> caricato da `rules/000-memory-loader.mdc`

## Sicurezza configurazione MCP

- `mcp.json` locale contiene segreti e non deve essere committato.
- Usare `mcp.example.json` come baseline versionata.
- Caricare token sensibili via environment variables (`GITHUB_TOKEN`, ecc.).

## Manutenzione

1. Aggiorna prima `.agent/` (sorgente canonica).
2. Sincronizza wrappers `.cursor/` solo dove cambia il comportamento runtime.
3. Verifica che i mapping in questa README siano ancora coerenti con i file presenti.
4. Mantieni sempre `.agent/` intatta per retrocompatibilita con Antigravity IDE.

## Regole UI/UX

- La guida operativa unica per UI/UX Pro Max e `rules/ui-ux-pro-max.mdc`.
- Il file legacy `ui-ux-pro-max-defaults.mdc` e stato rimosso per evitare duplicazione; eventuali default vanno consolidati in `ui-ux-pro-max.mdc` o nelle skill collegate.

## Allineamento con la documentazione prodotto (Floomiq)

Le regole in `rules/` (auth, routing, admin, performance Supabase, i18n dove applicabile) descrivono **come** l’agent deve operare. La **mappa implementativa** dello stesso dominio nel codice applicativo (middleware Supabase, rotte protette, `useAdmin`, login) e documentata nel repo sotto `docs/architecture/middleware-auth-protected-routes.md` e riferimenti incrociati in `docs/features/`, `docs/execution-plans/08-admin.md` e `docs/security/RLS_AUDIT.md`. In caso di divergenza, la documentazione in `docs/` vince per dettaglio specifico Floomiq; le regole `.mdc` restano vincolanti per processo e governance agent.
