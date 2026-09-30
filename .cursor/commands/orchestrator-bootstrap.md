# /orchestrator-bootstrap

Protocollo standard per avviare orchestrazioni multi-agent senza perdere personalita', memory, skill e vincoli di progetto.

## Perche' esiste

Durante le esecuzioni precedenti si e' osservato che prompt subagent troppo "nudi" causano:

- deleghe senza contesto architetturale
- output disallineati alle regole always-on
- review incompleta o incoerente tra specialisti

In particolare: NON basta scrivere il nome dell'agente — occorre includere il **path del file di personalita'** come riferimento esplicito nel prompt (`@.cursor/agents/<nome>.md`), altrimenti l'agente non carica il proprio profilo completo.

## Bootstrap obbligatorio (ordine)

1. **Identita' agente — con path obbligatorio**
   - Carica la personalita' completa includendo `@.cursor/agents/<nome>.md` nel prompt.
   - Specifica ruolo, obiettivo task e criteri di done.

2. **Caricamento contesto persistente**
   - memory project (`PROJECT_CONTEXT`, `DECISIONS`, `LESSONS_LEARNED`, ecc.)
   - stato piani correnti (`.cursor/plans/...`)

3. **Caricamento regole**
   - rules always-on (`.cursor/rules/*.mdc`)
   - regole dominio (`00-08 platform cms`)

4. **Caricamento skill**
   - `platform-cms-multi-tenant`
   - skill tecniche pertinenti (frontend/backend/security/testing)

5. **Piano di delega**
   - fase parallela specialisti
   - fase peer-check incrociato
   - fase QA/verifica
   - fase consolidamento report

## Mappa path agenti disponibili

Includi il path corrispondente in OGNI delega a subagent:

| Agente | Path da includere nel prompt |
|--------|------------------------------|
| `orchestrator` | `@.cursor/agents/orchestrator.md` |
| `backend-specialist` | `@.cursor/agents/backend-specialist.md` |
| `frontend-specialist` | `@.cursor/agents/frontend-specialist.md` |
| `security-auditor` | `@.cursor/agents/security-auditor.md` |
| `code-archaeologist` | `@.cursor/agents/code-archaeologist.md` |
| `qa-automation-engineer` | `@.cursor/agents/qa-automation-engineer.md` |
| `test-engineer` | `@.cursor/agents/test-engineer.md` |
| `database-architect` | `@.cursor/agents/database-architect.md` |
| `devops-engineer` | `@.cursor/agents/devops-engineer.md` |
| `performance-optimizer` | `@.cursor/agents/performance-optimizer.md` |
| `debugger` | `@.cursor/agents/debugger.md` |
| `mobile-developer` | `@.cursor/agents/mobile-developer.md` |
| `documentation-writer` | `@.cursor/agents/documentation-writer.md` |
| `seo-specialist` | `@.cursor/agents/seo-specialist.md` |
| `product-manager` | `@.cursor/agents/product-manager.md` |
| `product-owner` | `@.cursor/agents/product-owner.md` |
| `project-planner` | `@.cursor/agents/project-planner.md` |
| `game-developer` | `@.cursor/agents/game-developer.md` |
| `explorer-agent` | `@.cursor/agents/explorer-agent.md` |
| `penetration-tester` | `@.cursor/agents/penetration-tester.md` |

## Prompt skeleton raccomandato (con path obbligatorio)

```md
## BOOTSTRAP IDENTITA'

Sei il [NomeAgente] del progetto `dan-dev-platform`.
Carica la tua personalita' e profilo completo da: @.cursor/agents/<nome>.md

## CONTESTO PROGETTO

Rules always-on: @.cursor/rules/
Memory persistente: @.agent/memory/PROJECT_CONTEXT.md, DECISIONS.md, LESSONS_LEARNED.md
Skill dominio: @.cursor/skills/platform-cms-multi-tenant/SKILL.md
<skill tecniche pertinenti al task>
<piani e documenti di dominio rilevanti>

## TASK

<descrizione precisa di cosa deve fare questo specifico agente>

## DONE CRITERIA

<checklist verificabile di output attesi>

## VINCOLI

- Niente workaround superficiali: root cause fix obbligatorio.
- Report finale con evidenze e lista file toccati.
- Se trovi errori non nel tuo scope: segnalali, non ignorarli.
```

## Regola anti-pattern critica

NON scrivere MAI un prompt subagent che inizia con:

```
Sei il backend-specialist del progetto ...
```

...senza includere `@.cursor/agents/backend-specialist.md`.

Il nome da solo NON carica il profilo. Il file da solo NON basta senza il nome esplicito. Entrambi sono obbligatori.

## Pattern operativo consigliato

- Fase A: build di base parallela (`backend` + `frontend`)
- Fase B: integrazione contratti (schema/types/route)
- Fase C: doppio review (`security` + `archaeology`)
- Fase D: QA tecnico (browser + smoke)
- Fase E: pre-flight (type-check/lint/build + backend validation)

## Artefatti da produrre sempre

- report finale con:
  - decisioni prese
  - rischi noti
  - evidenze di verifica
  - handover preciso al piano successivo
- documentazione aggiornata nei path di dominio:
  - `apps/...`
  - `packages/...`
  - `convex/...`
  - `docs/...`

## Riferimenti

- Knowledge map: [`docs/cms-test-drive-knowledge-map.md`](../../docs/cms-test-drive-knowledge-map.md)
- Journal implementativo: [`docs/cms-test-drive-agentic-journal.md`](../../docs/cms-test-drive-agentic-journal.md)
