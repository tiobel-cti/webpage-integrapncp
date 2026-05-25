"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { contactContent } from "@/lib/content";
import { AnimateOnScroll } from "./AnimateOnScroll";

type FormStatus = "idle" | "loading" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  organization: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "Formulário não configurado. Configure NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.",
      );
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          subject: formData.subject,
          message: formData.message,
          from_name: "IntegraPNCP - Site",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData(initialFormData);
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "Erro ao enviar mensagem. Tente novamente.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Erro de conexão. Verifique sua internet e tente novamente.");
    }
  };

  if (status === "success") {
    return (
      <section id="contato" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <AnimateOnScroll>
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
                <Send size={28} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                {contactContent.successMessage}
              </h2>
              <p className="mt-3 text-slate-600">
                Recebemos sua mensagem e entraremos em contato em breve.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-semibold text-accent hover:underline"
              >
                Enviar outra mensagem
              </button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {contactContent.title}
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              {contactContent.subtitle}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  {contactContent.fields.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  {contactContent.fields.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="organization"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                {contactContent.fields.organization}
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                required
                value={formData.organization}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                {contactContent.fields.subject}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                {contactContent.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            {status === "error" && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-light disabled:opacity-60 sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  {contactContent.submit}
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
