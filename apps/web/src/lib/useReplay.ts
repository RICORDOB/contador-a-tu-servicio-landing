"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve un contador que se incrementa cada `intervalMs`.
 * Cambiar el `key` de un subtree con este valor remonta el contenido
 * y reproduce de nuevo sus animaciones CSS (loop corto, como la calculadora).
 */
export function useReplay(intervalMs: number) {
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIteration((n) => n + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return iteration;
}