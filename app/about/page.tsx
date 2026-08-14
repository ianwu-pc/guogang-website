import type { Metadata } from "next";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { LineAction } from "../components/LineAction";
import { PageIntro } from "../components/PageIntro";
import { Timeline } from "../components/Timeline";
import { ASSOCIATION_TIMELINE, HOME_COPY, SITE_CONFIG } from "../data/site";

export const metadata: Metadata = {
  title: "關於我們",
  description: "沿著時間線認識過港社區發展協會、地方工作與參與方式。",
};

const WORK_AREAS = [
  {
    number: "01",
    title: "全人服務",
    description: "從長者照顧、兒少陪伴到家庭支持，讓不同生命階段都能在社區裡找到可依靠的連結。",
  },
  {
    number: "02",
    title: "環境與地方記憶",
    description: "從河川巡守、壺穴守護到地方故事整理，讓生活環境與共同記憶一起被看見。",
  },
  {
    number: "03",
    title: "跨社區共好",
    description: "分享領航經驗、陪伴夥伴提案與培力，讓一個社區累積的能力成為彼此可以使用的資源。",
  },
];

export default function AboutPage() {
  return (
    <main className="inner-page about-page">
      <PageIntro index="04" title="關於我們" description="一個協會的歷程，也是居民一起生活的紀錄。" vertical="ABOUT / TOGETHER / LOCAL" />

      <section className="about-lead about-lead-revised">
        <div className="about-logo-column">
          <ImagePlaceholder label={SITE_CONFIG.logoImage || "過港社區發展協會 Logo｜待提供"} alt="過港社區發展協會 Logo" ratio="square" tone="paper" />
          <span>GUOGANG COMMUNITY</span>
        </div>
        <div>
          <p className="eyebrow">ABOUT THE ASSOCIATION</p>
          <h2>{SITE_CONFIG.associationName}</h2>
          <p>{HOME_COPY.associationDescription}</p>
          <blockquote>「全人服務、全方位的照顧，打造快樂安居的社區。」</blockquote>
        </div>
      </section>

      <section className="association-history" id="history">
        <header className="timeline-opening association-timeline-opening">
          <p className="eyebrow">OUR STORY / 協會歷程</p>
          <h2>從居民關心的一件事開始，<br />一步一步走成今天的過港。</h2>
          <p>這條時間線整合社區認證資料與民國 115 年計畫內容，已完成的成果與當年度計畫會分開標示。</p>
        </header>
        <Timeline entries={ASSOCIATION_TIMELINE} label="過港社區發展協會歷程時間線" />
      </section>

      <section className="association-work">
        <div className="association-work-heading">
          <p className="eyebrow">WHAT WE CARE ABOUT</p>
          <h2>協會關心的，<br />始終是居民如何一起生活。</h2>
        </div>
        <div className="association-work-list">
          {WORK_AREAS.map((area) => (
            <article key={area.number}>
              <span>{area.number}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow light">CONTACT US</p>
          <h2>與過港保持聯絡</h2>
          <p>網站只會刊登協會確認可公開的正式聯絡方式；附檔中的個人電話、Email 與內部資料不會直接公開。</p>
          <LineAction />
        </div>
        <dl>
          <div><dt>地址</dt><dd>{SITE_CONFIG.address}</dd></div>
          <div><dt>電話</dt><dd>{SITE_CONFIG.phone}</dd></div>
          <div><dt>Email</dt><dd>{SITE_CONFIG.email}</dd></div>
          <div><dt>Facebook</dt><dd>連結待提供</dd></div>
          <div><dt>Instagram</dt><dd>連結待提供</dd></div>
        </dl>
      </section>

      <section className="site-info-note" id="site-info">
        <h2>網站資訊與隱私權</h2>
        <p>正式網站資訊與隱私權內容待提供。</p>
      </section>
    </main>
  );
}
