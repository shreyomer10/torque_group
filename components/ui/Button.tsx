import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "accent";
type Size = "md" | "sm";

const cls = (variant: Variant = "primary", size: Size = "md", extra = "") => {
  const v =
    variant === "accent" ? "btn btn-accent" :
    variant === "ghost" ? "btn btn-ghost" :
    "btn";
  const s = size === "sm" ? " btn-sm" : "";
  return `${v}${s} ${extra}`.trim();
};

export function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

interface LinkBtnProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  withArrow?: boolean;
  children: ReactNode;
}

export function LinkButton({
  href, variant, size, external, withArrow, children, className = "", ...rest
}: LinkBtnProps) {
  const content = <>{children}{withArrow && <ArrowIcon />}</>;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls(variant, size, className)} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls(variant, size, className)} {...rest}>
      {content}
    </Link>
  );
}

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
}

export function Button({ variant, size, withArrow, children, className = "", ...rest }: BtnProps) {
  return (
    <button className={cls(variant, size, className)} {...rest}>
      {children}
      {withArrow && <ArrowIcon />}
    </button>
  );
}
