"use client";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { GUOGANG_MAP_LOCATIONS, MAP_READING_ROWS } from "../data/guogangMap";
import { sitePath } from "../utils/sitePath";
import { HeadingLines } from "./HeadingLines";

export function GuogangInteractiveMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; x: number; y: number; left: number; moved: boolean } | null>(null);
  const suppressActivationRef = useRef(false);
  const activeId = hoveredId ?? selectedId;
  const activeLocation = GUOGANG_MAP_LOCATIONS.find((item) => item.id === activeId);
  const selectLocation = (id: string, pan = false) => {
    setSelectedId(id || null);
    if (!pan || !id || !scrollRef.current) return;
    const location = GUOGANG_MAP_LOCATIONS.find((item) => item.id === id)!;
    const viewport = scrollRef.current;
    viewport.scrollTo({ left: (location.x + location.width / 2) / 100 * viewport.scrollWidth - viewport.clientWidth / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !scrollRef.current) return;
    suppressActivationRef.current = false;
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: scrollRef.current.scrollLeft, moved: false };
  };
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId || !scrollRef.current) return;
    const dx = event.clientX - drag.x;
    if (!drag.moved && Math.abs(event.clientY - drag.y) > Math.abs(dx) + 6) { dragRef.current = null; return; }
    if (Math.abs(dx) > 6 || drag.moved) {
      if (!drag.moved) event.currentTarget.setPointerCapture(event.pointerId);
      drag.moved = true; setIsDragging(true); setHoveredId(null);
      scrollRef.current.scrollLeft = drag.left - dx;
      event.preventDefault();
    }
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.id !== event.pointerId) return;
    suppressActivationRef.current = dragRef.current.moved;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null; setIsDragging(false);
  };
  return (
    <section className="guogang-map-section" id="guogang-map" aria-labelledby="guogang-map-title">
      <header className="guogang-map-heading">
        <div><p className="eyebrow">EXPLORE THE PLACE</p><h2 id="guogang-map-title"><HeadingLines lines={["沿著河岸，", "看看過港的生活地景。"]} /></h2></div>
        <p>一張可以慢慢閱讀的手繪地圖。移動滑鼠，看看過港的生活地景。</p>
      </header>
      <div className="guogang-map-toolbar">
        <label htmlFor="map-place-picker">地點索引</label>
        <select id="map-place-picker" value={selectedId ?? ""} onChange={(event) => selectLocation(event.target.value, true)}>
          <option value="">選擇地點</option>
          {MAP_READING_ROWS.map((row) => <optgroup key={row.id} label={row.label}>
            {GUOGANG_MAP_LOCATIONS.filter((location) => location.row === row.id).map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
          </optgroup>)}
        </select>
        <span className="map-pan-note">← 左右拖曳地圖 →</span>
      </div>
      <div className={`guogang-map-scroll${isDragging ? " is-dragging" : ""}`} ref={scrollRef}
        onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}
        onClickCapture={(event) => { if (suppressActivationRef.current) { event.preventDefault(); event.stopPropagation(); suppressActivationRef.current = false; } }}>
        <div className="guogang-handdrawn-map-canvas" role="group" aria-label="可探索的過港手繪生活地圖">
          <img className="guogang-map-base" src={sitePath("/images/guogang-map-2026/background.webp")} alt="手繪過港生活地圖，標示寧靜街、過港路與基隆河" draggable={false} width={2048} height={1152} />
          <div className="guogang-map-landmarks">
            {GUOGANG_MAP_LOCATIONS.map((location) => <button key={location.id} type="button" data-landmark={location.id}
              className={`guogang-map-landmark${location.id === activeId ? " is-active" : ""}`}
              style={{ left: `${location.x}%`, top: `${location.y}%`, width: `${location.width}%`, height: `${location.height}%` }}
              onPointerEnter={(event) => { if (event.pointerType !== "touch" && !isDragging) setHoveredId(location.id); }}
              onPointerLeave={() => setHoveredId(null)} onFocus={() => setHoveredId(location.id)} onBlur={() => setHoveredId(null)}
              onKeyDown={(event) => { if (event.key === "Escape") { setHoveredId(null); setSelectedId(null); } }}
              onClick={() => selectLocation(location.id)} aria-label={`查看${location.name}介紹`} aria-describedby={`map-label-${location.id}`} aria-controls="guogang-map-info" aria-expanded={location.id === activeId}>
              <img src={sitePath(`/images/guogang-map-2026/${location.id}.png`)} alt="" draggable={false} />
            </button>)}
          </div>
          <div className="guogang-map-labels">
            {GUOGANG_MAP_LOCATIONS.map((location) => <span key={location.id} id={`map-label-${location.id}`} data-label={location.id}
              className={`guogang-map-landmark-label${location.id === activeId ? " is-active" : ""}`}
              style={{ "--label-x": `${location.labelX}%`, "--label-y": `${location.labelY}%` } as CSSProperties}>{location.name}</span>)}
          </div>
        </div>
      </div>
      <p className="guogang-map-hint"><span>移動滑鼠，看看過港的生活地景。</span><span>在地圖上輕觸建築，閱讀地點註記。</span></p>
      <aside className="guogang-map-info" id="guogang-map-info" aria-live="polite">
        {activeLocation && <><p className="eyebrow">PLACE NOTE</p><h3>{activeLocation.name}</h3>{activeLocation.href && <a className="text-link" href={sitePath(activeLocation.href)}>{activeLocation.linkLabel}</a>}</>}
      </aside>
    </section>
  );
}
