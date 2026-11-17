import { defineCliConfig } from "sanity/cli";

/** CLI Sanity dalla radice del progetto: `npm run typegen`. */
export default defineCliConfig({
  api: {
    projectId: "9rsacix1",
    dataset: "production",
  },
  typegen: {
    enabled: true,
    path: "./sanity/**/*.{ts,tsx}",
    schema: "studio/schema.json",
    generates: "./sanity.types.ts",
    overloadClientMethods: true,
  },
});
