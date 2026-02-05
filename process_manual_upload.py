import cv2
import sys
from pathlib import Path

# Windows 콘솔 인코딩 설정
sys.stdout.reconfigure(encoding='utf-8')

def process_upload(input_path, output_paths):
    print(f"Processing uploaded file: {input_path}")
    img = cv2.imread(str(input_path))
    if img is None:
        print(f"  [X] Image load failed")
        return False

    height, width = img.shape[:2]
    print(f"  Original size: {width}x{height}")

    # 얼굴 감지 시도 (중심 잡기용)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    
    center_x = width // 2
    center_y = height // 2 # 기본은 이미지 중심

    if len(faces) > 0:
        # 가장 큰 얼굴 찾기
        faces = sorted(faces, key=lambda f: f[2]*f[3], reverse=True)
        fx, fy, fw, fh = faces[0]
        print(f"  [i] Face detected at ({fx}, {fy}) size {fw}x{fh}")
        center_x = fx + fw // 2
        center_y = fy + fh // 2
    else:
        print("  [!] No face detected, using image center")

    # 3:4 비율로 크롭 계산
    # 이미지의 최대 가능 영역 사용
    
    target_ratio = 3/4
    
    # 1. Height 기준 Width 계산
    crop_h = height
    crop_w = int(crop_h * target_ratio)
    
    if crop_w > width:
        # Width 기준 Height 계산
        crop_w = width
        crop_h = int(crop_w / target_ratio)
    
    print(f"  Crop size: {crop_w}x{crop_h}")

    x1 = int(center_x - crop_w // 2)
    y1 = int(center_y - crop_h // 2)
    
    # 경계 처리
    if x1 < 0: x1 = 0
    if y1 < 0: y1 = 0
    
    x2 = x1 + crop_w
    y2 = y1 + crop_h
    
    if x2 > width:
        x2 = width
        x1 = x2 - crop_w
    if y2 > height:
        y2 = height
        y1 = y2 - crop_h
        
    cropped = img[y1:y2, x1:x2]
    
    # Resize to standard size (e.g. 450x600)
    resized = cv2.resize(cropped, (450, 600), interpolation=cv2.INTER_LANCZOS4)
    
    for p in output_paths:
        p_path = Path(p)
        p_path.parent.mkdir(parents=True, exist_ok=True)
        cv2.imwrite(str(p_path), resized)
        print(f"  [OK] Saved to {p_path}")

def main():
    upload_path = Path(r"C:/Users/apro/.gemini/antigravity/brain/993c5e9e-dae4-4b0c-a412-02ef7a43696d/uploaded_media_1770249661208.png")
    
    # Target files
    targets = [
        r"c:\Users\apro\2026intro2\my-app\public\members\1003044_cropped.png",
        r"c:\Users\apro\2026intro2\my-app\public\members\1003044_cropped.jpg",
        r"c:\Users\apro\2026intro2\pic\cropped\1003044_cropped.png"
    ]
    
    process_upload(upload_path, targets)

if __name__ == "__main__":
    main()
