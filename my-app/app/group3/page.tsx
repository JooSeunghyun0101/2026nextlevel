"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PromotionCarousel from "@/components/promotion-carousel";
import { Suspense } from "react";

// 3조 승진자 명단 (부장승진 9명)
const group3People = [
    { name: "이은석", company: "OK저축은행", department: "기업금융1본부\n기업금융부장", position: "부장", title: "부장승진", image: "/members/1407160.jpg", video: "/members/1407160.mp4" },
    { name: "이성훈", company: "OK저축은행", department: "기업금융1본부\n기업금융부장", position: "부장", title: "부장승진", image: "/members/1602055.png", video: "/members/1602055.mp4" },
    { name: "장원우", company: "OK저축은행", department: "기업금융2본부\n기업금융부장", position: "부장", title: "부장승진", image: "/members/0703026.png", video: "/members/0703026.mp4" },
    { name: "김한별", company: "OK저축은행", department: "기업금융2본부\n기업금융부장", position: "부장", title: "부장승진", image: "/members/1905001.png", video: "/members/1905001.mp4" },
    { name: "김희준", company: "OK저축은행", department: "리테일기획팀장", position: "부장", title: "부장승진", image: "/members/0708060.png", video: "/members/0708060.mp4" },
    { name: "박성우", company: "OK저축은행", department: "여신감리팀장", position: "부장", title: "부장승진", image: "/members/0612018.png", video: "/members/0612018.mp4" },
    { name: "민정식", company: "OK저축은행", department: "감사팀장", position: "부장", title: "부장승진", image: "/members/1407110.jpg", video: "/members/1407110.mp4" },
    { name: "박판근", company: "OK홀딩스", department: "인사기획팀장", position: "부장", title: "부장승진", image: "/members/0908033.jpg", video: "/members/0908033.mp4" },
    { name: "배정훈", company: "OK데이터시스템", department: "공통운영팀장", position: "부장", title: "부장승진", image: "/members/1011015.png", video: "/members/1011015.mp4" },
];

function Group3Content() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startFromEnd = searchParams.get("from") === "end";

    const handleComplete = () => {
        router.push("/group3/intro");
    };

    const handlePrevious = () => {
        router.push("/group3/summary");
    };

    return (
        <PromotionCarousel
            people={group3People}
            initialIndex={startFromEnd ? group3People.length - 1 : 0}
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            hideDetails={true}
        />
    );
}

export default function Group3Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <Group3Content />
        </Suspense>
    );
}
