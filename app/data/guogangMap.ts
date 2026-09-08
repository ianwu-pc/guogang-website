// Coordinates and masks are newly measured from 新地圖.jpg (7680 x 4320).
// Authoritative reading order: right to left within each row, then top to bottom.
// The user corrected the direction for all 14 names on 2026-09-08.
export const MAP_READING_ROWS = [
  { id: "upper", label: "上排（由右至左）" },
  { id: "middle", label: "中排（由右至左）" },
  { id: "lower", label: "下排（由右至左）" },
] as const;
export type MapLandmark = {
  row: (typeof MAP_READING_ROWS)[number]["id"];
  id: string; name: string; x: number; y: number; width: number; height: number;
  labelX: number; labelY: number; href?: string; linkLabel?: string;
};
export const MAP_SOURCE = { width: 7680, height: 4320, sha256: "1d34a4a0219573b9685620318ecab382d3e2beb87c36664394c1fa74830a8775" };
export const GUOGANG_MAP_LOCATIONS: MapLandmark[] = [
  {
    "id": "little-couple-store",
    "name": "小倆口福利社",
    "x": 87.69531,
    "y": 6.68403,
    "width": 9.86328,
    "height": 16.84028,
    "labelX": 90.23438,
    "labelY": 2.8,
    "row": "upper"
  },
  {
    "id": "breakfast-shop",
    "name": "美食坊早餐店",
    "x": 77.09961,
    "y": 14.84375,
    "width": 9.61914,
    "height": 14.14931,
    "labelX": 81.44531,
    "labelY": 11.89236,
    "row": "upper"
  },
  {
    "id": "old-police-dormitory",
    "name": "舊警察宿舍",
    "x": 49.46289,
    "y": 12.84722,
    "width": 9.81445,
    "height": 18.92361,
    "labelX": 54.10156,
    "labelY": 9.72222,
    "row": "upper"
  },
  {
    "id": "nuanjiang-elementary-school",
    "name": "暖江國小",
    "x": 20.16602,
    "y": 11.89236,
    "width": 19.04297,
    "height": 21.70139,
    "labelX": 29.58984,
    "labelY": 9.02778,
    "row": "upper"
  },
  {
    "id": "shengguang-church",
    "name": "聖光堂",
    "x": 4.49219,
    "y": 27.43056,
    "width": 7.91016,
    "height": 22.22222,
    "labelX": 8.30078,
    "labelY": 23.6,
    "row": "upper"
  },
  {
    "id": "wax-culture-hall",
    "name": "黃蠟石文化館",
    "x": 62.1582,
    "y": 45.13889,
    "width": 8.74023,
    "height": 13.28125,
    "labelX": 67.5,
    "labelY": 42.44792,
    "row": "middle"
  },
  {
    "id": "community-association",
    "name": "過港社區發展協會",
    "x": 48.53516,
    "y": 44.96528,
    "width": 11.23047,
    "height": 14.49653,
    "labelX": 54.5,
    "labelY": 40.97222,
    "href": "/about",
    "linkLabel": "認識協會 →",
    "row": "middle"
  },
  {
    "id": "guogang-kindergarten",
    "name": "過港幼兒園",
    "x": 37.10938,
    "y": 46.875,
    "width": 10.30273,
    "height": 12.58681,
    "labelX": 42,
    "labelY": 43.1,
    "row": "middle"
  },
  {
    "id": "guogang-post-office",
    "name": "過港郵局",
    "x": 30.46875,
    "y": 47.48264,
    "width": 6.29883,
    "height": 10.32986,
    "labelX": 33,
    "labelY": 44.35764,
    "row": "middle"
  },
  {
    "id": "nuanjiang-walkway",
    "name": "暖江步道",
    "x": 77.34375,
    "y": 65.01736,
    "width": 22.65625,
    "height": 28.21181,
    "labelX": 89.59961,
    "labelY": 61.4,
    "row": "lower"
  },
  {
    "id": "children-park",
    "name": "暖江兒童公園",
    "x": 65.03906,
    "y": 63.02083,
    "width": 12.35352,
    "height": 14.84375,
    "labelX": 71.28906,
    "labelY": 82.20486,
    "row": "lower"
  },
  {
    "id": "northern-pastry",
    "name": "北方大陸餅",
    "x": 37.89062,
    "y": 65.36458,
    "width": 10.00977,
    "height": 16.31944,
    "labelX": 42.5293,
    "labelY": 85.32986,
    "row": "lower"
  },
  {
    "id": "nuan-new-immigrant-hall",
    "name": "暖新住民會館",
    "x": 20.94727,
    "y": 66.49306,
    "width": 9.57031,
    "height": 20.92014,
    "labelX": 25.68359,
    "labelY": 90.27778,
    "row": "lower"
  },
  {
    "id": "guogang-fude-temple",
    "name": "過港福德宮",
    "x": 7.95898,
    "y": 61.89236,
    "width": 10.35156,
    "height": 13.62847,
    "labelX": 12.98828,
    "labelY": 79.60069,
    "row": "lower"
  }
];
