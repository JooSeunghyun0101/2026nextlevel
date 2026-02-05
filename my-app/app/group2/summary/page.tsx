"use client";

import { useRouter } from "next/navigation";
import GroupSummary from "@/components/group-summary";

// 2조 차장(Lv.3)승진 - 회사 정보 추가
const group2People = [
    { name: "김예은", company: "OK저축은행", department: "디지털센터기획팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1411171.png", video: "/members/1411171.mp4" },
    { name: "조수현", company: "OK저축은행", department: "소비자금융기획팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1910026.png", video: "/members/1910026.mp4" },
    { name: "김하린", company: "OK저축은행", department: "신용관리팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1504247.jpg", video: "/members/1504247.mp4" },
    { name: "안효수", company: "OK저축은행", department: "감사팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1403108.jpg", video: "/members/1403108.mp4" },
    { name: "김수열", company: "OK저축은행", department: "스포츠단사무국", position: "차장", title: "차장(Lv.3)승진", image: "/members/2111019.png", video: "/members/2111019.mp4" },
    { name: "변상호", company: "OK데이터시스템", department: "금융서비스3팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/2205031.png", video: "/members/2205031.mp4" },
    { name: "차주봉", company: "OK데이터시스템", department: "디지털채널1팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1904069.png", video: "/members/1904069.mp4" },
    { name: "강원석", company: "OK데이터시스템", department: "인프라서비스1팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/2107004.png", video: "/members/2107004.mp4" },
    { name: "김영설", company: "OK캐피탈", department: "여신감리팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1403053.png", video: "/members/1403053.mp4" },
    { name: "유학현", company: "OK홀딩스", department: "전략기획팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1611051.png", video: "/members/1611051.mp4" },
];

export default function Group2SummaryPage() {
    const router = useRouter();
    return (
        <GroupSummary groupNumber={2} groupTitle="차장(Lv.3)승진" people={group2People} isEnd={false}
            onNext={() => router.push("/group2")} onPrevious={() => router.push("/group1?from=end")} />
    );
}
