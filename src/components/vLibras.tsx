import { useEffect } from "react";

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => any;
    };
  }
}

export default function VLibras() {
  useEffect(() => {
    const rootId = "vlibras-root";
    let root = document.getElementById(rootId);
    if (!root) {
      root = document.createElement("div");
      root.id = rootId;
      root.setAttribute("vw", "true");
      root.className = "enabled vlibras-root";
      document.body.appendChild(root);
    } else {
      root.setAttribute("vw", "true");
      root.classList.add("enabled", "vlibras-root");
    }

    // botão/fallback visível para debug (será removido quando o widget iniciar)
    const fbId = "vlibras-fallback";
    let fallback = document.getElementById(fbId) as HTMLButtonElement | null;
    if (!fallback) {
      fallback = document.createElement("button");
      fallback.id = fbId;
      fallback.textContent = "VLibras (teste)";
      Object.assign(fallback.style, {
        position: "fixed",
        right: "16px",
        bottom: "16px",
        zIndex: "2147483647",
        padding: "10px 14px",
        background: "#2b6b99",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      } as CSSStyleDeclaration);
      fallback.title = "Fallback VLibras — será removido quando o widget iniciar";
      document.body.appendChild(fallback);
    }

    const scriptId = "vlibras-script";
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;

    let attempts = 0;
    const tryInit = () => {
      attempts += 1;
      if ((window as any).VLibras?.Widget) {
        try {
          new (window as any).VLibras.Widget("https://vlibras.gov.br/app");
          // removemos o fallback se o widget subiu
          const fb = document.getElementById(fbId);
          if (fb && fb.parentElement) fb.parentElement.removeChild(fb);
          console.info("VLibras inicializado");
        } catch (err) {
          console.error("Erro ao inicializar VLibras:", err);
        }
      } else if (attempts < 20) {
        setTimeout(tryInit, 400);
      } else {
        console.warn("VLibras não inicializou após várias tentativas");
      }
    };

    script.onload = () => tryInit();
    script.onerror = () => console.error("Erro ao carregar o script VLibras.");

    document.body.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
      // não removemos elementos do widget injetados pelo plugin aqui
      const fb = document.getElementById(fbId);
      if (fb && fb.parentElement) fb.parentElement.removeChild(fb);
    };
  }, []);

  return null;
}