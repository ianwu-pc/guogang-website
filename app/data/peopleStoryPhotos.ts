import type { StoryImage } from "./peopleStories";

type StoryPhotoCollection = { hero: StoryImage; gallery: StoryImage[] };

// User-selected first-level photos; hero stays above the article, gallery follows the ending.
export const PEOPLE_STORY_PHOTOS: Record<string, StoryPhotoCollection> = {
  "bottle-cap-grandma": {
    "hero": {
      "src": "/images/people-updated-20260920/lin-hero.webp",
      "alt": "林秀英的影像紀錄",
      "caption": ""
    },
    "gallery": [
      {
        "src": "/images/people-updated-20260920/lin-1.webp",
        "alt": "林秀英的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/lin-2.webp",
        "alt": "林秀英的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/lin-3.webp",
        "alt": "林秀英的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/lin-4.webp",
        "alt": "林秀英的影像紀錄",
        "caption": ""
      }
    ]
  },
  "breakfast-shop-owner": {
    "hero": {
      "src": "/images/people-updated-20260920/breakfast-hero.webp",
      "alt": "黃淑惠的影像紀錄",
      "caption": ""
    },
    "gallery": [
      {
        "src": "/images/people-updated-20260920/breakfast-1.webp",
        "alt": "黃淑惠的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/breakfast-2.webp",
        "alt": "黃淑惠的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/breakfast-3.webp",
        "alt": "黃淑惠的影像紀錄",
        "caption": ""
      }
    ]
  },
  "community-volunteer": {
    "hero": {
      "src": "/images/people-updated-20260920/couple-hero.webp",
      "alt": "順發阿公與宜慧阿嬤的影像紀錄",
      "caption": ""
    },
    "gallery": [
      {
        "src": "/images/people-updated-20260920/couple-1.webp",
        "alt": "順發阿公與宜慧阿嬤的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/couple-2.webp",
        "alt": "順發阿公與宜慧阿嬤的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/couple-3.webp",
        "alt": "順發阿公與宜慧阿嬤的影像紀錄",
        "caption": ""
      }
    ]
  },
  "couple-story-one": {
    "hero": {
      "src": "/images/people-updated-20260920/qing-hero.webp",
      "alt": "清爽與阿笑的影像紀錄",
      "caption": ""
    },
    "gallery": [
      {
        "src": "/images/people-updated-20260920/qing-1.webp",
        "alt": "清爽與阿笑的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/qing-2.webp",
        "alt": "清爽與阿笑的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/qing-3.webp",
        "alt": "清爽與阿笑的影像紀錄",
        "caption": ""
      }
    ]
  },
  "couple-story-two": {
    "hero": {
      "src": "/images/people-updated-20260920/meihua-hero.webp",
      "alt": "丁梅花的影像紀錄",
      "caption": ""
    },
    "gallery": [
      {
        "src": "/images/people-updated-20260920/meihua-1.webp",
        "alt": "丁梅花的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/meihua-2.webp",
        "alt": "丁梅花的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/meihua-3.webp",
        "alt": "丁梅花的影像紀錄",
        "caption": ""
      }
    ]
  },
  "community-kitchen-mother": {
    "hero": {
      "src": "/images/people-updated-20260920/kitchen-hero.webp",
      "alt": "李水錦的影像紀錄",
      "caption": ""
    },
    "gallery": [
      {
        "src": "/images/people-updated-20260920/kitchen-1.webp",
        "alt": "李水錦的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/kitchen-2.webp",
        "alt": "李水錦的影像紀錄",
        "caption": ""
      },
      {
        "src": "/images/people-updated-20260920/kitchen-3.webp",
        "alt": "李水錦的影像紀錄",
        "caption": ""
      }
    ]
  }
};
