
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePostDraft } from "@/app/mes-articles/nouveau/actions";

type DeleteDraftButtonProps = {
  postId: string;
};

export default function DeleteDraftButton({
  postId,
}: DeleteDraftButtonProps) {
  const router = useRouter();

  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleDelete() {
    setIsDeleting(true);
    setMessage("");

    try {
      const result = await deletePostDraft(postId);

      if (!result.success) {
        setMessage(result.message);
        setIsConfirming(false);
        return;
      }

      router.refresh();
    } catch {
      setMessage(
        "Une erreur est survenue pendant la suppression."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  if (isConfirming) {
    return (
      <div className="mt-4 space-y-3">
        <p className="text-sm text-red-700">
          Supprimer définitivement ce brouillon ?
          Cette action est irréversible.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Suppression..." : "Confirmer la suppression"}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsConfirming(false);
              setMessage("");
            }}
            disabled={isDeleting}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Annuler
          </button>
        </div>

        {message && (
          <p role="alert" className="text-sm text-red-700">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setIsConfirming(true)}
        className="text-sm font-medium text-red-700 underline hover:text-red-900"
      >
        Supprimer le brouillon
      </button>

      {message && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {message}
        </p>
      )}
    </div>
  );
}