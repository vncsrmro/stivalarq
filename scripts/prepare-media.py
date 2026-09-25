from pathlib import Path
from PIL import Image, ImageOps
import json
ROOT=Path(__file__).resolve().parents[1]
source=ROOT.parent/'MATERIAIS PARA SITE STIVAL ARQUITETURA'/'imagens 3D'
selection={
 'hero':('POSTOS DE ENFERMAGEM ALA01 - UNIMED AMERICANA','cena 6.png'),
 'enfermagem':('POSTOS DE ENFERMAGEM ALA01 - UNIMED AMERICANA','cena 1.png'),
 'enfermagem-2':('POSTOS DE ENFERMAGEM ALA01 - UNIMED AMERICANA','Cena 2.png'),
 'enfermagem-3':('POSTOS DE ENFERMAGEM ALA01 - UNIMED AMERICANA','cena 8.png'),
 'uti':('LEITOS DE UTI ISOLAMENTO - UNIMED AMERICANA','cena 1.png'),
 'uti-2':('LEITOS DE UTI ISOLAMENTO - UNIMED AMERICANA','cena 3.png'),
 'uti-3':('LEITOS DE UTI ISOLAMENTO - UNIMED AMERICANA','cena 6.png'),
 'unicoo':('POSTO DE COLETA UNICOO - PATIO 330','FACHADA-FINAL-DRGUSTAVO__1 - Photo.jpg'),
 'unicoo-2':('POSTO DE COLETA UNICOO - PATIO 330','FACHADA-FINAL-DRGUSTAVO__4 - Photo.jpg'),
 'unicoo-3':('POSTO DE COLETA UNICOO - PATIO 330','FACHADA-FINAL-DRGUSTAVO__7 - Photo.jpg'),
 'recepcao':('', '02_RADIO01.jpg'),
}
manifest={}
for name,(folder,file) in selection.items():
 p=source/folder/file;im=ImageOps.exif_transpose(Image.open(p)).convert('RGB')
 manifest[name]={'source':str(p.relative_to(ROOT.parent)),'original':im.size,'variants':[]}
 for width in [800,1600,2200] if name=='hero' else [800,1600]:
  out=im.copy();out.thumbnail((width,width*2));dest=ROOT/'public/media'/f'{name}-{width}.webp';out.save(dest,'WEBP',quality=86,method=6)
  manifest[name]['variants'].append({'file':dest.name,'width':out.width,'height':out.height,'bytes':dest.stat().st_size})
im=Image.open(ROOT/'src/assets/quem-e-gustavo.png').convert('RGBA');im.save(ROOT/'public/media/gustavo.webp','WEBP',quality=90)
for color in ['petroleo','marfim']:
 s=(ROOT.parent/f'stival-brandbook/02-logos/stival-horizontal-{color}.svg').read_text(encoding='utf-8')
 s=s.replace('width="496" height="168" viewBox="0 0 496 168"','width="436" height="108" viewBox="30 30 436 108"')
 (ROOT/f'public/brand/logo-{color}.svg').write_text(s,encoding='utf-8')
(ROOT/'public/media/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print('Media prepared:',len(manifest),'sets')
