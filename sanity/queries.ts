import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    featured,
    featuredExcerpt,
    author->{ name, role }
  }
`);

export const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    author->{ name, role },
    body[]{
      ...,
      _type == "image" => {
        alt,
        caption,
        hotspot,
        crop,
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions { width, height }
          }
        }
      }
    },
    mainImage {
      alt,
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      }
    }
  }
`);
