"use client";

/**
 * Sanity Studio, montato nel sito su /studio (app/studio/[[...tool]]/page.tsx).
 * Gli schemi stanno in studio/schemaTypes, la struttura del menù in studio/structure.ts.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./studio/schemaTypes";
import { structure } from "./studio/structure";

export default defineConfig({
  name: "default",
  title: "Francesca Nadia Lupo",
  basePath: "/studio",
  projectId: "9rsacix1",
  dataset: "production",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
