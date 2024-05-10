import PorfolioLayout from "@/components/Layouts/PorfolioLayout"
import SideLayout from "@/components/Layouts/SideLayout"

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
