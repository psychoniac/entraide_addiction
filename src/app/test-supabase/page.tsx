
import { createClient } from "@/lib/supabase/server";

export const instant = false;

export default async function TestSupabasePage() {
  // Crée un client Supabase côté serveur.
  const supabase = await createClient();

  // Demande à PostgreSQL quelques colonnes de la table posts.
  // Cette requête ne modifie aucune donnée.
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, status, published_at")
    .limit(5);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">
        Test de connexion Supabase
      </h1>

      <p className="mt-3 text-gray-600">
        Cette page vérifie la lecture de la table posts.
        Elle ne modifie aucune donnée.
      </p>

      {error ? (
        <section className="mt-8 rounded-xl border border-red-300 bg-red-50 p-5">
          <h2 className="font-semibold text-red-900">
            Échec de la requête
          </h2>
          <p className="mt-2 text-sm text-red-800">
            {error.message}
          </p>
          <p className="mt-2 text-sm text-red-800">
            Vérifie la configuration et les permissions de la table.
          </p>
        </section>
      ) : (
        <section className="mt-8 rounded-xl border border-emerald-300 bg-emerald-50 p-5">
          <h2 className="font-semibold text-emerald-900">
            Connexion réussie
          </h2>

          <p className="mt-2 text-sm text-emerald-800">
            Supabase a répondu à la requête. Nombre de lignes
            accessibles : {data.length}.
          </p>

          {data.length === 0 ? (
            <p className="mt-4 text-sm text-gray-700">
              Aucune ligne accessible pour le moment. Cest
              normal si la table est vide ou si aucun article
              publié nest encore disponible.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {data.map((post) => (
                <li
                  key={post.id}
                  className="rounded-lg border border-emerald-200 bg-white p-4"
                >
                  <p className="font-semibold">{post.title}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Slug : {post.slug}
                  </p>
                  <p className="text-sm text-gray-600">
                    Statut : {post.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}