import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from "sonner"
import CompareBar from "@/components/CompareBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-6">
          {children}
          <Toaster position="top-right" />
        </main>
        <Footer />
        <CompareBar /> {/* 🔥 global */}
      </body>
    </html>
  )
}