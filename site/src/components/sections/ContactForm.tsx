"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { contactContent } from "@/content/institutional";
import styles from "./ContactForm.module.css";

type FormState = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  consent: boolean;
};

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
  consent: false,
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Informe seu nome.";
    if (!values.email.trim()) next.email = "Informe um e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "E-mail inválido.";
    }
    if (!values.subject.trim()) next.subject = "Informe um assunto.";
    if (!values.message.trim() || values.message.trim().length < 10) {
      next.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
    }
    if (!values.consent) next.consent = "É necessário o consentimento para continuar.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("idle");
    if (!validate()) {
      setStatus("error");
      return;
    }

    // Development mode: validated locally, no remote provider yet.
    setStatus("success");
    setValues(initial);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <p className={styles.notice}>
        Modo de desenvolvimento: a mensagem é validada localmente e ainda não é enviada a um
        provedor externo.
      </p>

      <div className={styles.grid}>
        <Field
          id="name"
          label="Nome"
          value={values.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
          required
        />
        <Field
          id="email"
          label="E-mail"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
          required
        />
      </div>

      <Field
        id="company"
        label="Empresa (opcional)"
        value={values.company}
        onChange={(value) => update("company", value)}
      />
      <Field
        id="subject"
        label="Assunto"
        value={values.subject}
        error={errors.subject}
        onChange={(value) => update("subject", value)}
        required
      />
      <Field
        id="message"
        label="Mensagem"
        value={values.message}
        error={errors.message}
        onChange={(value) => update("message", value)}
        required
        multiline
      />

      <label className={styles.consent}>
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(event) => update("consent", event.target.checked)}
        />
        <span>{contactContent.consentLabel}</span>
      </label>
      {errors.consent ? <p className={styles.error}>{errors.consent}</p> : null}

      <Button type="submit">Enviar mensagem</Button>

      {status === "success" ? (
        <p className={styles.success} role="status">
          {contactContent.success}
        </p>
      ) : null}
      {status === "error" ? (
        <p className={styles.error} role="alert">
          Revise os campos destacados.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  multiline,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  multiline?: boolean;
}) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          rows={5}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          required={required}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
