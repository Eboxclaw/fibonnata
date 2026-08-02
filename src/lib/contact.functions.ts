import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
});

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const idempotencyKey = `${data.email}:${data.subject}:${Math.floor(
      Date.now() / 1000 / 60
    )}`;

    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      idempotency_key: idempotencyKey,
    });

    if (error) {
      console.error("contact insert error", error);
      return { ok: false, error: "Unable to save your message. Please try again." };
    }

    const emailFrom = process.env["EMAIL_FROM"];
    if (emailFrom) {
      try {
        const { sendLovableEmail } = await import("@lovable.dev/email-js");
        await sendLovableEmail(
          {
            to: "fibonnata@proton.me",
            from: emailFrom,
            subject: `FiboNNata contact: ${data.subject}`,
            html: `<p><strong>From:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(
              data.email
            )}&gt;</p><p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>`,
            text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
            idempotency_key: idempotencyKey,
          },
          { apiKey: process.env["LOVABLE_API_KEY"]! }
        );
      } catch (err) {
        console.error("email send error", err);
      }
    }

    return { ok: true, error: null };
  });

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
