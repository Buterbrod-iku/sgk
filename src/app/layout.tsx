import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/components/static/header/header";
import Menu from "@/components/static/menu/menu";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'SGC',
    template: '%s | SGC'
  },
  description: 'SGC logistics panel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu />
        <Header />
        <div className='content'>
          {children}
        </div>
      </body>
    </html>
  )
}
