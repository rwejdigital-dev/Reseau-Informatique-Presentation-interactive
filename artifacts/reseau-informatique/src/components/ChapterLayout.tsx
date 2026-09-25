import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { ChapterHeader } from '@/components/ChapterHeader';
import type { Chapter } from '@/data/chapters';

type ChapterLayoutProps = {
  chapter: Chapter;
  description: string;
  children: ReactNode;
  next?: Chapter;
  endAction?: boolean;
};

export function ChapterLayout({ chapter, description, children, next, endAction = false }: ChapterLayoutProps) {
  return (
    <div className="chapter-shell bg-[#082b32] text-[#f2eee4]">
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <ChapterHeader number={chapter.number} kicker={chapter.kicker} title={chapter.title} description={description} />
      <div className="chapter-content mx-auto max-w-[1280px] px-6 pb-16 sm:px-10 sm:pb-24 lg:px-16">{children}</div>
      <div className="chapter-content mx-auto max-w-[1280px] px-6 pb-10 sm:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-6 border-t border-[#b9dcd2]/25 pt-7 sm:flex-row sm:items-center">
          <span className="font-mono-craft text-[9px] uppercase tracking-[.16em] text-[#b9dcd2]/55">
            {endAction ? 'Fin de la traversée' : `Chapitre ${chapter.number} sur 05`}
          </span>
          {next ? (
            <Link href={next.path} data-testid={`next-${next.id}`} className="group inline-flex items-center gap-4 self-start rounded-full border border-[#ed6a3c] bg-[#ed6a3c] px-5 py-3 font-mono-craft text-[10px] uppercase tracking-[.14em] text-[#fff4e8] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9dcd2]">
              Chapitre suivant <span className="text-[#fff4e8]/60">{next.number}</span><ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <Link href="/" data-testid="next-retour-debut" className="group inline-flex items-center gap-4 self-start rounded-full border border-[#b9dcd2]/65 px-5 py-3 font-mono-craft text-[10px] uppercase tracking-[.14em] transition-colors hover:bg-[#b9dcd2] hover:text-[#082b32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed6a3c]">
              Retour à la présentation <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}