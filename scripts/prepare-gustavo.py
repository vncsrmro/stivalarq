from pathlib import Path
from PIL import Image,ImageOps
root=Path(__file__).resolve().parents[1]
source=root/'artwork'/'gustavo-stival-atual.png'
im=ImageOps.exif_transpose(Image.open(source)).convert('RGB')
for width in (600,1200):
 out=im.copy();out.thumbnail((width,1500))
 target=root/'public'/'media'/f'gustavo-atual-{width}.webp'
 out.save(target,'WEBP',quality=88,method=6)
 print(target.name,out.size,target.stat().st_size)
