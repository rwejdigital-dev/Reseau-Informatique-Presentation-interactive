import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { ChapterLayout } from '@/components/ChapterLayout';
import { ExamplePanel } from '@/components/ExamplePanel';
import { SectionIntro } from '@/components/SectionIntro';
import { chapters, securityPrinciples } from '@/data/chapters';

export function TrustPage() {
  return (
    <ChapterLayout chapter={chapters[4]} description="La sécurité ne repose pas sur un seul outil. Elle combine des protections du transport, du réseau et de l’application, ainsi que des habitudes de maintenance." endAction>
      <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <SectionIntro eyebrow="Une sécurité en couches" title="La confiance se construit." description="On protège la confidentialité, l’intégrité et la disponibilité des données en combinant plusieurs contrôles." />
        <div className="grid gap-3">
          {securityPrinciples.map(({ id, title, description, Icon }, index) => (
            <motion.div key={id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .1 }} data-testid={`card-security-${id}`} className="technical-card border border-[#b9dcd2]/20 p-6 sm:p-7">
              <div className="flex items-start gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b9dcd2]/30 text-[#ed6a3c]"><Icon size={19} strokeWidth={1.4} /></span>
                <div><div className="flex items-center gap-3"><span className="font-mono-craft text-[9px] text-[#ed6a3c]">0{index + 1}</span><h2 className="font-display text-3xl">{title}</h2></div><p className="mt-2 max-w-xl text-sm leading-6 text-[#dce8df]/70">{description}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-16 grid gap-3 md:grid-cols-2">
        {[
          ['Confidentialité', 'Le chiffrement empêche un observateur de lire le contenu en transit.'],
          ['Intégrité', 'Les mécanismes cryptographiques détectent une modification des données.'],
          ['Authentification', 'Un certificat TLS aide le navigateur à vérifier l’identité du serveur.'],
          ['Résilience', 'Les sauvegardes, mises à jour et contrôles d’accès limitent l’impact d’un incident.'],
        ].map(([title, text], index) => (
          <div key={title} data-testid={`card-security-goal-${index}`} className="border-l border-[#b9dcd2]/30 bg-[#10383f]/55 p-5"><CheckCircle2 size={17} className="text-[#b9dcd2]" /><h2 className="mt-5 font-display text-2xl">{title}</h2><p className="mt-2 text-xs leading-5 text-[#dce8df]/65">{text}</p></div>
        ))}
      </div>
      <div className="mt-14">
        <ExamplePanel>
          <p>Sur une application moderne : TLS protège la session HTTPS, un pare-feu limite les flux entrants, l’authentification multifacteur protège le compte et la validation des entrées réduit les attaques côté application. Aucun de ces contrôles ne remplace les autres.</p>
        </ExamplePanel>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-8 border-t border-[#b9dcd2]/25 pt-8 sm:flex-row sm:items-end">
        <div><span className="font-mono-craft text-[10px] uppercase tracking-[.18em] text-[#b9dcd2]/70">Fin de la traversée</span><p className="mt-4 max-w-xl font-display text-[clamp(2rem,4vw,3.7rem)] leading-[.9]">Derrière chaque service, une infrastructure relie les personnes et les systèmes.</p></div>
      </div>
    </ChapterLayout>
  );
}