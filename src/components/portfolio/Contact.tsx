import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "sonner";
import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { PROFILE } from "./data";
import { submitContactMessage } from "@/lib/contact.functions";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell me a little more").max(1000, "Message is too long"),
});

const FIELD =
  "w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-accent/60 focus:shadow-[0_0_28px_-10px_var(--accent)]";

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const sendMessage = useServerFn(submitContactMessage);

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something intelligent"
          description="Open to AI engineering roles, product collaborations and freelance builds."
        />

        <Reveal className="mt-14">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-60 blur-3xl"
              style={{ backgroundImage: "var(--gradient-brand)", opacity: 0.16 }}
            />
            <div className="glass rounded-3xl p-8 sm:p-10">
              <form
                noValidate
                className="grid gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (sending) return;
                  const parsed = schema.safeParse(values);
                  if (!parsed.success) {
                    const next: Record<string, string> = {};
                    for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
                    setErrors(next);
                    return;
                  }
                  setErrors({});
                  setSending(true);
                  try {
                    await sendMessage({ data: parsed.data });
                    setValues({ name: "", email: "", message: "" });
                    toast.success("Message sent", { description: "Thanks — I'll get back to you shortly." });
                  } catch {
                    toast.error("Could not send", { description: "Please try again, or email me directly." });
                  } finally {
                    setSending(false);
                  }
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      className={FIELD}
                      placeholder="Your name"
                      maxLength={100}
                      value={values.name}
                      onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    />
                    {errors.name ? <p className="mt-1.5 text-xs text-destructive">{errors.name}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={FIELD}
                      placeholder="you@company.com"
                      maxLength={255}
                      value={values.email}
                      onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    />
                    {errors.email ? <p className="mt-1.5 text-xs text-destructive">{errors.email}</p> : null}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`${FIELD} resize-none`}
                    placeholder="What are you building?"
                    maxLength={1000}
                    value={values.message}
                    onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  />
                  {errors.message ? <p className="mt-1.5 text-xs text-destructive">{errors.message}</p> : null}
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-5">
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={sending}
                      className="rounded-full px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-strong)] transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ backgroundImage: "var(--gradient-brand)" }}
                    >
                      {sending ? "Sending..." : "Send message"}
                    </button>
                  </Magnetic>

                  <div className="flex items-center gap-3">
                    {[
                      { href: PROFILE.github, icon: Github, label: "GitHub" },
                      { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn" },
                      { href: `mailto:${PROFILE.email}`, icon: Mail, label: "Email" },
                    ].map(({ href, icon: Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="grid size-11 place-items-center rounded-full border border-border bg-secondary/50 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-foreground hover:shadow-[0_0_26px_-8px_var(--accent)]"
                      >
                        <Icon className="size-4.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
