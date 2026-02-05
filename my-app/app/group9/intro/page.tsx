"use client";

import GroupGrid from "@/components/group-grid";
import { useRouter } from "next/navigation";

const group9People = [
    { name: "김태섭", department: "대표이사", position: "대표이사", title: "선임", image: "/members/0000077_cropped.png", video: "/members/0000077.mp4" },
];

export default function Group9IntroPage() {
    const router = useRouter();
    return (
        <GroupGrid groupNumber={9} groupTitle="대표이사 선임" people={group9People}
            onNext={() => router.push("/group10/title")} onPrevious={() => router.push("/group9?from=end")} rows={1} />
    );
}
