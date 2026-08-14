"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { sitePath } from "../utils/sitePath";

const STAGES = [
  {
    number: "01",
    eyebrow: "RIVER / PLACE",
    title: "過港，從一條河的對岸開始。",
    description: "早年的河岸有港口，茶葉與大菁由渡船往來。人們把河的另一端叫作過港，一個地方的名字就這樣留了下來。",
    tone: "paper",
  },
  {
    number: "02",
    eyebrow: "1949 / SETTLEMENT",
    title: "人們搬進來，地方開始有了新的日常。",
    description: "民國三十八年後，新的居民在這裡落腳。宿舍、學校與生活設施，慢慢把聚落連成一個社區。",
    tone: "ink",
    image: "/images/guogang-history-1949.png",
  },
  {
    number: "03",
    eyebrow: "LIFE / MEMORY",
    title: "地方不是一張地圖，是每天一起生活的人。",
    description: "市場、河岸、老宿舍與新住宅並存。不同世代帶著各自的記憶，在過港相遇。",
    tone: "ochre",
  },
  {
    number: "04",
    eyebrow: "STORY / CONTINUES",
    title: "把故事留下來，也把下一段生活一起寫下去。",
    description: "從地方歷史、過港好物到協會的行動，往下繼續閱讀這個社區如何走到今天。",
    tone: "green",
  },
];

export function HomeScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener?.("change", updatePreference);
    return () => media.removeEventListener?.("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(0.9999, -rect.top / scrollable));
      setActiveIndex(Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length)));
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="scroll-story-static" aria-label="過港地方故事">
        {STAGES.map((stage) => (
          <article className={`scroll-story-static-card tone-${stage.tone}`} key={stage.number}>
            {stage.image ? <img src={sitePath(stage.image)} alt="過港早期聚落歷史照片" /> : null}
            <span>{stage.number}</span>
            <p className="eyebrow">{stage.eyebrow}</p>
            <h1>{stage.title}</h1>
            <p>{stage.description}</p>
          </article>
        ))}
      </section>
    );
  }

  const stage = STAGES[activeIndex];

  return (
    <section
      className="scroll-story"
      ref={sectionRef}
      style={{ "--stage-count": STAGES.length } as CSSProperties}
      aria-label="捲動閱讀過港地方故事"
    >
      <div className={`scroll-story-sticky tone-${stage.tone}`}>
        {stage.image ? (
          <div className="scroll-story-photo" key={stage.image}>
            <img src={sitePath(stage.image)} alt="過港早期聚落歷史照片" />
            <span aria-hidden="true" />
          </div>
        ) : (
          <div className="scroll-story-art" aria-hidden="true" key={stage.number}>
            <span />
            <span />
            <span />
          </div>
        )}

        <div className="scroll-story-copy" key={stage.number} aria-live="polite">
          <div className="scroll-story-meta">
            <span>{stage.number}</span>
            <span>{stage.eyebrow}</span>
          </div>
          <h1>{stage.title}</h1>
          <p>{stage.description}</p>
          {activeIndex === STAGES.length - 1 ? (
            <div className="button-row">
              <a className="button button-paper" href={sitePath("/guogang")}>閱讀過港的故事</a>
              <a className="text-link story-light-link" href="#home-guides">繼續往下</a>
            </div>
          ) : null}
        </div>

        <div className="scroll-story-progress" aria-hidden="true">
          {STAGES.map((item, index) => <span className={index === activeIndex ? "is-active" : ""} key={item.number} />)}
        </div>
      </div>
    </section>
  );
}
