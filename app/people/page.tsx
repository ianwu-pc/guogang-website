import type { Metadata } from "next";
import { HeadingLines } from "../components/HeadingLines";
import { PageIntro } from "../components/PageIntro";
import { PEOPLE } from "../data/site";
import { getPeopleStory } from "../data/peopleStories";
import { sitePath } from "../utils/sitePath";

export const metadata: Metadata = {
  title: "人與過港",
  description: "從六種與過港相遇的方式，看見這個地方不同的模樣。",
};

type IndexEntry = {
  slug: string;
  name: string;
  role?: string;
  headlineLines: Array<{ text: string }>;
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
    "slug": "bottle-cap-grandma",
    "visual": {
      "type": "editorial",
      "ratio": "portrait"
    },
    "side": "left",
    "offset": 0
  },
  {
    "slug": "breakfast-shop-owner",
    "visual": {
      "type": "editorial",
      "ratio": "landscape",
      "treatment": "text-led"
    },
    "side": "right",
    "offset": 3
  },
  {
    "slug": "couple-story-two",
    "visual": {
      "type": "editorial",
      "ratio": "landscape"
    },
    "side": "left",
    "offset": 0
  },
  {
    "slug": "couple-story-one",
    "visual": {
      "type": "image",
      "ratio": "portrait",
      "src": "/images/people/couple-story-one/qingshuang-axiao-portrait.jpg",
      "alt": "清爽 × 阿笑"
    },
    "side": "right",
    "offset": 2
  },
  {
    "slug": "community-kitchen-mother",
    "visual": {
      "type": "image",
      "ratio": "portrait",
      "src": "/images/people/community-kitchen-mother/li-shui-jin-kitchen.jpg",
      "alt": "煮飯阿姨"
    },
    "side": "left",
    "offset": 1
  },
  {
    "slug": "community-volunteer",
    "visual": {
      "type": "editorial",
      "ratio": "landscape"
    },
    "side": "right",
    "offset": 4
  }
].map((entry) => {
  const story = getPeopleStory(entry.slug)!;
  return {
    ...entry,
    side: entry.side as IndexEntry["side"],
    name: story.name,
    role: story.role,
    headlineLines: story.titleLines.map((text) => ({ text })),
    summaryLines: story.ending.smallLines,
    cta: `閱讀${story.name}的故事 →`,
    visual: {
      ...entry.visual,
      type: entry.visual.type as IndexEntry["visual"]["type"],
      ratio: entry.visual.ratio as IndexEntry["visual"]["ratio"],
      treatment: entry.visual.treatment as IndexEntry["visual"]["treatment"],
      eyebrow: story.name,
      frameLine: story.ending.largeLines,
    },
  };
});

function renderSummaryLines(lines: string[]) {
  return lines
    .filter((line) => line.trim())
    .map((line, index) => <p key={`${line}-${index}`}>{line}</p>);
}

function renderHeadlineLines(lines: IndexEntry["headlineLines"]) {
  return <HeadingLines lines={lines.map((line) => line.text)} />;
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
