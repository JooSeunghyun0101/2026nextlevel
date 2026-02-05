"use client";

import { useRouter } from "next/navigation";
import GroupSummary from "@/components/group-summary";

// 4조 지점장/본사팀장 승격 - 회사 정보 추가 (8명)
const group4People = [
    { name: "김태원", company: "OK저축은행", department: "기업금융1본부", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1905007.png", video: "/members/1905007.mp4" },
    { name: "전경호", company: "OK저축은행", department: "기업금융1본부", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0807044.jpg", video: "/members/0807044.mp4" },
    { name: "채정훈", company: "OK저축은행", department: "기업금융2본부", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1003044.jpg", video: "/members/1003044.mp4" },
    { name: "서진규", company: "OK저축은행", department: "IB금융2팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2205030.png", video: "/members/2205030.mp4" },
    { name: "김민우", company: "OK저축은행", department: "모기지심사팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0802110.jpg", video: "/members/0802110.mp4" },
    { name: "최지웅", company: "OK저축은행", department: "모기지영업2팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0301028.png", video: "/members/0301028.mp4" },
    { name: "최금규", company: "OK저축은행", department: "영업관리팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1010087.png", video: "/members/1010087.mp4" },
    { name: "조현성", company: "OK저축은행", department: "여신기획팀", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2104002.png", video: "/members/2104002.mp4" },
];

export default function Group4SummaryPage() {
    const router = useRouter();
    return (
        <GroupSummary groupNumber={4} groupTitle="지점장/본사팀장 승격" people={group4People} isEnd={false}
            onNext={() => router.push("/group4")} onPrevious={() => router.push("/group4/title")} />
    );
}
