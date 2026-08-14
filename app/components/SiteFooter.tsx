import { NAV_ITEMS, SITE_CONFIG } from "../data/site";
import { sitePath } from "../utils/sitePath";
import { LineAction } from "./LineAction";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p className="eyebrow light">KEEP THE STORY GOING</p>
        <h2>從一個地方的名字開始，<br />慢慢認識過港。</h2>
        <LineAction />
      </div>
      <div className="footer-grid">
        <div>
          <a className="footer-wordmark" href={sitePath("/")}>過港</a>
          <p>{SITE_CONFIG.associationName}</p>
        </div>
        <nav aria-label="頁尾導覽">
          {NAV_ITEMS.map((item) => <a href={sitePath(item.href)} key={item.href}>{item.label}</a>)}
        </nav>
        <address>
          <span>地址｜{SITE_CONFIG.address}</span>
          <span>電話｜{SITE_CONFIG.phone}</span>
          <span>Email｜{SITE_CONFIG.email}</span>
        </address>
        <div className="footer-social">
          <span>LINE｜連結待提供</span>
          <span>Facebook｜連結待提供</span>
          <span>Instagram｜連結待提供</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} 過港</span>
        <a href={sitePath("/about#site-info")}>網站資訊與隱私權｜內容待提供</a>
      </div>
    </footer>
  );
}
