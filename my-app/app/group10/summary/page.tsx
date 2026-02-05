"use client";

import { useRouter } from "next/navigation";
import GroupSummary from "@/components/group-summary";
import { Suspense } from "react";

const group10People = [
    { name: "이현호", company: "OK신용정보", department: "대표이사", position: "OK금융그룹 상무", title: "신규임원", image: "/members/0000097_cropped.png", video: "/members/0000097.mp4" },
    { name: "이종대", company: "OK캐피탈", department: "AX경영관리본부", position: "OK금융그룹 상무", title: "신규임원", image: "/members/0000096_cropped.png", video: "/members/0000096.mp4" },
];

export default function Group10SummaryPage() {
    const router = useRouter();

    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <GroupSummary
                groupNumber={10}
                groupTitle="신규임원 소개"
                people={group10People}
                onNext={() => router.push("/group10")}
                onPrevious={() => router.push("/group10/title")}
                columns={1}
            />
        </Suspense>
    );
}
