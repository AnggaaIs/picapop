export default function Button({ children, className, ...props }: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-blue-600 text-white font-bold tracking-wide py-2.5 max-w-[250px] rounded-lg w-full md:w-1/2
              shadow-md hover:bg-blue-700 leading-tight transition duration-200 ease-in-out cursor-pointer text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}