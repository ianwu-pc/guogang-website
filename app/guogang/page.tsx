import type { Metadata } from "next";
import { GuogangInteractiveMap } from "../components/GuogangInteractiveMap";
import { PageIntro } from "../components/PageIntro";
import { Timeline } from "../components/Timeline";
import { GUOGANG_TIMELINE } from "../data/site";
import { sitePath } from "../utils/sitePath";

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
        <h2><span className="heading-line">過港不是一個</span><span className="heading-line">突然出現的名字，</span><span className="heading-line">而是被河流、移居</span><span className="heading-line">與日常慢慢寫下</span><span className="heading-line">的地方。</span></h2>
      </section>

      <section className="timeline-section">
        <Timeline entries={GUOGANG_TIMELINE} label="過港地方故事時間線" />
      </section>

      <GuogangInteractiveMap />

      <section className="guogang-ending">
        <p className="eyebrow light">THE STORY CONTINUES</p>
        <h2><span className="heading-line">故事走到今天，</span><span className="heading-line">生活還在繼續。</span></h2>
        <div className="button-row">
          <a className="button button-outline-light" href={sitePath("/goods")}>看看過港好味</a>
          <a className="button button-outline-light" href={sitePath("/people")}>人與過港</a>
        </div>
      </section>
    </main>
  );
}
