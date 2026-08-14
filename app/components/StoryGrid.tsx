"use client";

import { useState } from "react";
import type { Story } from "../data/site";
import { sitePath } from "../utils/sitePath";
import { ImagePlaceholder } from "./ImagePlaceholder";

const FILTERS = ["全部", "長者", "孩子", "環境", "活動"] as const;

export function StoryGrid({ stories }: { stories: Story[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("全部");
  const visibleStories = filter === "全部" ? stories : stories.filter((story) => story.category === filter);

  return (
    <>
      <div className="story-filters" role="group" aria-label="故事分類篩選">
        {FILTERS.map((item) => (
          <button key={item} type="button" className={filter === item ? "is-active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>
      <div className="stories-directory" aria-live="polite">
        {visibleStories.map((story, index) => (
          <article className={`story-directory-card story-directory-${index + 1}`} key={story.id}>
            <a href={sitePath(`/stories/${story.slug}`)}>
              <ImagePlaceholder label={story.coverImage} ratio={index % 4 === 0 ? "wide" : index % 3 === 0 ? "square" : "landscape"} tone={index % 2 ? "paper" : "clay"} />
            </a>
            <div>
              <span className="category-label">{story.category}</span>
              <h2>{story.title}</h2>
              <p>{story.summary}</p>
              <div className="story-card-meta"><span>{story.date}</span><span>{story.author}</span></div>
              <a className="text-link" href={sitePath(`/stories/${story.slug}`)}>閱讀故事 <span aria-hidden="true">→</span></a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
