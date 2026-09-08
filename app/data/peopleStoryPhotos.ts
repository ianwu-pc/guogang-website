import type { StoryImage } from "./peopleStories";

type StoryPhotoCollection = {
  hero: StoryImage;
  gallery: StoryImage[];
};

// Selected and web-optimised from the shared 過港網站 Drive folder.
// Keep the full set available in the article gallery so the photographs remain
// part of each person's record, rather than becoming detached decorative assets.
export const PEOPLE_STORY_PHOTOS: Record<string, StoryPhotoCollection> = {
  "bottle-cap-grandma": {
    hero: {
      src: "/images/people-drive/lin/lin-dscf5586.webp",
      alt: "林秀英站在自己製作的瓶蓋牆前",
      caption: "林秀英與她留下的瓶蓋牆。",
    },
    gallery: [
      { src: "/images/people-drive/lin/lin-dscf5593.webp", alt: "林秀英站在藍色瓶蓋牆前", caption: "" },
      { src: "/images/people-drive/lin/lin-dscf5569.webp", alt: "林秀英介紹瓶蓋牆作品", caption: "" },
      { src: "/images/people-drive/lin/lin-dscf5489.webp", alt: "林秀英以葉子做手工", caption: "" },
      { src: "/images/people-drive/lin/lin-dscf5480.webp", alt: "林秀英的手工作品細節", caption: "" },
      { src: "/images/people-drive/lin/lin-dscf5499.webp", alt: "林秀英的繪畫作品", caption: "" },
      { src: "/images/people-drive/lin/lin-dscf5506.webp", alt: "林秀英的手繪本", caption: "" },
      { src: "/images/people-drive/lin/lin-dscf5527.webp", alt: "林秀英手持作品", caption: "" },
      { src: "/images/people-drive/lin/lin-99.webp", alt: "林秀英製作手工時的樣子", caption: "" },
      { src: "/images/people-drive/lin/lin-58.webp", alt: "林秀英參與社區活動", caption: "" },
      { src: "/images/people-drive/lin/lin-3753.webp", alt: "林秀英與社區居民一起活動", caption: "" },
    ],
  },
  "breakfast-shop-owner": {
    hero: {
      src: "/images/people-drive/breakfast/breakfast-dscf5920.webp",
      alt: "早餐店老闆娘黃淑惠在店內工作",
      caption: "黃淑惠在每天熟悉的煎台與餐檯之間。",
    },
    gallery: [
      { src: "/images/people-drive/breakfast/breakfast-dscf5607.webp", alt: "黃淑惠在早餐店備料", caption: "" },
      { src: "/images/people-drive/breakfast/breakfast-dscf5777.webp", alt: "黃淑惠在煎台前工作", caption: "" },
      { src: "/images/people-drive/breakfast/breakfast-dscf5795.webp", alt: "黃淑惠製作早餐", caption: "" },
    ],
  },
  "community-kitchen-mother": {
    hero: {
      src: "/images/people-drive/li/li-48.webp",
      alt: "李水錦阿姨在社區廚房備料",
      caption: "李水錦阿姨在社區廚房裡忙著準備。",
    },
    gallery: [
      { src: "/images/people-drive/li/li-16.webp", alt: "李水錦阿姨料理滷蛋", caption: "" },
      { src: "/images/people-drive/li/li-41.webp", alt: "李水錦阿姨整理社區資料", caption: "" },
      { src: "/images/people-drive/li/li-43.webp", alt: "李水錦阿姨與社區長輩互動", caption: "" },
    ],
  },
  "community-volunteer": {
    hero: {
      src: "/images/people-drive/qinji/qinji-dscf5939.webp",
      alt: "親家阿公阿嬤坐在一起微笑",
      caption: "親家阿公阿嬤一起走進過港的日常。",
    },
    gallery: [
      { src: "/images/people-drive/qinji/qinji-dscf5958.webp", alt: "親家阿公阿嬤的家庭照片", caption: "" },
      { src: "/images/people-drive/qinji/qinji-362.webp", alt: "親家阿公阿嬤與社區成員一起活動", caption: "" },
    ],
  },
  "couple-story-one": {
    hero: {
      src: "/images/people-drive/qing/qing-dscf5762.webp",
      alt: "清爽阿公與阿笑阿嬤並肩而坐",
      caption: "清爽阿公與阿笑阿嬤。",
    },
    gallery: [
      { src: "/images/people-drive/qing/qing-380.webp", alt: "清爽阿公與阿笑阿嬤拿著社區產品", caption: "" },
    ],
  },
  "couple-story-two": {
    hero: {
      src: "/images/people-drive/meihua/meihua-29.webp",
      alt: "丁梅花站在社區入口前",
      caption: "丁梅花總是在需要時走進社區。",
    },
    gallery: [
      { src: "/images/people-drive/meihua/meihua-3768.webp", alt: "丁梅花替社區長輩剪髮", caption: "" },
      { src: "/images/people-drive/meihua/meihua-3769.webp", alt: "丁梅花在義剪服務中陪伴長輩", caption: "" },
    ],
  },
};
