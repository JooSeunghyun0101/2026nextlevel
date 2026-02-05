"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PromotionCarousel from "@/components/promotion-carousel";
import { Suspense } from "react";

const group8People = [
    { name: "오민식", company: "OK홀딩스", department: "AX경영전략본부장", position: "OK금융그룹 상무", title: "승진", image: "/members/0000094_cropped.png", video: "/members/0000094.mp4" },
    { name: "권철근", company: "OK저축은행", department: "CSR본부장", position: "OK금융그룹 상무", title: "승진", image: "/members/0000074.png", video: "/members/0000074.mp4" },
];

function Group8Content() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startFromEnd = searchParams.get("from") === "end";

    return (
        <PromotionCarousel
            people={group8People}
            initialIndex={startFromEnd ? group8People.length - 1 : 0}
            onComplete={() => router.push("/group9/title")}
            onPrevious={() => router.push("/group8/summary")}
            hideDetails={true}
            variant="group78"
        />
    );
}

export default function Group8Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <Group8Content />
        </Suspense>
    );
}
