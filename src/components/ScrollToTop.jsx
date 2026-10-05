import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === "POP") return;
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navType]);

  return null;
}
