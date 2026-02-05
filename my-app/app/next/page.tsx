"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PromotionCarousel from "@/components/promotion-carousel";

const promotedPeople = [
    {
        name: "홍길동",
        department: "경영지원본부",
        position: "부장",
        title: "팀장",
        image: "https://picsum.photos/400/600?random=1",
    },
    {
        name: "김영희",
        department: "마케팅본부",
        position: "차장",
        title: "파트장",
        image: "https://picsum.photos/400/600?random=2",
    },
    {
        name: "이철수",
        department: "기술연구소",
        position: "과장",
        title: "선임연구원",
        image: "https://picsum.photos/400/600?random=3",
    },
    {
        name: "박민수",
        department: "영업본부",
        position: "대리",
        title: "주임",
        image: "https://picsum.photos/400/600?random=4",
    },
    {
        name: "최수진",
        department: "인사팀",
        position: "과장",
        title: "HR매니저",
        image: "https://picsum.photos/400/600?random=5",
    },
];

export default function NextPage() {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                router.push("/");
            }
        };

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            router.push("/");
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("contextmenu", handleContextMenu);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [router]);

    return <PromotionCarousel people={promotedPeople} />;
}
