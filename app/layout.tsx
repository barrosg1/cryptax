import type { Metadata } from "next"
import MainLayout from "@/components/Layouts/MainLayout"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cryptax",
  description: "An app to track crypto transaction for taxes purposes",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
