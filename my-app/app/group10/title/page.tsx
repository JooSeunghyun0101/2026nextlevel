"use client";
import GroupTitlePage from "@/components/group-title-page";

export default function Group9Title() {
    return (
        <GroupTitlePage
            title="신규임원 소개"
            nextRoute="/group10/summary"
            prevRoute="/group9?from=end"
        />
    );
}
