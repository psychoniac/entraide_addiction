import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  MessageCircleHeart,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  return (
   <div>
    {/* =======================================
      HERO
      Première section visible par le visiteur
      =========================================
      */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm font-medium">
              <HeartHandshake size={20} />
              <span>
                Un espace pour avancer ensemble.
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Tu nes pas seul.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
               Un espace dinformation, de témoignages et dentraide
              pour les personnes confrontées aux addictions et leurs
              proches.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Découvrir les articles
                  <ArrowRight size={18} />
                </Link>
                <Link
                href="/ressources"
                className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-100"
                >
                  Voir les ressources
                </Link>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================
        VALEURS
        ============================================================
      */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">

          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">
              Un espace sans jugement
            </h2>

            <p className="mt-4 text-gray-600">
                Chacun possède son propre parcours. Ici, nous voulons
              privilégier lécoute, le respect et lentraide.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Carte 1 */}
            <article className="rounded-2xl border bg-white p-6">

              <HeartHandshake size={28} />
                <h3 className="mt-5 text-lg font-semibold">
                  Bienveillance
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Pouvoir parler de son parcours sans avoir peur dêtre jugé.
                </p>
            </article>

            {/* Carte 2 */}
            <article className="rounded-2xl border bg-white p-6">

              <MessageCircleHeart size={28} />
                <h3 className="mt-5 text-lg font-semibold">
                  Echange
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Partager son expérience et découvrir celle dautres personnes.
                </p>
            </article>

            {/* Carte 3 */}
            <article className="rounded-2xl border bg-white p-6">

              <ShieldCheck size={28} />
                <h3 className="mt-5 text-lg font-semibold">
                  Respect
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                    Construire progressivement un espace où chacun
                peut se sentir en sécurité.
                </p>
            </article>

          </div>

        </div>
      </section>

      {/* ========================================================
        APPEL A L'ACTION
        ========================================================== */}
        <section className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">

            <div className="max-w-2xl">

              <h2 className="text-3xl font-bold">
                Commencer simplement
              </h2>

              <p className="mt-4 text-gray-600">
                Découvre les premiers articles et ressources,
              puis participe progressivement à la communauté.
              </p>

               <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700"
            >
              Lire les articles

              <ArrowRight size={18} />
            </Link>

            </div>

          </div>

        </section>
   
   </div>
  );
}
