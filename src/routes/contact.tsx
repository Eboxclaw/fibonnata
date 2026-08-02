import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactForm } from "@/components/ContactForm";
import { SectionReveal } from "@/components/SectionReveal";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact · FiboNNata" },
      { name: "description", content: "Get in touch with FiboNNata." },
      { property: "og:title", content: "Contact · FiboNNata" },
      { property: "og:description", content: "Get in touch with FiboNNata." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <SectionHeader
        eyebrow="Contact"
        title="Reach out."
        subtitle="Tell us what you're building, ask a question, or just say hello. We read every message."
        align="center"
      />
      <SectionReveal>
        <ContactForm />
      </SectionReveal>
      <SectionReveal className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Prefer email?{" "}
          <a
            href="mailto:fibonnata@proton.me"
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
          >
            fibonnata@proton.me
          </a>
        </p>
      </SectionReveal>
    </main>
  );
}
