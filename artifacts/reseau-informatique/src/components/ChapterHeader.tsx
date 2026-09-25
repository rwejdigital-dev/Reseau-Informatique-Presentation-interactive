import type { ReactNode } from 'react';

type ChapterHeaderProps = {
  number: string;
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function ChapterHeader({ number, kicker, title, description, children }: ChapterHeaderProps) {
  return (
    <header className="chapter-content chapter-hero mx-auto max-w-[1280px] px-6 pb-14 pt-16 sm:px-10 sm:pb-20 sm:pt-24 lg:px-16">
      <div className="grid items-end gap-10 lg:grid-cols-[1fr_.72fr]">
        <div>
          <div className="flex items-center gap-3 font-mono-craft text-[10px] uppercase tracking-[.22em] text-[#b9dcd2]">
            <span className="h-px w-10 bg-[#ed6a3c]" aria-hidden="true" />
            Chapitre {number} <span className="text-[#b9dcd2]/40">/</span> {kicker}
          </div>
          <h1 data-testid={`heading-chapter-${number}`} className="mt-7 max-w-4xl font-display text-[clamp(3.8rem,10vw,8.5rem)] font-semibold leading-[.76] tracking-[-.065em] text-[#f2eee4]">
            {title}
          </h1>
        </div>
        <div className="border-l border-[#b9dcd2]/25 pl-5 lg:mb-2">
          <p data-testid={`text-chapter-description-${number}`} className="max-w-md text-[15px] leading-7 text-[#dce8df]/75">{description}</p>
          {children}
        </div>
      </div>
    </header>
  );
}