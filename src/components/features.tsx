export default function FeaturesItem({
  title,
  description,
  icon
}: {
  title: string
  description: string
  icon: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="bg-white px-5 py-6 rounded-lg">
      <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12">
        {icon}
      </div>
      <h3 className="mb-2 text-xl text-[#34364a] font-bold">
        {title}
      </h3>
      <p className="text-[#34364a]">
        {description}
      </p>
    </div>
  )
}