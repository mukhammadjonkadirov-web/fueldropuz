"use client";

import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  "aria-label"?: string;
}

interface ButtonAsButton extends BaseButtonProps {
  as?: "button";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: never;
}

interface ButtonAsLink extends BaseButtonProps {
  as: "link";
  href: string;
  onClick?: never;
  type?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sky-600 text-white shadow-sm hover:bg-sky-700 focus:ring-sky-500 active:bg-sky-800",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400 active:bg-slate-300",
  outline:
    "border-2 border-sky-600 text-sky-600 bg-transparent hover:bg-sky-50 focus:ring-sky-500",
  ghost:
    "text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
  inverse:
    "bg-white text-sky-600 hover:bg-sky-50 focus:ring-sky-300",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    disabled = false,
    ...rest
  } = props;

  const base =
    "inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const styles = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (props.as === "link" && "href" in props) {
    return (
      <Link href={props.href} className={styles} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={("type" in props && props.type) || "button"}
      className={styles}
      disabled={disabled}
      onClick={"onClick" in props ? props.onClick : undefined}
      aria-label={props["aria-label"]}
    >
      {children}
    </button>
  );
}
