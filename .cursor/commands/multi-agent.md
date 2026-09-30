---
description: Evoca un protocollo a cascata che interpreta il prompt precedente come task e genera un piano multi-agent tailored al caso specifico, con minimo 2 agenti (executor + reviewer specializzato).
---

# /multi-agent

> Evocazione: scrivi il tuo prompt normalmente e termina con `/multi-agent`.
> Tutto il testo precedente e' il **Task Input**. Questo comando produce un piano multi-agent, non esegue subito.

## Contratto di invocazione

Quando il messaggio utente termina con il token `/multi-agent`:

1. Tratta l'intero testo precedente come `Task Input`.
2. Applica il protocollo a cascata sotto.
3. Produci esattamente il blocco di output descritto in Fase 4.
4. NON eseguire subito. Attendi conferma utente dopo la presentazione del piano.

Regola dura non negoziabile:
- Il team proposto deve contenere **minimo 2 agenti**.
- Anche se il task sembra banale, serve un **secondo agente controllore tailored** al caso specifico. Gli agenti possono fraintendere o commettere errori: il controllore mantiene l'output coerente e production-ready.

## Mappa path agenti (OBBLIGO: ogni agente va attivato con il suo path)

Ogni volta che deleghi un task a un subagent — nel piano E nell'esecuzione — DEVI includere il path del file
personalita' come `@.cursor/agents/<nome>.md`. Il nome da solo NON basta: l'agente non carica il profilo.

| Agente | Path da includere obbligatoriamente |
|--------|-------------------------------------|
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

## Template obbligatorio per ogni delega subagent

Quando invochi qualsiasi subagent (in piano o in esecuzione), usa SEMPRE questo skeleton:

```md
## BOOTSTRAP IDENTITA'

Sei il [NomeAgente] del progetto `dan-dev-platform`.
Carica la tua personalita' e profilo completo da: @.cursor/agents/<nome>.md

## CONTESTO PROGETTO

Rules always-on: @.cursor/rules/
Memory: @.agent/memory/PROJECT_CONTEXT.md, @.agent/memory/DECISIONS.md, @.agent/memory/LESSONS_LEARNED.md
Skill dominio: @.cursor/skills/platform-cms-multi-tenant/SKILL.md
<skill tecniche pertinenti al task — es. convex-best-practices, nextjs-best-practices, ecc.>
<piani e documenti di dominio rilevanti — es. convex/cms/PLAN_1_2_IMPLEMENTATION.md>

## TASK

<descrizione precisa di cosa deve fare questo specifico agente>

## DONE CRITERIA

<checklist verificabile>

## VINCOLI

- Root cause fix obbligatorio, niente workaround.
- Report finale con evidenze e file toccati.
- Segnala errori fuori scope senza ignorarli.
```

---

## Fase 1 — Comprensione del Task Input

Analizza il `Task Input` ed estrai:

- **Intento primario**: build, debug, refactor, audit, plan, docs, migrate, deploy, investigate, brainstorm.
- **Domini toccati**: frontend, backend, db, security, infra/devops, mobile, game, performance, seo, qa, docs, data, payments, auth.
- **Rischio**:
  - production change (tocca dati/servizi live)
  - dati sensibili / PII / segreti
  - breaking change su API / schema / contratto pubblico
  - operazione read-only (basso rischio)
- **Vincoli ambientali**:
  - Windows / PowerShell
  - monorepo pnpm + Turborepo
  - stack: Next.js 16, Convex, Clerk, Tailwind v4, Expo (quando mobile)
  - multi-tenant CMS con isolamento per `tenantId`

Se il `Task Input` e' ambiguo su un punto critico (scope, target, ambiente), chiedi una singola domanda di chiarimento PRIMA di produrre il piano.

## Fase 2 — Caricamento contesto di progetto

Dichiara esplicitamente nel piano cosa hai gia' caricato come contesto, scelto fra:

- rules always-on da `.cursor/rules/*.mdc` (in particolare `000-memory-loader`, `001-pre-flight`, `002-self-governance`, `004-commit-protocol`, `005-cooperation`, `006-error-recovery`, `007-security-checklist`, `008-task-tracking`, `009-architecture-map`)
- memory persistente in `.agent/memory/*.md` (`PROJECT_CONTEXT`, `DECISIONS`, `LESSONS_LEARNED`, `USER_PREFERENCES`, `ERROR_PATTERNS`, `SESSION_LOG`)
- skill di dominio pertinenti da `.cursor/skills/...`
- knowledge map del dominio CMS test drive quando il task tocca multi-tenant:
  - `docs/cms-test-drive-knowledge-map.md`
  - `docs/cms-test-drive-agentic-journal.md`
  - `convex/cms/PLAN_1_2_IMPLEMENTATION.md`
  - `convex/cms/SECURITY_MODEL.md`
  - `packages/cms-blocks/BLOCK_LIFECYCLE.md`
  - `apps/cms-test-drive/ROUTING_RENDERING_NOTES.md`

Cita solo i file effettivamente rilevanti per il task, non tutti.

## Fase 3 — Selezione agenti tailored (minimo 2 sempre)

Scegli sempre almeno due ruoli:

1. **Executor Agent** — specialista del dominio principale del task.
2. **Specialized Reviewer Agent** — controllore tailored al caso specifico, non generico. Deve avere competenza in cio' che puo' realisticamente andare storto in quel task.

Aggiungi agenti extra quando il task tocca piu' domini significativi.

### Matrice di accoppiamento tailored

| Tipo di task | Executor | Reviewer specializzato | Extra tipici |
|--------------|----------|------------------------|--------------|
| Componente / pagina React / UI | `frontend-specialist` | `qa-automation-engineer` o `performance-optimizer` | `seo-specialist` se pubblico |
| Convex query/mutation / API | `backend-specialist` | `security-auditor` | `test-engineer` |
| Schema / migration / indici | `database-architect` | `backend-specialist` | `performance-optimizer` |
| Bug prod / regressione | `debugger` | `test-engineer` | `code-archaeologist` |
| Refactor / cleanup | `code-archaeologist` | specialista dominio | `test-engineer` |
| Performance tuning | `performance-optimizer` | specialista layer | `devops-engineer` se infra |
| SEO / metadata / social | `seo-specialist` | `frontend-specialist` | `documentation-writer` |
| Mobile (Expo/RN) | `mobile-developer` | `qa-automation-engineer` | `performance-optimizer` |
| Security audit | `security-auditor` | `penetration-tester` | `devops-engineer` |
| Deploy / CI / CD | `devops-engineer` | `security-auditor` | `test-engineer` |
| Docs / runbook | `documentation-writer` | specialista dominio | `product-owner` |
| Game dev | `game-developer` | `performance-optimizer` | `qa-automation-engineer` |
| Architettura / planning | `project-planner` | `orchestrator` | dominio principale |
| CMS multi-tenant | `backend-specialist` o `frontend-specialist` | `security-auditor` | `qa-automation-engineer` |

## Fase 4 — Sintesi del piano multi-agent (formato fisso di output)

Produci esattamente questo blocco nella risposta all'utente.
**IMPORTANTE**: per ogni agente nella tabella Team, riporta anche il path del file personalita'.

```markdown
### Task interpretato
<riformulazione in 1-2 frasi del Task Input>

### Classificazione
- Intento primario: ...
- Domini: ...
- Rischio: ...
- Vincoli rilevanti: ...

### Contesto caricato
- <rules/memory/skill/doc effettivamente pertinenti>

### Team multi-agent selezionato
| Ruolo | Agente | Path personalita' | Motivo specifico per questo task |
|-------|--------|-------------------|----------------------------------|
| Executor | backend-specialist | `@.cursor/agents/backend-specialist.md` | ... |
| Reviewer specializzato | security-auditor | `@.cursor/agents/security-auditor.md` | ... |
| (Extra) | frontend-specialist | `@.cursor/agents/frontend-specialist.md` | ... |

### Fasi di esecuzione
1. Bootstrap contesto per tutti gli agenti (path personalita' + memory + rules + skill)
2. Esecuzione executor con criteri di done espliciti
3. Review specializzata (peer-check tailored sui rischi identificati)
4. QA / verifica oggettiva (solo se applicabile)
5. Report finale con evidenze e file toccati

### Done criteria
- [ ] checklist puntuale tratta dal Task Input
- [ ] peer-check del reviewer completato senza blocker
- [ ] eventuali verifiche tecniche (type-check / lint / test / smoke) superate

### Rischi noti / mitigazioni
- <rischio concreto>: <come il team lo mitiga>

### Handover richiesto
- Conferma utente per procedere all'esecuzione del piano.
```

## Fase 5 — Handoff a esecuzione

Dopo aver presentato il blocco di output:

- **Fermati**. Non invocare subagenti, non modificare file.
- Attendi la conferma esplicita dell'utente.
- Alla conferma, invoca gli agenti applicando per ciascuno il template bootstrap con path personalita', come descritto in `./orchestrator-bootstrap.md`.

### Verifica pre-esecuzione obbligatoria

Prima di invocare qualsiasi subagent, verifica mentalmente:

- [ ] Il prompt include `@.cursor/agents/<nome>.md`?
- [ ] Il prompt include la sezione `## BOOTSTRAP IDENTITA'`?
- [ ] Il prompt include i path delle rules e della memory?
- [ ] Il prompt include le skill pertinenti al task?

Se anche una sola di queste e' NO, il bootstrap e' incompleto. Correggila prima di delegare.

## Riferimenti incrociati

- [`orchestrator-bootstrap.md`](./orchestrator-bootstrap.md) — protocollo completo + mappa path agenti.
- [`orchestrator.md`](./orchestrator.md) — evocazione dell'agente coordinatore.
- [`orchestrate.md`](./orchestrate.md) — workflow completo di orchestrazione multi-agente.
- [`../../docs/cms-test-drive-knowledge-map.md`](../../docs/cms-test-drive-knowledge-map.md) — mappa globale conoscenza CMS multi-tenant.
- [`../../docs/cms-test-drive-agentic-journal.md`](../../docs/cms-test-drive-agentic-journal.md) — journal implementativo e contributi subagent.

## Anti-pattern da evitare

- Proporre un solo agente "tanto e' semplice". Violazione della regola dura.
- Scrivere "Sei il backend-specialist" SENZA `@.cursor/agents/backend-specialist.md`. L'agente non carica il profilo.
- Scegliere un reviewer generico (`test-engineer` su tutto): tailored al rischio del caso.
- Eseguire senza prima presentare il piano e ottenere conferma.
- Dimenticare di caricare rules always-on e memory prima della selezione agenti.
- Includere agenti non pertinenti solo per gonfiare il numero.
