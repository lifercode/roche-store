import type { Metadata } from 'next'
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: 'Roche Store',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <div className="flex-1">{children}</div>
    </>
  )
}
