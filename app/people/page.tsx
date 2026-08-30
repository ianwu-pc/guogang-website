import type { Metadata } from "next";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { PageIntro } from "../components/PageIntro";
import { PEOPLE } from "../data/site";
import { sitePath } from "../utils/sitePath";

export const metadata: Metadata = {
  title: "人與過港",
  description: "從六種與過港相遇的方式，看見這個地方不同的模樣。",
};

export default function PeoplePage() {
  return (
    <main className="inner-page people-page">
      <PageIntro index="02" title="人與過港" description="有人在這裡生活，有人在這裡工作，也有人因為一件件社區裡的小事，慢慢和過港有了更深的連結。" vertical="PEOPLE OF GUOGANG" />

      <section className="people-overview" aria-labelledby="people-overview-title">
        <header className="people-overview-heading">
          <p className="eyebrow">PEOPLE OF GUOGANG / 人與過港</p>
          <h2 id="people-overview-title">過港的樣子，<br />藏在每個人的日常裡。</h2>
          <p>從不同人的故事出發，看見六種與過港相遇的方式，也看見這個地方不同的模樣。人物姓名與完整訪談仍在確認，現階段先呈現每段故事的方向。</p>
        </header>

        <div className="people-story-list">
          {PEOPLE.map((person, index) => (
            <article className="people-story-card" key={person.id}>
              <ImagePlaceholder label={person.coverImage} alt={`${person.name}人物照片`} ratio="portrait" tone={index % 2 ? "paper" : "green"} />
              <div className="people-story-copy">
                <p className="eyebrow">STORY {String(index + 1).padStart(2, "0")}</p>
                <h3>{person.name}</h3>
                <p className="people-story-quote">{person.quote}</p>
                <p>{person.summary}</p>
                <a className="text-link" href={sitePath(`/people/${person.slug}`)}>閱讀故事 <span aria-hidden="true">→</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="people-ending">
        <p className="eyebrow">SIX WAYS OF MEETING A PLACE</p>
        <h2>六種相遇，<br />看見六種過港。</h2>
        <p>每個人和一個地方建立關係的方式都不一樣。有人從小生活在這裡，有人因為工作來到這裡，也有人在一次次參與之中，慢慢成為過港生活的一部分。而這些不同的日常，一起拼出了今天的過港。</p>
        <div className="button-row">
          <a className="button button-primary" href={sitePath("/guogang")}>認識過港</a>
          <a className="button button-outline" href={sitePath("/goods")}>看看過港好味</a>
        </div>
      </section>
    </main>
  );
}
