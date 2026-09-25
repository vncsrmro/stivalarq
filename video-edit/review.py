from pathlib import Path
import subprocess
from PIL import Image,ImageDraw
root=Path('E:/romeiro.dev/Stival/stivalarq');ff='E:/Tools/ffmpeg/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe'
rows=[]
for name,times in [('hero',[0,3.7,4.1,8.2,12.2,16.2,19.9]),('interlude',[0,4.3,4.7,8.8,9.2,12,13.4])]:
 row=Image.new('RGB',(1120,208),'#f3f0e8');d=ImageDraw.Draw(row)
 for i,t in enumerate(times):
  p=root/f'video-edit/{name}-qa-{i}.jpg';subprocess.run([ff,'-v','error','-y','-ss',str(t),'-i',str(root/f'video-edit/{name}-master.mp4'),'-frames:v','1','-vf','scale=160:90',str(p)],check=True)
  row.paste(Image.open(p),(i*160,30));d.text((i*160+3,8),f'{name} {t}s',fill='#203c40')
 rows.append(row)
im=Image.new('RGB',(1120,416));im.paste(rows[0]);im.paste(rows[1],(0,208));im.save(root/'video-edit/edit-review.jpg')
