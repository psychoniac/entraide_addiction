
"use server";

import { createClient } from "@/lib/supabase/server";

type DraftResult = {
  success: boolean;
  message: string;
  slug?: string;
};

type DraftInput = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
};

const categories = [
  "Reconstruction",
  "Témoignages",
  "Vie quotidienne",
  "Prévention",
  "Ressources",
  "Autre",
];

export async function createPostDraft(
  input: DraftInput
): Promise<DraftResult> {
  try {
    const supabase = await createClient();

    // 1. Vérifier l'identité de l'utilisateur côté serveur.
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: "Tu dois être connecté pour enregistrer un brouillon.",
      };
    }

    // 2. Vérifier les données côté serveur.
    const title = input.title.trim();
    const slug = input.slug.trim();
    const excerpt = input.excerpt.trim();
    const category = input.category;
    const rawContent = input.content.trim();
    const coverImage = input.coverImage.trim();

    if (!title || !slug || !excerpt || !rawContent) {
      return {
        success: false,
        message: "Merci de remplir tous les champs obligatoires.",
      };
    }

    if (title.length > 150 || slug.length > 180) {
      return {
        success: false,
        message: "Le titre ou le slug est trop long.",
      };
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return {
        success: false,
        message: "Le slug n'a pas un format valide.",
      };
    }

    if (excerpt.length > 300) {
      return {
        success: false,
        message: "Le résumé ne doit pas dépasser 300 caractères.",
      };
    }

    if (!categories.includes(category)) {
      return {
        success: false,
        message: "La catégorie sélectionnée n'est pas valide.",
      };
    }

    // Chaque paragraphe devient un élément du tableau JSONB.
    const paragraphs = rawContent
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (paragraphs.length === 0) {
      return {
        success: false,
        message: "Le contenu de l'article est vide.",
      };
    }

    if (coverImage) {
      try {
        const imageUrl = new URL(coverImage);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          throw new Error("URL non autorisée");
        }
      } catch {
        return {
          success: false,
          message: "L'URL de couverture doit être une adresse HTTP ou HTTPS valide.",
        };
      }
    }

    const wordCount = rawContent.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // 3. Enregistrer uniquement un brouillon appartenant à l'utilisateur.
    const { error: insertError } = await supabase.from("posts").insert({
      title,
      slug,
      excerpt,
      content: paragraphs,
      category,
      author_id: user.id,
      author_name:
        user.user_metadata?.full_name ||
        user.email ||
        "Auteur Entraide",
      status: "draft",
      published_at: null,
      reading_time: readingTime,
      cover_image: coverImage || null,
    });

    if (insertError) {
      console.error("Erreur d'enregistrement du brouillon :", insertError.code);

      if (insertError.code === "23505") {
        return {
          success: false,
          message: "Ce slug est déjà utilisé. Choisis une autre URL.",
        };
      }

      if (insertError.code === "42501") {
        return {
          success: false,
          message: "L'enregistrement a été refusé par les règles de sécurité. Vérifie les politiques RLS.",
        };
      }

      return {
        success: false,
        message: "Impossible d'enregistrer le brouillon. Réessaie.",
      };
    }

    return {
      success: true,
      message: "Ton brouillon a bien été enregistré dans Supabase.",
      slug,
    };
  } catch (error) {
    console.error(
      "Erreur inattendue lors de la création du brouillon :",
      error instanceof Error ? error.message : "Erreur inconnue"
    );

    return {
      success: false,
      message: "Une erreur inattendue est survenue. Réessaie.",
    };
  }
}


export async function updatePostDraft(
  id: string,
  input: DraftInput
): Promise<DraftResult> {
  try {
    const supabase = await createClient();

    // 1. Vérifier l'utilisateur connecté.
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: "Tu dois être connecté pour modifier un brouillon.",
      };
    }

    // 2. Vérifier les champs.
    const title = input.title.trim();
    const slug = input.slug.trim();
    const excerpt = input.excerpt.trim();
    const rawContent = input.content.trim();
    const coverImage = input.coverImage.trim();
    const category = input.category;

    if (!id || !title || !slug || !excerpt || !rawContent) {
      return {
        success: false,
        message: "Merci de remplir tous les champs obligatoires.",
      };
    }

    if (title.length > 150 || slug.length > 180) {
      return {
        success: false,
        message: "Le titre ou le slug est trop long.",
      };
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return {
        success: false,
        message: "Le slug n'a pas un format valide.",
      };
    }

    if (excerpt.length > 300) {
      return {
        success: false,
        message: "Le résumé ne doit pas dépasser 300 caractères.",
      };
    }

    if (!categories.includes(category)) {
      return {
        success: false,
        message: "La catégorie sélectionnée n'est pas valide.",
      };
    }

    if (coverImage) {
      try {
        const imageUrl = new URL(coverImage);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          throw new Error("URL non autorisée");
        }
      } catch {
        return {
          success: false,
          message: "L'URL de couverture doit être une adresse HTTP ou HTTPS valide.",
        };
      }
    }

    const paragraphs = rawContent
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (paragraphs.length === 0) {
      return {
        success: false,
        message: "Le contenu de l'article est vide.",
      };
    }

    const wordCount = rawContent.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // 3. Modifier uniquement le brouillon de cet utilisateur.
    const { data, error } = await supabase
      .from("posts")
      .update({
        title,
        slug,
        excerpt,
        content: paragraphs,
        category,
        reading_time: readingTime,
        cover_image: coverImage || null,
      })
      .eq("id", id)
      .eq("author_id", user.id)
      .eq("status", "draft")
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Erreur de modification du brouillon :", error.code);

      if (error.code === "23505") {
        return {
          success: false,
          message: "Ce slug est déjà utilisé. Choisis une autre URL.",
        };
      }

      return {
        success: false,
        message: "Impossible de modifier le brouillon. Réessaie.",
      };
    }

    if (!data) {
      return {
        success: false,
        message: "Brouillon introuvable ou tu n'es pas autorisé à le modifier.",
      };
    }

    return {
      success: true,
      message: "Ton brouillon a bien été modifié.",
      slug,
    };
  } catch (error) {
    console.error(
      "Erreur inattendue lors de la modification :",
      error instanceof Error ? error.message : "Erreur inconnue"
    );

    return {
      success: false,
      message: "Une erreur inattendue est survenue. Réessaie.",
    };
  }
}


export async function deletePostDraft(
  id: string
): Promise<DraftResult> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: "Tu dois être connecté pour supprimer un brouillon.",
      };
    }

    if (!id || typeof id !== "string") {
      return {
        success: false,
        message: "Identifiant de brouillon invalide.",
      };
    }

    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .eq("author_id", user.id)
      .eq("status", "draft")
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Erreur de suppression du brouillon :", error.code);

      return {
        success: false,
        message: "Impossible de supprimer le brouillon. Réessaie.",
      };
    }

    if (!data) {
      return {
        success: false,
        message:
          "Brouillon introuvable ou tu n'es pas autorisé à le supprimer.",
      };
    }

    return {
      success: true,
      message: "Le brouillon a bien été supprimé.",
    };
  } catch (error) {
    console.error(
      "Erreur inattendue lors de la suppression :",
      error instanceof Error ? error.message : "Erreur inconnue"
    );

    return {
      success: false,
      message: "Une erreur inattendue est survenue. Réessaie.",
    };
  }
}