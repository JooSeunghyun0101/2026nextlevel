"use client";

import { useRouter } from "next/navigation";
import GroupGrid from "@/components/group-grid";

// 4조 승격자 명단 - 캐러셀과 동일 데이터 + croppedImage 추가 (8명)
const group4People = [
  { name: "김태원", department: "기업금융1본부 RM지점장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1905007.png", croppedImage: "/members/1905007_cropped.png", video: "/members/1905007.mp4" },
  { name: "전경호", department: "기업금융1본부 RM지점장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0807044.jpg", croppedImage: "/members/0807044_cropped.jpg", video: "/members/0807044.mp4" },
  { name: "채정훈", department: "기업금융2본부 RM지점장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1003044.jpg", croppedImage: "/members/1003044_cropped.jpg", video: "/members/1003044.mp4" },
  { name: "서진규", department: "IB금융2팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2205030.png", croppedImage: "/members/2205030_cropped.png", video: "/members/2205030.mp4" },
  { name: "김민우", department: "모기지심사2팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0802110.jpg", croppedImage: "/members/0802110_cropped.jpg", video: "/members/0802110.mp4" },
  { name: "최지웅", department: "모기지영업2팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/0301028.png", croppedImage: "/members/0301028_cropped.png", video: "/members/0301028.mp4" },
  { name: "최금규", department: "영업관리팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/1010087.png", croppedImage: "/members/1010087_cropped.png", video: "/members/1010087.mp4" },
  { name: "조현성", department: "여신기획팀장", position: "차장(Lv.3)", title: "지점장/본사팀장 승격", image: "/members/2104002.png", croppedImage: "/members/2104002_cropped.png", video: "/members/2104002.mp4" },
];

export default function Group4IntroPage() {
  const router = useRouter();
  return (
    <GroupGrid groupNumber={4} groupTitle="지점장/본사팀장 승격" people={group4People}
      onNext={() => router.push("/group5/summary")} onPrevious={() => router.push("/group4?from=end")} />
  );
}
