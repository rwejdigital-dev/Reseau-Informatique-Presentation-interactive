import { motion } from 'framer-motion';
import { ArrowRight, Globe2, Network, UsersRound } from 'lucide-react';
import { ChapterLayout } from '@/components/ChapterLayout';
import { ExamplePanel } from '@/components/ExamplePanel';
import { SectionIntro } from '@/components/SectionIntro';
import { chapters } from '@/data/chapters';

export function PresentationPage() {
  return (
    <ChapterLayout chapter={chapters[0]} next={chapters[1]} description="Un réseau informatique relie des appareils pour faire circuler des données. Cette traversée donne une carte simple de ce qui se passe entre une personne, un écran et un service numérique.">
      <div className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="technical-card relative overflow-hidden border border-[#b9dcd2]/20 p-7 sm:p-10">
          <div className="technical-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center gap-3 font-mono-craft text-[10px] uppercase tracking-[.18em] text-[#b9dcd2]"><span className="h-2 w-2 rounded-full bg-[#ed6a3c]" /> Une définition utile</div>
            <p data-testid="text-presentation-definition" className="mt-10 max-w-3xl font-display text-[clamp(2.5rem,5vw,5.3rem)] leading-[.88] tracking-[-.045em] text-[#f2eee4]">
              Un réseau informatique est un <span className="text-[#b9dcd2]">ensemble d’équipements reliés</span> pour échanger des données.
            </p>
          </div>
        </motion.article>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            { icon: UsersRound, label: 'Personnes', text: 'Produisent et consultent des informations.' },
            { icon: Network, label: 'Appareils', text: 'Transportent, relaient ou reçoivent les données.' },
            { icon: Globe2, label: 'Services', text: 'Répondent aux demandes depuis un autre réseau.' },
          ].map(({ icon: Icon, label, text }, index) => (
            <motion.div key={label} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 * (index + 1), duration: .45 }} data-testid={`card-presentation-${label.toLowerCase()}`} className="border border-[#b9dcd2]/20 bg-[#10383f]/70 p-5">
              <Icon size={21} strokeWidth={1.4} className="text-[#ed6a3c]" />
              <h2 className="mt-8 font-display text-3xl text-[#f2eee4]">{label}</h2>
              <p className="mt-2 text-xs leading-5 text-[#dce8df]/65">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-20 grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <SectionIntro eyebrow="Le fil directeur" title="De proche en proche." description="Pour comprendre un réseau, on suit le trajet d’une donnée : qui l’identifie, qui la transporte, puis qui la protège." />
        <div className="grid gap-3">
          {['Relier des interfaces', 'Acheminer des paquets', 'Rendre un service accessible'].map((item, index) => (
            <div key={item} data-testid={`list-purpose-${index}`} className="flex items-center gap-5 border-b border-[#b9dcd2]/20 py-5">
              <span className="font-mono-craft text-[10px] text-[#ed6a3c]">0{index + 1}</span>
              <span className="font-display text-3xl text-[#b9dcd2]">{item}</span>
              <ArrowRight size={16} className="ml-auto text-[#b9dcd2]/55" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-14">
        <ExamplePanel>
          <p><strong className="font-semibold text-[#f2eee4]">À la maison :</strong> un ordinateur et un téléphone rejoignent la box en Wi-Fi. La box relie ce LAN domestique au réseau de l’opérateur, puis à Internet.</p>
        </ExamplePanel>
      </div>
    </ChapterLayout>
  );
}