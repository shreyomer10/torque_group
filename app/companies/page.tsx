import { companies, companyOrder, companiesPage } from "@/content";
import { PageHead } from "@/components/ui/PageHead";
import { CompanyBlock } from "@/components/companies/CompanyBlock";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = buildMetadata("/companies");

export default function CompaniesPage() {
  return (
    <>
      <PageHead
        crumb={companiesPage.head.crumb}
        eyebrow={companiesPage.head.eyebrow}
        h1={companiesPage.head.h1}
        lede={companiesPage.head.lede}
      />
      <section>
        <div className="container-tg">
          {companyOrder.map((id) => (
            <CompanyBlock key={id} company={companies[id]} />
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Group Companies", href: "/companies" },
            ])
          ),
        }}
      />
    </>
  );
}
