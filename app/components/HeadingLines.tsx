type HeadingLinesProps = {
  lines: readonly string[];
};

export function HeadingLines({ lines }: HeadingLinesProps) {
  return (
    <>
      {lines.map((line, index) => (
        <span className="heading-line" key={`${index}-${line}`}>
          {line}
        </span>
      ))}
    </>
  );
}
