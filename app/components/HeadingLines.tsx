type HeadingLinesProps = { lines: readonly string[] };
// Break opportunities follow phrases. Joined characters always equal the source line.
const PHRASES: Record<string, readonly string[]> = {
  "藏在每個人的日常裡。": ["藏在每個人的", "日常裡。"],
  "藏在生活於這裡的人身上。": ["藏在生活於這裡的", "人身上。"],
  "也被一雙雙手做成了味道。": ["也被一雙雙手", "做成了味道。"],
  "也歡迎把這份味道帶回家。": ["也歡迎把這份", "味道帶回家。"],
  "六種與過港產生關係的方式。": ["六種與過港", "產生關係的方式。"],
  "過港不是一個突然出現的名字，": ["過港不是一個", "突然出現的名字，"],
  "而是被河流、移居與日常慢慢寫下的地方。": ["而是被河流、", "移居與日常", "慢慢寫下的地方。"],
  "從一個地方的名字開始，": ["從一個地方的", "名字開始，"],
};
export function HeadingLines({ lines }: HeadingLinesProps) {
  return <>{lines.map((line, index) => <span className="heading-line" key={`${index}-${line}`}>
    {PHRASES[line] ? PHRASES[line].map((phrase) => <span className="heading-unit" key={phrase}>{phrase}</span>) : line}
  </span>)}</>;
}
