import { infrastructure } from "@/content";

export function EquipmentTable() {
  const { rows } = infrastructure.equipment;
  return (
    <div className="equipment-table">
      <div className="equipment-row equipment-head">
        <span>Equipment / System</span>
        <span>Company</span>
        <span>Location</span>
        <span>Use</span>
      </div>
      {rows.map((r) => (
        <div className="equipment-row" key={r.equipment}>
          <strong>{r.equipment}</strong>
          <span>{r.company}</span>
          <span>{r.location}</span>
          <span>{r.use}</span>
        </div>
      ))}
    </div>
  );
}
