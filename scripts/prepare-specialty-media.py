from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
src=root/'artwork'/'especialidades'
media=root/'public'/'media'
items=[('service-arquitetura','service-arquitetura.png'),('service-adequacoes','service-adequacoes.png'),('service-bim','service-bim.png'),('service-interiores','service-interiores.png')]
for name,filename in items:
 im=Image.open(src/filename).convert('RGB')
 for width in [800,1600]:
  image=im.copy();image.thumbnail((width,1600))
  image.save(media/f'{name}-{width}.webp','WEBP',quality=86,method=6)
  print(name,width,image.size,(media/f'{name}-{width}.webp').stat().st_size)
