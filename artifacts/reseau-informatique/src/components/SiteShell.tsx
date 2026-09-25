import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { chapters } from '@/data/chapters';

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const active = chapters.find((chapter) => chapter.path === location) ?? chapters[0];

  return (
    <div className="site-noise min-h-[100dvh] bg-[#082b32]">
      <header className="sticky top-0 z-40 border-b border-[#b9dcd2]/20 bg-[#082b32]/95 text-[#f2eee4] backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Link href="/" data-testid="link-logo-home" onClick={() => setMenuOpen(false)} className="group flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed6a3c]">
            <span className="font-mono-craft text-[10px] font-medium uppercase leading-3 tracking-[.18em] text-[#dce8df] transition-colors group-hover:text-[#ed6a3c]">Réseau<br />informatique</span>
          </Link>
          <nav className="hidden items-center gap-4 lg:flex xl:gap-6" aria-label="Navigation principale">
            {chapters.map((chapter) => (
              <Link key={chapter.id} href={chapter.path} data-testid={`nav-${chapter.id}`} onClick={() => setMenuOpen(false)} aria-current={active.id === chapter.id ? 'page' : undefined} className={`nav-chapter-link whitespace-nowrap font-mono-craft text-[8px] uppercase tracking-[.1em] transition-colors hover:text-[#ed6a3c] focus-visible:outline-none xl:text-[10px] xl:tracking-[.12em] ${active.id === chapter.id ? 'active text-[#b9dcd2]' : 'text-[#dce8df]/75'}`}>
                {chapter.label}
              </Link>
            ))}
          </nav>
          <button type="button" data-testid="button-mobile-menu" aria-expanded={menuOpen} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b9dcd2]/25 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed6a3c]">
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
        {menuOpen ? (
          <nav className="border-t border-[#b9dcd2]/20 bg-[#082b32] px-5 py-5 lg:hidden" aria-label="Navigation mobile">
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {chapters.map((chapter) => (
                <Link key={chapter.id} href={chapter.path} data-testid={`mobile-nav-${chapter.id}`} onClick={() => setMenuOpen(false)} aria-current={active.id === chapter.id ? 'page' : undefined} className={`flex items-center gap-3 border-b border-[#b9dcd2]/10 py-3 text-left font-mono-craft text-[10px] uppercase tracking-[.12em] ${active.id === chapter.id ? 'text-[#b9dcd2]' : 'text-[#dce8df]/80'}`}>
                  <span className="text-[#ed6a3c]">{chapter.number}</span>{chapter.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>
      <main>{children}</main>
      <footer className="border-t border-[#b9dcd2]/15 bg-[#082b32] px-6 py-8 text-[#dce8df]/55 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <span className="font-mono-craft text-[9px] uppercase tracking-[.17em]">Réseau informatique <span className="text-[#ed6a3c]">·</span> une lecture pédagogique</span>
          <span className="font-mono-craft text-[9px] uppercase tracking-[.14em]">IP · DNS · HTTP(S) · confiance</span>
        </div>
      </footer>
    </div>
  );
}