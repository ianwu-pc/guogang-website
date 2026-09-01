export type Person = {
  id: string;
  slug: string;
  name: string;
  role: string;
  summary: string;
  quote: string;
  coverImage: string;
  galleryImages: string[];
  interviewContent: string[];
};

export type Good = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  flavor: string;
  maker: string;
  story: string;
  purchaseMethod: string;
  coverImage: string;
  galleryImages: string[];
};

export type Story = {
  id: string;
  slug: string;
  category: "長者" | "孩子" | "環境" | "活動";
  title: string;
  summary: string;
  date: string;
  author: string;
  coverImage: string;
  galleryImages: string[];
  content: string[];
};

// 全站聯絡資料集中於此；取得正式資料後只需修改這一處。
export const SITE_CONFIG = {
  name: "過港",
  associationName: "過港社區發展協會",
  logoImage: "", // Logo 到位後填入 public 下的路徑，例如 /images/logo.png。
  lineUrl: "", // 在此貼上正式 LINE 加好友網址。
  address: "205 基隆市暖暖區過港里過港路 54 號",
  phone: "02-2458-8802",
  email: "待提供",
  facebookUrl: "https://www.facebook.com/share/1DmgQHQY5Z/?mibextid=wwXIfr",
  instagramUrl: "",
};

export const NAV_ITEMS = [
  { label: "認識過港", href: "/guogang" },
  { label: "人與過港", href: "/people" },
  { label: "過港好味", href: "/goods" },
  { label: "關於我們", href: "/about" },
];

export const GUOGANG_TOPICS = [
  {
    number: "01",
    title: "過港在哪裡",
    summary: "此處將介紹過港的位置與地方環境，正式內容待補。",
    image: "過港環境照片｜建議比例 4:3",
  },
  {
    number: "02",
    title: "「過港」這個名字",
    summary: "此處將整理過港名稱的由來與地方記憶，正式內容待補。",
    image: "地方歷史照片｜建議比例 3:2",
  },
  {
    number: "03",
    title: "地方的歷史",
    summary: "此處將依據正式史料梳理地方發展，正式內容待補。",
    image: "地方歷史照片｜建議比例 3:2",
  },
  {
    number: "04",
    title: "現在的過港",
    summary: "此處將記錄此刻的生活景色與地方日常，正式內容待補。",
    image: "今日過港照片｜建議比例 4:3",
  },
];

export const GUOGANG_TIMELINE = [
  {
    year: "早期",
    titleLines: ["河岸上的港口"],
    description:
      "暖暖河岸早年設有港口，北部地區的茶葉與大菁透過渡船沿基隆河運送。港口的另一岸被人們稱為「過港」，這個稱呼，也慢慢成了地方的名字。",
    image: "基隆河、早期河岸、渡船或相關老照片｜待提供",
  },
  {
    year: "民國 38 年（1949）",
    titleLines: ["新的居民，在過港落腳"],
    description:
      "戰後，大批軍人來到過港暫時居住，後來部分軍人轉任公職並在此定居。警察、教師、自來水與地方政府等公家單位宿舍陸續出現，也讓過港逐漸形成新的聚落生活。",
    image: "/images/guogang-history-1949.png",
    imageAlt: "民國三十八年後過港聚落相關歷史照片",
  },
  {
    year: "民國 56 年（1967）",
    titleLines: ["生活機能，", "一點一點完整起來"],
    description:
      "公有市場、電信局、郵局與電力公司陸續進駐，教育與公共設施也逐漸完善。當時的過港生活機能相當完整，也曾成為全國具代表性的模範社區。",
    image: "市場、郵局、公共設施或早期街景照片｜待提供",
  },
  {
    year: "民國 80 年代（1990s）",
    titleLines: ["新的家庭，", "帶來新的生活樣貌"],
    description:
      "隨著山坡上的大型住宅社區出現，許多年輕家庭從外地搬進過港。老宿舍、集合住宅與不同背景的新居民在這裡相遇，過港也逐漸形成更加多元的社區樣貌。",
    image: "住宅、街景或新舊建築並存的照片｜待提供",
  },
  {
    year: "民國 82 年（1993）",
    titleLines: ["從一起生活，", "到一起做社區"],
    description:
      "過港社區發展協會成立。居民開始以更有組織的方式，一起回應地方環境、居民照顧與社區生活的需求，「社區」也逐漸成為更多人共同參與的事情。",
    image: "早期協會、志工、居民參與或活動照片｜待提供",
  },
  {
    year: "民國 90 年代至今",
    titleLines: ["過港的故事，", "還在繼續"],
    description:
      "從暖江橋改建、壺穴守護，到長者、兒少與居民的福利服務，過港持續從生活中找到需要一起完成的事情。這些年，過港也將累積的經驗分享出去，與鄰近社區一起合作、學習，讓地方的力量繼續往外延伸。",
    image: "壺穴守護、志工服務、社區活動或跨社區合作照片｜待提供",
  },
];

export const ASSOCIATION_TIMELINE = [
  {
    year: "民國 82 年（1993）",
    titleLines: ["過港社區發展協會成立"],
    description:
      "在新舊居民交會、人口結構逐漸改變的過程中，協會成為居民參與地方事務與互相連結的重要平台。",
  },
  {
    year: "民國 90 年代（2000s）",
    titleLines: ["從地方議題開始行動"],
    description:
      "居民關注暖江橋改建與壺穴環境守護，協會的工作也由公共議題逐步延伸至生活照顧與社區福利。",
  },
  {
    year: "民國 97 年（2008）起",
    titleLines: ["照顧服務走進日常"],
    description:
      "協會陸續推動關懷據點、長者日間照顧、弱勢兒少服務、社區規劃與環境保護，建立在地互助的服務基礎。",
  },
  {
    year: "民國 102 年（2013）起",
    titleLines: ["把經驗分享給更多社區"],
    description:
      "過港開始連結中興、碇祥等鄰近社區，透過旗艦計畫累積跨社區協作、培力與資源整合的經驗。",
  },
  {
    year: "民國 109 年（2020）",
    titleLines: ["社區認證與能力累積"],
    description:
      "過港完成基隆市社區認證，並持續在福利服務、環境守護、樂齡學習與志工培力等面向深化社區工作。",
  },
  {
    year: "民國 110—114 年（2021—2025）",
    titleLines: ["跨域合作與多元服務"],
    description:
      "協會擔任福利社區化旗艦計畫領航社區，並持續推動數位學習、健康照顧、環境行動與性別暴力初級預防等工作。",
  },
  {
    year: "民國 115 年（2026）",
    titleLines: ["投石入池，傳播心漣漪"],
    description:
      "以「我們社區暖暖的」為主軸，延續大手牽小手的合作精神，朝向社區自主、互助與永續經營前進。此節點為當年度計畫方向。",
    status: "當年度計畫",
  },
];

// 日後替換圖片：把 coverImage / galleryImages 改成 /images/...，元件會自動顯示真實圖片。
// 日後更新好物：維持欄位結構，新增項目即可自動出現在列表中。
const GOOD_NAMES = ["雙匯水餃", "港式蘿蔔糕", "鴉片鐵蛋", "清潤銀耳露", "石花凍"];

export const GOODS: Good[] = GOOD_NAMES.map((name, index) => {
  const number = String(index + 1).padStart(2, "0");
  const isRadishCake = index === 1;
  return {
    id: `good-${number}`,
    slug: `goods-${number}`,
    name,
    summary: "商品故事與特色待社區確認後補上。",
    flavor: "味道或特色｜待確認",
    maker: "製作者｜待確認",
    story: "產品與過港的關係及製作故事，待商品資料確認後整理。",
    purchaseMethod: "採社區小量製作，最新商品與開團資訊將於 LINE 社群公告。",
    coverImage: isRadishCake ? "/images/goods/goods-01-cutout.png" : `${name}完整照｜待提供`,
    galleryImages: isRadishCake
      ? ["/images/goods/goods-01-photo.jpg"]
      : [`${name}製作過程照｜待提供`, `${name}料理或食用情境照｜待提供`],
  };
});

export const PEOPLE: Person[] = [
  {
    id: "person-01",
    slug: "bottle-cap-grandma",
    name: "瓶蓋牆奶奶",
    role: "人物姓名待確認",
    summary: "過港熟悉的瓶蓋牆，來自一雙願意慢慢把事情做完的手。從一個個不起眼的瓶蓋開始，她用自己的方式，為社區留下了一道特別的地方風景。",
    quote: "一個個瓶蓋，拼出了她眼中的過港。",
    coverImage: "奶奶與瓶蓋牆｜待提供",
    galleryImages: ["奶奶自然生活照｜待提供", "瓶蓋牆細節｜待提供"],
    interviewContent: ["完整人物訪談正在整理中。正式內容完成後，將從她與瓶蓋牆的日常出發，記錄這道地方風景背後的故事。"],
  },
  {
    id: "person-02",
    slug: "breakfast-shop-owner",
    name: "早餐店老闆娘",
    role: "人物姓名待確認",
    summary: "一間早餐店，也是街坊每天相遇的地方。從一份份早餐到一句句熟悉的招呼，她在店裡度過的日常，也陪著過港一天一天往前走。",
    quote: "每天清晨，她比許多人更早看見過港醒來。",
    coverImage: "早餐店老闆娘與店內工作畫面｜待提供",
    galleryImages: ["早餐店店面與街坊｜待提供", "與熟客互動的自然照片｜待提供"],
    interviewContent: ["完整人物訪談正在整理中。正式內容完成後，將從早餐店的清晨與街坊相遇的日常開始說起。"],
  },
  {
    id: "person-03",
    slug: "community-kitchen-mother",
    name: "煮飯媽媽",
    role: "人物姓名待確認",
    summary: "從廚房裡的一道道料理，到現在一起製作社區的好味，她用一雙手，參與著過港每天最平常卻重要的生活。",
    quote: "把熟悉的手路，做成一份可以分享的味道。",
    coverImage: "煮飯媽媽自然肖像｜待提供",
    galleryImages: ["煮飯與備料畫面｜待提供", "製作社區產品與手部細節｜待提供"],
    interviewContent: ["完整人物訪談正在整理中。正式內容完成後，將從她熟悉的料理方式與社區好味的製作日常展開。"],
  },
  {
    id: "person-04",
    slug: "community-volunteer",
    name: "協會志工",
    role: "人物姓名待確認",
    summary: "社區裡的一場活動、一次陪伴，或一件看似平常的小事，背後總有人默默準備。一點一點累積起來，也成為過港日常裡重要的力量。",
    quote: "有些事情很小，但總要有人願意一直做。",
    coverImage: "協會志工本人與服務畫面｜待提供",
    galleryImages: ["志工與居民互動｜待提供", "社區工作或活動準備｜待提供"],
    interviewContent: ["完整人物訪談正在整理中。正式內容完成後，將從一次次服務、陪伴與活動準備，記錄志工與過港的連結。"],
  },
  {
    id: "person-05",
    slug: "couple-story-one",
    name: "夫妻故事一",
    role: "人物姓名待確認",
    summary: "人物介紹待訪談內容整理後決定。之後會從兩人和過港之間最特別的關係出發，找出屬於他們自己的故事。",
    quote: "故事角度待訪談內容整理後決定。",
    coverImage: "夫妻自然合照｜待提供",
    galleryImages: ["在過港生活的畫面｜待提供", "與故事有關的地點或物件｜待提供"],
    interviewContent: ["這組人物故事將依實際訪談內容整理，目前不先套用固定模板。"],
  },
  {
    id: "person-06",
    slug: "couple-story-two",
    name: "夫妻故事二",
    role: "人物姓名待確認",
    summary: "人物介紹待訪談內容整理後決定。之後將依實際訪談內容，找出兩人看待過港最不一樣的地方。",
    quote: "故事角度待訪談內容整理後決定。",
    coverImage: "夫妻自然合照｜待提供",
    galleryImages: ["夫妻生活畫面｜待提供", "與故事相關的地方照片｜待提供"],
    interviewContent: ["這組人物故事將依實際訪談內容整理，並避免與上一組夫妻使用相同角度。"],
  },
];

// 日後新增故事：複製一筆資料並更新 slug、分類與內容即可。
export const STORIES: Story[] = Array.from({ length: 8 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  const categories: Story["category"][] = ["長者", "孩子", "環境", "活動"];
  return {
    id: `story-${number}`,
    slug: `story-${number}`,
    category: categories[index % categories.length],
    title: `社區故事 ${number}`,
    summary: "此處將放置過港的社區故事，正式內容待補。",
    date: "日期｜待提供",
    author: "作者或紀錄者｜待提供",
    coverImage: `社區故事照片 ${number}｜待提供`,
    galleryImages: [
      `故事紀錄照片 ${number}-A｜待提供`,
      `故事紀錄照片 ${number}-B｜待提供`,
    ],
    content: [
      "文章開場｜待提供",
      "第一段故事內容｜待提供",
      "第二段故事內容｜待提供",
    ],
  };
});

export const HOME_COPY = {
  heroTitle: "這裡是過港",
  heroDescription:
    "一個沿著基隆河生活的地方。",
  associationDescription:
    "過港社區發展協會長期陪伴居民，從長者關懷、兒少陪伴，到環境守護與社區活動，把生活中真正需要的事情，一件一件做起來。這些年的累積，不只是讓過港的生活變得更好，也讓更多人願意一起參與、一起把地方往前帶。",
};
