import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Map } from 'lucide-react';
import { ChapterLayout } from '@/components/ChapterLayout';
import { ExamplePanel } from '@/components/ExamplePanel';
import { SectionIntro } from '@/components/SectionIntro';
import { chapters, territories } from '@/data/chapters';

export function TerritoriesPage() {
  const [selected, setSelected] = useState(0);
  const current = territories[selected];

  return (
    <ChapterLayout chapter={chapters[1]} next={chapters[2]} description="La portée d’un réseau change, mais le principe reste le même : des équipements coopèrent pour faire circuler des paquets vers leur destination.">
      <div className="grid gap-12 lg:grid-cols-[.62fr_1.38fr]">
        <div>
          <SectionIntro eyebrow="Une question d’échelle" title="Même logique, autre horizon." description="LAN, MAN et WAN décrivent surtout une étendue géographique. Ils ne désignent pas trois protocoles différents." />
          <div className="mt-12 flex items-center gap-4">
            <Map size={19} className="text-[#ed6a3c]" aria-hidden="true" />
            <span className="font-mono-craft text-[10px] uppercase tracking-[.16em] text-[#b9dcd2]/65">Sélectionnez un territoire</span>
          </div>
        </div>
        <div className="grid gap-3">
          {territories.map((item, index) => (
            <button type="button" key={item.code} data-testid={`territory-${item.code}`} onClick={() => setSelected(index)} aria-pressed={selected === index} className={`interactive-card technical-card w-full border p-6 text-left sm:p-8 ${selected === index ? 'selected' : 'border-[#b9dcd2]/20'}`}>
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <span className="font-mono-craft text-[10px] text-[#ed6a3c]">0{index + 1}</span>
                  <span className="font-display text-4xl font-semibold">{item.code}</span>
                </div>
                <ArrowRight size={17} className={`mt-1 transition-transform ${selected === index ? 'translate-x-1 text-[#ed6a3c]' : 'text-[#b9dcd2]/55'}`} aria-hidden="true" />
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-[.72fr_1.28fr]">
                <span className="font-mono-craft text-[9px] uppercase tracking-[.13em] text-[#b9dcd2]">{item.title}</span>
                <p className="text-sm leading-6 text-[#dce8df]/75">{item.description}</p>
              </div>
              <div className="mt-6 border-t border-[#b9dcd2]/15 pt-4 font-mono-craft text-[9px] uppercase tracking-[.15em] text-[#dce8df]/55">{item.scale}</div>
            </button>
          ))}
        </div>
      </div>
      <motion.div key={current.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10 grid gap-3 border-l-2 border-[#ed6a3c] bg-[#10383f]/65 p-6 sm:grid-cols-[120px_1fr] sm:p-8">
        <span className="font-mono-craft text-[10px] uppercase tracking-[.13em] text-[#ed6a3c]">À retenir</span>
        <p data-testid="text-selected-territory" className="max-w-2xl text-sm leading-7 text-[#dce8df]/80">{current.code} couvre {current.scale}. Sa taille influence les liaisons et l’administration, mais chaque paquet suit toujours des règles d’adressage et de routage.</p>
      </motion.div>
      <div className="mt-16">
        <ExamplePanel>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong className="font-semibold text-[#f2eee4]">LAN :</strong> les postes d’un laboratoire et son imprimante.</li>
            <li><strong className="font-semibold text-[#f2eee4]">MAN :</strong> plusieurs bâtiments universitaires reliés dans une métropole.</li>
            <li><strong className="font-semibold text-[#f2eee4]">WAN :</strong> un service hébergé dans un pays consulté depuis un autre continent.</li>
          </ul>
        </ExamplePanel>
      </div>
    </ChapterLayout>
  );
}