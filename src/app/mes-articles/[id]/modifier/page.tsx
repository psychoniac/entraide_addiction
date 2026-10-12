
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostEditorForm, {
  type EditablePost,
} from "@/components/blog/PostEditorForm";

export const instant = false;

type ModifierPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ModifierArticlePage({
  params,
}: ModifierPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/connexion");
  }

  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, slug, category, excerpt, content, cover_image, status")
    .eq("id", id)
    .eq("author_id", user.id)
    .eq("status", "draft")
    .maybeSingle();

  if (error) {
    console.error("Erreur de chargement du brouillon :", error.code);
    throw new Error("Impossible de charger ce brouillon.");
  }

  if (!post) {
    notFound();
  }

  const initialPost: EditablePost = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    excerpt: post.excerpt,
    content: Array.isArray(post.content)
      ? post.content.filter(
          (paragraph): paragraph is string =>
            typeof paragraph === "string"
        )
      : [],
    coverImage: post.cover_image,
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/mes-articles"
        className="text-sm font-medium text-emerald-800 underline"
      >
        ← Retour à mes articles
      </Link>

      <header className="mb-8 mt-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
          Gestion des articles
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          Modifier mon brouillon
        </h1>
        <p className="mt-3 text-gray-600">
          Modifie ton texte puis enregistre tes changements. Ton article
          restera un brouillon.
        </p>
      </header>

      <PostEditorForm initialPost={initialPost} />
    </main>
  );
}