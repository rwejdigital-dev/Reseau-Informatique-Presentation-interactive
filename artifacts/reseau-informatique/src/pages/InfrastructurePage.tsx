import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { ChapterLayout } from '@/components/ChapterLayout';
import { ExamplePanel } from '@/components/ExamplePanel';
import { SectionIntro } from '@/components/SectionIntro';
import { chapters, hardware } from '@/data/chapters';

export function InfrastructurePage() {
  const [selectedId, setSelectedId] = useState('routeur');
  const selected = hardware.find((item) => item.id === selectedId) ?? hardware[0];

  return (
    <ChapterLayout chapter={chapters[2]} next={chapters[3]} description="Les protocoles donnent des règles ; l’infrastructure les met en œuvre. Chaque équipement joue un rôle précis dans le trajet des données.">
      <SectionIntro eyebrow="Les instruments" title="Une chaîne de décisions." description="Explorez les cartes : elles distinguent le rôle de l’équipement, le support physique et le lien sans fil." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {hardware.map((item, index) => {
          const Icon = item.Icon;
          return (
            <button type="button" key={item.id} data-testid={`hardware-${item.id}`} onClick={() => setSelectedId(item.id)} aria-pressed={selectedId === item.id} className={`interactive-card technical-card min-h-[295px] border p-6 text-left ${selectedId === item.id ? 'selected' : 'border-[#b9dcd2]/20'}`}>
              <div className="flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full border ${selectedId === item.id ? 'border-[#ed6a3c] text-[#ed6a3c]' : 'border-[#b9dcd2]/30 text-[#b9dcd2]'}`}><Icon size={19} strokeWidth={1.4} /></span>
                <span className="font-mono-craft text-[9px] text-[#b9dcd2]/70">0{index + 1}</span>
              </div>
              <h2 className="mt-14 font-display text-[34px] font-semibold leading-none">{item.title}</h2>
              <p className="mt-4 text-xs leading-5 text-[#dce8df]/70">{item.description}</p>
              <span className="mt-6 flex items-center gap-2 font-mono-craft text-[9px] uppercase tracking-[.1em] text-[#ed6a3c]"><Check size={12} /> {item.eyebrow}</span>
            </button>
          );
        })}
      </div>
      <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-7 border border-[#b9dcd2]/20 bg-[#12353a] p-6 sm:p-8">
        <div className="flex items-center gap-3 font-mono-craft text-[10px] uppercase tracking-[.17em] text-[#b9dcd2]"><Zap size={15} className="text-[#ed6a3c]" /> Focus infrastructure</div>
        <p data-testid="text-selected-hardware" className="mt-5 max-w-2xl font-display text-3xl leading-tight text-[#f2eee4]">{selected.detail}</p>
      </motion.div>
      <div className="mt-16">
        <ExamplePanel>
          <p>Dans une salle de cours, le Wi-Fi relie les ordinateurs à une borne. Un commutateur relie cette borne aux autres équipements du bâtiment ; un routeur envoie ensuite les paquets vers le réseau de l’université. Les câbles Ethernet et la fibre assurent les liaisons nécessaires.</p>
        </ExamplePanel>
      </div>
    </ChapterLayout>
  );
}