"use client";

import { useRouter } from "next/navigation";
import GroupSummary from "@/components/group-summary";
import { Suspense } from "react";

const group8People = [
    { name: "오민식", company: "OK홀딩스", department: "AX경영전략본부장", position: "상무", title: "승진", image: "/members/0000094_cropped.png", video: "/members/0000094.mp4" },
    { name: "권철근", company: "OK저축은행", department: "CSR본부장", position: "상무", title: "승진", image: "/members/0000074.png", video: "/members/0000074.mp4" },
];

export default function Group8SummaryPage() {
    const router = useRouter();

    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <GroupSummary
                groupNumber={8}
                groupTitle="임원 승진"
                people={group8People}
                onNext={() => router.push("/group8")}
                onPrevious={() => router.push("/group8/title")}
                columns={1}
            />
        </Suspense>
    );
}
