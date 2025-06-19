import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Atamagri - Kecerdasan Iklim untuk Pertanian Cerdas",
  description:
    "Pemantauan cuaca real-time, analitik data iklim, dan rekomendasi keputusan berbasis AI untuk petani, nelayan, dan peneliti dengan platform IoT AtamaStation.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
