"use client";

import { useRouter } from "next/navigation";
import GroupSummary from "@/components/group-summary";

// 5조 지점장/본사팀장 승격 - 회사 정보 추가
const group5People = [
    { name: "이운기", company: "OK저축은행", department: "디지털운영팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1310155.png", video: "/members/1310155.mp4" },
    { name: "한승용", company: "OK저축은행", department: "마이데이터운영팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2108014.png", video: "/members/2108014.mp4" },
    { name: "박인선", company: "OK저축은행", department: "경영기획팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0807072.jpg", video: "/members/0807072.mp4" },
    { name: "김영진", company: "OK홀딩스", department: "스포츠운영팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1811122.png", video: "/members/1811122.mp4" },
    { name: "김윤구", company: "OK데이터시스템", department: "금융서비스1팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1411304.jpg", video: "/members/1411304.mp4" },
    { name: "김형국", company: "OK신용정보", department: "NPL관리팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0701013.jpg", video: "/members/0701013.mp4" },
    { name: "박승진", company: "OK에프앤아이", department: "NPL데이터팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1110064.png", video: "/members/1110064.mp4" },
    { name: "윤준강", company: "OK Bank Indonesia", department: "리테일사업부", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0903020.jpg", video: "/members/0903020.mp4" },
];

export default function Group5SummaryPage() {
    const router = useRouter();
    return (
        <GroupSummary groupNumber={5} groupTitle="지점장/본사팀장 승격" people={group5People} isEnd={false}
            onNext={() => router.push("/group5")} onPrevious={() => router.push("/group4?from=end")} />
    );
}
