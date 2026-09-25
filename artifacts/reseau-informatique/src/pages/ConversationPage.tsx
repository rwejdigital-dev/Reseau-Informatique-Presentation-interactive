import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, FileKey2, Globe2, Network, Server } from 'lucide-react';
import { ChapterLayout } from '@/components/ChapterLayout';
import { ExamplePanel } from '@/components/ExamplePanel';
import { SectionIntro } from '@/components/SectionIntro';
import { chapters, flowSteps } from '@/data/chapters';

export function ConversationPage() {
  const [stepId, setStepId] = useState('ip');
  const selected = flowSteps.find((step) => step.id === stepId) ?? flowSteps[0];

  return (
    <ChapterLayout chapter={chapters[3]} next={chapters[4]} description="Une page web n’apparaît pas d’un seul geste. Le navigateur identifie une destination, trouve son adresse, puis dialogue avec un serveur selon des protocoles connus.">
      <SectionIntro eyebrow="Une requête, trois repères" title="Le web comme conversation." description="Suivez les étapes dans l’ordre. Les rôles changent, mais le client et le serveur restent liés par un échange de requêtes et de réponses." />
      <div className="relative overflow-hidden border border-[#b9dcd2]/20 bg-[#12353a]/55 p-5 sm:p-10">
        <div className="signal-line absolute left-[14%] right-[14%] top-[112px] h-px" aria-hidden="true" />
        <div className="grid grid-cols-3 items-start gap-2 sm:gap-8">
          <div className="relative z-10 flex flex-col items-center gap-4">
            <button type="button" data-testid="flow-client" onClick={() => setStepId('ip')} className="flex h-16 w-16 items-center justify-center rounded-full border border-[#ed6a3c] bg-[#ed6a3c] text-[#fff4e8] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9dcd2] sm:h-20 sm:w-20"><Cpu size={22} strokeWidth={1.4} /></button>
            <span className="font-mono-craft text-[9px] uppercase tracking-[.15em] text-[#dce8df]/65">Client</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {flowSteps.map((step) => {
                const Icon = step.Icon;
                return <button type="button" key={step.id} data-testid={`flow-${step.id}`} onClick={() => setStepId(step.id)} aria-label={`Afficher ${step.label}`} aria-pressed={stepId === step.id} className={`flex h-12 w-12 items-center justify-center rounded-full border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed6a3c] sm:h-14 sm:w-14 ${stepId === step.id ? 'border-[#b9dcd2] bg-[#b9dcd2] text-[#12353a]' : 'border-[#b9dcd2]/30 bg-[#12353a] text-[#b9dcd2]/70'}`}><Icon size={17} strokeWidth={1.5} /></button>;
              })}
            </div>
            <span className="font-mono-craft text-[9px] uppercase tracking-[.15em] text-[#dce8df]/65">Protocoles</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#b9dcd2] bg-[#b9dcd2] text-[#12353a] sm:h-20 sm:w-20"><Server size={22} strokeWidth={1.4} /></div>
            <span className="font-mono-craft text-[9px] uppercase tracking-[.15em] text-[#dce8df]/65">Serveur</span>
          </div>
        </div>
        <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-12 grid gap-4 border-t border-[#b9dcd2]/20 pt-6 sm:grid-cols-[110px_1fr]">
          <span className="font-mono-craft text-[11px] text-[#ed6a3c]">{selected.number} — {selected.label}</span>
          <div><h2 data-testid="text-selected-flow" className="font-display text-3xl text-[#b9dcd2]">{selected.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#dce8df]/65">{selected.description}</p></div>
        </motion.div>
      </div>
      <div className="mt-14 grid gap-3 md:grid-cols-3">
        {[
          ['Adresse IP', 'Une adresse IP identifie une interface et guide l’acheminement des paquets.'],
          ['DNS', 'Le DNS associe un nom de domaine aux enregistrements correspondants, dont les adresses IP.'],
          ['HTTP / HTTPS', 'HTTP définit l’échange requête-réponse ; HTTPS le protège au moyen de TLS.'],
        ].map(([title, text], index) => (
          <div key={title} data-testid={`card-web-${index}`} className="border border-[#b9dcd2]/20 p-5"><span className="font-mono-craft text-[9px] text-[#ed6a3c]">0{index + 1}</span><h2 className="mt-8 font-display text-2xl">{title}</h2><p className="mt-2 text-xs leading-5 text-[#dce8df]/65">{text}</p></div>
        ))}
      </div>
      <div className="mt-16">
        <ExamplePanel>
          <p>Vous saisissez une adresse HTTPS. Le DNS retrouve les adresses IP associées au nom de domaine, puis les routeurs acheminent les paquets. Le navigateur établit une connexion TLS avant d’envoyer sa requête HTTP au serveur, qui renvoie la page et ses ressources.</p>
        </ExamplePanel>
      </div>
    </ChapterLayout>
  );
}