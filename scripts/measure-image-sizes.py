from pathlib import Path
from PIL import Image
import json,re,urllib.parse
root=Path('.');sizes={}
for p in (root/'github-pages-dist').rglob('*.html'):
 for src in re.findall(r'<img\b[^>]*\bsrc="([^"]+)"',p.read_text(encoding='utf-8')):
  key=urllib.parse.unquote(src).removeprefix('/guogang-website')
  f=root/'public'/key.lstrip('/')
  if f.is_file():
   with Image.open(f) as im:sizes[key]=im.size
(root/'scripts/image-sizes.json').write_text(json.dumps(sizes,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('image sizes',len(sizes))
