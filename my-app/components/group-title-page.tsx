"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/animated-shader-hero";

interface GroupTitlePageProps {
    title: string;
    titleLine1?: string;
    subTitle?: string;
    nextRoute: string;
    prevRoute?: string;
}

export default function GroupTitlePage({ title, titleLine1 = "", subTitle = "", nextRoute, prevRoute }: GroupTitlePageProps) {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                router.push(nextRoute);
            } else if (e.key === "ArrowLeft" && prevRoute) {
                router.push(prevRoute);
            }
        };

        const handleClick = (e: MouseEvent) => {
            if (e.button === 0) {
                router.push(nextRoute);
            }
        };

        const handleContextMenu = (e: MouseEvent) => {
            if (prevRoute) {
                e.preventDefault();
                router.push(prevRoute);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleClick);
        window.addEventListener("contextmenu", handleContextMenu);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [nextRoute, prevRoute, router]);

    return (
        <Hero
            headline={{
                line1: titleLine1,
                line2: title,
            }}
            subtitle={subTitle}
            gradientClasses="bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400"
        />
    );
}
