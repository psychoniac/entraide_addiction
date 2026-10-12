
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createPostDraft,
  updatePostDraft,
} from "@/app/mes-articles/nouveau/actions";
import PostPreview from "@/components/blog/PostPreview";

const categories = [
  "Reconstruction",
  "Témoignages",
  "Vie quotidienne",
  "Prévention",
  "Ressources",
  "Autre",
];

export type EditablePost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string[];
  coverImage: string | null;
};

type PostEditorFormProps = {
  initialPost?: EditablePost;
};

function createSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostEditorForm({
  initialPost,
}: PostEditorFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialPost);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(initialPost));
  const [category, setCategory] = useState(
    initialPost?.category ?? "Reconstruction"
  );
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [content, setContent] = useState(
    initialPost?.content.join("\n\n") ?? ""
  );
  const [coverImage, setCoverImage] = useState(
    initialPost?.coverImage ?? ""
  );
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugEdited) {
      setSlug(createSlug(value));
    }

    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    if (!title.trim() || !slug.trim() || !excerpt.trim() || !content.trim()) {
      setMessage("Merci de remplir tous les champs obligatoires.");
      setIsError(true);
      return;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setMessage(
        "Le slug doit contenir des lettres minuscules, des chiffres et des tirets."
      );
      setIsError(true);
      return;
    }

    if (excerpt.trim().length > 300) {
      setMessage("Le résumé ne doit pas dépasser 300 caractères.");
      setIsError(true);
      return;
    }

    if (coverImage.trim()) {
      try {
        const imageUrl = new URL(coverImage);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          throw new Error("URL non autorisée");
        }
      } catch {
        setMessage(
          "L'URL de l'image doit être une adresse HTTP ou HTTPS valide."
        );
        setIsError(true);
        return;
      }
    }

    setIsSaving(true);

    try {
      const input = {
        title,
        slug,
        category,
        excerpt,
        content,
        coverImage,
      };

      const result = initialPost
        ? await updatePostDraft(initialPost.id, input)
        : await createPostDraft(input);

      setMessage(result.message);
      setIsError(!result.success);

      if (result.success) {
        if (isEditing) {
          router.push("/mes-articles");
          router.refresh();
        } else {
          setTitle("");
          setSlug("");
          setSlugEdited(false);
          setCategory("Reconstruction");
          setExcerpt("");
          setContent("");
          setCoverImage("");
          router.refresh();
        }
      }
    } catch {
      setMessage(
        "Une erreur est survenue pendant l'enregistrement. Réessaie."
      );
      setIsError(true);
    } finally {
      setIsSaving(false);
    }
  }

  function handleReset() {
    if (initialPost) {
      setTitle(initialPost.title);
      setSlug(initialPost.slug);
      setSlugEdited(true);
      setCategory(initialPost.category);
      setExcerpt(initialPost.excerpt);
      setContent(initialPost.content.join("\n\n"));
      setCoverImage(initialPost.coverImage ?? "");
    } else {
      setTitle("");
      setSlug("");
      setSlugEdited(false);
      setCategory("Reconstruction");
      setExcerpt("");
      setContent("");
      setCoverImage("");
    }

    setMessage("");
    setIsError(false);
  }

  return (
     <div className="space-y-6">
    {isPreviewing ? (
      <>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">
              Prévisualisation de larticle
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Aperçu non publié, basé sur tes modifications actuelles.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsPreviewing(false)}
            className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50"
          >
            Retour à lédition
          </button>
        </div>

        <PostPreview
          title={title}
          slug={slug}
          category={category}
          excerpt={excerpt}
          content={content}
          coverImage={coverImage}
          readingTime={readingTime}
        />
      </>
    ) : (

      <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-semibold">
          Titre de larticle *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={150}
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
          placeholder="Ex. : Recommencer à son rythme"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          />
      </div>

      <div>
        <label htmlFor="slug" className="mb-2 block text-sm font-semibold">
          Slug de larticle *
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          maxLength={180}
          value={slug}
          onChange={(event) => {
            setSlugEdited(true);
            setSlug(createSlug(event.target.value));
            setMessage("");
          }}
          placeholder="recommencer-a-son-rythme"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        />
        <p className="mt-2 text-sm text-gray-500">
          URL prévue : /blog/{slug || "..."}
        </p>
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block text-sm font-semibold">
          Catégorie *
        </label>
        <select
          id="category"
          name="category"
          required
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setMessage("");
          }}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
          {!categories.includes(category) && (
            <option value={category}>{category}</option>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="excerpt" className="mb-2 block text-sm font-semibold">
          Résumé *
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          maxLength={300}
          rows={3}
          value={excerpt}
          onChange={(event) => {
            setExcerpt(event.target.value);
            setMessage("");
          }}
          placeholder="Présente brièvement le sujet de ton article..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        />
        <p className="mt-1 text-right text-sm text-gray-500">
          {excerpt.length}/300 caractères
        </p>
      </div>

      <div>
        <label htmlFor="content" className="mb-2 block text-sm font-semibold">
          Contenu de larticle *
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            setMessage("");
          }}
          placeholder={"Écris ton article ici...\n\nUne ligne vide séparera les paragraphes."}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        />
        <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm text-gray-500">
          <span>{wordCount} mot(s)</span>
          <span>Temps de lecture estimé : {readingTime} min</span>
        </div>
      </div>

      <div>
        <label
          htmlFor="coverImage"
          className="mb-2 block text-sm font-semibold"
        >
          URL de limage de couverture
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="url"
          value={coverImage}
          onChange={(event) => {
            setCoverImage(event.target.value);
            setMessage("");
          }}
          placeholder="https://exemple.fr/mon-image.jpg"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        />
        <p className="mt-1 text-sm text-gray-500">
          Facultatif. Limport direct dimages sera ajouté plus tard.
        </p>
      </div>

      {message && (
        <div
          role={isError ? "alert" : "status"}
          aria-live="polite"
          className={`rounded-lg border p-4 text-sm ${
            isError
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-900"
          }`}
        >
          {message}
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={() => {
            setMessage("");
            setIsPreviewing(true);
          }}
          className="rounded-lg border border-emerald-800 px-5 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50"
        >
          Prévisualiser larticle
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
          {isSaving
            ? "Enregistrement..."
            : isEditing
              ? "Enregistrer les modifications"
              : "Enregistrer le brouillon"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={isSaving}
          className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-60"
        >
          {isEditing ? "Annuler les changements" : "Réinitialiser"}
        </button>
      </div>

      <p className="text-sm text-gray-500">
        * Champs obligatoires. Les modifications enregistrées ne publient pas
        automatiquement larticle.
      </p>
    </form>
    )}
    </div>
  );
}