"use client";

import { useRouter } from "next/navigation";
import GroupSummary from "@/components/group-summary";

// 6조 부장승격 - 회사 정보 추가
const group6People = [
    { name: "문복규", company: "OK저축은행", department: "AI기획팀장", position: "부장(Lv.4)", title: "부장승격", image: "/members/0201013.png", video: "/members/0201013.mp4" },
    { name: "정호영", company: "OK저축은행", department: "인사팀장", position: "부장(Lv.4)", title: "부장승격", image: "/members/2112020.png", video: "/members/2112020.mp4" },
    { name: "최필선", company: "OK저축은행", department: "기업금융1본부 RM지점장", position: "부장(Lv.4)", title: "부장승격", image: "/members/0607028.jpg", video: "/members/0607028.mp4" },
    { name: "김무경", company: "OK에프앤아이", department: "NPL데이터팀장", position: "부장(Lv.4)", title: "부장승격", image: "/members/1601376.jpg", video: "/members/1601376.mp4" },
];

export default function Group6SummaryPage() {
    const router = useRouter();
    return (
        <GroupSummary groupNumber={6} groupTitle="부장승격" people={group6People} isEnd={false}
            onNext={() => router.push("/group6")} onPrevious={() => router.push("/group6/title")} columns={1} />
    );
}
