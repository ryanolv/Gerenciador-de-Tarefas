import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secundary" | "ghost";
  size?: "small" | "large";
  className?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({
  children,
  variant = "primary",
  size = "small",
  className,
  onClick,
}: ButtonProps) {
  const getVariantClasses = () => {
    if (variant === "primary") return "bg-[#00ADB5] text-white";

    if (variant === "ghost") return "bg-transparent text-[#818181]";

    if (variant === "secundary") return "bg-[#EEEEEE] text-[#35383E]";
  };

  const getSizeClasses = () => {
    if (size === "small") return "py-1 text-xs";
    if (size === "large") return "py-2 text-sm";
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-3 transition hover:opacity-90 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
