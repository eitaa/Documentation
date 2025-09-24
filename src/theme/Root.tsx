import React, { useEffect, useRef } from "react";
import mediumZoom from "medium-zoom";
import { useLocation } from "@docusaurus/router";

export default function Root({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const zoomRef = useRef<any>(null);

  const initializeZoom = () => {
    if (zoomRef.current) {
      zoomRef.current.detach();
      zoomRef.current = null;
    }

    // همه تصاویر داخل .markdown به جز اونایی که کلاس no-zoom دارند
    const zoomableImages = Array.from(
      document.querySelectorAll<HTMLImageElement>(".markdown img:not(.no-zoom)")
    );

    if (zoomableImages.length > 0) {
      zoomRef.current = mediumZoom(zoomableImages, {
        margin: 24,
        background: "#000",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      initializeZoom();
    }, 150);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        initializeZoom();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      if (zoomRef.current) {
        zoomRef.current.detach();
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [location]);

  return <>{children}</>;
}
