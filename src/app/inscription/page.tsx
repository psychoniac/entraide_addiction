
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function InscriptionPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmation) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signUpError } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        setMessage("Compte créé. Redirection en cours...");
        router.replace("/");
        router.refresh();
      } else {
        setMessage(
          "Compte créé. Consulte ta boîte mail pour confirmer ton adresse avant de te connecter."
        );
      }
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
      <h1 className="text-3xl font-bold">Créer un compte</h1>

      <p className="mt-3 text-gray-600">
        Rejoins la communauté Entraide.
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
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="confirmation" className="mb-2 block font-medium">
            Confirmer le mot de passe
          </label>
          <input
            id="confirmation"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}

        {message && (
          <p role="status" className="text-sm text-green-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white disabled:opacity-50"
        >
          {loading ? "Création du compte..." : "Créer mon compte"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Tu as déjà un compte ?{" "}
        <Link href="/connexion" className="font-medium underline">
          Se connecter
        </Link>
      </p>
    </main>
  );
}