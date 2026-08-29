"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE_CONFIG } from "../data/site";
import { sitePath, stripSiteBasePath } from "../utils/sitePath";
import { LineAction } from "./LineAction";

export function SiteHeader() {
  const [pathname, setPathname] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overPagePhoto, setOverPagePhoto] = useState(false);

  useEffect(() => {
    setPathname(stripSiteBasePath(window.location.pathname));

    const updateHeader = () => {
      const pagePhoto =
        document.querySelector<HTMLElement>(".page-intro-photo");

      const story = document.querySelector<HTMLElement>(
        ".scroll-story, .scroll-story-static",
      );

      const visualSection = pagePhoto ?? story;
      const headerHeight = window.innerWidth <= 760 ? 70 : 82;

      const photoIsBehindHeader =
        pagePhoto !== null &&
        pagePhoto.getBoundingClientRect().bottom > headerHeight;

      setOverPagePhoto(photoIsBehindHeader);

      setScrolled(
        visualSection
          ? visualSection.getBoundingClientRect().bottom <= headerHeight
          : window.scrollY > 32,
      );
    };

    const updatePath = () => {
      setPathname(stripSiteBasePath(window.location.pathname));
      updateHeader();
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    window.addEventListener("popstate", updatePath);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
      window.removeEventListener("popstate", updatePath);
    };
  }, []);

  return (
    <>
      <style>{`
        .inner-page:has(> .page-intro-photo) {
          padding-top: 0;
        }
      `}</style>

      <header
        className={`site-header ${scrolled ? "is-scrolled" : ""} ${
          menuOpen ? "menu-open" : ""
        }`}
        style={
          overPagePhoto && !menuOpen
            ? { color: "var(--paper)" }
            : undefined
        }
      >
        <div className="header-inner">
          <a
            className="wordmark"
            href={sitePath("/")}
            aria-label="過港首頁"
          >
            {SITE_CONFIG.logoImage ? (
              <img src={sitePath(SITE_CONFIG.logoImage)} alt="過港" />
            ) : (
              <>
                <span>過港</span>
                <small>GUOGANG</small>
              </>
            )}
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? "關閉選單" : "開啟選單"}
            </span>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <nav
            id="primary-navigation"
            className="primary-navigation"
            aria-label="主要導覽"
          >
            <ul>
              {NAV_ITEMS.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

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
    </>
  );
}
