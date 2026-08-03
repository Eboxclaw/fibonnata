import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactForm } from "@/components/ContactForm";
import { SectionReveal } from "@/components/SectionReveal";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact · Fibonnata" },
      {
        name: "description",
        content:
          "Get in touch with Fibonnata about the .natech format, the SDK, or the Bonnata Stack.",
      },
      { property: "og:title", content: "Contact · Fibonnata" },
      {
        property: "og:description",
        content:
          "Get in touch with Fibonnata about the .natech format, the SDK, or the Bonnata Stack.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://fibo-lazy-mind.lovable.app/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://fibo-lazy-mind.lovable.app/contact" }],
  }),
});


function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
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
