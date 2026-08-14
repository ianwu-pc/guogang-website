import type { Metadata } from "next";
import { HomeScrollStory } from "./components/HomeScrollStory";
import { ImagePlaceholder } from "./components/ImagePlaceholder";
import { LineAction } from "./components/LineAction";
import { HOME_COPY } from "./data/site";
import { sitePath } from "./utils/sitePath";

export const metadata: Metadata = {
  title: { absolute: "過港｜地方、人物與生活的故事" },
  description: "沿著河岸、聚落與人們的生活，慢慢讀懂過港。",
};

export default function Home() {
  return (
    <main>
      <HomeScrollStory />

      <section className="home-guides" id="home-guides" aria-label="繼續認識過港">
        <header className="home-guides-opening">
          <p className="eyebrow">KEEP READING / 繼續閱讀</p>
          <h2>故事走出第一幕後，<br />真正的過港才慢慢展開。</h2>
          <p>這裡不把所有內容一次說完，而是留下幾條路，邀請你依照自己的步調走進地方、好物與協會的日常。</p>
        </header>

        <article className="home-guide home-guide-place">
          <div className="home-guide-number">01</div>
          <ImagePlaceholder
            label="/images/guogang-history-1949.png"
            alt="過港早期聚落歷史照片"
            ratio="wide"
            tone="paper"
          />
          <div className="home-guide-copy">
            <p className="eyebrow">A PLACE WITH MEMORY</p>
            <h2>河岸、宿舍與市場，<br />把不同年代留在同一個地方。</h2>
            <p>從港口得名，到新的居民落腳，再到公共設施與住宅進駐，過港的樣子是在一段段生活裡形成的。</p>
            <a className="text-link" href={sitePath("/guogang")}>沿著時間線認識過港 <span aria-hidden="true">↗</span></a>
          </div>
        </article>

        <article className="home-guide home-guide-goods">
          <div className="home-guide-number">02</div>
          <ImagePlaceholder label="過港好物照片｜待提供" ratio="landscape" tone="clay" />
          <div className="home-guide-copy">
            <p className="eyebrow">GOODS FROM DAILY LIFE</p>
            <h2>一件好物，不只說明材料，<br />也記得製作它的人與地方。</h2>
            <p>我們用簡短的故事與多張照片介紹每件好物，讓味道、手感與地方的關係，比規格表更容易被看見。</p>
            <a className="text-link" href={sitePath("/goods")}>看看過港好物 <span aria-hidden="true">↗</span></a>
          </div>
        </article>

        <article className="home-guide home-guide-people">
          <div className="home-guide-number">03</div>
          <div className="home-people-placeholder" role="img" aria-label="過港人物內容整理中">
            <span>PEOPLE</span>
            <strong>故事正在整理中</strong>
          </div>
          <div className="home-guide-copy">
            <p className="eyebrow">VOICES TO COME</p>
            <h2>先把位置留給真正的聲音。</h2>
            <p>人物訪談尚在整理，我們不使用虛構姓名或引言。等內容準備好，再讓每個人的故事完整出現。</p>
            <a className="text-link" href={sitePath("/people")}>前往過港人物 <span aria-hidden="true">↗</span></a>
          </div>
        </article>

        <article className="home-guide home-guide-about">
          <div className="home-guide-number">04</div>
          <div className="home-about-mark" aria-hidden="true">
            <span>EST. 1993</span>
            <strong>一起生活，<br />讓地方持續發生。</strong>
          </div>
          <div className="home-guide-copy">
            <p className="eyebrow">ABOUT THE ASSOCIATION</p>
            <h2>一個協會的歷程，<br />也是居民一起生活的紀錄。</h2>
            <p>{HOME_COPY.associationDescription}</p>
            <div className="button-row">
              <a className="button button-primary" href={sitePath("/about#history")}>閱讀協會歷程</a>
              <LineAction />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
