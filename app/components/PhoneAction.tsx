import { SITE_CONFIG } from "../data/site";

const phoneHref = `tel:${SITE_CONFIG.phone.replace(/-/g, "")}`;

export function PhoneAction({ className = "button button-phone" }: { className?: string }) {
  return <a className={className} href={phoneHref}>電話洽詢</a>;
}

export function PhoneContact() {
  return <div className="phone-contact">
    <p>如欲訂購或了解更多，歡迎來電洽詢過港社區發展協會。</p>
    <p><a href={phoneHref}>{SITE_CONFIG.phone}</a></p>
  </div>;
}
