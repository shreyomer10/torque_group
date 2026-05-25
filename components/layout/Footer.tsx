import Link from "next/link";
import { brand, footer, companies, companyOrder } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Footer() {
  return (
    <footer className="footer-tg">
      <div className="container-tg">
        <div className="footer-trust">
          <div>
            <Eyebrow>{footer.trust.eyebrow}</Eyebrow>
            <h4>{footer.trust.h4}</h4>
          </div>
          <div className="footer-certs">
            {footer.trust.certs.map((c) => (
              <div className="fc" key={c.code}>
                <div className="code">{c.code}</div>
                <div className="desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cols">
          <div>
            <Link href="/" className="brand">
              <div className="brand-mark" aria-hidden="true">T</div>
              <div className="brand-text">
                <div className="name">{brand.shortName}</div>
                <div className="sub">Maritime · Engineering</div>
              </div>
            </Link>
            <p className="desc">{footer.cols.brand.desc}</p>
          </div>

          <div>
            <h4>{footer.cols.companies.h4}</h4>
            {companyOrder.map((id) => (
              <Link key={id} href={`/companies#${id}`}>
                {companies[id].name}
              </Link>
            ))}
          </div>

          <div>
            <h4>{footer.cols.group.h4}</h4>
            {footer.cols.group.links.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>

          <div>
            <h4>{footer.cols.offices.h4}</h4>
            <p className="desc" style={{ whiteSpace: "pre-line" }}>
              {footer.cols.offices.desc1}
            </p>
            <p className="desc" style={{ marginTop: 10, whiteSpace: "pre-line" }}>
              {footer.cols.offices.desc2}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{footer.bottom.left}</span>
          <span>{footer.bottom.right}</span>
        </div>
      </div>
    </footer>
  );
}
