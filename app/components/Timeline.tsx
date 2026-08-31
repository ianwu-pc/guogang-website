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

        return (
          <li key={`${entry.year}-${title}`}>
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-year">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{entry.year}</strong>
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
