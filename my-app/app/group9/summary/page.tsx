"use client";

import { useRouter } from "next/navigation";
import GroupSummary from "@/components/group-summary";
import { Suspense } from "react";

const group9People = [
    { name: "박승배", company: "OK캐피탈", department: "기업고객사업본부장", position: "전무", title: "선임", image: "/members/0000061.png", video: "/members/0000061.mp4" },
    { name: "김태섭", company: "OK Asset", department: "BOC", position: "대표이사", title: "선임", image: "/members/0000077.png", video: "/members/0000077.mp4" },
];

export default function Group9SummaryPage() {
    const router = useRouter();

    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <GroupSummary
                groupNumber={9}
                groupTitle="대표이사 선임"
                people={group9People}
                onNext={() => router.push("/group9")}
                onPrevious={() => router.push("/group9/title")}
                columns={1}
            />
        </Suspense>
    );
}
