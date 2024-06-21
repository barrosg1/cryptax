"use client"

import { Portfolio } from "@/types/types"
import { createContext, ReactNode, useEffect, useState } from "react"

export const AppContext = createContext<any>(null)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [portfolio, setPortfolio] = useState<Array<Portfolio>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/portfolio")
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok")
  //       }
  //       const result = await response.json()
  //       setPortfolio(result.data)
  //     } catch (error: any) {
  //       setError(error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])

  return (
    <AppContext.Provider value={{ portfolio, loading, error }}>
      {children}
    </AppContext.Provider>
  )
}
