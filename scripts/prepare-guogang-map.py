from PIL import Image,ImageDraw,ImageFilter
import numpy as np
from pathlib import Path
import argparse,json,hashlib
parser = argparse.ArgumentParser(description="Extract the 14 Guogang landmarks from the supplied 7680 x 4320 illustration.")
parser.add_argument("source", type=Path)
parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "public/images/guogang-map-2026")
args = parser.parse_args()
source = args.source
expected_hash = "1d34a4a0219573b9685620318ecab382d3e2beb87c36664394c1fa74830a8775"
if hashlib.sha256(source.read_bytes()).hexdigest() != expected_hash:
    raise SystemExit("Source differs from the reviewed illustration; remeasure the artwork before extracting.")
raw=Image.open(source).convert('RGB')
# Geometry is authored against the supplied drawing at 2048 x 1152, not the retired map.
im=raw.resize((2048,1152),Image.Resampling.LANCZOS)
a=np.asarray(im)
# Measured artwork bounds isolate objects; exterior flood-fill recovers transparent edges.
items=[
('little-couple-store','小倆口福利社',[(1800,80),(1994,80),(1994,144),(1984,150),(1986,266),(1799,267)],(1848,32.256)),
('breakfast-shop','美食坊早餐店',[(1582,174),(1761,174),(1762,249),(1772,267),(1766,328),(1707,330),(1708,297),(1699,328),(1582,330)],(1668,137)),
('old-police-dormitory','舊警察宿舍',[(1016,166),(1184,151),(1190,224),(1198,245),(1210,281),(1193,303),(1194,359),(1026,362),(1016,276)],(1108,112)),
('nuanjiang-elementary-school','暖江國小',[(416,140),(799,140),(799,383),(416,383)],(606,104)),
('shengguang-church','聖光堂',[(171,320),(204,319),(209,353),(239,368),(243,422),(250,427),(250,568),(102,568),(95,521),(111,478),(122,471),(119,370)],(170,271.872)),
('wax-culture-hall','黃蠟石文化館',[(1280,527),(1441,523),(1448,669),(1276,669)],(1358,489)),
('community-association','過港社區發展協會',[(1040,521),(1167,521),(1170,539),(1217,551),(1220,681),(997,680),(997,547),(1040,540)],(1108,472)),
('guogang-kindergarten','過港幼兒園',[(764,583),(793,571),(808,568),(805,543),(964,543),(967,589),(940,604),(959,620),(965,648),(963,681),(815,681),(812,672),(796,674),(791,649),(774,645),(763,628)],(879,496.512)),
('guogang-post-office','過港郵局',[(627,550),(749,550),(749,598),(735,599),(735,662),(638,662),(638,599),(627,598)],(690,511)),
('nuanjiang-walkway','暖江步道',[(1587,859),(1628,809),(1851,775),(2048,752),(2048,1070),(1587,1070)],(1835,707.328)),
('children-park','暖江兒童公園',[(1424,729),(1481,729),(1481,749),(1565,749),(1581,764),(1581,879),(1510,893),(1341,890),(1335,869),(1337,770),(1347,751),(1422,750)],(1460,947)),
('northern-pastry','北方大陸餅',[(788,756),(936,758),(936,768),(977,768),(977,810),(951,810),(951,821),(960,842),(962,913),(917,914),(916,930),(779,937),(779,771)],(871,983)),
('nuan-new-immigrant-hall','暖新住民會館',[(449,782),(487,783),(501,769),(536,778),(554,772),(576,782),(606,778),(615,796),(621,821),(612,893),(606,949),(583,966),(581,1003),(495,984),(491,955),(455,945),(441,918),(432,885),(449,860),(437,851),(435,817)],(526,1040)),
('guogang-fude-temple','過港福德宮',[(169,716),(370,731),(371,755),(362,759),(360,810),(368,815),(365,866),(166,866),(166,789),(182,788),(178,751),(169,748)],(266,917)),
]
# Reconstruct only the area underneath an extracted landmark. Source remains untouched elsewhere.
terrain=Image.new('RGB',im.size,(255,248,238));d=ImageDraw.Draw(terrain)
road=(154,154,154)
d.polygon([(0,577),(423,589),(473,579),(515,517),(550,463),(591,420),(677,385),(910,364),(1250,351),(1500,348),(1770,309),(1900,270),(1970,230),(2048,150),(2048,275),(1990,331),(1900,362),(1710,398),(1500,445),(1370,460),(1190,460),(963,460),(777,484),(671,522),(625,558),(616,604),(630,640),(747,664),(1000,666),(1230,661),(1500,643),(1780,640),(2048,643),(2048,752),(1800,752),(1585,752),(1390,754),(1200,769),(988,771),(802,755),(630,750),(607,781),(548,790),(540,748),(478,718),(422,703),(0,684)],fill=road)
d.polygon([(1196,440),(1263,438),(1278,662),(1210,670)],fill=road)
d.polygon([(1444,440),(1520,434),(1523,658),(1444,667)],fill=road)
d.polygon([(0,1083),(180,1050),(350,1042),(500,1058),(694,1053),(877,994),(1120,951),(1320,926),(1550,908),(1690,897),(1800,879),(1960,869),(2048,871),(2048,1152),(0,1152)],fill=(144,182,195))
t=np.asarray(terrain)
base=a.copy();dest=args.output;dest.mkdir(parents=True,exist_ok=True)
manifest=[]
for ident,name,pts,label in items:
 x0=max(0,min(p[0] for p in pts)-3);y0=max(0,min(p[1] for p in pts)-3);x1=min(2048,max(p[0] for p in pts)+4);y1=min(1152,max(p[1] for p in pts)+4)
 pm=Image.new('L',im.size);ImageDraw.Draw(pm).rectangle((x0,y0,x1-1,y1-1),fill=255)
 # Flood-fill only the exterior paper. Interior light paint and every dark ink line remain intact.
 local=a[y0:y1,x0:x1];poly=np.asarray(pm)[y0:y1,x0:x1]>0
 paper=np.max(np.abs(local.astype(np.int16)-np.array([255,248,238])),axis=2)<17
 # Only exterior-connected terrain is removed; internal paint remains opaque.
 road_pixels=(np.max(local,axis=2).astype(int)-np.min(local,axis=2).astype(int)<12)&(local[:,:,0]>125)&(local[:,:,0]<253)
 water=np.max(np.abs(local.astype(np.int16)-np.array([144,182,195])),axis=2)<24
 paper=paper|road_pixels|water
 passable=paper | ~poly
 seen=np.zeros(passable.shape,bool);stack=[];h,w=seen.shape
 for y in range(h):
  for x in [0,w-1]:
   if passable[y,x]:seen[y,x]=True;stack.append((y,x))
 for x in range(w):
  for y in [0,h-1]:
   if passable[y,x] and not seen[y,x]:seen[y,x]=True;stack.append((y,x))
 while stack:
  y,x=stack.pop()
  for yy,xx in [(y-1,x),(y+1,x),(y,x-1),(y,x+1)]:
   if 0<=yy<h and 0<=xx<w and not seen[yy,xx] and passable[yy,xx]:seen[yy,xx]=True;stack.append((yy,xx))
 mask=(poly & ~seen).astype(np.uint8)*255
 # Keep an antialiased source edge without a paper rectangle.
 maskim=Image.fromarray(mask).filter(ImageFilter.GaussianBlur(.35))
 # Original full-resolution colour is sampled through the mask, without recolouring or redrawing.
 scale=raw.width/2048;box=tuple(round(v*scale) for v in (x0,y0,x1,y1));crop=raw.crop(box).convert('RGBA')
 crop.putalpha(maskim.resize(crop.size,Image.Resampling.LANCZOS));crop.save(dest/f'{ident}.png',optimize=True)
 # Reconstruct road/river edges through occluded regions from their visible neighbouring endpoints.
 under=np.full(local.shape,[255,248,238],dtype=np.uint8)
 yy,xx=np.mgrid[y0:y1,x0:x1]
 edge_specs={
  'nuanjiang-elementary-school':(416,450,799,383,'below'),
  'little-couple-store':(1790,302,2000,219,'below'),
  'breakfast-shop':(1577,336,1776,308,'below'),
  'old-police-dormitory':(1012,363,1215,355,'below'),
  'guogang-post-office':(620,645,754,659,'below'),
  'guogang-kindergarten':(755,659,975,665,'below'),
  'community-association':(990,665,1225,662,'below'),
  'wax-culture-hall':(1271,664,1455,649,'below'),
  'children-park':(1330,758,1585,752,'above'),
  'northern-pastry':(778,758,983,770,'above'),
 }
 if ident in edge_specs:
  xa,ya,xb,yb,side=edge_specs[ident];boundary=ya+(xx-xa)*(yb-ya)/(xb-xa)
  onroad=yy>=boundary if side=='below' else yy<=boundary
  under[onroad]=[154,154,154]
 if ident=='community-association':
  under[(xx>1205)&(yy>460)]=[154,154,154]
 if ident=='nuan-new-immigrant-hall':
  under[(xx>546)&(xx<613)&(yy<790)]=[154,154,154]
 if ident=='nuanjiang-walkway':
  boundary=909+(xx-1587)*(870-909)/(2048-1587)
  under[yy>=boundary]=[144,182,195]
 removed=np.asarray(maskim.filter(ImageFilter.MaxFilter(5)))>0
 # Small boundary feather blends paper/road texture without rectangular cutout edges.
 regionmask=Image.fromarray(removed.astype(np.uint8)*255).filter(ImageFilter.GaussianBlur(.65))
 blend=np.asarray(regionmask)/255
 base[y0:y1,x0:x1]=(under*blend[:,:,None]+local*(1-blend[:,:,None])).astype(np.uint8)
 row = "upper" if len(manifest) < 5 else "middle" if len(manifest) < 9 else "lower"
 manifest.append(dict(id=ident,name=name,row=row,x=x0/2048*100,y=y0/1152*100,width=(x1-x0)/2048*100,height=(y1-y0)/1152*100,labelX=label[0]/2048*100,labelY=label[1]/1152*100))
Image.fromarray(base).save(dest/'background.webp',lossless=True)
(dest/'source-manifest.json').write_bytes((json.dumps(dict(sourceSize=list(raw.size),sha256=expected_hash,readingOrder="right-to-left, top-to-bottom",landmarks=manifest),ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
print('14 source-faithful cutouts; source SHA256',hashlib.sha256(source.read_bytes()).hexdigest())
