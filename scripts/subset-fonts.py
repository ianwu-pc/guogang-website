"""Generate optional, smaller Noto Serif TC faces; original Unicode faces remain fallback.
Requires fontTools and brotli. Run after content updates to refresh the optimization.
"""
from pathlib import Path
import re
from html.parser import HTMLParser
from fontTools.ttLib import TTFont
from fontTools import subset
root=Path(__file__).resolve().parent.parent
css_path=root/'app/fonts.css'
base=css_path.read_text(encoding='utf-8').split('/* Content subsets:')[0].rstrip()
all_text=''.join(p.read_text(encoding='utf-8') for p in (root/'app').rglob('*') if p.suffix in ('.tsx','.ts','.json'))
# Use rendered copy, including shared data and navigation, rather than only TSX literals.
class TextOnly(HTMLParser):
 def __init__(self):super().__init__();self.skip=0;self.parts=[]
 def handle_starttag(self,tag,attrs):
  if tag in ('script','style'):self.skip+=1
 def handle_endtag(self,tag):
  if tag in ('script','style'):self.skip=max(0,self.skip-1)
 def handle_data(self,data):
  if not self.skip:self.parts.append(data)
parser=TextOnly();parser.feed((root/'github-pages-dist/index.html').read_text(encoding='utf-8'))
home_text=''.join(parser.parts)
faces=[]
for label,text in [('site',all_text),('home',home_text)]:
 chars=set(map(ord,text)); size=0; count=0
 if label=='site':chars-=set(map(ord,home_text))
 for block in re.findall(r'@font-face\s*\{[^}]+\}',base):
  filename=re.search(r'/([0-9]{3})\.woff2',block).group(1)
  allowed=set()
  for a,b in re.findall(r'U\+([0-9a-f]+)(?:-([0-9a-f]+))?',block,re.I):allowed.update(range(int(a,16),int(b or a,16)+1))
  keep=chars & allowed
  if not keep:continue
  font=TTFont(root/f'public/fonts/noto-serif-tc/{filename}.woff2')
  keep &= set(font.getBestCmap())
  if not keep:continue
  opts=subset.Options();opts.flavor='woff2';sub=subset.Subsetter(options=opts);sub.populate(unicodes=keep);sub.subset(font)
  name=f'{filename}-{label}.woff2';dest=root/'public/fonts/noto-serif-tc'/name;font.save(dest)
  assert keep <= set(TTFont(dest).getBestCmap())
  face=re.sub(r'unicode-range:[^;]+;', 'unicode-range: '+', '.join(f'U+{c:04x}' for c in sorted(keep))+';',block)
  faces.append(face.replace(f'{filename}.woff2',name));size+=dest.stat().st_size;count+=1
 print(label,count,size)
css_path.write_text(base+'\n\n/* Content subsets: same glyphs and variable weights; full faces above cover future text. */\n'+'\n'.join(faces)+'\n',encoding='utf-8')
