export function Footer() {
  return (
    <footer className="border-t border-border/50 px-5 py-10 text-center sm:px-6">
      <p className="font-mono text-xs leading-relaxed text-muted-foreground">
        © {new Date().getFullYear()} Fibonnata · An adapter should outlive the model it
        was trained on.
      </p>
    </footer>
  );
}
