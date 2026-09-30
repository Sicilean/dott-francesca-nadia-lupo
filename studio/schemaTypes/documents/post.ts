import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";
import { author } from "./author";

export const post = defineType({
  name: "post",
  title: "Articolo",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      description: "Etichetta in evidenza, per esempio Adolescenza o Relazioni.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autrice",
      type: "reference",
      to: [{ type: author.name }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Estratto",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "In evidenza",
      type: "boolean",
      description: "Mostra questo articolo nel riquadro in alto del blog.",
      initialValue: false,
    }),
    defineField({
      name: "featuredExcerpt",
      title: "Testo in evidenza",
      type: "text",
      rows: 3,
      description: "Se vuoto, il riquadro usa l’estratto.",
      hidden: ({ document }) => !document?.featured,
    }),
    defineField({
      name: "publishedAt",
      title: "Data di pubblicazione",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Immagine",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Testo",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normale", value: "normal" },
            { title: "Titolo", value: "h2" },
            { title: "Sottotitolo", value: "h3" },
            { title: "Citazione", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Grassetto", value: "strong" },
              { title: "Corsivo", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Testo alternativo",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Didascalia",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Data di pubblicazione, recenti",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      category: "category",
      media: "mainImage",
    },
    prepare({ title, author, category, media }) {
      return {
        title,
        subtitle: [author, category].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
