import type { ReactNode } from "react";

export function accentTitle(title: string, options?: { withRule?: boolean }): ReactNode {
  const withRule = options?.withRule !== false;
  const quoted = title.match(/^(.*?)\s*([“"][^”"]+[”"])\s*$/);
  const words = title.trim().split(/\s+/);
  const accentCount = words.length <= 3 ? 1 : words.length <= 5 ? 2 : 3;
  const splitAt = Math.max(1, words.length - accentCount);
  const lead = (quoted ? quoted[1] : words.slice(0, splitAt).join(" ")).trim();
  const accent = quoted ? quoted[2] : words.slice(splitAt).join(" ");
  const accentMark = withRule ? (
    <span className="title-rule">
      <em>{accent}</em>
    </span>
  ) : (
    <em>{accent}</em>
  );

  if (!lead) return accentMark;

  return (
    <>
      {lead}
      <br />
      {accentMark}
    </>
  );
}
