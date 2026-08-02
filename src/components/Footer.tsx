export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 text-center">
      <p className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} FiboNNata · Intelligence shouldn't need
        everything.
      </p>
    </footer>
  );
}
