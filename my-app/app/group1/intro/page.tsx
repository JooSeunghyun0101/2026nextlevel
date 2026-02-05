"use client";

import { useRouter } from "next/navigation";
import GroupGrid from "@/components/group-grid";

// 1조 승진자 명단 (차장(Lv.3)승진 9명) - cropped 이미지 추가
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

export default function Group1IntroPage() {
  const router = useRouter();

  return (
    <GroupGrid
      groupNumber={1}
      groupTitle="차장(Lv.3)승진"
      people={group1People}
      onNext={() => router.push("/group2/summary")}
      onPrevious={() => router.push("/group1?from=end")}
    />
  );
}
