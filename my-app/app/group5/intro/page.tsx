"use client";

import { useRouter } from "next/navigation";
import GroupGrid from "@/components/group-grid";

// 5조 승격자 명단 - 캐러셀과 동일 데이터 + croppedImage 추가
const group5People = [
  { name: "이운기", department: "디지털운영팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1310155.png", croppedImage: "/members/1310155_cropped.png", video: "/members/1310155.mp4" },
  { name: "한승용", department: "마이데이터운영팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2108014.png", croppedImage: "/members/2108014_cropped.png", video: "/members/2108014.mp4" },
  { name: "박인선", department: "경영기획팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0807072.jpg", croppedImage: "/members/0807072_cropped.jpg", video: "/members/0807072.mp4" },
  { name: "김영진", department: "스포츠운영팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1811122.png", croppedImage: "/members/1811122_cropped.png", video: "/members/1811122.mp4" },
  { name: "김윤구", department: "금융서비스1팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1411304.jpg", croppedImage: "/members/1411304_cropped.jpg", video: "/members/1411304.mp4" },
  { name: "김형국", department: "NPL관리팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0701013.jpg", croppedImage: "/members/0701013_cropped.jpg", video: "/members/0701013.mp4" },
  { name: "박승진", department: "인도네시아 본사팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1110064.png", croppedImage: "/members/1110064_cropped.png", video: "/members/1110064.mp4" },
  { name: "윤준강", department: "해외사업부 본사팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0903020.jpg", croppedImage: "/members/0903020_cropped.jpg", video: "/members/0903020.mp4" },
];

export default function Group5IntroPage() {
  const router = useRouter();
  return (
    <GroupGrid groupNumber={5} groupTitle="지점장/본사팀장 승격" people={group5People}
      onNext={() => router.push("/group6/title")} onPrevious={() => router.push("/group5?from=end")} />
  );
}
