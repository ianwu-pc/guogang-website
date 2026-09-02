import type { Metadata } from "next";
import { HeadingLines } from "../components/HeadingLines";
import { PageIntro } from "../components/PageIntro";
import { PEOPLE } from "../data/site";
import { sitePath } from "../utils/sitePath";

export const metadata: Metadata = {
  title: "人與過港",
  description: "從六種與過港相遇的方式，看見這個地方不同的模樣。",
};

type IndexEntry = {
  slug: string;
  name: string;
  role?: string;
  headlineLines: Array<{
    text: string;
    mobileLines?: string[];
  }>;
  summaryLines: string[];
  cta: string;
  visual: {
    type: "image" | "editorial";
    ratio: "portrait" | "landscape";
    src?: string;
    alt?: string;
    eyebrow?: string;
    frameLine?: string[];
    annotation?: string[];
    treatment?: "text-led";
  };
  side: "left" | "right";
  offset: number;
};

const PEOPLE_INDEX_ORDER: IndexEntry[] = [
  {
    slug: "bottle-cap-grandma",
    name: "林秀英",
    headlineLines: [
      { text: "把時間，" },
      { text: "一個瓶蓋一個瓶蓋留在過港。", mobileLines: ["一個瓶蓋一個瓶蓋", "留在過港。"] },
    ],
    summaryLines: [
      "畫畫、寫字、刻印、做手工，",
      "她總覺得時間不該空著。",
      "",
      "六十多年過去，",
      "這雙停不下來的手，",
      "也在過港留下了一些形狀。",
    ],
    cta: "閱讀林秀英的故事 →",
    visual: {
      type: "editorial",
      ratio: "portrait",
      eyebrow: "一個人的日常實驗室",
      frameLine: ["每天一張新紙，", "時間就在手裡留下痕跡。"],
      annotation: ["瓶蓋牆", "生活的慢工筆記"],
    },
    side: "left",
    offset: 0,
  },
  {
    slug: "breakfast-shop-owner",
    name: "黃淑惠",
    role: "美食坊老闆娘",
    headlineLines: [
      { text: "二十五年，" },
      { text: "早餐店裡的客人慢慢成了朋友。", mobileLines: ["早餐店裡的客人", "慢慢成了朋友。"] },
    ],
    summaryLines: [
      "每天清晨來開店，",
      "有人從學生吃到成家，",
      "也有人從客人變成朋友。",
      "",
      "一間小小的早餐店，",
      "慢慢記住了很多人的生活。",
    ],
    cta: "閱讀她的故事 →",
    visual: {
      type: "editorial",
      ratio: "landscape",
      eyebrow: "清晨與煎台間的生活",
      frameLine: ["守著一方煎台，", "也守著一條街的成長與人情。"],
      annotation: ["清晨，", "煎台上的日常"],
      treatment: "text-led",
    },
    side: "right",
    offset: 3,
  },
  {
    slug: "couple-story-two",
    name: "丁梅花",
    headlineLines: [{ text: "再去看看一個人。" }],
    summaryLines: [
      "固定的日子替長輩剪頭髮，",
      "訪視的日子，",
      "再走進一戶戶熟悉的人家。",
      "",
      "對她來說，",
      "很多事情沒有多大的理由。",
      "",
      "只是看見了，",
      "而自己剛好還做得到。",
    ],
    cta: "閱讀丁梅花的故事 →",
    visual: {
      type: "editorial",
      ratio: "landscape",
      eyebrow: "走進每一次訪視",
      annotation: ["不只剪髮", "更守住了日常"],
    },
    side: "left",
    offset: 0,
  },
  {
    slug: "couple-story-one",
    name: "清爽 × 阿笑",
    headlineLines: [
      { text: "一起四十多年，" },
      { text: "生活這件事一直在變。", mobileLines: ["生活這件事", "一直在變。"] },
    ],
    summaryLines: [
      "年輕時忙工作、忙孩子、忙家庭，",
      "現在生活慢了一些，",
      "兩個人也有了另一種相處的時間。",
      "",
      "有關心，",
      "有嫌棄，",
      "也有一起生活四十多年的默契。",
    ],
    cta: "閱讀清爽與阿笑的故事 →",
    visual: {
      type: "image",
      ratio: "portrait",
      src: "/images/people/couple-story-one/qingshuang-axiao-portrait.jpg",
      alt: "清爽阿公與阿笑阿嬤自然相對的生活場景",
      eyebrow: "在地生活中互相扶持",
    },
    side: "right",
    offset: 2,
  },
  {
    slug: "community-kitchen-mother",
    name: "李水錦阿姨",
    headlineLines: [
      { text: "每天半個小時，" },
      { text: "她來過港過另一種生活。", mobileLines: ["她來過港過", "另一種生活。"] },
    ],
    summaryLines: [
      "從切菜、送餐，",
      "到學會蘿蔔糕、鐵蛋、碗粿，",
      "來到過港之後，",
      "她總還有新的事情可以做。",
      "",
      "過港不是她住的地方，",
      "卻是她願意一次又一次回來的地方。",
    ],
    cta: "閱讀她的故事 →",
    visual: {
      type: "image",
      ratio: "portrait",
      src: "/images/people/community-kitchen-mother/li-shui-jin-kitchen.jpg",
      alt: "李水錦阿姨在廚房備料準備料理",
      eyebrow: "來自生活裡的手與味道",
    },
    side: "left",
    offset: 1,
  },
  {
    slug: "community-volunteer",
    name: "親家阿公阿嬤",
    headlineLines: [
      { text: "一天過一天，" },
      { text: "他們把生活一起過了下來。", mobileLines: ["他們把生活", "一起過了下來。"] },
    ],
    summaryLines: [
      "做生意、養孩子，",
      "下雨送貨，",
      "颱風也不能休息。",
      "",
      "沒有什麼特別的婚姻秘訣，",
      "只是日子來了，",
      "兩個人就一起過。",
    ],
    cta: "閱讀他們的故事 →",
    visual: {
      type: "editorial",
      ratio: "landscape",
      eyebrow: "平常日子的長期相伴",
      annotation: ["一起出門", "一起回來"],
    },
    side: "right",
    offset: 4,
  },
];

function renderSummaryLines(lines: string[]) {
  return lines
    .filter((line) => line.trim())
    .map((line, index) => <p key={`${line}-${index}`}>{line}</p>);
}

function renderHeadlineLines(lines: IndexEntry["headlineLines"]) {
  return lines.map((line) => (
    <span className="heading-line" key={line.text}>
      <span className="people-headline-desktop">{line.text}</span>
      {line.mobileLines ? (
        <span className="people-headline-mobile">
          {line.mobileLines.map((mobileLine) => <span key={mobileLine}>{mobileLine}</span>)}
        </span>
      ) : null}
    </span>
  ));
}

export default function PeoplePage() {
  const indexEntries = PEOPLE_INDEX_ORDER.map((entry) => {
    const person = PEOPLE.find((item) => item.slug === entry.slug);
    return {
      ...entry,
      href: person ? `/people/${person.slug}` : `/people/${entry.slug}`,
    };
  });

  return (
    <main className="inner-page people-page">
      <PageIntro
        index=""
        title="人與過港"
        description="有人每天來這裡工作，有人在這裡住了大半輩子，也有人因為家人、志工，或一件件生活裡的小事，慢慢和過港有了關係。"
        vertical="PEOPLE OF GUOGANG"
        hideIndex
      />

      <section className="people-overview" aria-labelledby="people-overview-title">
        <header className="people-overview-heading">
          <p className="eyebrow">PEOPLE OF GUOGANG / 人與過港</p>
          <h2 id="people-overview-title">
            <HeadingLines lines={["過港的樣子，", "藏在不同人的日常裡。"]} />
          </h2>
          <div className="people-overview-copy">
            <p>有人每天來這裡工作，</p>
            <p>有人在這裡住了大半輩子，</p>
            <p>也有人因為家人、志工，</p>
            <p>或因為生活裡的一件件小事，</p>
            <p>慢慢和過港有了關係。</p>
            <p>六段不同的人生，</p>
            <p>也留下六種認識過港的方式。</p>
          </div>
        </header>

        <div className="people-open-collage" aria-label="人物誌開場剪影">
          <figure className={`people-open-collage-image people-open-collage-image--wide`}>
            <img src={sitePath("/images/people/community-kitchen-mother/li-shui-jin-kitchen.jpg")} alt="早餐與社區裡的生活景象" loading="eager" />
          </figure>
          <figure className={`people-open-collage-image people-open-collage-image--small people-open-collage-image--portrait`}>
            <img src={sitePath("/images/people/community-kitchen-mother/li-shui-jin-learning.jpg")} alt="社區料理準備與學習片段" loading="eager" />
          </figure>
          <figure className={`people-open-collage-image people-open-collage-image--small`}>
            <img src={sitePath("/images/people/couple-story-one/qingshuang-axiao-community.jpg")} alt="清爽與阿笑參與社區活動" loading="eager" />
          </figure>
        </div>

        <div className="people-story-list">
          {indexEntries.map((entry, index) => (
            <article
              className={`people-story-card people-story-card--${entry.side} people-story-card--depth-${index % 3 + 1}`}
              key={entry.slug}
              style={{ ["--people-offset" as string]: `${entry.offset}rem` }}
            >
              <div className="people-story-copy">
                <p className="people-story-name">{entry.name}</p>
                {entry.role ? <p className="people-story-role">{entry.role}</p> : null}
                <h2 className="people-story-headline">{renderHeadlineLines(entry.headlineLines)}</h2>
                <div className="people-story-summary">{renderSummaryLines(entry.summaryLines)}</div>
                <a className="text-link people-story-cta" href={sitePath(entry.href)}>{entry.cta}</a>
              </div>

              <div className={`people-story-visual people-story-visual--${entry.visual.ratio} people-story-visual--${entry.visual.type}${entry.visual.treatment ? ` people-story-visual--${entry.visual.treatment}` : ""}`}>
                {entry.visual.type === "image" ? (
                  <figure>
                    <img src={sitePath(entry.visual.src || "")} alt={entry.visual.alt || `${entry.name}相關人物照片`} />
                  </figure>
                ) : (
                  <div className="people-story-editorial-cover" aria-label={`為 ${entry.name} 的手工編輯式封面`}>
                    <p className="eyebrow">{entry.visual.eyebrow}</p>
                    {entry.visual.frameLine
                      ? entry.visual.frameLine.map((line, i) => (
                          <p key={`${line}-${i}`} className="people-story-editorial-line">
                            {line}
                          </p>
                        ))
                      : null}
                    {entry.visual.annotation ? (
                      <p className="people-story-editorial-footnote">
                        {entry.visual.annotation.join(" · ")}
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="people-ending">
        <p className="eyebrow">SIX WAYS OF LIVING WITH PLACE</p>
        <h2>
          <HeadingLines lines={["六個故事，", "六種與過港產生關係的方式。"]} />
        </h2>
        <div className="people-ending-copy">
          <p>有人住在這裡，</p>
          <p>有人每天來到這裡，</p>
          <p>有人因為工作、家人，</p>
          <p>或一次次的往來，</p>
          <p>慢慢和這個地方熟了起來。</p>
          <p>和一個地方產生關係，</p>
          <p>從來不只有一種方式。</p>
          <p>而這些不同的生活，</p>
          <p>一起成了今天的過港。</p>
        </div>
      <div className="people-ending-links">
          <a href={sitePath("/guogang")}>認識過港</a>
          <a href={sitePath("/goods")}>過港好味</a>
        </div>
      </section>
    </main>
  );
}
