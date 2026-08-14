"use client";

import { useState } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";

type ProductGalleryProps = {
  images: string[];
  name: string;
  tone?: "green" | "clay" | "ochre" | "paper";
  ratio?: "wide" | "landscape" | "portrait" | "square" | "map";
};

export function ProductGallery({ images, name, tone = "clay", ratio = "landscape" }: ProductGalleryProps) {
  const availableImages = images.length ? images : [`${name}照片｜待提供`];
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + availableImages.length) % availableImages.length);
  };

  return (
    <div
      className="product-gallery"
      aria-label={`${name}照片，共 ${availableImages.length} 張`}
    >
      <div className="product-gallery-main" aria-live="polite">
        <ImagePlaceholder
          key={`${name}-${activeIndex}`}
          label={availableImages[activeIndex]}
          alt={`${name}照片 ${activeIndex + 1}`}
          ratio={ratio}
          tone={tone}
        />
        {availableImages.length > 1 ? (
          <>
            <button
              className="product-gallery-arrow product-gallery-arrow-prev"
              type="button"
              onClick={() => move(-1)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") move(-1);
                if (event.key === "ArrowRight") move(1);
              }}
              aria-label={`查看${name}上一張照片`}
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              className="product-gallery-arrow product-gallery-arrow-next"
              type="button"
              onClick={() => move(1)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") move(-1);
                if (event.key === "ArrowRight") move(1);
              }}
              aria-label={`查看${name}下一張照片`}
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        ) : null}
        <span className="sr-only">目前顯示第 {activeIndex + 1} 張，共 {availableImages.length} 張</span>
      </div>
    </div>
  );
}
