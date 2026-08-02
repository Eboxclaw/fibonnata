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
      className={`mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </SectionReveal>
  );
}
