import type { NextConfig } from "next";

const repositoryPath = process.env.GITHUB_REPOSITORY ?? "";
const [repositoryOwner = "", repositoryName = ""] = repositoryPath.split("/");
const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

const inferredBasePath =
  repositoryName && repositoryName.toLowerCase() !== `${repositoryOwner.toLowerCase()}.github.io`
    ? `/${repositoryName}`
    : "";

const basePath = isGitHubPagesBuild
  ? (process.env.PAGES_BASE_PATH ?? inferredBasePath).replace(/\/$/, "")
  : "";

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath,
  trailingSlash: isGitHubPagesBuild,
  env: {
    NEXT_PUBLIC_SITE_BASE_PATH: basePath,
  },
};

export default nextConfig;
