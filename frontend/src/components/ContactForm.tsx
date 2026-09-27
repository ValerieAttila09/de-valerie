import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import { Magnetic } from "@/components/Magnetic";

const field =
  "w-full border-b border-line bg-transparent py-3 text-base outline-none transition-colors duration-300 placeholder:text-muted/50 focus:border-accent";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mutation = useMutation({
    mutationFn: () => apiPost<{ id: string }>("/contact", form),
    onSuccess: () => {
      toast.success("Message sent — I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    },
    onError: () => toast.error("Could not send right now — email me directly instead."),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form data-testid="contact-form" onSubmit={submit} className="space-y-8">
      <div>
        <label htmlFor="contact-name" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          Name
        </label>
        <input
          id="contact-name"
          data-testid="contact-name-input"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          data-testid="contact-email-input"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          data-testid="contact-message-input"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about the project…"
          className={`${field} resize-none`}
        />
      </div>
      <Magnetic className="inline-block">
        <button
          type="submit"
          data-testid="contact-submit-button"
          disabled={mutation.isPending}
          className="border border-line-strong px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-bg disabled:opacity-50"
        >
          {mutation.isPending ? "Sending…" : "Send message"}
        </button>
      </Magnetic>
    </form>
  );
}
