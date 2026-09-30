import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/image";

type ImageValue = {
  alt?: string | null;
  caption?: string | null;
  asset?: {
    _id?: string;
    metadata?: {
      lqip?: string | null;
      dimensions?: { width?: number | null; height?: number | null } | null;
    } | null;
  } | null;
};

function SanityFigure({ value }: { value: ImageValue }) {
  if (!value.asset?._id) return null;

  const width = value.asset.metadata?.dimensions?.width || 1600;
  const height = value.asset.metadata?.dimensions?.height || 1000;
  const lqip = value.asset.metadata?.lqip;

  return (
    <figure className="my-8">
      <Image
        src={urlFor(value).width(1600).fit("max").auto("format").url()}
        alt={value.alt || ""}
        width={width}
        height={height}
        className="h-auto w-full"
        sizes="(min-width: 768px) 720px, 100vw"
        placeholder={lqip ? "blur" : "empty"}
        blurDataURL={lqip || undefined}
      />
      {value.caption ? <figcaption className="mt-3 text-sm text-muted-foreground">{value.caption}</figcaption> : null}
    </figure>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 text-base leading-8 text-muted-foreground">{children}</p>,
    h2: ({ children }) => <h2 className="mt-10 font-fraunces text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 font-fraunces text-2xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l border-primary pl-5 font-fraunces text-2xl leading-snug">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-5 text-muted-foreground">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="underline decoration-primary/40 underline-offset-4"
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => <SanityFigure value={value} />,
  },
};

export function PostBody({ value }: { value: React.ComponentProps<typeof PortableText>["value"] }) {
  if (!value) return null;
  return (
    <div className="max-w-2xl">
      <PortableText value={value} components={components} />
    </div>
  );
}

export function PostImage({ value, priority = false }: { value: ImageValue | null; priority?: boolean }) {
  if (!value?.asset?._id) return null;

  const width = value.asset.metadata?.dimensions?.width || 1600;
  const height = value.asset.metadata?.dimensions?.height || 1000;
  const lqip = value.asset.metadata?.lqip;

  return (
    <Image
      src={urlFor(value).width(1600).fit("max").auto("format").url()}
      alt={value.alt || ""}
      width={width}
      height={height}
      priority={priority}
      className="mb-10 h-auto w-full"
      sizes="(min-width: 1024px) 960px, 100vw"
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip || undefined}
    />
  );
}
