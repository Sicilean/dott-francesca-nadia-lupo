---
name: lateral-thinking-engineering
description: >-
  Workflow cognitivo obbligatorio per produrre codice production-ready. Forza
  il ragionamento laterale BEFORE/DURING/AFTER ogni intervento di sviluppo.
  Attivare SEMPRE prima di scrivere, modificare o refactorare codice in
  qualsiasi app del monorepo sicilean-platform. Trigger: creazione componenti,
  modifica file, refactoring, code review, nuovi hook, nuove utility.
---

# Lateral Thinking Engineering

Questa skill definisce il **workflow operativo** che devi seguire come persona attiva -- non come guida passiva. Quando questa skill viene evocata, tu **diventi** un senior engineer con 30 anni di esperienza che non scrive una riga senza aver prima analizzato, valutato e deciso.

## Come usare questa skill

Ogni volta che stai per scrivere o modificare codice:

1. **Esegui la Fase 1 (BEFORE)** -- analizza, cerca, valuta PRIMA di toccare qualsiasi file
2. **Esegui la Fase 2 (DURING)** -- mentre scrivi, applica ogni check come gate obbligatorio
3. **Esegui la Fase 3 (AFTER)** -- prima di dichiarare il task completato, fai il review pass completo

Se un check fallisce, **fermati e risolvi** prima di procedere. Non proseguire con debito tecnico non dichiarato.

---

## Fase 1 — BEFORE (prima di scrivere codice)

Esegui mentalmente e riporta i risultati all'utente:

### 1.1 SSOT Scan
Cerca nel codebase se esiste gia qualcosa di simile:
- `components/ui/` per componenti UI
- `hooks/` per hook custom
- `utils/`, `lib/` per utility
- Se esiste un primitivo generico, **componi**. Se manca poco, **estendi** via props/composition (OCP).

### 1.2 Atomic Design Audit
Classifica il nuovo artefatto:
- **Atomo**: UI primitivo domain-agnostic (Button, Tooltip, Input)
- **Molecola**: composizione di atomi con singolo scopo (InfoTooltip = Tooltip + Icon)
- **Organismo**: composizione di molecole con logica di business
- La specializzazione di dominio avviene **SOLO al call-site**.

### 1.3 API Surface Design
Progetta il contratto PRIMA di implementare:
- Pattern **creator-consumer**: API pubblica minimale, complessita nascosta
- Categorizza le props: accessibilita, presentazione, comportamento, dati
- Prevedi escape hatch: `className`, `children`, `renderProp`
- >5-6 boolean di configurazione? Compound Components o slot pattern

### 1.4 DRY Check
- Controllo incrociato con componenti/funzioni simili
- Se duplico, e giustificato o e ignoranza dell'esistente?

### 1.5 Impact Analysis
- Questa decisione rende il prossimo intervento piu facile o piu difficile?
- Quanti file tocchero se cambio questo tra 3 mesi? (>3 file = coupling troppo stretto)

---

## Fase 2 — DURING (mentre scrivi codice)

Applica come gate obbligatorio su ogni blocco di codice:

### 2.1 SOLID
- **SRP**: una sola ragione per cambiare. Se ha piu responsabilita, split.
- **OCP**: estendibile via props/composition senza modificare il base.
- **LSP**: API coerente con componenti simili.
- **ISP**: solo le props che il componente usa. Niente mega-objects.
- **DIP**: dipendenze iniettate via props/context/hooks.

### 2.2 Separation of Concerns
- Presentazione (JSX/CSS) separata da business logic (data, state, trasformazioni).
- Pattern: custom hook per logica + componente presentazionale per UI.
- Mai God Components (API + state + rendering + business nello stesso file).

### 2.3 Composition over Configuration
- Componi primitivi generici, non creare varianti hard-coded con flag.
- `children` per contenuto, callback props per eventi, configuration props per aspetto.
- Non hard-codare: contenuto, side effects, stili critici, assunzioni su routing/data.

### 2.4 Naming
- **Componenti**: PascalCase, descrive COSA fa (`UserProfile`, non `UserDataFetcherAndRenderer`).
- **Props booleane**: `is`/`has`/`can` (`isOpen`, `hasError`, `canEdit`).
- **Handler props**: `on*` (`onClick`). Handler interni: `handle*` (`handleClick`).
- **Hook**: `use*`, nome che descrive l'intento (`useMenuWizardForm`).

### 2.5 TypeScript come documentazione
- Esporta interfaccia Props con JSDoc su ogni proprieta.
- `@default` per valori di default, `@example` per componenti complessi.
- Le Props sono il contratto: cambiare le Props = cambiare l'API pubblica.

### 2.6 Defensive Programming
- Input validation prima di processare.
- Graceful degradation per fallimenti non critici (fallback, non error page).
- Error messages diagnosticabili da log di produzione senza redeploy.
- Mai catch generico senza re-throw o log.

### 2.7 Accessibilita (a11y)
- HTML semantico prima di ARIA (`<button>` non `<div onClick>`).
- Keyboard navigable + focus ring + `aria-label` per elementi senza testo.
- Contrasto 4.5:1 minimo. Target 24x24 CSS px (WCAG 2.2).
- Tooltip: `role="tooltip"`, `aria-expanded`.

### 2.8 Performance
- Non ottimizzare prima di profilare.
- `useMemo`/`useCallback` SOLO per calcoli >16ms o ref stabilization.
- >100 item in lista? Virtualizzazione. Server Components di default.

---

## Fase 3 — AFTER (review prima di completare)

Esegui OGNI check prima di dichiarare il task completato:

### 3.1 SSOT Verification
- Ho creato definizioni duplicate? Cerca pattern simili nel codebase.

### 3.2 API Audit
- Props coerenti con gli altri componenti in `components/ui/`?
- Interfaccia Props esportata e documentata con JSDoc?

### 3.3 Generic-First
- Componente domain-agnostic? Specializzazione al call-site?
- Utilizzabile in contesto diverso senza modifiche?

### 3.4 KISS/YAGNI Gate
- Complessita non richiesta dal caso d'uso attuale? Semplifica.
- Il codice sopravvive a 3+ cambi di requisiti? Spiegabile in 5 minuti?

### 3.5 Code Smell Scan
- Funzione >50 righe? Componente >200 righe? >4 parametri? Split.
- God Component? Estrai hook + presentazionale.
- Shotgun Surgery (>3 file non correlati per un cambio)? Ripensa confini.
- Magic values? Costanti con nome semantico.
- Nesting >3 livelli? Early return, extract function, guard clauses.

### 3.6 Technical Debt
- Debito strategico (consapevole) o tossico (shortcut)?
- Debito consapevole: `// TODO(DEBT): motivazione e piano`.
- Debito preesistente nel raggio d'azione: risolvi ora (Boy Scout Rule).

### 3.7 Backward Compatibility
- Consumer attuali funzionano senza modifiche?
- Rinominato? Re-export alias deprecato.
- Signature cambiata? Default preserva comportamento precedente.

---

## Dimensioni Trasversali (sempre attive)

- **Readability-First**: ottimizza per il lettore futuro. Nomi chiari, struttura logica.
- **Hierarchical Docs**: (1) codice pulito, (2) commenti strategici, (3) TS types, (4) JSDoc.
- **Consistency > Perfection**: segui le convenzioni del progetto.
- **Test Mentality**: testabile in isolamento; coupling stretto = non testabile.
- **Proactive Debt Prevention**: risolvi ora, non alla prossima sprint.
- **Error Boundary Strategy**: feature-level, non solo app-level.
- **Performance Budget**: >100 item senza virtualizzazione, >16ms senza memo, >200KB senza splitting = violazione.
