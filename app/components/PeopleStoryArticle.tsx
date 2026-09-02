import { HeadingLines } from "./HeadingLines";
import type { PeopleStory, StoryBlock, StoryImage } from "../data/peopleStories";
import type { Person } from "../data/site";
import { sitePath } from "../utils/sitePath";

type PeopleStoryArticleProps = {
  story: PeopleStory;
  previous: Person;
  next: Person;
};

function StoryFigure({ image, className = "" }: { image: StoryImage; className?: string }) {
  return (
    <figure className={`people-article-figure ${className}`.trim()}>
      <img src={sitePath(image.src)} alt={image.alt} />
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

function StoryBlocks({ blocks }: { blocks: StoryBlock[] }) {
  return blocks.map((block, index) => block.type === "quote" ? (
    <blockquote key={index}>{block.text}</blockquote>
  ) : (
    <p key={index}>{block.text}</p>
  ));
}

export function PeopleStoryArticle({ story, previous, next }: PeopleStoryArticleProps) {
  return (
    <main className="article-page people-article-page">
      <div className="breadcrumb">
        <a href={sitePath("/")}>首頁</a>
        <span>/</span>
        <a href={sitePath("/people")}>人與過港</a>
        <span>/</span>
        <span>故事 {story.storyNumber}</span>
      </div>

      <header className={`people-article-hero${story.heroImage ? "" : " people-article-hero-text-only"}`}>
        <div className="people-article-heading">
          <p className="eyebrow">INTERVIEW / {story.storyNumber}</p>
          <div className="people-article-identity">
            <strong>{story.name}</strong>
            {story.role ? <span>{story.role}</span> : null}
          </div>
          <h1><HeadingLines lines={story.titleLines} /></h1>
          {story.subtitleLines.length ? <p className="people-article-subtitle"><HeadingLines lines={story.subtitleLines} /></p> : null}
        </div>
        {story.heroImage ? <StoryFigure image={story.heroImage} className="people-article-hero-image" /> : null}
      </header>

      <article className="people-article-content">
        <div className="people-article-section people-article-opening">
          <div className="people-article-section-copy">
            <StoryBlocks blocks={story.introBlocks} />
          </div>
        </div>
        {story.sections.map((section, sectionIndex) => (
          <section className="people-article-section" key={section.heading}>
            <div className="people-article-section-marker" aria-hidden="true">
              {String(sectionIndex + 1).padStart(2, "0")}
            </div>
            <div className="people-article-section-copy">
              <h2>{section.heading}</h2>
              <StoryBlocks blocks={section.blocks} />
            </div>
            {section.image ? <StoryFigure image={section.image} className="people-article-inline-image" /> : null}
          </section>
        ))}
        <footer className="people-article-ending">
          <p className="people-article-ending-large"><HeadingLines lines={story.ending.largeLines} /></p>
          <p className="people-article-ending-small"><HeadingLines lines={story.ending.smallLines} /></p>
        </footer>
      </article>

      <nav className="article-navigation" aria-label="人物專訪導覽">
        <a href={sitePath(`/people/${previous.slug}`)}>← 上一篇人物</a>
        <a href={sitePath("/people")}>返回全部人物</a>
        <a href={sitePath(`/people/${next.slug}`)}>下一篇人物 →</a>
      </nav>
    </main>
  );
}
