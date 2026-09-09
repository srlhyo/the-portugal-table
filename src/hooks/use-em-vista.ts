import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Diz se um elemento está (ou quase) no ecrã.
 *
 * Serve para não gastar bateria com o que ninguém vê: o palco 3D
 * pára de renderizar, os vídeos param de tocar. `margem` alarga a
 * janela para que as coisas acordem antes de aparecerem.
 */
export function useEmVista<T extends Element>(
  margem = "120px",
  limiar = 0.05,
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [emVista, setEmVista] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setEmVista(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entrada]) => setEmVista(entrada.isIntersecting),
      { rootMargin: margem, threshold: limiar },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margem, limiar]);

  return [ref, emVista];
}
