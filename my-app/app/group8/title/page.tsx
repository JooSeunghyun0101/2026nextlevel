"use client";
import GroupTitlePage from "@/components/group-title-page";

export default function Group8Title() {
    return (
        <GroupTitlePage
            title="임원 승진"
            nextRoute="/group8/summary"
            prevRoute="/group7?from=end"
        />
    );
}
