// export default function FeaturesItem({
//   title,
//   description,
//   icon
// }: {
//   title: string
//   description: string
//   icon: React.ReactNode
// } & React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div className="bg-white px-5 py-6 rounded-xl">
//       <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12">
//         {icon}
//       </div>
//       <h3 className="mb-2 text-xl text-[#34364a] font-bold">
//         {title}
//       </h3>
//       <p className="text-[#34364a]">
//         {description}
//       </p>
//     </div>
//   )
// }
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeaturesItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="group relative p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white/50 backdrop-blur-sm border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 group-hover:from-blue-100 group-hover:to-blue-200/50 transition-all duration-300">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#34364a] mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[#34364a]/70 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}