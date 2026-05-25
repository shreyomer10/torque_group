import { brand, companies, companyOrder } from "@/content";
import { siteUrl } from "./seo";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: siteUrl,
    foundingDate: String(brand.established),
    email: brand.group.email,
    telephone: brand.group.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.group.address,
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
