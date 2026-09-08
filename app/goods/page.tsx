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
      <PageIntro index="03" title="過港好味" description="有些味道，原本就在過港的日常裡。做著、吃著，慢慢也成了大家熟悉的滋味。" vertical="TASTE OF GUOGANG" />

      <section className="goods-story-intro">
        <div>
          <p className="eyebrow">FROM EVERYDAY LIFE</p>
          <h2><span className="heading-line">過港的好味，</span><span className="heading-line">從日常開始。</span></h2>
        </div>
        <div>
          <p>這些味道，原本就在過港的日常裡。有人備料、有人下鍋，從一次次共餐、活動和製作裡，慢慢成了現在會一起做、一起分享的東西。</p>
          <p>沒有太多花樣，就是把熟悉的味道好好做好。</p>
        </div>
        <ImagePlaceholder label="/images/goods/guogang-goods-collection.jpg" alt="過港好味五款商品合照" ratio="wide" tone="green" />
      </section>

      <header className="goods-catalog-intro">
        <div>
          <p className="eyebrow">GUOGANG GOODS</p>
          <h2><span className="heading-line">過港的好味，</span><span className="heading-line">從日常開始。</span></h2>
        </div>
        <p>每一次能訂購的品項、價格與數量，會隨當期製作安排而不同；最新資訊會公布在 LINE。</p>
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
          <p>這些產品，就在過港一次次的製作裡慢慢完成。做久了，也成了大家熟悉的味道。</p>
        </div>
        <ImagePlaceholder label="/images/people-drive/li/li-48.webp" alt="社區媽媽一起準備料理" ratio="landscape" tone="paper" />
      </section>

      <section className="goods-small-batch">
        <p className="eyebrow light">SMALL BATCH / 慢慢做</p>
        <h2><span className="heading-line">慢慢做，</span><span className="heading-line">把每一份好味做好。</span></h2>
        <p>過港的產品以小量製作為主。每次做什麼、做多少，會跟著當期的製作安排而不同，所以不一定隨時都有固定的品項與數量。有什麼，就把這次做好的分享出去；每一次能訂購的品項，也可能不太一樣。</p>
      </section>

      <section className="goods-order" aria-labelledby="goods-order-title">
        <header>
          <p className="eyebrow">HOW TO ORDER</p>
          <h2 id="goods-order-title">想把過港的味道帶回家？</h2>
        </header>
        <p>最新品項、價格與可訂購數量，都會公布在 LINE。看看這次做了什麼，再挑一份喜歡的帶回家。</p>
        <LineAction label="前往 LINE 查看最新訂購資訊" />
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
