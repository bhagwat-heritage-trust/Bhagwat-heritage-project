import { useEffect } from "react";

const DEFAULT_TITLE = "Bhagwat Heritage Service Foundation Trust";

export function usePageMeta(title?: string, description?: string, keywords?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    if (keywords) {
      let meta = document.querySelector('meta[name="keywords"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "keywords");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", keywords);
    }
  }, [title, description, keywords]);
}
