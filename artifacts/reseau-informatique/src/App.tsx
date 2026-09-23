import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  Cable,
  Check,
  ChevronDown,
  Cpu,
  FileKey2,
  Globe2,
  Layers3,
  Menu,
  Network,
  RadioTower,
  Router as RouterIcon,
  Server,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

type Chapter = {
  id: string;
  number: string;
  label: string;
};

const chapters: Chapter[] = [
  { id: 'depart', number: '01', label: 'Le départ' },
  { id: 'territoires', number: '02', label: 'Les territoires' },
  { id: 'infrastructure', number: '03', label: 'L’infrastructure' },
  { id: 'conversation', number: '04', label: 'La conversation' },
  { id: 'confiance', number: '05', label: 'La confiance' },
];

const territories = [
  {
    code: 'LAN',
    title: 'Local Area Network',
    description: 'Le réseau d’une pièce, d’un atelier ou d’un campus. Rapide, proche, presque tangible.',
    metric: 'quelques mètres → quelques kilomètres',
    accent: 'coral',
  },
  {
    code: 'MAN',
    title: 'Metropolitan Area Network',
    description: 'Le lien qui traverse une ville : des bâtiments, des services publics, des quartiers qui se parlent.',
    metric: 'une ville en mouvement',
    accent: 'mint',
  },
  {
    code: 'WAN',
    title: 'Wide Area Network',
    description: 'Le réseau des longues distances. Une constellation de routes qui rend le lointain instantané.',
    metric: 'un continent → la planète',
    accent: 'blue',
  },
];

type HardwareItem = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  Icon: LucideIcon;
  detail: string;
};

const hardware: HardwareItem[] = [
  {
    id: 'routeur',
    title: 'Routeur',
    eyebrow: 'décide',
    description: 'Il lit l’adresse de destination et choisit le prochain saut, comme un aiguilleur dans la nuit.',
    Icon: RouterIcon,
    detail: 'Il relie des réseaux différents.',
  },
  {
    id: 'commutateur',
    title: 'Commutateur',
    eyebrow: 'distribue',
    description: 'Au cœur d’un réseau local, il envoie chaque paquet vers le bon appareil — jamais au hasard.',
    Icon: Network,
    detail: 'Il relie les appareils d’un même réseau.',
  },
  {
    id: 'fibre',
    title: 'Fibre & RJ45',
    eyebrow: 'transporte',
    description: 'La lumière dans le verre. Le cuivre dans la gaine. Deux matières, une même promesse : faire circuler.',
    Icon: Cable,
    detail: 'La fibre privilégie la distance et le débit.',
  },
];

const flowSteps = [
  { id: 'ip', number: '01', label: 'IP', title: 'Trouver l’adresse', description: 'Chaque machine reçoit une adresse pour être reconnue sur le réseau.', Icon: Globe2 },
  { id: 'dns', number: '02', label: 'DNS', title: 'Traduire le nom', description: 'Le DNS transforme un nom mémorable en adresse IP exploitable.', Icon: Layers3 },
  { id: 'http', number: '03', label: 'HTTP(S)', title: 'Échanger', description: 'Le protocole organise la demande, la réponse et la protection du trajet.', Icon: FileKey2 },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return progress;
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>{children}</div>;
}

function AppPage() {
  const progress = useScrollProgress();
  const [activeChapter, setActiveChapter] = useState('depart');
  const [menuOpen, setMenuOpen] = useState(false);
  const [territory, setTerritory] = useState(0);
  const [hardwareId, setHardwareId] = useState('routeur');
  const [flowStep, setFlowStep] = useState('ip');

  useEffect(() => {
    const sections = chapters.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveChapter(visible.target.id);
      },
      { rootMargin: '-20% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const selectedHardware = hardware.find((item) => item.id === hardwareId) ?? hardware[0];
  const selectedFlow = flowSteps.find((step) => step.id === flowStep) ?? flowSteps[0];

  return (
    <div className="site-noise min-h-[100dvh] bg-[#f2eee4] text-[#12353a]">
      <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-[#12353a]/10" aria-hidden="true">
        <div className="h-full bg-[#ed6a3c] transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#b9dcd2]/20 bg-[#082b32]/90 text-[#f2eee4] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button type="button" data-testid="button-logo-home" onClick={() => scrollTo('depart')} className="group flex items-center gap-3 text-left">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#ed6a3c] text-[#ed6a3c]">
              <span className="h-2 w-2 rounded-full bg-[#ed6a3c] shadow-[0_0_0_5px_rgba(237,106,60,.16)]" />
            </span>
            <span className="font-mono-craft text-[10px] font-medium uppercase tracking-[.18em] text-[#dce8df] transition-colors group-hover:text-[#ed6a3c]">
              Réseau<br />informatique
            </span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            <span className="font-mono-craft text-[10px] uppercase tracking-[.16em] text-[#b9dcd2]/55">Une lecture en 5 chapitres</span>
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                type="button"
                data-testid={`nav-${chapter.id}`}
                onClick={() => scrollTo(chapter.id)}
                className={`font-mono-craft text-[10px] uppercase tracking-[.12em] transition-colors hover:text-[#ed6a3c] ${activeChapter === chapter.id ? 'text-[#ed6a3c]' : 'text-[#dce8df]/70'}`}
              >
                {chapter.number}
              </button>
            ))}
          </nav>
          <button
            type="button"
            data-testid="button-mobile-menu"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b9dcd2]/25 lg:hidden"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#b9dcd2]/20 bg-[#082b32] px-5 py-5 lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {chapters.map((chapter) => (
                <button key={chapter.id} type="button" data-testid={`mobile-nav-${chapter.id}`} onClick={() => scrollTo(chapter.id)} className="flex items-center gap-3 py-3 text-left font-mono-craft text-[10px] uppercase tracking-[.12em] text-[#dce8df]/80">
                  <span className="text-[#ed6a3c]">{chapter.number}</span>{chapter.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <aside className="fixed bottom-0 left-0 top-[72px] z-30 hidden w-[82px] flex-col items-center justify-end pb-10 lg:flex" aria-label="Progression">
        <div className="absolute bottom-0 top-0 w-px bg-[#12353a]/10" />
        <div className="relative flex flex-col items-center gap-7">
          {chapters.map((chapter) => (
            <button key={chapter.id} type="button" data-testid={`chapter-dot-${chapter.id}`} onClick={() => scrollTo(chapter.id)} aria-label={`Aller au chapitre ${chapter.number}`} className={`chapter-link relative flex items-center justify-center gap-3 pl-5 font-mono-craft text-[9px] uppercase tracking-[.12em] text-[#12353a]/35 transition-colors hover:text-[#ed6a3c] ${activeChapter === chapter.id ? 'active' : ''}`}>
              {activeChapter === chapter.id && <span className="absolute -left-[2px] h-10 w-px bg-[#ed6a3c]" />}
              <span className="hidden whitespace-nowrap xl:inline">{chapter.label}</span>
              <span>{chapter.number}</span>
            </button>
          ))}
        </div>
      </aside>

      <main>
        <section id="depart" className="relative flex min-h-[780px] scroll-mt-20 items-end overflow-hidden bg-[#082b32] text-[#f2eee4] sm:min-h-[850px]">
          <div className="absolute inset-0 bg-[#082b32] bg-cover bg-center opacity-55" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85')" }} />
          <div className="hero-grid absolute inset-0 opacity-75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(185,220,210,.18),transparent_28%),linear-gradient(180deg,rgba(8,43,50,.1),#082b32_94%)]" />
          <div className="relative mx-auto w-full max-w-[1440px] px-7 pb-20 pt-40 sm:px-14 sm:pb-28 lg:px-32">
            <div className="grid items-end gap-16 lg:grid-cols-[1.2fr_.8fr]">
              <div>
                <Reveal>
                  <div className="mb-7 flex items-center gap-3 font-mono-craft text-[10px] uppercase tracking-[.24em] text-[#b9dcd2]">
                    <span className="h-px w-10 bg-[#ed6a3c]" /> Chapitre 01 <span className="text-[#b9dcd2]/45">/</span> L’invisible
                  </div>
                </Reveal>
                <Reveal delay={1}>
                  <h1 className="max-w-4xl font-display text-[clamp(4.6rem,13vw,11rem)] font-semibold leading-[.75] tracking-[-.06em] text-[#f2eee4]">
                    Réseau<br /><span className="ml-[12%] text-[#b9dcd2]">informatique</span>
                  </h1>
                </Reveal>
                <Reveal delay={2}>
                  <p className="mt-11 max-w-[440px] text-[15px] leading-7 text-[#dce8df]/75">
                    Une traversée sensible de l’infrastructure qui relie chaque écran, chaque ville, chaque idée.
                  </p>
                </Reveal>
                <Reveal delay={3}>
                  <button type="button" data-testid="button-commencer" onClick={() => scrollTo('territoires')} className="group mt-9 inline-flex items-center gap-4 rounded-full border border-[#ed6a3c] bg-[#ed6a3c] px-5 py-3 font-mono-craft text-[10px] uppercase tracking-[.18em] text-[#fff4e8] transition-all hover:-translate-y-1 hover:bg-[#f47d53]">
                    Commencer <ArrowDownRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                  </button>
                </Reveal>
              </div>
              <Reveal delay={2} className="hidden lg:block">
                <div className="ml-auto max-w-[280px] border-l border-[#b9dcd2]/30 pl-5">
                  <div className="mb-8 flex items-center gap-2 text-[#ed6a3c]"><RadioTower size={16} /><span className="font-mono-craft text-[10px] uppercase tracking-[.17em]">Signal détecté</span></div>
                  <p className="font-display text-[27px] leading-[1.05] text-[#dce8df]">« Le réseau n’est pas un lieu. C’est une relation. »</p>
                  <div className="mt-7 flex items-center gap-2 font-mono-craft text-[9px] uppercase tracking-[.12em] text-[#b9dcd2]/55"><span className="h-1.5 w-1.5 rounded-full bg-[#ed6a3c]" /> Lecture estimée · 08 min</div>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="absolute bottom-7 right-7 hidden items-center gap-3 font-mono-craft text-[9px] uppercase tracking-[.16em] text-[#b9dcd2]/55 sm:flex lg:right-14">
            <span>Faire défiler</span><ChevronDown size={14} className="animate-bounce text-[#ed6a3c]" />
          </div>
        </section>

        <section id="territoires" className="scroll-mt-20 bg-[#f2eee4] px-7 py-28 sm:px-14 sm:py-36 lg:px-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
              <div>
                <Reveal><span className="font-mono-craft text-[10px] uppercase tracking-[.2em] text-[#ed6a3c]">02 / Les territoires</span></Reveal>
                <Reveal delay={1}><h2 className="mt-5 max-w-sm font-display text-[clamp(3.4rem,7vw,6.8rem)] font-semibold leading-[.78] tracking-[-.055em]">Des réseaux<br /><span className="text-[#ed6a3c]">à plusieurs</span><br />échelles.</h2></Reveal>
                <Reveal delay={2}><p className="mt-9 max-w-xs text-sm leading-6 text-[#12353a]/65">Du câble sous votre bureau aux routes océaniques : un même geste, agrandi.</p></Reveal>
                <Reveal delay={3}>
                  <div className="mt-16 flex items-center gap-4">
                    <span className="font-display text-6xl leading-none text-[#12353a]">{String(territory + 1).padStart(2, '0')}</span>
                    <span className="h-px w-14 bg-[#ed6a3c]" />
                    <span className="font-mono-craft text-[9px] uppercase tracking-[.17em] text-[#12353a]/45">03 territoires</span>
                  </div>
                </Reveal>
              </div>
              <div>
                <div className="grid gap-3">
                  {territories.map((item, index) => (
                    <Reveal key={item.code} delay={index + 1}>
                      <button type="button" data-testid={`territory-${item.code}`} onClick={() => setTerritory(index)} className={`group relative w-full overflow-hidden rounded-[2px] border p-6 text-left transition-all duration-500 sm:p-8 ${territory === index ? 'border-[#12353a] bg-[#12353a] text-[#f2eee4]' : 'border-[#12353a]/15 bg-[#ebe5d9] text-[#12353a] hover:border-[#ed6a3c]/60 hover:bg-[#eee9df]'}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <span className={`font-mono-craft text-[11px] ${territory === index ? 'text-[#ed6a3c]' : 'text-[#12353a]/40'}`}>0{index + 1}</span>
                            <span className="font-display text-4xl font-semibold">{item.code}</span>
                          </div>
                          <ArrowRight size={17} className={`mt-1 transition-transform group-hover:translate-x-2 ${territory === index ? 'text-[#ed6a3c]' : 'text-[#12353a]/30'}`} />
                        </div>
                        <div className="mt-5 grid gap-5 sm:grid-cols-[.8fr_1.2fr]">
                          <span className={`font-mono-craft text-[9px] uppercase tracking-[.13em] ${territory === index ? 'text-[#b9dcd2]' : 'text-[#12353a]/45'}`}>{item.title}</span>
                          <p className={`max-w-sm text-sm leading-6 ${territory === index ? 'text-[#dce8df]/75' : 'text-[#12353a]/65'}`}>{item.description}</p>
                        </div>
                        <div className={`mt-7 border-t pt-4 font-mono-craft text-[9px] uppercase tracking-[.15em] ${territory === index ? 'border-[#b9dcd2]/20 text-[#b9dcd2]/70' : 'border-[#12353a]/10 text-[#12353a]/40'}`}>{item.metric}</div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="infrastructure" className="scroll-mt-20 bg-[#dce8df] px-7 py-28 sm:px-14 sm:py-36 lg:px-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div>
                <Reveal><span className="font-mono-craft text-[10px] uppercase tracking-[.2em] text-[#ed6a3c]">03 / L’infrastructure</span></Reveal>
                <Reveal delay={1}><h2 className="mt-5 max-w-xl font-display text-[clamp(3.7rem,8vw,8.2rem)] font-semibold leading-[.76] tracking-[-.06em] text-[#12353a]">Les gestes<br /><span className="text-[#ed6a3c]">du réseau.</span></h2></Reveal>
              </div>
              <Reveal delay={2}><p className="max-w-[270px] text-sm leading-6 text-[#12353a]/60">Un réseau est une partition silencieuse. Chaque élément connaît son mouvement.</p></Reveal>
            </div>
            <div className="mt-16 grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
              {hardware.map((item, index) => {
                const Icon = item.Icon;
                return (
                  <Reveal key={item.id} delay={index + 1}>
                    <button type="button" data-testid={`hardware-${item.id}`} onClick={() => setHardwareId(item.id)} className={`hardware-card group min-h-[310px] w-full border p-7 text-left sm:p-9 ${hardwareId === item.id ? 'selected' : 'border-[#12353a]/15 bg-[#f2eee4] text-[#12353a]'}`}>
                      <div className="flex items-start justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full border ${hardwareId === item.id ? 'border-[#ed6a3c] text-[#ed6a3c]' : 'border-[#12353a]/20 text-[#12353a]'}`}><Icon size={20} strokeWidth={1.4} /></div>
                        <span className={`font-mono-craft text-[9px] uppercase tracking-[.16em] ${hardwareId === item.id ? 'text-[#b9dcd2]' : 'text-[#12353a]/40'}`}>{item.eyebrow}</span>
                      </div>
                      <h3 className="mt-20 font-display text-[42px] font-semibold leading-none">{item.title}</h3>
                      <p className={`mt-5 text-sm leading-6 ${hardwareId === item.id ? 'text-[#dce8df]/75' : 'text-[#12353a]/60'}`}>{item.description}</p>
                      <div className={`mt-6 flex items-center gap-2 font-mono-craft text-[9px] uppercase tracking-[.12em] ${hardwareId === item.id ? 'text-[#ed6a3c]' : 'text-[#12353a]/40'}`}><Check size={12} /> {item.detail}</div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={2} className="mt-20">
              <div className="image-wash min-h-[260px] overflow-hidden bg-[#12353a] bg-cover bg-center p-8 text-[#f2eee4] sm:min-h-[340px] sm:p-14" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1800&q=82')" }}>
                <div className="relative z-10 max-w-xl">
                  <div className="flex items-center gap-3 font-mono-craft text-[10px] uppercase tracking-[.18em] text-[#b9dcd2]"><Zap size={15} className="text-[#ed6a3c]" /> Matière en mouvement</div>
                  <p className="mt-6 font-display text-[clamp(2.2rem,5vw,4.6rem)] leading-[.85]">La distance n’est qu’une question de bon conducteur.</p>
                </div>
                <div className="absolute bottom-7 right-8 hidden text-right font-mono-craft text-[9px] uppercase tracking-[.15em] text-[#b9dcd2]/65 sm:block">Fibre optique<br /><span className="text-[#ed6a3c]">lumière · vitesse · précision</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="conversation" className="scroll-mt-20 overflow-hidden bg-[#12353a] px-7 py-28 text-[#f2eee4] sm:px-14 sm:py-36 lg:px-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-end gap-12 lg:grid-cols-[.85fr_1.15fr]">
              <div>
                <Reveal><span className="font-mono-craft text-[10px] uppercase tracking-[.2em] text-[#ed6a3c]">04 / La conversation</span></Reveal>
                <Reveal delay={1}><h2 className="mt-5 max-w-md font-display text-[clamp(3.7rem,8vw,8rem)] font-semibold leading-[.77] tracking-[-.06em]">Client.<br /><span className="text-[#b9dcd2]">Serveur.</span><br />Dialogue.</h2></Reveal>
                <Reveal delay={2}><p className="mt-9 max-w-sm text-sm leading-6 text-[#dce8df]/65">Derrière chaque page qui s’affiche, une conversation en trois temps. Rapide pour nous, millimétrée pour les machines.</p></Reveal>
              </div>
              <Reveal delay={2}>
                <div className="relative flex min-h-[300px] items-center justify-between gap-3 overflow-hidden rounded-sm border border-[#b9dcd2]/20 bg-[#082b32]/70 p-5 sm:min-h-[350px] sm:p-10">
                  <div className="absolute left-[16%] right-[16%] top-1/2 h-px bg-[#b9dcd2]/25" />
                  <div className="absolute left-[16%] right-[16%] top-1/2 h-px origin-left bg-[#ed6a3c] transition-transform duration-700" style={{ transform: `scaleX(${(flowSteps.findIndex((step) => step.id === flowStep) + 1) / 3})` }} />
                  <div className="absolute left-[15%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#ed6a3c]" />
                  <div className="absolute right-[15%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#b9dcd2]" />
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <button type="button" data-testid="flow-client" onClick={() => setFlowStep('ip')} className={`flow-node flex h-16 w-16 items-center justify-center rounded-full border border-[#ed6a3c] bg-[#ed6a3c] text-[#fff4e8] sm:h-20 sm:w-20 ${flowStep === 'ip' ? 'active' : ''}`}><Cpu size={23} strokeWidth={1.4} /></button>
                    <span className="font-mono-craft text-[9px] uppercase tracking-[.15em] text-[#dce8df]/65">Client</span>
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                      {flowSteps.map((step) => {
                        const Icon = step.Icon;
                        return <button key={step.id} type="button" data-testid={`flow-${step.id}`} onClick={() => setFlowStep(step.id)} aria-label={`Afficher ${step.label}`} className={`flow-node flex h-12 w-12 items-center justify-center rounded-full border sm:h-14 sm:w-14 ${flowStep === step.id ? 'active border-[#b9dcd2] bg-[#b9dcd2] text-[#12353a]' : 'border-[#b9dcd2]/30 bg-[#12353a] text-[#b9dcd2]/70'}`}><Icon size={17} strokeWidth={1.5} /></button>;
                      })}
                    </div>
                    <span className="font-mono-craft text-[9px] uppercase tracking-[.15em] text-[#dce8df]/65">Protocoles</span>
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#b9dcd2] bg-[#b9dcd2] text-[#12353a] sm:h-20 sm:w-20"><Server size={23} strokeWidth={1.4} /></div>
                    <span className="font-mono-craft text-[9px] uppercase tracking-[.15em] text-[#dce8df]/65">Serveur</span>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={2}>
              <div className="mt-8 grid border-y border-[#b9dcd2]/20 py-6 sm:grid-cols-[100px_1fr_auto] sm:items-center sm:gap-8">
                <span className="font-mono-craft text-[11px] text-[#ed6a3c]">{selectedFlow.number} — {selectedFlow.label}</span>
                <div><h3 className="font-display text-3xl text-[#b9dcd2]">{selectedFlow.title}</h3><p className="mt-1 max-w-lg text-sm text-[#dce8df]/60">{selectedFlow.description}</p></div>
                <ArrowRight className="mt-5 text-[#ed6a3c] sm:mt-0" size={21} />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="confiance" className="relative scroll-mt-20 overflow-hidden bg-[#ed6a3c] px-7 py-28 text-[#12353a] sm:px-14 sm:py-36 lg:px-32">
          <div className="absolute -right-32 -top-36 h-[500px] w-[500px] rounded-full border border-[#12353a]/15" />
          <div className="absolute -right-8 -top-12 h-[250px] w-[250px] rounded-full border border-[#12353a]/15" />
          <div className="relative mx-auto max-w-[1280px]">
            <div className="grid gap-14 lg:grid-cols-[1fr_.82fr] lg:items-end">
              <div>
                <Reveal><span className="font-mono-craft text-[10px] uppercase tracking-[.2em] text-[#12353a]/60">05 / La confiance</span></Reveal>
                <Reveal delay={1}><h2 className="mt-5 max-w-3xl font-display text-[clamp(4rem,10vw,10rem)] font-semibold leading-[.72] tracking-[-.065em]">Relier,<br /><span className="text-[#f2eee4]">mais protéger.</span></h2></Reveal>
                <Reveal delay={2}><p className="mt-11 max-w-md text-[15px] leading-7 text-[#12353a]/70">Le réseau ouvre des portes. La sécurité décide lesquelles restent fermées — et pour qui.</p></Reveal>
              </div>
              <Reveal delay={2}>
                <div className="rounded-sm border border-[#12353a]/20 bg-[#f2eee4]/15 p-7 sm:p-9">
                  <div className="flex items-center justify-between"><ShieldCheck size={31} strokeWidth={1.2} /><span className="font-mono-craft text-[9px] uppercase tracking-[.16em] text-[#12353a]/55">Deux réflexes</span></div>
                  <div className="mt-12 space-y-8">
                    <div className="flex gap-5 border-b border-[#12353a]/15 pb-7"><span className="font-mono-craft text-[10px] text-[#12353a]/45">01</span><div><h3 className="font-display text-3xl">Pare-feu</h3><p className="mt-1 text-sm leading-6 text-[#12353a]/65">Filtrer les flux avant qu’ils n’atteignent le réseau.</p></div></div>
                    <div className="flex gap-5"><span className="font-mono-craft text-[10px] text-[#12353a]/45">02</span><div><h3 className="font-display text-3xl">VPN</h3><p className="mt-1 text-sm leading-6 text-[#12353a]/65">Créer un tunnel privé dans un espace public.</p></div></div>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={2}>
              <div className="mt-28 flex flex-col justify-between gap-12 border-t border-[#12353a]/25 pt-9 sm:flex-row sm:items-end">
                <div>
                  <div className="flex items-center gap-3 font-mono-craft text-[10px] uppercase tracking-[.18em] text-[#12353a]/55"><Sparkles size={14} /> Fin de la traversée</div>
                  <p className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3.8rem)] leading-[.88]">Invisible, jusqu’au moment où l’on comprend qu’elle nous relie.</p>
                </div>
                <button type="button" data-testid="button-retour-haut" onClick={() => scrollTo('depart')} className="group flex items-center gap-4 self-start rounded-full border border-[#12353a] px-5 py-3 font-mono-craft text-[10px] uppercase tracking-[.15em] transition-all hover:-translate-y-1 hover:bg-[#12353a] hover:text-[#f2eee4] sm:self-end">Retour en haut <ArrowUp size={15} className="transition-transform group-hover:-translate-y-1" /></button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#082b32] px-7 py-9 text-[#dce8df]/60 sm:px-14 lg:px-32">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="font-mono-craft text-[9px] uppercase tracking-[.18em]">Réseau informatique <span className="text-[#ed6a3c]">·</span> une lecture pédagogique</div>
          <div className="font-mono-craft text-[9px] uppercase tracking-[.14em]">IP · DNS · HTTP(S) · confiance</div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppPage />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;