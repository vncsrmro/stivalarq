from pathlib import Path
import subprocess,json,sys
ROOT=Path(__file__).resolve().parents[1]
FF=Path('E:/Tools/ffmpeg/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe')
files=json.loads((ROOT/'video-edit/sources.json').read_text(encoding='utf8'))
out=ROOT/'public/videos';out.mkdir(exist_ok=True)
work=ROOT/'video-edit'
def run(args):
 subprocess.run([str(FF),'-hide_banner','-loglevel','error','-y',*args],check=True)
# All clips are 24 fps. 0.5-second dissolves also blend the loop seam.
for name,order,length in [('hero',[3,4,5,0,1],4.5),('interlude',[2,5,3],5.0)]:
 fade=.5;args=[];filters=[]
 for i,idx in enumerate(order+[order[0]]):
  args+=['-ss','0.5','-t',str(length if i<len(order) else fade+.1),'-i',files[idx]]
  filters.append(f'[{i}:v]fps=24,scale=1600:900,setsar=1,settb=AVTB,setpts=PTS-STARTPTS,eq=saturation=0.93:contrast=1.015:brightness=-0.006,format=yuv420p[v{i}]')
 previous='v0'
 for i in range(1,len(order)+1):
  label=f'x{i}';offset=i*(length-fade)
  filters.append(f'[{previous}][v{i}]xfade=transition=fade:duration={fade}:offset={offset}[{label}]');previous=label
 duration=len(order)*(length-fade)
 filters.append(f'[{previous}]trim=start={fade}:duration={duration},setpts=PTS-STARTPTS[out]')
 master=work/f'{name}-master.mp4'
 print('Editing',name,flush=True)
 if not master.exists() or "--reuse-masters" not in sys.argv: run([*args,'-filter_complex_threads','2','-filter_complex',';'.join(filters),'-map','[out]','-an','-pix_fmt','yuv420p','-c:v','libx264','-preset','fast','-crf','17','-threads','4','-movflags','+faststart',str(master)])
 for variant,width in [('',1600),('-mobile',800)]:
  print('Encoding',name+variant,flush=True)
  run(['-i',str(master),'-vf',f'scale={width}:-2','-an','-pix_fmt','yuv420p','-c:v','libvpx-vp9','-b:v','0','-crf','33' if width==1600 else '35','-deadline','good','-cpu-used','5','-row-mt','1','-threads','4',str(out/f'{name}{variant}.webm')])
  run(['-i',str(master),'-vf',f'scale={width}:-2','-an','-pix_fmt','yuv420p','-c:v','libx264','-preset','slow','-crf','25' if width==1600 else '27','-threads','4','-movflags','+faststart',str(out/f'{name}{variant}.mp4')])
 run(['-i',str(master),'-frames:v','1','-q:v','85',str(out/f'{name}-poster.webp')])
print('Done',flush=True)

