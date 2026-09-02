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
  hotspot: { x: number; y: number; width: number; height: number };
  panel: { x: number; y: number; side: "left" | "right" };
};

// Coordinates are normalized against the 1706 × 960 source map, so the targets
// retain their position when the rendered image changes size.
const GUOGANG_MAP_LOCATIONS: MapLocation[] = [
  { id: "inoue", name: "井上園日本料理", kind: "餐飲空間", hotspot: { x: 3, y: 27, width: 12, height: 22 }, panel: { x: 16, y: 36, side: "right" } },
  { id: "manyueyuan", name: "滿越緣私房料理", kind: "餐飲空間", hotspot: { x: 18, y: 35, width: 12, height: 15 }, panel: { x: 31, y: 39, side: "right" } },
  { id: "shengguang", name: "過港聖光堂", kind: "宗教空間", hotspot: { x: 29, y: 25, width: 10, height: 24 }, panel: { x: 41, y: 28, side: "right" } },
  { id: "pasta-86", name: "過港86義大利麵", kind: "餐飲空間", hotspot: { x: 40, y: 34, width: 12, height: 16 }, panel: { x: 54, y: 36, side: "right" } },
  {
    id: "police-dormitory",
    name: "警察宿舍",
    kind: "宿舍建築",
    description: "警察與其他公家單位宿舍，曾是過港聚落生活的一部分。",
    hotspot: { x: 62, y: 11, width: 8, height: 20 },
    panel: { x: 60, y: 20, side: "left" },
  },
  {
    id: "breakfast-shop",
    name: "美食坊早餐店",
    kind: "早餐店",
    description: "黃淑惠守著美食坊的煎台二十五年，在清晨的早餐與問候裡，看著過港的孩子長大。",
    href: "/people/breakfast-shop-owner",
    linkLabel: "閱讀她的故事 →",
    hotspot: { x: 88, y: 11, width: 11, height: 15 },
    panel: { x: 87, y: 17, side: "left" },
  },
  {
    id: "association",
    name: "過港社區發展協會",
    kind: "社區組織",
    description: "居民參與地方事務與互相連結的重要平台。",
    href: "/about",
    linkLabel: "認識協會 →",
    hotspot: { x: 68, y: 46, width: 11, height: 14 },
    panel: { x: 65, y: 52, side: "left" },
  },
  { id: "wax-museum", name: "黃蠟石博物館", kind: "博物館", hotspot: { x: 84, y: 45, width: 10, height: 15 }, panel: { x: 82, y: 48, side: "left" } },
  { id: "zhongyu", name: "中漁新村", kind: "住宅聚落", hotspot: { x: 30, y: 59, width: 12, height: 14 }, panel: { x: 44, y: 64, side: "right" } },
  { id: "fude-temple", name: "過港福德宮", kind: "廟宇", hotspot: { x: 44, y: 57, width: 10, height: 17 }, panel: { x: 56, y: 67, side: "right" } },
  { id: "nuannuan-station", name: "暖暖火車站", kind: "鐵道車站", hotspot: { x: 82, y: 77, width: 17, height: 21 }, panel: { x: 80, y: 82, side: "left" } },
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
            <img src={sitePath("/images/guogang-handdrawn-map-background.png")} alt="手繪過港生活地圖，標示餐飲、宗教空間、社區發展協會、住宅聚落與暖暖火車站等地點" />
            <div className="guogang-map-landmarks" aria-hidden="true">
              {GUOGANG_MAP_LOCATIONS.map((location) => (
                <span
                  className={location.id === activeId ? "guogang-map-landmark is-active" : "guogang-map-landmark"}
                  key={location.id}
                  style={{
                    "--object-x": `${location.hotspot.x}%`,
                    "--object-y": `${location.hotspot.y}%`,
                    "--object-width": `${location.hotspot.width}%`,
                    "--object-height": `${location.hotspot.height}%`,
                  } as CSSProperties}
                >
                  <img src={sitePath(`/images/guogang-map-landmarks/${location.id}.png`)} alt="" />
                </span>
              ))}
            </div>
            <div className="guogang-map-hotspots">
              {GUOGANG_MAP_LOCATIONS.map((location) => {
                const isActive = location.id === activeId;
                return (
                  <button
                    className={isActive ? "map-hotspot is-active" : "map-hotspot"}
                    style={{
                      "--hotspot-x": `${location.hotspot.x}%`,
                      "--hotspot-y": `${location.hotspot.y}%`,
                      "--hotspot-width": `${location.hotspot.width}%`,
                      "--hotspot-height": `${location.hotspot.height}%`,
                    } as CSSProperties}
                    type="button"
                    key={location.id}
                    onMouseEnter={() => setHoveredId(location.id)}
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
                    aria-expanded={isActive}
                    aria-label={`查看${location.name}介紹`}
                  />
                );
              })}
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
