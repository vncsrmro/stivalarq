from pathlib import Path
import subprocess
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
ff = Path('E:/Tools/ffmpeg/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe')
sheet = Image.new('RGB', (1200, 980), '#f3f0e8')
draw = ImageDraw.Draw(sheet)
for row, name in enumerate(('concept', 'concept-mobile')):
    master = root / 'video-edit' / f'{name}-master.mp4'
    draw.text((8, row * 490 + 8), name, fill='#203c40')
    for column, second in enumerate((2.5, 7.5, 12.5, 17.5)):
        frame = root / 'video-edit' / f'{name}-qa-{column}.jpg'
        subprocess.run([str(ff), '-v', 'error', '-y', '-ss', str(second), '-i', str(master),
                        '-frames:v', '1', '-vf', 'scale=300:-2', str(frame)], check=True)
        with Image.open(frame) as image:
            if name == 'concept':
                sheet.paste(image, (column * 300, row * 490 + 33))
            else:
                cropped = image.crop((37, 0, 263, min(image.height, 450)))
                sheet.paste(cropped, (column * 300 + 37, row * 490 + 33))
        draw.text((column * 300 + 8, row * 490 + 462), f'{second:.1f} s', fill='#203c40')
sheet.save(root / 'video-edit' / 'concept-review.jpg', quality=90)
