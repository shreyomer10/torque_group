import { Check, X } from "lucide-react";
import { industries } from "@/content";

export function Matrix() {
  const m = industries.matrix;
  return (
    <>
      {/* Desktop / tablet: real table, no horizontal scroll because layout fits */}
      <div className="matrix-wrap matrix-desktop">
        <table className="matrix-table">
          <thead>
            <tr>
              <th className="row-head">Company ↓ &nbsp;/&nbsp; Sector →</th>
              {m.columns.map((c) => <th key={c}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {m.rows.map((row) => (
              <tr key={row.company}>
                <th scope="row" className="row-head">{row.company}</th>
                {row.cells.map((served, i) => (
                  <td key={i}>
                    {served ? (
                      <span className="cell-icon yes" aria-label="Served"><Check size={22} strokeWidth={2.4} /></span>
                    ) : (
                      <span className="cell-icon no" aria-label="Not served"><X size={20} strokeWidth={2.4} /></span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per company, sector list inside */}
      <div className="matrix-mobile">
        {m.rows.map((row) => (
          <div className="matrix-card" key={row.company}>
            <h4>{row.company}</h4>
            <ul>
              {row.cells.map((served, i) => (
                <li key={i} data-served={served ? "yes" : "no"}>
                  <span className="sector-name">{m.columns[i]}</span>
                  {served ? (
                    <span className="cell-icon yes" aria-label="Served"><Check size={18} strokeWidth={2.6} /></span>
                  ) : (
                    <span className="cell-icon no" aria-label="Not served"><X size={16} strokeWidth={2.6} /></span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
