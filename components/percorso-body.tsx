import type { PercorsoBlock } from "@/lib/percorsi";

export function PercorsoBody({ blocks }: { blocks: readonly PercorsoBlock[] }) {
  return (
    <div className="max-w-2xl">
      {blocks.map((block, index) => {
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="mt-8 border-l border-primary pl-5 font-fraunces text-2xl leading-snug"
            >
              {block.text}
              {block.cite ? <cite className="mt-4 block text-base not-italic text-muted-foreground">{block.cite}</cite> : null}
            </blockquote>
          );
        }

        if (block.type === "heading") {
          return (
            <h2 key={index} className="mt-10 font-fraunces text-3xl">
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="mt-5 text-base leading-8 text-muted-foreground">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
