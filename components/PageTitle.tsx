import { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
};

export default function PageTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="font-bold text-2xl md:text-[54px] leading-none tracking-tight">
      {children}
    </h2>
  );
}
