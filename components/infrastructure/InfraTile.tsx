import { ImageOrPlaceholder } from "@/components/shared/ImageOrPlaceholder";

type Size = "large" | "medium" | "small";

export function InfraTile({
  id, size, corner, tag, h4, desc,
}: {
  id: string; size: Size; corner: string; tag: string; h4: string; desc?: string;
}) {
  return (
    <div className={`infra-tile ${size}`}>
      <div className="img-area">
        <ImageOrPlaceholder src={`/images/infrastructure/${id}.jpg`} alt={h4} withLabel />
      </div>
      <div className="corner-tag">{corner}</div>
      <div className="label-area">
        <div className="tag">{tag}</div>
        <h4>{h4}</h4>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  );
}
