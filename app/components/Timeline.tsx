import { ImagePlaceholder } from "./ImagePlaceholder";

export type TimelineEntry = {
  year: string;
  title: string;
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
      {entries.map((entry, index) => (
        <li key={`${entry.year}-${entry.title}`}>
          <span className="timeline-dot" aria-hidden="true" />
          <div className="timeline-year">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{entry.year}</strong>
            {entry.status ? <small>{entry.status}</small> : null}
          </div>
          <article className="timeline-card">
            <div>
              <h2>{entry.title}</h2>
              <p>{entry.description}</p>
            </div>
            {entry.image ? (
              <ImagePlaceholder label={entry.image} alt={entry.imageAlt ?? entry.title} ratio="landscape" tone={index % 2 ? "ochre" : "paper"} />
            ) : null}
          </article>
        </li>
      ))}
    </ol>
  );
}
