"use client";
import GroupTitlePage from "@/components/group-title-page";

export default function Group6Title() {
    return (
        <GroupTitlePage
            title="승격"
            subTitle="부장"
            nextRoute="/group6/summary"
            prevRoute="/group5?from=end"
        />
    );
}
