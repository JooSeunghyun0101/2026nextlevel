"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PromotionCarousel from "@/components/promotion-carousel";
import { Suspense } from "react";

// 4조 승격자 명단 (지점장/본사팀장 승격 8명)
const group4People = [
    { name: "김태원", company: "OK저축은행", department: "기업금융1본부\n기업금융부장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1905007.png", video: "/members/1905007.mp4" },
    { name: "전경호", company: "OK저축은행", department: "기업금융1본부\n기업금융부장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0807044.jpg", video: "/members/0807044.mp4" },
    { name: "채정훈", company: "OK저축은행", department: "기업금융2본부\n기업금융부장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1003044.jpg", video: "/members/1003044.mp4" },
    { name: "서진규", company: "OK저축은행", department: "IB금융2팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2205030.png", video: "/members/2205030.mp4" },
    { name: "김민우", company: "OK저축은행", department: "모기지심사2팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0802110.jpg", video: "/members/0802110.mp4" },
    { name: "최지웅", company: "OK저축은행", department: "모기지영업2팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0301028.png", video: "/members/0301028.mp4" },
    { name: "최금규", company: "OK저축은행", department: "영업관리팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1010087.png", video: "/members/1010087.mp4" },
    { name: "조현성", company: "OK저축은행", department: "여신기획팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2104002.png", video: "/members/2104002.mp4" },
];

function Group4Content() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startFromEnd = searchParams.get("from") === "end";

    const handleComplete = () => {
        router.push("/group5/summary");
    };

    const handlePrevious = () => {
        router.push("/group4/summary");
    };

    return (
        <PromotionCarousel
            people={group4People}
            initialIndex={startFromEnd ? group4People.length - 1 : 0}
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            hideDetails={true}
        />
    );
}

export default function Group4Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <Group4Content />
        </Suspense>
    );
}
