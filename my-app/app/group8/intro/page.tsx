"use client";

import GroupGrid from "@/components/group-grid";
import { useRouter } from "next/navigation";

const group8People = [
    { name: "정민수", department: "심사기획팀", position: "상무", title: "승진", image: "/members/placeholder.png", video: "/members/placeholder.mp4" },
    { name: "최현우", department: "개발본부", position: "상무", title: "승진", image: "/members/placeholder.png", video: "/members/placeholder.mp4" },
    { name: "강서준", department: "NPL투자팀", position: "상무", title: "승진", image: "/members/placeholder.png", video: "/members/placeholder.mp4" },
];

export default function Group8IntroPage() {
    const router = useRouter();
    return (
        <GroupGrid groupNumber={8} groupTitle="임원 승진" people={group8People}
            onNext={() => router.push("/group9/title")} onPrevious={() => router.push("/group8?from=end")} rows={1} />
    );
}
