"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { HeadingLines } from "./HeadingLines";

const PLACES = [
  {
    id: "river",
    label: "暖暖溪河岸",
    description: "過港的名稱源自早年的渡河往來。河岸與港口，留下地方最初的生活線索。",
    x: "18%",
    y: "73%",
  },
  {
    id: "settlement",
    label: "早期聚落",
    description: "民國 38 年後，新的居民在此落腳，宿舍、學校與日常生活逐漸形成聚落。",
    x: "35%",
    y: "31%",
  },
  {
    id: "market",
    label: "公有市場",
    description: "民國 56 年起，市場與公共設施陸續進駐，讓居民的生活機能更加完整。",
    x: "56%",
    y: "56%",
  },
  {
    id: "dormitory",
    label: "舊宿舍群",
    description: "軍警公教與公營單位宿舍曾是聚落的重要景觀，也承載許多家庭記憶。",
    x: "73%",
    y: "27%",
  },
  {
    id: "association",
    label: "社區發展協會",
    description: "協會於民國 82 年成立，居民開始以更有組織的方式回應地方生活與福利需求。",
    x: "79%",
    y: "58%",
  },
  {
    id: "care",
    label: "關懷據點",
    description: "社區照顧、樂齡學習與志工服務在此延續，讓地方行動成為日常的一部分。",
    x: "47%",
    y: "20%",
  },
] as const;

export function GuogangInteractiveMap() {
  const [activeId, setActiveId] = useState<(typeof PLACES)[number]["id"]>(PLACES[0].id);
  const activePlace = PLACES.find((place) => place.id === activeId) ?? PLACES[0];

  return (
    <section className="guogang-map-section" id="guogang-map" aria-labelledby="guogang-map-title">
      <header className="guogang-map-heading">
        <div>
          <p className="eyebrow">EXPLORE THE PLACE</p>
          <h2 id="guogang-map-title"><HeadingLines lines={["沿著河岸，", "看看過港的生活地景。"]} /></h2>
        </div>
        <p>將游標移到標記上，或使用點擊、觸控與鍵盤選取地點。這是一張依地方故事整理的非比例示意地圖。</p>
      </header>

      <div className="guogang-map-layout">
        <div className="guogang-map" aria-label="過港互動示意地圖">
          <div className="guogang-map-hills" aria-hidden="true" />
          <div className="guogang-map-road" aria-hidden="true" />
          <div className="guogang-map-river" aria-hidden="true"><span>暖暖溪</span></div>
          <div className="map-landmark map-landmark-school" aria-hidden="true"><span>學校</span></div>
          <div className="map-landmark map-landmark-market" aria-hidden="true"><span>市場</span></div>
          <div className="map-landmark map-landmark-homes" aria-hidden="true"><span>聚落</span></div>
          <div className="map-landmark map-landmark-community" aria-hidden="true"><span>社區</span></div>

          <div className="guogang-map-hotspots">
            {PLACES.map((place, index) => (
              <button
                className={place.id === activeId ? "map-hotspot is-active" : "map-hotspot"}
                style={{ "--marker-x": place.x, "--marker-y": place.y } as CSSProperties}
                type="button"
                key={place.id}
                onMouseEnter={() => setActiveId(place.id)}
                onFocus={() => setActiveId(place.id)}
                onClick={() => setActiveId(place.id)}
                aria-pressed={place.id === activeId}
                aria-label={`${place.label}：${place.description}`}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{place.label}</strong>
              </button>
            ))}
          </div>
        </div>

        <aside className="guogang-map-detail" aria-live="polite">
          <span>{String(PLACES.findIndex((place) => place.id === activeId) + 1).padStart(2, "0")}</span>
          <div>
            <p className="eyebrow">SELECTED PLACE</p>
            <h3>{activePlace.label}</h3>
            <p>{activePlace.description}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
