
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ConnexionPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        setError(
          "Connexion impossible. Vérifie ton adresse e-mail et ton mot de passe, ainsi que la confirmation de ton adresse."
        );
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError(
        "Impossible de contacter Supabase. Vérifie ta connexion et réessaie."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">Connexion</h1>

      <p className="mt-3 text-gray-600">
        Connecte-toi pour poursuivre ton parcours sur Entraide.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block font-medium">
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block font-medium">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <p className="mt-5 text-sm text-gray-600">
        <Link href="/mot-de-passe-oublie" className="underline">
          Mot de passe oublié ?
        </Link>
      </p>

      <p className="mt-4 text-sm text-gray-600">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-medium underline">
          Créer un compte
        </Link>
      </p>
    </main>
  );
}