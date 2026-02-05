"use client";

import { useRouter } from "next/navigation";
import GroupGrid from "@/components/group-grid";

// 4조 승격자 명단
const group4People = [
  { name: "김태원", department: "기업금융1본부 RM지점장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1905007.png", croppedImage: "/members/1905007_cropped.png", video: "/members/1905007.mp4" },
  { name: "전경호", department: "기업금융1본부 RM지점장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0807044.jpg", croppedImage: "/members/0807044_cropped.jpg", video: "/members/0807044.mp4" },
  { name: "채정훈", department: "기업금융2본부 RM지점장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1003044.jpg", croppedImage: "/members/1003044_cropped.jpg", video: "/members/1003044.mp4" },
  { name: "서진규", department: "IB금융2팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2205030.png", croppedImage: "/members/2205030_cropped.png", video: "/members/2205030.mp4" },
  { name: "김민우", department: "모기지심사2팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0802110.jpg", croppedImage: "/members/0802110_cropped.jpg", video: "/members/0802110.mp4" },
  { name: "최지웅", department: "모기지영업2팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0301028.png", croppedImage: "/members/0301028_cropped.png", video: "/members/0301028.mp4" },
  { name: "최금규", department: "영업관리팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1010087.jpg", croppedImage: "/members/1010087_cropped.jpg", video: "/members/1010087.mp4" },
  { name: "조현성", department: "여신기획팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2104002.png", croppedImage: "/members/2104002_cropped.png", video: "/members/2104002.mp4" },
];

// 5조 승격자 명단
const group5People = [
  { name: "이운기", department: "디지털운영팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1310155.png", croppedImage: "/members/1310155_cropped.png", video: "/members/1310155.mp4" },
  { name: "한승용", department: "마이데이터운영팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2108014.png", croppedImage: "/members/2108014_cropped.png", video: "/members/2108014.mp4" },
  { name: "박인선", department: "경영기획팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0807072.jpg", croppedImage: "/members/0807072_cropped.jpg", video: "/members/0807072.mp4" },
  { name: "김영진", department: "스포츠운영팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1811122.png", croppedImage: "/members/1811122_cropped.png", video: "/members/1811122.mp4" },
  { name: "김윤구", department: "금융서비스1팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1411304.jpg", croppedImage: "/members/1411304_cropped.jpg", video: "/members/1411304.mp4" },
  { name: "김형국", department: "NPL관리팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0701013.jpg", croppedImage: "/members/0701013_cropped.jpg", video: "/members/0701013.mp4" },
  { name: "박승진", department: "인도네시아 본사팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1110064.jpg", croppedImage: "/members/1110064_cropped.jpg", video: "/members/1110064.mp4" },
  { name: "윤준강", department: "해외사업부 본사팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0903020.jpg", croppedImage: "/members/0903020_cropped.jpg", video: "/members/0903020.mp4" },
];

// 6조 부장승격 명단
const group6People = [
  { name: "문복규", department: "미래디지털사업부장", position: "부장(Lv.4)", title: "부장승격", image: "/members/0201013.png", croppedImage: "/members/0201013_cropped.png", video: "/members/0201013.mp4" },
  { name: "정호영", department: "경영지원부장", position: "부장(Lv.4)", title: "부장승격", image: "/members/2112020.png", croppedImage: "/members/2112020_cropped.png", video: "/members/2112020.mp4" },
  { name: "최필선", department: "인도네시아장", position: "부장(Lv.4)", title: "부장승격", image: "/members/0607028.jpg", croppedImage: "/members/0607028_cropped.jpg", video: "/members/0607028.mp4" },
  { name: "김무경", department: "인도네시아장", position: "부장(Lv.4)", title: "부장승격", image: "/members/1601376.jpg", croppedImage: "/members/1601376_cropped.jpg", video: "/members/1601376.mp4" },
];

const combinedPeople = [...group4People, ...group5People, ...group6People];

export default function Group6IntroPage() {
  const router = useRouter();
  return (
    <GroupGrid groupNumber={6} groupTitle="승격" people={combinedPeople}
      onNext={() => router.push("/group7/title")} onPrevious={() => router.push("/group6?from=end")} rows={2} />
  );
}
