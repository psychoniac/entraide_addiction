
import { createClient } from "@/lib/supabase/server";

export const instant = false;

export default async function TestSessionPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Diagnostic de session
        </h1>
        <p className="mt-4">
          Erreur lors de la vérification de la session.
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Diagnostic de session
        </h1>
        <p className="mt-4">
          Aucun utilisateur connecté na été détecté.
        </p>
        <p className="mt-2">
          Il faudra vérifier la connexion et les cookies.
        </p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        Diagnostic de session
      </h1>

      <p className="mt-4 text-green-700">
        Un utilisateur connecté a été détecté.
      </p>

      <p className="mt-2">
        Adresse e-mail : {user.email}
      </p>

      <p className="mt-2 break-all">
        Identifiant utilisateur : {user.id}
      </p>
    </main>
  );
}