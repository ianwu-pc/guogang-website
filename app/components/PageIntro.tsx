import { sitePath } from "../utils/sitePath";

type PageIntroProps = {
  index: string;
  title: string;
  description: string;
  vertical?: string;
};

const PAGE_INTRO_VISUALS: Record<
  string,
  {
    index: string;
    image: string;
    position?: string;
  }
> = {
  認識過港: {
    index: "01",
    image: "/images/認識過港.jpg",
    position: "center center",
  },
  人與過港: {
    index: "02",
    image: "/images/過港人物.jpg",
    position: "68% center",
  },
  過港好味: {
    index: "03",
    image: "/images/過港好味.jpg",
    position: "68% center",
  },
  關於我們: {
    index: "04",
    image: "/images/關於我們.jpg",
    position: "center center",
  },
};

export function PageIntro({
  index,
  title,
  description,
  vertical = "LOCAL ARCHIVE",
}: PageIntroProps) {
  const visual = PAGE_INTRO_VISUALS[title];

  return (
    <section
      className={`page-intro${visual ? " page-intro-photo" : ""}`}
      style={
        visual
          ? {
              position: "relative",
              width: "100%",
              maxWidth: "none",
              minHeight: "100svh",
              overflow: "hidden",
              isolation: "isolate",
              borderBottom: 0,
              color: "var(--paper)",
            }
          : undefined
      }
    >
      {visual ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -2,
          }}
        >
          <img
            src={sitePath(visual.image)}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
              objectPosition: visual.position,
            }}
          />

          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "block",
              background:
                "linear-gradient(90deg, rgba(8, 17, 13, 0.8) 0%, rgba(8, 17, 13, 0.5) 52%, rgba(8, 17, 13, 0.3) 100%)",
            }}
          />
        </div>
      ) : null}

      <div
        className="page-intro-index"
        style={visual ? { color: "rgba(248, 243, 231, 0.88)" } : undefined}
      >
        {visual?.index ?? index}
      </div>

      <div className="page-intro-copy">
        <p className="eyebrow">GUOGANG / 過港</p>

        <h1 style={visual ? { color: "inherit" } : undefined}>{title}</h1>

        <p
          style={
            visual ? { color: "rgba(248, 243, 231, 0.88)" } : undefined
          }
        >
          {description}
        </p>
      </div>

      <p
        className="vertical-note"
        style={visual ? { color: "rgba(248, 243, 231, 0.78)" } : undefined}
      >
        {vertical}
      </p>
    </section>
  );
}
