import Navbar from '@/components/navbar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <div className="md:w-1/6 bg-primary h-full md:flex md:border-r md:border-gray-500">
        <Navbar />
      </div>
      <div className="w-full md:w-5/6 bg-primary h-full overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
