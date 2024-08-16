import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, variant = "primary", onClick }: ButtonProps) {
  const getVariantClasses = () => {
    if (variant === "primary") return "bg-[#00ADB5] text-white";

    if (variant === "ghost") return "bg-transparent text-[#818181]";
  };

  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs transition hover:opacity-90 ${getVariantClasses()}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
