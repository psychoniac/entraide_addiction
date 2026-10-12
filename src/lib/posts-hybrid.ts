
import { posts as localPosts } from "@/data/posts";

import type { Post } from "@/types/post";

import {
  getPublishedPostsFromSupabase,
  getPostBySlugFromSupabase,
} from "@/lib/posts-supabase";

/**
 * Récupère les articles publiés.
 *
 * Supabase est la source principale.
 * Les articles locaux restent disponibles en secours.
 */
export async function getPublishedPostsHybrid(): Promise<Post[]> {
  try {
    const supabasePosts = await getPublishedPostsFromSupabase();

    if (supabasePosts.length > 0) {
      return supabasePosts;
    }
  } catch (error) {
    console.error(
      "Supabase indisponible : utilisation des articles locaux.",
      error
    );
  }

  return [...localPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  );
}

/**
 * Recherche un article par son slug.
 *
 * Supabase est consulté en premier.
 * Si l'article n'y est pas trouvé, on cherche dans les données locales.
 */
export async function getPostBySlugHybrid(
  slug: string
): Promise<Post | null> {
  try {
    const supabasePost = await getPostBySlugFromSupabase(slug);

    if (supabasePost) {
      return supabasePost;
    }
  } catch (error) {
    console.error(
      "Supabase indisponible : recherche dans les articles locaux.",
      error
    );
  }

  return localPosts.find((post) => post.slug === slug) ?? null;
}