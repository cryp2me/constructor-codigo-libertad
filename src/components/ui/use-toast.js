import { useEffect, useState } from "react";

// Store mínimo de toasts: un único estado global con suscriptores.
let toasts = [];
const listeners = new Set();
const emit = () => listeners.forEach((l) => l(toasts));

export function toast({ title, description, variant, duration = 3000 }) {
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { id, title, description, variant }];
  emit();
  setTimeout(() => dismiss(id), duration);
  return { id, dismiss: () => dismiss(id) };
}

export function dismiss(id) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function useToast() {
  const [state, setState] = useState(toasts);
  useEffect(() => {
    listeners.add(setState);
    return () => listeners.delete(setState);
  }, []);
  return { toasts: state, toast, dismiss };
}
