
import { createClient } from "@/lib/supabase/server";

import type { Post } from "@/types/post";

/**
 * Récupère les articles publiés depuis Supabase.
 *
 * Cette fonction ne modifie pas les articles locaux.
 * Elle retourne uniquement les articles publiés.
 */
export async function getPublishedPostsFromSupabase(): Promise<Post[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, content, category, author_name, published_at, reading_time, cover_image"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error(
      "Erreur lors de la récupération des articles Supabase :",
      error.message
    );

    throw new Error("Impossible de récupérer les articles depuis Supabase.");
  }

  return (data ?? []).map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content as string[],
    category: post.category,
    author: post.author_name,
    publishedAt: post.published_at,
    readingTime: post.reading_time,
    coverImage: post.cover_image ?? undefined,
  }));
}

/**
 * Recherche un article publié à partir de son slug.
 */
export async function getPostBySlugFromSupabase(
  slug: string
): Promise<Post | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, content, category, author_name, published_at, reading_time, cover_image"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(
      "Erreur lors de la récupération de l'article Supabase :",
      error.message
    );

    throw new Error("Impossible de récupérer cet article depuis Supabase.");
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content as string[],
    category: data.category,
    author: data.author_name,
    publishedAt: data.published_at,
    readingTime: data.reading_time,
    coverImage: data.cover_image ?? undefined,
  };
}