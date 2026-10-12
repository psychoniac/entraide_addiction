
import type { Post } from "@/types/post";

/**
 * Données temporaires du blog.
 *
 * Cette liste simule les résultats que nous récupérerons
 * plus tard depuis Supabase.
 */
export const posts: Post[] = [
  {
    id: "post-001",
    title: "Recommencer à son rythme",
    slug: "recommencer-a-son-rythme",
    excerpt:
      "Il n'existe pas de calendrier universel pour se reconstruire. Chaque petit pas compte.",
    content: [
      "Recommencer n'est pas toujours une grande décision prise un matin. Cela peut commencer par une petite habitude, une conversation ou simplement le fait de prendre le temps de souffler. Le déclic peut venir quand on ne s'y attend pas.",
      "On se compare parfois aux autres et on a l'impression d'avancer trop lentement. Pourtant, chaque parcours est différent. Ce qui compte aujourd'hui, c'est de chercher ce qui peut nous aider à avancer à notre rythme.",
      "Il y aura peut-être des journées faciles et d'autres beaucoup plus compliquées. Une difficulté ne résume pas une personne, et demander de l'aide n'est pas un signe de faiblesse.L'addiction est une lutte contre soi même, tous les jours je comnbat mon envie de boire.",
      "Tu n'as pas besoin de tout résoudre aujourd'hui. Un petit pas reste un pas."
    ],
    category: "Reconstruction",
    author: "L'équipe du blog",
    publishedAt: "2026-09-15",
    readingTime: 3,
  },
  {
    id: "post-002",
    title: "Sortir de la honte et du jugement",
    slug: "sortir-de-la-honte-et-du-jugement",
    excerpt:
      "Comment retrouver un peu d'espace pour parler de ses difficultés sans se réduire à son passé.",
    content: [
      "La honte peut rendre difficile le fait de parler de ce que l'on traverse. On peut craindre le regard des autres, leurs questions ou leurs conclusions trop rapides. Moi j'ai de plus en plus de mal a retourner dans les structures de soins, car depuis plus de 20 dépendances j'ai l'impression d'avoir répéter mon histoire des millliers de fois, et d'avoir entendu les mêmes réponses au moins autant de fois.",
      "Pourtant, une personne ne se résume pas à son addiction. Son histoire, ses difficultés, ses qualités et ses espoirs ne disparaissent pas derrière une étiquette.",
      "Trouver une personne de confiance, un groupe de parole ou un professionnel avec qui parler peut aider à ne plus porter tout cela seul. Chacun peut avancer à sa manière, sans avoir à prouver quoi que ce soit. Et je pense, de plus en plus, que l'on n'a plus de faciliter à parler avec nos pairs.",
      "Écouter sans juger ne signifie pas être d'accord sur tout. Cela signifie laisser à l'autre sa dignité et la possibilité d'être entendu."
    ],
    category: "Témoignages",
    author: "L'équipe du blog",
    publishedAt: "2026-09-22",
    readingTime: 4,
  },
  {
    id: "post-003",
    title: "Les petits progrès qui comptent",
    slug: "les-petits-progres-qui-comptent",
    excerpt:
      "Prendre soin de soi, retrouver un rythme et accepter les jours difficiles : les progrès ne sont pas toujours visibles.",
    content: [
      "On imagine parfois le changement comme une ligne droite. Dans la réalité, les progrès peuvent être irréguliers et difficiles à mesurer. Et les rechutes font parti du chemin ils ne faut pas trop culpabiliser quand cela arrive.",
      "Préparer un repas, sortir prendre l'air, reprendre contact avec quelqu'un ou se reposer quand on en a besoin peuvent être des étapes importantes.",
      "Il n'est pas nécessaire de transformer chaque journée en défi. Le repos, les limites personnelles et le soutien des autres peuvent aussi faire partie du chemin.",
      "Si tu traverses une période difficile, tu mérites de recevoir du soutien. Tu n'as pas à attendre d'aller mieux pour demander de l'aide."
    ],
    category: "Vie quotidienne",
    author: "L'équipe du blog",
    publishedAt: "2026-10-01",
    readingTime: 3,
  },
];