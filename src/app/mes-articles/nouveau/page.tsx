
import Link from "next/link";

import PostEditorForm from "@/components/blog/PostEditorForm";

export default function NewPostPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="text-sm font-medium text-emerald-800 hover:text-emerald-950"
      >
        ← Retour au blog
      </Link>

      <header className="mb-10 mt-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Espace de rédaction
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Créer un article
        </h1>

        <p className="mt-4 leading-7 text-gray-600">
          Prépare ton article, organise son contenu et vérifie les informations
          avant de lenregistrer.
        </p>
      </header>

      <PostEditorForm />
    </main>
  );
}