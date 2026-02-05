"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PromotionCarousel from "@/components/promotion-carousel";
import { Suspense } from "react";

const group9People = [
    { name: "박승배", company: "서울대학교 경영학\n중국 칭화대학교MBA/경영학석사\n미래에셋대우 투자금융본부2본부장\n하나은행 글로벌미래금융부장", department: "在 OK캐피탈 대표이사", position: "OK금융그룹 전무", title: "선임", image: "/members/0000061.png", video: "/members/0000061.mp4" },
    { name: "김태섭", company: "경기대학교 지역개발학\n한국외국어대학교 경영학 석사\nOK Bank 인도네시아 마케팅/리테일 담당임원\n오케이저축은행 온라인사업부장", department: "在 OK Asset 대표이사", position: "OK금융그룹 상무", title: "선임", image: "/members/0000077.png", video: "/members/0000077.mp4" },
];

function Group9Content() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startFromEnd = searchParams.get("from") === "end";

    return (
        <PromotionCarousel
            people={group9People}
            initialIndex={startFromEnd ? group9People.length - 1 : 0}
            onComplete={() => router.push("/group10/title")}
            onPrevious={() => router.push("/group9/summary")}
            hideDetails={true}
            variant="group7"
        />
    );
}

export default function Group9Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <Group9Content />
        </Suspense>
    );
}
