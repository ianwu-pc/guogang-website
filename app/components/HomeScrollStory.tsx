"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { sitePath } from "../utils/sitePath";

type StoryStage = {
  number: string;
  title: string;
  description: string;
  imageLabel: string;
  tone: "paper" | "ink" | "ochre" | "green";
  image?: string;
  imageMobile?: string;
  objectPosition?: string;
};

const STAGES: StoryStage[] = [
  {
    number: "01",
    title: "這裡是過港。",
    description: "一個沿著基隆河生活的地方。",
    imageLabel: "過港河岸、岩石與周邊環境",
    image: "/images/home/home-scroll-01.webp",
    imageMobile: "/images/home/home-scroll-01-1280.webp",
    objectPosition: "center center",
    tone: "paper",
  },
  {
    number: "02",
    title: "過港的樣子，藏在每個人的日常裡。",
    description: "居民相聚、活動的日常，也慢慢留下過港的樣子。",
    imageLabel: "過港居民在社區空間進行團體活動",
    image: "/images/home/home-scroll-02.webp",
    imageMobile: "/images/home/home-scroll-02-1280.webp",
    objectPosition: "center center",
    tone: "ink",
  },
  {
    number: "03",
    title: "而這些日常，也被一雙雙手做成了味道。",
    description: "從備料到料理，一雙雙手把熟悉的味道慢慢做出來。",
    imageLabel: "居民在大鍋中製作滷蛋",
    image: "/images/home/home-scroll-03.webp",
    imageMobile: "/images/home/home-scroll-03-1280.webp",
    objectPosition: "center center",
    tone: "ochre",
  },
  {
    number: "04",
    title: "把過港的故事，帶到更遠的地方。",
    description: "完成的商品，也把過港的生活與故事帶向更遠的地方。",
    imageLabel: "過港雞片鐵蛋包裝商品",
    image: "/images/home/home-scroll-04.webp",
    imageMobile: "/images/home/home-scroll-04-1280.webp",
    objectPosition: "center center",
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
        {STAGES.map((stage, index) => (
          <article className={`scroll-story-static-card tone-${stage.tone}`} key={stage.number}>
            {stage.image ? (
              <img
                src={sitePath(stage.image)}
                srcSet={stage.imageMobile ? `${sitePath(stage.imageMobile)} 1280w, ${sitePath(stage.image)} 2560w` : undefined}
                sizes="100vw"
                alt={stage.imageLabel}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                style={{ objectPosition: stage.objectPosition }}
              />
            ) : (
              <div className="scroll-story-static-placeholder" role="img" aria-label={stage.imageLabel}>
                {stage.imageLabel}
              </div>
            )}
            <h1>{stage.title}</h1>
            <p>{stage.description}</p>
            {index === 0 ? (
              <div className="scroll-story-cue scroll-story-cue-static" aria-hidden="true">
                <span>往下看看</span>
                <b>↓</b>
              </div>
            ) : null}
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
      <div className={`scroll-story-sticky tone-${stage.tone}${stage.image ? " has-photo" : ""}`}>
        {stage.image ? (
          <div className="scroll-story-photo" key={stage.image}>
            <img
              src={sitePath(stage.image)}
              srcSet={stage.imageMobile ? `${sitePath(stage.imageMobile)} 1280w, ${sitePath(stage.image)} 2560w` : undefined}
              sizes="100vw"
              alt={stage.imageLabel}
              loading={activeIndex === 0 ? "eager" : "lazy"}
              fetchPriority={activeIndex === 0 ? "high" : "auto"}
              style={{ objectPosition: stage.objectPosition }}
            />
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
          <h1>{stage.title}</h1>
          <p>{stage.description}</p>
          {activeIndex === STAGES.length - 1 ? (
            <div className="button-row">
              <a className="button button-paper" href={sitePath("/guogang")}>閱讀過港的故事</a>
              <a className="text-link story-light-link" href="#home-guides">繼續往下</a>
            </div>
          ) : null}
        </div>

        {activeIndex === 0 ? (
          <div className="scroll-story-cue" aria-hidden="true">
            <span>往下看看</span>
            <b>↓</b>
          </div>
        ) : null}

      </div>
    </section>
  );
}
