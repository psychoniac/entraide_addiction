
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Crée un client Supabase adapté au rendu serveur de Next.js.
 *
 * Les cookies permettent de retrouver la session de l'utilisateur
 * lorsque nous ajouterons l'authentification.
 */
export async function createClient() {
  // Dans les versions récentes de Next.js, cookies() est asynchrone.
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // Permet à Supabase de lire les cookies de session.
        getAll() {
          return cookieStore.getAll();
        },

        // Permet de mettre à jour les cookies lorsque le contexte
        // autorise leur modification.
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Un Server Component ne peut pas toujours modifier
            // les cookies. La gestion du renouvellement de session
            // sera ajoutée avec la configuration d'authentification.
          }
        },
      },
    }
  );
}