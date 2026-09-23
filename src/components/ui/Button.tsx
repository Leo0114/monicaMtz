import { forwardRef, type ReactNode } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  className?: string;
  children?: ReactNode;
}

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = AsButton | AsLink;

// Feedback en pointer-down (active:scale) y hover que "respira" con un brillo que cruza.
const BASE =
  "group relative isolate inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-sans font-medium uppercase tracking-[0.18em] transition-[transform,background-color,color,border-color,box-shadow] duration-500 ease-apple active:scale-[0.97] active:duration-100 disabled:pointer-events-none disabled:opacity-50";

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.65rem]",
  md: "h-11 px-6 text-[0.7rem]",
  lg: "h-13 px-8 text-xs md:h-14 md:px-10",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary shadow-[0_10px_30px_-12px] shadow-primary/60 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px] hover:shadow-primary/70",
  outline:
    "border border-primary/40 text-primary hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-on-primary",
  ghost: "text-ink hover:bg-primary/10",
};

const Shine = () => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-y-0 -left-full -z-10 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent transition-[left] duration-700 ease-apple group-hover:left-[150%]"
  />
);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "end",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`.trim();
    const iconNode = icon ? (
      <span className="shrink-0 text-base transition-transform duration-500 ease-apple group-hover:translate-x-0.5">
        {icon}
      </span>
    ) : null;

    const content = (
      <>
        {variant === "primary" && <Shine />}
        {iconPosition === "start" && iconNode}
        {children}
        {iconPosition === "end" && iconNode}
      </>
    );

    if (typeof props.href === "string") {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
