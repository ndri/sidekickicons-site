import clsx from "clsx";
import { Heroicon } from "../types";

export interface ButtonProps {
  text: string;
  Icon?: Heroicon;
  style?: ButtonStyle;
  size?: ButtonSize;
  onClick?: () => void;
}

export type ButtonStyle = "primary" | "light" | "black";
export type ButtonSize = "lg" | "md" | "sm";

export default function Button({
  text,
  Icon,
  style = "primary",
  size = "md",
  onClick = () => {},
}: ButtonProps) {
  const styleClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
    light:
      "bg-white text-slate-900 hover:bg-slate-100 focus-visible:outline-indigo-600 ring-1 ring-inset ring-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:ring-slate-700",
    black: "bg-black text-white hover:bg-slate-700 focus-visible:outline-black",
  };
  const sizeClasses = {
    lg: "px-3 py-2 gap-x-2 text-sm",
    md: "px-2 py-1.5 gap-x-1.5 text-sm",
    sm: "px-1.5 py-1 gap-x-1 text-sm",
  };
  const iconStyleClasses = {
    primary: "text-white",
    light:
      "text-slate-400 group-hover/button:text-slate-500 dark:text-slate-500 dark:group-hover/button:text-slate-400",
    black: "text-white",
  };
  const iconSizeClasses = {
    lg: "size-6",
    md: "size-5",
    sm: "size-4",
  };
  return (
    <button
      type="button"
      className={clsx(
        "group/button inline-flex items-center justify-center rounded-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2",
        styleClasses[style],
        sizeClasses[size],
      )}
      onClick={onClick}
    >
      {Icon && (
        <Icon
          className={clsx(iconSizeClasses[size], iconStyleClasses[style], "shrink-0")}
          aria-hidden="true"
        />
      )}
      {text}
    </button>
  );
}
