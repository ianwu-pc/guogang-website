export const SITE_BASE_PATH = (process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "").replace(/\/$/, "");

export function sitePath(path: string) {
  if (!SITE_BASE_PATH || !path.startsWith("/") || path.startsWith("//")) return path;
  return path === "/" ? `${SITE_BASE_PATH}/` : `${SITE_BASE_PATH}${path}`;
}

export function stripSiteBasePath(pathname: string) {
  if (!SITE_BASE_PATH) return pathname;
  if (pathname === SITE_BASE_PATH || pathname === `${SITE_BASE_PATH}/`) return "/";
  return pathname.startsWith(`${SITE_BASE_PATH}/`) ? pathname.slice(SITE_BASE_PATH.length) : pathname;
}
