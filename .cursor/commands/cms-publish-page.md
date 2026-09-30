# /cms-publish-page

Workflow per pubblicare una pagina sul CMS multi-tenant (auth + draft→published + audit + revalidation):

`@.agent/workflows/cms-publish-page.md`

Skill di contesto: `@.cursor/skills/platform-cms-multi-tenant/SKILL.md` (§4.1).

Rules coinvolte:
- `@.cursor/rules/01-multi-tenant-data-model.mdc`
- `@.cursor/rules/04-admin-panel.mdc`
- `@.cursor/rules/05-auth-and-tenant-isolation.mdc`
- `@.cursor/rules/07-rendering-and-publishing.mdc`
