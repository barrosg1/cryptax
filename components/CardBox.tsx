import React, { ReactNode } from "react"

const CardBox = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex flex-col items-center rounded shadow-lg p-5 bg-slate-50 flex-shrink-0">
      {children}
    </div>
  )
}

export default CardBox
