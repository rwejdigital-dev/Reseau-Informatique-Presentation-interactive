import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

type ExamplePanelProps = {
  children: ReactNode;
};

export function ExamplePanel({ children }: ExamplePanelProps) {
  return (
    <aside data-testid="content-exemples-concrets" className="relative overflow-hidden border border-[#ed6a3c]/55 bg-[#10383f] p-6 sm:p-8">
      <div className="absolute right-0 top-0 h-20 w-20 border-b border-l border-[#ed6a3c]/35" aria-hidden="true" />
      <div className="relative">
        <div className="mb-5 flex items-center gap-3 font-mono-craft text-[10px] uppercase tracking-[.18em] text-[#ed6a3c]">
          <ArrowRight size={14} aria-hidden="true" /> Exemples concrets
        </div>
        <div className="text-sm leading-7 text-[#dce8df]/85">{children}</div>
      </div>
    </aside>
  );
}