import cv2
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

def detect_face_aggressive(img, gray):
    height, width = img.shape[:2]
    cascades = [
        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml',
        cv2.data.haarcascades + 'haarcascade_frontalface_alt.xml',
        cv2.data.haarcascades + 'haarcascade_frontalface_alt2.xml',
    ]
    all_faces = []
    for cascade_path in cascades:
        face_cascade = cv2.CascadeClassifier(cascade_path)
        if face_cascade.empty():
            continue
        for scale in [1.01, 1.03, 1.05, 1.1]:
            for neighbors in [1, 2, 3, 4, 5]:
                faces = face_cascade.detectMultiScale(gray, scaleFactor=scale, minNeighbors=neighbors, minSize=(30, 30))
                if len(faces) > 0:
                    for (x, y, w, h) in faces:
                        if w >= width * 0.05:
                            all_faces.append((x, y, w, h, w*h))
    if not all_faces:
        return None
    best_face = None
    best_score = -999
    for (x, y, w, h, area) in all_faces:
        face_center_x = x + w // 2
        center_score = 1 - abs(face_center_x - width // 2) / (width // 2)
        size_score = area / (width * height)
        pos_penalty = 0
        y_ratio = y / height
        if y_ratio < 0.1:
            pos_penalty = 1.0
        elif y_ratio > 0.5:
            pos_penalty = 1.0
        size_penalty = 0
        if w > width * 0.45:
            size_penalty = 0.8
        score = size_score * 0.2 + center_score * 0.8 - pos_penalty - size_penalty
        if score > best_score:
            best_score = score
            best_face = (x, y, w, h)
    return best_face

def crop_and_save(image_path, output_path):
    print(f'Processing: {image_path.name}')
    img = cv2.imread(str(image_path))
    if img is None:
        print(f'  [X] Image load failed')
        return False
    height, width = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)
    face = detect_face_aggressive(img, gray)
    if face is None:
        print(f'  [!] No face detected')
        return False
    fx, fy, fw, fh = face
    face_center_x = fx + fw // 2
    face_center_y = fy + fh // 2
    print(f'  [i] Best face: ({fx}, {fy}, {fw}, {fh})')
    
    # 더 큰 크롭 영역 (5배)
    crop_height = int(fh * 5)
    crop_height = max(crop_height, 600)
    crop_height = min(crop_height, height)

    crop_width = int(crop_height * 3 / 4)
    crop_width = min(crop_width, width)
    
    if crop_width == width:
        crop_height = int(crop_width * 4 / 3)

    # 얼굴 중심을 기준으로 크롭 (정수리 여백 확보)
    # 얼굴을 상단 30% 위치에 배치
    y1 = int(face_center_y - crop_height * 0.30)
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
    print(f'  [OK] Saved: {output_path}')
    return True

if __name__ == "__main__":
    pic_folder = Path(r'C:\Users\apro\2026intro2\pic')
    output_folder = pic_folder / 'cropped'
    output_folder.mkdir(exist_ok=True)
    
    # 새로 추가된 3명: 박승배, 이준호, 오민식
    target_ids = ['0000061', '0000076', '0000094']
    
    for tid in target_ids:
        found = list(pic_folder.glob(f'{tid}.*'))
        for f in found:
            if f.suffix.lower() in ['.jpg', '.png', '.jpeg']:
                output_path = output_folder / f'{f.stem}_cropped{f.suffix}'
                crop_and_save(f, output_path)
    
    print("\n완료!")
