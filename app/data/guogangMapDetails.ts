// Location metadata only. Introduction copy is imported verbatim from the supplied DOCX in guogangMapCopy.json.
// Sources and the distinction between a place pin and an area map are kept with each entry.
export type MapPlaceDetails = {
  address: string;
  mapQuery: string;
  mapNote?: string;
  source: { label: string; href: string };
};

export const GUOGANG_MAP_DETAILS: Record<string, MapPlaceDetails> = {
  "little-couple-store": {
    address: "基隆市暖暖區寧靜街60巷10號",
    mapQuery: "小倆口福利社 基隆市暖暖區寧靜街60巷10號",
    source: { label: "基隆市衛生局食品抽驗資料", href: "https://www.klchb.klcg.gov.tw/wSite/public/Attachment/01207/f1736478942619.pdf" },
  },
  "breakfast-shop": {
    address: "基隆市暖暖區寧靜街60巷6號",
    mapQuery: "美食坊 基隆市暖暖區寧靜街60巷6號",
    source: { label: "基隆市衛生局店家名錄", href: "https://www.klchb.klcg.gov.tw/wSite/public/Attachment/01207/f1766456257569.pdf" },
  },
  "old-police-dormitory": {
    address: "基隆市暖暖區過港里寧靜街周邊",
    mapQuery: "基隆市暖暖區寧靜街",
    mapNote: "小地圖顯示寧靜街周邊；舊宿舍的確切門牌與入口仍待核對。",
    source: { label: "基隆市政府公有宿舍活化研究", href: "https://www.klcg.gov.tw/wSite/public/Attachment/017/f1638788232076.pdf" },
  },
  "nuanjiang-elementary-school": {
    address: "基隆市暖暖區寧靜街3號",
    mapQuery: "暖江國小 基隆市暖暖區寧靜街3號",
    source: { label: "暖江國小學校簡介", href: "https://njps.kl.edu.tw/學校簡介" },
  },
  "shengguang-church": {
    address: "基隆市暖暖區過港路92號",
    mapQuery: "浸信會過港聖光堂 基隆市暖暖區過港路92號",
    source: { label: "聖光堂服務及事工", href: "https://hlbc.org.tw/?page_id=171" },
  },
  "wax-culture-hall": {
    address: "基隆市暖暖區過港路52號",
    mapQuery: "黃蠟石文化館 基隆市暖暖區過港路52號",
    source: { label: "基隆旅遊網・黃蠟石文化館", href: "https://travel.klcg.gov.tw/TourContent.aspx?n=8103&s=586" },
  },
  "community-association": {
    address: "基隆市暖暖區過港路54號",
    mapQuery: "過港社區發展協會 基隆市暖暖區過港路54號",
    source: { label: "過港社區發展協會", href: "/about" },
  },
  "guogang-kindergarten": {
    address: "基隆市暖暖區過港路56號",
    mapQuery: "基隆市立過港幼兒園 基隆市暖暖區過港路56號",
    source: { label: "過港幼兒園園史", href: "https://oldkgkg.kl.edu.tw/51" },
  },
  "guogang-post-office": {
    address: "基隆市暖暖區過港路58號",
    mapQuery: "基隆過港路郵局 基隆市暖暖區過港路58號",
    source: { label: "中華郵政・過港路自助郵局", href: "https://www.post.gov.tw/post/internet/I_location/aon_self_dtl.jsp?self_post_no=16" },
  },
  "nuanjiang-walkway": {
    address: "基隆市暖暖區暖江橋旁河岸",
    mapQuery: "暖江橋河濱公園 基隆市暖暖區",
    mapNote: "以暖江橋河濱公園作為步道周邊定位。",
    source: { label: "蹲點台灣・過港河岸走讀", href: "https://youth.chtf.org.tw/story/2020/3293" },
  },
  "children-park": {
    address: "基隆市暖暖區過港路旁（暖江兒童公園）",
    mapQuery: "暖江兒童公園 基隆市暖暖區",
    source: { label: "基隆市政府・魅力基隆", href: "https://www.klcg.gov.tw/wSite/public/Attachment/01709/f1753690048001.pdf" },
  },
  "northern-pastry": {
    address: "基隆市暖暖區過港路147號",
    mapQuery: "北方大陸餅過港店 基隆市暖暖區過港路147號",
    source: { label: "基隆市衛生局食品抽驗資料", href: "https://www.klchb.klcg.gov.tw/wSite/public/Attachment/01207/f1754643666065.pdf" },
  },
  "nuan-new-immigrant-hall": {
    address: "基隆市暖暖區過港路159號",
    mapQuery: "暖新住民會館 基隆市暖暖區過港路159號",
    source: { label: "基隆市圖書館・會館揭幕活動", href: "https://kllib.klcg.gov.tw/News_Content.aspx?n=7792&s=15247" },
  },
  "guogang-fude-temple": {
    address: "基隆市暖暖區過港路181之1號",
    mapQuery: "暖暖過港福德宮 基隆市暖暖區過港路181之1號",
    source: { label: "內政部寺院宮廟調查", href: "https://ws.moi.gov.tw/001/Upload/OldFile/civil_download_file/01.%E5%9F%BA%E9%9A%86%E5%B8%82-99%E5%B9%B4%E8%AA%BF%E6%9F%A5%E5%AF%BA%E9%99%A2%E5%AE%AE%E5%BB%9F%E5%9F%BA%E6%9C%AC%E8%B3%87%E6%96%99.pdf" },
  },
};
