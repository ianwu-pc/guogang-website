"use client";

import { useEffect, useId, useState } from "react";
import { SITE_CONFIG } from "../data/site";

type LineActionProps = {
  label?: string;
  className?: string;
};

export function LineAction({
  label = "加入 LINE",
  className = "button button-line",
}: LineActionProps) {
  const noticeId = useId();
  const [noticeVisible, setNoticeVisible] = useState(false);

  useEffect(() => {
    if (!noticeVisible) return;
    const timer = window.setTimeout(() => setNoticeVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, [noticeVisible]);

  if (SITE_CONFIG.lineUrl) {
    return (
      <a className={className} href={SITE_CONFIG.lineUrl} target="_blank" rel="noreferrer">
        {label}
      </a>
    );
  }

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => setNoticeVisible(true)}
        aria-describedby={noticeVisible ? noticeId : undefined}
      >
        {label}
      </button>
      <span
        id={noticeId}
        className={`line-notice ${noticeVisible ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        LINE 連結即將提供
      </span>
    </>
  );
}
