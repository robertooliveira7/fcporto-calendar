
"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    function checkPageHeight() {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      setIsScrollable(pageHeight > viewportHeight + 1);
    }

    checkPageHeight();

    window.addEventListener("resize", checkPageHeight);
    window.addEventListener("load", checkPageHeight);

    const observer = new ResizeObserver(checkPageHeight);
    observer.observe(document.documentElement);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", checkPageHeight);
      window.removeEventListener("load", checkPageHeight);
      observer.disconnect();
    };
  }, []);

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!isScrollable) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-700 shadow-lg transition-all hover:border-blue-200 hover:bg-blue-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[18px] w-[18px]"
        aria-hidden="true"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
