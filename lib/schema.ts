import { brand, companies, companyOrder } from "@/content";
import { siteUrl } from "./seo";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: brand.name,
    alternateName: ["Torque", "Torque Group Companies", "Torque Technics"],
    url: siteUrl,
    logo: `${siteUrl}/images/home/torquegrp.jpeg`,
    image: `${siteUrl}/images/home/torquegrp.jpeg`,
    description:
      "Maritime engineering holding group operating marine pump manufacturing, valve engineering, technical training, hydraulic repair and IMO safety systems across India and Germany since 1998.",
    sameAs: companyOrder.map((id) => companies[id].website),
    foundingDate: String(brand.established),
    email: brand.group.email,
    telephone: brand.group.phone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: brand.group.phone,
      email: brand.group.email,
      contactType: "customer service",
      areaServed: ["IN", "DE"],
      availableLanguage: ["en", "de", "hi", "ta", "mr"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.group.address,
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411037",
      addressCountry: "IN",
    },
    subOrganization: companyOrder.map((id) => {
      const c = companies[id];
      return {
        "@type": "Organization",
        name: c.name,
        url: c.website,
        email: c.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: c.city,
          addressCountry: c.country,
        },
      };
    }),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brand.name,
    alternateName: "Torque Group Companies",
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.href}`,
    })),
  };
}
