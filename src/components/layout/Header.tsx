import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function Header(){
    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                {/* Logo / nom du projet */}
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <HeartHandshake size={28} aria-hidden="true" />
                    <span>Entraide</span>
                </Link>

                {/* Navigation principale */}
                <nav>
                    <ul className="flex items-center gap-6 text-sm">
                        <li>
                            <Link href="/">
                                Accueil
                            </Link>
                        </li>
                         <li>
                            <Link href="/blog">
                                Articles
                            </Link>
                        </li>
                         <li>
                            <Link href="/ressources">
                                Ressources
                            </Link>
                        </li>
                         <li>
                            <Link href="/a-propos">
                                A propos
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* Actions utilisateur */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/connexion"
                        className="rounded-lg px-4 py-2 text-sm hover:bg-gray-100">
                            Connexion
                        </Link>
                        <Link
                        href="/inscription"
                        className="rounded-lg px-4 py-2 text-sm">
                            Inscription
                        </Link>
                </div>
            </div>
        </header>
    )
}