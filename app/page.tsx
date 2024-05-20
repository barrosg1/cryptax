import PorfolioLayout from "@/components/layouts/PorfolioLayout"
import SideLayout from "@/components/layouts/SideLayout"

export default function Home() {
  return (
    <main className="max-h-screen flex flex-col">
      <div className="flex">
        <SideLayout />
        <PorfolioLayout />
      </div>
    </main>
  )
}
