import cv2
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

def manual_crop(image_path, output_path, crop_region):
    """수동으로 지정한 영역 크롭"""
    print(f'Processing: {image_path.name}')
    img = cv2.imread(str(image_path))
    if img is None:
        print(f'  [X] Image load failed')
        return False
    
    height, width = img.shape[:2]
    print(f'  [i] Image size: {width}x{height}')
    
    x1, y1, x2, y2 = crop_region
    cropped = img[y1:y2, x1:x2]
    
    # 3:4 비율로 리사이즈
    resized = cv2.resize(cropped, (450, 600), interpolation=cv2.INTER_LANCZOS4)
    cv2.imwrite(str(output_path), resized)
    print(f'  [OK] Saved: {output_path}')
    return True

if __name__ == "__main__":
    pic_folder = Path(r'C:\Users\apro\2026intro2\pic')
    output_folder = pic_folder / 'cropped'
    output_folder.mkdir(exist_ok=True)
    
    input_path = pic_folder / '0000061.png'
    output_path = output_folder / '0000061_cropped.png'
    
    # 원본 이미지 사이즈: 896x1152
    # 얼굴이 원본에서 약간 아래쪽에 있어서 상단 여백 더 확보
    # 크롭 영역을 더 위로 올림
    
    crop_w = 600
    crop_h = 800
    
    # y = 270으로 더 위에서 시작
    x1 = 155  # 동일
    y1 = 260  # 50픽셀 더 위로
    
    x2 = x1 + crop_w
    y2 = y1 + crop_h
    
    print(f'Crop region: ({x1}, {y1}) -> ({x2}, {y2})')
    
    manual_crop(input_path, output_path, (x1, y1, x2, y2))
    
    print("\n완료!")
