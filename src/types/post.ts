/**
 * Type représentant un article du blog.
 * 
 * Il décrit les propriétés attendues par notre application.
 * TypeScript nous aidera à repérer les oublis et les erreurs.
 */
export  type Post = {
    /** Identifiant stable de l'article. */
    id: string;
    title: string;
    /**
     * Identifiant textuel utilisé dans l'URL.
     * Exemple : "reprendre-pied-pas-a-pas"
     */
    slug: string;

    /** Résumé court affiché dans les cartes. */
    excerpt: string;

    /**
     * Paragraphes de l'article.
     * Pour ce premier prototype, nous utilisons un tableau de textes.
     */
    content: string[];

    /** Catégorie éditoriale de l'article. */
    category: string;

    /** Nom public ou pseudo de l'auteur. */
    author: string;

    /**
     * Date de publication au format ISO.
     * Exemple : "2026-09-15"
     */
    publishedAt: string;

    /** Durée de lecture éstimée, en minutes. */
    readingTime: number;

    /** URL d'une image de couverture, facultative. */
    coverImage?: string;
};