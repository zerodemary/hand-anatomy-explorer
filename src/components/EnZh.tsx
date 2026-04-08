import type { ReactNode } from "react";

type EnZhProps = {
  en: ReactNode;
  zh: ReactNode;
  className?: string;
  zhClassName?: string;
};

export function EnZh({ en, zh, className, zhClassName }: EnZhProps) {
  return (
    <span className={className}>
      <span>{en}</span>
      <span className={zhClassName ?? "ml-2 text-xs font-normal text-sky-100/75"}>{zh}</span>
    </span>
  );
}
