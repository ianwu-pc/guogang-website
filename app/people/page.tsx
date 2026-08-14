import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";

export const metadata: Metadata = {
  title: "過港人物",
  description: "過港人物故事正在整理中。",
};

const PEOPLE_PLACEHOLDERS = Array.from({ length: 6 }, (_, index) => ({
  name: `人物${index + 1}`,
  number: String(index + 1).padStart(2, "0"),
}));

export default function PeoplePage() {
  return (
    <main className="inner-page people-page">
      <PageIntro
        index="03"
        title="過港人物"
        description="真正的地方故事，應該從真實的聲音開始。"
        vertical="PEOPLE / VOICES / SOON"
      />
      <section className="people-placeholder-section">
        <header className="people-placeholder-heading">
          <p className="eyebrow">INTERVIEWS IN PROGRESS</p>
          <h2>人物故事正在整理中</h2>
          <p>先以六個位置確認版面，暫不加入虛構姓名、引言或經歷；正式訪談完成後，再逐篇替換為真實內容。</p>
        </header>
        <div className="people-placeholder-grid">
          {PEOPLE_PLACEHOLDERS.map((person) => (
            <article className="people-placeholder-card" key={person.number}>
              <div className="people-placeholder-portrait" aria-hidden="true">
                <span>{person.number}</span>
              </div>
              <div>
                <p className="eyebrow">STORY COMING SOON</p>
                <h3>{person.name}</h3>
                <p>訪談資料整理中</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
