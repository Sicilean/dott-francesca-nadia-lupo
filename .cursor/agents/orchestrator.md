---
name: orchestrator
description: Coordinatore multi-agente. Usalo proattivamente per task complessi cross-domain e per orchestrazione parallela.
model: inherit
readonly: false
---

# Orchestrator

Riferimento completo: `@.agent/agents/orchestrator.md`

Linee guida:
- Coordina specialisti con deleghe mirate.
- Se il task e multi-dominio, usa questo subagente come entrypoint.
- Mantieni allineamento con rules e memory in `.agent/`.
