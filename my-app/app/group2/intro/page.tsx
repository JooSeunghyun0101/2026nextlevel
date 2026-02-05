"use client";

import { useRouter } from "next/navigation";
import GroupGrid from "@/components/group-grid";

// 1조 승진자 명단 (차장(Lv.3)승진 9명)
const group1People = [
  { name: "김지은", department: "수원지점", position: "차장", title: "차장(Lv.3)승진", image: "/members/1310132.png", croppedImage: "/members/1310132_cropped.png", video: "/members/1310132.mp4" },
  { name: "김슬기", department: "영업관리팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1504241.png", croppedImage: "/members/1504241_cropped.png", video: "/members/1504241.mp4" },
  { name: "유경식", department: "IB금융1팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/2205029.png", croppedImage: "/members/2205029_cropped.png", video: "/members/2205029.mp4" },
  { name: "송복민", department: "모기지관리팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1302079.jpg", croppedImage: "/members/1302079_cropped.jpg", video: "/members/1302079.mp4" },
  { name: "사혁진", department: "모기지기획팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1504248.png", croppedImage: "/members/1504248_cropped.png", video: "/members/1504248.mp4" },
  { name: "배윤지", department: "모기지영업1팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1110080.png", croppedImage: "/members/1110080_cropped.png", video: "/members/1110080.mp4" },
  { name: "임경민", department: "여신감리팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1310126.png", croppedImage: "/members/1310126_cropped.png", video: "/members/1310126.mp4" },
  { name: "이병훈", department: "업무지원팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1403069.jpg", croppedImage: "/members/1403069_cropped.jpg", video: "/members/1403069.mp4" },
  { name: "조치현", department: "마이데이터운영팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1310080.png", croppedImage: "/members/1310080_cropped.png", video: "/members/1310080.mp4" },
];

const group2People = [
  { name: "김예은", department: "디지털센터기획팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1411171.png", croppedImage: "/members/1411171_cropped.png", video: "/members/1411171.mp4" },
  { name: "조수현", department: "소비자금융기획팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1910026.png", croppedImage: "/members/1910026_cropped.png", video: "/members/1910026.mp4" },
  { name: "김하린", department: "신용관리팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1504247.png", croppedImage: "/members/1504247_cropped.png", video: "/members/1504247.mp4" },
  { name: "안효수", department: "감사팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1403108.jpg", croppedImage: "/members/1403108_cropped.jpg", video: "/members/1403108.mp4" },
  { name: "김수열", department: "스포츠단사무국", position: "차장", title: "차장(Lv.3)승진", image: "/members/2111019.png", croppedImage: "/members/2111019_cropped.png", video: "/members/2111019.mp4" },
  { name: "변상호", department: "금융서비스3팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/2205031.png", croppedImage: "/members/2205031_cropped.png", video: "/members/2205031.mp4" },
  { name: "차주봉", department: "디지털채널1팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1904069.png", croppedImage: "/members/1904069_cropped.png", video: "/members/1904069.mp4" },
  { name: "강원석", department: "인프라서비스1팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/2107004.png", croppedImage: "/members/2107004_cropped.png", video: "/members/2107004.mp4" },
  { name: "김영설", department: "여신감리팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1403053.png", croppedImage: "/members/1403053_cropped.png", video: "/members/1403053.mp4" },
  { name: "유학현", department: "전략기획팀", position: "차장", title: "차장(Lv.3)승진", image: "/members/1611051.png", croppedImage: "/members/1611051_cropped.png", video: "/members/1611051.mp4" },
];

const combinedPeople = [...group1People, ...group2People];

export default function Group2IntroPage() {
  const router = useRouter();
  return (
    <GroupGrid groupNumber={2} groupTitle="차장(Lv.3)승진" people={combinedPeople}
      onNext={() => router.push("/group3/title")} onPrevious={() => router.push("/group2?from=end")} rows={2} />
  );
}
