type PageIntroProps = {
  index: string;
  title: string;
  description: string;
  vertical?: string;
};

export function PageIntro({ index, title, description, vertical = "LOCAL ARCHIVE" }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="page-intro-index">{index}</div>
      <div className="page-intro-copy">
        <p className="eyebrow">GUOGANG / 過港</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <p className="vertical-note">{vertical}</p>
    </section>
  );
}
