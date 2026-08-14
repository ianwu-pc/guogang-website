"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE_CONFIG } from "../data/site";
import { sitePath, stripSiteBasePath } from "../utils/sitePath";
import { LineAction } from "./LineAction";

export function SiteHeader() {
  const [pathname, setPathname] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setPathname(stripSiteBasePath(window.location.pathname));
    const updateHeader = () => setScrolled(window.scrollY > 32);
    const updatePath = () => setPathname(stripSiteBasePath(window.location.pathname));
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("popstate", updatePath);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("popstate", updatePath);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <div className="header-inner">
        <a className="wordmark" href={sitePath("/")} aria-label="過港首頁">
          {SITE_CONFIG.logoImage ? (
            <img src={sitePath(SITE_CONFIG.logoImage)} alt="過港" />
          ) : (
            <><span>過港</span><small>GUOGANG</small></>
          )}
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "關閉選單" : "開啟選單"}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav id="primary-navigation" className="primary-navigation" aria-label="主要導覽">
          <ul>
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <a
                    className={active ? "is-active" : ""}
                    href={sitePath(item.href)}
                    aria-current={active ? "page" : undefined}
                    onClick={() => {
                      setPathname(item.href);
                      setMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <LineAction className="button button-line header-line-button" />
        </nav>
      </div>
    </header>
  );
}
