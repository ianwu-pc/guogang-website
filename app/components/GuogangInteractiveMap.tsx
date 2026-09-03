"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useRef, useState } from "react";
import { sitePath } from "../utils/sitePath";
import { HeadingLines } from "./HeadingLines";

type MapLocation = {
  id: string;
  name: string;
  kind: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  stamp: string;
  position: { x: number; y: number; width: number };
  label?: "above" | "below" | "on";
  panel: { x: number; y: number; side: "left" | "right" };
};

// Coordinates are normalized against the supplied 1672 × 941 hand-drawn map.
// The stamps sit in the nearby paper space, leaving the map's own names, roads
// and river visible while keeping each illustration as the interactive target.
const GUOGANG_MAP_LOCATIONS: MapLocation[] = [
  { id: "shengguang-church", name: "過港聖光堂", kind: "宗教空間", description: "過港路邊的教堂建築。", stamp: "shengguang-church", position: { x: 7, y: 30, width: 12.6 }, label: "above", panel: { x: 14, y: 26, side: "right" } },
  { id: "guogang-pasta", name: "過港義大利麵", kind: "餐飲空間", description: "過港路上的餐飲地點。", stamp: "guogang-pasta", position: { x: 20.5, y: 30, width: 12.6 }, label: "above", panel: { x: 27, y: 27, side: "right" } },
  {
    id: "little-couple-store",
    name: "小倆口柑仔店",
    kind: "在地商店",
    description: "位在寧靜街上的在地商店。",
    stamp: "little-couple-store",
    position: { x: 92, y: 29, width: 12.6 },
    label: "above",
    panel: { x: 89, y: 20, side: "left" },
  },
  { id: "guogang-post-office", name: "基隆過港路郵局", kind: "郵政服務", description: "服務過港居民的郵政據點。", stamp: "guogang-post-office", position: { x: 45, y: 38, width: 12.6 }, label: "above", panel: { x: 53, y: 37, side: "right" } },
  {
    id: "community-association",
    name: "過港社區發展協會",
    kind: "社區組織",
    description: "居民參與地方事務與互相連結的重要平台。",
    href: "/about",
    linkLabel: "認識協會 →",
    stamp: "community-association",
    position: { x: 60, y: 44, width: 12.6 },
    label: "above",
    panel: { x: 64, y: 43, side: "right" },
  },
  { id: "wax-culture-hall", name: "黃蠟石文化館", kind: "文化空間", description: "收藏與展示黃蠟石文化的地方。", stamp: "wax-culture-hall", position: { x: 74, y: 44, width: 12.6 }, label: "above", panel: { x: 70, y: 45, side: "left" } },
  { id: "fude-temple", name: "暖暖過港福德宮", kind: "信仰空間", description: "過港的信仰空間。", stamp: "fude-temple", position: { x: 13, y: 54, width: 12.6 }, label: "below", panel: { x: 19, y: 55, side: "right" } },
  { id: "nuan-new-immigrant-hall", name: "暖新住民會館", kind: "交流空間", description: "提供新住民交流與服務的空間。", stamp: "nuan-new-immigrant-hall", position: { x: 31, y: 56, width: 12.6 }, label: "below", panel: { x: 38, y: 48, side: "right" } },
  { id: "nuanjiang-bridge", name: "暖江橋", kind: "河岸地標", description: "跨越基隆河、連接兩岸的橋梁。", stamp: "nuanjiang-bridge", position: { x: 71, y: 76, width: 14.5 }, label: "below", panel: { x: 67, y: 72, side: "left" } },
  { id: "nuannuan-station", name: "暖暖車站", kind: "鐵道車站", description: "過港一帶往返外地的鐵道車站。", stamp: "nuannuan-station", position: { x: 87, y: 90, width: 13.65 }, label: "below", panel: { x: 83, y: 80, side: "left" } },
];

export function GuogangInteractiveMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [touchSelectedId, setTouchSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const mapScrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startScrollLeft: number; hasMoved: boolean } | null>(null);
  const suppressActivationRef = useRef(false);
  const activeId = touchSelectedId ?? hoveredId;
  const activeLocation = GUOGANG_MAP_LOCATIONS.find((location) => location.id === activeId);
  const isTouchInteraction = () => window.matchMedia("(hover: none), (pointer: coarse)").matches;

  const beginMapDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const mapScroll = mapScrollRef.current;
    if (!mapScroll) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: mapScroll.scrollLeft,
      hasMoved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const dragMap = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const mapScroll = mapScrollRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !mapScroll) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 3) {
      drag.hasMoved = true;
      setIsDragging(true);
      mapScroll.scrollLeft = drag.startScrollLeft - distance;
      event.preventDefault();
    }
  };

  const endMapDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    suppressActivationRef.current = drag.hasMoved;
    dragRef.current = null;
    setIsDragging(false);
  };

  return (
    <section className="guogang-map-section" id="guogang-map" aria-labelledby="guogang-map-title">
      <header className="guogang-map-heading">
        <div>
          <p className="eyebrow">EXPLORE THE PLACE</p>
          <h2 id="guogang-map-title"><HeadingLines lines={["沿著河岸，", "看看過港的生活地景。"]} /></h2>
        </div>
        <p>一張可以慢慢閱讀的手繪地圖。移動滑鼠，看看過港的生活地景。</p>
      </header>

      <div className="guogang-map-explorer">
        <div
          className={isDragging ? "guogang-map-scroll is-dragging" : "guogang-map-scroll"}
          ref={mapScrollRef}
          aria-label="可拖曳瀏覽的過港手繪生活地圖"
          onPointerDown={beginMapDrag}
          onPointerMove={dragMap}
          onPointerUp={endMapDrag}
          onPointerCancel={endMapDrag}
        >
          <div
            className="guogang-handdrawn-map-canvas"
            role="group"
            aria-label="可探索的過港手繪生活地圖"
            onClick={() => {
              if (isTouchInteraction()) setTouchSelectedId(null);
            }}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img src={sitePath("/images/guogang-landscape-map-landmarks-cleared.png")} alt="手繪過港生活地圖，標示過港路、寧靜街、基隆河與源遠路" />
            <div className="guogang-map-landmarks">
              {GUOGANG_MAP_LOCATIONS.map((location) => (
                <button
                  className={`guogang-map-landmark guogang-map-landmark--${location.id}${location.id === activeId ? " is-active" : ""}${location.label ? ` has-label-${location.label}` : ""}`}
                  key={location.id}
                  style={{
                    "--object-x": `${location.position.x}%`,
                    "--object-y": `${location.position.y}%`,
                    "--object-width": `${location.position.width}%`,
                  } as CSSProperties}
                  type="button"
                  onMouseEnter={() => setHoveredId(location.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(location.id)}
                  onBlur={() => setHoveredId(null)}
                  onClick={(event) => {
                    if (suppressActivationRef.current) {
                      suppressActivationRef.current = false;
                      event.preventDefault();
                      event.stopPropagation();
                      return;
                    }
                    event.stopPropagation();
                    if (isTouchInteraction()) setTouchSelectedId(location.id);
                  }}
                  aria-controls="guogang-map-info"
                  aria-expanded={location.id === activeId}
                  aria-label={`查看${location.name}介紹`}
                >
                  <img src={sitePath(`/images/guogang-map-stamps/${location.stamp}.png`)} alt="" />
                  {location.label ? <span className="guogang-map-landmark-label" aria-hidden="true">{location.name}</span> : null}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="guogang-map-hint"><span>移動滑鼠，看看過港的生活地景。</span><span>在地圖上輕觸建築，閱讀地點註記。</span></p>

        {activeLocation ? (
          <aside
            className={`guogang-map-info guogang-map-info--${activeLocation.panel.side}`}
            id="guogang-map-info"
            aria-live="polite"
            style={{ "--panel-x": `${activeLocation.panel.x}%`, "--panel-y": `${activeLocation.panel.y}%` } as CSSProperties}
          >
            <p className="eyebrow">PLACE NOTE</p>
            <h3>{activeLocation.name}</h3>
            <p className="guogang-map-info-kind">{activeLocation.kind}</p>
            {activeLocation.description ? <p className="guogang-map-info-description">{activeLocation.description}</p> : null}
            {activeLocation.href && activeLocation.linkLabel ? <a href={sitePath(activeLocation.href)}>{activeLocation.linkLabel}</a> : null}
          </aside>
        ) : null}
      </div>
    </section>
  );
}
