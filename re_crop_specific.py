import cv2
import sys
from pathlib import Path

# Windows 콘솔 인코딩 설정
sys.stdout.reconfigure(encoding='utf-8')

def detect_face_aggressive(img, gray):
    """더 공격적인 얼굴 감지"""
    height, width = img.shape[:2]
    
    # 전체 이미지에서 검색 (상단 제한 없음)
    
    cascades = [
        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml',
        cv2.data.haarcascades + 'haarcascade_frontalface_alt.xml',
        cv2.data.haarcascades + 'haarcascade_frontalface_alt2.xml',
    ]

    all_faces = []

    print(f"  [DEBUG] Image size: {width}x{height}")

    for cascade_path in cascades:
        face_cascade = cv2.CascadeClassifier(cascade_path)
        if face_cascade.empty():
            print(f"  [Error] Could not load cascade: {cascade_path}")
            continue

        # 더 낮은 minNeighbors와 세밀한 scaleFactor 시도
        for scale in [1.01, 1.03, 1.05, 1.1]:
            for neighbors in [1, 2, 3, 4, 5]: 
                faces = face_cascade.detectMultiScale(
                    gray,
                    scaleFactor=scale,
                    minNeighbors=neighbors,
                    minSize=(30, 30)
                )
                if len(faces) > 0:
                    for (x, y, w, h) in faces:
                        # 너무 작은 영역 제외 (완화된 기준)
                        if w >= width * 0.05: 
                            all_faces.append((x, y, w, h, w*h))
                            print(f"    - Found face at {x},{y} size {w}x{h} (scale={scale}, neighbors={neighbors}, cascade={Path(cascade_path).name})")

    if not all_faces:
        return None

    # 가장 큰 얼굴 우선, 중앙에 가까운 것 선호
    best_face = None
    best_score = -999

    for (x, y, w, h, area) in all_faces:
        face_center_x = x + w // 2
        
        # 중앙 점수: 중앙에 가까울수록 높음
        center_score = 1 - abs(face_center_x - width // 2) / (width // 2)
        
        # 크기 점수: 화면 차지 비율
        size_score = area / (width * height)
        
        # 위치 점수 (y): 얼굴은 보통 상단 10% ~ 50% 사이에 위치
        pos_penalty = 0
        y_ratio = y / height
        
        if y_ratio < 0.1:
            pos_penalty = 1.0 # 너무 위 (헤더/배경)
        elif y_ratio > 0.5:
            pos_penalty = 1.0 # 너무 아래 (몸통/명찰/손)
        
        # 너무 큰 얼굴(=몸통 오인) 감점
        # width의 45% 이상이면 페널티
        size_penalty = 0
        if w > width * 0.45:
            size_penalty = 0.8
            
        # 최종 점수 계산
        # 크기(20%) + 중앙(80%) - 위치패널티 - 사이즈패널티
        score = size_score * 0.2 + center_score * 0.8 - pos_penalty - size_penalty

        print(f"    -> Score for {x},{y} ({w}x{h}): {score:.4f} (pos_penalty={pos_penalty})")

        if score > best_score:
            best_score = score
            best_face = (x, y, w, h)

    return best_face

def crop_and_save(image_path, output_path):
    print(f"Processing: {image_path.name}")
    img = cv2.imread(str(image_path))
    if img is None:
        print(f"  [X] Image load failed")
        return False

    height, width = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)

    face = detect_face_aggressive(img, gray)

    if face is None:
        print(f"  [!] No face detected even with aggressive search.")
        return False
    else:
        fx, fy, fw, fh = face
        face_center_x = fx + fw // 2
        face_center_y = fy + fh // 2
        
        # 얼굴 중앙이 조금 위쪽으로 치우쳐져 있을 수 있으므로 보정 (눈 위치 쯤을 중앙으로)
        # 보통 detect된 박스는 이마~턱이므로, 중심은 코. passport 사진은 눈이 상단 1/3~1/2 지점.
        
        print(f"  [i] Best face selected: ({fx}, {fy}, {fw}, {fh})")

        # 3:4 비율 크롭 영역 계산 (얼굴 크기 기반)
        # 너무 타이트하지 않게 3.5배 정도 (여유있게)
        crop_height = int(fh * 3.5)
        crop_height = max(crop_height, 400)
        crop_height = min(crop_height, height)

        crop_width = int(crop_height * 3 / 4)
        crop_width = min(crop_width, width)
        
        # 다시 높이 조정
        if crop_width == width:
             crop_height = int(crop_width * 4 / 3)

        # 얼굴 상단(정수리)에서 조금 위 여백 확보
        # 얼굴 박스의 y(fy)는 보통 이마 끝이나 정수리 근처. 
        # 더 여유있게 잡기 위해 박스 위로 높이의 20% 정도 여백
        y1 = int(fy - crop_height * 0.15)
        
        # 중심 보정 (가로)
        x1 = int(face_center_x - crop_width // 2)

        if y1 < 0: y1 = 0
        if x1 < 0: x1 = 0
        
        y2 = y1 + crop_height
        x2 = x1 + crop_width
        
        if y2 > height:
            y2 = height
            y1 = max(0, y2 - crop_height)
        if x2 > width:
            x2 = width
            x1 = max(0, x2 - crop_width)

        cropped = img[y1:y2, x1:x2]
        
        # 최종 리사이즈
        resized = cv2.resize(cropped, (450, 600), interpolation=cv2.INTER_LANCZOS4)
        cv2.imwrite(str(output_path), resized)
        print(f"  [OK] Saved aggressive crop to {output_path}")
        return True

def main():
    pic_folder = Path(r"C:\Users\apro\2026intro2\pic")
    output_folder = pic_folder / "cropped"
    output_folder.mkdir(exist_ok=True)
    
    # 채정훈(1003044), 이운기(1310155), 김영진(1811122)
    # 확장자를 모르니 glob으로 찾음
    target_ids = ['1003044', '1310155', '1811122']
    
    for tid in target_ids:
        found = list(pic_folder.glob(f"{tid}.*"))
        for f in found:
            if f.suffix.lower() in ['.jpg', '.png', '.jpeg']:
                # 기존 파일 덮어쓰기
                output_path = output_folder / f"{f.stem}_cropped{f.suffix}"
                crop_and_save(f, output_path)

if __name__ == "__main__":
    main()
