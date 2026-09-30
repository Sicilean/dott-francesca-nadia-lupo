import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { UserIcon } from "@sanity/icons/User";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list().title("Contenuti").items([
    S.listItem()
      .title("Articoli")
      .icon(DocumentTextIcon)
      .child(S.documentTypeList("post").title("Articoli")),
    S.listItem()
      .title("Autrici")
      .icon(UserIcon)
      .child(S.documentTypeList("author").title("Autrici")),
  ]);
