import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const ROUTES = ["/", "/about", "/companies", "/infrastructure", "/industries", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
