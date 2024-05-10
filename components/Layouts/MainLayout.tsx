import React, { ReactNode } from "react"
import Navbar from "./Navbar"

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  )
}

export default MainLayout
