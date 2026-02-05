"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PromotionCarousel from "@/components/promotion-carousel";
import { Suspense } from "react";

// 6조 승격자 명단 (부장승격 4명)
const group6People = [
    { name: "문복규", company: "OK저축은행", department: "AX부장", position: "부장(Lv.4)", title: "부장승격", image: "/members/0201013.png", video: "/members/0201013.mp4" },
    { name: "정호영", company: "OK저축은행", department: "AX경영지원부장", position: "부장(Lv.4)", title: "부장승격", image: "/members/2112020.png", video: "/members/2112020.mp4" },
    // { name: "최필선", company: "OK Asset", department: "회수영업부장", position: "부장(Lv.4)", title: "부장승격", image: "/members/0607028.jpg", video: "/members/0607028.mp4" },
    // { name: "김무경", company: "OK Asset", department: "경영관리부장", position: "부장(Lv.4)", title: "부장승격", image: "/members/1601376.jpg", video: "/members/1601376.mp4" },
];

function Group6Content() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startFromEnd = searchParams.get("from") === "end";

    const handleComplete = () => {
        router.push("/group6/intro");
    };

    const handlePrevious = () => {
        router.push("/group6/summary");
    };

    return (
        <PromotionCarousel
            people={group6People}
            initialIndex={startFromEnd ? group6People.length - 1 : 0}
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            hideDetails={true}
        />
    );
}

export default function Group6Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <Group6Content />
        </Suspense>
    );
}
