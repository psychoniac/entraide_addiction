
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";

import { getPostBySlugHybrid } from "@/lib/posts-hybrid";

export const instant = false;
/**
 * Type des paramètres de cette route dynamique.
 *
 * Avec les versions récentes de Next.js, params est une Promise
 * qu'il faut résoudre avec await.
 */
type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Génère le titre et la description de la page.
 *
 * Ces métadonnées améliorent notamment le titre de l'onglet
 * et la présentation de la page dans les résultats de recherche.
 */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlugHybrid(slug);

  // Métadonnées de secours si l'article n'existe pas.
  if (!post) {
    return {
      title: "Article introuvable | Entraide",
    };
  }

  return {
    title: `${post.title} | Entraide`,
    description: post.excerpt,
  };
}

/**
 * Page affichant un article complet.
 */
export default async function PostPage({ params }: PostPageProps) {
  // 1. Récupérer le slug présent dans l'URL.
  const { slug } = await params;

  // 2. Chercher l'article correspondant.
  const post = await getPostBySlugHybrid(slug);

  // 3. Afficher une vraie page 404 si l'article est absent.
  if (!post) {
    notFound();
  }

  // 4. Formater la date pour l'affichage français.
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(post.publishedAt));

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {/* Retour vers la liste des articles */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-950"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Retour aux articles
      </Link>

      {/* En-tête de l'article */}
      <header className="mt-10">
        <p className="text-sm font-semibold text-emerald-700">
          {post.category}
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          {post.excerpt}
        </p>

        {/* Informations de publication */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-b pb-6 text-sm text-gray-500">
          <span>Par {post.author}</span>

          <time dateTime={post.publishedAt}>
            {formattedDate}
          </time>

          <span className="inline-flex items-center gap-1">
            <Clock3 size={15} aria-hidden="true" />
            {post.readingTime} min de lecture
          </span>
        </div>
      </header>

      {/* Contenu de l'article */}
      <div className="mt-10 space-y-6 text-base leading-8 text-gray-700">
        {post.content.map((paragraph, index) => (
          <p key={`${post.id}-paragraph-${index}`}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Invitation à revenir au blog */}
      <footer className="mt-12 border-t pt-8">
        <Link
          href="/blog"
          className="font-semibold text-emerald-800 hover:text-emerald-950"
        >
          Découvrir les autres articles →
        </Link>
      </footer>
    </article>
  );
}