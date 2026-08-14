import type { Metadata } from "next";
import { GuogangInteractiveMap } from "../components/GuogangInteractiveMap";
import { PageIntro } from "../components/PageIntro";
import { Timeline } from "../components/Timeline";
import { GUOGANG_TIMELINE } from "../data/site";

export const metadata: Metadata = {
  title: "認識過港",
  description: "沿著時間線，從河岸港口、聚落形成到今天的地方行動，認識過港。",
};

export default function GuogangPage() {
  return (
    <main className="inner-page timeline-page">
      <PageIntro
        index="02"
        title="認識過港"
        description="一個地方，從河岸的名字、移居的記憶，到今天仍在發生的生活。"
        vertical="PLACE / MEMORY / NOW"
      />

      <section className="timeline-opening">
        <p className="eyebrow">THE STORY OF GUOGANG</p>
        <h2>過港不是一個突然出現的名字，<br />而是被河流、移居與日常慢慢寫下的地方。</h2>
        <p>以下依據社區認證資料整理地方發展脈絡。年份同時保留民國與西元標示，讓每一段記憶都能回到清楚的時間位置。</p>
      </section>

      <section className="timeline-section">
        <Timeline entries={GUOGANG_TIMELINE} label="過港地方故事時間線" />
      </section>

      <aside className="timeline-source-note">
        <span>ABOUT THE SOURCE</span>
        <p>時間線以附檔中的地方沿革與社區資料為基礎，濃縮為適合公開閱讀的內容；未刊登個人聯絡資料與內部表格。</p>
      </aside>

      <GuogangInteractiveMap />
    </main>
  );
}
