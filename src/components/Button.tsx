import React from "react";
import { tv } from "tailwind-variants";

interface ButtonProps {
  children: React.ReactNode;
  color?: "primary" | "secundary" | "ghost";
  size?: "small" | "large";
  className?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({
  children,
  color = "primary",
  size = "small",
  className,
  onClick,
}: ButtonProps) {
  const button = tv({
    base: "flex items-center justify-center gap-2 rounded-md px-3 transition hover:opacity-90",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        ghost: "bg-transparent text-brand-dark-gray",
        secundary: "bg-brand-light-gray text-brand-dark-blue",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  });

  return (
    <button className={button({ color, size, className })} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
