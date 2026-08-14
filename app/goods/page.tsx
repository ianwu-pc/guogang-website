import type { Metadata } from "next";
import { LineAction } from "../components/LineAction";
import { PageIntro } from "../components/PageIntro";
import { ProductGallery } from "../components/ProductGallery";
import { GOODS } from "../data/site";
import { sitePath } from "../utils/sitePath";

export const metadata: Metadata = {
  title: "過港好物",
  description: "從地方的味道、材料與雙手，認識過港的生活。",
};

export default function GoodsPage() {
  return (
    <main className="inner-page">
      <PageIntro index="01" title="過港好物" description="從地方的味道、材料與雙手，認識過港的生活。" vertical="GOODS / HANDS / FLAVOR" />
      <section className="goods-catalog-intro">
        <p>每件好物以一段簡短故事與可切換的多張照片呈現。正式產品文字與影像到位後，只需替換內容，不會再變成繁複的規格表。</p>
        <span>第一輯 / 01—06</span>
      </section>
      <section className="goods-catalog">
        {GOODS.map((good, index) => (
          <article className="catalog-item" key={good.id}>
            <ProductGallery
              images={[good.coverImage, ...good.galleryImages]}
              name={good.name}
              ratio={index % 3 === 0 ? "landscape" : "portrait"}
              tone={index % 2 ? "ochre" : "clay"}
            />
            <div className="catalog-copy">
              <p className="eyebrow">GUOGANG GOODS</p>
              <h2>{good.name}</h2>
              <p>{good.summary}</p>
              <div className="card-actions">
                <a className="text-link" href={sitePath(`/goods/${good.slug}`)}>閱讀產品故事 <span aria-hidden="true">↗</span></a>
                <LineAction label="LINE 詢問" />
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
