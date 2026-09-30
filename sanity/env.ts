const projectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const datasetFromEnv = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectIdFromEnv) {
  throw new Error("Manca NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!datasetFromEnv) {
  throw new Error("Manca NEXT_PUBLIC_SANITY_DATASET");
}

export const apiVersion = "2026-09-29";
export const projectId: string = projectIdFromEnv;
export const dataset: string = datasetFromEnv;
