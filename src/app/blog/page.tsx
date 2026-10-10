
import PostCard from "@/components/blog/PostCard";
import { getPublishedPosts } from "@/lib/posts";

/**
 * Page publique affichant la liste des articles.
 *
 * Il s'agit d'un Server Component :
 * nous pouvons attendre les données directement côté serveur.
 */
export default async function BlogPage() {
  // Récupération des articles publiés.
  const posts = await getPublishedPosts();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* Introduction de la page */}
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Le blog
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Des mots pour avancer ensemble.
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Des réflexions, des témoignages et des ressources
          autour des addictions, entraide et de la reconstruction.
        </p>
      </header>

      {/* Liste des articles */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>

      {/* Message affiché si aucun article n'existe */}
      {posts.length === 0 && (
        <p className="mt-12 rounded-xl border border-dashed p-8 text-center text-gray-600">
          Aucun article est disponible pour le moment.
        </p>
      )}
    </section>
  );
}