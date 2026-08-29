"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { sitePath } from "../utils/sitePath";

type StoryStage = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  imageLabel: string;
  tone: "paper" | "ink" | "ochre" | "green";
  image?: string;
};

const STAGES: StoryStage[] = [
  {
    number: "01",
    eyebrow: "RIVER / PLACE",
    title: "這裡是過港。",
    description: "一個沿著基隆河生活的地方。",
    imageLabel: "基隆河、過港環境大景｜待提供",
    tone: "paper",
  },
  {
    number: "02",
    eyebrow: "PEOPLE / DAILY LIFE",
    title: "過港的樣子，藏在每個人的日常裡。",
    description: "居民的日常生活與工作影像｜待提供",
    imageLabel: "居民日常、社區志工與工作畫面｜待提供",
    tone: "ink",
  },
  {
    number: "03",
    eyebrow: "HANDS / FLAVOR",
    title: "而這些日常，也被一雙雙手做成了味道。",
    description: "商品製作、備料過程與完成品影像｜待提供",
    imageLabel: "備料、料理、手部與商品製作過程｜待提供",
    tone: "ochre",
  },
  {
    number: "04",
    eyebrow: "STORY / FURTHER",
    title: "把過港的故事，帶到更遠的地方。",
    description: "完成的產品、人與產品合照｜待提供",
    imageLabel: "最能代表現在過港的影像｜待提供",
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
            {stage.image ? (
              <img src={sitePath(stage.image)} alt={stage.imageLabel} />
            ) : (
              <div className="scroll-story-static-placeholder" role="img" aria-label={stage.imageLabel}>
                {stage.imageLabel}
              </div>
            )}
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
            <img src={sitePath(stage.image)} alt={stage.imageLabel} />
            <span aria-hidden="true" />
          </div>
        ) : (
          <div className="scroll-story-art" role="img" aria-label={stage.imageLabel} key={stage.number}>
            <span />
            <span />
            <span />
            <small>{stage.imageLabel}</small>
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
