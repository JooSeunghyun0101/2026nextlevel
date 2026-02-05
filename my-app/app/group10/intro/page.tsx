"use client";

import GroupGrid from "@/components/group-grid";
import { useRouter } from "next/navigation";

const group7People = [
    { name: "이종하", department: "Credit본부", position: "이사대우", title: "신규선임", image: "/members/2205024_cropped.png", video: "/members/2205024.mp4" },
    { name: "박정은", department: "준법감시부", position: "상무", title: "신규선임", image: "/members/1604057_cropped.png", video: "/members/1604057.mp4" },
    { name: "이우창", department: "IB금융본부", position: "상무", title: "신규선임", image: "/members/2204028_cropped.png", video: "/members/2204028.mp4" },
];

const group8People = [
    { name: "오민식", department: "경영전략본부장", position: "OK금융그룹 상무", title: "승진", image: "/members/0000094_cropped.png", video: "/members/0000094.mp4" },
    { name: "권철근", department: "CSR본부장", position: "OK금융그룹 상무", title: "승진", image: "/members/0000074_cropped.png", video: "/members/0000074.mp4" },
];

const group9People = [
    { name: "김태섭", department: "대표이사", position: "대표이사", title: "선임", image: "/members/0000077_cropped.png", video: "/members/0000077.mp4" },
];

const group10People = [
    { name: "이현호", department: "任 OK신용정보 대표이사", position: "OK금융그룹 상무", title: "신규임원", image: "/members/0000097_cropped.png", video: "/members/0000097.mp4" },
    { name: "이종대", department: "任 OK캐피탈 경영관리본부 담당임원", position: "OK금융그룹 상무", title: "신규임원", image: "/members/0000096_cropped.png", video: "/members/0000096.mp4" },
];

const combinedPeople = [...group7People, ...group8People, ...group9People, ...group10People];

export default function Group10IntroPage() {
    const router = useRouter();
    return (
        <GroupGrid groupNumber={10} groupTitle="임원소개 및 승진" people={combinedPeople}
            onNext={() => router.push("/ending")} onPrevious={() => router.push("/group10?from=end")} rows={2} />
    );
}
