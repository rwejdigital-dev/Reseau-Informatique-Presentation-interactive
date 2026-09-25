type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionIntro({ eyebrow, title, description }: SectionIntroProps) {
  return (
    <div className="mb-9 max-w-2xl">
      <span className="font-mono-craft text-[10px] uppercase tracking-[.2em] text-[#ed6a3c]">{eyebrow}</span>
      <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-[.86] tracking-[-.045em] text-[#f2eee4]">{title}</h2>
      {description ? <p className="mt-5 max-w-xl text-sm leading-6 text-[#dce8df]/70">{description}</p> : null}
    </div>
  );
}