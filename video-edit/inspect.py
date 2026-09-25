from pathlib import Path
import subprocess,json
from PIL import Image,ImageDraw
root=Path('E:/romeiro.dev/Stival'); ff=Path('E:/Tools/remotion/node_modules/@remotion/compositor-win32-x64-msvc')
files=sorted((root/'videos').glob('*.mp4')); out=root/'stivalarq/video-edit'; rows=[]
for n,p in enumerate(files):
 d=json.loads(subprocess.check_output([str(ff/'ffprobe.exe'),'-v','error','-show_format','-show_streams','-of','json',str(p)])); v=next(x for x in d['streams'] if x['codec_type']=='video');print(n,p.name,v['width'],v['height'],v['r_frame_rate'],d['format']['duration'])
 row=Image.new('RGB',(960,210),'#f3f0e8');draw=ImageDraw.Draw(row);draw.text((8,4),f'{n}: {p.name[:62]}',fill='#203c40')
 for j,t in enumerate([.5,3,6]):
  dest=out/f'{n}-{j}.jpg';subprocess.run([str(ff/'ffmpeg.exe'),'-v','error','-y','-ss',str(t),'-i',str(p),'-vf','scale=320:180:force_original_aspect_ratio=decrease','-frames:v','1',str(dest)],check=True)
  im=Image.open(dest);row.paste(im,(j*320,26))
 rows.append(row)
canvas=Image.new('RGB',(960,len(rows)*210));[canvas.paste(r,(0,i*210)) for i,r in enumerate(rows)];canvas.save(out/'source-contactsheet.jpg')
(out/'sources.json').write_text(json.dumps([str(p) for p in files],ensure_ascii=False),encoding='utf8')
