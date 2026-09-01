import type { Metadata } from "next";
import { HomeScrollStory } from "./components/HomeScrollStory";
import { HeadingLines } from "./components/HeadingLines";
import { ImagePlaceholder } from "./components/ImagePlaceholder";
import { LineAction } from "./components/LineAction";
import { GOODS, HOME_COPY, PEOPLE, SITE_CONFIG } from "./data/site";
import { sitePath } from "./utils/sitePath";

export const metadata: Metadata = {
  title: { absolute: "過港｜地方、人物與生活的故事" },
  description: "從河岸的名字、過港好味與居民日常，慢慢認識過港。",
};

export default function Home() {
  return (
    <main>
      <HomeScrollStory />

      <section className="home-guides" id="home-guides" aria-label="認識過港的地方、好味與人物">
        <article className="home-guide home-guide-place">
          <div className="home-guide-number">01</div>
          <ImagePlaceholder
            label="/images/guogang-history-1949.png"
            alt="過港早期聚落歷史照片"
            ratio="wide"
            tone="paper"
          />
          <div className="home-guide-copy">
            <p className="eyebrow">01 / 認識過港</p>
            <h2><HeadingLines lines={["一個名字，", "從河的另一岸開始。"]} /></h2>
            <p>早年暖暖河岸設有港口，往來的人們乘著渡船渡過基隆河，而港口的另一岸，便被稱作「過港」。隨著不同的人來到這裡生活、落腳，過港也一點一點成為今天的模樣。</p>
            <a className="text-link" href={sitePath("/guogang")}>認識過港 <span aria-hidden="true">→</span></a>
          </div>
        </article>

        <article className="home-guide home-guide-goods">
          <div className="home-guide-number">02</div>
          <div className="home-feature-grid home-goods-grid">
            {GOODS.slice(0, 3).map((good, index) => (
              <article className="home-feature-card" key={good.id}>
                <ImagePlaceholder
                  label={good.coverImage}
                  alt={`${good.name}商品照片`}
                  ratio="square"
                  tone={index % 2 ? "ochre" : "clay"}
                  className={good.coverImage.includes("-cutout.") ? "product-image-cutout" : ""}
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{good.name}</h3>
                <p>{good.summary}</p>
                <a className="text-link" href={sitePath(`/goods/${good.slug}`)}>查看商品 <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
          <div className="home-guide-copy">
            <p className="eyebrow">02 / 過港好味</p>
            <h2><HeadingLines lines={["把熟悉的日常，", "做成可以分享的味道。"]} /></h2>
            <p>有些味道，是在過港的生活裡慢慢累積下來的。從社區媽媽的一雙雙手，到大家一起製作、一起分享，這些屬於過港的好味，也成了認識這個地方的另一種方式。</p>
            <a className="text-link" href={sitePath("/goods")}>更多過港好味 <span aria-hidden="true">→</span></a>
          </div>
        </article>

        <article className="home-guide home-guide-people">
          <div className="home-guide-number">03</div>
          <div className="home-feature-grid home-people-grid">
            {PEOPLE.slice(0, 3).map((person, index) => (
              <article className="home-feature-card" key={person.id}>
                {person.slug === "bottle-cap-grandma" ? (
                  <div
                    className="image-placeholder ratio-portrait tone-paper people-story-editorial-cover"
                    role="img"
                    aria-label="林秀英人物故事文字封面"
                  >
                    <div>
                      <span className="eyebrow">STORY 01 / TIME</span>
                      <strong>{person.quoteLines ? <HeadingLines lines={person.quoteLines} /> : person.quote}</strong>
                      <small>{person.name} · {person.role}</small>
                    </div>
                  </div>
                ) : (
                  <ImagePlaceholder label={person.coverImage} alt={`${person.name}人物紀錄照片`} ratio="portrait" tone={index % 2 ? "paper" : "green"} />
                )}
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{person.name}</h3>
                {person.role !== "人物姓名待確認" ? <small className="home-feature-role">{person.role}</small> : null}
                <p>{person.quote}</p>
                <a className="text-link" href={sitePath(`/people/${person.slug}`)}>閱讀故事 <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
          <div className="home-guide-copy">
            <p className="eyebrow">03 / 人與過港</p>
            <h2><HeadingLines lines={["過港的樣子，", "藏在這裡的人身上。"]} /></h2>
            <p>有人守著每天清晨的味道，有人用雙手留下地方的風景，也有人默默投入社區，把一件件平凡的小事慢慢累積成今天的過港。從他們的生活裡，也能看見這個地方不同的模樣。</p>
            <a className="text-link" href={sitePath("/people")}>認識更多過港的人 <span aria-hidden="true">→</span></a>
          </div>
        </article>

        <article className="home-guide home-guide-about">
          <div className="home-guide-number">04</div>
          <ImagePlaceholder label="協會成員、志工與居民互動畫面｜待提供" ratio="landscape" tone="clay" />
          <div className="home-guide-copy">
            <p className="eyebrow">04 / 關於我們</p>
            <h2><HeadingLines lines={["一群人一起做的事，", "慢慢成了社區的力量。"]} /></h2>
            <p>{HOME_COPY.associationDescription}</p>
            <div className="button-row">
              <a className="button button-primary" href={sitePath("/about")}>認識過港社區發展協會</a>
              <LineAction />
            </div>
          </div>
        </article>

        <section className="home-more" aria-labelledby="home-more-title">
          <div className="home-more-copy">
            <p className="eyebrow">MORE GUOGANG / 更多過港</p>
            <h2 id="home-more-title"><HeadingLines lines={["如果喜歡過港，", "也歡迎把這份味道帶回家。"]} /></h2>
            <p>過港好味以社區小量製作為主，商品會依實際產量不定期開團。如果想知道最近有哪些商品，可以加入 LINE 社群查看最新開團資訊；也可以從 Facebook 看見更多過港的日常與活動。</p>
            <div className="button-row">
              <LineAction label="加入 LINE 看本期好味" />
              <a className="button button-outline" href={SITE_CONFIG.facebookUrl} target="_blank" rel="noreferrer">前往 Facebook</a>
              <a className="button button-outline" href={sitePath("/guogang#guogang-map")}>查看交通資訊</a>
            </div>
          </div>
          <div className="home-more-side">
            <ImagePlaceholder label="LINE 社群 QR Code｜待提供" ratio="square" tone="paper" />
            <address>
              <strong>{SITE_CONFIG.associationName}</strong>
              <span>{SITE_CONFIG.address}</span>
              <a href={`tel:${SITE_CONFIG.phone.replace(/-/g, "")}`}>{SITE_CONFIG.phone}</a>
            </address>
          </div>
        </section>
      </section>
    </main>
  );
}
