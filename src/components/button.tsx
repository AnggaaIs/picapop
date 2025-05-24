// export default function Button({ children, className, ...props }: {
//   children: React.ReactNode;
//   className?: string;
// } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
//   return (
//     <button
//       className={`bg-blue-600 text-white font-bold tracking-wide py-2.5 rounded-xl w-full
//               shadow-md hover:bg-blue-700 leading-tight transition duration-200 ease-in-out cursor-pointer text-sm ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }
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
    default: "bg-blue-500 text-white hover:bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.65)] border border-blue-400",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    ghost: "text-blue-500 hover:bg-blue-50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
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