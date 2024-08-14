import React from "react";

interface SidebarButtonProps {
  children: React.ReactNode;
  variant?: "unselected" | "selected";
}

function SidebarButton({ children, variant }: SidebarButtonProps) {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-[#35383e]";
    }

    if (variant === "selected") {
      return "bg-[#E6F7F8] text-[#00ADB5]";
    }
  };

  return (
    <a href="" className={`rounded-lg px-6 py-3 ${getVariantClasses()}`}>
      {children}
    </a>
  );
}

export default SidebarButton;
