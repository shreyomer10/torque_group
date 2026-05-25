import { Check, X } from "lucide-react";
import { industries } from "@/content";

export function Matrix() {
  const m = industries.matrix;
  return (
    <div className="matrix-wrap">
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
  );
}
