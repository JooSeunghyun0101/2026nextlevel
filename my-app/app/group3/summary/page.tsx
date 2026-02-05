"use client";

import { useRouter } from "next/navigation";
import GroupSummary from "@/components/group-summary";

// 3조 부장(Lv.4)승진 - 회사 정보 추가
const group3People = [
    { name: "이은석", company: "OK저축은행", department: "기업금융1본부 RM지점장", position: "부장", title: "부장(Lv.4)승진", image: "/members/1407160.jpg", video: "/members/1407160.mp4" },
    { name: "이성훈", company: "OK저축은행", department: "기업금융1본부 RM지점장", position: "부장", title: "부장(Lv.4)승진", image: "/members/1602055.png", video: "/members/1602055.mp4" },
    { name: "장원우", company: "OK저축은행", department: "기업금융2본부 RM지점장", position: "부장", title: "부장(Lv.4)승진", image: "/members/0703026.png", video: "/members/0703026.mp4" },
    { name: "김한별", company: "OK저축은행", department: "기업금융2본부 RM지점장", position: "부장", title: "부장(Lv.4)승진", image: "/members/1905001.png", video: "/members/1905001.mp4" },
    { name: "김희준", company: "OK저축은행", department: "리테일기획팀장", position: "부장", title: "부장(Lv.4)승진", image: "/members/0708060.png", video: "/members/0708060.mp4" },
    { name: "박성우", company: "OK저축은행", department: "여신감리팀장", position: "부장", title: "부장(Lv.4)승진", image: "/members/0612018.png", video: "/members/0612018.mp4" },
    { name: "민정식", company: "OK저축은행", department: "감사팀장", position: "부장", title: "부장(Lv.4)승진", image: "/members/1407110.jpg", video: "/members/1407110.mp4" },
    { name: "박판근", company: "OK홀딩스", department: "인사기획팀장", position: "부장", title: "부장(Lv.4)승진", image: "/members/0908033.jpg", video: "/members/0908033.mp4" },
    { name: "배정훈", company: "OK데이터시스템", department: "공통운영팀장", position: "부장", title: "부장(Lv.4)승진", image: "/members/1011015.png", video: "/members/1011015.mp4" },
];

export default function Group3SummaryPage() {
    const router = useRouter();
    return (
        <GroupSummary groupNumber={3} groupTitle="부장(Lv.4)승진" people={group3People} isEnd={false}
            onNext={() => router.push("/group3")} onPrevious={() => router.push("/group3/title")} />
    );
}
