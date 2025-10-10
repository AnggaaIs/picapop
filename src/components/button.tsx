interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg border border-emerald-400",
    outline: "border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 shadow-sm hover:shadow-md",
    ghost: "text-emerald-500 hover:bg-emerald-50 hover:shadow-sm"
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-2.5 font-semibold",
    lg: "text-lg px-8 py-3 font-semibold"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}