from pathlib import Path
import subprocess,json
root=Path('E:/romeiro.dev/Stival/stivalarq');bin=Path('E:/Tools/ffmpeg/ffmpeg-9.0.2-essentials_build/bin');result=[]
for p in sorted((root/'public/videos').glob('*')):
 if p.suffix not in ['.webm','.mp4']:continue
 info=json.loads(subprocess.check_output([str(bin/'ffprobe.exe'),'-v','error','-show_streams','-show_format','-of','json',str(p)]));v=info['streams'][0]
 decode=subprocess.run([str(bin/'ffmpeg.exe'),'-v','error','-i',str(p),'-f','null','-'],capture_output=True,text=True)
 row=dict(file=p.name,bytes=p.stat().st_size,duration=float(info['format']['duration']),codec=v['codec_name'],pixel_format=v['pix_fmt'],width=v['width'],height=v['height'],audio=any(x['codec_type']=='audio' for x in info['streams']),decode_ok=decode.returncode==0 and not decode.stderr)
 result.append(row);print(row)
 assert row['decode_ok'] and row['pixel_format']=='yuv420p' and not row['audio']
(root/'video-edit/validation.json').write_text(json.dumps(result,indent=2),encoding='utf8')
