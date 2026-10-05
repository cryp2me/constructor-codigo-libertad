import { useState, useCallback, useEffect } from "react";
import { api } from "@/api/client";
import { TOTAL_TASKS, STEPS } from "@/lib/steps";

export function useProgress() {
  let [e, t] = useState({
      percent: 0,
      perStep: {},
      totalTasks: TOTAL_TASKS,
      completedTasks: 0,
      loading: true,
    }),
    n = useCallback(async () => {
      try {
        let e = await api.entities.StepProgress.list(),
          n = 0,
          r = {};
        (STEPS.forEach((t) => {
          let i = e.find((e) => e.paso === t.num),
            a = i ? (i.tareas_completadas || []).length : 0;
          ((r[t.num] = {
            done: a,
            total: t.checklist.length,
            completado: a >= t.checklist.length,
          }),
            (n += a));
        }),
          t({
            percent: TOTAL_TASKS ? Math.round((n / TOTAL_TASKS) * 100) : 0,
            perStep: r,
            totalTasks: TOTAL_TASKS,
            completedTasks: n,
            loading: false,
          }));
      } catch {
        t((e) => ({
          ...e,
          loading: false,
        }));
      }
    }, []);
  return (
    useEffect(() => {
      n();
      let e = () => n();
      return (
        window.addEventListener(`progress-updated`, e),
        () => window.removeEventListener(`progress-updated`, e)
      );
    }, [n]),
    e
  );
}
export function notifyProgressUpdated() {
  window.dispatchEvent(new Event(`progress-updated`));
}
