
"use client";

type PostPreviewProps = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readingTime: number;
};

export default function PostPreview({
  title,
  slug,
  category,
  excerpt,
  content,
  coverImage,
  readingTime,
}: PostPreviewProps) {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {coverImage.trim() && (
        <div className="border-b border-gray-200 bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt={`Illustration de l’article : ${title || "Sans titre"}`}
            className="max-h-96 w-full object-cover"
          />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
          {category}
        </p>

        <h2 className="mt-3 break-words text-3xl font-bold tracking-tight text-gray-900">
          {title || "Titre de ton article"}
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          {readingTime} min de lecture
        </p>

        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            Résumé
          </p>
          <p className="mt-2 whitespace-pre-wrap text-gray-600">
            {excerpt || "Le résumé apparaîtra ici."}
          </p>
        </div>

        <div className="prose prose-gray mt-8 max-w-none">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 20)}`}
                className="mb-5 whitespace-pre-wrap leading-8 text-gray-700"
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-gray-400">
              Le contenu de ton article apparaîtra ici.
            </p>
          )}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4 text-sm text-gray-500">
          URL prévue : /blog/{slug || "..."}
        </div>
      </div>
    </article>
  );
}