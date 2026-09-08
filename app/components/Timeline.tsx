import { ImagePlaceholder } from "./ImagePlaceholder";
import { HeadingLines } from "./HeadingLines";

export type TimelineEntry = {
  year: string;
  titleLines: readonly string[];
  description: string;
  image?: string;
  imageAlt?: string;
  status?: string;
};

type TimelineProps = {
  entries: TimelineEntry[];
  label: string;
};

export function Timeline({ entries, label }: TimelineProps) {
  return (
    <ol className="history-timeline" aria-label={label}>
      {entries.map((entry, index) => {
        const title = entry.titleLines.join("");
        const [period, equivalentYear] = entry.year.split(/(?=（)/);

        return (
          <li key={`${entry.year}-${title}`}>
            <span className="timeline-dot" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className="timeline-year">
              <strong><span>{period}</span>{equivalentYear ? <span className="timeline-year-equivalent">{equivalentYear}</span> : null}</strong>
              {entry.status ? <small>{entry.status}</small> : null}
            </div>
            <article className="timeline-card">
              <div>
                <h2><HeadingLines lines={entry.titleLines} /></h2>
                <p>{entry.description}</p>
              </div>
              {entry.image ? (
                <ImagePlaceholder label={entry.image} alt={entry.imageAlt ?? title} ratio="landscape" tone={index % 2 ? "ochre" : "paper"} />
              ) : null}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
