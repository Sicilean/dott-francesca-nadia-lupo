import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "9rsacix1",
    dataset: "production",
  },
  typegen: {
    enabled: true,
    path: "../sanity/**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "../sanity.types.ts",
    overloadClientMethods: true,
  },
});
