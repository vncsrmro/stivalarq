from pathlib import Path
import subprocess
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
ff = Path('E:/Tools/ffmpeg/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe')
source = root.parent / 'videos' / '4 takes'
files = sorted(source.glob('*.mp4'))
assert len(files) == 4
sheet = Image.new('RGB', (1200, len(files) * 230), '#f3f0e8')
draw = ImageDraw.Draw(sheet)
for row, path in enumerate(files):
    draw.text((6, row * 230 + 5), path.name, fill='#203c40')
    for col, second in enumerate([.5, 2.5, 4.5, 6.5]):
        output = root / 'video-edit' / f'concept-source-{row}-{col}.jpg'
        subprocess.run([str(ff), '-v', 'error', '-y', '-ss', str(second), '-i', str(path), '-frames:v', '1', '-vf', 'scale=300:169', str(output)], check=True)
        with Image.open(output) as frame:
            sheet.paste(frame, (col * 300, row * 230 + 35))
        draw.text((col * 300 + 6, row * 230 + 210), f'{second:.1f} s', fill='#203c40')
sheet.save(root / 'video-edit' / 'concept-sources-review.jpg', quality=88)
