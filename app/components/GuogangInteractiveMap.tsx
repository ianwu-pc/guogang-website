import { ImagePlaceholder } from "./ImagePlaceholder";

const MAP_CATEGORIES = ["景點", "美食", "社區地標"];

export function GuogangInteractiveMap() {
  return (
    <section className="guogang-map-section" id="guogang-map" aria-labelledby="guogang-map-title">
      <header className="guogang-map-heading">
        <div>
          <p className="eyebrow">EXPLORE GUOGANG</p>
          <h2 id="guogang-map-title">沿著生活的路，<br />走進今天的過港。</h2>
        </div>
        <p>時間留下故事，也把痕跡留在今天的街坊裡。從河岸、老建築到居民熟悉的小店，走一趟過港，也能用另一種方式認識這個地方。</p>
      </header>

      <div className="guogang-map-pending">
        <ImagePlaceholder label="過港散策互動地圖｜地點名單待確認" ratio="map" tone="paper" />
        <aside aria-label="未來地圖內容分類">
          <p className="eyebrow light">MAP CONTENT / 待補</p>
          <h3>地點名單確認後，將在這裡建立完整散策路線。</h3>
          <ul>
            {MAP_CATEGORIES.map((category, index) => (
              <li key={category}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{category}</strong>
                <small>地點待確認</small>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
