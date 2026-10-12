
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMyPosts } from "@/lib/my-posts";
import DeleteDraftButton from "@/components/blog/DeleteDraftButton";

export const instant = false;

export default async function MesArticlesPage() {

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/connexion");
  }

  const posts = await getMyPosts();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mes articles</h1>
          <p className="mt-2 text-gray-600">
            Retrouve ici tes brouillons et tes articles publiés.
          </p>
        </div>

        <Link
          href="/mes-articles/nouveau"
          className="rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900"
        >
          Nouvel article
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="mt-10 rounded-xl border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold">
            Aucun article pour le moment
          </h2>
          <p className="mt-2 text-gray-600">
            Ton prochain article peut commencer par un simple brouillon.
          </p>
          <Link
            href="/mes-articles/nouveau"
            className="mt-5 inline-block font-semibold text-emerald-800 underline"
          >
            Écrire mon premier article
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-gray-200 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-gray-500">
                  {post.category}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    post.status === "published"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {post.status === "published" ? "Publié" : "Brouillon"}
                  </span>
                  <div>

                    {post.status === "draft" && (
                      
                      <Link
                      href={`/mes-articles/${post.id}/modifier`}
                      className="mt-4 inline-block font-medium text-emerald-800 underline"
                      >
                      Modifier le brouillon
                      <DeleteDraftButton postId={post.id} />
                    </Link>
  
                    )}
                  </div>
                  
              </div>

              <h2 className="mt-3 text-xl font-semibold">
                {post.title}
              </h2>

              <p className="mt-2 text-gray-600">{post.excerpt}</p>

              <p className="mt-3 text-sm text-gray-500">
                Modifié le{" "}
                {new Date(post.updatedAt).toLocaleDateString("fr-FR")}
              </p>

              {post.status === "published" && (
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block font-medium text-emerald-800 underline"
                >
                  Voir l’article public
                </Link>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}