import { sitePath } from "../utils/sitePath";

type PageIntroProps = { index: string; title: string; description: string; vertical?: string; hideIndex?: boolean };
const VISUALS: Record<string, { index: string; image: string; alt: string }> = {
  認識過港: { index: "01", image: "認識過港.jpg", alt: "過港河岸的地景" },
  人與過港: { index: "02", image: "過港人物.jpg", alt: "生活在過港的人們" },
  過港好味: { index: "03", image: "過港好味.jpg", alt: "過港社區的手作好味" },
  關於我們: { index: "04", image: "關於我們.jpg", alt: "過港社區的建築入口" },
};
export function PageIntro({ index, title, description, vertical = "LOCAL ARCHIVE", hideIndex = false }: PageIntroProps) {
  const visual = VISUALS[title];
  return (
    <section className={`page-intro${visual ? " page-intro-photo" : ""}`}>
      <header className="page-intro-copy">
        <p className="eyebrow">GUOGANG / 過港</p>
        <div className="page-intro-title"><h1>{title}</h1>{!hideIndex && <span className="page-intro-index">{visual?.index ?? index}</span>}</div>
        <p className="page-intro-description">{description}</p>
      </header>
      {visual && <figure className="page-intro-image">
        <img src={sitePath(`/images/${visual.image}`)} alt={visual.alt} fetchPriority="high" />
        <figcaption>{vertical}</figcaption>
      </figure>}
      <a className="page-intro-cue" href="#page-story" aria-label={`繼續閱讀${title}`}><span aria-hidden="true">↓</span></a>
    </section>
  );
}
