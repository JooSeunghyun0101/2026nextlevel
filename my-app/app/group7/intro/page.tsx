"use client";

import GroupGrid from "@/components/group-grid";
import { useRouter } from "next/navigation";

const group7People = [
    { name: "박정은", department: "준법감시부", position: "상무", title: "신규선임", image: "/members/1604057_cropped.png", video: "/members/1604057.mp4" },
    { name: "이우창", department: "IB금융본부", position: "상무", title: "신규선임", image: "/members/2204028_cropped.png", video: "/members/2204028.mp4" },
];

export default function Group7IntroPage() {
    const router = useRouter();
    return (
        <GroupGrid groupNumber={7} groupTitle="신규임원 선임" people={group7People}
            onNext={() => router.push("/group8/title")} onPrevious={() => router.push("/group7?from=end")} rows={1} />
    );
}
