import { sitePath } from "../utils/sitePath";

type ImagePlaceholderProps = {
  label: string;
  ratio?: "wide" | "landscape" | "portrait" | "square" | "map";
  tone?: "green" | "clay" | "ochre" | "paper";
  className?: string;
  alt?: string;
};

export function ImagePlaceholder({
  label,
  ratio = "landscape",
  tone = "paper",
  className = "",
  alt,
}: ImagePlaceholderProps) {
  const isImageSource = label.startsWith("/") || /^https?:\/\//.test(label);

  if (isImageSource) {
    return (
      <div className={`image-placeholder ratio-${ratio} has-image ${className}`.trim()}>
        <img src={sitePath(label)} alt={alt ?? "過港影像"} />
      </div>
    );
  }

  return (
    <div
      className={`image-placeholder ratio-${ratio} tone-${tone} ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      <span className="placeholder-mark" aria-hidden="true" />
      <span className="placeholder-label">{label}</span>
      <span className="placeholder-corner" aria-hidden="true">
        IMAGE / 待提供
      </span>
    </div>
  );
}
