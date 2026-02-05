import cv2
import sys
from pathlib import Path

# Windows 콘솔 인코딩 설정
sys.stdout.reconfigure(encoding='utf-8')


def detect_face_robust(img, gray):
    """강화된 얼굴 감지 - 상단 영역에서만 찾기"""
    height, width = img.shape[:2]

    # 얼굴은 보통 이미지 상단 50%에 위치
    search_height = int(height * 0.55)
    gray_upper = gray[0:search_height, :]

    cascades = [
        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml',
        cv2.data.haarcascades + 'haarcascade_frontalface_alt.xml',
        cv2.data.haarcascades + 'haarcascade_frontalface_alt2.xml',
    ]

    all_faces = []

    for cascade_path in cascades:
        face_cascade = cv2.CascadeClassifier(cascade_path)

        # 여러 스케일로 시도
        for scale in [1.05, 1.1, 1.15]:
            for neighbors in [3, 4, 5]:
                faces = face_cascade.detectMultiScale(
                    gray_upper,
                    scaleFactor=scale,
                    minNeighbors=neighbors,
                    minSize=(30, 30)
                )
                if len(faces) > 0:
                    for (x, y, w, h) in faces:
                        # 얼굴 크기가 적절한지 확인 (너무 작은 것 제외)
                        if w >= width * 0.08 and h >= search_height * 0.1:
                            all_faces.append((x, y, w, h, w*h))

    # 프로필(측면) 얼굴도 시도
    profile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_profileface.xml')

    for scale in [1.05, 1.1]:
        # 왼쪽 프로필
        faces = profile_cascade.detectMultiScale(gray_upper, scaleFactor=scale, minNeighbors=3, minSize=(30, 30))
        for (x, y, w, h) in faces:
            if w >= width * 0.08:
                all_faces.append((x, y, w, h, w*h))

        # 오른쪽 프로필 (좌우 반전)
        gray_flipped = cv2.flip(gray_upper, 1)
        faces = profile_cascade.detectMultiScale(gray_flipped, scaleFactor=scale, minNeighbors=3, minSize=(30, 30))
        for (x, y, w, h) in faces:
            if w >= width * 0.08:
                # x 좌표 변환
                x_orig = width - x - w
                all_faces.append((x_orig, y, w, h, w*h))

    if not all_faces:
        return None

    # 중복 제거 및 가장 좋은 얼굴 선택
    # 가장 큰 얼굴 우선, 중앙에 가까운 것 선호
    best_face = None
    best_score = 0

    for (x, y, w, h, area) in all_faces:
        face_center_x = x + w // 2
        # 중앙에 가까울수록 높은 점수
        center_score = 1 - abs(face_center_x - width // 2) / (width // 2)
        # 크기 점수
        size_score = area / (width * height)
        # 최종 점수
        score = size_score * 0.7 + center_score * 0.3

        if score > best_score:
            best_score = score
            best_face = (x, y, w, h)

    return best_face


def crop_to_passport(image_path, output_path):
    """얼굴 인식 후 3:4 비율 증명사진으로 크롭"""

    img = cv2.imread(str(image_path))
    if img is None:
        print(f"  [X] Image load failed: {image_path.name}")
        return False

    height, width = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)

    face = detect_face_robust(img, gray)

    if face is None:
        print(f"  [!] No face detected: {image_path.name} - using upper center")
        # 얼굴 미감지 시 이미지 상단 중앙 기준
        face_center_x = width // 2
        face_center_y = height // 5
        face_w = width // 4
        face_h = height // 6
    else:
        fx, fy, fw, fh = face
        face_center_x = fx + fw // 2
        face_center_y = fy + fh // 2
        face_w = fw
        face_h = fh
        print(f"  [i] Face detected: {image_path.name} at ({fx}, {fy})")

    # 3:4 비율 크롭 영역 계산
    # 얼굴 높이의 3.2배를 크롭 높이로 사용
    crop_height = int(face_h * 3.2)
    crop_height = max(crop_height, 400)
    crop_height = min(crop_height, height)

    crop_width = int(crop_height * 3 / 4)
    crop_width = min(crop_width, width)

    # 비율 재조정
    if crop_width > width:
        crop_width = width
        crop_height = int(crop_width * 4 / 3)
    if crop_height > height:
        crop_height = height
        crop_width = int(crop_height * 3 / 4)

    # 얼굴 상단이 크롭 영역의 15-20% 지점에 오도록
    face_top = face_center_y - face_h // 2
    y1 = int(face_top - crop_height * 0.18)

    # x는 얼굴 중심 기준
    x1 = int(face_center_x - crop_width // 2)

    # 경계 조정
    if y1 < 0:
        y1 = 0
    if x1 < 0:
        x1 = 0

    y2 = y1 + crop_height
    x2 = x1 + crop_width

    if y2 > height:
        y2 = height
        y1 = max(0, y2 - crop_height)
    if x2 > width:
        x2 = width
        x1 = max(0, x2 - crop_width)

    # 실제 크롭 크기 계산
    actual_h = y2 - y1
    actual_w = x2 - x1

    # 3:4 비율 강제 적용
    target_w = int(actual_h * 3 / 4)
    if target_w <= actual_w:
        diff = actual_w - target_w
        x1 += diff // 2
        x2 = x1 + target_w
        if x2 > width:
            x2 = width
            x1 = x2 - target_w
        if x1 < 0:
            x1 = 0
            x2 = x1 + target_w
    else:
        target_h = int(actual_w * 4 / 3)
        diff = actual_h - target_h
        y1 += diff // 2
        y2 = y1 + target_h

    # 크롭 및 리사이즈
    cropped = img[y1:y2, x1:x2]
    resized = cv2.resize(cropped, (450, 600), interpolation=cv2.INTER_LANCZOS4)

    cv2.imwrite(str(output_path), resized)
    print(f"  [OK] Done: {image_path.name} -> {output_path.name}")
    return True


def main():
    pic_folder = Path(r"C:\Users\apro\2026intro2\pic")
    output_folder = pic_folder / "cropped"
    output_folder.mkdir(exist_ok=True)

    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp'}
    image_files = [f for f in pic_folder.iterdir()
                   if f.is_file() and f.suffix.lower() in image_extensions]

    print(f"\nFound {len(image_files)} image files")
    print(f"Output folder: {output_folder}\n")

    success_count = 0
    for img_path in sorted(image_files):
        output_path = output_folder / f"{img_path.stem}_cropped{img_path.suffix}"
        if crop_to_passport(img_path, output_path):
            success_count += 1

    print(f"\nCompleted: {success_count}/{len(image_files)} images cropped")
    print(f"Saved to: {output_folder}")


if __name__ == "__main__":
    main()
