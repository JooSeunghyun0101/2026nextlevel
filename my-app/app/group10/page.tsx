"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PromotionCarousel from "@/components/promotion-carousel";
import { Suspense } from "react";

const group10People = [
    { name: "이현호", company: "한양대학교 경영학\n서울대학교 MBA\n현대카드 카드Collection실장\n현대커머셜 기업금융심사실장", department: "在 OK신용정보 대표이사", position: "OK금융그룹 상무", title: "신규임원", image: "/members/0000097_cropped.png", video: "/members/0000097.mp4" },
    { name: "이종대", company: "부산대학교 경영학\n블루월넛 대표이사\n현대카드 재무실장\n현대커머셜 경영관리실장", department: "在 OK캐피탈 AX경영관리본부장", position: "OK금융그룹 상무", title: "신규임원", image: "/members/0000096_cropped.png", video: "/members/0000096.mp4" },
];

function Group10Content() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startFromEnd = searchParams.get("from") === "end";

    return (
        <PromotionCarousel
            people={group10People}
            initialIndex={startFromEnd ? group10People.length - 1 : 0}
            onComplete={() => router.push("/group10/intro")}
            onPrevious={() => router.push("/group10/summary")}
            hideDetails={true}
            variant="group7"
        />
    );
}

export default function Group10Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <Group10Content />
        </Suspense>
    );
}
