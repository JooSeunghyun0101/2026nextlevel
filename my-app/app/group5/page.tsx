"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PromotionCarousel from "@/components/promotion-carousel";
import { Suspense } from "react";

// 5조 승격자 명단 (지점장/본사팀장 승격 9명)
const group5People = [
    { name: "이운기", company: "OK저축은행", department: "디지털운영팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1310155.png", video: "/members/1310155.mp4" },
    { name: "한승용", company: "OK저축은행", department: "마이데이터운영팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2108014.png", video: "/members/2108014.mp4" },
    { name: "박인선", company: "OK저축은행", department: "경영기획팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0807072.jpg", video: "/members/0807072.mp4" },
    { name: "김영진", company: "OK홀딩스", department: "스포츠운영팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1811122.png", video: "/members/1811122.mp4" },
    { name: "김윤구", company: "OK데이터시스템", department: "금융서비스1팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1411304.jpg", video: "/members/1411304.mp4" },
    { name: "김형국", company: "OK에프앤아이", department: "NPL관리팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0701013.jpg", video: "/members/0701013.mp4" },
    // { name: "박승진", company: "OK Asset", department: "채권집행부 본사팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1110064.jpg", video: "/members/1110064.mp4" },
    // { name: "윤준강", company: "OK Bank Indonesia", department: "리테일사업부 본사팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0903020.jpg", video: "/members/0903020.mp4" },
];

function Group5Content() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startFromEnd = searchParams.get("from") === "end";

    const handleComplete = () => {
        router.push("/group6/title");
    };

    const handlePrevious = () => {
        router.push("/group5/summary");
    };

    return (
        <PromotionCarousel
            people={group5People}
            initialIndex={startFromEnd ? group5People.length - 1 : 0}
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            hideDetails={true}
        />
    );
}

export default function Group5Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <Group5Content />
        </Suspense>
    );
}
