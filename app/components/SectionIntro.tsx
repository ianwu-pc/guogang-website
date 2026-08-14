type SectionIntroProps = {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
};

export function SectionIntro({ number, eyebrow, title, description, light = false }: SectionIntroProps) {
  return (
    <div className={`section-intro ${light ? "is-light" : ""}`}>
      <div className="section-number" aria-hidden="true">{number}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
      </div>
    </div>
  );
}
