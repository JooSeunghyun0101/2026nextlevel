"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PromotionCarousel from "@/components/promotion-carousel";
import { Suspense } from "react";

// Sample data for Group 7 - Must match Summary
const group7People = [
    { name: "이종하", company: "OK Bank Indonesia", department: "Credit본부장", position: "OK금융그룹 이사대우", title: "신규선임", image: "/members/2205024.png", video: "/members/2205024.mp4" },
    { name: "박정은", company: "OK저축은행", department: "기업금융2본부장", position: "OK금융그룹 이사", title: "신규선임", image: "/members/1604057.png", video: "/members/1604057.mp4" },
    { name: "이우창", company: "OK저축은행", department: "IB금융본부장", position: "OK금융그룹 이사", title: "신규선임", image: "/members/2204028.png", video: "/members/2204028.mp4" },
];

function Group7Content() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startFromEnd = searchParams.get("from") === "end";

    return (
        <PromotionCarousel
            people={group7People}
            initialIndex={startFromEnd ? group7People.length - 1 : 0}
            onComplete={() => router.push("/group8/title")}
            onPrevious={() => router.push("/group7/summary")}
            hideDetails={true}
            variant="group78"
        />
    );
}

export default function Group7Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <Group7Content />
        </Suspense>
    );
}
