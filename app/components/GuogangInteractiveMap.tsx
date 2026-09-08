"use client";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { GUOGANG_MAP_LOCATIONS, MAP_READING_ROWS } from "../data/guogangMap";
import { GUOGANG_MAP_DETAILS } from "../data/guogangMapDetails";
import mapCopy from "../data/guogangMapCopy.json";
import { sitePath } from "../utils/sitePath";
import { HeadingLines } from "./HeadingLines";

export function GuogangInteractiveMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; x: number; y: number; left: number; moved: boolean } | null>(null);
  const suppressActivationRef = useRef(false);
  // Hover controls elevation only; an explicit activation owns the persistent details.
  const activeLocation = GUOGANG_MAP_LOCATIONS.find((item) => item.id === selectedId);
  const details = activeLocation ? GUOGANG_MAP_DETAILS[activeLocation.id] : undefined;
  const placeCopy = mapCopy.places.find((place) => place.id === selectedId);
  const googleMapUrl = details ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.mapQuery)}` : "";
  const panToLocation = (id: string) => {
    if (!scrollRef.current) return;
    const viewport = scrollRef.current;
    const object = viewport.querySelector<HTMLElement>(`[data-landmark="${id}"]`);
    const label = viewport.querySelector<HTMLElement>(`[data-label="${id}"]`);
    if (!object || !label) return;
    const objectBounds = object.getBoundingClientRect(), labelBounds = label.getBoundingClientRect();
    const left = Math.min(objectBounds.left, labelBounds.left), right = Math.max(objectBounds.right, labelBounds.right);
    viewport.scrollTo({ left: viewport.scrollLeft + (left + right) / 2 - viewport.getBoundingClientRect().left - viewport.clientWidth / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const selectLocation = (id: string) => {
    if (!id) return;
    setSelectedId(id);
    panToLocation(id);
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
        <div><p className="eyebrow">EXPLORE THE PLACE</p><h2 id="guogang-map-title"><HeadingLines lines={mapCopy.intro.titleLines} /></h2></div>
        <div className="guogang-map-intro">{mapCopy.intro.paragraphs.map((lines, index) => <p key={index}>{lines.map((line) => <span className="map-copy-line" key={line}>{line}</span>)}</p>)}</div>
      </header>
      <div className="guogang-map-toolbar">
        <label htmlFor="map-place-picker">地點索引</label>
        <select id="map-place-picker" value={selectedId ?? ""} onChange={(event) => selectLocation(event.target.value)}>
          <option value="" disabled>選擇地點</option>
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
              className={`guogang-map-landmark${location.id === hoveredId ? " is-active" : ""}`}
              style={{ left: `${location.x}%`, top: `${location.y}%`, width: `${location.width}%`, height: `${location.height}%` }}
              onPointerEnter={(event) => { if (event.pointerType !== "touch" && !isDragging) setHoveredId(location.id); }}
              onPointerLeave={() => setHoveredId(null)} onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) panToLocation(location.id); }}
              onClick={() => selectLocation(location.id)} aria-label={`查看${location.name}介紹`} aria-describedby={`map-label-${location.id}`} aria-controls="guogang-map-info" aria-expanded={location.id === selectedId}>
              <img src={sitePath(`/images/guogang-map-2026/${location.id}.png`)} alt="" draggable={false} />
            </button>)}
          </div>
          <div className="guogang-map-labels">
            {GUOGANG_MAP_LOCATIONS.map((location) => <span key={location.id} id={`map-label-${location.id}`} data-label={location.id}
              data-placement={location.row === "lower" && location.id !== "nuanjiang-walkway" ? "below" : "above"}
              className={`guogang-map-landmark-label${location.id === (hoveredId ?? selectedId) ? " is-active" : ""}`}
              style={{ "--label-x": `${location.labelX}%`, "--label-y": `${location.labelY}%` } as CSSProperties}>{location.name}</span>)}
          </div>
        </div>
      </div>
      <p className="guogang-map-hint"><span>移動滑鼠，看看過港的生活地景。</span><span>在地圖上輕觸建築，閱讀地點註記。</span></p>
      <aside className="guogang-map-info" id="guogang-map-info" aria-label="地點介紹" hidden={!activeLocation}>
        {activeLocation && details && placeCopy && <div className="guogang-map-place">
          <div className="guogang-map-place-copy" aria-live="polite" aria-atomic="true">
            <div className="guogang-map-place-heading">
              <img src={sitePath(`/images/guogang-map-2026/${activeLocation.id}.png`)} alt="" width={108} height={104} />
              <div><p className="eyebrow">地方筆記 / PLACE NOTE</p><h3>{activeLocation.name}</h3></div>
            </div>
            <div className="guogang-map-place-text">{placeCopy.paragraphs.map((lines, index) => <p key={index}>{lines.map((line) => <span className="map-copy-line" key={line}>{line}</span>)}</p>)}</div>
            <address className="guogang-map-address">{details.address}</address>
            {activeLocation.href && <div className="guogang-map-place-links"><a className="text-link" href={sitePath(activeLocation.href)}>{activeLocation.linkLabel}</a></div>}
            <p className="guogang-map-source">地點資料：<a href={details.source.href.startsWith("/") ? sitePath(details.source.href) : details.source.href} target={details.source.href.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer">{details.source.label}</a></p>
          </div>
          <div className="guogang-map-google">
            <iframe key={activeLocation.id} title={`${activeLocation.name} Google 地圖${details.mapNote ? "（周邊位置）" : ""}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(details.mapQuery)}&output=embed&hl=zh-TW&z=17`}
              loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            <a className="text-link" href={googleMapUrl} target="_blank" rel="noopener noreferrer">在 Google 地圖中開啟 <span aria-hidden="true">↗</span></a>
            {details.mapNote && <p className="guogang-map-google-note">{details.mapNote}</p>}
          </div>
        </div>}
      </aside>
    </section>
  );
}
