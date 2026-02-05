"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PromotionCarousel from "@/components/promotion-carousel";
import { Suspense } from "react";

// 1조 승진자 명단 (차장승진 9명)
const group1People = [
    { name: "김지은", company: "OK저축은행", department: "수원지점", position: "차장", title: "차장승진", image: "/members/1310132.png", video: "/members/1310132.mp4" },
    { name: "김슬기", company: "OK저축은행", department: "영업관리팀", position: "차장", title: "차장승진", image: "/members/1504241.png", video: "/members/1504241.mp4" },
    { name: "유경식", company: "OK저축은행", department: "IB금융1팀", position: "차장", title: "차장승진", image: "/members/2205029.png", video: "/members/2205029.mp4" },
    { name: "송복민", company: "OK저축은행", department: "모기지관리팀", position: "차장", title: "차장승진", image: "/members/1302079.jpg", video: "/members/1302079.mp4" },
    { name: "사혁진", company: "OK저축은행", department: "모기지기획팀", position: "차장", title: "차장승진", image: "/members/1504248.png", video: "/members/1504248.mp4" },
    { name: "배윤지", company: "OK저축은행", department: "모기지영업1팀", position: "차장", title: "차장승진", image: "/members/1110080.png", video: "/members/1110080.mp4" },
    { name: "임경민", company: "OK저축은행", department: "여신감리팀", position: "차장", title: "차장승진", image: "/members/1310126.png", video: "/members/1310126.mp4" },
    { name: "이병훈", company: "OK저축은행", department: "업무지원팀", position: "차장", title: "차장승진", image: "/members/1403069.jpg", video: "/members/1403069.mp4" },
    { name: "조치현", company: "OK저축은행", department: "마이데이터운영팀", position: "차장", title: "차장승진", image: "/members/1310080.png", video: "/members/1310080.mp4" },
];

function Group1Content() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startFromEnd = searchParams.get("from") === "end";

    const handleComplete = () => {
        router.push("/group2/summary");
    };

    const handlePrevious = () => {
        router.push("/group1/summary");
    };

    return (
        <PromotionCarousel
            people={group1People}
            initialIndex={startFromEnd ? group1People.length - 1 : 0}
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            hideDetails={true}
        />
    );
}

export default function Group1Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <Group1Content />
        </Suspense>
    );
}
