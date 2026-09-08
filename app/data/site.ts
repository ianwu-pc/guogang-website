import { getPeopleStory } from "./peopleStories";

export type Person = {
  id: string;
  slug: string;
  name: string;
  role: string;
  summary: string;
  quote: string;
  quoteLines?: string[];
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
  logoImage: "/images/guogang-logo.webp",
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

export const GOODS: Good[] = [
  {
    id: "good-01",
    slug: "goods-01",
    name: "港式／原味蘿蔔糕",
    summary: "原味吃得到米香和蘿蔔味；港式加入豬肉、香菇和蝦米，多了一點香氣和口感。",
    flavor: "原味／港式兩種",
    maker: "過港社區小量製作",
    story: "蘿蔔糕做成原味和港式兩種。原味簡單，吃得到米香和蘿蔔味；港式則加入豬肉、香菇和蝦米，多了一點香氣和口感。切片煎香後，外層微焦、裡面還是柔軟，是很熟悉的一餐。",
    purchaseMethod: "過港的產品以小量製作為主。每次做什麼、做多少，會跟著當期的製作安排而不同，所以不一定隨時都有固定的品項與數量。",
    coverImage: "/images/goods/radish-cake.jpg",
    galleryImages: ["/images/goods/goods-01-photo.jpg", "/images/goods/goods-01-cutout.png"],
  },
  {
    id: "good-02",
    slug: "goods-02",
    name: "鴉片鐵蛋",
    summary: "一顆顆反覆滷煮，讓滷汁慢慢收進蛋裡；濃郁滷香之外，也吃得到蛋本身的香氣。",
    flavor: "濃郁滷香、扎實有嚼勁",
    maker: "過港社區小量製作",
    story: "一顆顆反覆滷煮，讓滷汁慢慢收進蛋裡，也讓口感變得更加扎實有嚼勁。入口先是濃郁的滷香，越嚼越能吃到蛋本身的香氣。份量小巧，單吃就是方便的小點，搭配白飯、粥品或其他料理也很合適。",
    purchaseMethod: "過港的產品以小量製作為主。每次做什麼、做多少，會跟著當期的製作安排而不同，所以不一定隨時都有固定的品項與數量。",
    coverImage: "/images/goods/iron-eggs.jpg",
    galleryImages: [],
  },
  {
    id: "good-03",
    slug: "goods-03",
    name: "雙匯水餃",
    summary: "高麗菜的清甜與韭菜的香氣包進同一顆水餃裡，不需要太多調味，就很有味道。",
    flavor: "高麗菜與韭菜雙餡",
    maker: "過港社區小量製作",
    story: "高麗菜和韭菜兩種餡料拌在一起，才有了「雙匯」這個名字。高麗菜帶著清甜，韭菜則多一點香氣，兩種味道包進同一顆水餃裡。煮熟後外皮柔軟、內餡飽滿，不需要太多調味，就能吃到兩種蔬菜混在一起的味道。",
    purchaseMethod: "過港的產品以小量製作為主。每次做什麼、做多少，會跟著當期的製作安排而不同，所以不一定隨時都有固定的品項與數量。",
    coverImage: "/images/goods/double-bamboo-shoot-dumplings.jpg",
    galleryImages: [],
  },
  {
    id: "good-04",
    slug: "goods-04",
    name: "清潤銀耳露",
    summary: "銀耳慢慢熬到柔軟滑順，入口清爽不厚重，冰過之後更適合慢慢喝。",
    flavor: "清爽滑順",
    maker: "過港社區小量製作",
    story: "將銀耳慢慢熬煮，直到質地柔軟、湯汁帶有自然的滑順口感。入口清爽，不會過於厚重，冰過之後更適合慢慢喝。無論是飯後、午後，或忙完一天想喝點清涼的時候，都是一瓶簡單舒服的日常飲品。",
    purchaseMethod: "過港的產品以小量製作為主。每次做什麼、做多少，會跟著當期的製作安排而不同，所以不一定隨時都有固定的品項與數量。",
    coverImage: "/images/goods/white-fungus-drink.jpg",
    galleryImages: [],
  },
  {
    id: "good-05",
    slug: "goods-05",
    name: "海涼石花凍｜黑糖／百香果",
    summary: "石花凍滑嫩清透，黑糖溫潤帶甜，百香果則多一點酸香，冰過之後更加清爽。",
    flavor: "黑糖／百香果兩種口味",
    maker: "過港社區小量製作",
    story: "將石花熬煮後凝成滑嫩清透的石花凍，冰過之後吃起來更加清爽。共有黑糖與百香果兩種口味，黑糖溫潤帶甜，百香果則多了一點酸香。飯後來一份，或天氣熱的時候冰冰地吃，都很適合。",
    purchaseMethod: "過港的產品以小量製作為主。每次做什麼、做多少，會跟著當期的製作安排而不同，所以不一定隨時都有固定的品項與數量。",
    coverImage: "/images/goods/stone-flower-jelly.jpg",
    galleryImages: [],
  },
];

export const PEOPLE: Person[] = [
  {
    "id": "person-01",
    "slug": "bottle-cap-grandma",
    "coverImage": "",
    "galleryImages": [],
    "interviewContent": []
  },
  {
    "id": "person-02",
    "slug": "breakfast-shop-owner",
    "coverImage": "",
    "galleryImages": [],
    "interviewContent": []
  },
  {
    "id": "person-03",
    "slug": "community-kitchen-mother",
    "coverImage": "/images/people/community-kitchen-mother/li-shui-jin-kitchen.jpg",
    "galleryImages": [
      "/images/people/community-kitchen-mother/li-shui-jin-community.jpg",
      "/images/people/community-kitchen-mother/li-shui-jin-learning.jpg"
    ],
    "interviewContent": []
  },
  {
    "id": "person-04",
    "slug": "community-volunteer",
    "coverImage": "",
    "galleryImages": [
      "志工與居民互動｜待提供",
      "社區工作或活動準備｜待提供"
    ],
    "interviewContent": []
  },
  {
    "id": "person-05",
    "slug": "couple-story-one",
    "coverImage": "/images/people/couple-story-one/qingshuang-axiao-portrait.jpg",
    "galleryImages": [
      "/images/people/couple-story-one/qingshuang-axiao-community.jpg"
    ],
    "interviewContent": []
  },
  {
    "id": "person-06",
    "slug": "couple-story-two",
    "coverImage": "",
    "galleryImages": [],
    "interviewContent": []
  }
].map((person) => {
  const story = getPeopleStory(person.slug)!;
  return {
    ...person,
    name: story.name,
    role: story.role,
    summary: story.description,
    quote: story.titleLines.join(""),
    quoteLines: story.titleLines,
  };
});

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
