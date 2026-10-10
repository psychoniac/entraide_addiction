
import { posts } from "@/data/posts";
import type { Post } from "@/types/post";

/**
 * Retourne les articles publiés, du plus récent au plus ancien.
 *
 * Pour l'instant, tous nos articles fictifs sont considérés
 * comme publiés.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  );
}

/**
 * Recherche un article à partir de son slug.
 *
 * Retourne l'article correspondant, ou null s'il n'existe pas.
 */
export async function getPostBySlug(
  slug: string
): Promise<Post | null> {
  const post = posts.find((item) => item.slug === slug);

  return post ?? null;
}