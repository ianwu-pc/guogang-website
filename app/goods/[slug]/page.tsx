import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LineAction } from "../../components/LineAction";
import { ProductGallery } from "../../components/ProductGallery";
import { GOODS } from "../../data/site";
import { sitePath } from "../../utils/sitePath";

type GoodPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: GoodPageProps): Promise<Metadata> {
  const { slug } = await params;
  const good = GOODS.find((item) => item.slug === slug);
  return { title: good?.name ?? "過港好物", description: good?.summary ?? "過港好物內容" };
}

export default async function GoodDetailPage({ params }: GoodPageProps) {
  const { slug } = await params;
  const good = GOODS.find((item) => item.slug === slug);
  if (!good) notFound();
  const index = GOODS.findIndex((item) => item.slug === slug);

  return (
    <main className="article-page good-detail-page">
      <div className="breadcrumb"><a href={sitePath("/")}>首頁</a><span>/</span><a href={sitePath("/goods")}>過港好物</a><span>/</span><span>{good.name}</span></div>
      <header className="good-detail-hero">
        <div className="good-title-block">
          <p className="eyebrow">GUOGANG GOODS / {String(index + 1).padStart(2, "0")}</p>
          <h1>{good.name}</h1>
          <p>{good.summary}</p>
          <LineAction label="詢問購買" />
        </div>
        <ProductGallery images={[good.coverImage, ...good.galleryImages]} name={good.name} ratio="portrait" tone="clay" />
      </header>
      <section className="article-body good-story-body">
        <aside><span>STORY</span><strong>好物與地方的關係</strong></aside>
        <div>
          <h2>一段簡短的好物故事</h2>
          <p>{good.story}</p>
          <p>正式產品資料到位後，這裡會保留最能說明味道、製作與過港關係的短文，不加入冗長規格。</p>
        </div>
      </section>
      <nav className="article-navigation" aria-label="好物文章導覽">
        <a href={sitePath("/goods")}>← 返回全部好物</a>
        <a href={sitePath(`/goods/${GOODS[(index + 1) % GOODS.length].slug}`)}>下一項好物 →</a>
      </nav>
    </main>
  );
}
