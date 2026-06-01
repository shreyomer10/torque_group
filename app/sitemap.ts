import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { galleryOrder } from "@/content";

const ROUTES = [
  "/", "/about", "/companies", "/infrastructure", "/industries", "/contact",
  ...galleryOrder.map((loc) => `/infrastructure/gallery/${loc}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
