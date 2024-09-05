import React from "react";
import { tv } from "tailwind-variants";

interface SidebarButtonProps {
  children: React.ReactNode;
  color?: "unselected" | "selected";
}

function SidebarButton({ children, color }: SidebarButtonProps) {
  const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        unselected: "text-brand-dark-blue",
        selected: "bg-brand-primary bg-opacity-15 text-brand-primary",
      },
    },
  });

  return (
    <a href="" className={sidebar({ color })}>
      {children}
    </a>
  );
}

export default SidebarButton;
