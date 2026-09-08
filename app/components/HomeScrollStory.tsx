"use client";
import { useEffect, useRef, useState } from "react";
import { sitePath } from "../utils/sitePath";
import { HeadingLines } from "./HeadingLines";

type StoryStage = {
  number: string;
  titleLines: readonly string[];
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
    titleLines: ["這裡是過港。"],
    description: "一個沿著基隆河生活的地方。",
    imageLabel: "過港河岸、岩石與周邊環境",
    image: "/images/home/home-scroll-01.webp",
    imageMobile: "/images/home/home-scroll-01-1280.webp",
    objectPosition: "center center",
    tone: "paper",
  },
  {
    number: "02",
    titleLines: ["過港的樣子，", "藏在每個人的日常裡。"],
    description: "居民相聚、活動的日常，也慢慢留下過港的樣子。",
    imageLabel: "過港居民在社區空間進行團體活動",
    image: "/images/home/home-scroll-02.webp",
    imageMobile: "/images/home/home-scroll-02-1280.webp",
    objectPosition: "center center",
    tone: "ink",
  },
  {
    number: "03",
    titleLines: ["而這些日常，", "也被一雙雙手做成了味道。"],
    description: "從備料到料理，一雙雙手把熟悉的味道慢慢做出來。",
    imageLabel: "居民在大鍋中製作滷蛋",
    image: "/images/home/home-scroll-03.webp",
    imageMobile: "/images/home/home-scroll-03-1280.webp",
    objectPosition: "center center",
    tone: "ochre",
  },
  {
    number: "04",
    titleLines: ["把過港的故事，", "帶到更遠的地方。"],
    description: "完成的商品，也把過港的生活與故事帶向更遠的地方。",
    imageLabel: "過港雞片鐵蛋包裝商品",
    image: "/images/home/home-scroll-04.webp",
    imageMobile: "/images/home/home-scroll-04-1280.webp",
    objectPosition: "center center",
    tone: "green",
  },
];

export function HomeScrollStory() {
  const storyRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveIndex(Number((entry.target as HTMLElement).dataset.scene));
    }, { rootMargin: "-15% 0px -35% 0px", threshold: 0.1 });
    storyRef.current?.querySelectorAll("[data-scene]").forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, []);
  return (
    <section className="home-narrative" ref={storyRef} aria-label="捲動閱讀過港地方故事">
      {STAGES.map((stage, index) => (
        <article className={`narrative-scene narrative-scene-${index + 1}`} id={`scene-${stage.number}`} data-scene={index} key={stage.number}>
          <figure className="narrative-image">
            <img src={sitePath(stage.image!)} srcSet={`${sitePath(stage.imageMobile!)} 1280w, ${sitePath(stage.image!)} 2560w`}
              sizes={index === 0 ? "(max-width: 700px) 100vw, 52vw" : "(max-width: 700px) 90vw, 60vw"}
              alt={stage.imageLabel} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} />
            <figcaption><span>{stage.number} / GUOGANG</span><span>{stage.imageLabel}</span></figcaption>
          </figure>
          <div className="narrative-copy">
            {index === 0 ? <h1><HeadingLines lines={stage.titleLines} /></h1> : <h2><HeadingLines lines={stage.titleLines} /></h2>}
            <p>{stage.description}</p>
            {index === 0 && <a className="scroll-story-cue" href="#scene-02" aria-label="繼續閱讀過港地方故事"><span aria-hidden="true">⌄</span></a>}
            {index === STAGES.length - 1 && <div className="button-row">
              <a className="text-link" href={sitePath("/guogang")}>閱讀過港的故事 <span aria-hidden="true">→</span></a>
              <a className="text-link" href="#home-guides">繼續往下</a>
            </div>}
          </div>
        </article>
      ))}
      <nav className="narrative-index" aria-label="首頁敘事章節">
        {STAGES.map((stage, index) => <a key={stage.number} href={`#scene-${stage.number}`} aria-label={stage.titleLines.join("")} aria-current={activeIndex === index ? "step" : undefined}>{stage.number}</a>)}
      </nav>
    </section>
  );
}
