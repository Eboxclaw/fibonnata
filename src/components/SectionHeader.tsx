import { SectionReveal } from "./SectionReveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  return (
    <SectionReveal
      className={`mb-12 sm:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:text-xs">
        {eyebrow}
      </p>
      <h2
        className={`font-display font-medium tracking-tight text-foreground text-balance text-[clamp(1.75rem,5.5vw,3rem)] leading-[1.1] max-w-3xl ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl leading-relaxed text-muted-foreground ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </SectionReveal>
  );
}
