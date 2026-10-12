
import { createClient } from "@/lib/supabase/server";

export type MyPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: "draft" | "published";
  publishedAt: string | null;
  updatedAt: string;
};

export async function getMyPosts(): Promise<MyPost[]> {
  const supabase = await createClient();

  // Vérifier l'identité réelle de l'utilisateur côté serveur.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, category, status, published_at, updated_at"
    )
    .eq("author_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Erreur de récupération des articles personnels :", error.code);
    throw new Error("Impossible de récupérer tes articles.");
  }

  return (data ?? []).map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    status: post.status as "draft" | "published",
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
  }));
}