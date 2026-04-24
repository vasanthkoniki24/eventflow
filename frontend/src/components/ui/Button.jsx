import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const base =
    "px-5 py-2.5 rounded-lg text-sm font-ui font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-accentPrimary text-black hover:bg-accentGlow shadow-gold hover:-translate-y-[2px]",
    ghost:
      "border border-border-subtle text-textPrimary hover:bg-bgOverlay",
    danger:
      "bg-danger text-white hover:opacity-90",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}