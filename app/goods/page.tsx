import type { Metadata } from "next";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { LineAction } from "../components/LineAction";
import { PageIntro } from "../components/PageIntro";
import { ProductGallery } from "../components/ProductGallery";
import { GOODS } from "../data/site";
import { sitePath } from "../utils/sitePath";

export const metadata: Metadata = {
  title: "過港好味",
  description: "從過港的餐桌、廚房與一雙雙熟悉的手，認識可以分享的地方味道。",
};

export default function GoodsPage() {
  return (
    <main className="inner-page goods-page">
      <PageIntro index="03" title="過港好味" description="有些味道，原本就在過港的餐桌、廚房與生活裡，也慢慢成為屬於這個地方的味道。" vertical="TASTE OF GUOGANG" />

      <section className="goods-story-intro">
        <div>
          <p className="eyebrow">FROM EVERYDAY LIFE</p>
          <h2><span className="heading-line">過港的好味，</span><span className="heading-line">從日常開始。</span></h2>
        </div>
        <div>
          <p>過港的產品，來自居民熟悉的料理方式與生活經驗。有人負責備料，有人製作，也有人一起把一份份成品整理完成。</p>
          <p>這些看似平常的工作，把社區裡原本熟悉的味道，慢慢變成可以和更多人分享的過港好味。</p>
        </div>
        <ImagePlaceholder label="/images/goods/guogang-goods-collection.jpg" alt="過港好味五款商品合照" ratio="wide" tone="green" />
      </section>

      <header className="goods-catalog-intro">
        <div>
          <p className="eyebrow">GUOGANG GOODS</p>
          <h2><span className="heading-line">今天，</span><span className="heading-line">想帶哪一份過港</span><span className="heading-line">回家？</span></h2>
        </div>
        <p>商品名稱與正式商品照片已更新；詳細介紹與價格仍待社區確認。</p>
      </header>
      <section className="goods-catalog">
        {GOODS.map((good, index) => (
          <article className="catalog-item" key={good.id}>
            <ProductGallery images={[good.coverImage, ...good.galleryImages]} name={good.name} ratio="landscape" tone={index % 2 ? "ochre" : "clay"} />
            <div className="catalog-copy">
              <p className="eyebrow">GUOGANG GOODS / {String(index + 1).padStart(2, "0")}</p>
              <h2>{good.name}</h2>
              <p>{good.summary}</p>
              <div className="card-actions">
                <a className="text-link" href={sitePath(`/goods/${good.slug}`)}>查看這份好味 <span aria-hidden="true">→</span></a>
                <LineAction label="LINE 詢問" />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="goods-makers">
        <div>
          <p className="eyebrow">THE HANDS BEHIND THE TASTE</p>
          <h2><span className="heading-line">味道的背後，</span><span className="heading-line">是一雙雙熟悉的手。</span></h2>
          <p>每一份過港好味的背後，都有居民投入其中。從準備食材、製作到包裝，這些產品不只是地方的味道，也記錄著人們一起工作的日常。</p>
        </div>
        <ImagePlaceholder label="人物工作、製作過程與產品合照｜待提供" ratio="landscape" tone="paper" />
      </section>

      <section className="goods-small-batch">
        <p className="eyebrow light">SMALL BATCH / 慢慢做</p>
        <h2><span className="heading-line">慢慢做，</span><span className="heading-line">把每一份好味做好。</span></h2>
        <p>過港好味目前以社區小量製作為主，會依照實際產量與製作情況不定期開團。因此網站不提供固定庫存與線上結帳，最新商品與開團資訊會於 LINE 社群中公告。</p>
      </section>

      <section className="goods-order" aria-labelledby="goods-order-title">
        <header>
          <p className="eyebrow">HOW TO ORDER</p>
          <h2 id="goods-order-title">想把過港的味道帶回家？</h2>
        </header>
        <ol>
          <li><span>STEP 01</span><strong>加入過港 LINE 社群</strong></li>
          <li><span>STEP 02</span><strong>查看當期開團商品</strong></li>
          <li><span>STEP 03</span><strong>依社群公告方式接龍訂購</strong></li>
        </ol>
        <LineAction label="加入 LINE 看本期好味" />
      </section>

      <section className="goods-ending">
        <h2><span className="heading-line">一份味道，</span><span className="heading-line">也可以是認識地方</span><span className="heading-line">的開始。</span></h2>
        <p>如果想知道這些好味從什麼樣的地方而來，也歡迎再走進過港，認識生活在這裡的人與故事。</p>
        <div className="button-row">
          <a className="button button-primary" href={sitePath("/guogang")}>認識過港</a>
          <a className="button button-outline" href={sitePath("/people")}>人與過港</a>
        </div>
      </section>
    </main>
  );
}
