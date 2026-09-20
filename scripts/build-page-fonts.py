"""Build one lossless variable Noto Serif TC subset per exported route.
Usage: python scripts/build-page-fonts.py path/to/NotoSerifTC.ttf
Source: https://github.com/google/fonts/tree/main/ofl/notoseriftc (SIL OFL).
Re-export and run test:pages after regenerating. Existing glyphs/weights are unchanged.
"""
from pathlib import Path
from html.parser import HTMLParser
from fontTools.ttLib import TTFont
from fontTools import subset
import sys,json,hashlib
root=Path(__file__).resolve().parent.parent
source=Path(sys.argv[1]); dest=root/'public/fonts/pages';dest.mkdir(exist_ok=True)
class Text(HTMLParser):
 def __init__(self):super().__init__();self.skip=0;self.text=''
 def handle_starttag(self,t,a):
  if t in ('script','style'):self.skip+=1
  if not self.skip:self.text+=''.join(v or '' for k,v in a if k in ('alt','aria-label','title'))
 def handle_endtag(self,t):
  if t in ('script','style'):self.skip=max(0,self.skip-1)
 def handle_data(self,d):
  if not self.skip:self.text+=d
manifest=json.loads((root/'scripts/page-fonts.json').read_text(encoding='utf-8')) if len(sys.argv)>2 else {}
for p in sorted((root/'github-pages-dist').rglob('index.html')):
 rel=p.relative_to(root/'github-pages-dist').as_posix();route='/'+rel.removesuffix('index.html').rstrip('/')
 if route.startswith('/stories') or (len(sys.argv)>2 and route!=sys.argv[2]):continue
 parser=Text();parser.feed(p.read_text(encoding='utf-8'));text=parser.text
 if route=='/guogang':
  text+=(root/'app/components/GuogangInteractiveMap.tsx').read_text(encoding='utf-8')
  text+=''.join(p.read_text(encoding='utf-8') for p in (root/'app/data').glob('guogangMap*') if p.suffix in ('.ts','.json'))
 f=TTFont(source);chars=set(map(ord,text)) & set(f.getBestCmap());opts=subset.Options();opts.flavor='woff2';sub=subset.Subsetter(options=opts);sub.populate(unicodes=chars);sub.subset(f);f.flavor='woff2'
 name=(route.strip('/').replace('/','-') or 'home')+'.woff2';out=dest/name;f.save(out);assert chars<=set(TTFont(out).getBestCmap())
 manifest[route]={'file':name,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'codepoints':sorted(chars)}
 print(route,out.stat().st_size,flush=True)
(root/'scripts/page-fonts.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
