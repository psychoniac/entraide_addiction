
import Link from "next/link";

import { getPublishedPostsFromSupabase } from "@/lib/posts-supabase";

export const instant = false;

export default async function TestPostsSupabasePage() {
  let posts = null;
  let errorMessage: string | null = null;

  try {
    posts = await getPublishedPostsFromSupabase();
  } catch {
    errorMessage =
      "Impossible de récupérer les articles depuis Supabase. Consulte le terminal pour plus de détails.";
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">
        Test du service Supabase
      </h1>

      <p className="mt-3 text-gray-600">
        Cette page teste notre nouveau service sans modifier
        les articles locaux ni les pages du blog.
      </p>

      {errorMessage ? (
        <section className="mt-8 rounded-xl border border-red-300 bg-red-50 p-5">
          <h2 className="font-semibold text-red-900">
            Échec de la récupération
          </h2>
          <p className="mt-2 text-red-800">{errorMessage}</p>
        </section>
      ) : (
        <section className="mt-8 rounded-xl border border-emerald-300 bg-emerald-50 p-5">
          <h2 className="font-semibold text-emerald-900">
            Service exécuté avec succès
          </h2>

          <p className="mt-2 text-emerald-800">
            Nombre d’articles publiés accessibles : {posts?.length ?? 0}
          </p>

          {posts?.length === 0 ? (
            <p className="mt-4 text-gray-700">
              Aucun article publié n’est accessible pour le moment.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {posts?.map((post) => (
                <li
                  key={post.id}
                  className="rounded-lg border border-emerald-200 bg-white p-4"
                >
                  <p className="font-semibold">{post.title}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Slug : {post.slug}
                  </p>
                  <p className="text-sm text-gray-600">
                    Auteur : {post.author}
                  </p>
                  <p className="text-sm text-gray-600">
                    Date : {post.publishedAt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 inline-block font-medium text-emerald-800 underline"
                  >
                    Voir l’article dans le blog
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}