import React, { ReactNode } from "react"
import Navbar from "./Navbar"
import { SideLayout } from "./SideLayout"

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="max-h-screen flex flex-col">
        <div className="flex">
          <SideLayout />
          {children}
        </div>
      </main>
    </>
  )
}

export default MainLayout
