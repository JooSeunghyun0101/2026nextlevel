"use client";

import { useRouter } from "next/navigation";
import GroupGrid from "@/components/group-grid";

const group3People = [
  { name: "이은석", department: "기업금융1본부 RM지점장", position: "부장", title: "부장(Lv.4)승진", image: "/members/1407160.jpg", croppedImage: "/members/1407160_cropped.jpg", video: "/members/1407160.mp4" },
  { name: "이성훈", department: "기업금융1본부 RM지점장", position: "부장", title: "부장(Lv.4)승진", image: "/members/1602055.png", croppedImage: "/members/1602055_cropped.png", video: "/members/1602055.mp4" },
  { name: "장원우", department: "기업금융2본부 RM지점장", position: "부장", title: "부장(Lv.4)승진", image: "/members/0703026.png", croppedImage: "/members/0703026_cropped.png", video: "/members/0703026.mp4" },
  { name: "김한별", department: "기업금융2본부 RM지점장", position: "부장", title: "부장(Lv.4)승진", image: "/members/1905001.png", croppedImage: "/members/1905001_cropped.png", video: "/members/1905001.mp4" },
  { name: "김희준", department: "리테일기획팀장", position: "부장", title: "부장(Lv.4)승진", image: "/members/0708060.png", croppedImage: "/members/0708060_cropped.png", video: "/members/0708060.mp4" },
  { name: "박성우", department: "여신감리팀장", position: "부장", title: "부장(Lv.4)승진", image: "/members/0612018.png", croppedImage: "/members/0612018_cropped.png", video: "/members/0612018.mp4" },
  { name: "민정식", department: "감사팀장", position: "부장", title: "부장(Lv.4)승진", image: "/members/1407110.jpg", croppedImage: "/members/1407110_cropped.jpg", video: "/members/1407110.mp4" },
  { name: "박판근", department: "인사기획팀장", position: "부장", title: "부장(Lv.4)승진", image: "/members/0908033.jpg", croppedImage: "/members/0908033_cropped.jpg", video: "/members/0908033.mp4" },
  { name: "배정훈", department: "공통운영팀장", position: "부장", title: "부장(Lv.4)승진", image: "/members/1011015.png", croppedImage: "/members/1011015_cropped.png", video: "/members/1011015.mp4" },
];

export default function Group3IntroPage() {
  const router = useRouter();
  return (
    <GroupGrid groupNumber={3} groupTitle="부장(Lv.4)승진" people={group3People}
      onNext={() => router.push("/group4/title")} onPrevious={() => router.push("/group3?from=end")} />
  );
}
