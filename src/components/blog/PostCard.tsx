
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

import type { Post } from "@/types/post";

/**
 * Props attendues par notre composant.
 *
 * Nous lui transmettons un article plutôt que de lui faire
 * récupérer lui-même les données.
 */
type PostCardProps = {
  post: Post;
};

/**
 * Carte présentant un article du blog.
 *
 * Ce composant reste indépendant de la page qui l'utilise :
 * nous pourrons le réutiliser ailleurs dans l'application.
 */
export default function PostCard({ post }: PostCardProps) {
  // Formatage de la date en français.
  // Le fuseau UTC évite de décaler les dates enregistrées
  // sous la forme "AAAA-MM-JJ".
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(post.publishedAt));

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      {/* Catégorie de l'article */}
      <p className="text-sm font-medium text-emerald-700">
        {post.category}
      </p>

      {/* Titre cliquable : ouvre la page individuelle */}
      <h2 className="mt-3 text-xl font-semibold tracking-tight">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          {post.title}
        </Link>
      </h2>

      {/* Résumé */}
      <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
        {post.excerpt}
      </p>

      {/* Métadonnées de l'article */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
        <time dateTime={post.publishedAt}>
          {formattedDate}
        </time>

        <span className="inline-flex items-center gap-1">
          <Clock3 size={14} aria-hidden="true" />
          {post.readingTime} min de lecture
        </span>
      </div>

      {/* Lien de lecture */}
      <Link
        href={`/blog/${post.slug}`}
        className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
        aria-label={`Lire l'article : ${post.title}`}
      >
        Lire article
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}