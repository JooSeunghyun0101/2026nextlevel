"use client";
import GroupTitlePage from "@/components/group-title-page";

export default function Group10Title() {
    return (
        <GroupTitlePage
            title="대표이사 선임"
            nextRoute="/group9/summary"
            prevRoute="/group8?from=end"
        />
    );
}
