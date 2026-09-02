import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = APP_URL.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified },
    {
      url: `${base}/tools/calendario-dian`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/tools/simulador-sanciones`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}