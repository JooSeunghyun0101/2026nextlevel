"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/animated-shader-hero";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        router.push("/group1/title");
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (e.button === 0) {
        router.push("/group1/title");
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [router]);

  return (
    <Hero
      headline={{
        line1: "2026 정기인사",
        line2: "승진/승격자 발표",
      }}
      subtitle=""
      gradientClasses="bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400"
    />
  );
}
