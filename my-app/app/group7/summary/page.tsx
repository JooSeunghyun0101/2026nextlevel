"use client";

import { useRouter } from "next/navigation";
import GroupSummary from "@/components/group-summary";
import { Suspense } from "react";

// Sample data for Group 7 (3 people)
const group7People = [
    { name: "이종하", company: "OK Bank Indonesia", department: "Credit본부장", position: "부장", title: "신규선임", image: "/members/2205024.png", video: "/members/2205024.mp4" },
    { name: "박정은", company: "OK저축은행", department: "기업금융2본부장", position: "부장", title: "신규선임", image: "/members/1604057.png", video: "/members/1604057.mp4" },
    { name: "이우창", company: "OK저축은행", department: "IB금융1부장", position: "부장", title: "신규선임", image: "/members/2204028.png", video: "/members/2204028.mp4" },
];

export default function Group7SummaryPage() {
    const router = useRouter();

    return (
        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
            <GroupSummary
                groupNumber={7}
                groupTitle="신규임원 선임"
                people={group7People}
                onNext={() => router.push("/group7")}
                onPrevious={() => router.push("/group7/title")}
                columns={1}
            />
        </Suspense>
    );
}
